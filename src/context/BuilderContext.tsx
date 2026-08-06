import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  AppStep,
  BuilderContextType,
  BuilderDetailsFormData,
  CardThemeOptions,
  ImageUploadData,
} from '../types/builder';
import { STEP_ORDER } from '../constants/steps';

const initialImageData: ImageUploadData = {
  file: null,
  previewUrl: null,
  fileName: null,
  aspectRatio: null,
  dimensions: null,
};

const initialBuilderData: BuilderDetailsFormData = {
  fullName: '',
  role: 'Full Stack Developer',
  tagline: '"The System Architect"',
  twitterHandle: '',
  techStack: 'React, TypeScript, Tailwind',
};

const initialThemeOptions: CardThemeOptions = {
  backgroundPreset: 'sunset',
  badgeStyle: 'builder',
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<AppStep>('LANDING');
  const [imageData, setImageData] = useState<ImageUploadData>(initialImageData);
  const [builderData, setBuilderData] = useState<BuilderDetailsFormData>(initialBuilderData);
  const [themeOptions, setThemeOptions] = useState<CardThemeOptions>(initialThemeOptions);

  const setStep = (step: AppStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[currentIndex + 1]);
    }
  };

  const goToPrevStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setStep(STEP_ORDER[currentIndex - 1]);
    }
  };

  const setUploadedFile = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const ratio = width / height;

      let aspectRatio: 'square' | 'portrait' | 'landscape' = 'square';
      if (ratio > 1.1) {
        aspectRatio = 'landscape';
      } else if (ratio < 0.9) {
        aspectRatio = 'portrait';
      }

      setImageData({
        file,
        previewUrl,
        fileName: file.name,
        aspectRatio,
        dimensions: { width, height },
      });
    };

    img.src = previewUrl;
  };

  const clearImage = () => {
    if (imageData.previewUrl) {
      URL.revokeObjectURL(imageData.previewUrl);
    }
    setImageData(initialImageData);
  };

  const updateBuilderDetails = (details: Partial<BuilderDetailsFormData>) => {
    setBuilderData((prev) => ({ ...prev, ...details }));
  };

  const resetFlow = () => {
    clearImage();
    setBuilderData(initialBuilderData);
    setThemeOptions(initialThemeOptions);
    setCurrentStep('LANDING');
  };

  return (
    <BuilderContext.Provider
      value={{
        currentStep,
        setStep,
        goToNextStep,
        goToPrevStep,
        imageData,
        setImageData,
        setUploadedFile,
        clearImage,
        builderData,
        setBuilderData,
        updateBuilderDetails,
        themeOptions,
        setThemeOptions,
        resetFlow,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = (): BuilderContextType => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
