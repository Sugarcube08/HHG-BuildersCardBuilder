'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'pink' | 'yellow' | 'dark' | 'outline';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'green',
  icon,
  className,
}) => {
  const variants = {
    green: 'bg-[#006B3C] text-[#FFD800] border-[#062319]',
    pink: 'bg-[#FF0080] text-white border-[#062319]',
    yellow: 'bg-[#FFD800] text-[#062319] border-[#062319]',
    dark: 'bg-[#062319] text-[#FFF8E5] border-[#062319]',
    outline: 'bg-[#FFF8E5] text-[#062319] border-[#062319]',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-hh font-extrabold uppercase tracking-wider border-2 hh-shadow-sm select-none',
          variants[variant],
          className
        )
      )}
    >
      {icon && <span className="inline-flex shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
};

