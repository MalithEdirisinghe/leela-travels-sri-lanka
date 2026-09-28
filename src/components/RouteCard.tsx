import React, { useState, useEffect } from 'react';
import type { RouteItem } from '../types';
import { Clock, Navigation, ArrowRight, Eye, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RouteCardProps {
  route: RouteItem;
  onViewDetails: (route: RouteItem) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onViewDetails }) => {
  const navigate = useNavigate();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const imagesList = route.images && route.images.length > 0 ? route.images : [route.image];

  useEffect(() => {
    if (imagesList.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [imagesList.length]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/booking?routeId=${route.id}`);
  };

  return (
    <div
      onClick={() => onViewDetails(route)}
      className="bg-white rounded-2xl overflow-hidden border border-[#E8D8B8]/30 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group cursor-pointer"
    >
      {/* Route Image Container with Horizontal Left-Right Slider */}
      <div className="relative h-56 overflow-hidden bg-[#123C35]/10">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}
        >
          {imagesList.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`${route.name} photo ${idx + 1}`}
              className="w-full h-full object-cover shrink-0 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

        {/* Slider Navigation Arrows (shown if multiple images) */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Previous Photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Next Photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Top Badges & Image Counter */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="bg-[#123C35]/90 backdrop-blur-md text-[#E8D8B8] text-xs font-semibold px-3 py-1 rounded-full border border-[#E8D8B8]/30">
            {route.category}
          </span>
          <div className="flex items-center gap-1.5">
            {imagesList.length > 1 && (
              <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                {currentImgIndex + 1}/{imagesList.length}
              </span>
            )}
            {route.popular && (
              <span className="bg-[#E8D8B8] text-[#123C35] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}
          </div>
        </div>

        {/* Slide Pagination Dots */}
        {imagesList.length > 1 && (
          <div className="absolute top-16 right-4 flex items-center gap-1 z-10">
            {imagesList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImgIndex === idx ? 'bg-[#E8D8B8] w-4' : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}

        {/* Bottom Destination Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white z-10 pointer-events-none">
          <h3 className="font-serif-title text-xl font-bold tracking-wide text-white drop-shadow-md">
            {route.name}
          </h3>
          <div className="flex items-center gap-3 text-xs text-white/90 mt-1 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#E8D8B8]" /> {route.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-[#E8D8B8]" /> {route.distance}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-[#1C2523]/80 line-clamp-2 leading-relaxed">
          {route.description}
        </p>

        {/* Highlight snippets */}
        <div className="space-y-1.5 pt-1">
          {route.highlights.slice(0, 2).map((hl, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-[#123C35]/90 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
              <span className="truncate">{hl}</span>
            </div>
          ))}
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-[#E8D8B8]/20 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block">From</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif-title font-bold text-2xl text-[#123C35]">
                ${route.priceUSD}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                / LKR {route.priceLKR.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewDetails(route)}
              className="p-2.5 rounded-xl border border-[#123C35]/20 text-[#123C35] hover:bg-[#123C35]/5 transition-colors"
              title="View Route Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleBookNow}
              className="bg-[#123C35] hover:bg-[#1D544B] text-[#FAF8F2] font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all duration-300"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
