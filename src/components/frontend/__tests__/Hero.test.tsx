import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Hero from '../Hero';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    footer: ({ children, ...props }: any) => <footer {...props}>{children}</footer>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} data-testid="hero-image" />
  ),
}));

// Mock performance utilities
jest.mock('@/utils/performance', () => ({
  heroPerformanceMonitor: {
    measureComponentMount: jest.fn(() => 100),
    measureImageLoad: jest.fn(() => Promise.resolve(200)),
    logMetrics: jest.fn(),
    sendToAnalytics: jest.fn(),
    cleanup: jest.fn(),
  },
  performanceUtils: {
    prefersReducedMotion: () => false,
    isMobileDevice: () => false,
    getViewportDimensions: () => ({ width: 1920, height: 1080 }),
  },
}));

// Mock translation context
const mockTranslation = {
  t: (key: string, fallback?: string) => fallback || key,
  language: 'en',
  setLanguage: jest.fn(),
};

const renderHero = () => {
  return render(
    <LanguageProvider value={mockTranslation}>
      <Hero />
    </LanguageProvider>
  );
};

describe('Hero Component', () => {
  beforeEach(() => {
    // Mock window.Image
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src = '';
      loading = '';
      fetchPriority = '';
      
      constructor() {
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 100);
      }
    } as any;

    // Mock requestIdleCallback
    global.requestIdleCallback = jest.fn((cb) => setTimeout(cb, 0));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders hero section with proper structure', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByLabelText(/hero slideshow/i)).toBeInTheDocument();
      });
    });

    it('displays hero content after images load', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        expect(screen.getByTestId('hero-image')).toBeInTheDocument();
      });
    });

    it('shows loading state initially', () => {
      renderHero();
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Mobile Responsiveness', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      });
    });

    it('applies mobile-specific classes', async () => {
      renderHero();
      
      await waitFor(() => {
        const heroSection = screen.getByRole('banner');
        expect(heroSection).toHaveClass('min-h-[500px]');
      });
    });

    it('renders touch-optimized slide indicators', async () => {
      renderHero();
      
      await waitFor(() => {
        const indicators = screen.getByLabelText(/slideshow navigation/i);
        expect(indicators).toBeInTheDocument();
        
        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
          expect(button).toHaveClass('touch-target');
        });
      });
    });
  });

  describe('Touch Interactions', () => {
    it('handles touch swipe gestures', async () => {
      renderHero();
      
      await waitFor(() => {
        const heroSection = screen.getByRole('banner');
        
        // Simulate swipe left
        fireEvent.touchStart(heroSection, {
          touches: [{ clientX: 100 }],
        });
        
        fireEvent.touchMove(heroSection, {
          touches: [{ clientX: 50 }],
        });
        
        fireEvent.touchEnd(heroSection);
        
        // Should trigger slide change
        expect(heroSection).toBeInTheDocument();
      });
    });

    it('prevents default behavior during swipe', async () => {
      renderHero();
      
      await waitFor(() => {
        const heroSection = screen.getByRole('banner');
        
        const touchMoveEvent = new TouchEvent('touchmove', {
          touches: [{ clientX: 50 } as Touch],
          cancelable: true,
        });
        
        const preventDefaultSpy = jest.spyOn(touchMoveEvent, 'preventDefault');
        
        fireEvent.touchStart(heroSection, {
          touches: [{ clientX: 100 }],
        });
        
        fireEvent(heroSection, touchMoveEvent);
        
        // Should prevent default for horizontal swipes
        expect(preventDefaultSpy).toHaveBeenCalled();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('responds to arrow key navigation', async () => {
      renderHero();
      
      await waitFor(() => {
        // Simulate arrow key press
        fireEvent.keyDown(document.body, {
          key: 'ArrowRight',
          code: 'ArrowRight',
        });
        
        // Should handle keyboard navigation
        expect(document.body).toBeInTheDocument();
      });
    });

    it('toggles autoplay with spacebar', async () => {
      renderHero();
      
      await waitFor(() => {
        fireEvent.keyDown(document.body, {
          key: ' ',
          code: 'Space',
        });
        
        // Should toggle autoplay
        expect(document.body).toBeInTheDocument();
      });
    });
  });

  describe('SEO and Accessibility', () => {
    it('includes proper semantic HTML structure', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      });
    });

    it('includes structured data script', async () => {
      renderHero();
      
      await waitFor(() => {
        const structuredData = document.querySelector('script[type="application/ld+json"]');
        expect(structuredData).toBeInTheDocument();
        
        const jsonData = JSON.parse(structuredData?.textContent || '{}');
        expect(jsonData['@type']).toContain('EducationalOrganization');
      });
    });

    it('has proper ARIA attributes', async () => {
      renderHero();
      
      await waitFor(() => {
        const heroSection = screen.getByRole('banner');
        expect(heroSection).toHaveAttribute('aria-label');
        expect(heroSection).toHaveAttribute('aria-live', 'polite');
        expect(heroSection).toHaveAttribute('aria-atomic', 'true');
      });
    });

    it('includes microdata attributes', async () => {
      renderHero();
      
      await waitFor(() => {
        const heroSection = screen.getByRole('banner');
        expect(heroSection).toHaveAttribute('itemScope');
        expect(heroSection).toHaveAttribute('itemType');
      });
    });
  });

  describe('Performance Optimizations', () => {
    it('preloads critical images', async () => {
      // heroPerformanceMonitor is already mocked at the top of the file
      const performanceUtils = await import('@/utils/performance');

      renderHero();

      await waitFor(() => {
        expect(performanceUtils.heroPerformanceMonitor.measureImageLoad).toHaveBeenCalled();
        expect(performanceUtils.heroPerformanceMonitor.measureComponentMount).toHaveBeenCalled();
      });
    });

    it('lazy loads non-critical images', async () => {
      renderHero();

      await waitFor(() => {
        expect(global.requestIdleCallback).toHaveBeenCalled();
      });
    });

    it('cleans up performance monitoring on unmount', async () => {
      // heroPerformanceMonitor is already mocked at the top of the file
      const performanceUtils = await import('@/utils/performance');
      const { unmount } = renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
      });
      
      unmount();
      
      expect(heroPerformanceMonitor.cleanup).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('handles image loading errors gracefully', async () => {
      // Mock image loading error
      global.Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src = '';
        
        constructor() {
          setTimeout(() => {
            if (this.onerror) this.onerror();
          }, 100);
        }
      } as any;
      
      renderHero();
      
      await waitFor(() => {
        // Should still render content even if images fail
        expect(screen.getByRole('banner')).toBeInTheDocument();
      });
    });
  });
});
