'use client';

import React, { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-display-hh tracking-wider font-extrabold uppercase transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none rounded-xl border-3 border-[#062319] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none';

  const variants = {
    primary:
      'bg-[#006B3C] text-[#FFF8E5] hover:bg-[#00874E] hh-shadow-yellow hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-[#FFD800] text-[#062319] hover:bg-[#FFE233] hh-shadow-md hover:-translate-y-0.5 active:translate-y-0',
    accent:
      'bg-[#FF0080] text-white hover:bg-[#E00070] hh-shadow-md hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'bg-[#FFF8E5] text-[#062319] hover:bg-[#FFFDF5] hh-shadow-md hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'bg-transparent text-[#FFF8E5] border-transparent hover:bg-white/10 hover:border-[#FFD800]/50 active:bg-white/20',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base sm:text-lg px-7 py-3.5 gap-2.5 min-h-[52px]',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        leftIcon && <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>}
    </button>
  );
};

