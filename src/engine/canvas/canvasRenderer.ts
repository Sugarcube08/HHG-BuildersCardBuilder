import type { ImageMetadata } from '../image/aspectRatio';
import { calculateCardLayout } from '../layout/layoutCalculator';
import { getCardTheme } from '../theme/cardComposer';
import { renderQrToCanvas } from '../qr/generateQr';
import { generateBuilderId } from '../qr/builderId';
import type { BuilderDetailsFormData, CardFormat } from '../../types/builder';

export interface ComposeCardParams {
  imageElement: HTMLImageElement | null;
  imageMeta: ImageMetadata | null;
  builderDetails: BuilderDetailsFormData;
  qrUrl?: string;
  format?: CardFormat;
}

/**
 * Pure function that composes a high-res 16:9 Landscape Builder Passport (1600x900)
 * or 1:1 Square Avatar Badge (1080x1080) onto an HTML5 Canvas.
 */
export const composeBuilderCard = async (
  params: ComposeCardParams
): Promise<{ blob: Blob; dataUrl: string }> => {
  const { imageElement, imageMeta, builderDetails, qrUrl, format = 'passport' } = params;
  const theme = getCardTheme(builderDetails.role);
  const layout = calculateCardLayout(imageMeta, format);
  const builderId = generateBuilderId(
    builderDetails.fullName,
    builderDetails.role,
    builderDetails.tagline,
    builderDetails.techStack
  );

  const canvas = document.createElement('canvas');
  canvas.width = layout.canvasWidth;
  canvas.height = layout.canvasHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2D context from canvas.');
  }

  // 1. Fill Canvas Background (Deep Goa Green)
  ctx.fillStyle = theme.bgColor;
  ctx.fillRect(0, 0, layout.canvasWidth, layout.canvasHeight);

  // Outer Framing Shadow & Border
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, layout.canvasWidth - 16, layout.canvasHeight - 16);

  // 2. Top Header Banner
  ctx.fillStyle = theme.textColor;
  ctx.font = '900 42px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE GOA 2026', layout.header.titleX, layout.header.titleY);

  ctx.fillStyle = theme.accentColor;
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
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

  if (format === 'passport') {
    // -------------------------------------------------------------
    // 16:9 LANDSCAPE BUILDER PASSPORT COMPOSITION
    // -------------------------------------------------------------
    const { x: idx, nameY, roleBadgeY, roleBadgeHeight, taglineY, techStackY, builderIdY } = layout.identity;

    // Builder Full Name
    ctx.fillStyle = theme.textColor;
    ctx.font = '900 52px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText((builderDetails.fullName || 'HACKER ALIAS').toUpperCase(), idx, nameY);

    // Role Badge Box (Role-Personalized Accent Color)
    const roleText = (builderDetails.role || 'Full Stack Developer').toUpperCase();
    ctx.font = '800 24px "JetBrains Mono", monospace';
    const roleMetrics = ctx.measureText(roleText);
    const badgeWidth = roleMetrics.width + 44;

    ctx.fillStyle = theme.roleBadgeBg;
    ctx.fillRect(idx, roleBadgeY, badgeWidth, roleBadgeHeight);
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(idx, roleBadgeY, badgeWidth, roleBadgeHeight);

    ctx.fillStyle = theme.roleBadgeText;
    ctx.textAlign = 'center';
    ctx.fillText(roleText, idx + badgeWidth / 2, roleBadgeY + 33);

    // Motto / Tagline
    ctx.fillStyle = '#A7F3D0';
    ctx.font = 'italic 26px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(builderDetails.tagline || '"Building the Future in Public"', idx, taglineY);

    // Tech Focus Tags
    if (builderDetails.techStack) {
      ctx.fillStyle = '#6EE7B7';
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.fillText(`STACK: ${builderDetails.techStack}`, idx, techStackY);
    }

    // Builder ID Box
    const idBoxWidth = 420;
    const idBoxHeight = 52;
    ctx.fillStyle = '#07281E';
    ctx.fillRect(idx, builderIdY, idBoxWidth, idBoxHeight);
    ctx.strokeStyle = '#12543E';
    ctx.lineWidth = 3;
    ctx.strokeRect(idx, builderIdY, idBoxWidth, idBoxHeight);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`BUILDER PASSPORT: ${builderId}`, idx + idBoxWidth / 2, builderIdY + 33);

    // -------------------------------------------------------------
    // RIGHT COLUMN: PROMINENT QR VERIFICATION BLOCK
    // -------------------------------------------------------------
    const { x: qX, y: qY, width: qW, height: qH, qrX, qrY, qrSize, captionY } = layout.qrColumn;

    // QR Column Background Box
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(qX, qY, qW, qH);
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 6;
    ctx.strokeRect(qX, qY, qW, qH);

    if (qrUrl) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16);
      ctx.strokeStyle = theme.borderColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16);

      try {
        await renderQrToCanvas(ctx, qrUrl, qrX, qrY, qrSize);
      } catch (err) {
        console.warn('QR rendering warning:', err);
      }
    }

    // Captions below QR
    ctx.textAlign = 'center';
    const centerX = qX + qW / 2;

    ctx.fillStyle = '#0F172A';
    ctx.font = '900 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SCAN TO VERIFY IDENTITY', centerX, captionY);

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText('OFFICIAL DIGITAL BUILDER PASSPORT', centerX, captionY + 32);

    ctx.fillStyle = theme.accentColor;
    ctx.font = '800 18px "Inter", sans-serif';
    ctx.fillText('HACKER HOUSE GOA 2026', centerX, captionY + 60);

  } else {
    // -------------------------------------------------------------
    // 1:1 SQUARE AVATAR BADGE COMPOSITION
    // -------------------------------------------------------------
    const { nameY, roleBadgeY, roleBadgeHeight, taglineY } = layout.identity;

    // Builder Full Name
    ctx.fillStyle = theme.textColor;
    ctx.font = '900 52px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((builderDetails.fullName || 'HACKER ALIAS').toUpperCase(), layout.canvasWidth / 2, nameY);

    // Role Badge Box
    const roleText = (builderDetails.role || 'Full Stack Developer').toUpperCase();
    ctx.font = '800 24px "JetBrains Mono", monospace';
    const roleMetrics = ctx.measureText(roleText);
    const badgeWidth = roleMetrics.width + 44;
    const badgeX = (layout.canvasWidth - badgeWidth) / 2;

    ctx.fillStyle = theme.roleBadgeBg;
    ctx.fillRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);

    ctx.fillStyle = theme.roleBadgeText;
    ctx.textAlign = 'center';
    ctx.fillText(roleText, layout.canvasWidth / 2, roleBadgeY + 31);

    // Tagline / Motto
    ctx.fillStyle = '#A7F3D0';
    ctx.font = 'italic 24px "Inter", sans-serif';
    ctx.fillText(builderDetails.tagline || '"Building the Future in Public"', layout.canvasWidth / 2, taglineY);

    // QR Footer Block
    if (qrUrl) {
      const { qrX, qrY, qrSize } = layout.qrColumn;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12);
      ctx.strokeStyle = theme.borderColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12);

      try {
        await renderQrToCanvas(ctx, qrUrl, qrX, qrY, qrSize);
      } catch (err) {
        console.warn('QR rendering warning:', err);
      }
    }
  }

  // Bottom Footer Branding
  ctx.fillStyle = '#6EE7B7';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('VERIFIED BUILDER PASSPORT', layout.footer.leftX, layout.footer.y);

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
