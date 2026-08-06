import type { CanvasPlacement, ImageMetadata } from '../image/aspectRatio';
import { calculateCanvasPlacement } from '../image/aspectRatio';

export interface CardLayoutRegions {
  canvasSize: number;
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
  };
  builderIdBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  qrBlock: {
    x: number;
    y: number;
    qrSize: number;
    boxWidth: number;
    boxHeight: number;
    captionY: number;
  };
  footer: {
    y: number;
    leftX: number;
    rightX: number;
  };
}

/**
 * Calculates absolute pixel positions for the Digital Passport Card layout on a 1:1 Canvas.
 */
export const calculateCardLayout = (
  imageMeta: ImageMetadata | null,
  canvasSize: number = 1080
): CardLayoutRegions => {
  const padding = 48;
  const photoWidth = 520;
  const photoHeight = 440;
  const photoX = (canvasSize - photoWidth) / 2;
  const photoY = 116;

  let placement: CanvasPlacement | null = null;
  if (imageMeta) {
    placement = calculateCanvasPlacement(imageMeta.width, imageMeta.height, photoHeight);
  }

  const nameY = photoY + photoHeight + 52;
  const roleBadgeY = nameY + 22;
  const taglineY = roleBadgeY + 76;

  const builderIdBoxY = taglineY + 36;
  const builderIdBoxWidth = 320;
  const builderIdBoxHeight = 44;
  const builderIdBoxX = (canvasSize - builderIdBoxWidth) / 2;

  const qrBlockSize = 110;
  const qrBoxWidth = canvasSize - padding * 2;
  const qrBoxHeight = 124;
  const qrBlockY = builderIdBoxY + builderIdBoxHeight + 28;

  return {
    canvasSize,
    padding,
    header: {
      titleX: padding,
      titleY: 68,
      tagX: canvasSize - padding,
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
      nameY,
      roleBadgeY,
      roleBadgeHeight: 44,
      taglineY,
    },
    builderIdBox: {
      x: builderIdBoxX,
      y: builderIdBoxY,
      width: builderIdBoxWidth,
      height: builderIdBoxHeight,
    },
    qrBlock: {
      x: padding,
      y: qrBlockY,
      qrSize: qrBlockSize,
      boxWidth: qrBoxWidth,
      boxHeight: qrBoxHeight,
      captionY: qrBlockY + 40,
    },
    footer: {
      y: canvasSize - 32,
      leftX: padding,
      rightX: canvasSize - padding,
    },
  };
};
