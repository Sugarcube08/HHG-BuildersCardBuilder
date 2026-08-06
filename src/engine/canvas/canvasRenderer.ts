import type { ImageMetadata } from '../image/aspectRatio';
import { calculateCanvasPlacement } from '../image/aspectRatio';
import { getThemeConfig } from '../theme/themeComposer';
import type { BuilderDetailsFormData } from '../../types/builder';

export interface RenderCardParams {
  imageElement: HTMLImageElement | null;
  imageMeta: ImageMetadata | null;
  builderDetails: BuilderDetailsFormData;
  targetSize?: number;
}

/**
 * Pure function that renders a high-res 1:1 Builder Card onto an HTML5 Canvas and returns a Blob URL.
 */
export const renderBuilderCard = async (
  params: RenderCardParams
): Promise<{ blob: Blob; dataUrl: string }> => {
  const { imageElement, imageMeta, builderDetails, targetSize = 1080 } = params;
  const theme = getThemeConfig();

  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2D context from canvas.');
  }

  // 1. Draw Background
  ctx.fillStyle = theme.bgColor;
  ctx.fillRect(0, 0, targetSize, targetSize);

  // 2. Draw Outer Border & Brand Shadow
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, targetSize - 16, targetSize - 16);

  // 3. Draw Header Title: HACKER HOUSE GOA 2026
  ctx.fillStyle = theme.textColor;
  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE GOA 2026', 48, 72);

  ctx.fillStyle = theme.accentColor;
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('#FrameInGoa', targetSize - 48, 72);

  // Divider Line
  ctx.beginPath();
  ctx.moveTo(48, 96);
  ctx.lineTo(targetSize - 48, 96);
  ctx.strokeStyle = '#12543E';
  ctx.lineWidth = 4;
  ctx.stroke();

  // 4. Draw Photo Frame Area if Image Exists
  const photoBoxX = 64;
  const photoBoxY = 120;
  const photoBoxSize = targetSize - 128 - 200; // Leave space for bottom details

  ctx.fillStyle = '#07281E';
  ctx.fillRect(photoBoxX, photoBoxY, photoBoxSize, photoBoxSize);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 6;
  ctx.strokeRect(photoBoxX, photoBoxY, photoBoxSize, photoBoxSize);

  if (imageElement && imageMeta) {
    const placement = calculateCanvasPlacement(imageMeta.width, imageMeta.height, photoBoxSize);
    ctx.drawImage(
      imageElement,
      photoBoxX + placement.drawX,
      photoBoxY + placement.drawY,
      placement.drawWidth,
      placement.drawHeight
    );
  }

  // 5. Draw Builder Details Text
  const detailsY = photoBoxY + photoBoxSize + 48;

  // Name
  ctx.fillStyle = theme.textColor;
  ctx.font = 'extrabold 48px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(builderDetails.fullName || 'Hacker Alias', targetSize / 2, detailsY);

  // Role Badge Box
  const roleText = (builderDetails.role || 'Full Stack Developer').toUpperCase();
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  const roleMetrics = ctx.measureText(roleText);
  const badgeWidth = roleMetrics.width + 40;
  const badgeHeight = 44;
  const badgeX = (targetSize - badgeWidth) / 2;
  const badgeY = detailsY + 20;

  ctx.fillStyle = theme.bannerColor;
  ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(badgeX, badgeY, badgeWidth, badgeHeight);

  ctx.fillStyle = theme.borderColor;
  ctx.textAlign = 'center';
  ctx.fillText(roleText, targetSize / 2, badgeY + 30);

  // Tagline
  ctx.fillStyle = '#A7F3D0';
  ctx.font = 'italic 24px "Inter", sans-serif';
  ctx.fillText(builderDetails.tagline || '"Building in Public"', targetSize / 2, badgeY + 90);

  // Convert canvas to blob & data URL
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
