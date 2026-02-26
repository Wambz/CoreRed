import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getPublishedArticles, type Article } from '../config/supabase';
import { useGeoRegion } from '../hooks/useGeoRegion';
import { Loader2, MapPin, Tag, Calendar, Globe } from 'lucide-react';

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const geo = useGeoRegion();

    useEffect(() => {
        getPublishedArticles()
            .then(setPosts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Separate geo-targeted articles (match user's country or region)
    const geoArticles = posts.filter(p =>
        p.target_region &&
        (p.target_region.toLowerCase().includes(geo.city.toLowerCase()) ||
            p.target_region.toLowerCase().includes(geo.country.toLowerCase()) ||
            p.target_region.toLowerCase().includes(geo.countryCode.toLowerCase()))
    );
    const otherArticles = posts.filter(p => !geoArticles.includes(p));

    const formatDate = (d: string | null) =>
        d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

    const ArticleCard = ({ post }: { post: Article }) => (
        <Link to={`/blog/${post.slug}`} className="group block">
            <article className="bg-[#0d0d0d] border border-gray-800 rounded-xl overflow-hidden hover:border-codered-500/40 transition-all duration-300 h-full flex flex-col">
                {post.cover_image_url ? (
                    <div className="h-48 overflow-hidden">
                        <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        />
                    </div>
                ) : (
                    <div className="h-48 bg-gradient-to-br from-codered-500/10 to-black flex items-center justify-center">
                        <Tag className="w-10 h-10 text-codered-500/30" />
                    </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs text-codered-500 bg-codered-500/10 px-2 py-0.5 rounded-full border border-codered-500/20">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-codered-500 transition-colors mb-2 leading-snug flex-1">
                        {post.title}
                    </h2>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                    {/* Meta footer */}
                    <div className="flex items-center justify-between text-xs text-gray-600 pt-4 border-t border-gray-800/60">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.published_at)}
                        </span>
                        {post.target_region && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-codered-500/60" />
                                {post.target_region.split(',')[0]}
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );

    return (
        <div className="pt-20 bg-black min-h-screen">
            <SEOHead
                title="Tech Blog & Insights | CodeRed Innovations"
                description="Expert insights on network security, AI automation with N8N & Make, SQL Server optimization, and modern web development from Derrick Ndaire."
                canonicalPath="/blog"
            />

            <section className="py-20">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-4">
                            Tech <span className="text-codered-500">Insights</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Latest thoughts on cybersecurity, AI automation, and enterprise technology
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-10 h-10 text-codered-500 animate-spin" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-gray-500 py-20">
                            <Tag className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p>No articles published yet. Check back soon!</p>
                        </div>
                    ) : (
                        <>
                            {/* Geo-targeted section — only shows when visitor's region matches */}
                            {!geo.loading && geoArticles.length > 0 && (
                                <div className="mb-16">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Globe className="w-4 h-4 text-coredited-500 text-codered-500" />
                                        <h2 className="text-sm font-bold text-codered-500 uppercase tracking-widest">
                                            Recommended for {geo.city}, {geo.country}
                                        </h2>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {geoArticles.map(post => (
                                            <ArticleCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                    {otherArticles.length > 0 && (
                                        <div className="my-12 border-t border-gray-800/60" />
                                    )}
                                </div>
                            )}

                            {/* All / remaining articles */}
                            {otherArticles.length > 0 && (
                                <div>
                                    {geoArticles.length > 0 && (
                                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">
                                            All Articles
                                        </h2>
                                    )}
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {otherArticles.map(post => (
                                            <ArticleCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
