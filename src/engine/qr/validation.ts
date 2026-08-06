export interface BuilderPayloadSchema {
  v: number;
  id: string;
  name: string;
  role: string;
  tagline: string;
  stack?: string;
  meta?: {
    w: number;
    h: number;
    r: number;
    o: 'square' | 'portrait' | 'landscape';
  };
  ts: number;
  src: string;
}

/**
 * Defensive validation function verifying payload structure, types, and version compatibility.
 * Returns null for any malformed or corrupted inputs without crashing.
 */
export const validateBuilderPayload = (payload: unknown): BuilderPayloadSchema | null => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const p = payload as Record<string, unknown>;

  // Check version & source
  if (p.v !== 1 || p.src !== 'hh-goa-2026') {
    return null;
  }

  // Required string fields
  if (
    typeof p.id !== 'string' ||
    typeof p.name !== 'string' ||
    typeof p.role !== 'string' ||
    typeof p.tagline !== 'string'
  ) {
    return null;
  }

  // Ensure minimum field lengths
  if (p.name.trim().length === 0 || p.role.trim().length === 0) {
    return null;
  }

  const validated: BuilderPayloadSchema = {
    v: 1,
    id: p.id.trim(),
    name: p.name.trim(),
    role: p.role.trim(),
    tagline: p.tagline.trim(),
    stack: typeof p.stack === 'string' ? p.stack.trim() : undefined,
    ts: typeof p.ts === 'number' ? p.ts : Date.now(),
    src: 'hh-goa-2026',
  };

  // Optional image metadata validation
  if (p.meta && typeof p.meta === 'object') {
    const m = p.meta as Record<string, unknown>;
    if (
      typeof m.w === 'number' &&
      typeof m.h === 'number' &&
      typeof m.r === 'number' &&
      (m.o === 'square' || m.o === 'portrait' || m.o === 'landscape')
    ) {
      validated.meta = {
        w: m.w,
        h: m.h,
        r: m.r,
        o: m.o,
      };
    }
  }

  return validated;
};
