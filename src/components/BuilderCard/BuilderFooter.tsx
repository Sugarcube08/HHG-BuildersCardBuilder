import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const BuilderFooter: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-between border-t border-[#FFD800]/30 pt-3 relative z-10 text-[11px] font-mono-hh text-[#FFF8E5] select-none">
      <div className="flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD800]" />
        <span>VERIFIED BUILDER PASSPORT</span>
      </div>
      <div className="flex items-center gap-1 font-bold text-[#FFD800]">
        <Sparkles className="w-3 h-3 text-[#FF0080]" />
        <span>GOA, INDIA</span>
      </div>
    </div>
  );
};

