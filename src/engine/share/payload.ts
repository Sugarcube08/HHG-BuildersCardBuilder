import type { BuilderDetailsFormData } from '../../types/builder';
import type { ImageMetadata } from '../image/aspectRatio';
import { generateBuilderId } from '../qr/builderId';

export interface BuilderPayloadSchema {
  v: 1;
  i: string; // id
  n: string; // name
  r: string; // role
  g: string; // tagline
  s: string; // stack
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
 * Creates a compact, minified BuilderPayloadSchema object from form data.
 */
export const createBuilderPayload = (
  details: BuilderDetailsFormData,
  imageMeta?: ImageMetadata | null
): BuilderPayloadSchema => {
  const id = generateBuilderId(details.fullName, details.role, details.tagline, details.techStack);

  const payload: BuilderPayloadSchema = {
    v: 1,
    i: id,
    n: details.fullName,
    r: details.role,
    g: details.tagline,
    s: details.techStack || '',
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
 * Handles both minified schema (i, n, r, g, s) and legacy schema (id, name, role, tagline, stack).
 */
export const validatePayload = (data: unknown): {
  v: 1;
  id: string;
  name: string;
  role: string;
  tagline: string;
  stack: string;
  ts: number;
  meta?: { w: number; h: number; r: number; o: string };
} | null => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const obj = data as Record<string, unknown>;

  const id = (obj.i || obj.id) as string;
  const name = (obj.n || obj.name) as string;
  const role = (obj.r || obj.role) as string;
  const tagline = (obj.g || obj.tagline) as string;
  const stack = (obj.s || obj.stack) as string;

  if (!id || !name || !role || !tagline) {
    return null;
  }

  return {
    v: 1,
    id,
    name,
    role,
    tagline,
    stack: stack || '',
    ts: typeof obj.ts === 'number' ? obj.ts : Date.now(),
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
  if (typeof process !== 'undefined' && process.env) {
    const rawEnv =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_URL ||
      (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : undefined) ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

    if (rawEnv && typeof rawEnv === 'string' && rawEnv.trim().length > 0) {
      let clean = rawEnv.trim();
      if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
        clean = `https://${clean}`;
      }
      if (!clean.endsWith('/')) clean += '/';
      return clean;
    }
  }

  if (typeof window !== 'undefined' && window.location && window.location.origin) {
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
