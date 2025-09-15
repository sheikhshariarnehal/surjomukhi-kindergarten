'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import type { BackToTopProps } from '@/types/footer';

const BackToTop: React.FC<BackToTopProps> = React.memo(({
  threshold = 300,
  className = '',
  showProgress = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Show/hide button based on scroll position
    setIsVisible(scrollTop > threshold);
    
    // Calculate scroll progress if enabled
    if (showProgress && docHeight > 0) {
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    }
  }, [threshold, showProgress]);

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  }, [scrollToTop]);

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      className={`
        fixed bottom-6 right-6 z-50 
        bg-blue-600 hover:bg-blue-700 
        text-white p-3 rounded-full 
        shadow-lg hover:shadow-xl 
        transition-all duration-300 
        transform hover:scale-110 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      aria-label="Scroll to top of page"
      title="Back to top"
    >
      {showProgress ? (
        <div className="relative">
          {/* Progress circle */}
          <svg 
            className="w-6 h-6 transform -rotate-90" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 10}`}
              strokeDashoffset={`${2 * Math.PI * 10 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-300"
            />
          </svg>
          {/* Arrow icon */}
          <ChevronUp 
            className="absolute inset-0 w-6 h-6 m-auto" 
            aria-hidden="true"
          />
        </div>
      ) : (
        <ChevronUp className="w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
});

BackToTop.displayName = 'BackToTop';

export default BackToTop;
