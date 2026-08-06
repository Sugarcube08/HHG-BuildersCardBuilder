/**
 * Opens a pre-filled Twitter / X Intent window with event hashtags.
 */
export const shareToX = (fullName: string, role: string): void => {
  const caption = `Ready for Hacker House Goa 2026! 🚀\n\nI'm ${fullName || 'a Builder'}, attending as a ${role || 'Hacker'}.\n\n#FrameInGoa #HHGoa2026`;
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
  window.open(intentUrl, '_blank', 'noopener,noreferrer');
};
