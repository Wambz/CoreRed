import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import { 
  ArrowRight, Check, MapPin, Linkedin, Mail, Phone, 
  Terminal, Shield, Database, Cpu, ChevronDown, Star, Download,
  ShoppingCart, Loader2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  SERVICES, PRODUCTS, EXPERIENCE, SKILLS, TESTIMONIALS, BLOG_POSTS 
} from './constants';
import { Product, CartItem } from './types';
import { Logo } from './components/Logo';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('codered_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem('codered_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const handleDownloadCV = () => {
    alert("CV Download Started (Demo Mode)");
  };

  // Helper for smooth scrolling that bypasses href hash navigation issues
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

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  return (
    <div className="bg-black min-h-screen text-gray-200 font-sans selection:bg-codered-500 selection:text-white">
      <Header cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onRemove={removeFromCart} />

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
             <div className="inline-block px-4 py-2 bg-dark-800 rounded-full border border-codered-500/30 text-codered-500 text-sm font-bold tracking-wider mb-2">
               AVAILABLE FOR PROJECTS
             </div>
             <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight text-white">
               DERRICK <span className="text-codered-500">NDAIRE</span>
             </h1>
             <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
               ICT Specialist | Network & Systems Admin | AI Automation Expert
             </p>
             <p className="text-gray-500 max-w-lg">
               Transforming IT challenges into strategic solutions with cutting-edge technology and intelligent automation.
             </p>
             
             <div className="flex flex-wrap gap-4 relative z-40 pointer-events-auto">
               <button 
                 onClick={(e) => scrollToSection(e, '#services')} 
                 className="px-8 py-4 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-codered-500/30 cursor-pointer block text-center"
               >
                 View Services
               </button>
               <button 
                 onClick={(e) => scrollToSection(e, '#contact')}
                 className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold rounded-lg transition-all cursor-pointer block text-center"
               >
                 Contact Me
               </button>
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
               {/* Placeholder for professional photo */}
               <img src="https://picsum.photos/800/1000?grayscale" alt="Derrick Ndaire" className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500" />
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
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-1">
              <h2 className="text-codered-500 font-bold tracking-widest uppercase mb-2">About Me</h2>
              <h3 className="text-4xl font-heading font-bold text-white mb-6">Driving Innovation Through Tech</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Results-driven ICT Specialist and founder of <span className="text-white font-bold">CodeRed</span>, with over 8 years of experience in IT support, network administration, system maintenance, and AI automation.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                I possess proven expertise in managing complex IT infrastructures, implementing security measures, and delivering technical solutions. Recently, I have expanded my portfolio to include AI-powered business process automation using tools like Claude, N8N, and Make to enhance organizational efficiency.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-lg border border-gray-800">
                  <Terminal className="text-codered-500 w-6 h-6" />
                  <span className="font-medium text-sm">Network Admin</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-lg border border-gray-800">
                  <Database className="text-codered-500 w-6 h-6" />
                  <span className="font-medium text-sm">SQL & ERP</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-lg border border-gray-800">
                  <Cpu className="text-codered-500 w-6 h-6" />
                  <span className="font-medium text-sm">AI Automation</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-lg border border-gray-800">
                  <Shield className="text-codered-500 w-6 h-6" />
                  <span className="font-medium text-sm">Cyber Security</span>
                </div>
              </div>

              <button 
                onClick={handleDownloadCV}
                className="flex items-center gap-2 text-white border-b-2 border-codered-500 pb-1 hover:text-codered-500 transition-colors cursor-pointer group"
              >
                <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" /> 
                <span className="font-bold">Download CV</span>
              </button>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-dark-800 p-8 rounded-2xl border border-gray-800 relative hover:border-codered-500/30 transition-colors">
                <div className="absolute -top-4 -right-4 bg-codered-500 text-white px-4 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  Certified
                </div>
                <h4 className="text-xl font-bold text-white mb-6">Certifications</h4>
                <ul className="space-y-4">
                   <li className="flex items-start gap-3">
                     <Check className="text-codered-500 w-5 h-5 mt-1 shrink-0" />
                     <div>
                       <strong className="block text-white">micro1 AI Certified System Support Specialist</strong>
                       <span className="text-sm text-gray-500">May 2025 - Verified Excellence in AI Interview</span>
                     </div>
                   </li>
                   <li className="flex items-start gap-3">
                     <Check className="text-codered-500 w-5 h-5 mt-1 shrink-0" />
                     <div>
                       <strong className="block text-white">Cisco Certified Network Associate (CCNA)</strong>
                       <span className="text-sm text-gray-500">Institute of Advanced Technology (IAT)</span>
                     </div>
                   </li>
                   <li className="flex items-start gap-3">
                     <Check className="text-codered-500 w-5 h-5 mt-1 shrink-0" />
                     <div>
                       <strong className="block text-white">ISO 22000:2005 & ISO/TS 22002-4</strong>
                       <span className="text-sm text-gray-500">Awareness & Internal Audit Training</span>
                     </div>
                   </li>
                   <li className="flex items-start gap-3">
                     <Check className="text-codered-500 w-5 h-5 mt-1 shrink-0" />
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
                    <YAxis dataKey="name" type="category" width={150} tick={{fill: '#fff', fontSize: 12}} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{fill: 'transparent'}}
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
      <section id="experience" className="py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Professional <span className="text-codered-500">Journey</span></h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
             {/* Center Line */}
             <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 md:-ml-0.5"></div>
             
             {EXPERIENCE.map((exp, index) => (
               <div key={exp.id} className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                 <div className="flex-1"></div>
                 
                 {/* Dot */}
                 <div className="absolute left-0 md:left-1/2 -ml-1.5 md:-ml-2 w-3 h-3 md:w-4 md:h-4 bg-codered-500 rounded-full mt-6 shadow-[0_0_10px_#DC143C]"></div>
                 
                 <div className="flex-1 pl-8 md:pl-0 md:px-8">
                   <div className="bg-dark-800 p-6 rounded-lg border border-gray-800 hover:border-codered-500/50 transition-colors">
                      <span className="text-codered-500 font-bold text-sm tracking-widest">{exp.period}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                      <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
                      <ul className="space-y-2">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0"></span>
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

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">IT Service <span className="text-codered-500">Packages</span></h2>
             <p className="text-gray-400">Tailored solutions for businesses of all sizes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className={`relative bg-dark-800 rounded-2xl p-8 border ${
                  service.recommended ? 'border-codered-500 shadow-[0_0_20px_rgba(220,20,60,0.15)] transform md:-translate-y-4' : 'border-gray-800'
                } flex flex-col transition-transform hover:scale-[1.02]`}
              >
                {service.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-codered-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-2">{service.tier}</h3>
                  <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                  <div className="text-3xl font-bold text-white">{service.price}<span className="text-sm text-gray-500 font-normal">/month</span></div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-codered-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className={`w-full py-3 rounded-lg font-bold text-center transition-colors cursor-pointer block ${
                    service.recommended ? 'bg-codered-500 hover:bg-codered-600 text-white' : 'bg-dark-900 hover:bg-dark-700 text-white'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-dark-900 p-8 rounded-xl border border-gray-800 max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-2">Need a custom one-time project?</h3>
            <p className="text-gray-400 mb-6">From Network Setup (KES 50k+) to ERP Implementation (KES 100k+), we handle complex deployments.</p>
            <button 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="text-codered-500 font-bold hover:underline flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              Request a Custom Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SHOP SECTION */}
      <section id="shop" className="py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
               <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">CodeRed <span className="text-codered-500">Shop</span></h2>
               <p className="text-gray-400">Premium IT hardware and accessories for professionals</p>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activeCategory === cat ? 'bg-codered-500 text-white' : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-codered-500/50 transition-all duration-300">
                <div className="relative aspect-video bg-dark-800 overflow-hidden">
                   <img 
                     src={product.image || `https://picsum.photos/400/300?random=${product.id}`}
                     alt={product.name} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                   <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs text-yellow-500 font-bold flex items-center gap-1">
                     <Star className="w-3 h-3 fill-yellow-500" /> {product.rating}
                   </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-codered-500 font-bold uppercase tracking-wider mb-2">{product.category}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.specs.slice(0, 2).map((spec, i) => (
                      <span key={i} className="text-xs bg-dark-800 text-gray-400 px-2 py-1 rounded">{spec}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white">KES {product.price.toLocaleString()}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-white hover:bg-gray-200 text-black p-2 rounded-full transition-colors cursor-pointer z-10 relative hover:scale-110"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">Tech <span className="text-codered-500">Insights</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="bg-dark-900 border border-gray-800 p-6 rounded-xl hover:bg-dark-800 transition-colors cursor-pointer group">
                 <div className="text-xs text-gray-500 mb-2">{post.date}</div>
                 <h3 className="text-xl font-bold text-white mb-3 group-hover:text-codered-500 transition-colors">{post.title}</h3>
                 <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                 <div className="flex gap-2">
                   {post.tags.map(tag => (
                     <span key={tag} className="text-xs text-codered-500 bg-codered-500/10 px-2 py-1 rounded">{tag}</span>
                   ))}
                 </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-12">Trusted by Industry Professionals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-black p-8 rounded-xl border border-gray-800 relative">
                <div className="text-codered-500 text-6xl absolute top-4 left-4 opacity-20 font-serif">"</div>
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

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-heading font-bold text-white mb-6">Let's <span className="text-codered-500">Connect</span></h2>
              <p className="text-gray-400 mb-8">
                Ready to optimize your IT infrastructure or automate your business? Reach out for a consultation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 bg-dark-800 flex items-center justify-center rounded-lg border border-gray-700">
                    <Mail className="text-codered-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Email</div>
                    <a href="mailto:derrickndaire@gmail.com" className="font-medium hover:text-codered-500">derrickndaire@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 bg-dark-800 flex items-center justify-center rounded-lg border border-gray-700">
                    <Phone className="text-codered-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Phone</div>
                    <a href="tel:+254714494777" className="font-medium hover:text-codered-500">+254 714 494 777</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 bg-dark-800 flex items-center justify-center rounded-lg border border-gray-700">
                    <Linkedin className="text-codered-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">LinkedIn</div>
                    <a href="https://www.linkedin.com/in/derrick-ndaire-8549a8107/" target="_blank" rel="noreferrer" className="font-medium hover:text-codered-500 cursor-pointer">
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <form onSubmit={handleContactSubmit} className="bg-dark-900 p-8 rounded-2xl border border-gray-800 space-y-6">
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
                    <option>Basic IT Support</option>
                    <option>Professional IT Management</option>
                    <option>Enterprise Solutions</option>
                    <option>AI Automation Setup</option>
                    <option>Hardware Purchase</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                  <textarea required id="message" name="message" rows={4} className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-codered-500 focus:ring-1 focus:ring-codered-500 outline-none transition-all"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className={`w-full font-bold py-4 rounded-lg transition-all shadow-lg shadow-codered-500/20 flex items-center justify-center gap-2 ${
                    formStatus === 'success' ? 'bg-green-600 text-white cursor-default' : 
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

      {/* FOOTER */}
      <footer className="bg-black pt-16 border-t border-gray-800">
        <div className="container mx-auto px-6 mb-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
               <Logo />
               <p className="text-gray-500 text-sm">
                 Transforming businesses through robust IT infrastructure and intelligent automation solutions.
               </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={(e) => scrollToSection(e, '#services')} className="hover:text-codered-500 cursor-pointer transition-colors text-left">IT Support</button></li>
                <li><button onClick={(e) => scrollToSection(e, '#services')} className="hover:text-codered-500 cursor-pointer transition-colors text-left">Network Admin</button></li>
                <li><button onClick={(e) => scrollToSection(e, '#services')} className="hover:text-codered-500 cursor-pointer transition-colors text-left">AI Automation</button></li>
                <li><button onClick={(e) => scrollToSection(e, '#services')} className="hover:text-codered-500 cursor-pointer transition-colors text-left">Cloud Storage</button></li>
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
                <li>+254 714 494 777</li>
                <li><a href="mailto:derrickndaire@gmail.com" className="hover:text-codered-500 transition-colors">derrickndaire@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-900 bg-dark-900 py-6">
          <div className="container mx-auto px-6 text-center text-xs text-gray-600">
            <p>&copy; 2025 CodeRed Tech Solutions - Derrick Ndaire. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;