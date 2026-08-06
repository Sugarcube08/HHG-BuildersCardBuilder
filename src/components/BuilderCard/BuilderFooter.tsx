import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const BuilderFooter: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-between border-t border-emerald-800/80 pt-3 relative z-10 text-[11px] font-mono text-emerald-300 select-none">
      <div className="flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>VERIFIED BUILDER PASSPORT</span>
      </div>
      <div className="flex items-center gap-1 font-bold text-white">
        <Sparkles className="w-3 h-3 text-[#FFB800]" />
        <span>GOA, INDIA</span>
      </div>
    </div>
  );
};
