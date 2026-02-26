import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import ThemeToggle from '../src/components/Global/ThemeToggle';
import { Logo } from './Logo';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 pointer-events-none ${isScrolled || isMobileMenuOpen
        ? 'bg-black/95 border-b border-gray-800 shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 pointer-events-auto">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:opacity-80 transition-opacity z-50 block cursor-pointer"
            aria-label="CodeRed Innovations - Home"
          >
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1" style={{ perspective: '800px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                id={`nav-${link.name.toLowerCase()}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`nav-link-3d relative px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] cursor-pointer transition-all duration-300 ${isActive(link.href)
                  ? 'text-codered-500 nav-link-active'
                  : 'text-gray-400 hover:text-white'
                  }`}
                aria-current={isActive(link.href) ? 'page' : undefined}
                style={{ fontFamily: "'Inter', 'Outfit', sans-serif" }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <style>{`
            .nav-link-3d {
              transform-style: preserve-3d;
              transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                          color 0.3s ease,
                          text-shadow 0.3s ease;
            }
            .nav-link-3d:hover {
              transform: translateY(-3px) rotateX(-8deg) scale(1.08);
              text-shadow: 0 0 12px rgba(220, 20, 60, 0.6),
                           0 4px 8px rgba(0, 0, 0, 0.4);
              color: #fff !important;
            }
            .nav-link-3d::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              width: 0;
              height: 2px;
              background: linear-gradient(90deg, transparent, #DC143C, transparent);
              transition: width 0.35s ease, left 0.35s ease;
              border-radius: 2px;
            }
            .nav-link-3d:hover::after {
              width: 80%;
              left: 10%;
            }
            .nav-link-active::after {
              width: 60%;
              left: 20%;
              box-shadow: 0 0 8px rgba(220, 20, 60, 0.5);
            }
          `}</style>

          <div className="flex items-center gap-4 z-50">
            <ThemeToggle />
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-white transition-colors group cursor-pointer"
              aria-label={`Open Cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
              id="btn-cart"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-codered-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse-slow" aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors p-1 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              id="btn-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={`md:hidden absolute top-full left-0 w-full bg-dark-900 border-b border-gray-800 shadow-2xl transition-all duration-300 overflow-hidden pointer-events-auto ${isMobileMenuOpen ? 'block opacity-100 max-h-96' : 'hidden opacity-0 max-h-0'
          }`}
      >
        <div className="px-4 py-4 space-y-2 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${isActive(link.href) ? 'text-codered-500 bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;