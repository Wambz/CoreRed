import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import SEOHead from '../../components/SEOHead';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';

const WriteBlog: React.FC = () => {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: 'idle', message: '' });

        try {
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(t => t);

            // 1. Save to Firebase
            const blogData = {
                title,
                excerpt,
                content,
                tags: tagArray,
                // generate a friendly date format like "May 15, 2025" for display
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, 'posts'), blogData);

            // 2. Trigger n8n webhook for LinkedIn auto-publish
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
            if (webhookUrl && webhookUrl !== 'https://your-n8n-instance.com/webhook/post-to-linkedin') {
                try {
                    await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(blogData)
                    });
                } catch (webhookErr) {
                    console.error("Failed to trigger LinkedIn webhook:", webhookErr);
                    // We don't fail the whole process if just the webhook fails, but we could notify
                }
            }

            setStatus({ type: 'success', message: 'Blog published successfully and sent to LinkedIn queue!' });
            setTitle('');
            setExcerpt('');
            setContent('');
            setTags('');

        } catch (error: any) {
            console.error('Error publishing blog:', error);
            setStatus({ type: 'error', message: error.message || 'Failed to publish blog. Check permissions or network.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-black">
            <SEOHead title="Admin: Write Blog | CodeRed" description="Publish a new blog" canonicalPath="/admin/write-blog" />
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="bg-dark-900 border border-gray-800 p-8 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-black text-white mb-8">
                        Write a New <span className="text-codered-500">Post</span>
                    </h1>

                    {status.type !== 'idle' && (
                        <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-500' : 'bg-red-500/10 border border-red-500/30 text-red-500'}`}>
                            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            <span>{status.message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-codered-500 transition-colors"
                                placeholder="E.g., 5 Essential Network Security Practices"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Excerpt (Short Summary)</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                required
                                rows={2}
                                className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-codered-500 transition-colors"
                                placeholder="A brief 1-2 sentence summary of the post..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Content (LinkedIn Format)</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={8}
                                className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-codered-500 transition-colors"
                                placeholder="Write your full blog post here. This content will be sent to the n8n webhook for LinkedIn..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Tags (Comma separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-codered-500 transition-colors"
                                placeholder="Security, Network, AI, Automation"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-codered-500 hover:bg-codered-600 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Publishing...' : (
                                <>
                                    Publish to Blog & LinkedIn <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WriteBlog;
