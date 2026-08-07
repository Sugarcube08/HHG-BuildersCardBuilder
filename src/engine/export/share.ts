import { exportBuilderCard } from './exportBuilderCard';
import { getDynamicBaseUrl } from '../share/payload';

/**
 * Formats concise X post caption with name, role, isolated verification link on its own line,
 * base URL to build your own card, and official hashtags.
 *
 * Example Output:
 * 🚀 I just generated my official Hacker House Goa 2026 Builder Passport!
 *
 * 👤 Harsh Raikwar
 * 💻 Full Stack Developer
 *
 * 📍 Verify my Builder Profile:
 * https://your-domain.com/builder/d/xxxx
 *
 * 🛠 Build your own Card:
 * https://your-domain.com/
 *
 * #FrameInGoa #HHGoa2026 #HackerHouseGoa
 */
export const generateXShareCaption = (
  fullName: string,
  role: string,
  shareUrl: string
): string => {
  const nameStr = fullName || 'Builder';
  const roleStr = role || 'Full Stack Developer';
  const targetUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const baseUrl = getDynamicBaseUrl();

  return [
    `🚀 I just generated my official Hacker House Goa 2026 Builder Passport!`,
    ``,
    `👤 ${nameStr}`,
    `💻 ${roleStr}`,
    ``,
    `📍 Verify my Builder Profile:`,
    targetUrl,
    ``,
    `🛠 Build your own Card:`,
    baseUrl,
    ``,
    `#FrameInGoa #HHGoa2026 #HackerHouseGoa`,
  ].join('\n');
};

/**
 * Hardened Twitter / X Share Engine:
 * 1. Pre-warms canonical Builder route and Open Graph endpoints if applicable.
 * 2. Formats concise, multi-line caption with isolated URLs.
 * 3. Opens pre-filled X Intent window.
 */
export const shareToX = (
  fullName: string,
  role: string,
  builderId?: string,
  shareUrl?: string
): void => {
  const targetUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');

  // Pre-warm the Builder route and Open Graph image routes before opening X
  if (targetUrl.startsWith('http')) {
    try {
      const ogImageUrl = targetUrl.includes('?img=')
        ? targetUrl.replace(/\/builder\/d\/([^?]+)\?img=([^&]+)/, '/api/share/image/$2')
        : `${targetUrl.replace(/\/$/, '')}/opengraph-image`;

      Promise.all([
        fetch(targetUrl, { mode: 'no-cors', cache: 'no-store' }),
        fetch(ogImageUrl, { mode: 'no-cors', cache: 'no-store' }),
      ]).catch(() => {
        // Silently catch fetch warnings if offline or behind tunnel
      });
    } catch {
      // Ignore pre-warm exceptions
    }
  }

  const caption = generateXShareCaption(fullName, role, targetUrl);
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;

  window.open(intentUrl, '_blank', 'noopener,noreferrer');
};

/**
 * Complete "Download & Share on X" sequencing workflow:
 * 1. Generates 3x Retina Builder Passport PNG & triggers browser download.
 * 2. Delays ~400ms to allow browser download initiation without popup/tab focus competition.
 * 3. Opens X Intent URL with pre-filled caption & verification link.
 */
export const downloadAndShareToX = async (
  domElement: HTMLElement,
  fullName: string,
  role: string,
  builderId?: string,
  shareUrl?: string
): Promise<void> => {
  // Step 1: Export 3x Retina PNG and trigger download
  await exportBuilderCard(domElement, fullName, { pixelRatio: 3 });

  // Step 2: 400ms delay so download starts cleanly before opening X intent window
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Step 3: Open X Intent window with prefilled caption & verification link
  shareToX(fullName, role, builderId, shareUrl);
};
