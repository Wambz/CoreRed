import React, { useState, useEffect, useCallback } from 'react';
import { supabase, getAllArticles, upsertArticle, deleteArticle, slugify, type Article, type FAQ } from '../../config/supabase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import SEOHead from '../../components/SEOHead';
import {
    PlusCircle, Trash2, Edit3, Eye, EyeOff, Send, LogOut,
    Image, X, ChevronDown, ChevronUp, Loader2, CheckCircle2, AlertCircle, Save
} from 'lucide-react';

type ViewMode = 'list' | 'editor';

const EMPTY_ARTICLE: Partial<Article> = {
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    cover_image_url: null,
    author: 'Derrick Ndaire',
    tags: [],
    target_region: '',
    faqs: [],
    published: false,
};

// ─── Markdown Editor (lazy import to keep bundle light) ─────────────────────
// Using a simple textarea with preview toggle to avoid heavy deps loading issues
// If you want full MDEditor, run: npm install @uiw/react-md-editor
function MarkdownEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const [preview, setPreview] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Article Body (Markdown)
                </label>
                <button
                    type="button"
                    onClick={() => setPreview(!preview)}
                    className="text-xs text-codered-500 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                    {preview ? <><Edit3 className="w-3 h-3" /> Edit</> : <><Eye className="w-3 h-3" /> Preview</>}
                </button>
            </div>
            {preview ? (
                <div
                    className="w-full min-h-[300px] bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm prose prose-invert max-w-none overflow-auto"
                    dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br/>') }}
                />
            ) : (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    rows={14}
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-codered-500 transition-colors font-mono resize-y"
                    placeholder={`# Your Article Title\n\nWrite your content in **Markdown**...\n\n## Section Heading\n\nParagraph text here.`}
                />
            )}
        </div>
    );
}

// ─── FAQ Builder ─────────────────────────────────────────────────────────────
function FAQBuilder({ faqs, onChange }: { faqs: FAQ[]; onChange: (f: FAQ[]) => void }) {
    const add = () => onChange([...faqs, { question: '', answer: '' }]);
    const remove = (i: number) => onChange(faqs.filter((_, idx) => idx !== i));
    const update = (i: number, field: keyof FAQ, val: string) => {
        const updated = [...faqs];
        updated[i] = { ...updated[i], [field]: val };
        onChange(updated);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">FAQs (for schema markup)</label>
                <button
                    type="button"
                    onClick={add}
                    className="text-xs text-codered-500 flex items-center gap-1 hover:text-red-400"
                >
                    <PlusCircle className="w-3 h-3" /> Add Question
                </button>
            </div>
            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 relative">
                        <button
                            type="button"
                            onClick={() => remove(i)}
                            className="absolute top-2 right-2 text-gray-700 hover:text-red-500 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <input
                            value={faq.question}
                            onChange={e => update(i, 'question', e.target.value)}
                            className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-codered-500 mb-2"
                            placeholder="Question"
                        />
                        <textarea
                            value={faq.answer}
                            onChange={e => update(i, 'answer', e.target.value)}
                            rows={2}
                            className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-codered-500 resize-none"
                            placeholder="Answer"
                        />
                    </div>
                ))}
                {faqs.length === 0 && (
                    <p className="text-gray-600 text-xs text-center py-3">
                        No FAQs added. FAQs improve Google search rich results.
                    </p>
                )}
            </div>
        </div>
    );
}

// ─── Image Upload ─────────────────────────────────────────────────────────────
function CoverImageUpload({ value, onChange }: { value: string | null; onChange: (url: string | null) => void }) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const storageRef = ref(storage, `blog-covers/${Date.now()}-${file.name}`);
        const task = uploadBytesResumable(storageRef, file);

        task.on('state_changed',
            snap => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
            err => { console.error(err); setUploading(false); },
            async () => {
                const url = await getDownloadURL(task.snapshot.ref);
                onChange(url);
                setUploading(false);
                setProgress(0);
            }
        );
    };

    return (
        <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Cover Image</label>
            {value ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-700">
                    <img src={value} alt="Cover" className="w-full h-40 object-cover opacity-80" />
                    <button
                        type="button"
                        onClick={() => onChange(null)}
                        className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg py-8 cursor-pointer hover:border-codered-500 transition-colors">
                    <Image className="w-8 h-8 text-gray-600 mb-2" />
                    <span className="text-gray-500 text-sm">
                        {uploading ? `Uploading... ${progress}%` : 'Click to upload cover image'}
                    </span>
                    <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
                    {uploading && (
                        <div className="mt-3 w-40 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-codered-500 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                    )}
                </label>
            )}
        </div>
    );
}

// ─── Main CMS Component ───────────────────────────────────────────────────────
const AdminCMS: React.FC = () => {
    const [view, setView] = useState<ViewMode>('list');
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
    const [editingArticle, setEditingArticle] = useState<Partial<Article>>(EMPTY_ARTICLE);
    const [tagsInput, setTagsInput] = useState('');
    const [n8nSent, setN8nSent] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchArticles = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllArticles();
            setArticles(data);
        } catch (e: unknown) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchArticles(); }, [fetchArticles]);

    const startNew = () => {
        setEditingArticle({ ...EMPTY_ARTICLE });
        setTagsInput('');
        setN8nSent(false);
        setStatus({ type: 'idle', message: '' });
        setView('editor');
    };

    const startEdit = (article: Article) => {
        setEditingArticle({ ...article });
        setTagsInput(article.tags.join(', '));
        setN8nSent(false);
        setStatus({ type: 'idle', message: '' });
        setView('editor');
    };

    const handleTitleChange = (title: string) => {
        setEditingArticle(prev => ({
            ...prev,
            title,
            // Only auto-update slug if it's a new article (no id yet)
            ...(!prev.id ? { slug: slugify(title) } : {}),
        }));
    };

    const handleSave = async (publishNow?: boolean) => {
        setSaving(true);
        setStatus({ type: 'idle', message: '' });
        try {
            const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
            const payload: Partial<Article> = {
                ...editingArticle,
                tags,
            };

            if (publishNow !== undefined) {
                payload.published = publishNow;
            }

            if (!payload.slug) payload.slug = slugify(payload.title ?? 'untitled');

            const saved = await upsertArticle(payload as Article);

            // Fire n8n webhook when publishing
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
            if (payload.published && webhookUrl && !webhookUrl.includes('your-n8n')) {
                try {
                    await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ source: 'admin', ...saved }),
                    });
                    setN8nSent(true);
                } catch (err) {
                    console.error('n8n webhook failed:', err);
                }
            }

            setEditingArticle(saved);
            setStatus({
                type: 'success',
                message: payload.published ? 'Published! 🎉' : 'Draft saved.',
            });
            await fetchArticles();
        } catch (e: unknown) {
            setStatus({ type: 'error', message: e instanceof Error ? e.message : 'Save failed.' });
        } finally {
            setSaving(false);
        }
    };

    const handleTogglePublish = async (article: Article) => {
        try {
            await upsertArticle({ ...article, published: !article.published });
            await fetchArticles();
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this article? This cannot be undone.')) return;
        await deleteArticle(id);
        await fetchArticles();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    // ─── Render ──────────────────────────────────────────────────────────────

    return (
        <div className="pt-20 pb-20 min-h-screen bg-black">
            <SEOHead title="Admin CMS | CodeRed" description="Content Management System" canonicalPath="/admin" />

            <div className="container mx-auto px-4 max-w-6xl">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-white">
                            Content <span className="text-codered-500">Manager</span>
                        </h1>
                        <p className="text-gray-600 text-xs mt-0.5">CoreRed Innovations CMS</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {view === 'editor' && (
                            <button onClick={() => setView('list')} className="text-sm text-gray-400 hover:text-white">
                                ← All Articles
                            </button>
                        )}
                        {view === 'list' && (
                            <button
                                onClick={startNew}
                                className="flex items-center gap-2 bg-codered-500 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
                            >
                                <PlusCircle className="w-4 h-4" /> New Article
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 text-gray-500 hover:text-red-400 text-xs transition-colors"
                        >
                            <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                    </div>
                </div>

                {/* ── LIST VIEW ─────────────────────────────────────────── */}
                {view === 'list' && (
                    <div>
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="w-8 h-8 text-codered-500 animate-spin" />
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="text-center text-gray-600 py-20">
                                <p className="mb-4">No articles yet.</p>
                                <button onClick={startNew} className="text-codered-500 hover:underline text-sm">
                                    Create your first article →
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {articles.map(article => (
                                    <div
                                        key={article.id}
                                        className="bg-[#0d0d0d] border border-gray-800 rounded-xl overflow-hidden"
                                    >
                                        {/* Row */}
                                        <div className="flex items-center gap-4 px-5 py-4">
                                            {/* Expand toggle */}
                                            <button
                                                onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                                                className="text-gray-600 hover:text-white transition-colors flex-shrink-0"
                                            >
                                                {expandedId === article.id
                                                    ? <ChevronUp className="w-4 h-4" />
                                                    : <ChevronDown className="w-4 h-4" />
                                                }
                                            </button>

                                            {/* Cover thumb */}
                                            {article.cover_image_url ? (
                                                <img src={article.cover_image_url} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                                            ) : (
                                                <div className="w-10 h-10 rounded bg-gray-800 flex-shrink-0 flex items-center justify-center">
                                                    <Image className="w-4 h-4 text-gray-600" />
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-semibold text-sm truncate">{article.title}</p>
                                                <p className="text-gray-600 text-xs truncate">/blog/{article.slug}</p>
                                            </div>

                                            {/* Status badge */}
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${article.published
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                    : 'bg-gray-800 text-gray-500'
                                                }`}>
                                                {article.published ? 'Published' : 'Draft'}
                                            </span>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button
                                                    onClick={() => handleTogglePublish(article)}
                                                    title={article.published ? 'Unpublish' : 'Publish'}
                                                    className="p-1.5 text-gray-500 hover:text-green-400 transition-colors"
                                                >
                                                    {article.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => startEdit(article)}
                                                    className="p-1.5 text-gray-500 hover:text-codered-500 transition-colors"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expanded detail */}
                                        {expandedId === article.id && (
                                            <div className="px-5 pb-4 pt-0 border-t border-gray-800/60 text-xs text-gray-500 space-y-1">
                                                <p>{article.excerpt}</p>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {article.tags.map(t => (
                                                        <span key={t} className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── EDITOR VIEW ───────────────────────────────────────── */}
                {view === 'editor' && (
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main editor - 2/3 width */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Status alert */}
                            {status.type !== 'idle' && (
                                <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm ${status.type === 'success'
                                        ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                                    }`}>
                                    {status.type === 'success'
                                        ? <CheckCircle2 className="w-4 h-4" />
                                        : <AlertCircle className="w-4 h-4" />}
                                    {status.message}
                                    {n8nSent && <span className="ml-2 text-blue-400">LinkedIn queued ✓</span>}
                                </div>
                            )}

                            {/* Title */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Title *</label>
                                <input
                                    value={editingArticle.title ?? ''}
                                    onChange={e => handleTitleChange(e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-codered-500 transition-colors"
                                    placeholder="Article title..."
                                    required
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Slug (URL)</label>
                                <div className="flex items-center gap-2 bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3">
                                    <span className="text-gray-600 text-sm">/blog/</span>
                                    <input
                                        value={editingArticle.slug ?? ''}
                                        onChange={e => setEditingArticle(prev => ({ ...prev, slug: e.target.value }))}
                                        className="flex-1 bg-transparent text-white text-sm focus:outline-none"
                                        placeholder="auto-generated-from-title"
                                    />
                                </div>
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Excerpt *</label>
                                <textarea
                                    value={editingArticle.excerpt ?? ''}
                                    onChange={e => setEditingArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                                    rows={3}
                                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-codered-500 transition-colors resize-none"
                                    placeholder="A concise 1-2 sentence summary shown in article cards and meta descriptions..."
                                />
                            </div>

                            {/* Body */}
                            <MarkdownEditor
                                value={editingArticle.body ?? ''}
                                onChange={body => setEditingArticle(prev => ({ ...prev, body }))}
                            />

                            {/* FAQs */}
                            <FAQBuilder
                                faqs={(editingArticle.faqs as FAQ[]) ?? []}
                                onChange={faqs => setEditingArticle(prev => ({ ...prev, faqs }))}
                            />
                        </div>

                        {/* Sidebar - 1/3 width */}
                        <div className="space-y-6">
                            {/* Publish actions */}
                            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-5">
                                <h3 className="text-sm font-bold text-white mb-4">Publishing</h3>
                                <div className="space-y-3">
                                    <button
                                        type="button"
                                        onClick={() => handleSave(false)}
                                        disabled={saving}
                                        className="w-full flex items-center justify-center gap-2 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save as Draft
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSave(true)}
                                        disabled={saving}
                                        className="w-full flex items-center justify-center gap-2 bg-codered-500 hover:bg-red-700 text-white text-sm font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        {saving ? 'Saving...' : 'Publish Now'}
                                    </button>
                                </div>

                                {editingArticle.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-800">
                                        <p className="text-xs text-gray-600 mb-2">Current status</p>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${editingArticle.published
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-gray-800 text-gray-500'
                                            }`}>
                                            {editingArticle.published ? '✓ Published' : 'Draft'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Cover image */}
                            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-5">
                                <CoverImageUpload
                                    value={editingArticle.cover_image_url ?? null}
                                    onChange={url => setEditingArticle(prev => ({ ...prev, cover_image_url: url }))}
                                />
                            </div>

                            {/* SEO Settings */}
                            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-5 space-y-4">
                                <h3 className="text-sm font-bold text-white">SEO & Geo</h3>

                                {/* Tags */}
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Tags</label>
                                    <input
                                        value={tagsInput}
                                        onChange={e => setTagsInput(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-codered-500 transition-colors"
                                        placeholder="Security, AI, Nairobi"
                                    />
                                    <p className="text-gray-600 text-xs mt-1">Comma separated</p>
                                </div>

                                {/* Target Region */}
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                                        Target Region (Geo SEO)
                                    </label>
                                    <input
                                        value={editingArticle.target_region ?? ''}
                                        onChange={e => setEditingArticle(prev => ({ ...prev, target_region: e.target.value }))}
                                        className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-codered-500 transition-colors"
                                        placeholder="Nairobi, Kenya"
                                    />
                                    <p className="text-gray-600 text-xs mt-1">
                                        Injected into JSON-LD + shown to visitors from this region
                                    </p>
                                </div>

                                {/* Author */}
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Author</label>
                                    <input
                                        value={editingArticle.author ?? 'Derrick Ndaire'}
                                        onChange={e => setEditingArticle(prev => ({ ...prev, author: e.target.value }))}
                                        className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-codered-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCMS;
