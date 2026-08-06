import React, { type HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'md',
  className,
  ...props
}) => {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    full: 'max-w-7xl',
  };

  return (
    <div
      className={twMerge(
        clsx('w-full mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)
      )}
      {...props}
    >
      {children}
    </div>
  );
};
