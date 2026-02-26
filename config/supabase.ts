import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Typed helpers ────────────────────────────────────────────────────────────

export interface FAQ {
    question: string;
    answer: string;
}

export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    body: string;
    cover_image_url: string | null;
    author: string;
    tags: string[];
    target_region: string | null;
    faqs: FAQ[];
    published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at'>;

/** Fetch all published articles, newest first */
export async function getPublishedArticles(): Promise<Article[]> {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as Article[];
}

/** Fetch a single article by slug */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error) return null;
    return data as Article;
}

/** Admin: fetch all articles (including drafts) */
export async function getAllArticles(): Promise<Article[]> {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as Article[];
}

/** Admin: upsert an article */
export async function upsertArticle(article: Partial<ArticleInsert> & { id?: string }): Promise<Article> {
    const { data, error } = await supabase
        .from('articles')
        .upsert({
            ...article,
            updated_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) throw error;
    return data as Article;
}

/** Admin: delete an article */
export async function deleteArticle(id: string): Promise<void> {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
}

/** Generate a URL-safe slug from a title */
export function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}
