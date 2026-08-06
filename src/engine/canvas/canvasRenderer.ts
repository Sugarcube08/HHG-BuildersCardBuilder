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
}

/**
 * Pure function that composes a high-res CR80 Portrait Digital Builder Passport (1080x1440)
 * onto an HTML5 Canvas using the Layout Engine, Card Composer, and QR Engine.
 */
export const composeBuilderCard = async (
  params: ComposeCardParams
): Promise<{ blob: Blob; dataUrl: string }> => {
  const { imageElement, imageMeta, builderDetails, qrUrl } = params;
  const theme = getCardTheme(builderDetails.role);
  const canvasWidth = 1080;
  const canvasHeight = 1440;
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

  // 1. Canvas Background (Deep Goa Green)
  ctx.fillStyle = theme.bgColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Outer Framing Border
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, canvasWidth - 16, canvasHeight - 16);

  // 2. Section 1: Header (~10%)
  ctx.fillStyle = theme.textColor;
  ctx.font = '900 38px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE GOA 2026', layout.header.titleX, layout.header.titleY);

  ctx.fillStyle = theme.accentColor;
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('#FrameInGoa', layout.header.tagX, layout.header.tagY);

  // Header Divider Line
  ctx.beginPath();
  ctx.moveTo(layout.header.titleX, layout.header.dividerY);
  ctx.lineTo(layout.header.tagX, layout.header.dividerY);
  ctx.strokeStyle = theme.accentColor;
  ctx.lineWidth = 4;
  ctx.stroke();

  // 3. Section 2: Photo Zone (~38%)
  const { x: px, y: py, width: pW, height: pH, placement } = layout.photoRegion;

  // Photo Container Shadow Card
  ctx.fillStyle = '#07281E';
  ctx.fillRect(px + 8, py + 8, pW, pH); // pop shadow
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

  // 4. Section 3: Identity Zone (~27%)
  const { nameY, roleBadgeY, roleBadgeHeight, taglineY, techStackY, builderIdY } = layout.identity;

  // Builder Full Name
  ctx.fillStyle = theme.textColor;
  ctx.font = '900 52px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((builderDetails.fullName || 'HACKER ALIAS').toUpperCase(), canvasWidth / 2, nameY);

  // Role Badge Box (Role-Personalized Accent Color)
  const roleText = (builderDetails.role || 'Full Stack Developer').toUpperCase();
  ctx.font = '800 24px "JetBrains Mono", monospace';
  const roleMetrics = ctx.measureText(roleText);
  const badgeWidth = roleMetrics.width + 44;
  const badgeX = (canvasWidth - badgeWidth) / 2;

  ctx.fillStyle = theme.roleBadgeBg;
  ctx.fillRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(badgeX, roleBadgeY, badgeWidth, roleBadgeHeight);

  ctx.fillStyle = theme.roleBadgeText;
  ctx.textAlign = 'center';
  ctx.fillText(roleText, canvasWidth / 2, roleBadgeY + 31);

  // Tagline / Motto
  ctx.fillStyle = '#A7F3D0';
  ctx.font = 'italic 26px "Inter", sans-serif';
  ctx.fillText(builderDetails.tagline || '"Building the Future in Public"', canvasWidth / 2, taglineY);

  // Primary Tech Stack
  if (builderDetails.techStack) {
    ctx.fillStyle = '#6EE7B7';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText(`STACK: ${builderDetails.techStack}`, canvasWidth / 2, techStackY);
  }

  // Builder ID Monospace Badge
  ctx.fillStyle = '#10B981';
  ctx.font = '800 22px "JetBrains Mono", monospace';
  ctx.fillText(`BUILDER ID: ${builderId}`, canvasWidth / 2, builderIdY);

  // 5. Section 4: QR Security Panel (~20%)
  const { x: qX, y: qY, width: qW, height: qH, qrX, qrY, qrSize, textX, titleY, subtitleY, urlY } = layout.qrSecurityPanel;

  // Credential Security Panel Card (White Background)
  ctx.fillStyle = '#FAF7F2';
  ctx.fillRect(qX, qY, qW, qH);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 5;
  ctx.strokeRect(qX, qY, qW, qH);

  // QR Code Frame
  if (qrUrl) {
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

  // Credential Panel Security Text
  ctx.textAlign = 'left';

  ctx.fillStyle = '#0F172A';
  ctx.font = '900 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✓ VERIFY BUILDER IDENTITY', textX, titleY);

  ctx.fillStyle = '#475569';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('OFFICIAL DIGITAL PASSPORT', textX, subtitleY);

  ctx.fillStyle = theme.accentColor;
  ctx.font = '800 18px "JetBrains Mono", monospace';
  ctx.fillText(`CREDENTIAL: ${builderId}`, textX, urlY);

  // 6. Section 5: Footer (~5%)
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
