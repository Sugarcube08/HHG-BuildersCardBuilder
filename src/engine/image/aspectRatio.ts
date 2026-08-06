export interface ImageMetadata {
  width: number;
  height: number;
  ratio: number;
  orientation: 'square' | 'portrait' | 'landscape';
}

export interface CanvasPlacement {
  drawX: number;
  drawY: number;
  drawWidth: number;
  drawHeight: number;
  canvasWidth: number;
  canvasHeight: number;
}

/**
 * Analyzes an uploaded image file and returns detailed metadata.
 */
export const analyzeImage = (file: File): Promise<ImageMetadata> => {
  return new Promise((resolve, reject) => {
    const previewUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const ratio = width / height;

      let orientation: 'square' | 'portrait' | 'landscape' = 'square';
      if (ratio > 1.1) {
        orientation = 'landscape';
      } else if (ratio < 0.9) {
        orientation = 'portrait';
      }

      URL.revokeObjectURL(previewUrl);

      resolve({
        width,
        height,
        ratio,
        orientation,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      reject(new Error('Failed to load image file.'));
    };

    img.src = previewUrl;
  });
};

/**
 * Calculates optimal placement coordinates for an image within a square canvas (e.g. 1080x1080)
 * preserving 100% original aspect ratio without distortion or auto-cropping.
 */
export const calculateCanvasPlacement = (
  imgWidth: number,
  imgHeight: number,
  targetSize: number = 1080
): CanvasPlacement => {
  const ratio = imgWidth / imgHeight;
  let drawWidth = targetSize;
  let drawHeight = targetSize;

  if (ratio >= 1) {
    // Landscape or Square: fit width first
    drawWidth = targetSize;
    drawHeight = targetSize / ratio;
  } else {
    // Portrait: fit height first
    drawHeight = targetSize;
    drawWidth = targetSize * ratio;
  }

  const drawX = (targetSize - drawWidth) / 2;
  const drawY = (targetSize - drawHeight) / 2;

  return {
    drawX,
    drawY,
    drawWidth,
    drawHeight,
    canvasWidth: targetSize,
    canvasHeight: targetSize,
  };
};
