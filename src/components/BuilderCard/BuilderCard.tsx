'use client';

import React from 'react';
import type { BuilderDetailsFormData, ImageUploadData } from '../../types/builder';
import { getCardTheme } from '../../engine/theme/cardComposer';
import { BuilderHeader } from './BuilderHeader';
import { BuilderPhoto } from './BuilderPhoto';
import { BuilderIdentity } from './BuilderIdentity';
import { BuilderQR } from './BuilderQR';
import { BuilderFooter } from './BuilderFooter';

export interface BuilderCardProps {
  builderData: BuilderDetailsFormData;
  imageData: ImageUploadData;
  builderId: string;
  qrDataUrl: string | null;
}

export const BuilderCard: React.FC<BuilderCardProps> = ({
  builderData,
  imageData,
  builderId,
  qrDataUrl,
}) => {
  const theme = getCardTheme(builderData.role);

  return (
    <div className="bg-[#006B3C] text-[#FFF8E5] border-4 border-[#062319] rounded-3xl p-6 sm:p-7 hh-shadow-yellow relative overflow-hidden flex flex-col items-center gap-5 text-center select-none">
      {/* Decorative Palm Trees Background Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
        <img src="/decorations/footer trees.png" alt="Trees background" className="w-full h-full object-cover" />
      </div>

      {/* Section 1: Header (~10%) */}
      <BuilderHeader />

      {/* Section 2: Photo Zone (~38%) */}
      <BuilderPhoto previewUrl={imageData.previewUrl} fullName={builderData.fullName} />

      {/* Section 3: Identity Zone (~27%) */}
      <BuilderIdentity builderData={builderData} builderId={builderId} theme={theme} />

      {/* Section 4: QR Security Panel (~20%) */}
      <BuilderQR qrDataUrl={qrDataUrl} builderId={builderId} />

      {/* Section 5: Footer (~5%) */}
      <BuilderFooter />
    </div>
  );
};

