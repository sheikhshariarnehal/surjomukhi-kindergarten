// Navigation performance optimization utilities

import { useCallback, useEffect, useRef, useState } from 'react';

// Debounce hook for performance optimization
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Throttle hook for scroll events
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const throttleRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    ((...args) => {
      if (!throttleRef.current) {
        callbackRef.current(...args);
        throttleRef.current = setTimeout(() => {
          throttleRef.current = undefined;
        }, delay);
      }
    }) as T,
    [delay]
  );
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  try {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Preload logo
    const logoLink = document.createElement('link');
    logoLink.rel = 'preload';
    logoLink.href = '/logo.webp';
    logoLink.as = 'image';
    document.head.appendChild(logoLink);
  } catch (error) {
    console.warn('Failed to preload critical resources:', error);
  }
}

// Optimize images with lazy loading
export function optimizeImage(src: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
}) {
  const { width, height, quality = 75 } = options || {};
  
  // For Next.js Image optimization
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  
  return `${src}?${params.toString()}`;
}

// Memory management for large lists
export function useVirtualization<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;
  
  return {
    visibleItems,
    offsetY,
    totalHeight: items.length * itemHeight,
    setScrollTop,
  };
}

// Performance monitoring
export class NavigationPerformanceMonitor {
  private static instance: NavigationPerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  
  static getInstance(): NavigationPerformanceMonitor {
    if (!NavigationPerformanceMonitor.instance) {
      NavigationPerformanceMonitor.instance = new NavigationPerformanceMonitor();
    }
    return NavigationPerformanceMonitor.instance;
  }
  
  startTiming(label: string): void {
    this.metrics.set(label, performance.now());
  }
  
  endTiming(label: string): number {
    const startTime = this.metrics.get(label);
    if (!startTime) return 0;
    
    const duration = performance.now() - startTime;
    this.metrics.delete(label);
    
    // Log slow operations in development
    if (process.env.NODE_ENV === 'development' && duration > 16) {
      console.warn(`Slow navigation operation: ${label} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }
  
  measureRender<T extends (...args: any[]) => any>(
    fn: T,
    label: string
  ): T {
    return ((...args: any[]) => {
      this.startTiming(label);
      const result = fn(...args);
      this.endTiming(label);
      return result;
    }) as T;
  }
}

// Service Worker registration for caching
export function registerServiceWorker() {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production'
  ) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// Critical CSS inlining
export function inlineCriticalCSS() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  try {
    const criticalCSS = `
      /* Critical navigation styles */
      .navbar-critical {
        position: sticky;
        top: 0;
        z-index: 50;
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .mobile-menu-critical {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: white;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }

      .mobile-menu-open {
        transform: translateX(0);
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  } catch (error) {
    console.warn('Failed to inline critical CSS:', error);
  }
}

// Resource hints for better performance
export function addResourceHints() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  try {
    // DNS prefetch for external resources
    const dnsPrefetch = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to critical origins
    const preconnect = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    preconnect.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  } catch (error) {
    console.warn('Failed to add resource hints:', error);
  }
}

// Initialize performance optimizations
export function initializeNavigationPerformance() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  try {
    // Run optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalResources();
        addResourceHints();
        inlineCriticalCSS();
        registerServiceWorker();
      });
    } else {
      preloadCriticalResources();
      addResourceHints();
      inlineCriticalCSS();
      registerServiceWorker();
    }
  } catch (error) {
    console.warn('Failed to initialize navigation performance:', error);
  }
}

// Export performance monitor instance
export const performanceMonitor = NavigationPerformanceMonitor.getInstance();
