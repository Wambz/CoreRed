import React, { useState } from 'react';
import { Check, ArrowRight, TrendingUp, Globe, Server, Shield, Magnet, CheckSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import MpesaTillBadge from '../components/MpesaTillBadge';

const WEB_DEV_TIERS = [
    {
        tier: "Starter",
        title: "Landing Page Package",
        price: "$155",
        description: "Perfect for personal brands and small businesses needing a strong online presence.",
        features: [
            "High-Converting One-Page Design",
            "Mobile Responsive Layout",
            "Contact Form Integration",
            "Basic SEO Setup",
            "Fast Loading Speed (< 2s)",
            "1 Month Free Support"
        ],
        turnaround: "1 Week"
    },
    {
        tier: "Professional",
        title: "CRM & CMS Package",
        price: "$770",
        recommended: true,
        description: "Ideal for growing businesses that need to manage content and relationships.",
        features: [
            "Up to 10 Custom Pages",
            "Custom CRM & CMS Integration",
            "Blog / News Section",
            "Advanced SEO Optimization",
            "Google Analytics Integration",
            "Social Media Integration",
            "3 Months Free Support"
        ],
        turnaround: "2-3 Weeks"
    },
    {
        tier: "Enterprise",
        title: "Custom Web Application",
        price: "Custom",
        description: "For established businesses needing complex functionality and automation.",
        features: [
            "Full Custom Web App Development",
            "User Authentication & Database",
            "Third-party API Integrations",
            "E-commerce Functionality",
            "Admin Dashboard",
            "Automated Workflows (AI/n8n)",
            "6 Months Dedicated Support"
        ],
        turnaround: "4-6 Weeks"
    }
];

const IT_SUPPORT_TIERS = [
    {
        tier: "Tier 1",
        title: "Basic IT Support",
        price: "$115",
        period: "/month",
        description: "Essential support for small teams needing reliable technical assistance.",
        features: [
            "Remote technical support (Business Hours)",
            "Software troubleshooting",
            "Basic network monitoring",
            "Email and phone support",
            "Response time: 24 hours",
            "Monthly system health report"
        ]
    },
    {
        tier: "Tier 2",
        title: "Professional IT Management",
        price: "$270",
        period: "/month",
        recommended: true,
        description: "Comprehensive management for growing businesses requiring proactive care.",
        features: [
            "Everything in Basic",
            "On-site technical support (2 visits/month)",
            "Proactive system maintenance",
            "SQL Server management & backup",
            "Network security monitoring",
            "ERP system support",
            "Basic AI automation setup",
            "Response time: 4 hours"
        ]
    },
    {
        tier: "Tier 3",
        title: "Enterprise IT Solutions",
        price: "$575",
        period: "/month",
        description: "Full-scale infrastructure management for mission-critical operations.",
        features: [
            "Everything in Professional",
            "Unlimited on-site support",
            "24/7 emergency support",
            "Complete IT infrastructure management",
            "Advanced AI automation (N8N, Make)",
            "Security audits & implementation",
            "Dedicated support line",
            "Response time: 1 hour"
        ]
    }
];

const AI_TOOLS = [
    {
        icon: Shield,
        title: 'ClauseGuard',
        badge: 'Contract Scanner',
        price: '$5',
        description: 'Scan freelance contracts for red flags in under 60 seconds. Built specifically for East African freelancers.',
        features: [
            'AI red-flag detection with severity ratings',
            'Clause rewrite suggestions',
            'Confidence score on every analysis',
            'Results delivered via Telegram',
        ],
        cta: 'Scan Contracts',
        link: '/services/clauseguard',
        telegram: 'https://t.me/ClauseGuardBot',
        recommended: false,
    },
    {
        icon: Magnet,
        title: 'Post2Lead',
        badge: 'LinkedIn → PDF',
        price: '$2',
        description: 'Turn your best LinkedIn post into a downloadable PDF lead magnet checklist. No design skills needed.',
        features: [
            'AI-extracted actionable checklist items',
            'Clean A4 PDF in under 60 seconds',
            '7-day download link via Telegram',
            '"Made with Post2Lead" referral footer',
        ],
        cta: 'Convert a Post',
        link: '/services/post2lead',
        telegram: 'https://t.me/Post2LeadBot',
        recommended: true,
    },
    {
        icon: CheckSquare,
        title: 'ReconcileKE',
        badge: 'M-Pesa × Firebase',
        price: '$10',
        description: 'Match M-Pesa statements to Firebase orders in 60 seconds. Get a matched CSV and plain-English AI summary.',
        features: [
            'Supports 3 M-Pesa CSV formats',
            'Firebase order matching (txId + fallback)',
            'AI plain-English discrepancy summary',
            'Google Sheets export link included',
        ],
        cta: 'Reconcile Payments',
        link: '/services/reconcileke',
        telegram: 'https://t.me/ReconcileKEBot',
        recommended: false,
    },
];

const Services: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'web' | 'it' | 'ai'>('web');

    const currentTiers = activeTab === 'web' ? WEB_DEV_TIERS : IT_SUPPORT_TIERS;

    return (
        <div className="pt-20 bg-black min-h-screen">
            <SEOHead
                title="IT & Web Development Services | CodeRed Nairobi"
                description="Affordable web development from $155 and managed IT support from $115/mo. Landing pages, CRM systems, custom web apps & enterprise IT solutions."
                canonicalPath="/services"
            />
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
                            Value-Driven <span className="text-codered-500">Service Packages</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                            Transparent pricing models designed to deliver measurable ROI for your business.
                        </p>

                        {/* Toggle */}
                        <div className="inline-flex p-1 bg-dark-800 rounded-full border border-gray-800 mb-8 max-w-full overflow-x-auto" role="tablist" aria-label="Service categories">
                            <button
                                onClick={() => setActiveTab('web')}
                                role="tab"
                                aria-selected={activeTab === 'web'}
                                id="tab-web"
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'web'
                                    ? 'bg-codered-500 text-white shadow-lg shadow-codered-500/30'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Globe className="w-4 h-4" aria-hidden="true" />
                                Web Development
                            </button>
                            <button
                                onClick={() => setActiveTab('it')}
                                role="tab"
                                aria-selected={activeTab === 'it'}
                                id="tab-it"
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'it'
                                    ? 'bg-codered-500 text-white shadow-lg shadow-codered-500/30'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Server className="w-4 h-4" aria-hidden="true" />
                                IT Support & Management
                            </button>
                            <button
                                onClick={() => setActiveTab('ai')}
                                role="tab"
                                aria-selected={activeTab === 'ai'}
                                id="tab-ai"
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'ai'
                                    ? 'bg-codered-500 text-white shadow-lg shadow-codered-500/30'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Shield className="w-4 h-4" aria-hidden="true" />
                                AI Tools
                            </button>
                        </div>
                    </div>

                    {/* AI Tools Grid */}
                    {activeTab === 'ai' && (
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 animate-fade-in-up" role="tabpanel">
                            {AI_TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <div
                                        key={tool.title}
                                        className={`relative bg-dark-800 rounded-2xl p-8 border ${tool.recommended
                                                ? 'border-codered-500 shadow-[0_0_20px_rgba(220,20,60,0.15)] md:-translate-y-4'
                                                : 'border-gray-800'
                                            } flex flex-col transition-transform hover:scale-[1.02]`}
                                    >
                                        {tool.recommended && (
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-codered-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-codered-500/10 rounded-lg flex items-center justify-center text-codered-500">
                                                    <Icon className="w-5 h-5" aria-hidden />
                                                </div>
                                                <span className="text-xs font-bold text-codered-500 tracking-widest uppercase">{tool.badge}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{tool.title}</h3>
                                            <p className="text-gray-400 text-sm mb-4 min-h-[48px]">{tool.description}</p>
                                            <div className="flex items-baseline gap-1">
                                                <div className="text-4xl font-bold text-white">{tool.price}</div>
                                                <span className="text-gray-500 text-sm">/scan</span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">Via M-Pesa · No subscriptions</div>
                                        </div>
                                        <ul className="space-y-3 mb-8 flex-1">
                                            {tool.features.map((f, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                    <Check className="w-5 h-5 text-codered-500 shrink-0 mt-0.5" aria-hidden />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-col gap-2">
                                            <Link
                                                to={tool.link}
                                                id={`cta-ai-${tool.title.toLowerCase()}`}
                                                className={`w-full py-3 rounded-lg font-bold text-center transition-colors cursor-pointer block ${tool.recommended
                                                        ? 'bg-codered-500 hover:bg-codered-600 text-white'
                                                        : 'bg-dark-900 hover:bg-dark-700 text-white border border-gray-800'
                                                    }`}
                                            >
                                                {tool.cta}
                                            </Link>
                                            <a
                                                href={tool.telegram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-2 rounded-lg text-xs font-bold text-center text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-1"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Open in Telegram
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pricing cards for web/it */}
                    {activeTab !== 'ai' && (
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 animate-fade-in-up" role="tabpanel">
                            {currentTiers.map((service, index) => (
                                <div
                                    key={`${activeTab}-${index}`}
                                    className={`relative bg-dark-800 rounded-2xl p-8 border ${service.recommended ? 'border-codered-500 shadow-[0_0_20px_rgba(220,20,60,0.15)] transform md:-translate-y-4' : 'border-gray-800'
                                        } flex flex-col transition-transform hover:scale-[1.02]`}
                                >
                                    {service.recommended && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-codered-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                                            Most Popular
                                        </div>
                                    )}
                                    <div className="mb-6">
                                        <h2 className="text-codered-500 font-bold tracking-widest text-sm uppercase mb-2">{service.tier}</h2>
                                        <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4 min-h-[40px]">{service.description}</p>
                                        <div className="flex items-baseline gap-1">
                                            <div className="text-4xl font-bold text-white mb-1">{service.price}</div>
                                            {/* @ts-ignore */}
                                            {service.period && <span className="text-gray-500 text-sm">{service.period}</span>}
                                        </div>
                                        {/* @ts-ignore */}
                                        {service.turnaround && <div className="text-xs text-gray-500 mt-2">Turnaround: {service.turnaround}</div>}
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                <Check className="w-5 h-5 text-codered-500 shrink-0" aria-hidden="true" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to="/contact"
                                        id={`cta-choose-${activeTab}-${index}`}
                                        className={`w-full py-3 rounded-lg font-bold text-center transition-colors cursor-pointer block ${service.recommended ? 'bg-codered-500 hover:bg-codered-600 text-white' : 'bg-dark-900 hover:bg-dark-700 text-white'
                                            }`}
                                    >
                                        Choose {service.tier}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ROI Section */}
                    {activeTab === 'web' && (
                        <div className="bg-dark-900 rounded-2xl p-10 border border-gray-800 max-w-4xl mx-auto animate-fade-in-up">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="flex-1">
                                    <div className="inline-flex items-center gap-2 text-codered-500 font-bold mb-4">
                                        <TrendingUp className="w-6 h-6" aria-hidden="true" />
                                        <span>ROI FOCUS</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-4">Why invest in a professional website?</h2>
                                    <p className="text-gray-400 mb-6">
                                        A professional digital presence is not just an expense; it's a revenue generator.
                                        Businesses with optimized web applications see higher engagement, better conversion rates,
                                        and streamlined operations.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-gray-300">
                                            <div className="w-2 h-2 bg-codered-500 rounded-full" aria-hidden="true"></div>
                                            <span>Increase lead generation by up to <strong className="text-white">200%</strong></span>
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-300">
                                            <div className="w-2 h-2 bg-codered-500 rounded-full" aria-hidden="true"></div>
                                            <span>Automate <strong className="text-white">10+ hours</strong> of manual work weekly</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-300">
                                            <div className="w-2 h-2 bg-codered-500 rounded-full" aria-hidden="true"></div>
                                            <span>Improve customer trust and brand credibility</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex-1 bg-black p-8 rounded-xl border border-gray-800 w-full text-center">
                                    <div className="text-5xl font-black text-white mb-2">34%</div>
                                    <div className="text-gray-500 mb-6">Average Conversion Increase</div>

                                    <div className="text-5xl font-black text-white mb-2">60%</div>
                                    <div className="text-gray-500">Reduction in Admin Time</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'it' && (
                        <div className="bg-dark-900 rounded-2xl p-10 border border-gray-800 max-w-4xl mx-auto animate-fade-in-up">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="flex-1">
                                    <div className="inline-flex items-center gap-2 text-codered-500 font-bold mb-4">
                                        <Server className="w-6 h-6" aria-hidden="true" />
                                        <span>INFRASTRUCTURE STABILITY</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-4">Why outsource your IT management?</h2>
                                    <p className="text-gray-400 mb-6">
                                        Downtime costs money. Our proactive IT management ensures your systems are always running, secure, and optimized for peak performance.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-gray-300">
                                            <div className="w-2 h-2 bg-codered-500 rounded-full" aria-hidden="true"></div>
                                            <span>Reduce IT costs by <strong className="text-white">40%</strong> vs in-house hiring</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-300">
                                            <div className="w-2 h-2 bg-codered-500 rounded-full" aria-hidden="true"></div>
                                            <span>Prevent <strong className="text-white">99%</strong> of cyber threats proactively</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-300">
                                            <div className="w-2 h-2 bg-codered-500 rounded-full" aria-hidden="true"></div>
                                            <span>Guaranteed response times for critical issues</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex-1 bg-black p-8 rounded-xl border border-gray-800 w-full text-center">
                                    <div className="text-5xl font-black text-white mb-2">99.9%</div>
                                    <div className="text-gray-500 mb-6">Uptime Guarantee</div>

                                    <div className="text-5xl font-black text-white mb-2">24/7</div>
                                    <div className="text-gray-500">System Monitoring</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-10">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-white mb-4">Have a unique project in mind?</h2>
                            <Link
                                to="/contact"
                                id="cta-custom-quote"
                                className="text-codered-500 font-bold hover:underline flex items-center justify-center gap-2 cursor-pointer mx-auto"
                            >
                                Request a Custom Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm text-gray-500 font-medium">Pay via M-Pesa</span>
                            <MpesaTillBadge />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
