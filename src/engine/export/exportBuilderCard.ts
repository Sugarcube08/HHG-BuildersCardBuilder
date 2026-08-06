import { toPng, toBlob } from 'html-to-image';
import { ensureFontsLoaded } from '../canvas/canvasRenderer';
import { downloadImage } from './download';

export interface ExportCardOptions {
  pixelRatio?: number;
}

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

  // 1. Wait for custom Web Fonts to finish loading
  await ensureFontsLoaded();

  // 2. Perform DOM capture at 3x Retina resolution
  try {
    const dataUrl = await toPng(domElement, {
      pixelRatio,
      cacheBust: true,
      backgroundColor: '#0B3B2B',
    });

    const blob = await toBlob(domElement, {
      pixelRatio,
      cacheBust: true,
      backgroundColor: '#0B3B2B',
    });

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
