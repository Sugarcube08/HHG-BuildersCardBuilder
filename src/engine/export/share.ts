/**
 * Opens a pre-filled Twitter / X Intent window with the canonical Builder URL and caption,
 * enabling X to crawl Open Graph tags and render the dynamic Builder Passport preview card.
 */
export const shareToX = (
  fullName: string,
  role: string,
  builderId?: string,
  shareUrl?: string
): void => {
  const nameStr = fullName || 'a Builder';
  const roleStr = role || 'Full Stack Developer';
  const idStr = builderId ? ` (${builderId})` : '';

  const caption = `I just generated my official Hacker House Goa 2026 Digital Builder Passport! 🚀\n\nVerified Builder: ${nameStr}${idStr}\nRole: ${roleStr}\n\n#FrameInGoa #HHGoa2026 #HackerHouseGoa`;
  
  const targetUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(targetUrl)}`;
  
  window.open(intentUrl, '_blank', 'noopener,noreferrer');
};
