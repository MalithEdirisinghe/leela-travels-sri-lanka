import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, X, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Routes & Pricing', path: '/routes' },
    { label: 'Book Travel', path: '/booking' },
    { label: 'Operations Admin', path: '/admin' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#123C35]/90 text-white backdrop-blur-md shadow-lg py-2 border-b border-[#E8D8B8]/20'
          : isHomePage
          ? 'bg-transparent text-white py-3 border-b border-white/10'
          : 'bg-[#123C35] text-white py-3 border-b border-[#E8D8B8]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Brand Logo - Scaled Image filling header height without expanding Navbar height */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src="/assets/logo1.png"
              alt="Leela Travels"
              className="h-16 sm:h-20 lg:h-24 -my-4 sm:-my-5 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive(link.path)
                    ? 'text-[#E8D8B8] font-semibold'
                    : 'text-white/80 hover:text-[#E8D8B8]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8D8B8] rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/94771234567?text=Hello%20Leela%20Travels,%20I%20would%20like%20to%20inquire%20about%20a%20private%20transfer."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 text-xs text-[#E8D8B8] hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-[#FAF8F2]/10 border border-[#E8D8B8]/20"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E8D8B8]" />
              <span>+94 77 123 4567</span>
            </a>

            <Link
              to="/booking"
              className="hidden sm:inline-flex items-center gap-2 bg-[#E8D8B8] hover:bg-[#d8c59f] text-[#123C35] font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Book Your Trip</span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E8D8B8]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#123C35] border-b border-[#E8D8B8]/20 px-4 pt-4 pb-6 space-y-3 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#E8D8B8]/20 text-[#E8D8B8] font-bold border-l-4 border-[#E8D8B8]'
                    : 'text-white/90 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8D8B8]/20 flex flex-col gap-3">
            <Link
              to="/booking"
              className="w-full text-center bg-[#E8D8B8] text-[#123C35] font-semibold py-3 rounded-lg shadow-md"
            >
              Book Your Trip Now
            </Link>
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-[#FAF8F2] font-medium py-2.5 rounded-lg"
            >
              <PhoneCall className="w-4 h-4" />
              WhatsApp Instant Inquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
