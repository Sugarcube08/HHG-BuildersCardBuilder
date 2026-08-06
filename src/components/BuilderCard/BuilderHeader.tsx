import React from 'react';
import hackerHouseLogo from '../../assets/logos/Hacker house.png';
import { Badge } from '../common/Badge';

export const BuilderHeader: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-between border-b-2 border-emerald-800/80 pb-3.5 relative z-10 select-none">
      <div className="flex items-center gap-2">
        <img src={hackerHouseLogo} alt="Hacker House Logo" className="h-8 w-auto object-contain" />
        <span className="font-black text-sm tracking-tight text-white">HACKER HOUSE</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Badge variant="yellow" className="text-[10px] py-0.5 px-2.5">
          GOA 2026
        </Badge>
      </div>
    </div>
  );
};
