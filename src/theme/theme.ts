export const Theme = {
  colors: {
    goaGreenDark: '#042E1F',
    goaGreen: '#006B3C',
    goaGreenLight: '#00874E',
    emerald: '#00874E',
    neonPink: '#FF0080',
    neonPinkHover: '#E00070',
    sunsetYellow: '#FFD800',
    sunsetOrange: '#F97316',
    sand: '#FFF8E5',
    sandDark: '#FAF0D4',
    ink: '#062319',
    slate: '#062319',
    white: '#FFF8E5',
  },
  typography: {
    fontFamily: {
      sans: "'Plus Jakarta Sans', system-ui, sans-serif",
      heading: "'Fraunces', Georgia, serif",
      display: "'Syne', sans-serif",
      mono: "'Space Mono', monospace",
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
    sm: '2.5px 2.5px 0px 0px #062319',
    md: '4px 4px 0px 0px #062319',
    lg: '6px 6px 0px 0px #062319',
    pink: '4px 4px 0px 0px #FF0080',
    yellow: '4px 4px 0px 0px #FFD800',
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
