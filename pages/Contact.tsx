import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Loader2, MapPin } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Contact: React.FC = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xeowwvyg", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus('success');
                form.reset();
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                setFormStatus('error');
                setTimeout(() => setFormStatus('idle'), 5000);
            }
        } catch (error) {
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 5000);
        }
    };

    return (
        <div className="pt-20 bg-black min-h-screen">
            <SEOHead
                title="Contact Derrick Ndaire | Hire IT & Web Expert"
                description="Get in touch with Derrick Ndaire for IT support, web development, or AI automation consulting. Based in Nairobi, Kenya. Free consultation available."
                canonicalPath="/contact"
            />
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="flex-1">
                            <h1 className="text-4xl font-heading font-bold text-white mb-6">Let's <span className="text-codered-500">Connect</span></h1>
                            <p className="text-gray-400 mb-8">
                                Ready to optimize your IT infrastructure or automate your business? Reach out for a consultation.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-12 h-12 bg-dark-800 flex items-center justify-center rounded-lg border border-gray-700">
                                        <Mail className="text-codered-500" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">Email</div>
                                        <a href="mailto:derrickndaire@gmail.com" id="contact-email" className="font-medium hover:text-codered-500">derrickndaire@gmail.com</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-12 h-12 bg-dark-800 flex items-center justify-center rounded-lg border border-gray-700">
                                        <Phone className="text-codered-500" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">Phone</div>
                                        <a href="tel:+254714494777" id="contact-phone" className="font-medium hover:text-codered-500">+254 714 494 777</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-12 h-12 bg-dark-800 flex items-center justify-center rounded-lg border border-gray-700">
                                        <Linkedin className="text-codered-500" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">LinkedIn</div>
                                        <a href="https://www.linkedin.com/in/derrick-ndaire-8549a8107/" target="_blank" rel="noopener noreferrer" id="contact-linkedin" className="font-medium hover:text-codered-500 cursor-pointer">
                                            View Profile
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-12 h-12 bg-dark-800 flex items-center justify-center rounded-lg border border-gray-700">
                                        <MapPin className="text-codered-500" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">Location</div>
                                        <span className="font-medium text-white">Nairobi, Kenya</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <form onSubmit={handleContactSubmit} className="bg-dark-900 p-8 rounded-2xl border border-gray-800 space-y-6" id="contact-form">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                                        <input required id="name" name="name" type="text" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-codered-500 focus:ring-1 focus:ring-codered-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-400">Phone</label>
                                        <input id="phone" name="phone" type="tel" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-codered-500 focus:ring-1 focus:ring-codered-500 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                                    <input required id="email" name="email" type="email" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-codered-500 focus:ring-1 focus:ring-codered-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="service" className="text-sm font-medium text-gray-400">Service Interested In</label>
                                    <select id="service" name="service" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-codered-500 focus:ring-1 focus:ring-codered-500 outline-none transition-all">
                                        <option>Landing Page Package ($155)</option>
                                        <option>CRM & CMS Package ($770)</option>
                                        <option>Custom Web Application</option>
                                        <option>AI Automation Setup</option>
                                        <option>Basic IT Support ($115/mo)</option>
                                        <option>Professional IT Management ($270/mo)</option>
                                        <option>Enterprise IT Solutions ($575/mo)</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                                    <textarea required id="message" name="message" rows={4} className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-codered-500 focus:ring-1 focus:ring-codered-500 outline-none transition-all"></textarea>
                                </div>
                                <button
                                    type="submit"
                                    id="contact-submit"
                                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                                    className={`w-full font-bold py-4 rounded-lg transition-all shadow-lg shadow-codered-500/20 flex items-center justify-center gap-2 ${formStatus === 'success' ? 'bg-green-600 text-white cursor-default' :
                                        formStatus === 'error' ? 'bg-red-600 text-white' :
                                            'bg-codered-500 hover:bg-codered-600 text-white cursor-pointer'
                                        }`}
                                >
                                    {formStatus === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin" /> :
                                        formStatus === 'success' ? 'Message Sent Successfully!' :
                                            formStatus === 'error' ? 'Error Sending. Try Again.' :
                                                'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
