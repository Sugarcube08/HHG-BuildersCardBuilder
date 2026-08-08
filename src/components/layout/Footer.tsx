'use client';

import React from 'react';
import { MapPin, Calendar, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#042E1F] text-[#FFF8E5] border-t-4 border-[#FFD800] mt-auto relative overflow-hidden">
      {/* Decorative Palm Trees Background Image */}
      <div className="absolute inset-x-0 bottom-0 opacity-25 pointer-events-none flex justify-center items-end">
        <img
          src="/decorations/footer trees.png"
          alt="Goa Trees Decoration"
          className="w-full max-w-7xl object-cover object-bottom h-56"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left border-b-2 border-[#FFD800]/30 pb-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="font-display-hh font-black text-xl sm:text-2xl text-[#FFD800] tracking-tight">
                HACKER HOUSE GOA
              </span>
              <span className="bg-[#FF0080] text-white text-[10px] font-mono-hh font-extrabold px-2 py-0.5 rounded-full border-2 border-[#062319] hh-shadow-sm">
                2026
              </span>
            </div>
            <p className="text-xs text-[#FFF8E5]/80 font-medium max-w-xs leading-relaxed">
              Empowering builders, creators, and hackers on the tropical shores of Goa.
            </p>
          </div>

          {/* Event Metadata */}
          <div className="flex flex-col items-center justify-center gap-2 text-xs font-mono-hh font-bold text-[#FFF8E5]">
            <div className="flex items-center gap-2 bg-[#006B3C] px-3.5 py-1.5 rounded-full border-2 border-[#062319] hh-shadow-sm text-[#FFD800]">
              <MapPin className="w-3.5 h-3.5 text-[#FF0080]" />
              <span>Goa, India</span>
            </div>
            <div className="flex items-center gap-2 bg-[#006B3C] px-3.5 py-1.5 rounded-full border-2 border-[#062319] hh-shadow-sm text-[#FFF8E5]">
              <Calendar className="w-3.5 h-3.5 text-[#FFD800]" />
              <span>October 2026 Edition</span>
            </div>
          </div>

          {/* Hindi Asset & Tagline */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <img src="/decorations/goa_hindi.svg" alt="Goa Hindi Graphic" className="h-9 w-auto filter drop-shadow-md" />
            <span className="text-xs text-[#FFD800] font-mono-hh font-bold tracking-widest uppercase">
              #FrameInGoa
            </span>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF8E5]/70 font-medium">
          <p className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF0080] fill-[#FF0080]" />
            <span>for Hacker House Goa 2026 Builders</span>
          </p>
          <p className="font-mono-hh text-[11px] text-[#FFD800]">
            No Backend • 100% Client-Side Processing
          </p>
        </div>
      </div>
    </footer>
  );
};

