import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ProjectCard from '../src/components/Portfolio/ProjectCard';

const CASE_STUDIES = [
    {
        id: 1,
        title: "CodeCash254 — M-Pesa & Deriv Trading Platform",
        category: "FinTech Web Application",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
        challenge: "Kenyan traders needed a reliable bridge between M-Pesa mobile money and Deriv trading accounts. Existing solutions were slow, unreliable, and lacked real-time transaction visibility — causing users to lose trust and miss market opportunities.",
        solution: "Built a full-stack fintech platform that integrates Safaricom's Daraja M-Pesa API with Deriv's trading API. The system handles STK Push deposits, automated Deriv balance top-ups, real-time transaction tracking, and secure user authentication. Features include a premium dark UI, live wallet balances, transaction history with status tracking, and robust error handling for failed M-Pesa callbacks.",
        results: [
            "Instant M-Pesa to Deriv deposits via STK Push",
            "Real-time transaction monitoring & status updates",
            "Secure authentication with Deriv API token integration",
            "Sub-3-second deposit processing time"
        ],
        stack: ["React", "TypeScript", "Node.js", "M-Pesa Daraja API", "Deriv API", "Firebase"],
        link: "https://codecash254.netlify.app/"
    },
    {
        id: 2,
        title: "CodeRedMotors — Premium Automotive Marketplace",
        category: "E-Commerce Platform",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
        challenge: "A car dealership needed a modern, high-converting online presence to showcase their premium vehicle inventory. Their existing website was outdated, had no search/filter functionality, and failed to capture the luxury feel of their brand on mobile devices.",
        solution: "Designed and developed a sleek, performance-first automotive marketplace featuring advanced vehicle filtering (make, model, price, year), high-resolution image galleries with zoom, glassmorphism UI design, and a fully responsive layout. The crimson-and-black brand identity conveys premium quality while maintaining fast load times.",
        results: [
            "40% increase in online enquiries within first month",
            "Mobile-first design with 98 Lighthouse performance score",
            "Advanced search & filter reducing browse time by 60%",
            "Premium glassmorphism UI matching brand identity"
        ],
        stack: ["React", "Tailwind CSS", "Lucide Icons", "Netlify", "Responsive Design"],
        link: "https://coderedmotors.netlify.app/"
    },
    {
        id: 3,
        title: "E-Commerce Optimization for RetailBrand",
        category: "Web Application",
        image: "/portfolio-ecommerce.png",
        challenge: "High cart abandonment rates and slow page load times were costing the client significantly in lost revenue during peak seasons.",
        solution: "Rebuilt the frontend using Next.js for server-side rendering, optimized image assets, and implemented a streamlined one-page checkout process.",
        results: [
            "Increased conversions by 34%",
            "Reduced load time by 60%",
            "Recovered $15K in monthly abandoned carts"
        ],
        stack: ["Next.js", "Node.js", "Redis", "Stripe"],
        link: "#"
    },
    {
        id: 4,
        title: "Automated Lead Management System",
        category: "Automation & CRM",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
        challenge: "Client's sales team was spending 4 hours daily manually data entering leads from various sources into their CRM.",
        solution: "Developed an n8n workflow to capture leads from web forms, Facebook Ads, and emails, automatically enriching the data and syncing it to HubSpot.",
        results: [
            "Saved 20+ hours per week",
            "Zero data entry errors",
            "Instant lead follow-up capability"
        ],
        stack: ["n8n", "HubSpot API", "Webhook", "Python"],
        link: "#"
    },
    {
        id: 5,
        title: "SaaS Dashboard for Logistics",
        category: "Full Stack Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
        challenge: "Logistics company lacked real-time visibility into their fleet operations, relying on outdated spreadsheets.",
        solution: "Built a real-time React dashboard with map integration and live vehicle tracking using WebSocket connections.",
        results: [
            "Real-time fleet tracking",
            "25% reduction in fuel costs",
            "Improved delivery timeframes"
        ],
        stack: ["React", "Firebase", "Google Maps API", "TypeScript"],
        link: "#"
    }
];

const Portfolio: React.FC = () => {
    return (
        <div className="pt-20 bg-black min-h-screen">
            <SEOHead
                title="Portfolio & Case Studies | CodeRed Innovations"
                description="View real-world case studies by Derrick Ndaire — e-commerce optimization, CRM automation, SaaS dashboards. Measurable results with modern tech stacks."
                canonicalPath="/portfolio"
            />
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
                            Featured <span className="text-codered-500">Case Studies</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Real business problems solved with engineering and automation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {CASE_STUDIES.map((study) => (
                            <ProjectCard key={study.id} project={study} />
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Link
                            to="/contact"
                            id="cta-start-project"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-lg transition-all"
                        >
                            Start Your Project <ArrowRight className="w-5 h-5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
