import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import { getArticleBySlug, type Article, type FAQ } from '../config/supabase';
import { Loader2, ChevronDown, ChevronUp, ArrowLeft, Calendar, User, MapPin, Tag } from 'lucide-react';

// ─── JSON-LD Schema Builder ─────────────────────────────────────────────────

function ArticleSchema({ article }: { article: Article }) {
    const schema: object[] = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "image": article.cover_image_url ?? "https://coreredtech.com/logo-codered.png",
            "datePublished": article.published_at ?? article.created_at,
            "dateModified": article.updated_at,
            "author": {
                "@type": "Person",
                "name": article.author,
                "url": "https://coreredtech.com/about"
            },
            "publisher": {
                "@type": "Organization",
                "name": "CoreRed Innovations",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://coreredtech.com/logo-codered.png"
                }
            },
            "keywords": article.tags.join(", "),
            ...(article.target_region ? {
                "contentLocation": {
                    "@type": "Place",
                    "name": article.target_region
                }
            } : {})
        }
    ];

    // Add FAQPage schema if there are FAQs
    if (article.faqs && article.faqs.length > 0) {
        schema.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": article.faqs.map((faq: FAQ) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        });
    }

    return (
        <>
            {schema.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </>
    );
}

// ─── FAQ Accordion ──────────────────────────────────────────────────────────

function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-black text-white mb-6">
                Frequently Asked <span className="text-codered-500">Questions</span>
            </h2>
            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <div
                        key={i}
                        className="border border-gray-800 rounded-xl overflow-hidden bg-[#0a0a0a]"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left text-white hover:text-codered-500 transition-colors"
                        >
                            <span className="font-semibold text-sm">{faq.question}</span>
                            {openIndex === i
                                ? <ChevronUp className="w-4 h-4 flex-shrink-0 text-codered-500" />
                                : <ChevronDown className="w-4 h-4 flex-shrink-0 text-gray-500" />
                            }
                        </button>
                        {openIndex === i && (
                            <div className="px-6 pb-5">
                                <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── BlogPost Page ──────────────────────────────────────────────────────────

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        getArticleBySlug(slug)
            .then(data => {
                if (!data) setNotFound(true);
                else setArticle(data);
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center pt-20">
                <Loader2 className="w-10 h-10 text-codered-500 animate-spin" />
            </div>
        );
    }

    if (notFound || !article) {
        return (
            <div className="min-h-screen bg-black pt-28 text-center">
                <h1 className="text-3xl font-black text-white mb-4">Article Not Found</h1>
                <Link to="/blog" className="text-codered-500 hover:underline text-sm">← Back to Blog</Link>
            </div>
        );
    }

    const publishDate = article.published_at
        ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    return (
        <div className="bg-black min-h-screen">
            {/* SEO & JSON-LD */}
            <Helmet>
                <title>{article.title} | CodeRed Innovations</title>
                <meta name="description" content={article.excerpt} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt} />
                {article.cover_image_url && <meta property="og:image" content={article.cover_image_url} />}
                <link rel="canonical" href={`https://coreredtech.com/blog/${article.slug}`} />
            </Helmet>
            <ArticleSchema article={article} />

            {/* Cover Image */}
            {article.cover_image_url && (
                <div className="w-full h-72 md:h-96 overflow-hidden">
                    <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
            )}

            {/* Article Content */}
            <div className="container mx-auto px-6 max-w-3xl py-16" style={{ marginTop: article.cover_image_url ? '-80px' : '80px' }}>

                {/* Back Link */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-codered-500 transition-colors text-sm mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    All Articles
                </Link>

                {/* Header */}
                <div className="relative z-10 bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 mb-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map(tag => (
                            <span key={tag} className="text-xs text-codered-500 bg-codered-500/10 border border-codered-500/20 px-2 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                        {article.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4 text-codered-500" />
                            {article.author}
                        </span>
                        {publishDate && (
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-codered-500" />
                                {publishDate}
                            </span>
                        )}
                        {article.target_region && (
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-codered-500" />
                                {article.target_region}
                            </span>
                        )}
                    </div>
                </div>

                {/* Excerpt */}
                <p className="text-gray-400 text-lg leading-relaxed mb-10 italic border-l-2 border-codered-500 pl-4">
                    {article.excerpt}
                </p>

                {/* Body — Markdown */}
                <div className="prose prose-invert prose-sm max-w-none prose-headings:font-black prose-headings:text-white prose-a:text-codered-500 prose-strong:text-white prose-code:text-codered-400 prose-blockquote:border-l-codered-500 prose-blockquote:text-gray-400">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {article.body}
                    </ReactMarkdown>
                </div>

                {/* FAQs */}
                <FAQAccordion faqs={article.faqs} />

                {/* Tags Footer */}
                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-wrap gap-2">
                    <Tag className="w-4 h-4 text-gray-600 mt-0.5" />
                    {article.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
