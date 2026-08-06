import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import hackerHouseLogo from '../../assets/logos/Hacker house.png';
import goaHindiSvg from '../../assets/decorations/goa_hindi.svg';
import { RotateCcw, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentStep, resetFlow } = useBuilder();

  return (
    <header className="w-full bg-[#0B3B2B] text-white border-b-4 border-[#0F172A] sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <button
          type="button"
          onClick={resetFlow}
          className="flex items-center gap-3 group text-left focus:outline-none rounded-xl p-1 -m-1 transition-transform active:scale-98"
          title="Return to Hacker House Goa 2026 Home"
        >
          <div className="relative bg-white/10 p-1.5 rounded-xl border-2 border-white/20 group-hover:border-[#FF2E93] transition-colors">
            <img
              src={hackerHouseLogo}
              alt="Hacker House Logo"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#FFB800] transition-colors">
                HACKER HOUSE
              </span>
              <Badge variant="yellow" className="text-[10px] py-0.5 px-2">
                GOA 2026
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-200/90 font-medium">
              <span>Digital Builder Identity</span>
              <img src={goaHindiSvg} alt="Goa Hindi" className="h-3.5 opacity-80 inline-block" />
            </div>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-700/60 text-xs font-mono text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E93] animate-pulse" />
            <span>Official Event Product</span>
          </div>

          {currentStep !== 'LANDING' && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFlow}
              leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#0F172A]" />}
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
