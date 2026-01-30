/**
 * Lightweight animation utilities to replace Framer Motion where full features aren't needed
 * Reduces bundle size and improves performance for simple animations
 */

import { useEffect, useState, useRef } from 'react';

/**
 * Lightweight fade-in animation hook
 * Use this instead of Framer Motion for simple fade effects
 */
export function useFadeIn(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return {
    className: `transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`,
    style: { transitionDelay: `${delay}ms` }
  };
}

/**
 * Intersection Observer hook for scroll-triggered animations
 * More performant than Framer Motion's useInView for simple cases
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Once visible, stop observing
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

/**
 * CSS-based animation classes
 * Use these with Tailwind for lightweight animations
 */
export const lightAnimations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  scaleIn: 'animate-scale-in',
} as const;

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
