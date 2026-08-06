import React from 'react';
import { MapPin, Calendar, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#07281E] text-white border-t-4 border-[#0F172A] mt-auto relative overflow-hidden">
      {/* Decorative Palm Trees Background Image */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay flex justify-center items-end">
        <img
          src="/decorations/footer trees.png"
          alt="Goa Trees Decoration"
          className="w-full max-w-7xl object-cover object-bottom h-48"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left border-b border-emerald-800/60 pb-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-[#FFB800] tracking-tight">
                HACKER HOUSE GOA
              </span>
              <span className="bg-[#FF2E93] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#0F172A]">
                2026
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 max-w-xs leading-relaxed">
              Empowering builders, creators, and hackers on the beaches of Goa.
            </p>
          </div>

          {/* Event Metadata */}
          <div className="flex flex-col items-center justify-center gap-2 text-xs text-emerald-100 font-medium">
            <div className="flex items-center gap-2 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-700/60">
              <MapPin className="w-3.5 h-3.5 text-[#FF2E93]" />
              <span>Goa, India</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-700/60">
              <Calendar className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Hacker House 2026 Edition</span>
            </div>
          </div>

          {/* Hindi Asset & Tagline */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <img src="/decorations/goa_hindi.svg" alt="Goa Hindi Graphic" className="h-8 w-auto opacity-90" />
            <span className="text-xs text-emerald-300 font-mono tracking-widest uppercase">
              #FrameInGoa
            </span>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF2E93] fill-[#FF2E93]" />
            <span>for Hacker House Goa 2026 Builders</span>
          </p>
          <p className="font-mono text-[11px]">
            No Backend • 100% Client-side Processing
          </p>
        </div>
      </div>
    </footer>
  );
};
