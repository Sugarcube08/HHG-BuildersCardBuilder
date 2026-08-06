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
          <label htmlFor={inputId} className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-500 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={twMerge(
              clsx(
                'w-full bg-white text-[#0F172A] placeholder-slate-400 font-medium text-sm rounded-xl border-2 border-[#0F172A] py-2.5 px-3.5 transition-all outline-none focus:ring-2 focus:ring-[#FF2E93] focus:border-[#0F172A] hh-shadow-sm disabled:bg-slate-100 disabled:opacity-75',
                leftIcon && 'pl-10',
                error && 'border-rose-600 focus:ring-rose-500',
                className
              )
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs font-semibold text-rose-600 flex items-center gap-1">
            <span>⚠️</span> {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
