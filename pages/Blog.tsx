import React, { useEffect, useState } from 'react';
import SEOHead from '../components/SEOHead';
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    tags: string[];
}

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch posts ordered by creation date descending
                const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const fetchedPosts: BlogPost[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
                });
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="pt-20 bg-black min-h-screen">
            <SEOHead
                title="Tech Blog & Insights | CodeRed Innovations"
                description="Read expert insights on network security, AI automation with N8N & Make, SQL Server optimization, and modern web development from Derrick Ndaire."
                canonicalPath="/blog"
            />
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
                            Tech <span className="text-codered-500">Insights</span>
                        </h1>
                        <p className="text-gray-400">
                            Latest thoughts on technology and automation
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-10 h-10 text-codered-500 animate-spin" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-gray-400 py-20">
                            No blog posts found. Check back later!
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-dark-900 border border-gray-800 p-6 rounded-xl hover:bg-dark-800 transition-colors cursor-pointer group"
                                >
                                    <time className="text-xs text-gray-500 mb-2 block">{post.date}</time>
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-codered-500 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        {post.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="text-xs text-codered-500 bg-codered-500/10 px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
