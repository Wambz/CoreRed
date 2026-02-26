import React, { useState, useEffect } from 'react';
import { CheckSquare, ChevronDown, ChevronUp, Copy, Check, ExternalLink, ArrowRight, AlertTriangle, FileText, Database, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MpesaTillBadge from '../../components/MpesaTillBadge';

const FAQ_ITEMS = [
    {
        q: 'What CSV formats are supported?',
        a: 'We support Safaricom Business exports, Safaricom Personal statements, and custom CSV exports in the format: amount, phone, timestamp. If your format is unrecognized, we send a format guide and allow you to retry.'
    },
    {
        q: 'How is my financial data used?',
        a: 'Your CSV is parsed in-memory only. Raw data is permanently deleted from storage after 24 hours. We never sell or share your transaction data with third parties.'
    },
    {
        q: 'What if I have 100+ transactions?',
        a: 'Split your CSV into batches of 50 rows. Future versions will support automated batching for larger statements.'
    },
    {
        q: 'What does "unmatched" mean?',
        a: 'An unmatched transaction means no corresponding order was found in your Firebase database for that payment. Common causes: order creation failed, duplicate payment, or incorrect reference number.'
    },
    {
        q: 'Do I need a Firebase account?',
        a: 'Yes — you need to connect your Firebase project via a one-time setup. Our bot guides you through it. Contact us on Telegram for the setup walkthrough.'
    }
];

const SAMPLE_ROWS = [
    { status: 'matched', txId: 'QJF3X9WR', amount: 'KES 2,500', timestamp: '2024-01-15 09:32', phone: '0712****89', orderId: 'ORD-1042' },
    { status: 'matched', txId: 'AKL8M2TY', amount: 'KES 1,800', timestamp: '2024-01-15 10:14', phone: '0722****34', orderId: 'ORD-1043' },
    { status: 'unmatched', txId: 'PNR5K0WQ', amount: 'KES 3,000', timestamp: '2024-01-15 11:58', phone: '0733****01', orderId: null },
    { status: 'matched', txId: 'XCV2B7LH', amount: 'KES 950', timestamp: '2024-01-15 13:25', phone: '0701****77', orderId: 'ORD-1045' },
    { status: 'unmatched', txId: 'MNJ4P9QS', amount: 'KES 5,000', timestamp: '2024-01-15 15:40', phone: '0741****22', orderId: null },
];

const HOW_IT_WORKS = [
    { step: '01', icon: <FileText className="w-7 h-7" />, title: 'Paste your CSV', description: 'Copy 20-50 lines from your M-Pesa statement and send to @ReconcileKEBot. We auto-detect the format.' },
    { step: '02', icon: <Database className="w-7 h-7" />, title: 'Pay $10 via M-Pesa', description: 'Use Till Number 4262280. We match your transactions against your Firebase orders database in seconds.' },
    { step: '03', icon: <Zap className="w-7 h-7" />, title: 'Get matched CSV + summary', description: 'Receive a colour-coded CSV with match status and a plain-English AI summary of all discrepancies.' },
];

const ReconcileKE: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showSample, setShowSample] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);
    const [csvPaste, setCsvPaste] = useState('');
    const [detectedFormat, setDetectedFormat] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsPulsing(true);
            setTimeout(() => setIsPulsing(false), 1000);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!csvPaste.trim()) { setDetectedFormat(null); return; }
        const lower = csvPaste.toLowerCase();
        const timeout = setTimeout(() => {
            if (lower.includes('transaction id') && lower.includes('till')) {
                setDetectedFormat('Safaricom Business');
            } else if (lower.includes('transid') && lower.includes('msisdn')) {
                setDetectedFormat('Safaricom Personal');
            } else if (csvPaste.includes(',') && csvPaste.split('\n').length > 1) {
                setDetectedFormat('Custom CSV');
            } else {
                setDetectedFormat('Unrecognized — paste header row for detection');
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [csvPaste]);

    const handleCopyTill = () => {
        navigator.clipboard.writeText('4262280');
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const matchedCount = SAMPLE_ROWS.filter(r => r.status === 'matched').length;
    const unmatchedCount = SAMPLE_ROWS.filter(r => r.status === 'unmatched').length;

    return (
        <div className="pt-20 bg-black min-h-screen text-gray-200">
            <SEOHead
                title="ReconcileKE – M-Pesa to Firebase Order Matching | CodeRed"
                description="Reconcile M-Pesa statements against Firebase orders in 60 seconds via Telegram. Pay $10 via M-Pesa. Get matched CSV + AI summary. Built for Kenyan SaaS founders."
                canonicalPath="/services/reconcileke"
            />

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-codered-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-codered-500/5 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-codered-500/10 border border-codered-500/30 text-codered-400 text-sm font-bold px-4 py-2 rounded-full mb-6">
                        <CheckSquare className="w-4 h-4" />
                        RECONCILEKE · M-PESA × FIREBASE
                    </div>
                    <h1 className="text-5xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
                        Stop losing money to<br />
                        <span className="text-codered-500">unreconciled payments.</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
                        Paste your M-Pesa CSV. Pay $10. Get matched transactions + a plain-English summary delivered in Telegram in under 60 seconds.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm text-gray-500">
                        <span>🏗️ Built for Kenyan SaaS founders</span>
                        <span>·</span>
                        <span>99.4% uptime</span>
                        <span>·</span>
                        <span>Data deleted in 24h</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://t.me/ReconcileKEBot"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="cta-reconcileke-telegram"
                            className={`inline-flex items-center gap-3 px-8 py-4 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-xl transition-all duration-300 ease-in-out text-lg shadow-lg shadow-codered-500/30 ${isPulsing ? 'scale-105 shadow-codered-500/60' : ''}`}
                        >
                            <CheckSquare className="w-5 h-5" />
                            Reconcile Now via Telegram
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

            {/* ── CSV Format Detector ───────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900 bg-dark-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">Try the Format Detector</h2>
                    <p className="text-gray-500 text-center mb-10">Paste the first 3 lines of your M-Pesa export to see if your format is supported.</p>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Paste CSV Snippet</label>
                            <textarea
                                value={csvPaste}
                                onChange={(e) => setCsvPaste(e.target.value)}
                                placeholder={`Transaction ID,Amount,Date,Phone,Till Number\nQJF3X9WR,2500,2024-01-15,0712345689,4262280\nAKL8M2TY,1800,2024-01-15,0722345634,4262280`}
                                rows={8}
                                className="w-full bg-dark-800 border border-gray-800 focus:border-codered-500/50 rounded-xl p-4 text-gray-200 text-sm resize-none outline-none transition-colors font-mono leading-relaxed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Detection Result</label>
                            <div className="bg-dark-800 rounded-xl border border-gray-800 p-6 min-h-[200px] flex flex-col justify-center">
                                {detectedFormat ? (
                                    <div className="space-y-4">
                                        <div className={`flex items-center gap-3 ${detectedFormat.includes('Unrecognized') ? 'text-yellow-400' : 'text-green-400'}`}>
                                            {detectedFormat.includes('Unrecognized')
                                                ? <AlertTriangle className="w-6 h-6" />
                                                : <Check className="w-6 h-6" />}
                                            <span className="font-bold">Detected: {detectedFormat}</span>
                                        </div>
                                        {!detectedFormat.includes('Unrecognized') && (
                                            <>
                                                <p className="text-gray-400 text-sm">✅ This format is supported. You can proceed with full reconciliation.</p>
                                                <div className="bg-black/30 rounded-lg p-3 text-xs text-gray-500 font-mono">
                                                    Expected fields: txId · amount · timestamp · phone
                                                </div>
                                            </>
                                        )}
                                        {detectedFormat.includes('Unrecognized') && (
                                            <p className="text-yellow-500 text-sm">Include your CSV header row so our bot can auto-detect and normalize your format.</p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-600">
                                        <Database className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Paste your CSV header above to detect format</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 p-3 bg-dark-800 rounded-xl border border-gray-800 text-xs text-gray-500">
                                <div className="font-bold text-gray-400 mb-2">Supported Formats:</div>
                                <div className="space-y-1">
                                    <div>✅ Safaricom Business (Till / PayBill)</div>
                                    <div>✅ Safaricom Personal Statement</div>
                                    <div>✅ Custom CSV (amount, phone, timestamp)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── How It Works ─────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">How It Works</h2>
                    <p className="text-gray-500 text-center mb-14">Reconcile in three steps.</p>
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

            {/* ── Sample Output ─────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900 bg-dark-900">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold text-white">Sample Reconciliation Output</h2>
                        <button
                            onClick={() => setShowSample(!showSample)}
                            className="flex items-center gap-2 text-sm text-codered-400 hover:text-codered-300 font-bold"
                        >
                            {showSample ? 'Hide' : 'Show'} Example
                            {showSample ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">Anonymized output. Transaction IDs and phone numbers have been redacted.</p>
                    {showSample && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="overflow-x-auto rounded-xl border border-gray-800">
                                <table className="w-full text-sm font-mono">
                                    <thead>
                                        <tr className="bg-dark-900 text-gray-500 text-xs uppercase tracking-wider">
                                            <th className="px-4 py-3 text-left">Status</th>
                                            <th className="px-4 py-3 text-left">Tx ID</th>
                                            <th className="px-4 py-3 text-left">Amount</th>
                                            <th className="px-4 py-3 text-left">Timestamp</th>
                                            <th className="px-4 py-3 text-left">Phone</th>
                                            <th className="px-4 py-3 text-left">Order ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {SAMPLE_ROWS.map((row, idx) => (
                                            <tr key={idx} className={`border-t border-gray-900 ${row.status === 'unmatched' ? 'bg-red-950/20' : 'bg-dark-800'}`}>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded ${row.status === 'matched' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                                                        {row.status === 'matched' ? '✅ Matched' : '❌ Unmatched'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-400">{row.txId}</td>
                                                <td className="px-4 py-3 text-white font-semibold">{row.amount}</td>
                                                <td className="px-4 py-3 text-gray-500">{row.timestamp}</td>
                                                <td className="px-4 py-3 text-gray-500">{row.phone}</td>
                                                <td className="px-4 py-3">{row.orderId ? <span className="text-blue-400">{row.orderId}</span> : <span className="text-gray-700">—</span>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-dark-800 rounded-xl border border-gray-800 p-6">
                                <div className="flex items-center gap-2 text-codered-400 font-bold text-sm mb-3 uppercase tracking-widest">
                                    <Zap className="w-4 h-4" /> AI Summary
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    <strong>3 of 5 transactions matched</strong> to existing orders ({matchedCount}/{SAMPLE_ROWS.length} · 60%).
                                    {' '}{unmatchedCount} transactions remain unmatched — most likely cause is failed order creation at the point of payment.
                                    Action required: Manually verify Tx <span className="text-red-400 font-mono">PNR5K0WQ</span> (KES 3,000) and <span className="text-red-400 font-mono">MNJ4P9QS</span> (KES 5,000) against your CRM logs.
                                </p>
                            </div>
                        </div>
                    )}
                    {!showSample && (
                        <button
                            onClick={() => setShowSample(true)}
                            className="w-full py-10 border-2 border-dashed border-gray-800 rounded-xl text-gray-500 hover:border-codered-500/40 hover:text-codered-400 transition-all font-medium"
                        >
                            Click to reveal anonymized reconciliation result →
                        </button>
                    )}
                </div>
            </section>

            {/* ── Pricing ───────────────────────────────────────────────── */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">Pricing</h2>
                    <p className="text-gray-500 text-center mb-14">One flat fee. Know exactly what you're paying.</p>
                    <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <div className="bg-dark-800 rounded-2xl p-8 border border-codered-500 shadow-[0_0_20px_rgba(220,20,60,0.1)] relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-codered-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Popular</div>
                            <h3 className="text-codered-400 font-bold text-sm uppercase tracking-widest mb-2">Single Reconciliation</h3>
                            <div className="text-5xl font-black text-white mb-1">$10</div>
                            <p className="text-gray-500 text-sm mb-6">≈ KES 1,300 via M-Pesa</p>
                            <ul className="space-y-3 text-sm text-gray-300 mb-8">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> Up to 50 transactions</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> Matched + unmatched CSV</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> Plain-English AI summary</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> 7-day download links</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-codered-500 shrink-0" /> Google Sheets export link</li>
                            </ul>
                            <a
                                href="https://t.me/ReconcileKEBot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-lg text-center transition-colors"
                            >
                                Reconcile Now
                            </a>
                        </div>
                        <div className="bg-dark-800 rounded-2xl p-8 border border-gray-800">
                            <h3 className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-2">Weekly Bundle</h3>
                            <div className="text-5xl font-black text-white mb-1">$35</div>
                            <p className="text-gray-500 text-sm mb-6">4 reconciliations · Coming soon</p>
                            <ul className="space-y-3 text-sm text-gray-300 mb-8">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> Everything in Single</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> 30-day rolling credits</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> Priority processing</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-600 shrink-0" /> Auto-Sync Pro upsell</li>
                            </ul>
                            <button disabled className="block w-full py-3 bg-dark-900 text-gray-600 font-bold rounded-lg text-center cursor-not-allowed border border-gray-800">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 max-w-2xl mx-auto bg-dark-900 rounded-xl border border-gray-800 p-5 text-center">
                        <p className="text-sm text-gray-400">
                            <strong className="text-white">Auto-Sync Pro:</strong> Connect M-Pesa API for real-time reconciliation.
                            <span className="text-codered-400"> $15/month</span> —
                            <Link to="/contact" className="text-gray-500 hover:text-gray-300 underline ml-1">Join waitlist →</Link>
                        </p>
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
                    <p className="text-sm text-gray-600">After paying, open Telegram and send your CSV to <a href="https://t.me/ReconcileKEBot" className="text-codered-400 hover:underline">@ReconcileKEBot</a>. Your reconciliation will be ready in under 60 seconds.</p>
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
                    <CheckSquare className="w-12 h-12 text-codered-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">Start reconciling in minutes.</h2>
                    <p className="text-gray-400 mb-8">Stop losing revenue to unmatched payments. Get clarity in under 60 seconds.</p>
                    <a
                        href="https://t.me/ReconcileKEBot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-xl transition-all text-lg shadow-lg shadow-codered-500/30"
                    >
                        Reconcile Now
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

export default ReconcileKE;
