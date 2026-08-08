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
    default: 'bg-[#FFF8E5] text-[#062319] border-3 border-[#062319]',
    emerald: 'bg-[#006B3C] text-[#FFF8E5] border-3 border-[#062319]',
    pink: 'bg-[#FF0080] text-white border-3 border-[#062319]',
    sand: 'bg-[#FAF0D4] text-[#062319] border-3 border-[#062319]',
    glass: 'bg-[#FFF8E5] text-[#062319] border-3 border-[#062319]',
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

