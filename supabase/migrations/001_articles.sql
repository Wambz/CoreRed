-- ============================================================
-- CoreRedTech CMS — Supabase Migration 001
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/lindqmqvkvwijqlmkylz/sql
-- ============================================================
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- ─── Articles ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    excerpt text NOT NULL DEFAULT '',
    body text NOT NULL DEFAULT '',
    cover_image_url text,
    author text NOT NULL DEFAULT 'Derrick Ndaire',
    tags text [] NOT NULL DEFAULT '{}',
    target_region text,
    faqs jsonb NOT NULL DEFAULT '[]',
    published boolean NOT NULL DEFAULT false,
    published_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS set_updated_at ON articles;
CREATE TRIGGER set_updated_at BEFORE
UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- Auto-set published_at when published flips to true
CREATE OR REPLACE FUNCTION set_published_at() RETURNS TRIGGER AS $$ BEGIN IF NEW.published = true
    AND (
        OLD.published IS DISTINCT
        FROM true
    ) THEN NEW.published_at = now();
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS set_published_at_trigger ON articles;
CREATE TRIGGER set_published_at_trigger BEFORE
INSERT
    OR
UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION set_published_at();
-- ─── API Keys (for AI agent authentication) ────────────────
CREATE TABLE IF NOT EXISTS api_keys (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    -- e.g. "Claude Agent", "GPT Agent"
    key_hash text UNIQUE NOT NULL,
    -- SHA-256 hash of the actual key
    created_at timestamptz NOT NULL DEFAULT now(),
    last_used timestamptz,
    active boolean NOT NULL DEFAULT true
);
-- ─── Row-Level Security ────────────────────────────────────
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
-- Public: read published articles only
CREATE POLICY "Public read published" ON articles FOR
SELECT USING (published = true);
-- Authenticated admins: full access to all articles
CREATE POLICY "Admin full access" ON articles FOR ALL USING (auth.role() = 'authenticated');
-- api_keys: only accessible via service role (Edge Function uses service role key)
-- No public access policy — service role bypasses RLS by default
-- ─── Indexes ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles (slug);
CREATE INDEX IF NOT EXISTS articles_published_idx ON articles (published, published_at DESC);
CREATE INDEX IF NOT EXISTS articles_tags_idx ON articles USING gin (tags);
CREATE INDEX IF NOT EXISTS articles_region_idx ON articles (target_region);
-- ─── Seed an example API key (for testing) ─────────────────
-- Actual key value: "codered-ai-agent-secret-2026"
-- Store this hash; never store the raw key.
-- Hash generated with: echo -n "codered-ai-agent-secret-2026" | sha256sum
INSERT INTO api_keys (name, key_hash)
VALUES (
        'Default AI Agent',
        encode(
            sha256('codered-ai-agent-secret-2026'::bytea),
            'hex'
        )
    ) ON CONFLICT DO NOTHING;