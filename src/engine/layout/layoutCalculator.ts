import type { CanvasPlacement, ImageMetadata } from '../image/aspectRatio';
import { calculateCanvasPlacement } from '../image/aspectRatio';

export interface CardLayoutRegions {
  canvasWidth: number;
  canvasHeight: number;
  padding: number;
  header: {
    titleX: number;
    titleY: number;
    tagX: number;
    tagY: number;
    dividerY: number;
  };
  photoRegion: {
    x: number;
    y: number;
    width: number;
    height: number;
    placement: CanvasPlacement | null;
  };
  identity: {
    nameY: number;
    roleBadgeY: number;
    roleBadgeHeight: number;
    taglineY: number;
    techStackY: number;
    builderIdY: number;
  };
  qrSecurityPanel: {
    x: number;
    y: number;
    width: number;
    height: number;
    qrX: number;
    qrY: number;
    qrSize: number;
    textX: number;
    titleY: number;
    subtitleY: number;
    urlY: number;
  };
  footer: {
    y: number;
    leftX: number;
    rightX: number;
  };
}

/**
 * Calculates absolute pixel positions for the CR80 Portrait Builder Passport (1080x1440 canvas).
 */
export const calculateCardLayout = (
  imageMeta: ImageMetadata | null,
  canvasWidth: number = 1080,
  canvasHeight: number = 1440
): CardLayoutRegions => {
  const padding = 52;

  // 1. Header Zone (~10% -> 120px)
  const headerTitleY = 72;
  const headerTagY = 72;
  const headerDividerY = 104;

  // 2. Photo Zone (~38% -> 520px)
  const photoWidth = 620;
  const photoHeight = 480;
  const photoX = (canvasWidth - photoWidth) / 2;
  const photoY = 132;

  let placement: CanvasPlacement | null = null;
  if (imageMeta) {
    placement = calculateCanvasPlacement(imageMeta.width, imageMeta.height, photoHeight);
  }

  // 3. Identity Zone (~27% -> 380px)
  const nameY = photoY + photoHeight + 64;
  const roleBadgeY = nameY + 24;
  const taglineY = roleBadgeY + 76;
  const techStackY = taglineY + 44;
  const builderIdY = techStackY + 44;

  // 4. QR Security Panel (~20% -> 260px)
  const panelWidth = canvasWidth - padding * 2;
  const panelHeight = 220;
  const panelX = padding;
  const panelY = canvasHeight - padding - panelHeight - 64;

  const qrSize = 160;
  const qrX = panelX + 28;
  const qrY = panelY + (panelHeight - qrSize) / 2;
  const textX = qrX + qrSize + 28;

  return {
    canvasWidth,
    canvasHeight,
    padding,
    header: {
      titleX: padding,
      titleY: headerTitleY,
      tagX: canvasWidth - padding,
      tagY: headerTagY,
      dividerY: headerDividerY,
    },
    photoRegion: {
      x: photoX,
      y: photoY,
      width: photoWidth,
      height: photoHeight,
      placement,
    },
    identity: {
      nameY,
      roleBadgeY,
      roleBadgeHeight: 44,
      taglineY,
      techStackY,
      builderIdY,
    },
    qrSecurityPanel: {
      x: panelX,
      y: panelY,
      width: panelWidth,
      height: panelHeight,
      qrX,
      qrY,
      qrSize,
      textX,
      titleY: panelY + 54,
      subtitleY: panelY + 92,
      urlY: panelY + 130,
    },
    footer: {
      y: canvasHeight - 36,
      leftX: padding,
      rightX: canvasWidth - padding,
    },
  };
};
