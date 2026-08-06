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
    size: number;
    placement: CanvasPlacement | null;
  };
  typography: {
    nameY: number;
    roleBadgeY: number;
    roleBadgeHeight: number;
    taglineY: number;
    techStackY: number;
  };
  footer: {
    y: number;
    hashtagX: number;
    badgeX: number;
  };
}

/**
 * Calculates absolute pixel positions for all visual elements on the 1:1 Builder Card canvas.
 */
export const calculateCardLayout = (
  imageMeta: ImageMetadata | null,
  canvasSize: number = 1080
): CardLayoutRegions => {
  const padding = 48;
  const photoBoxSize = canvasSize - padding * 2 - 220; // 744px on 1080px canvas
  const photoBoxX = (canvasSize - photoBoxSize) / 2;
  const photoBoxY = 124;

  let placement: CanvasPlacement | null = null;
  if (imageMeta) {
    placement = calculateCanvasPlacement(imageMeta.width, imageMeta.height, photoBoxSize);
  }

  const nameY = photoBoxY + photoBoxSize + 56;
  const roleBadgeY = nameY + 24;
  const taglineY = roleBadgeY + 84;
  const techStackY = taglineY + 40;

  return {
    canvasSize,
    padding,
    header: {
      titleX: padding,
      titleY: 72,
      tagX: canvasSize - padding,
      tagY: 72,
      dividerY: 96,
    },
    photoRegion: {
      x: photoBoxX,
      y: photoBoxY,
      size: photoBoxSize,
      placement,
    },
    typography: {
      nameY,
      roleBadgeY,
      roleBadgeHeight: 48,
      taglineY,
      techStackY,
    },
    footer: {
      y: canvasSize - 36,
      hashtagX: padding,
      badgeX: canvasSize - padding,
    },
  };
};
