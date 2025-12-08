export interface Service {
  id: number;
  tier: string;
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  specs: string[];
  rating: number;
  image?: string;
}

export interface TimelineItem {
  id: number;
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'soft' | 'automation';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}