import type { ImageMetadata } from '../engine/image/aspectRatio';

export type AppStep =
  | 'LANDING'
  | 'UPLOAD'
  | 'DETAILS'
  | 'PREVIEW'
  | 'DOWNLOAD'
  | 'SHARE';

export interface ImageUploadData {
  file: File | null;
  previewUrl: string | null;
  fileName: string | null;
  meta: ImageMetadata | null;
}

export interface BuilderDetailsFormData {
  fullName: string;
  role: string;
  tagline: string;
  twitterHandle?: string;
  techStack?: string;
}

export interface GeneratedCardData {
  dataUrl: string | null;
  blob: Blob | null;
}

export interface BuilderContextType {
  currentStep: AppStep;
  setStep: (step: AppStep) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;

  imageData: ImageUploadData;
  setUploadedFile: (file: File) => Promise<void>;
  clearImage: () => void;

  builderData: BuilderDetailsFormData;
  setBuilderData: React.Dispatch<React.SetStateAction<BuilderDetailsFormData>>;
  updateBuilderDetails: (details: Partial<BuilderDetailsFormData>) => void;

  generatedCard: GeneratedCardData;
  setGeneratedCard: React.Dispatch<React.SetStateAction<GeneratedCardData>>;

  builderId: string;
  qrUrl: string;
  isRestoredFromUrl: boolean;

  resetFlow: () => void;
}
