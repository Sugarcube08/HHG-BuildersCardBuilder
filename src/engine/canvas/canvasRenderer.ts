import type { ImageMetadata } from '../image/aspectRatio';
import { calculateCardLayout } from '../layout/layoutCalculator';
import { getCardTheme } from '../theme/cardComposer';
import { renderQrToCanvas } from '../qr/generateQr';
import { generateBuilderId } from '../qr/builderId';
import type { BuilderDetailsFormData } from '../../types/builder';

export interface ComposeCardParams {
  imageElement: HTMLImageElement | null;
  imageMeta: ImageMetadata | null;
  builderDetails: BuilderDetailsFormData;
  qrUrl?: string;
  targetSize?: number;
}

/**
 * Pure function that composes a high-res 1:1 Digital Builder Passport Card onto an HTML5 Canvas.
 */
export const composeBuilderCard = async (
  params: ComposeCardParams
): Promise<{ blob: Blob; dataUrl: string }> => {
  const { imageElement, imageMeta, builderDetails, qrUrl, targetSize = 1080 } = params;
  const theme = getCardTheme(builderDetails.role);
  const layout = calculateCardLayout(imageMeta, targetSize);
  const builderId = generateBuilderId(
    builderDetails.fullName,
    builderDetails.role,
    builderDetails.tagline,
    builderDetails.techStack
  );

  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2D context from canvas.');
  }

  // 1. Fill Canvas Background (Deep Goa Green)
  ctx.fillStyle = theme.bgColor;
  ctx.fillRect(0, 0, targetSize, targetSize);

  // Outer Framing Shadow & Border
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, targetSize - 16, targetSize - 16);

  // 2. Top Header Banner
  ctx.fillStyle = theme.textColor;
  ctx.font = '900 38px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE GOA 2026', layout.header.titleX, layout.header.titleY);

  ctx.fillStyle = theme.accentColor;
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('#FrameInGoa', layout.header.tagX, layout.header.tagY);

  // Header Accent Divider Line
  ctx.beginPath();
  ctx.moveTo(layout.header.titleX, layout.header.dividerY);
  ctx.lineTo(layout.header.tagX, layout.header.dividerY);
  ctx.strokeStyle = theme.accentColor;
  ctx.lineWidth = 4;
  ctx.stroke();

  // 3. Hero Framed Photo Container
  const { x: px, y: py, width: pW, height: pH, placement } = layout.photoRegion;

  // Photo Container Outer Shadow Card
  ctx.fillStyle = '#07281E';
  ctx.fillRect(px + 8, py + 8, pW, pH); // retro pop shadow
  ctx.fillRect(px, py, pW, pH);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 6;
  ctx.strokeRect(px, py, pW, pH);

  if (imageElement && placement) {
    ctx.drawImage(
      imageElement,
      px + placement.drawX,
      py + placement.drawY,
      placement.drawWidth,
      placement.drawHeight
    );
  }

  // Corner Accent Tags on Photo Frame
  ctx.fillStyle = theme.bannerColor;
  ctx.fillRect(px - 4, py - 4, 32, 8);
  ctx.fillRect(px - 4, py - 4, 8, 32);
  ctx.fillRect(px + pW - 28, py + pH - 4, 32, 8);
  ctx.fillRect(px + pW - 4, py + pH - 28, 8, 32);

  // 4. Builder Identity & Typography
  const { nameY, roleBadgeY, roleBadgeHeight, taglineY } = layout.identity;

  // Builder Full Name
  ctx.fillStyle = theme.textColor;
  ctx.font = '900 52px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((builderDetails.fullName || 'HACKER ALIAS').toUpperCase(), targetSize / 2, nameY);

  // Role Badge Box (Role-Personalized Accent Color)
  const roleText = (builderDetails.role || 'Full Stack Developer').toUpperCase();
  ctx.font = '800 24px "JetBrains Mono", monospace';
  const roleMetrics = ctx.measureText(roleText);
  const badgeWidth = roleMetrics.width + 44;
  const badgeX = (targetSize - badgeWidth) / 2;

  ctx.fillStyle = theme.roleBadgeBg;
  ctx.fillRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);

  ctx.fillStyle = theme.roleBadgeText;
  ctx.textAlign = 'center';
  ctx.fillText(roleText, targetSize / 2, roleBadgeY + 31);

  // Tagline / Motto
  ctx.fillStyle = '#A7F3D0';
  ctx.font = 'italic 24px "Inter", sans-serif';
  ctx.fillText(builderDetails.tagline || '"Building the Future in Public"', targetSize / 2, taglineY);

  // 5. Builder ID Box
  const { x: bX, y: bY, width: bW, height: bH } = layout.builderIdBox;
  ctx.fillStyle = '#07281E';
  ctx.fillRect(bX, bY, bW, bH);
  ctx.strokeStyle = '#12543E';
  ctx.lineWidth = 3;
  ctx.strokeRect(bX, bY, bW, bH);

  ctx.fillStyle = '#6EE7B7';
  ctx.font = '800 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`BUILDER ID: ${builderId}`, targetSize / 2, bY + 28);

  // 6. Interactive Scannable QR Verification Block
  const { x: qX, y: qY, boxWidth: qW, boxHeight: qH } = layout.qrBlock;

  // QR Container Box Background
  ctx.fillStyle = '#FAF7F2';
  ctx.fillRect(qX, qY, qW, qH);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(qX, qY, qW, qH);

  if (qrUrl) {
    const qrInnerX = qX + 16;
    const qrInnerY = qY + 12;
    const qrInnerSize = qH - 24;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrInnerX, qrInnerY, qrInnerSize, qrInnerSize);
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(qrInnerX, qrInnerY, qrInnerSize, qrInnerSize);

    try {
      await renderQrToCanvas(ctx, qrUrl, qrInnerX, qrInnerY, qrInnerSize);
    } catch (err) {
      console.warn('QR rendering to canvas warning:', err);
    }

    // QR Verification Text Block inside box
    const textX = qrInnerX + qrInnerSize + 24;
    ctx.textAlign = 'left';

    ctx.fillStyle = '#0F172A';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✓ SCAN TO VERIFY IDENTITY', textX, qY + 45);

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillText('OFFICIAL DIGITAL BUILDER PASSPORT', textX, qY + 74);

    ctx.fillStyle = theme.accentColor;
    ctx.font = '800 16px "Inter", sans-serif';
    ctx.fillText('HACKER HOUSE GOA 2026', textX, qY + 98);
  }

  // 7. Bottom Footer Branding
  ctx.fillStyle = '#6EE7B7';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('VERIFIED BUILDER CARD', layout.footer.leftX, layout.footer.y);

  ctx.textAlign = 'right';
  ctx.fillText('GOA, INDIA • MARCH 2026', layout.footer.rightX, layout.footer.y);

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
