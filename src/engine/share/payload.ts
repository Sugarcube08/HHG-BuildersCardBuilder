import type { BuilderDetailsFormData } from '../../types/builder';
import type { ImageMetadata } from '../image/aspectRatio';
import { generateBuilderId } from '../qr/builderId';

export interface BuilderPayloadSchema {
  v: 1;
  id: string;
  name: string;
  role: string;
  tagline: string;
  stack: string;
  ts: number;
  src?: string;
  meta?: {
    w: number;
    h: number;
    r: number;
    o: string;
  };
}

/**
 * Creates a versioned BuilderPayloadSchema object from form data.
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
    stack: details.techStack || '',
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
export const encodeBuilderPayload = (payload: BuilderPayloadSchema): string => {
  const jsonStr = JSON.stringify(payload);
  
  if (typeof Buffer !== 'undefined') {
    const base64 = Buffer.from(jsonStr, 'utf-8').toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  const utf8Bytes = new TextEncoder().encode(jsonStr);
  let binary = '';
  utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * Decodes a URL-safe Base64 string back into a JS object.
 * Universal support for Server, Client, and Edge runtimes.
 */
export const decodeBuilderPayload = (encodedStr: string): unknown => {
  try {
    let base64 = encodedStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    if (typeof Buffer !== 'undefined') {
      const jsonStr = Buffer.from(base64, 'base64').toString('utf-8');
      return JSON.parse(jsonStr);
    }

    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const jsonStr = new TextDecoder().decode(bytes);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
};

/**
 * Validates whether an unparsed object conforms to the BuilderPayloadSchema.
 */
export const validatePayload = (data: unknown): BuilderPayloadSchema | null => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const obj = data as Record<string, unknown>;

  if (
    obj.v !== 1 ||
    typeof obj.id !== 'string' ||
    typeof obj.name !== 'string' ||
    typeof obj.role !== 'string' ||
    typeof obj.tagline !== 'string'
  ) {
    return null;
  }

  return {
    v: 1,
    id: obj.id,
    name: obj.name,
    role: obj.role,
    tagline: obj.tagline,
    stack: typeof obj.stack === 'string' ? obj.stack : '',
    ts: typeof obj.ts === 'number' ? obj.ts : Date.now(),
    src: typeof obj.src === 'string' ? obj.src : 'hh-goa-2026',
    meta:
      obj.meta && typeof obj.meta === 'object'
        ? {
            w: Number((obj.meta as any).w) || 400,
            h: Number((obj.meta as any).h) || 400,
            r: Number((obj.meta as any).r) || 1,
            o: String((obj.meta as any).o) || 'square',
          }
        : undefined,
  };
};

/**
 * Gets the current base URL dynamically from the browser/server environment.
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
 * Generates the canonical Builder Public Profile & Share URL.
 * Example: https://your-domain.com/builder/d/<payload>
 */
export const generateBuilderUrl = (
  details: BuilderDetailsFormData,
  imageMeta?: ImageMetadata | null,
  customBaseUrl?: string
): string => {
  const baseUrl = customBaseUrl || getDynamicBaseUrl();
  const payload = createBuilderPayload(details, imageMeta);
  const encoded = encodeBuilderPayload(payload);

  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${cleanBase}builder/d/${encoded}`;
};
