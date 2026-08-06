import { validateBuilderPayload, type BuilderPayloadSchema } from './validation';

/**
 * Decodes a URL-safe Base64 string back into a JS object.
 * Supports universal decoding across Browser, Node.js, and Vercel Edge Runtimes.
 */
export const decodeBase64ToPayload = (base64UrlSafeStr: string): unknown => {
  try {
    // Revert URL-safe Base64 to standard Base64
    let base64 = base64UrlSafeStr.replace(/-/g, '+').replace(/_/g, '/');
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
 * Parses query parameters from window location search (e.g. "?builder=...") and decodes valid Builder Payload.
 * Returns null if query param missing or payload is corrupted.
 */
export const parseBuilderUrlParam = (searchString: string = window.location.search): BuilderPayloadSchema | null => {
  try {
    const params = new URLSearchParams(searchString);
    const rawParam = params.get('builder');

    if (!rawParam) {
      return null;
    }

    const unparsed = decodeBase64ToPayload(rawParam);
    return validateBuilderPayload(unparsed);
  } catch {
    return null;
  }
};
