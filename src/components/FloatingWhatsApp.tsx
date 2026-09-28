import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl =
    'https://wa.me/94771234567?text=Hi%20Leela%20Travels!%20I%20am%20interested%20in%20booking%20a%20private%20transfer%20or%20getting%20a%20custom%20route%20quote.';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="bg-[#123C35] text-white text-xs py-2.5 px-4 rounded-xl shadow-xl border border-[#E8D8B8]/30 max-w-xs flex items-start gap-2.5 animate-bounce-subtle">
          <div className="flex-1">
            <span className="font-semibold text-[#E8D8B8] block mb-0.5">Need instant assistance?</span>
            <span>Chat directly with Leela Travels on WhatsApp for quick route quotes.</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white p-0.5 rounded"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-[#25D366]/20 relative"
        aria-label="Contact Leela Travels on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-white text-[#25D366]" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white animate-ping" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
      </a>
    </div>
  );
};
