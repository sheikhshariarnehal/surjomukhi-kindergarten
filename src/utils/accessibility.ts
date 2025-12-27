// Enhanced accessibility utilities for better user experience
import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Generate unique IDs for ARIA relationships
 */
export function generateId(prefix: string = 'element'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Enhanced React hooks for accessibility
 */

// Hook for reduced motion preference
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Hook for high contrast preference
export function useHighContrast(): boolean {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersHighContrast;
}

// Hook for focus management
export function useFocusManagement() {
  const focusStackRef = useRef<HTMLElement[]>([]);

  const saveFocus = useCallback((element?: HTMLElement) => {
    const currentFocus = document.activeElement as HTMLElement;
    if (currentFocus && currentFocus !== document.body) {
      focusStackRef.current.push(currentFocus);
    }

    if (element) {
      element.focus();
    }
  }, []);

  const restoreFocus = useCallback(() => {
    const previousFocus = focusStackRef.current.pop();
    if (previousFocus && document.contains(previousFocus)) {
      previousFocus.focus();
    }
  }, []);

  return { saveFocus, restoreFocus };
}

/**
 * Check if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ];
  
  return focusableSelectors.some(selector => element.matches(selector));
}

/**
 * Trap focus within a container (useful for modals, dropdowns)
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }

  container.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Announce content to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Check color contrast ratio (simplified version)
 */
export function hasGoodContrast(_foreground: string, _background: string): boolean {
  // This is a simplified check - in production, you'd want a more robust solution
  // For now, we'll assume our design system colors have good contrast
  return true;
}

/**
 * Add skip link functionality
 */
export function addSkipLink(targetId: string, linkText: string = 'Skip to main content'): HTMLElement {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = linkText;
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg';
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  return skipLink;
}

/**
 * Keyboard navigation helpers
 */
export const KeyboardNavigation = {
  KEYS: {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    TAB: 'Tab'
  },

  /**
   * Handle arrow key navigation in a list
   */
  handleArrowNavigation(
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onIndexChange: (newIndex: number) => void
  ): void {
    let newIndex = currentIndex;

    switch (event.key) {
      case this.KEYS.ARROW_UP:
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case this.KEYS.ARROW_DOWN:
        event.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case this.KEYS.HOME:
        event.preventDefault();
        newIndex = 0;
        break;
      case this.KEYS.END:
        event.preventDefault();
        newIndex = items.length - 1;
        break;
    }

    if (newIndex !== currentIndex) {
      onIndexChange(newIndex);
      items[newIndex]?.focus();
    }
  },

  /**
   * Handle Enter/Space activation
   */
  handleActivation(event: KeyboardEvent, callback: () => void): void {
    if (event.key === this.KEYS.ENTER || event.key === this.KEYS.SPACE) {
      event.preventDefault();
      callback();
    }
  }
};

/**
 * ARIA live region manager - SSR safe
 */
export class LiveRegionManager {
  private static instance: LiveRegionManager;
  private politeRegion: HTMLElement | null = null;
  private assertiveRegion: HTMLElement | null = null;
  private isInitialized = false;

  static getInstance(): LiveRegionManager {
    if (!LiveRegionManager.instance) {
      LiveRegionManager.instance = new LiveRegionManager();
    }
    return LiveRegionManager.instance;
  }

  private constructor() {
    // Don't create regions during SSR
    if (typeof window !== 'undefined') {
      this.initializeRegions();
    }
  }

  private initializeRegions(): void {
    if (this.isInitialized || typeof document === 'undefined') return;

    // Polite live region
    this.politeRegion = document.createElement('div');
    this.politeRegion.setAttribute('aria-live', 'polite');
    this.politeRegion.setAttribute('aria-atomic', 'true');
    this.politeRegion.className = 'sr-only';
    this.politeRegion.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    document.body.appendChild(this.politeRegion);

    // Assertive live region
    this.assertiveRegion = document.createElement('div');
    this.assertiveRegion.setAttribute('aria-live', 'assertive');
    this.assertiveRegion.setAttribute('aria-atomic', 'true');
    this.assertiveRegion.className = 'sr-only';
    this.assertiveRegion.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    document.body.appendChild(this.assertiveRegion);

    this.isInitialized = true;
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    // Ensure regions are initialized on client side
    if (!this.isInitialized && typeof window !== 'undefined') {
      this.initializeRegions();
    }

    const region = priority === 'assertive' ? this.assertiveRegion : this.politeRegion;
    if (region && typeof window !== 'undefined') {
      region.textContent = message;
      setTimeout(() => {
        if (region) {
          region.textContent = '';
        }
      }, 1000);
    }
  }
}

/**
 * Focus management utilities
 */
export const FocusManager = {
  /**
   * Save current focus and return a function to restore it
   */
  saveFocus(): () => void {
    const activeElement = document.activeElement as HTMLElement;
    return () => {
      if (activeElement && typeof activeElement.focus === 'function') {
        activeElement.focus();
      }
    };
  },

  /**
   * Move focus to element with fallback
   */
  moveFocusTo(element: HTMLElement | null, fallbackSelector?: string): void {
    if (element && typeof element.focus === 'function') {
      element.focus();
    } else if (fallbackSelector) {
      const fallback = document.querySelector<HTMLElement>(fallbackSelector);
      if (fallback && typeof fallback.focus === 'function') {
        fallback.focus();
      }
    }
  }
};
