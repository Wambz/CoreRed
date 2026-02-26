import React, { useState, useEffect, useRef } from 'react';
import { Magnet, ChevronDown, ChevronUp, Copy, Check, ExternalLink, ArrowRight, FileText, Download, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MpesaTillBadge from '../../components/MpesaTillBadge';

const MAX_CHARS = 1000;

const SAMPLE_OUTPUTS = [
    { title: '5 Cold Email Tactics That Tripled My Reply Rate', bullets: ['Personalize the first line with a recent company achievement', 'Open with a result, not an introduction', 'Keep it under 80 words — respect their time', 'Include one specific, relevant offer — no generic pitches', 'End with a frictionless CTA: "Worth a 15-min call?"'], pages: 1 },
    { title: 'SaaS Pricing Checklist: Stop Leaving Money on the Table', bullets: ['Anchor with a high-tier plan to make mid-tier look affordable', 'Show annual pricing monthly — reduces sticker shock', 'Spell out ROI in your plan descriptions, not just features', 'Offer a "most popular" badge on your mid-tier plan', 'Monthly trials convert better than free-forever tiers'], pages: 1 },
    { title: 'The No-BS Content Calendar for Solo Founders', bullets: ['Batch-create content on Mondays, schedule Tuesday–Friday', 'Repurpose: 1 long post → 3 short posts + 1 carousel', 'Lead with a contrarian opinion to drive early comments', 'Post at 7–8 AM local time for peak B2B engagement', 'End every post with a question to boost comment velocity'], pages: 1 },
];

const HOW_IT_WORKS = [
    { step: '01', icon: <FileText className="w-7 h-7" />, title: 'Paste your post', description: 'Send your best LinkedIn post (max 1,000 chars) to @Post2LeadBot on Telegram.' },
    { step: '02', icon: <Magnet className="w-7 h-7" aria-hidden />, title: 'Pay $2 via M-Pesa', description: 'Use Till Number 4262280. Your PDF generation begins within seconds of confirmation.' },
    { step: '03', icon: <Download className="w-7 h-7" />, title: 'Download your PDF', description: 'Get a beautifully formatted, ready-to-share checklist PDF delivered directly in Telegram.' },
];

const Post2Lead: React.FC = () => {
    const [postText, setPostText] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);
    const [copied, setCopied] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsPulsing(true);
            setTimeout(() => setIsPulsing(false), 1000);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const handleCopyTill = () => {
        navigator.clipboard.writeText('4262280');
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const charCount = postText.length;
    const charWarning = charCount > 900;
    const charOver = charCount > MAX_CHARS;

    const previewOutput = SAMPLE_OUTPUTS[0];
    const hasPreview = postText.trim().length >= 40;

    return (
        <div className="pt-20 bg-black min-h-screen text-gray-200">
            <SEOHead
                title="Post2Lead – Turn LinkedIn Posts into Lead Magnet PDFs | CodeRed"
                description="Convert your best LinkedIn post into a downloadable PDF checklist lead magnet in 60 seconds. Pay $2 via M-Pesa. Delivered via Telegram."
                canonicalPath="/services/post2lead"
            />

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-codered-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-codered-500/5 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-codered-500/10 border border-codered-500/30 text-codered-400 text-sm font-bold px-4 py-2 rounded-full mb-6">
                        <Magnet className="w-4 h-4" />
                        POST2LEAD · LINKEDIN → PDF IN 60s
                    </div>
                    <h1 className="text-5xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
                        Your best post is<br />
                        <span className="text-codered-500">leaving money on the table.</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
                        Paste your post. Pay $2. Get a downloadable PDF checklist your audience will actually save — delivered in Telegram in under 60 seconds.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm text-gray-500">
                        <span>📋 Used by 47 B2B creators in Kenya</span>
                        <span>·</span>
                        <span>No design skills needed</span>
                        <span>·</span>
                        <span>No subscriptions</span>
                    </div>
                    <a
                        href="https://t.me/Post2LeadBot"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="cta-post2lead-telegram"
                        className={`inline-flex items-center gap-3 px-8 py-4 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-xl transition-all duration-300 ease-in-out text-lg shadow-lg shadow-codered-500/30 ${isPulsing ? 'scale-105 shadow-codered-500/60' : ''}`}
                    >
                        <Magnet className="w-5 h-5" />
                        Convert Now via Telegram
                        <ExternalLink className="w-4 h-4 opacity-70" />
                    </a>
                </div>
            </section>

            {/* ── Interactive Preview ───────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900 bg-dark-900">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">Try It Live</h2>
                    <p className="text-gray-500 text-center mb-10">Paste any LinkedIn post below to see a preview of the checklist it becomes.</p>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Your LinkedIn Post</label>
                            <div className="relative">
                                <textarea
                                    ref={textareaRef}
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value.slice(0, MAX_CHARS))}
                                    placeholder="Paste your best LinkedIn post here (min 40 chars to preview)..."
                                    rows={12}
                                    className="w-full bg-dark-800 border border-gray-800 focus:border-codered-500/50 rounded-xl p-4 text-gray-200 text-sm resize-none outline-none transition-colors font-mono leading-relaxed"
                                />
                                <div className={`absolute bottom-3 right-3 text-xs font-mono ${charOver ? 'text-red-400' : charWarning ? 'text-yellow-400' : 'text-gray-600'}`}>
                                    {charCount}/{MAX_CHARS}
                                </div>
                            </div>
                            {charWarning && !charOver && (
                                <p className="text-yellow-500 text-xs mt-2">⚠️ Approaching character limit — keep it concise for best results.</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">PDF Preview</label>
                            <div className={`bg-white rounded-xl p-6 text-gray-900 shadow-xl min-h-[300px] transition-opacity ${hasPreview ? 'opacity-100' : 'opacity-40'}`}>
                                {hasPreview ? (
                                    <>
                                        <h3 className="text-lg font-black mb-1 text-gray-900">Your Top Checklist Items</h3>
                                        <p className="text-xs text-gray-500 mb-4">Generated from your post · Post2Lead</p>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li className="flex items-start gap-2"><span className="text-codered-500 font-bold">✓</span> Key insight extracted from your opening line</li>
                                            <li className="flex items-start gap-2"><span className="text-codered-500 font-bold">✓</span> Actionable tip derived from your main body</li>
                                            <li className="flex items-start gap-2"><span className="text-codered-500 font-bold">✓</span> Reframed best practice from your post</li>
                                            <li className="flex items-start gap-2"><span className="text-codered-500 font-bold">✓</span> Common mistake your audience should avoid</li>
                                            <li className="flex items-start gap-2"><span className="text-codered-500 font-bold">✓</span> Quick-win your readers can apply today</li>
                                        </ul>
                                        <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-400">
                                            Made with Post2Lead • post2lead.netlify.app
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-3 py-10 text-gray-400">
                                        <Magnet className="w-10 h-10 opacity-30" />
                                        <p className="text-sm text-center">Paste your LinkedIn post on the left to see a live preview here.</p>
                                    </div>
                                )}
                            </div>
                            {hasPreview && (
                                <p className="text-xs text-gray-600 mt-3 text-center">This is a simplified preview. The real PDF uses AI-extracted insights from your actual content.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── How It Works ─────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">How It Works</h2>
                    <p className="text-gray-500 text-center mb-14">Post to PDF in three steps.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {HOW_IT_WORKS.map((step) => (
                            <div key={step.step} className="relative bg-dark-800 rounded-2xl p-8 border border-gray-800 hover:border-codered-500/40 transition-all group">
                                <div className="text-codered-500/25 text-7xl font-black absolute top-4 right-6 select-none group-hover:text-codered-500/45 transition-colors">
                                    {step.step}
                                </div>
                                <div className="w-14 h-14 bg-codered-500/10 rounded-xl flex items-center justify-center text-codered-500 mb-5">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Sample Outputs Carousel ───────────────────────────────── */}
            <section className="py-20 border-t border-gray-900 bg-dark-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">Sample Lead Magnets</h2>
                    <p className="text-gray-500 text-center mb-10">Real anonymized outputs from the Post2Lead pipeline.</p>
                    <div className="relative">
                        <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl min-h-[280px]">
                            <h3 className="text-xl font-black mb-2 text-gray-900">{SAMPLE_OUTPUTS[activeSlide].title}</h3>
                            <p className="text-xs text-gray-400 mb-5">1-page checklist · Generated by Post2Lead</p>
                            <ul className="space-y-3">
                                {SAMPLE_OUTPUTS[activeSlide].bullets.map((b, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                        <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs font-bold text-red-600 shrink-0 mt-0.5">{i + 1}</span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                                <span>Made with Post2Lead</span>
                                <span>post2lead.netlify.app</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-3 mt-6">
                            {SAMPLE_OUTPUTS.map((output, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveSlide(i)}
                                    aria-label={`View sample: ${output.title}`}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${activeSlide === i ? 'bg-codered-500 w-6' : 'bg-gray-700 hover:bg-gray-600'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Pricing ───────────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">Pricing</h2>
                    <p className="text-gray-500 text-center mb-14">No design skills. No subscriptions. Just results.</p>
                    <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <div className="bg-dark-800 rounded-2xl p-8 border border-codered-500 shadow-[0_0_20px_rgba(220,20,60,0.1)] relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-codered-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Best Value</div>
                            <h3 className="text-codered-400 font-bold text-sm uppercase tracking-widest mb-2">Single Conversion</h3>
                            <div className="text-5xl font-black text-white mb-1">$2</div>
                            <p className="text-gray-500 text-sm mb-6">≈ KES 260 via M-Pesa</p>
                            <ul className="space-y-3 text-sm text-gray-300 mb-8">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> Post → AI-structured checklist</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> Clean PDF (1 page, A4)</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> 7-day download link</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> "Made with Post2Lead" footer</li>
                            </ul>
                            <a
                                href="https://t.me/Post2LeadBot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-lg text-center transition-colors"
                            >
                                Convert Now
                            </a>
                        </div>
                        <div className="bg-dark-800 rounded-2xl p-8 border border-gray-800">
                            <h3 className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-2">Bulk Pack</h3>
                            <div className="text-5xl font-black text-white mb-1">$15</div>
                            <p className="text-gray-500 text-sm mb-6">10 conversions · Coming soon</p>
                            <ul className="space-y-3 text-sm text-gray-300 mb-8">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> Everything in Single</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> 30-day credit expiry</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> Priority processing</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> White-label footer option</li>
                            </ul>
                            <button disabled className="block w-full py-3 bg-dark-900 text-gray-600 font-bold rounded-lg text-center cursor-not-allowed border border-gray-800">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Payment Instructions ──────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900 bg-dark-900">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">Pay via M-Pesa</h2>
                    <p className="text-gray-500 mb-10">Lipa Na M-Pesa → Buy Goods and Services → Till Number Below</p>
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <MpesaTillBadge />
                        <button
                            onClick={handleCopyTill}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-dark-800 border border-gray-700 px-4 py-2 rounded-lg"
                        >
                            {copied ? <><Check className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Till Number</>}
                        </button>
                    </div>
                    <p className="text-sm text-gray-600">After paying, open Telegram and send your post to <a href="https://t.me/Post2LeadBot" className="text-codered-400 hover:underline">@Post2LeadBot</a>. Your PDF will be ready in under 60 seconds.</p>
                </div>
            </section>

            {/* ── CTA Footer ────────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <Magnet className="w-12 h-12 text-codered-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">Turn your content into leads.</h2>
                    <p className="text-gray-400 mb-8">Stop letting great posts disappear from feeds. Convert them into assets.</p>
                    <a
                        href="https://t.me/Post2LeadBot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-xl transition-all text-lg shadow-lg shadow-codered-500/30"
                    >
                        Convert My Post Now
                        <ArrowRight className="w-5 h-5" />
                    </a>
                    <div className="mt-8 flex justify-center gap-8 text-sm text-gray-600">
                        <Link to="/services" className="hover:text-gray-400 transition-colors">← Back to Services</Link>
                        <span>·</span>
                        <Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
                    </div>
                    <p className="text-xs text-gray-700 mt-6">Built by Derrick Ndaire · <a href="https://linkedin.com" className="hover:text-gray-500">linkedin.com/in/derrickndaire</a></p>
                </div>
            </section>
        </div>
    );
};

export default Post2Lead;
