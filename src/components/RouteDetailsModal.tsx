import React, { useState } from 'react';
import type { RouteItem } from '../types';
import { VEHICLE_OPTIONS } from '../data/routesData';
import { X, Clock, Navigation, CheckCircle2, Shield, ArrowRight, Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RouteDetailsModalProps {
  route: RouteItem | null;
  onClose: () => void;
}

export const RouteDetailsModal: React.FC<RouteDetailsModalProps> = ({ route, onClose }) => {
  const navigate = useNavigate();
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!route) return null;

  const imagesList = route.images && route.images.length > 0 ? route.images : [route.image];

  const handleProceedToBooking = () => {
    onClose();
    navigate(`/booking?routeId=${route.id}`);
  };

  const handlePrevImg = () => {
    setActiveImgIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setActiveImgIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF8F2] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8D8B8]/50 max-h-[90vh] flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-md"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Hero Image Slider */}
        <div className="relative h-64 sm:h-72 bg-[#123C35] overflow-hidden">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeImgIndex * 100}%)` }}
          >
            {imagesList.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={`${route.name} photo ${idx + 1}`}
                className="w-full h-full object-cover shrink-0"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#123C35] via-[#123C35]/40 to-transparent pointer-events-none" />

          {/* Modal Image Slider Arrows */}
          {imagesList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImg}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                title="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextImg}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                title="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Top Category Badge & Photo Counter */}
          <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
            <span className="bg-[#E8D8B8] text-[#123C35] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {route.category}
            </span>
            {imagesList.length > 1 && (
              <span className="bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
                Photo {activeImgIndex + 1} of {imagesList.length}
              </span>
            )}
          </div>

          {/* Bottom Overlay Title & Stats */}
          <div className="absolute bottom-6 left-6 right-6 text-white z-10 pointer-events-none">
            <h2 className="font-serif-title text-2xl sm:text-4xl font-bold tracking-wide text-white drop-shadow-md">
              {route.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#E8D8B8] mt-2 font-medium">
              <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4 text-[#E8D8B8]" /> Est. Duration: {route.duration}
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <Navigation className="w-4 h-4 text-[#E8D8B8]" /> Distance: {route.distance}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#1C2523]">
          {/* Photo Thumbnails Selector if multiple images */}
          {imagesList.length > 1 && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gallery:</span>
              <div className="flex items-center gap-2">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImgIndex === idx
                        ? 'border-[#123C35] ring-2 ring-[#C5A059] scale-105'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Overview Description */}
          <div>
            <h3 className="font-serif-title text-lg font-semibold text-[#123C35] mb-2">
              Route Overview
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {route.description}
            </p>
          </div>

          {/* Highlights & Inclusions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Highlights */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8D8B8]/40 shadow-sm space-y-3">
              <h4 className="font-serif-title text-base font-bold text-[#123C35] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059]" /> Key Route Highlights
              </h4>
              <ul className="space-y-2 text-xs text-gray-700">
                {route.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#123C35] mt-1.5 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inclusions */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8D8B8]/40 shadow-sm space-y-3">
              <h4 className="font-serif-title text-base font-bold text-[#123C35] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#123C35]" /> Standard Inclusions
              </h4>
              <ul className="space-y-2 text-xs text-gray-700">
                {route.inclusions.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Available Vehicle Types */}
          <div>
            <h3 className="font-serif-title text-lg font-semibold text-[#123C35] mb-3 flex items-center gap-2">
              <Car className="w-5 h-5" /> Available Chauffeur Vehicles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {VEHICLE_OPTIONS.map((v) => (
                <div key={v.id} className="bg-white p-3.5 rounded-xl border border-[#E8D8B8]/30 space-y-1">
                  <span className="font-semibold text-xs text-[#123C35] block">{v.name}</span>
                  <span className="text-[11px] text-gray-500 block font-mono">{v.capacity}</span>
                  <span className="text-[11px] text-[#C5A059] font-medium block">
                    Est. ${Math.round(route.priceUSD * v.priceMultiplier)} total
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA Bar */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E8D8B8]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Total Base Price</span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-title font-bold text-3xl text-[#123C35]">
                ${route.priceUSD}
              </span>
              <span className="text-sm text-gray-600 font-mono">
                (~ LKR {route.priceLKR.toLocaleString()})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-xs w-1/2 sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={handleProceedToBooking}
              className="bg-[#123C35] hover:bg-[#1D544B] text-[#E8D8B8] font-bold text-sm px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all w-1/2 sm:w-auto"
            >
              <span>Book This Route</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
