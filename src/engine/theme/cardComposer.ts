import { Theme } from '../../theme/theme';

export interface CardThemeConfig {
  bgColor: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
  bannerColor: string;
}

/**
 * Dynamically generates a builder tagline based on role input.
 */
export const generateTagline = (role: string): string => {
  const normalized = role.toLowerCase();

  if (normalized.includes('frontend') || normalized.includes('ui') || normalized.includes('ux')) {
    return '"Pixel Architect & Interface Artisan"';
  }
  if (normalized.includes('backend') || normalized.includes('api') || normalized.includes('system')) {
    return '"Distributed Systems & API Wizard"';
  }
  if (normalized.includes('ai') || normalized.includes('ml') || normalized.includes('data')) {
    return '"Neural Network Hacker & Prompt Sorcerer"';
  }
  if (
    normalized.includes('smart contract') ||
    normalized.includes('web3') ||
    normalized.includes('blockchain') ||
    normalized.includes('solana')
  ) {
    return '"On-Chain Voyager & Consensus Builder"';
  }
  if (
    normalized.includes('full stack') ||
    normalized.includes('fullstack') ||
    normalized.includes('developer') ||
    normalized.includes('engineer')
  ) {
    return '"Full Stack Sorcerer & Product Hacker"';
  }
  if (normalized.includes('designer') || normalized.includes('product')) {
    return '"Master of Visual & Product Harmony"';
  }

  return '"Building the Future in Public 🚀"';
};

/**
 * Returns canvas theme configuration for rendering card elements.
 */
export const getCardTheme = (): CardThemeConfig => {
  return {
    bgColor: Theme.colors.goaGreen,
    borderColor: Theme.colors.ink,
    textColor: Theme.colors.white,
    accentColor: Theme.colors.neonPink,
    bannerColor: Theme.colors.sunsetYellow,
  };
};
