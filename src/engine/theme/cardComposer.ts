import { Theme } from '../../theme/theme';

export interface CardThemeConfig {
  bgColor: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
  bannerColor: string;
  roleBadgeBg: string;
  roleBadgeText: string;
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
 * Returns role-personalized theme configuration for visual card composition.
 */
export const getCardTheme = (role: string = ''): CardThemeConfig => {
  const normalized = role.toLowerCase();

  let accentColor: string = Theme.colors.neonPink;
  let bannerColor: string = Theme.colors.sunsetYellow;
  let roleBadgeBg: string = Theme.colors.sunsetYellow;
  let roleBadgeText: string = Theme.colors.ink;

  if (normalized.includes('frontend') || normalized.includes('ui') || normalized.includes('ux') || normalized.includes('design')) {
    accentColor = '#FF2E93';
    bannerColor = '#FF2E93';
    roleBadgeBg = '#FF2E93';
    roleBadgeText = '#FFFFFF';
  } else if (normalized.includes('backend') || normalized.includes('api') || normalized.includes('devops')) {
    accentColor = '#10B981';
    bannerColor = '#10B981';
    roleBadgeBg = '#10B981';
    roleBadgeText = '#0F172A';
  } else if (normalized.includes('ai') || normalized.includes('ml') || normalized.includes('data')) {
    accentColor = '#A855F7';
    bannerColor = '#A855F7';
    roleBadgeBg = '#A855F7';
    roleBadgeText = '#FFFFFF';
  } else if (normalized.includes('smart contract') || normalized.includes('web3') || normalized.includes('blockchain') || normalized.includes('solana')) {
    accentColor = '#F97316';
    bannerColor = '#F97316';
    roleBadgeBg = '#F97316';
    roleBadgeText = '#FFFFFF';
  }

  return {
    bgColor: Theme.colors.goaGreen,
    borderColor: Theme.colors.ink,
    textColor: Theme.colors.white,
    accentColor,
    bannerColor,
    roleBadgeBg,
    roleBadgeText,
  };
};
