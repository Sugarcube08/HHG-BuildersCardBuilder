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
    green: 'bg-[#0B3B2B] text-emerald-300 border-[#0F172A]',
    pink: 'bg-[#FF2E93] text-white border-[#0F172A]',
    yellow: 'bg-[#FFB800] text-[#0F172A] border-[#0F172A]',
    dark: 'bg-[#0F172A] text-white border-[#0F172A]',
    outline: 'bg-white text-[#0F172A] border-[#0F172A]',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-1.5 shadow-sm',
          variants[variant],
          className
        )
      )}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
