'use client';

import { forwardRef, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ExportBoundaryProps {
  children: ReactNode;
  className?: string;
}

/**
 * Provides a fixed-size CR80 rendering surface for pixel-perfect export capture
 * while allowing responsive preview scaling in the browser DOM.
 */
export const ExportBoundary = forwardRef<HTMLDivElement, ExportBoundaryProps>(
  ({ children, className }, ref) => {
    return (
      <div className="w-full flex justify-center items-center overflow-hidden p-1">
        <div
          ref={ref}
          className={twMerge(
            clsx(
              'w-full max-w-[440px] font-sans text-left transition-transform duration-150',
              className
            )
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

ExportBoundary.displayName = 'ExportBoundary';
