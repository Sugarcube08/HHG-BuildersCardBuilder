import React from 'react';
import type { BuilderDetailsFormData } from '../../types/builder';
import type { CardThemeConfig } from '../../engine/theme/cardComposer';

export interface BuilderIdentityProps {
  builderData: BuilderDetailsFormData;
  builderId: string;
  theme: CardThemeConfig;
}

export const BuilderIdentity: React.FC<BuilderIdentityProps> = ({
  builderData,
  builderId,
  theme,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 relative z-10 text-center">
      {/* Full Name */}
      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-none">
        {builderData.fullName || 'HARSH RAIKWAR'}
      </h3>

      {/* Role Badge with Role-Personalized Accent Tint */}
      <span
        style={{ backgroundColor: theme.roleBadgeBg, color: theme.roleBadgeText }}
        className="text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full border-2 border-[#0F172A] hh-shadow-sm select-none"
      >
        {builderData.role || 'Full Stack Developer'}
      </span>

      {/* Stylized Motto */}
      <p className="text-xs italic text-emerald-200/90 max-w-xs font-medium mt-0.5">
        {builderData.tagline || '"The System Architect"'}
      </p>

      {/* Primary Tech Stack Chips */}
      {builderData.techStack && (
        <div className="flex flex-wrap justify-center gap-1.5 mt-1">
          {builderData.techStack.split(',').map((tech, i) => (
            <span
              key={i}
              className="text-[10px] bg-white/10 text-emerald-200 px-2.5 py-0.5 rounded-md border border-white/10 font-mono font-bold"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Builder ID Monospace Badge */}
      <div className="mt-1 text-xs font-mono font-extrabold text-emerald-300 tracking-wider">
        BUILDER ID: <span className="text-white">{builderId}</span>
      </div>
    </div>
  );
};
