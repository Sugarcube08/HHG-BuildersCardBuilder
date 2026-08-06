export type AppStep =
  | 'LANDING'
  | 'UPLOAD'
  | 'DETAILS'
  | 'GENERATE'
  | 'PREVIEW'
  | 'DOWNLOAD'
  | 'SHARE';

export type AspectRatioType = 'square' | 'portrait' | 'landscape';

export interface ImageUploadData {
  file: File | null;
  previewUrl: string | null;
  fileName: string | null;
  aspectRatio: AspectRatioType | null;
  dimensions: { width: number; height: number } | null;
}

export interface BuilderDetailsFormData {
  fullName: string;
  role: string;
  tagline: string;
  twitterHandle?: string;
  techStack?: string;
}

export interface CardThemeOptions {
  backgroundPreset: 'sunset' | 'emerald' | 'cyber' | 'minimal';
  badgeStyle: 'hacker' | 'vip' | 'builder';
}

export interface BuilderContextType {
  currentStep: AppStep;
  setStep: (step: AppStep) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  
  imageData: ImageUploadData;
  setImageData: React.Dispatch<React.SetStateAction<ImageUploadData>>;
  setUploadedFile: (file: File) => void;
  clearImage: () => void;

  builderData: BuilderDetailsFormData;
  setBuilderData: React.Dispatch<React.SetStateAction<BuilderDetailsFormData>>;
  updateBuilderDetails: (details: Partial<BuilderDetailsFormData>) => void;

  themeOptions: CardThemeOptions;
  setThemeOptions: React.Dispatch<React.SetStateAction<CardThemeOptions>>;
  
  resetFlow: () => void;
}
