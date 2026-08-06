'use client';

import { useContext } from 'react';
import { BuilderContext } from './BuilderContext';
import type { BuilderContextType } from '../types/builder';

export const useBuilder = (): BuilderContextType => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
