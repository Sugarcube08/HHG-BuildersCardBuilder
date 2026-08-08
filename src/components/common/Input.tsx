'use client';

import React, { type InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-mono-hh font-extrabold uppercase tracking-wider text-[#062319]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#006B3C] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={twMerge(
              clsx(
                'w-full bg-[#FFF8E5] text-[#062319] placeholder:text-[#062319]/50 font-medium text-sm rounded-xl border-3 border-[#062319] py-3 px-3.5 transition-all outline-none hh-shadow-sm focus:border-[#FF0080] focus:bg-[#FFFDF5] disabled:bg-slate-200 disabled:opacity-75',
                leftIcon && 'pl-10',
                error && 'border-rose-600 focus:border-rose-600 bg-rose-50/50',
                className
              )
            )}
            {...props}
          />
        </div>
        {error ? (
          <p role="alert" className="text-xs font-bold text-rose-700 flex items-center gap-1 mt-0.5">
            <span aria-hidden="true">⚠️</span> {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-[#062319]/70 font-medium">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

