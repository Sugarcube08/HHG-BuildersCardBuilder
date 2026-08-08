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
  scale?: number;
}

/**
 * Ensures custom Web Fonts (Plus Jakarta Sans, Inter, JetBrains Mono) are completely loaded
 * before canvas drawing to prevent font fallback rendering glitches.
 */
export const ensureFontsLoaded = async (): Promise<void> => {
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Proceed gracefully if font loading API fails
    }
  }
};

/**
 * Pure function that composes a high-resolution 2x Retina CR80 Portrait Digital Builder Passport.
 * Waits for fonts, images, and QR generation before exporting PNG Blob and Data URL.
 */
export const composeBuilderCard = async (
  params: ComposeCardParams
): Promise<{ blob: Blob; dataUrl: string }> => {
  const { imageElement, imageMeta, builderDetails, qrUrl, scale = 2 } = params;

  // 1. Wait for Fonts to finish loading
  await ensureFontsLoaded();

  // 2. Wait for Image Element to decode if provided
  if (imageElement && !imageElement.complete) {
    try {
      await imageElement.decode();
    } catch {
      // Fallback if decode API is not supported
    }
  }

  const theme = getCardTheme(builderDetails.role);
  const baseWidth = 1080;
  const baseHeight = 1440;
  
  // 2x Retina Scaling (2160x2880 resolution for ultra-crisp output)
  const canvasWidth = baseWidth * scale;
  const canvasHeight = baseHeight * scale;

  const layout = calculateCardLayout(imageMeta, canvasWidth, canvasHeight);

  const builderId = generateBuilderId(
    builderDetails.fullName,
    builderDetails.role,
    builderDetails.tagline,
    builderDetails.techStack
  );

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2D context from canvas.');
  }

  // Smooth font rendering setup
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Canvas Background (Deep Goa Green)
  ctx.fillStyle = theme.bgColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Outer Framing Border
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 16 * scale;
  ctx.strokeRect(8 * scale, 8 * scale, canvasWidth - 16 * scale, canvasHeight - 16 * scale);

  // 2. Section 1: Header (~10%)
  ctx.fillStyle = theme.textColor;
  ctx.font = `900 ${Math.round(38 * scale)}px "Plus Jakarta Sans", sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE GOA 2026', layout.header.titleX, layout.header.titleY);

  ctx.fillStyle = theme.accentColor;
  ctx.font = `bold ${Math.round(22 * scale)}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'right';
  ctx.fillText('#FrameInGoa', layout.header.tagX, layout.header.tagY);

  // Header Divider Line
  ctx.beginPath();
  ctx.moveTo(layout.header.titleX, layout.header.dividerY);
  ctx.lineTo(layout.header.tagX, layout.header.dividerY);
  ctx.strokeStyle = theme.accentColor;
  ctx.lineWidth = 4 * scale;
  ctx.stroke();

  // 3. Section 2: Photo Zone (~38%)
  const { x: px, y: py, width: pW, height: pH, placement } = layout.photoRegion;

  // Photo Container Shadow Card
  ctx.fillStyle = '#07281E';
  ctx.fillRect(px + 8 * scale, py + 8 * scale, pW, pH); // pop shadow
  ctx.fillRect(px, py, pW, pH);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 6 * scale;
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
  ctx.fillRect(px - 4 * scale, py - 4 * scale, 32 * scale, 8 * scale);
  ctx.fillRect(px - 4 * scale, py - 4 * scale, 8 * scale, 32 * scale);
  ctx.fillRect(px + pW - 28 * scale, py + pH - 4 * scale, 32 * scale, 8 * scale);
  ctx.fillRect(px + pW - 4 * scale, py + pH - 28 * scale, 8 * scale, 32 * scale);

  // 4. Section 3: Identity Zone (~27%)
  const { nameY, roleBadgeY, roleBadgeHeight, taglineY, techStackY, builderIdY } = layout.identity;

  // Builder Full Name
  ctx.fillStyle = theme.textColor;
  ctx.font = `900 ${Math.round(52 * scale)}px "Plus Jakarta Sans", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText((builderDetails.fullName || 'HACKER ALIAS').toUpperCase(), canvasWidth / 2, nameY);

  // Role Badge Box (Role-Personalized Accent Color)
  const roleText = (builderDetails.role || 'Full Stack Developer').toUpperCase();
  ctx.font = `800 ${Math.round(24 * scale)}px "JetBrains Mono", monospace`;
  const roleMetrics = ctx.measureText(roleText);
  const badgeWidth = roleMetrics.width + 44 * scale;
  const badgeX = (canvasWidth - badgeWidth) / 2;

  ctx.fillStyle = theme.roleBadgeBg;
  ctx.fillRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 4 * scale;
  ctx.strokeRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);

  ctx.fillStyle = theme.roleBadgeText;
  ctx.textAlign = 'center';
  ctx.fillText(roleText, canvasWidth / 2, roleBadgeY + 31 * scale);

  // Tagline / Motto
  ctx.fillStyle = '#A7F3D0';
  ctx.font = `italic ${Math.round(26 * scale)}px "Inter", sans-serif`;
  ctx.fillText(builderDetails.tagline || '"Building the Future in Public"', canvasWidth / 2, taglineY);

  // Primary Tech Stack
  if (builderDetails.techStack) {
    ctx.fillStyle = '#6EE7B7';
    ctx.font = `bold ${Math.round(20 * scale)}px "JetBrains Mono", monospace`;
    ctx.fillText(`STACK: ${builderDetails.techStack}`, canvasWidth / 2, techStackY);
  }

  // Builder ID Monospace Badge
  ctx.fillStyle = '#10B981';
  ctx.font = `800 ${Math.round(22 * scale)}px "JetBrains Mono", monospace`;
  ctx.fillText(`BUILDER ID: ${builderId}`, canvasWidth / 2, builderIdY);

  // 5. Section 4: QR Security Panel (~20%)
  const { x: qX, y: qY, width: qW, height: qH, qrX, qrY, qrSize, textX, titleY, subtitleY, urlY } = layout.qrSecurityPanel;

  // Credential Security Panel Card (White Background)
  ctx.fillStyle = '#FAF7F2';
  ctx.fillRect(qX, qY, qW, qH);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 5 * scale;
  ctx.strokeRect(qX, qY, qW, qH);

  // QR Code Frame
  if (qrUrl) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX - 6 * scale, qrY - 6 * scale, qrSize + 12 * scale, qrSize + 12 * scale);
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 3 * scale;
    ctx.strokeRect(qrX - 6 * scale, qrY - 6 * scale, qrSize + 12 * scale, qrSize + 12 * scale);

    try {
      await renderQrToCanvas(ctx, qrUrl, qrX, qrY, qrSize);
    } catch (err) {
      console.warn('QR rendering to canvas warning:', err);
    }
  }

  // Credential Panel Security Text
  ctx.textAlign = 'left';

  ctx.fillStyle = '#0F172A';
  ctx.font = `900 ${Math.round(26 * scale)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('✓ VERIFY BUILDER IDENTITY', textX, titleY);

  ctx.fillStyle = '#475569';
  ctx.font = `bold ${Math.round(18 * scale)}px "JetBrains Mono", monospace`;
  ctx.fillText('OFFICIAL DIGITAL PASSPORT', textX, subtitleY);

  ctx.fillStyle = theme.accentColor;
  ctx.font = `800 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`;
  ctx.fillText(`CREDENTIAL: ${builderId}`, textX, urlY);

  // 6. Section 5: Footer (~5%)
  ctx.fillStyle = '#6EE7B7';
  ctx.font = `bold ${Math.round(18 * scale)}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('VERIFIED BUILDER PASSPORT', layout.footer.leftX, layout.footer.y);

  ctx.textAlign = 'right';
  ctx.fillText('GOA, INDIA • OCTOBER 2026', layout.footer.rightX, layout.footer.y);

  // Export Canvas to Blob & Data URL with memory cleanup
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas export to Blob failed.'));
        return;
      }
      const dataUrl = canvas.toDataURL('image/png', 1.0);

      // Clean up temporary canvas elements to release memory
      canvas.width = 0;
      canvas.height = 0;

      resolve({ blob, dataUrl });
    }, 'image/png', 1.0);
  });
};
