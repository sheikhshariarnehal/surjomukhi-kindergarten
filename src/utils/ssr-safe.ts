// SSR-safe utilities for client-side only operations

/**
 * Check if we're running on the client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if document is available
 */
export const hasDocument = typeof document !== 'undefined';

/**
 * Safely execute client-side only code
 */
export function clientOnly<T>(fn: () => T, fallback?: T): T | undefined {
  if (isClient) {
    try {
      return fn();
    } catch (error) {
      console.warn('Client-only function failed:', error);
      return fallback;
    }
  }
  return fallback;
}

/**
 * Safely access document
 */
export function withDocument<T>(fn: (doc: Document) => T, fallback?: T): T | undefined {
  if (hasDocument) {
    try {
      return fn(document);
    } catch (error) {
      console.warn('Document operation failed:', error);
      return fallback;
    }
  }
  return fallback;
}

/**
 * Safely access window
 */
export function withWindow<T>(fn: (win: Window) => T, fallback?: T): T | undefined {
  if (isClient) {
    try {
      return fn(window);
    } catch (error) {
      console.warn('Window operation failed:', error);
      return fallback;
    }
  }
  return fallback;
}

/**
 * Create a safe event listener that only works on client side
 */
export function safeEventListener(
  target: EventTarget | null,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): () => void {
  if (!isClient || !target) {
    return () => {}; // No-op cleanup function
  }

  try {
    target.addEventListener(event, handler, options);
    return () => {
      target.removeEventListener(event, handler, options);
    };
  } catch (error) {
    console.warn('Failed to add event listener:', error);
    return () => {};
  }
}

/**
 * Safe localStorage access
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    return clientOnly(() => localStorage.getItem(key), null) || null;
  },
  
  setItem: (key: string, value: string): void => {
    clientOnly(() => localStorage.setItem(key, value));
  },
  
  removeItem: (key: string): void => {
    clientOnly(() => localStorage.removeItem(key));
  },
  
  clear: (): void => {
    clientOnly(() => localStorage.clear());
  }
};

/**
 * Safe sessionStorage access
 */
export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    return clientOnly(() => sessionStorage.getItem(key), null) || null;
  },
  
  setItem: (key: string, value: string): void => {
    clientOnly(() => sessionStorage.setItem(key, value));
  },
  
  removeItem: (key: string): void => {
    clientOnly(() => sessionStorage.removeItem(key));
  },
  
  clear: (): void => {
    clientOnly(() => sessionStorage.clear());
  }
};

/**
 * Safe media query matching
 */
export function safeMatchMedia(query: string): MediaQueryList | null {
  return clientOnly(() => window.matchMedia(query), null) || null;
}

/**
 * Safe DOM element creation
 */
export function safeCreateElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K
): HTMLElementTagNameMap[K] | null {
  return withDocument(doc => doc.createElement(tagName), null) || null;
}

/**
 * Safe DOM query selector
 */
export function safeQuerySelector<T extends Element = Element>(
  selector: string
): T | null {
  return withDocument(doc => doc.querySelector<T>(selector), null) || null;
}

/**
 * Safe DOM query selector all
 */
export function safeQuerySelectorAll<T extends Element = Element>(
  selector: string
): NodeListOf<T> | null {
  return withDocument(doc => doc.querySelectorAll<T>(selector), null) || null;
}

/**
 * Safe body style manipulation
 */
export const safeBodyStyle = {
  setOverflow: (value: string): void => {
    withDocument(doc => {
      doc.body.style.overflow = value;
    });
  },
  
  getOverflow: (): string => {
    return withDocument(doc => doc.body.style.overflow, 'unset') || 'unset';
  },
  
  resetOverflow: (): void => {
    withDocument(doc => {
      doc.body.style.overflow = 'unset';
    });
  }
};

/**
 * Safe focus management
 */
export const safeFocus = {
  focus: (element: HTMLElement | null): void => {
    if (isClient && element && typeof element.focus === 'function') {
      try {
        element.focus();
      } catch (error) {
        console.warn('Failed to focus element:', error);
      }
    }
  },
  
  blur: (element: HTMLElement | null): void => {
    if (isClient && element && typeof element.blur === 'function') {
      try {
        element.blur();
      } catch (error) {
        console.warn('Failed to blur element:', error);
      }
    }
  },
  
  getActiveElement: (): Element | null => {
    return withDocument(doc => doc.activeElement, null) || null;
  }
};

/**
 * Safe scroll management
 */
export const safeScroll = {
  getScrollY: (): number => {
    return clientOnly(() => window.scrollY, 0) || 0;
  },
  
  getScrollX: (): number => {
    return clientOnly(() => window.scrollX, 0) || 0;
  },
  
  scrollTo: (x: number, y: number): void => {
    clientOnly(() => window.scrollTo(x, y));
  },
  
  scrollToTop: (): void => {
    clientOnly(() => window.scrollTo(0, 0));
  }
};

export default {
  isClient,
  hasDocument,
  clientOnly,
  withDocument,
  withWindow,
  safeEventListener,
  safeLocalStorage,
  safeSessionStorage,
  safeMatchMedia,
  safeCreateElement,
  safeQuerySelector,
  safeQuerySelectorAll,
  safeBodyStyle,
  safeFocus,
  safeScroll
};
