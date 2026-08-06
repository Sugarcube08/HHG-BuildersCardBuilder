/**
 * Hardened Twitter / X Share Engine:
 * 1. Pre-warms the canonical Builder route and Open Graph image endpoints.
 * 2. Enforces a 300ms delay to allow edge cache warming.
 * 3. Opens pre-filled X Intent window with dedicated &url= parameter.
 */
export const shareToX = async (
  fullName: string,
  role: string,
  builderId?: string,
  shareUrl?: string
): Promise<void> => {
  const nameStr = fullName || 'a Builder';
  const roleStr = role || 'Full Stack Developer';
  const idStr = builderId ? ` (${builderId})` : '';

  const targetUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');

  // Pre-warm the Builder route and Open Graph image routes before opening X
  if (targetUrl.startsWith('http')) {
    try {
      const ogImageUrl = `${targetUrl.replace(/\/$/, '')}/opengraph-image`;
      await Promise.all([
        fetch(targetUrl, { mode: 'no-cors', cache: 'no-store' }),
        fetch(ogImageUrl, { mode: 'no-cors', cache: 'no-store' }),
      ]).catch(() => {
        // Silently catch fetch warnings if offline or behind tunnel
      });
      // 300ms delay for CDN / Cache edge warming
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch {
      // Ignore pre-warm exceptions
    }
  }

  // Caption contains text & hashtags ONLY; target link is passed via &url=
  const caption = `🚀 I just generated my official Hacker House Goa 2026 Digital Builder Passport!\n\nVerified Builder: ${nameStr}${idStr}\nRole: ${roleStr}\n\n#FrameInGoa #HHGoa2026 #HackerHouseGoa`;
  
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(targetUrl)}`;
  
  window.open(intentUrl, '_blank', 'noopener,noreferrer');
};
