import type { ImageMetadata } from '../image/aspectRatio';
import { calculateCardLayout } from '../layout/layoutCalculator';
import { getCardTheme } from '../theme/cardComposer';
import { renderQrToCanvas } from '../qr/generateQr';
import type { BuilderDetailsFormData } from '../../types/builder';

export interface ComposeCardParams {
  imageElement: HTMLImageElement | null;
  imageMeta: ImageMetadata | null;
  builderDetails: BuilderDetailsFormData;
  qrUrl?: string;
  targetSize?: number;
}

/**
 * Pure function that composes a high-res 1:1 Builder Card onto an HTML5 Canvas using
 * the Layout Engine, Card Composer, and QR Engine, returning a Blob and Data URL.
 */
export const composeBuilderCard = async (
  params: ComposeCardParams
): Promise<{ blob: Blob; dataUrl: string }> => {
  const { imageElement, imageMeta, builderDetails, qrUrl, targetSize = 1080 } = params;
  const theme = getCardTheme();
  const layout = calculateCardLayout(imageMeta, targetSize);

  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2D context from canvas.');
  }

  // 1. Fill Canvas Background
  ctx.fillStyle = theme.bgColor;
  ctx.fillRect(0, 0, targetSize, targetSize);

  // 2. Draw Outer Border & Framing Shadow
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, targetSize - 16, targetSize - 16);

  // 3. Draw Header Title & Hashtag using Layout Engine coordinates
  ctx.fillStyle = theme.textColor;
  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE GOA 2026', layout.header.titleX, layout.header.titleY);

  ctx.fillStyle = theme.accentColor;
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('#FrameInGoa', layout.header.tagX, layout.header.tagY);

  // Header Divider Line
  ctx.beginPath();
  ctx.moveTo(layout.header.titleX, layout.header.dividerY);
  ctx.lineTo(layout.header.tagX, layout.header.dividerY);
  ctx.strokeStyle = '#12543E';
  ctx.lineWidth = 4;
  ctx.stroke();

  // 4. Render Photo Region
  const { x: px, y: py, size: pSize, placement } = layout.photoRegion;
  ctx.fillStyle = '#07281E';
  ctx.fillRect(px, py, pSize, pSize);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 6;
  ctx.strokeRect(px, py, pSize, pSize);

  if (imageElement && placement) {
    ctx.drawImage(
      imageElement,
      px + placement.drawX,
      py + placement.drawY,
      placement.drawWidth,
      placement.drawHeight
    );
  }

  // 5. Render Builder Details & Typography
  const { nameY, roleBadgeY, roleBadgeHeight, taglineY } = layout.typography;

  // Builder Name
  ctx.fillStyle = theme.textColor;
  ctx.font = 'extrabold 48px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(builderDetails.fullName || 'Hacker Alias', targetSize / 2, nameY);

  // Role Badge Box
  const roleText = (builderDetails.role || 'Full Stack Developer').toUpperCase();
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  const roleMetrics = ctx.measureText(roleText);
  const badgeWidth = roleMetrics.width + 40;
  const badgeX = (targetSize - badgeWidth) / 2;

  ctx.fillStyle = theme.bannerColor;
  ctx.fillRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);

  ctx.fillStyle = theme.borderColor;
  ctx.textAlign = 'center';
  ctx.fillText(roleText, targetSize / 2, roleBadgeY + 32);

  // Tagline
  ctx.fillStyle = '#A7F3D0';
  ctx.font = 'italic 24px "Inter", sans-serif';
  ctx.fillText(builderDetails.tagline || '"Building in Public"', targetSize / 2, taglineY);

  // 6. Draw QR Code & Footer Branding
  if (qrUrl) {
    const qrSize = 96;
    const qrX = layout.footer.hashtagX;
    const qrY = targetSize - qrSize - 32;

    // Draw QR white background card
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12);
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12);

    try {
      await renderQrToCanvas(ctx, qrUrl, qrX, qrY, qrSize);
    } catch (err) {
      console.warn('QR rendering to canvas warning:', err);
    }
  }

  // Footer Text
  ctx.fillStyle = '#6EE7B7';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('VERIFIED BUILDER CARD • GOA 2026', layout.footer.badgeX, layout.footer.y);

  // Export Canvas to Blob & Data URL
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas export to Blob failed.'));
        return;
      }
      const dataUrl = canvas.toDataURL('image/png');
      resolve({ blob, dataUrl });
    }, 'image/png');
  });
};
