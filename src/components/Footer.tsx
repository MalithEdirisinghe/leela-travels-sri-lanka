import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { SRI_LANKAN_ROUTES } from '../data/routesData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#123C35] text-[#FAF8F2] pt-16 pb-12 border-t border-[#E8D8B8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E8D8B8]/15">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Leela Travels"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-[#FAF8F2]/70 leading-relaxed font-light">
              Modern Sri Lankan Luxury — Discover Sri Lanka your way with premium, trustworthy private transfers, experienced chauffeurs, and effortless route bookings.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#E8D8B8]">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-[#E8D8B8]/20 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Fixed Transparent Pricing
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-serif-title text-lg font-semibold text-[#E8D8B8] border-b border-[#E8D8B8]/20 pb-2">
              Explore & Book
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FAF8F2]/80">
              <li>
                <Link to="/" className="hover:text-[#E8D8B8] transition-colors flex items-center gap-2">
                  <span>›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/routes" className="hover:text-[#E8D8B8] transition-colors flex items-center gap-2">
                  <span>›</span> Discover 10 Iconic Routes
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-[#E8D8B8] transition-colors flex items-center gap-2">
                  <span>›</span> Instant Reservation Form
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#E8D8B8] transition-colors flex items-center gap-2">
                  <span>›</span> Operations Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Routes */}
          <div className="space-y-4">
            <h3 className="font-serif-title text-lg font-semibold text-[#E8D8B8] border-b border-[#E8D8B8]/20 pb-2">
              Featured Routes
            </h3>
            <ul className="space-y-2 text-xs text-[#FAF8F2]/75">
              {SRI_LANKAN_ROUTES.slice(0, 5).map((route) => (
                <li key={route.id}>
                  <Link
                    to={`/booking?routeId=${route.id}`}
                    className="hover:text-[#E8D8B8] transition-colors flex items-center justify-between group py-1"
                  >
                    <span>{route.name}</span>
                    <span className="text-[#E8D8B8] opacity-80 font-mono">${route.priceUSD}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-4">
            <h3 className="font-serif-title text-lg font-semibold text-[#E8D8B8] border-b border-[#E8D8B8]/20 pb-2">
              Contact & Support
            </h3>
            <ul className="space-y-3 text-sm text-[#FAF8F2]/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E8D8B8] shrink-0 mt-0.5" />
                <span>No 45, Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E8D8B8] shrink-0" />
                <a href="https://wa.me/94771234567" className="hover:text-[#E8D8B8]">
                  +94 77 123 4567 (WhatsApp / Hotline)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E8D8B8] shrink-0" />
                <a href="mailto:info@leelatravels.lk" className="hover:text-[#E8D8B8]">
                  info@leelatravels.lk
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs text-[#E8D8B8]">
                <Clock className="w-4 h-4 shrink-0" />
                <span>24/7 Operations & Flight Pickup Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF8F2]/60 gap-4">
          <p>© {new Date().getFullYear()} Leela Travels Sri Lanka. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>for Sri Lanka Tourism</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
