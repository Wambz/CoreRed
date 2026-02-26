import React, { useState, useEffect } from 'react';
import { Shield, ChevronDown, ChevronUp, Copy, Check, ExternalLink, ArrowRight, AlertTriangle, Zap, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MpesaTillBadge from '../../components/MpesaTillBadge';

const FAQ_ITEMS = [
    {
        q: 'Is this legal advice?',
        a: 'No. ClauseGuard is a screening tool only. It helps you identify potential red flags in contract clauses, but does not substitute for advice from a qualified lawyer.'
    },
    {
        q: 'What formats are accepted?',
        a: 'Plain text only (max 5,000 characters). No PDFs yet. Simply copy and paste your contract clause directly into Telegram.'
    },
    {
        q: 'How is my data used?',
        a: 'Your contract text is processed in-memory and deleted after 24 hours. Your data is never stored long-term or used to train AI models.'
    },
    {
        q: 'What happens if the AI is unsure?',
        a: 'If confidence is below 70%, you\'ll receive a ⚠️ Low confidence warning and a recommendation to consult a lawyer before signing.'
    },
    {
        q: 'How do I pay via M-Pesa?',
        a: 'Go to M-Pesa → Lipa Na M-Pesa → Buy Goods and Services → Enter Till Number 4262280 → Amount: $5 (KES 650~) → Confirm.'
    }
];

const SAMPLE_FLAGS = [
    { severity: 'high', clause: 'Clause 4.2 – IP Assignment', text: 'Overly broad intellectual property assignment that transfers ALL work—including pre-existing IP and tools—to the client in perpetuity with no carve-outs.', suggestion: 'Add: "excluding any pre-existing intellectual property or third-party tools used by the Contractor."' },
    { severity: 'medium', clause: 'Clause 7.1 – Non-Compete', text: '24-month non-compete covering any digital services in East Africa. Unusually broad for a freelance engagement.', suggestion: 'Limit scope to direct competitors of the client and reduce duration to 6 months.' },
    { severity: 'low', clause: 'Clause 9.3 – Late Payments', text: 'No penalty clause for late payments from the client. Standard contracts include 1.5%/month interest on overdue invoices.', suggestion: 'Add: "Overdue invoices accrue interest at 1.5% per month from the due date."' },
];

const HOW_IT_WORKS = [
    { step: '01', icon: <FileText className="w-7 h-7" />, title: 'Paste your clause', description: 'Send your contract text (max 5,000 chars) to @ClauseGuardBot on Telegram. No account required.' },
    { step: '02', icon: <Shield className="w-7 h-7" />, title: 'Pay $5 via M-Pesa', description: 'Use Till Number 4262280 to pay. Your session is activated within seconds of payment confirmation.' },
    { step: '03', icon: <Zap className="w-7 h-7" />, title: 'Get red flags in 60s', description: 'Receive a structured analysis with risk levels, explanations, and rewrite suggestions directly in Telegram.' },
];

const ClauseGuard: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showSample, setShowSample] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);

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

    return (
        <div className="pt-20 bg-black min-h-screen text-gray-200">
            <SEOHead
                title="ClauseGuard – AI Contract Scanner for East African Freelancers | CodeRed"
                description="Scan freelance contracts for red flags in 60 seconds via Telegram. Powered by AI. Pay $5 via M-Pesa. Built for East African freelancers."
                canonicalPath="/services/clauseguard"
            />

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-codered-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-codered-500/5 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-codered-500/10 border border-codered-500/30 text-codered-400 text-sm font-bold px-4 py-2 rounded-full mb-6">
                        <Shield className="w-4 h-4" />
                        CLAUSEGUARD · AI CONTRACT SCANNER
                    </div>
                    <h1 className="text-5xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
                        Don't sign that<br />
                        <span className="text-codered-500">contract yet.</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
                        Paste any clause. Get instant red-flag analysis built for <strong className="text-white">East African freelancers</strong>. Results in your Telegram in under 60 seconds.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1">🔒 Powered by Firebase + M-Pesa</span>
                        <span>·</span>
                        <span>No data stored</span>
                        <span>·</span>
                        <span>99.3% uptime</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://t.me/ClauseGuardBot"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="cta-clauseguard-telegram"
                            className={`inline-flex items-center gap-3 px-8 py-4 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-xl transition-all duration-300 ease-in-out text-lg shadow-lg shadow-codered-500/30 ${isPulsing ? 'scale-105 shadow-codered-500/60' : ''}`}
                        >
                            <Shield className="w-5 h-5" />
                            Scan Now via Telegram
                            <ExternalLink className="w-4 h-4 opacity-70" />
                        </a>
                        <button
                            onClick={() => setShowSample(true)}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 border border-gray-800 text-white font-bold rounded-xl transition-all text-lg"
                        >
                            See Sample Output
                        </button>
                    </div>
                </div>
            </section>

            {/* ── How It Works ─────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">How It Works</h2>
                    <p className="text-gray-500 text-center mb-14">Three steps between you and a safer contract.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {HOW_IT_WORKS.map((step) => (
                            <div key={step.step} className="relative bg-dark-800 rounded-2xl p-8 border border-gray-800 hover:border-codered-500/40 transition-all group">
                                <div className="text-codered-500/30 text-7xl font-black absolute top-4 right-6 select-none group-hover:text-codered-500/50 transition-colors">
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

            {/* ── Sample Output ─────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900 bg-dark-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold text-white">Sample Analysis Output</h2>
                        <button
                            onClick={() => setShowSample(!showSample)}
                            className="flex items-center gap-2 text-sm text-codered-400 hover:text-codered-300 font-bold"
                        >
                            {showSample ? 'Hide' : 'Show'} Example
                            {showSample ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">Anonymized output from a real freelance contract scan (with permission).</p>
                    {showSample && (
                        <div className="space-y-4 animate-fade-in">
                            {SAMPLE_FLAGS.map((flag, idx) => (
                                <div
                                    key={idx}
                                    className={`rounded-xl p-6 border ${flag.severity === 'high' ? 'bg-red-950/30 border-red-800/50' : flag.severity === 'medium' ? 'bg-yellow-950/20 border-yellow-800/40' : 'bg-dark-800 border-gray-800'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${flag.severity === 'high' ? 'text-red-400' : flag.severity === 'medium' ? 'text-yellow-400' : 'text-gray-500'}`} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-white font-bold text-sm">{flag.clause}</span>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${flag.severity === 'high' ? 'bg-red-500/20 text-red-400' : flag.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700 text-gray-400'}`}>
                                                    {flag.severity} risk
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-3">{flag.text}</p>
                                            <div className="bg-black/30 rounded-lg p-3 border border-green-900/30">
                                                <div className="text-xs text-green-400 font-bold mb-1">✏️ SUGGESTED REWRITE</div>
                                                <p className="text-gray-400 text-sm italic">{flag.suggestion}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4 p-4 bg-dark-800 rounded-xl border border-gray-800 text-center text-xs text-gray-500">
                                ⚠️ <em>This is a screening tool, not legal advice. Confidence: 0.91 · Consult a lawyer before signing any binding agreement.</em>
                                <br />
                                <a href="https://t.me/ClauseGuardBot" className="text-codered-400 hover:underline mt-1 inline-block">🔗 Fix these clauses with ClauseFix Pro →</a>
                            </div>
                        </div>
                    )}
                    {!showSample && (
                        <button
                            onClick={() => setShowSample(true)}
                            className="w-full py-10 border-2 border-dashed border-gray-800 rounded-xl text-gray-500 hover:border-codered-500/40 hover:text-codered-400 transition-all font-medium"
                        >
                            Click to reveal anonymized sample output →
                        </button>
                    )}
                </div>
            </section>

            {/* ── Pricing ───────────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">Simple Pricing</h2>
                    <p className="text-gray-500 text-center mb-14">No subscriptions. No accounts. Pay only when you need it.</p>
                    <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <div className="bg-dark-800 rounded-2xl p-8 border border-codered-500 shadow-[0_0_20px_rgba(220,20,60,0.1)] relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-codered-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
                            <h3 className="text-codered-400 font-bold text-sm uppercase tracking-widest mb-2">Single Scan</h3>
                            <div className="text-5xl font-black text-white mb-1">$5</div>
                            <p className="text-gray-500 text-sm mb-6">≈ KES 650 via M-Pesa</p>
                            <ul className="space-y-3 text-sm text-gray-300 mb-8">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> Up to 5,000 character clause</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> 3 red flags + severity ratings</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> Rewrite suggestions</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> Result in under 60 seconds</li>
                            </ul>
                            <a
                                href="https://t.me/ClauseGuardBot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-lg text-center transition-colors"
                            >
                                Scan Now
                            </a>
                        </div>
                        <div className="bg-dark-800 rounded-2xl p-8 border border-gray-800">
                            <h3 className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-2">Bulk Pack</h3>
                            <div className="text-5xl font-black text-white mb-1">$20</div>
                            <p className="text-gray-500 text-sm mb-6">5 scans · Coming soon</p>
                            <ul className="space-y-3 text-sm text-gray-300 mb-8">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> Everything in Single Scan</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> 30-day expiry on credits</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> Priority processing</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> ClauseFix Pro upsell access</li>
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
                    <h2 className="text-2xl font-bold text-white mb-3">How to Pay via M-Pesa</h2>
                    <p className="text-gray-500 mb-10">Lipa Na M-Pesa → Buy Goods and Services → Enter Till Number Below</p>
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <MpesaTillBadge />
                        <button
                            onClick={handleCopyTill}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-dark-800 border border-gray-700 px-4 py-2 rounded-lg"
                        >
                            {copied ? <><Check className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Till Number</>}
                        </button>
                    </div>
                    <p className="text-sm text-gray-600">After paying, open Telegram and send your contract text to <a href="https://t.me/ClauseGuardBot" className="text-codered-400 hover:underline">@ClauseGuardBot</a>. Your session activates automatically upon payment confirmation.</p>
                </div>
            </section>

            {/* ── FAQ ───────────────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {FAQ_ITEMS.map((item, idx) => (
                            <div
                                key={idx}
                                className={`bg-dark-800 rounded-xl border transition-all ${openFaq === idx ? 'border-codered-500/40' : 'border-gray-800'}`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="text-white font-medium">{item.q}</span>
                                    {openFaq === idx
                                        ? <ChevronUp className="w-5 h-5 text-codered-400 shrink-0" />
                                        : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Footer ────────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900 bg-dark-900">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <Shield className="w-12 h-12 text-codered-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to protect yourself?</h2>
                    <p className="text-gray-400 mb-8">Join freelancers across East Africa who scan before they sign.</p>
                    <a
                        href="https://t.me/ClauseGuardBot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-xl transition-all text-lg shadow-lg shadow-codered-500/30"
                    >
                        Start Scanning Now
                        <ArrowRight className="w-5 h-5" />
                    </a>
                    <div className="mt-8 flex justify-center gap-8 text-sm text-gray-600">
                        <Link to="/services" className="hover:text-gray-400 transition-colors">← Back to Services</Link>
                        <span>·</span>
                        <a href="https://t.me/ClauseGuardBot" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                        <span>·</span>
                        <Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
                    </div>
                    <p className="text-xs text-gray-700 mt-6">Built by Derrick Ndaire · <a href="https://linkedin.com" className="hover:text-gray-500">linkedin.com/in/derrickndaire</a></p>
                </div>
            </section>
        </div>
    );
};

export default ClauseGuard;
