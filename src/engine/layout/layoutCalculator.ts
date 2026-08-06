import type { CanvasPlacement, ImageMetadata } from '../image/aspectRatio';
import { calculateCanvasPlacement } from '../image/aspectRatio';
import type { CardFormat } from '../../types/builder';

export interface PassportLayoutRegions {
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
    x: number;
    nameY: number;
    roleBadgeY: number;
    roleBadgeHeight: number;
    taglineY: number;
    techStackY: number;
    builderIdY: number;
  };
  qrColumn: {
    x: number;
    y: number;
    width: number;
    height: number;
    qrX: number;
    qrY: number;
    qrSize: number;
    captionY: number;
  };
  footer: {
    y: number;
    leftX: number;
    rightX: number;
  };
}

/**
 * Calculates absolute pixel positions for the 16:9 Builder Passport (1600x900) or 1:1 Badge (1080x1080).
 */
export const calculateCardLayout = (
  imageMeta: ImageMetadata | null,
  format: CardFormat = 'passport'
): PassportLayoutRegions => {
  if (format === 'badge') {
    // 1:1 Avatar Badge Layout (1080x1080)
    const canvasWidth = 1080;
    const canvasHeight = 1080;
    const padding = 48;
    const photoWidth = 520;
    const photoHeight = 440;
    const photoX = (canvasWidth - photoWidth) / 2;
    const photoY = 116;

    let placement: CanvasPlacement | null = null;
    if (imageMeta) {
      placement = calculateCanvasPlacement(imageMeta.width, imageMeta.height, photoHeight);
    }

    return {
      canvasWidth,
      canvasHeight,
      padding,
      header: {
        titleX: padding,
        titleY: 68,
        tagX: canvasWidth - padding,
        tagY: 68,
        dividerY: 92,
      },
      photoRegion: {
        x: photoX,
        y: photoY,
        width: photoWidth,
        height: photoHeight,
        placement,
      },
      identity: {
        x: padding,
        nameY: photoY + photoHeight + 52,
        roleBadgeY: photoY + photoHeight + 74,
        roleBadgeHeight: 44,
        taglineY: photoY + photoHeight + 150,
        techStackY: photoY + photoHeight + 190,
        builderIdY: photoY + photoHeight + 230,
      },
      qrColumn: {
        x: padding,
        y: 840,
        width: canvasWidth - padding * 2,
        height: 120,
        qrX: padding + 16,
        qrY: 852,
        qrSize: 96,
        captionY: 890,
      },
      footer: {
        y: canvasHeight - 32,
        leftX: padding,
        rightX: canvasWidth - padding,
      },
    };
  }

  // 16:9 Landscape Builder Passport Layout (1600x900)
  const canvasWidth = 1600;
  const canvasHeight = 900;
  const padding = 56;

  // Left Column Photo Container
  const photoWidth = 380;
  const photoHeight = 460;
  const photoX = padding;
  const photoY = 140;

  let placement: CanvasPlacement | null = null;
  if (imageMeta) {
    placement = calculateCanvasPlacement(imageMeta.width, imageMeta.height, photoHeight);
  }

  // Middle Column Identity
  const identityX = photoX + photoWidth + 48;

  // Right Column QR Block
  const qrBoxWidth = 440;
  const qrBoxHeight = 580;
  const qrBoxX = canvasWidth - padding - qrBoxWidth;
  const qrBoxY = 140;
  const qrSize = 240;
  const qrX = qrBoxX + (qrBoxWidth - qrSize) / 2;
  const qrY = qrBoxY + 36;

  return {
    canvasWidth,
    canvasHeight,
    padding,
    header: {
      titleX: padding,
      titleY: 76,
      tagX: canvasWidth - padding,
      tagY: 76,
      dividerY: 104,
    },
    photoRegion: {
      x: photoX,
      y: photoY,
      width: photoWidth,
      height: photoHeight,
      placement,
    },
    identity: {
      x: identityX,
      nameY: 190,
      roleBadgeY: 230,
      roleBadgeHeight: 48,
      taglineY: 330,
      techStackY: 390,
      builderIdY: 480,
    },
    qrColumn: {
      x: qrBoxX,
      y: qrBoxY,
      width: qrBoxWidth,
      height: qrBoxHeight,
      qrX,
      qrY,
      qrSize,
      captionY: qrY + qrSize + 48,
    },
    footer: {
      y: canvasHeight - 44,
      leftX: padding,
      rightX: canvasWidth - padding,
    },
  };
};
