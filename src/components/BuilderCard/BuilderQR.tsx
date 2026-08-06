import React from 'react';
import { CheckCircle2, QrCode } from 'lucide-react';

export interface BuilderQRProps {
  qrDataUrl: string | null;
  builderId: string;
}

export const BuilderQR: React.FC<BuilderQRProps> = ({ qrDataUrl, builderId }) => {
  return (
    <div className="w-full bg-[#FAF7F2] text-[#0F172A] border-3 border-[#0F172A] rounded-2xl p-3 flex items-center gap-3.5 relative z-10 hh-shadow-sm text-left select-none">
      <div className="w-20 h-20 shrink-0 rounded-xl bg-white p-1 border-2 border-[#0F172A] flex items-center justify-center overflow-hidden">
        {qrDataUrl ? (
          <img src={qrDataUrl} alt="Scannable Builder Identity QR" className="w-full h-full object-contain" />
        ) : (
          <QrCode className="w-8 h-8 text-slate-400" />
        )}
      </div>

      <div className="flex flex-col gap-0.5 leading-tight">
        <div className="flex items-center gap-1 text-xs font-black text-[#0B3B2B]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2E93]" />
          <span>VERIFY BUILDER IDENTITY</span>
        </div>
        <p className="text-[11px] font-bold text-slate-600 font-mono">
          OFFICIAL DIGITAL PASSPORT
        </p>
        <p className="text-[10px] font-extrabold text-[#FF2E93] font-mono">
          CREDENTIAL: {builderId}
        </p>
      </div>
    </div>
  );
};
