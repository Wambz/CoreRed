import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black pt-16 border-t border-gray-800" role="contentinfo">
            <div className="container mx-auto px-6 mb-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-gray-500 text-sm">
                            Transforming businesses through robust IT infrastructure and intelligent automation solutions.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4 pt-2">
                            <a
                                href="https://www.linkedin.com/in/derrick-ndaire-8549a8107/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-codered-500 transition-colors text-sm font-medium"
                                aria-label="LinkedIn profile"
                                id="footer-linkedin"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/Wambz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-codered-500 transition-colors text-sm font-medium"
                                aria-label="GitHub profile"
                                id="footer-github"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/services" onClick={scrollToTop} className="hover:text-codered-500 cursor-pointer transition-colors text-left">IT Support</Link></li>
                            <li><Link to="/services" onClick={scrollToTop} className="hover:text-codered-500 cursor-pointer transition-colors text-left">Network Admin</Link></li>
                            <li><Link to="/services" onClick={scrollToTop} className="hover:text-codered-500 cursor-pointer transition-colors text-left">AI Automation</Link></li>
                            <li><Link to="/services" onClick={scrollToTop} className="hover:text-codered-500 cursor-pointer transition-colors text-left">Cloud Storage</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Tech Stack</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>SQL Server</li>
                            <li>N8N & Make</li>
                            <li>Claude AI</li>
                            <li>React & TypeScript</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Nairobi, Kenya</li>
                            <li><a href="tel:+254714494777" className="hover:text-codered-500 transition-colors">+254 714 494 777</a></li>
                            <li><a href="mailto:derrickndaire@gmail.com" className="hover:text-codered-500 transition-colors">derrickndaire@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-900 bg-dark-900 py-6">
                <div className="container mx-auto px-6 text-center text-xs text-gray-600">
                    <p>&copy; 2025 CodeRed Innovations - Derrick Ndaire. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
