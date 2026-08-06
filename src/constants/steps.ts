import type { AppStep } from '../types/builder';

export interface StepConfig {
  id: AppStep;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
}

export const APP_STEPS: StepConfig[] = [
  {
    id: 'LANDING',
    number: 1,
    title: 'Welcome to Hacker House Goa 2026',
    shortTitle: 'Start',
    description: 'Claim your builder identity for HH Goa 2026.',
  },
  {
    id: 'UPLOAD',
    number: 2,
    title: 'Upload Your Photo',
    shortTitle: 'Photo',
    description: 'Select your photo (JPG, PNG, WebP) - zero auto-crop.',
  },
  {
    id: 'DETAILS',
    number: 3,
    title: 'Builder Details',
    shortTitle: 'Details',
    description: 'Enter your name, role, and builder motto.',
  },
  {
    id: 'PREVIEW',
    number: 4,
    title: 'Preview Your Card',
    shortTitle: 'Preview',
    description: 'Your customized HH Goa 2026 Builder Card is ready.',
  },
  {
    id: 'DOWNLOAD',
    number: 5,
    title: 'Download Card',
    shortTitle: 'Download',
    description: 'Save your high-res PNG card to your device.',
  },
  {
    id: 'SHARE',
    number: 6,
    title: 'Share with Community',
    shortTitle: 'Share',
    description: 'Post your card to X with #FrameInGoa.',
  },
];

export const STEP_ORDER: AppStep[] = [
  'LANDING',
  'UPLOAD',
  'DETAILS',
  'PREVIEW',
  'DOWNLOAD',
  'SHARE',
];

export const PRESET_ROLES = [
  'Full Stack Developer',
  'AI / ML Engineer',
  'Smart Contract Dev',
  'Frontend Architect',
  'Backend Engineer',
  'Product Designer',
  'Open Source Contributor',
  'DevRel / Community',
];
