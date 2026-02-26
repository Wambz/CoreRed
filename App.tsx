import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import { CartItem, Product } from './types';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import AdminCMS from './pages/Admin/CMS';
import AdminLogin from './pages/Admin/Login';
import ClauseGuard from './pages/tools/ClauseGuard';
import Post2Lead from './pages/tools/Post2Lead';
import ReconcileKE from './pages/tools/ReconcileKE';

// Global Styles & Interactions
import './src/styles/design-system.css';
import InteractionManager from './src/components/Global/InteractionManager';
import CustomCursor from './src/components/Global/CustomCursor';
import ScrollBackground from './src/components/Global/ScrollBackground';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  return (
    <HelmetProvider>
      <Router>
        <InteractionManager>
          <CustomCursor />
          <ScrollBackground />
          <div className="relative z-[1] bg-black min-h-screen text-gray-200 font-sans selection:bg-red-primary selection:text-white flex flex-col">
            <Header cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onRemove={removeFromCart} />

            <main className="flex-grow">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop addToCart={addToCart} />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* Tool pages */}
                <Route path="/services/clauseguard" element={<ClauseGuard />} />
                <Route path="/services/post2lead" element={<Post2Lead />} />
                <Route path="/services/reconcileke" element={<ReconcileKE />} />

                {/* Admin auth */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected admin */}
                <Route path="/admin" element={<ProtectedRoute><AdminCMS /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </InteractionManager>
      </Router>
    </HelmetProvider>
  );
}

export default App;