/**
 * Pure function that generates a stable, deterministic Builder ID (e.g. HH26-4A8F92C1)
 * from builder identity inputs.
 */
export const generateBuilderId = (
  name: string,
  role: string,
  tagline: string,
  stack?: string
): string => {
  const normalized = `${name.trim().toLowerCase()}:${role.trim().toLowerCase()}:${tagline.trim().toLowerCase()}:${(stack || '').trim().toLowerCase()}`;
  
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0').slice(0, 8);
  return `HH26-${hex}`;
};
