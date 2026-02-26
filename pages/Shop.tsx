import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import SEOHead from '../components/SEOHead';
import MpesaTillBadge from '../components/MpesaTillBadge';

interface ShopProps {
    addToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ addToCart }) => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = activeCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

    return (
        <div className="pt-20 bg-black min-h-screen">
            <SEOHead
                title="IT Hardware & Accessories Shop | CodeRed"
                description="Shop premium IT hardware — Dell XPS laptops, Cisco switches, TP-Link routers, Logitech peripherals & Synology NAS. Fast delivery in Nairobi, Kenya."
                canonicalPath="/shop"
            />
            <section className="py-20 bg-dark-900">
                <div className="container mx-auto px-6">
                    {/* M-Pesa Till Badge - Top Right */}
                    <div className="flex justify-end mb-4">
                        <MpesaTillBadge />
                    </div>
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">CodeRed <span className="text-codered-500">Shop</span></h1>
                        <p className="text-gray-400 mb-8">Premium IT hardware and accessories for professionals</p>

                        {/* Categories */}
                        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Product categories">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    aria-pressed={activeCategory === cat}
                                    id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeCategory === cat ? 'bg-codered-500 text-white' : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <article key={product.id} className="group bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-codered-500/50 transition-all duration-300">
                                <div className="relative aspect-video bg-dark-800 overflow-hidden">
                                    <img
                                        src={product.image || `https://picsum.photos/400/300?random=${product.id}`}
                                        alt={`${product.name} - ${product.category}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs text-yellow-500 font-bold flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-yellow-500" aria-hidden="true" /> {product.rating}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs text-codered-500 font-bold uppercase tracking-wider mb-2">{product.category}</div>
                                    <h2 className="text-lg font-bold text-white mb-2">{product.name}</h2>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.specs.slice(0, 2).map((spec, i) => (
                                            <span key={i} className="text-xs bg-dark-800 text-gray-400 px-2 py-1 rounded">{spec}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="bg-white hover:bg-gray-200 text-black p-2 rounded-full transition-colors cursor-pointer z-10 relative hover:scale-110"
                                            aria-label={`Add ${product.name} to cart`}
                                            id={`add-to-cart-${product.id}`}
                                        >
                                            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shop;
