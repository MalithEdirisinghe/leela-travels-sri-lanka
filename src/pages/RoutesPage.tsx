import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SRI_LANKAN_ROUTES } from '../data/routesData';
import { RouteCard } from '../components/RouteCard';
import { RouteDetailsModal } from '../components/RouteDetailsModal';
import type { RouteItem } from '../types';
import { Search, Filter, SlidersHorizontal, MapPin, Compass, RefreshCw } from 'lucide-react';

export const RoutesPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const initialFrom = searchParams.get('from') || '';
  const initialTo = searchParams.get('to') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [originFilter, setOriginFilter] = useState<string>(initialFrom);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(100);

  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);

  useEffect(() => {
    if (initialFrom) setOriginFilter(initialFrom);
    if (initialTo) setSearchQuery(initialTo);
  }, [initialFrom, initialTo]);

  const categories = ['All', 'Hill Country', 'Cultural Triangle', 'Coastal', 'Wildlife Safari'];

  const filteredRoutes = useMemo(() => {
    return SRI_LANKAN_ROUTES.filter((route) => {
      // Category filter
      if (selectedCategory !== 'All' && route.category !== selectedCategory) {
        return false;
      }
      // Origin filter
      if (originFilter && route.from.toLowerCase() !== originFilter.toLowerCase()) {
        return false;
      }
      // Search query (matches name, description, highlights)
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = route.name.toLowerCase().includes(q);
        const matchesTo = route.to.toLowerCase().includes(q);
        const matchesFrom = route.from.toLowerCase().includes(q);
        const matchesDesc = route.description.toLowerCase().includes(q);
        if (!matchesName && !matchesTo && !matchesFrom && !matchesDesc) return false;
      }
      // Max Price
      if (route.priceUSD > maxPrice) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, originFilter, searchQuery, maxPrice]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setOriginFilter('');
    setSearchQuery('');
    setMaxPrice(100);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123C35]/10 text-[#123C35] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#C5A059]" />
            <span>Sri Lanka Route Catalog</span>
          </div>
          <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#123C35]">
            Discover the 10 Iconic Routes
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            Select any route to inspect comprehensive inclusions, vehicle options, distance, duration, and instant private booking rates.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8D8B8]/40 shadow-lg mb-10 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-100">
            <span className="text-xs font-bold text-[#123C35] uppercase tracking-wider shrink-0 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#C5A059]" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#123C35] text-[#E8D8B8] shadow-sm'
                    : 'bg-[#FAF8F2] text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            {/* Search Query */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search destination (e.g. Kandy, Ella, Yala)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
              />
            </div>

            {/* Filter by Origin */}
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <select
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
              >
                <option value="">All Pick up Origins</option>
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

            {/* Price Range */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-600 font-medium">
                <span>Max Price: ${maxPrice}</span>
                <span>(Up to $100)</span>
              </div>
              <input
                type="range"
                min="25"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#123C35] cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors h-[40px]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Route Cards Grid */}
        {filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoutes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onViewDetails={(r) => setSelectedRoute(r)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-md mx-auto space-y-4">
            <SlidersHorizontal className="w-12 h-12 text-[#C5A059] mx-auto" />
            <h3 className="font-serif-title text-xl font-bold text-[#123C35]">
              No routes found
            </h3>
            <p className="text-xs text-gray-500">
              Try adjusting your origin location or search terms to find available routes.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#123C35] text-[#E8D8B8] text-xs font-semibold px-4 py-2.5 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal Drawer */}
      <RouteDetailsModal
        route={selectedRoute}
        onClose={() => setSelectedRoute(null)}
      />
    </div>
  );
};
