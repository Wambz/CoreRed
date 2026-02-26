import React from 'react';
import { ArrowRight, ChevronDown, MapPin, Check, Terminal, Database, Cpu, Shield, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../constants';
import SEOHead from '../components/SEOHead';
import MpesaTillBadge from '../components/MpesaTillBadge';
import Hero from '../src/components/Hero/Hero';

const Home: React.FC = () => {
    const scrollToSection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <SEOHead
                title="Derrick Ndaire | IT Specialist & Web Developer - Nairobi"
                description="Results-driven IT specialist & web developer in Nairobi, Kenya. 8+ years experience in infrastructure, security, web apps & AI automation. $2M+ client revenue."
                canonicalPath="/"
            />

            {/* HERO SECTION */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Background Digital Grid Effect */}
                <div className="absolute inset-0 opacity-10 pointer-events-none z-0"
                    style={{
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="container mx-auto px-6 relative z-30 flex flex-col md:flex-row items-center gap-12 pointer-events-none">
                    <div className="flex-1 space-y-8 animate-fade-in-up pointer-events-auto">

                        <div className="h-12 mb-6"></div>
                        <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight text-white mb-6">
                            I Build <span className="text-codered-500">Revenue-Generating</span> Web Applications That Scale
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mb-8">
                            Specializing in E-commerce Platforms & SaaS Solutions for Growing Businesses | $2M+ in Client Revenue Generated
                        </p>
                        <p className="text-gray-500 max-w-lg mb-10">
                            Trusted by 50+ Businesses to transform IT challenges into strategic solutions with cutting-edge technology.
                        </p>

                        <div className="flex flex-wrap gap-4 relative z-40 pointer-events-auto">
                            <Link
                                to="/services"
                                id="cta-consultation"
                                className="px-8 py-4 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-codered-500/30 cursor-pointer block text-center"
                            >
                                Schedule a Free Consultation
                            </Link>
                            <Link
                                to="/portfolio"
                                id="cta-case-studies"
                                className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold rounded-lg transition-all cursor-pointer block text-center"
                            >
                                View Case Studies
                            </Link>
                        </div>

                        <div className="flex gap-8 pt-8 border-t border-gray-800">
                            <div>
                                <span className="block text-3xl font-bold text-white">8+</span>
                                <span className="text-sm text-gray-500">Years Exp.</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-white">100+</span>
                                <span className="text-sm text-gray-500">Projects</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-white">CCNA</span>
                                <span className="text-sm text-gray-500">Certified</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative w-full max-w-lg z-20 pointer-events-auto">
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-codered-500/20 shadow-2xl bg-dark-800">
                            <img
                                src="/about-avatar.jpg"
                                alt="Derrick Ndaire - IT Specialist and Web Developer based in Nairobi, Kenya"
                                className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                                loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-6 left-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="text-codered-500 w-5 h-5" />
                                    <span className="text-white font-medium">Nairobi, Kenya</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none z-10">
                    <ChevronDown className="w-8 h-8 text-gray-500" aria-hidden="true" />
                </div>
            </section>

            {/* ABOUT PREVIEW */}
            <section className="py-20 bg-dark-900" id="main-content">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16 items-start">
                        <div className="flex-1">
                            <h2 className="text-codered-500 font-bold tracking-widest uppercase mb-2">About Me</h2>
                            <h3 className="text-4xl font-heading font-bold text-white mb-6">Driving Innovation Through Tech</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Results-driven ICT Specialist and founder of <span className="text-white font-bold">CodeRed</span>, with over 8 years of experience in IT support, network administration, system maintenance, and AI automation.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-lg border border-gray-800">
                                    <Terminal className="text-codered-500 w-6 h-6" aria-hidden="true" />
                                    <span className="font-medium text-sm">Network Admin</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-lg border border-gray-800">
                                    <Database className="text-codered-500 w-6 h-6" aria-hidden="true" />
                                    <span className="font-medium text-sm">SQL & ERP</span>
                                </div>
                            </div>

                            <Link
                                to="/about"
                                id="cta-about-me"
                                className="flex items-center gap-2 text-white border-b-2 border-codered-500 pb-1 hover:text-codered-500 transition-colors cursor-pointer group w-fit"
                            >
                                <span className="font-bold">Read More About Me</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-12">Trusted by Industry Professionals</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.slice(0, 3).map((t) => (
                            <div key={t.id} className="bg-dark-900 p-8 rounded-xl border border-gray-800 relative">
                                <div className="text-codered-500 text-6xl absolute top-4 left-4 opacity-20 font-serif" aria-hidden="true">"</div>
                                <p className="text-gray-300 italic mb-6 relative z-10">{t.text}</p>
                                <div>
                                    <div className="font-bold text-white">{t.author}</div>
                                    <div className="text-xs text-gray-500 uppercase">{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* M-Pesa Payment Section */}
            <section className="py-16 bg-dark-900 border-t border-gray-800">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-xl font-bold text-white mb-2">Pay via M-Pesa</h2>
                    <p className="text-gray-500 text-sm mb-6">Use the till number below for quick payments</p>
                    <div className="flex justify-center">
                        <MpesaTillBadge />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
