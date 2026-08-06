import { toPng, toBlob } from 'html-to-image';
import { ensureFontsLoaded } from '../canvas/canvasRenderer';
import { downloadImage } from './download';

export interface ExportCardOptions {
  pixelRatio?: number;
}

/**
 * Ensures all <img> elements inside the target DOM node are decoded and loaded
 * before running DOM capture.
 */
const waitForImagesLoaded = async (domElement: HTMLElement): Promise<void> => {
  const images = Array.from(domElement.querySelectorAll('img'));
  const promises = images.map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });
  await Promise.all(promises);
};

/**
 * Pure DOM export engine using html-to-image. Captures the canonical BuilderCard DOM node directly,
 * generating a 3x Retina PNG asset without recreating layouts or canvas coordinates manually.
 */
export const exportBuilderCard = async (
  domElement: HTMLElement,
  fullName: string,
  options: ExportCardOptions = {}
): Promise<{ blob: Blob; dataUrl: string }> => {
  const pixelRatio = options.pixelRatio ?? 3;

  // 1. Wait for custom Web Fonts & Images to finish loading
  await ensureFontsLoaded();
  await waitForImagesLoaded(domElement);

  // 2. Perform DOM capture with skipFonts: true to prevent CORS Google Fonts cssRules exception,
  // and cacheBust: false to prevent invalid blob: URL query string errors.
  try {
    const captureOptions = {
      pixelRatio,
      skipFonts: true,
      cacheBust: false,
      backgroundColor: '#0B3B2B',
    };

    const dataUrl = await toPng(domElement, captureOptions);
    const blob = await toBlob(domElement, captureOptions);

    if (!blob) {
      throw new Error('DOM capture to Blob returned null.');
    }

    // Trigger PNG download with sanitized filename
    downloadImage(blob, fullName);

    return { blob, dataUrl };
  } catch (err) {
    console.error('DOM Export Error:', err);
    throw new Error('Failed to capture Builder Passport DOM.');
  }
};
