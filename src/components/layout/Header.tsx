'use client';

import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { RotateCcw, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentStep, resetFlow } = useBuilder();

  return (
    <header className="w-full bg-[#042E1F] text-[#FFF8E5] border-b-4 border-[#FFD800] sticky top-0 z-50 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <button
          type="button"
          onClick={resetFlow}
          className="flex items-center gap-3.5 group text-left focus:outline-none rounded-xl p-1 -m-1 transition-transform active:scale-98"
          title="Return to Hacker House Goa 2026 Home"
        >
          <div className="relative bg-[#FFF8E5]/10 p-1.5 rounded-xl border-2 border-[#FFF8E5]/30 group-hover:border-[#FFD800] transition-colors">
            <img
              src="/logos/Hacker house.png"
              alt="Hacker House Logo"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display-hh text-lg sm:text-xl font-black tracking-tight text-[#FFF8E5] group-hover:text-[#FFD800] transition-colors">
                HACKER HOUSE
              </span>
              <Badge variant="yellow" className="text-[10px] py-0.5 px-2">
                GOA 2026
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#FFD800]/90 font-mono-hh">
              <span>Digital Builder Identity</span>
              <img src="/decorations/goa_hindi.svg" alt="Goa Hindi" className="h-3.5 opacity-90 inline-block" />
            </div>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#006B3C] px-3.5 py-1.5 rounded-full border-2 border-[#062319] text-xs font-mono-hh text-[#FFD800] hh-shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF0080] animate-pulse" />
            <span>Official Event Product</span>
          </div>

          {currentStep !== 'LANDING' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={resetFlow}
              leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#062319]" />}
              className="text-xs py-1.5 px-3"
              aria-label="Start over and reset form"
            >
              <span className="hidden sm:inline">Start Over</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

