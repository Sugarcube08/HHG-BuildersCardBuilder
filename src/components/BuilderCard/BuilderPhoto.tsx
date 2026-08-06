import React from 'react';
import { Shield } from 'lucide-react';

export interface BuilderPhotoProps {
  previewUrl: string | null;
  fullName: string;
}

export const BuilderPhoto: React.FC<BuilderPhotoProps> = ({ previewUrl, fullName }) => {
  return (
    <div className="w-full relative z-10 flex flex-col items-center justify-center min-h-[210px] bg-[#07281E] border-3 border-[#0F172A] rounded-2xl p-3.5 shadow-xl">
      {/* Tropical Corner Accent Tags */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-[#FF2E93]" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-[#FF2E93]" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-[#FF2E93]" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-[#FF2E93]" />

      {previewUrl ? (
        <img
          src={previewUrl}
          alt={fullName || 'Builder Photo'}
          className="max-h-52 max-w-full rounded-xl border-2 border-white/20 object-contain shadow-md"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-emerald-300">
          <Shield className="w-12 h-12 mb-2" />
          <span className="text-xs font-mono">No Image Uploaded</span>
        </div>
      )}
    </div>
  );
};
