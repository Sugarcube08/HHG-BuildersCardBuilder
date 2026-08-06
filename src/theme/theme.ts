export const Theme = {
  colors: {
    goaGreenDark: '#07281E',
    goaGreen: '#0B3B2B',
    goaGreenLight: '#12543E',
    emerald: '#10B981',
    neonPink: '#FF2E93',
    neonPinkHover: '#E01F7D',
    sunsetYellow: '#FFB800',
    sunsetOrange: '#F97316',
    sand: '#FAF7F2',
    sandDark: '#F0EAE1',
    ink: '#0F172A',
    slate: '#1E293B',
    white: '#FFFFFF',
  },
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, sans-serif",
      heading: "'Plus Jakarta Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
  shadows: {
    sm: '2px 2px 0px 0px #0F172A',
    md: '4px 4px 0px 0px #0F172A',
    lg: '6px 6px 0px 0px #0F172A',
    pink: '4px 4px 0px 0px #FF2E93',
    yellow: '4px 4px 0px 0px #FFB800',
  },
  radii: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
} as const;

export type AppTheme = typeof Theme;
