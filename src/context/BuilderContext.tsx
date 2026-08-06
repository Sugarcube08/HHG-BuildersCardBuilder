import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  AppStep,
  BuilderContextType,
  BuilderDetailsFormData,
  GeneratedCardData,
  ImageUploadData,
} from '../types/builder';
import { STEP_ORDER } from '../constants/steps';
import { analyzeImage } from '../engine/image/aspectRatio';
import { generateTagline } from '../engine/theme/cardComposer';

const initialImageData: ImageUploadData = {
  file: null,
  previewUrl: null,
  fileName: null,
  meta: null,
};

const initialBuilderData: BuilderDetailsFormData = {
  fullName: '',
  role: 'Full Stack Developer',
  tagline: generateTagline('Full Stack Developer'),
  twitterHandle: '',
  techStack: 'React, TypeScript, Tailwind',
};

const initialGeneratedCard: GeneratedCardData = {
  dataUrl: null,
  blob: null,
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<AppStep>('LANDING');
  const [imageData, setImageData] = useState<ImageUploadData>(initialImageData);
  const [builderData, setBuilderData] = useState<BuilderDetailsFormData>(initialBuilderData);
  const [generatedCard, setGeneratedCard] = useState<GeneratedCardData>(initialGeneratedCard);

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

  const setUploadedFile = async (file: File) => {
    try {
      const previewUrl = URL.createObjectURL(file);
      const meta = await analyzeImage(file);

      setImageData({
        file,
        previewUrl,
        fileName: file.name,
        meta,
      });
    } catch (err) {
      console.error('Failed to process image file:', err);
    }
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
    setGeneratedCard(initialGeneratedCard);
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
        setUploadedFile,
        clearImage,
        builderData,
        setBuilderData,
        updateBuilderDetails,
        generatedCard,
        setGeneratedCard,
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
