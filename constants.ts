import { Service, Product, TimelineItem, Skill, Testimonial, BlogPost } from './types';
import { Server, Shield, Database, Cpu, Globe, Cog, Users, Clock, Terminal } from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: 1,
    tier: "TIER 1",
    title: "BASIC IT SUPPORT",
    price: "KES 15,000",
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
    id: 2,
    tier: "TIER 2",
    title: "PROFESSIONAL IT MANAGEMENT",
    price: "KES 35,000",
    recommended: true,
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
    id: 3,
    tier: "TIER 3",
    title: "ENTERPRISE IT SOLUTIONS",
    price: "KES 75,000",
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

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Dell XPS 15 Professional",
    category: "Laptops",
    price: 135000,
    specs: ["11th Gen Intel Core i7", "16GB RAM", "512GB SSD", "15.6\" FHD Display"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "HP EliteBook 840 G8",
    category: "Laptops",
    price: 95000,
    specs: ["Intel Core i5-1135G7", "8GB RAM", "256GB SSD", "14\" Display"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Cisco Catalyst 2960 Switch",
    category: "Networking",
    price: 45000,
    specs: ["24-Port Managed", "Gigabit Ethernet", "Layer 2"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bbc7c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "TP-Link Archer AX73",
    category: "Networking",
    price: 18500,
    specs: ["WiFi 6 (AX5400)", "Dual-band", "Gigabit Ports"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: 8500,
    specs: ["Wireless", "Ergonomic", "8K DPI Sensor"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Synology DS220+ NAS",
    category: "Storage",
    price: 55000,
    specs: ["2-Bay", "Intel Celeron J4025", "2GB DDR4"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  }
];

export const EXPERIENCE: TimelineItem[] = [
  {
    id: 1,
    role: "System Support Specialist",
    company: "Directline Assurance LTD",
    period: "2024 – Present",
    details: [
      "Technical support across multiple branch locations.",
      "Preventative maintenance on network equipment.",
      "Database management using SQL.",
      "ERP system support and optimization."
    ]
  },
  {
    id: 2,
    role: "IT Specialist",
    company: "Keda Ceramics",
    period: "2023 – 2024",
    details: [
      "Administered network and server systems.",
      "Managed cloud and offline data backups.",
      "Configured IT infrastructure and security.",
      "Ensured high availability of systems."
    ]
  },
  {
    id: 3,
    role: "Project Manager",
    company: "Kagio Farms",
    period: "2020 – Feb 2023",
    details: [
      "Farm management and resource optimization.",
      "Financial analysis and budget management.",
      "Supervised operations and compliance."
    ]
  },
  {
    id: 4,
    role: "IT Officer in Charge",
    company: "Techpak Industries",
    period: "2018 – 2020",
    details: [
      "Network and server administration.",
      "Managed ERP systems (SAP, Tally, Focus).",
      "Developed ICT policies."
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: "IT Infrastructure", level: 95, category: "technical" },
  { name: "Network Security", level: 90, category: "technical" },
  { name: "SQL Server", level: 92, category: "technical" },
  { name: "ERP Systems", level: 85, category: "technical" },
  { name: "Web Dev (JS/React)", level: 88, category: "technical" },
  { name: "AI Integration (Claude/N8N)", level: 85, category: "automation" },
  { name: "Prompt Engineering", level: 90, category: "automation" },
  { name: "Problem Solving", level: 95, category: "soft" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "Derrick's expertise in network administration transformed our IT infrastructure. His proactive approach prevented numerous potential issues.",
    author: "John Mwangi",
    role: "IT Manager, Corporate Client"
  },
  {
    id: 2,
    text: "Professional, knowledgeable, and always available. Derrick's support has been invaluable to our operations.",
    author: "Sarah Kimani",
    role: "Operations Director"
  },
  {
    id: 3,
    text: "The ERP implementation was seamless thanks to Derrick's technical skills and project management.",
    author: "David Omondi",
    role: "Business Owner"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "5 Essential Network Security Practices",
    date: "May 15, 2025",
    excerpt: "Discover the critical steps small businesses must take to secure their digital assets against modern threats.",
    tags: ["Security", "Network"]
  },
  {
    id: 2,
    title: "AI Automation with N8N and Make",
    date: "April 22, 2025",
    excerpt: "How to leverage low-code automation tools to streamline your business workflows and increase efficiency.",
    tags: ["AI", "Automation"]
  },
  {
    id: 3,
    title: "Optimizing SQL Server Performance",
    date: "March 10, 2025",
    excerpt: "Technical deep dive into indexing strategies and query optimization for high-load databases.",
    tags: ["Database", "SQL"]
  }
];