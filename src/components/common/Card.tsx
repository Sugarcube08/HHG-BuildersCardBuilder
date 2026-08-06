'use client';

import React, { type HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'emerald' | 'pink' | 'sand' | 'glass';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'pink' | 'yellow';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  shadow = 'md',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-white text-[#0F172A] border-2.5 border-[#0F172A]',
    emerald: 'bg-[#0B3B2B] text-white border-2.5 border-[#0F172A]',
    pink: 'bg-[#FF2E93] text-white border-2.5 border-[#0F172A]',
    sand: 'bg-[#FAF7F2] text-[#0F172A] border-2.5 border-[#0F172A]',
    glass: 'bg-white/85 backdrop-blur-md text-[#0F172A] border-2.5 border-[#0F172A]',
  };

  const shadows = {
    none: '',
    sm: 'hh-shadow-sm',
    md: 'hh-shadow-md',
    lg: 'hh-shadow-lg',
    pink: 'hh-shadow-pink',
    yellow: 'hh-shadow-yellow',
  };

  return (
    <div
      className={twMerge(
        clsx('rounded-2xl p-6 sm:p-8 transition-all duration-200', variants[variant], shadows[shadow], className)
      )}
      {...props}
    >
      {children}
    </div>
  );
};
