// Supabase Edge Function: publish-article
// Deploy with: supabase functions deploy publish-article
// Endpoint: POST https://lindqmqvkvwijqlmkylz.supabase.co/functions/v1/publish-article

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-agent-token",
};

// Slugify helper
function slugify(title: string): string {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

// SHA-256 hash using Web Crypto (Deno compatible)
async function sha256(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        // ── 1. Authenticate the AI Agent ──────────────────────────────────────
        const agentToken = req.headers.get("x-agent-token");
        if (!agentToken) {
            return new Response(JSON.stringify({ error: "Missing x-agent-token header" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Use service role client for RLS bypass
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL")!,
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        );

        const tokenHash = await sha256(agentToken);
        const { data: keyRow, error: keyError } = await supabase
            .from("api_keys")
            .select("id, active")
            .eq("key_hash", tokenHash)
            .single();

        if (keyError || !keyRow || !keyRow.active) {
            return new Response(JSON.stringify({ error: "Invalid or inactive API key" }), {
                status: 403,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Update last_used timestamp
        await supabase.from("api_keys").update({ last_used: new Date().toISOString() }).eq("id", keyRow.id);

        // ── 2. Parse Request Body ─────────────────────────────────────────────
        const body = await req.json();
        const {
            title,
            excerpt = "",
            body: articleBody = "",
            cover_image_url = null,
            author = "Derrick Ndaire",
            tags = [],
            target_region = null,
            faqs = [],
            published = false,
        } = body;

        if (!title) {
            return new Response(JSON.stringify({ error: "title is required" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // ── 3. Generate unique slug ───────────────────────────────────────────
        let slug = slugify(title);
        // Check for collision and append timestamp if needed
        const { data: existing } = await supabase.from("articles").select("slug").eq("slug", slug).single();
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        // ── 4. Insert Article ─────────────────────────────────────────────────
        const { data: article, error: insertError } = await supabase
            .from("articles")
            .insert({
                slug,
                title,
                excerpt,
                body: articleBody,
                cover_image_url,
                author,
                tags,
                target_region,
                faqs,
                published,
            })
            .select()
            .single();

        if (insertError) throw insertError;

        // ── 5. Trigger n8n Webhook (if published) ─────────────────────────────
        const n8nWebhook = Deno.env.get("N8N_WEBHOOK_URL");
        if (published && n8nWebhook) {
            try {
                await fetch(n8nWebhook, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        source: "ai-agent",
                        ...article,
                    }),
                });
            } catch (webhookErr) {
                console.error("n8n webhook failed:", webhookErr);
                // Non-fatal — article is already saved
            }
        }

        return new Response(
            JSON.stringify({
                id: article.id,
                slug: article.slug,
                url: `/blog/${article.slug}`,
                published: article.published,
            }),
            {
                status: 201,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
        );
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal server error";
        return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
