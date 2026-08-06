import type { BuilderDetailsFormData } from '../../types/builder';
import type { ImageMetadata } from '../image/aspectRatio';
import { generateBuilderId } from './builderId';
import type { BuilderPayloadSchema } from './validation';

/**
 * Pure function that serializes builder data into a compact Builder Payload object.
 */
export const createBuilderPayload = (
  details: BuilderDetailsFormData,
  imageMeta?: ImageMetadata | null
): BuilderPayloadSchema => {
  const id = generateBuilderId(details.fullName, details.role, details.tagline, details.techStack);

  const payload: BuilderPayloadSchema = {
    v: 1,
    id,
    name: details.fullName,
    role: details.role,
    tagline: details.tagline,
    stack: details.techStack,
    ts: Date.now(),
    src: 'hh-goa-2026',
  };

  if (imageMeta) {
    payload.meta = {
      w: imageMeta.width,
      h: imageMeta.height,
      r: imageMeta.ratio,
      o: imageMeta.orientation,
    };
  }

  return payload;
};

/**
 * Encodes a BuilderPayloadSchema object to a URL-safe Base64 string.
 */
export const encodePayloadToBase64 = (payload: BuilderPayloadSchema): string => {
  const jsonStr = JSON.stringify(payload);
  const utf8Bytes = new TextEncoder().encode(jsonStr);
  let binary = '';
  utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary);
  // Convert standard Base64 to URL-safe Base64 (RFC 4648)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * Gets the current base URL dynamically from the browser environment,
 * supporting Vercel, Netlify, GitHub Pages, or custom domain deployments.
 */
export const getDynamicBaseUrl = (): string => {
  const envUrl = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_URL : undefined;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    let clean = envUrl.trim();
    if (!clean.endsWith('/')) clean += '/';
    return clean;
  }

  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    return origin.endsWith('/') ? origin : `${origin}/`;
  }

  return 'https://hackerhousegoa2026.dev/';
};

/**
 * Generates the canonical Builder Public Profile & Restoration Share URL.
 * Example: https://hhgoa.vercel.app/builder/HH26-4A8F92C1?builder=<base64>
 */
export const generateBuilderUrl = (
  details: BuilderDetailsFormData,
  imageMeta?: ImageMetadata | null,
  customBaseUrl?: string
): string => {
  const baseUrl = customBaseUrl || getDynamicBaseUrl();
  const payload = createBuilderPayload(details, imageMeta);
  const encoded = encodePayloadToBase64(payload);

  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${cleanBase}builder/${payload.id}?builder=${encoded}`;
};
