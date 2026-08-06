import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import hackerHouseLogo from '../../assets/Hacker house.png';
import goaHindiSvg from '../../assets/goa_hindi.svg';
import { RotateCcw, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentStep, resetFlow } = useBuilder();

  return (
    <header className="w-full bg-[#0B3B2B] text-white border-b-4 border-[#0F172A] sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div
          onClick={resetFlow}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative bg-white/10 p-1.5 rounded-xl border-2 border-white/20 group-hover:border-[#FF2E93] transition-all">
            <img
              src={hackerHouseLogo}
              alt="Hacker House Logo"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#FFB800] transition-colors">
                HACKER HOUSE
              </span>
              <Badge variant="yellow" className="text-[10px] py-0.5 px-2">
                GOA 2026
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-200/90 font-medium">
              <span>Builder Card Generator</span>
              <img src={goaHindiSvg} alt="Goa Hindi" className="h-3.5 opacity-80 inline-block" />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-700/50 text-xs font-mono text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E93] animate-pulse" />
            <span>Official Event ID</span>
          </div>

          {currentStep !== 'LANDING' && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFlow}
              leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#0F172A]" />}
              className="text-xs py-1.5 px-3"
            >
              <span className="hidden sm:inline">Start Over</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
