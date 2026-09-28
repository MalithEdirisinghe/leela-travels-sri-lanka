import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SRI_LANKAN_ROUTES, WHY_CHOOSE_US } from '../data/routesData';
import { RouteCard } from '../components/RouteCard';
import { RouteDetailsModal } from '../components/RouteDetailsModal';
import type { RouteItem } from '../types';
import { MapPin, ArrowRight, ShieldCheck, Compass, Clock, UserCheck, Star, Search, Car } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);

  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  const featuredRoutes = SRI_LANKAN_ROUTES.filter((r) => r.popular);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchFrom || searchTo) {
      navigate(`/routes?from=${encodeURIComponent(searchFrom)}&to=${encodeURIComponent(searchTo)}`);
    } else {
      navigate('/routes');
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-[#E8D8B8]" />;
      case 'Compass':
        return <Compass className="w-8 h-8 text-[#E8D8B8]" />;
      case 'Clock':
        return <Clock className="w-8 h-8 text-[#E8D8B8]" />;
      case 'UserCheck':
        return <UserCheck className="w-8 h-8 text-[#E8D8B8]" />;
      default:
        return <Star className="w-8 h-8 text-[#E8D8B8]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#123C35] overflow-hidden text-white pt-28 pb-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=2000&q=85"
            alt="Sri Lanka Lush Tea Country & Scenic Route"
            className="w-full h-full object-cover opacity-35 scale-105 transform animate-pulse-subtle"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#123C35] via-[#123C35]/60 to-[#123C35]/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F2]/10 border border-[#E8D8B8]/30 backdrop-blur-md text-[#E8D8B8] text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E8D8B8] animate-ping" />
            <span>Modern Sri Lankan Luxury • Private Chauffeur Transfers</span>
          </div>

          <h1 className="font-serif-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight max-w-4xl drop-shadow-lg">
            Discover Sri Lanka, <br />
            <span className="italic text-[#E8D8B8]">Your Way.</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[#FAF8F2]/90 max-w-2xl font-light leading-relaxed">
            Experience seamless private travel across 10 iconic Sri Lankan routes. From cool mountain tea estates to wild safari reserves and golden beaches.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/routes"
              className="w-full sm:w-auto bg-[#E8D8B8] hover:bg-[#d8c59f] text-[#123C35] font-bold text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Routes</span>
            </Link>

            <Link
              to="/booking"
              className="w-full sm:w-auto bg-[#FAF8F2]/10 hover:bg-[#FAF8F2]/20 border border-[#E8D8B8]/40 text-[#FAF8F2] font-semibold text-base px-8 py-4 rounded-xl backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5 text-[#E8D8B8]" />
              <span>Book Your Trip</span>
            </Link>
          </div>

          <div className="mt-12 w-full max-w-4xl bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-[#E8D8B8]/50 shadow-2xl text-[#1C2523] text-left">
            <h2 className="text-xs uppercase tracking-widest text-[#123C35] font-bold mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#C5A059]" /> Quick Route Finder
            </h2>
            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">Pick Up From</label>
                <select
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                  className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                >
                  <option value="">Any Origin (Colombo, Kandy, Ella...)</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Ella">Ella</option>
                  <option value="Yala">Yala</option>
                  <option value="Mirissa">Mirissa</option>
                  <option value="Galle">Galle</option>
                  <option value="Sigiriya">Sigiriya</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-gray-500 mb-1">Destination To</label>
                <select
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                  className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                >
                  <option value="">Any Destination</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Ella">Ella</option>
                  <option value="Yala">Yala</option>
                  <option value="Mirissa">Mirissa</option>
                  <option value="Galle">Galle</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Sigiriya">Sigiriya</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-[#123C35] hover:bg-[#1D544B] text-[#E8D8B8] font-bold text-sm py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all h-[42px]"
                >
                  <span>Search Transfers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. POPULAR ROUTES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
              Featured Sri Lankan Travel
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#123C35]">
              Most Popular Journeys
            </h2>
          </div>
          <Link
            to="/routes"
            className="mt-4 md:mt-0 text-sm font-semibold text-[#123C35] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All 10 Routes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onViewDetails={(r) => setSelectedRoute(r)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/routes"
            className="inline-flex items-center gap-2 border-2 border-[#123C35] text-[#123C35] hover:bg-[#123C35] hover:text-[#E8D8B8] font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 shadow-sm"
          >
            <span>Browse Full 10 Route Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. WHY CHOOSE LEELA SECTION */}
      <section className="py-20 bg-[#123C35] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#E8D8B8] font-bold block mb-2">
              The Leela Guarantee
            </span>
            <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white mb-4">
              Why Choose Leela Travels?
            </h2>
            <p className="text-sm sm:text-base text-[#FAF8F2]/80 font-light">
              We focus on premium comfort, verified drivers, transparent upfront rates, and complete flexibility so you can savor every kilometer of Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-[#E8D8B8]/20 hover:border-[#E8D8B8]/50 transition-all duration-300 hover:-translate-y-1 space-y-4"
              >
                <div className="w-14 h-14 rounded-xl bg-[#E8D8B8]/10 border border-[#E8D8B8]/30 flex items-center justify-center">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-serif-title text-xl font-bold text-[#E8D8B8]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#FAF8F2]/75 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FLEET PREVIEW BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8D8B8]/40 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              Luxury Chauffeur Vehicles
            </span>
            <h2 className="font-serif-title text-3xl font-bold text-[#123C35]">
              Clean, Modern & Fully Air-Conditioned
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Whether you need an fuel-efficient sedan for two, an executive SUV with panoramic mountain views, or a high-roof van for family luggage, Leela Travels delivers impeccably maintained vehicles.
            </p>

            <ul className="space-y-2 text-xs text-gray-700 font-medium pt-2">
              <li className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#123C35]" /> Toyota Prius & Allion Sedans
              </li>
              <li className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#123C35]" /> Toyota Montero & Prado Executive SUVs
              </li>
              <li className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#123C35]" /> Toyota KDH High-Roof Luxury Vans
              </li>
            </ul>

            <div className="pt-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-[#123C35] text-[#E8D8B8] font-bold text-xs px-6 py-3 rounded-xl shadow-md hover:bg-[#1D544B] transition-colors"
              >
                <span>Select Your Vehicle & Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"
              alt="Sedan Car"
              className="rounded-2xl h-40 w-full object-cover shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
              alt="SUV Car"
              className="rounded-2xl h-40 w-full object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-[#123C35] to-[#1D544B] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold mb-6 text-white drop-shadow-md">
            Ready to Explore Sri Lanka?
          </h2>
          <p className="text-base sm:text-lg text-[#FAF8F2]/90 font-light mb-8 max-w-2xl mx-auto">
            Reserve your private chauffeur transfer in less than 2 minutes. Transparent fixed rates, instant booking confirmation, and zero upfront cancellation penalty.
          </p>
          <Link
            to="/booking"
            className="bg-[#E8D8B8] hover:bg-[#d8c59f] text-[#123C35] font-bold text-base px-10 py-4 rounded-xl shadow-2xl transition-all duration-300 inline-flex items-center gap-3 transform hover:scale-105 active:scale-95"
          >
            <span>Book Your Journey Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Route Details Modal */}
      <RouteDetailsModal
        route={selectedRoute}
        onClose={() => setSelectedRoute(null)}
      />
    </div>
  );
};
