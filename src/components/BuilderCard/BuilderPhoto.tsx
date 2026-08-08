import React from 'react';
import { Shield } from 'lucide-react';

export interface BuilderPhotoProps {
  previewUrl: string | null;
  fullName: string;
}

export const BuilderPhoto: React.FC<BuilderPhotoProps> = ({ previewUrl, fullName }) => {
  return (
    <div className="w-full relative z-10 flex flex-col items-center justify-center min-h-[210px] bg-[#042E1F] border-3 border-[#062319] rounded-2xl p-3.5 shadow-2xl">
      {/* Tropical Corner Accent Tags */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-[#FF0080]" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-[#FF0080]" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-[#FF0080]" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-[#FF0080]" />

      {previewUrl ? (
        <img
          src={previewUrl}
          alt={fullName || 'Builder Photo'}
          className="max-h-52 max-w-full rounded-xl border-2 border-[#FFD800]/40 object-contain shadow-md"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-[#FFD800]">
          <Shield className="w-12 h-12 mb-2 text-[#FF0080]" />
          <span className="text-xs font-mono-hh">No Image Uploaded</span>
        </div>
      )}
    </div>
  );
};

