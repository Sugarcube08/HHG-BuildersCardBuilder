/**
 * Formats a sanitized, meaningful filename for the downloaded PNG asset.
 * Example: Harsh_Raikwar_HH_Goa_2026_Builder_Passport.png
 */
export const formatDownloadFilename = (fullName: string): string => {
  const sanitized = (fullName || 'Builder')
    .trim()
    .replace(/[^a-zA-Z0-9\s_-]/g, '')
    .replace(/\s+/g, '_');
  
  return `${sanitized}_HH_Goa_2026_Builder_Passport.png`;
};

/**
 * Triggers a browser download of a PNG image Blob or Data URL safely.
 * Works seamlessly across Chrome, Firefox, Edge, Safari, and mobile WebViews.
 */
export const downloadImage = (
  source: Blob | string,
  fullName: string = 'Builder'
): void => {
  const fileName = formatDownloadFilename(fullName);
  const url = typeof source === 'string' ? source : URL.createObjectURL(source);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.setAttribute('rel', 'noopener noreferrer');
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke object URL after trigger to free browser memory
  if (typeof source !== 'string') {
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  }
};
