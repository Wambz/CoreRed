import React from 'react';
import { Terminal, Database, Cpu, Shield, Check } from 'lucide-react';
import { SKILLS, EXPERIENCE } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import SEOHead from '../components/SEOHead';

const About: React.FC = () => {

    return (
        <div className="pt-20 bg-black min-h-screen">
            <SEOHead
                title="About Derrick Ndaire | IT Expert & CodeRed Founder"
                description="Learn about Derrick Ndaire — CCNA certified IT specialist with 8+ years in network admin, SQL Server, ERP systems & AI automation. Founder of CodeRed Innovations in Nairobi."
                canonicalPath="/about"
            />

            {/* ABOUT SECTION */}
            <section className="py-20 bg-dark-900">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16 items-start">
                        <div className="flex-1">
                            <span className="text-codered-500 font-bold tracking-widest uppercase mb-2 block">About Me</span>
                            <h1 className="text-4xl font-heading font-bold text-white mb-6">Driving Innovation Through Tech</h1>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Results-driven ICT Specialist and founder of <span className="text-white font-bold">CodeRed</span>, with over 8 years of experience in IT support, network administration, system maintenance, and AI automation.
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                I possess proven expertise in managing complex IT infrastructures, implementing security measures, and delivering technical solutions. Recently, I have expanded my portfolio to include AI-powered business process automation using tools like Claude, N8N, and Make to enhance organizational efficiency.
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
                                <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-lg border border-gray-800">
                                    <Cpu className="text-codered-500 w-6 h-6" aria-hidden="true" />
                                    <span className="font-medium text-sm">AI Automation</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-lg border border-gray-800">
                                    <Shield className="text-codered-500 w-6 h-6" aria-hidden="true" />
                                    <span className="font-medium text-sm">Cyber Security</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <div className="bg-dark-800 p-8 rounded-2xl border border-gray-800 relative hover:border-codered-500/30 transition-colors">
                                <div className="absolute -top-4 -right-4 bg-codered-500 text-white px-4 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                    Certified
                                </div>
                                <h2 className="text-xl font-bold text-white mb-6">Certifications</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <Check className="text-codered-500 w-5 h-5 mt-1 shrink-0" aria-hidden="true" />
                                        <div>
                                            <strong className="block text-white">micro1 AI Certified System Support Specialist</strong>
                                            <span className="text-sm text-gray-500">May 2025 - Verified Excellence in AI Interview</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="text-codered-500 w-5 h-5 mt-1 shrink-0" aria-hidden="true" />
                                        <div>
                                            <strong className="block text-white">Cisco Certified Network Associate (CCNA)</strong>
                                            <span className="text-sm text-gray-500">Institute of Advanced Technology (IAT)</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="text-codered-500 w-5 h-5 mt-1 shrink-0" aria-hidden="true" />
                                        <div>
                                            <strong className="block text-white">ISO 22000:2005 & ISO/TS 22002-4</strong>
                                            <span className="text-sm text-gray-500">Awareness & Internal Audit Training</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="text-codered-500 w-5 h-5 mt-1 shrink-0" aria-hidden="true" />
                                        <div>
                                            <strong className="block text-white">Diploma in CS & IT</strong>
                                            <span className="text-sm text-gray-500">The East African University</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PERSONAL GALLERY SECTION */}
            <section className="py-20 bg-dark-800 border-y border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">The Person <span className="text-codered-500">Behind CodeRed</span></h2>
                        <p className="text-gray-400">Beyond the code, I am a father and an explorer.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="rounded-xl overflow-hidden border border-gray-800 hover:border-codered-500 transition-all duration-500 group h-80">
                            <img src="/about-avatar.jpg" alt="Derrick Ndaire professional avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                        </div>
                        <div className="rounded-xl overflow-hidden border border-gray-800 hover:border-codered-500 transition-all duration-500 group h-80">
                            <img src="/about-hiking.jpg" alt="Derrick Ndaire exploring nature outdoors" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SKILLS SECTION */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Core <span className="text-codered-500">Competencies</span></h2>
                        <p className="text-gray-400">Technical proficiency and modern tooling</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex-1 h-96 w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%" debounce={50}>
                                <BarChart data={SKILLS} layout="vertical" margin={{ left: 40, right: 20 }}>
                                    <XAxis type="number" hide domain={[0, 100]} />
                                    <YAxis dataKey="name" type="category" width={150} tick={{ fill: '#fff', fontSize: 12 }} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                                        {SKILLS.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#DC143C' : '#333'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-4">
                            {['Claude AI', 'N8N', 'Make', 'Google Studio', 'HTML5/CSS', 'JavaScript', 'SQL Server', 'Freshdesk'].map((tech) => (
                                <div key={tech} className="bg-dark-900 border border-gray-800 p-6 rounded-lg flex items-center justify-center text-center hover:border-codered-500 transition-colors cursor-default group">
                                    <span className="font-bold text-gray-400 group-hover:text-white transition-colors">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE TIMELINE */}
            <section className="py-20 bg-dark-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Professional <span className="text-codered-500">Journey</span></h2>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Center Line */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 md:-ml-0.5" aria-hidden="true"></div>

                        {EXPERIENCE.map((exp, index) => (
                            <div key={exp.id} className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex-1"></div>

                                {/* Dot */}
                                <div className="absolute left-0 md:left-1/2 -ml-1.5 md:-ml-2 w-3 h-3 md:w-4 md:h-4 bg-codered-500 rounded-full mt-6 shadow-[0_0_10px_#DC143C]" aria-hidden="true"></div>

                                <div className="flex-1 pl-8 md:pl-0 md:px-8">
                                    <div className="bg-dark-800 p-6 rounded-lg border border-gray-800 hover:border-codered-500/50 transition-colors">
                                        <span className="text-codered-500 font-bold text-sm tracking-widest">{exp.period}</span>
                                        <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                                        <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
                                        <ul className="space-y-2">
                                            {exp.details.map((detail, idx) => (
                                                <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" aria-hidden="true"></span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
