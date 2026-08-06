/**
 * Triggers a browser download of a PNG image Blob or Data URL.
 */
export const downloadImage = (source: Blob | string, fileName: string = 'hh-goa-2026-builder-card.png'): void => {
  const url = typeof source === 'string' ? source : URL.createObjectURL(source);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (typeof source !== 'string') {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
};
