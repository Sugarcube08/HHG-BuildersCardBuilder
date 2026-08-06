'use client';

import React, { createContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type {
  AppStep,
  BuilderContextType,
  BuilderDetailsFormData,
  CardFormat,
  GeneratedCardData,
  ImageUploadData,
} from '../types/builder';
import { STEP_ORDER } from '../constants/steps';
import { analyzeImage } from '../engine/image/aspectRatio';
import { generateTagline } from '../engine/theme/cardComposer';
import { generateBuilderId } from '../engine/qr/builderId';
import { generateBuilderUrl } from '../engine/qr/encodeBuilder';
import { parseBuilderUrlParam } from '../engine/qr/decodeBuilder';

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

/**
 * Reads a File object into a Base64 Data URL for zero-CORS DOM export compatibility.
 */
const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<AppStep>('LANDING');
  const [cardFormat, setCardFormat] = useState<CardFormat>('passport');
  const [imageData, setImageData] = useState<ImageUploadData>(initialImageData);
  const [builderData, setBuilderData] = useState<BuilderDetailsFormData>(initialBuilderData);
  const [generatedCard, setGeneratedCard] = useState<GeneratedCardData>(initialGeneratedCard);
  const [isRestoredFromUrl, setIsRestoredFromUrl] = useState<boolean>(false);

  // Parse URL on startup for /builder/d/[payload], /verify/:builderId or ?builder=<base64> parameter
  useEffect(() => {
    let rawStr = window.location.search;
    if (window.location.pathname.includes('/builder/d/')) {
      const parts = window.location.pathname.split('/builder/d/');
      if (parts[1]) {
        rawStr = `?builder=${parts[1].split('/')[0]}`;
      }
    }

    const restoredPayload = parseBuilderUrlParam(rawStr);
    if (restoredPayload) {
      setBuilderData({
        fullName: restoredPayload.name,
        role: restoredPayload.role,
        tagline: restoredPayload.tagline,
        techStack: restoredPayload.stack || '',
      });

      if (restoredPayload.meta) {
        setImageData((prev) => ({
          ...prev,
          meta: {
            width: restoredPayload.meta!.w,
            height: restoredPayload.meta!.h,
            ratio: restoredPayload.meta!.r,
            orientation: restoredPayload.meta!.o,
          },
        }));
      }

      setIsRestoredFromUrl(true);
      
      // If the URL contains /verify/, /builder/, or ?builder=, jump directly to VERIFY step
      if (
        window.location.pathname.includes('/verify') ||
        window.location.pathname.includes('/builder') ||
        window.location.search.includes('builder=')
      ) {
        setCurrentStep('VERIFY');
      } else {
        setCurrentStep('PREVIEW');
      }
    }
  }, []);

  const builderId = useMemo(() => {
    return generateBuilderId(
      builderData.fullName,
      builderData.role,
      builderData.tagline,
      builderData.techStack
    );
  }, [builderData]);

  const qrUrl = useMemo(() => {
    return generateBuilderUrl(builderData, imageData.meta);
  }, [builderData, imageData.meta]);

  const shareUrl = qrUrl;

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
      const previewUrl = await fileToDataUrl(file);
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
    setImageData(initialImageData);
  };

  const updateBuilderDetails = (details: Partial<BuilderDetailsFormData>) => {
    setBuilderData((prev) => ({ ...prev, ...details }));
  };

  const resetFlow = () => {
    clearImage();
    setBuilderData(initialBuilderData);
    setGeneratedCard(initialGeneratedCard);
    setIsRestoredFromUrl(false);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setCurrentStep('LANDING');
  };

  return (
    <BuilderContext.Provider
      value={{
        currentStep,
        setStep,
        goToNextStep,
        goToPrevStep,
        cardFormat,
        setCardFormat,
        imageData,
        setUploadedFile,
        clearImage,
        builderData,
        setBuilderData,
        updateBuilderDetails,
        generatedCard,
        setGeneratedCard,
        builderId,
        qrUrl,
        shareUrl,
        isRestoredFromUrl,
        resetFlow,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export { useBuilder } from './useBuilder';
