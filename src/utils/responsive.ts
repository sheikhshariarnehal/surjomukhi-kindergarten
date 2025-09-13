// Responsive design utilities and breakpoint management

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Media query helpers
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
  
  // Max width queries
  'max-xs': `(max-width: ${parseInt(breakpoints.sm) - 1}px)`,
  'max-sm': `(max-width: ${parseInt(breakpoints.md) - 1}px)`,
  'max-md': `(max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  'max-lg': `(max-width: ${parseInt(breakpoints.xl) - 1}px)`,
  'max-xl': `(max-width: ${parseInt(breakpoints['2xl']) - 1}px)`,
  
  // Range queries
  'sm-md': `(min-width: ${breakpoints.sm}) and (max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  'md-lg': `(min-width: ${breakpoints.md}) and (max-width: ${parseInt(breakpoints.xl) - 1}px)`,
  'lg-xl': `(min-width: ${breakpoints.lg}) and (max-width: ${parseInt(breakpoints['2xl']) - 1}px)`,
  
  // Device-specific
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  
  // Orientation
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  
  // High DPI
  retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
} as const;

// Hook for responsive behavior (client-side only)
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Set initial value
    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Responsive value utilities
export type ResponsiveValue<T> = T | {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

export function getResponsiveValue<T>(
  value: ResponsiveValue<T>,
  currentBreakpoint: Breakpoint
): T {
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  const responsiveValue = value as Record<Breakpoint, T>;
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  // Find the closest defined value at or below the current breakpoint
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (responsiveValue[bp] !== undefined) {
      return responsiveValue[bp];
    }
  }

  // Fallback to the first defined value
  for (const bp of breakpointOrder) {
    if (responsiveValue[bp] !== undefined) {
      return responsiveValue[bp];
    }
  }

  throw new Error('No responsive value found');
}

// Container width utilities
export const containerSizes = {
  xs: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// Grid system utilities
export const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12'
} as const;

export const responsiveGridCols = {
  'sm:1': 'sm:grid-cols-1',
  'sm:2': 'sm:grid-cols-2',
  'sm:3': 'sm:grid-cols-3',
  'sm:4': 'sm:grid-cols-4',
  'md:1': 'md:grid-cols-1',
  'md:2': 'md:grid-cols-2',
  'md:3': 'md:grid-cols-3',
  'md:4': 'md:grid-cols-4',
  'lg:1': 'lg:grid-cols-1',
  'lg:2': 'lg:grid-cols-2',
  'lg:3': 'lg:grid-cols-3',
  'lg:4': 'lg:grid-cols-4',
  'xl:1': 'xl:grid-cols-1',
  'xl:2': 'xl:grid-cols-2',
  'xl:3': 'xl:grid-cols-3',
  'xl:4': 'xl:grid-cols-4'
} as const;

// Spacing utilities
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem'
} as const;

// Typography scale
export const typography = {
  xs: { fontSize: '0.75rem', lineHeight: '1rem' },
  sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
  base: { fontSize: '1rem', lineHeight: '1.5rem' },
  lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
  xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
  '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
  '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
  '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
  '5xl': { fontSize: '3rem', lineHeight: '1' },
  '6xl': { fontSize: '3.75rem', lineHeight: '1' }
} as const;

// Animation utilities
export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  bounceIn: 'animate-bounce-in',
  scaleIn: 'animate-scale-in'
} as const;

// Touch-friendly sizing
export const touchTargets = {
  minimum: '44px', // iOS minimum
  comfortable: '48px', // Material Design
  large: '56px'
} as const;

// Accessibility helpers
export const focusRing = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
export const srOnly = 'sr-only';
export const notSrOnly = 'not-sr-only';

// Color contrast utilities (simplified)
export const colorContrast = {
  high: 'text-gray-900',
  medium: 'text-gray-700',
  low: 'text-gray-500'
} as const;

// Responsive image sizes
export const imageSizes = {
  thumbnail: '(max-width: 768px) 100px, 150px',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  hero: '100vw',
  profile: '(max-width: 768px) 80px, 120px'
} as const;

// Export React import for the hook
import React from 'react';
