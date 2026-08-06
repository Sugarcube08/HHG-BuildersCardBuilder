import QRCode from 'qrcode';

export interface QrCodeOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

/**
 * Pure function that renders a high-quality QR code as a PNG Data URL using Error Correction Level H.
 */
export const generateQrDataUrl = async (
  text: string,
  options: QrCodeOptions = {}
): Promise<string> => {
  const defaultOptions: QRCode.QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    margin: options.margin ?? 1,
    width: options.width ?? 300,
    color: {
      dark: options.color?.dark ?? '#0F172A',
      light: options.color?.light ?? '#FFFFFF',
    },
  };

  return QRCode.toDataURL(text, defaultOptions);
};

/**
 * Renders a QR code directly onto an existing HTML5 Canvas Context at specified coordinates.
 */
export const renderQrToCanvas = async (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number
): Promise<void> => {
  const qrDataUrl = await generateQrDataUrl(text, { width: size });
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, x, y, size, size);
      resolve();
    };
    img.onerror = () => reject(new Error('Failed to load QR image on canvas.'));
    img.src = qrDataUrl;
  });
};
