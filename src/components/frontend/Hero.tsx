'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@/lib';
import { useTranslation } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { heroPerformanceMonitor } from '@/utils/performance';

/**
 * Interface for Hero slide data structure
 * Ensures type safety for all slide properties
 */
interface HeroSlide {
  id: number;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  image: string;
  imageAlt: string;
  imageAltKey?: string; // Optional translation key for alt text
  cta: {
    primary: { textKey: string; href: string; ariaLabelKey: string };
    secondary: { textKey: string; href: string; ariaLabelKey: string };
  };
}

/**
 * Hero slides configuration with translation keys
 * All text content uses translation keys for bilingual support (English/Bangla)
 * Optimized for SEO with school-specific, accurate information
 * Lightweight configuration for fast initial load
 */
const heroSlides: HeroSlide[] = [
  {
    id: 1,
    titleKey: "hero.slide1.title",
    subtitleKey: "hero.slide1.subtitle",
    descriptionKey: "hero.slide1.description",
    image: "/hero/campus3.webp",
    imageAlt: "Surjomukhi Kindergarten - Bangla medium primary school in Aona, Nawabganj, Dhaka since 2004",
    imageAltKey: "hero.slide1.imageAlt",
    cta: {
      primary: {
        textKey: "hero.slide1.primaryCta",
        href: "/admission",
        ariaLabelKey: "hero.slide1.primaryAriaLabel"
      },
      secondary: {
        textKey: "hero.slide1.secondaryCta",
        href: "/about",
        ariaLabelKey: "hero.slide1.secondaryAriaLabel"
      }
    }
  },
  {
    id: 2,
    titleKey: "hero.slide2.title",
    subtitleKey: "hero.slide2.subtitle",
    descriptionKey: "hero.slide2.description",
    image: "/hero/school-playground.webp",
    imageAlt: "Bangla medium education from Nursery to Grade 5 at Surjomukhi Kindergarten",
    imageAltKey: "hero.slide2.imageAlt",
    cta: {
      primary: {
        textKey: "hero.slide2.primaryCta",
        href: "/academic/classes",
        ariaLabelKey: "hero.slide2.primaryAriaLabel"
      },
      secondary: {
        textKey: "hero.slide2.secondaryCta",
        href: "/about",
        ariaLabelKey: "hero.slide2.secondaryAriaLabel"
      }
    }
  },
  {
    id: 3,
    titleKey: "hero.slide3.title",
    subtitleKey: "hero.slide3.subtitle",
    descriptionKey: "hero.slide3.description",
    image: "/hero/campus6.webp",
    imageAlt: "Creative education, sports, and cultural programs at Surjomukhi Kindergarten Dhaka",
    imageAltKey: "hero.slide3.imageAlt",
    cta: {
      primary: {
        textKey: "hero.slide3.primaryCta",
        href: "/admission",
        ariaLabelKey: "hero.slide3.primaryAriaLabel"
      },
      secondary: {
        textKey: "hero.slide3.secondaryCta",
        href: "/contact",
        ariaLabelKey: "hero.slide3.secondaryAriaLabel"
      }
    }
  }
];

/**
 * Progress bar component for visual auto-play feedback
 * Respects reduced motion preferences for accessibility
 */
interface ProgressBarProps {
  isPlaying: boolean;
  duration: number;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ isPlaying, duration }) => {
  const shouldReduceMotion = useReducedMotion();

  // Don't render if not playing or user prefers reduced motion
  if (!isPlaying || shouldReduceMotion) return null;

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-white/90 shadow-lg rounded-full"
      initial={{ width: '0%' }}
      animate={{ width: '100%' }}
      transition={{
        duration: duration / 1000,
        ease: 'linear',
        // GPU acceleration for smooth animation
        type: 'tween'
      }}
      style={{
        // Force GPU acceleration
        transform: 'translateZ(0)',
        willChange: 'width'
      }}
    />
  );
});

ProgressBar.displayName = 'ProgressBar';

/**
 * Slide indicators component with progress visualization
 * Provides navigation controls for the hero carousel
 */
interface SlideIndicatorsProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (index: number) => void;
  isAutoPlaying: boolean;
  autoPlayDuration: number;
}

const SlideIndicators: React.FC<SlideIndicatorsProps> = React.memo(
  ({ currentSlide, totalSlides, onSlideChange, isAutoPlaying, autoPlayDuration }) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <nav
        className="absolute bottom-16 xs:bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-30"
        aria-label="Hero slideshow navigation"
        role="tablist"
      >
        <motion.div
          className="flex space-x-2 xs:space-x-2.5 sm:space-x-3 bg-black/40 backdrop-blur-md rounded-full px-3 xs:px-4 sm:px-4 py-2 xs:py-2.5 sm:py-2 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.4,
            ease: [0.4, 0, 0.2, 1] // Custom easing for smooth motion
          }}
        >
          {Array.from({ length: totalSlides }, (_, index) => (
            <motion.button
              key={index}
              onClick={() => onSlideChange(index)}
              className={`relative overflow-hidden w-8 h-8 xs:w-10 xs:h-10 sm:w-8 sm:h-8 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent ${
                index === currentSlide
                  ? 'bg-white scale-110 shadow-lg'
                  : 'bg-white/40 hover:bg-white/60 hover:scale-105 active:scale-95'
              }`}
              aria-label={`Go to slide ${index + 1} of ${totalSlides}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
              role="tab"
              aria-selected={index === currentSlide}
              whileHover={!shouldReduceMotion ? { scale: 1.1 } : undefined}
              whileTap={!shouldReduceMotion ? { scale: 0.95 } : undefined}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
              }}
            >
              {index === currentSlide && (
                <ProgressBar
                  key={currentSlide}
                  isPlaying={isAutoPlaying}
                  duration={autoPlayDuration}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </nav>
    );
  }
);

SlideIndicators.displayName = 'SlideIndicators';

/**
 * Institutional information footer component
 * Displays key institutional identifiers with smooth animations
 */
interface InstitutionalData {
  label: string;
  labelKey: string;
  value: string;
  bgColor: string;
  description: string;
  descriptionKey: string;
}

const InstitutionalFooter: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const institutionalData: InstitutionalData[] = [
    {
      label: "EIIN",
      labelKey: "hero.institutional.eiin",
      value: "06310160508",
      bgColor: "bg-orange-500",
      description: "Educational Institution Identification Number",
      descriptionKey: "hero.institutional.eiinDesc"
    },
    {
      label: "Institution Code",
      labelKey: "hero.institutional.institutionCode",
      value: "424528",
      bgColor: "bg-blue-800",
      description: "Official Institution Code",
      descriptionKey: "hero.institutional.institutionCodeDesc"
    },
    {
      label: "Center Code",
      labelKey: "hero.institutional.centerCode",
      value: "N/A",
      bgColor: "bg-orange-500",
      description: "Center Identification Code",
      descriptionKey: "hero.institutional.centerCodeDesc"
    },
    {
      label: "Estd Year",
      labelKey: "hero.institutional.estdYear",
      value: "2004",
      bgColor: "bg-blue-800",
      description: "Year of Establishment",
      descriptionKey: "hero.institutional.estdYearDesc"
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.5,
        delay: shouldReduceMotion ? 0 : 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="absolute bottom-0 left-0 right-0 z-30"
      role="contentinfo"
      aria-label={t('hero.institutional.ariaLabel', 'Institution information')}
    >
      <div className="shadow-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {institutionalData.map((item, index) => (
            <motion.div
              key={item.label}
              className={`${item.bgColor} text-white text-center py-3 sm:py-3.5 px-3 lg:px-6 transition-all duration-200 hover:brightness-105`}
              title={t(item.descriptionKey, item.description)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.4,
                delay: shouldReduceMotion ? 0 : 0.4 + index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="text-xs sm:text-sm font-bold uppercase tracking-widest opacity-95 leading-tight mb-1">
                {t(item.labelKey, item.label)}
              </div>
              <div className="text-base sm:text-lg font-bold leading-tight">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.footer>
  );
});

InstitutionalFooter.displayName = 'InstitutionalFooter';

// Loading state removed for instant professional display

/**
 * Performance and animation constants
 * Centralized configuration for easy maintenance
 */
const HERO_CONSTANTS = {
  AUTO_PLAY_DURATION: 5000, // 5 seconds per slide
  AUTO_PLAY_RESUME_DELAY: 8000, // Resume after 8 seconds of user interaction
  PRELOAD_TIMEOUT: 2000, // Timeout for requestIdleCallback
  PRELOAD_FALLBACK: 1500, // Fallback timeout for browsers without requestIdleCallback
  METRICS_DELAY: 3000, // Delay before logging performance metrics
  MIN_SWIPE_DISTANCE: 50, // Minimum distance for swipe gesture
  SWIPE_RESUME_DELAY: 6000, // Resume auto-play after swipe
  // Optimized image quality - lower for better compression (saves ~46KB)
  IMAGE_QUALITY: {
    SLOW_2G: 50,
    THREE_G: 60,
    FOUR_G_PLUS: 70  // Reduced from 85 for better compression
  }
} as const;

/**
 * Main Hero Component
 * Fully bilingual (English/Bangla) hero carousel with:
 * - Adaptive image quality based on network speed
 * - Professional animations with reduced motion support
 * - Touch gesture support for mobile
 * - Keyboard navigation
 * - SEO-optimized with structured data
 * - WCAG 2.1 AA compliant
 */
const Hero: React.FC = () => {
  const { t, language } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  // State management with proper TypeScript types
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageQuality, setImageQuality] = useState<number>(HERO_CONSTANTS.IMAGE_QUALITY.FOUR_G_PLUS);

  // Refs for cleanup and performance
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Network-aware image quality adjustment
   * Detects connection speed and optimizes image quality accordingly
   * Improves performance on slower connections
   */
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType) {
        const effectiveType = connection.effectiveType;

        // Adjust quality based on network speed
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setImageQuality(HERO_CONSTANTS.IMAGE_QUALITY.SLOW_2G);
        } else if (effectiveType === '3g') {
          setImageQuality(HERO_CONSTANTS.IMAGE_QUALITY.THREE_G);
        } else {
          setImageQuality(HERO_CONSTANTS.IMAGE_QUALITY.FOUR_G_PLUS);
        }
      }
    }
  }, []);

  // Immediate load with performance monitoring - no loading delay
  useEffect(() => {
    // Set images as loaded immediately for instant display
    setImagesLoaded(true);

    // Disable first load animation after mount
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 100);

    // Background performance monitoring
    heroPerformanceMonitor.measureComponentMount(() => {
      console.log('Hero component mounted');
    });

    // Lazy load remaining images with lower priority using requestIdleCallback
    const lazyLoadImages = () => {
      heroSlides.slice(1).forEach((slide) => {
        const lazyImg = new window.Image();
        lazyImg.loading = 'lazy';
        lazyImg.fetchPriority = 'low';
        lazyImg.src = slide.image;
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(lazyLoadImages, { timeout: 2000 });
    } else {
      setTimeout(lazyLoadImages, 1500);
    }

    // Log performance metrics after a delay
    setTimeout(() => {
      heroPerformanceMonitor.logMetrics();
      heroPerformanceMonitor.sendToAnalytics();
    }, 3000);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      heroPerformanceMonitor.cleanup();
    };
  }, []);

  /**
   * Auto-play functionality with proper cleanup
   * Advances slides automatically at configured interval
   */
  useEffect(() => {
    if (!isAutoPlaying || !imagesLoaded) return;

    autoPlayTimeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_CONSTANTS.AUTO_PLAY_DURATION);

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isAutoPlaying, imagesLoaded, currentSlide]);

  /**
   * Slide change handler with auto-play resume
   * Pauses auto-play during user interaction, then resumes
   */
  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide) return;

      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }

      setCurrentSlide(index);
      setIsAutoPlaying(false);

      // Resume auto-play after user interaction
      setTimeout(() => setIsAutoPlaying(true), HERO_CONSTANTS.AUTO_PLAY_RESUME_DELAY);
    },
    [currentSlide]
  );

  /**
   * Touch gesture handlers for mobile swipe navigation
   * Provides smooth, responsive swipe interactions
   */
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length === 1) {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (e.touches.length === 1 && touchStart !== null) {
        setTouchEnd(e.targetTouches[0].clientX);

        // Prevent vertical scrolling during horizontal swipe
        const distance = Math.abs(touchStart - e.targetTouches[0].clientX);
        if (distance > 10) {
          e.preventDefault();
        }
      }
    },
    [touchStart]
  );

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const velocity = Math.abs(distance);

    if (velocity < HERO_CONSTANTS.MIN_SWIPE_DISTANCE) return;

    // Use requestAnimationFrame for smooth, GPU-accelerated transitions
    requestAnimationFrame(() => {
      if (distance > 0) {
        // Swipe left - next slide
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      } else {
        // Swipe right - previous slide
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    });

    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), HERO_CONSTANTS.SWIPE_RESUME_DELAY);
  }, [touchStart, touchEnd]);

  /**
   * Keyboard navigation with debouncing for accessibility
   * Supports arrow keys for navigation and spacebar for pause/play
   */
  useEffect(() => {
    let keyDebounceTimeout: NodeJS.Timeout;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard events when not typing in an input
      if (event.target !== document.body) return;

      clearTimeout(keyDebounceTimeout);
      keyDebounceTimeout = setTimeout(() => {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), HERO_CONSTANTS.AUTO_PLAY_RESUME_DELAY);
            break;
          case 'ArrowRight':
            event.preventDefault();
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), HERO_CONSTANTS.AUTO_PLAY_RESUME_DELAY);
            break;
          case ' ':
          case 'Spacebar': // For older browsers
            event.preventDefault();
            setIsAutoPlaying((prev) => !prev);
            break;
        }
      }, 100);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(keyDebounceTimeout);
    };
  }, []);

  /**
   * Memoized current slide data for performance
   * Prevents unnecessary re-renders
   */
  const currentSlideData = useMemo(() => heroSlides[currentSlide], [currentSlide]);

  /**
   * Animation variants with reduced motion support
   * Professional easing curves for smooth, natural motion
   * Disabled on first load to prevent flash
   */
  const motionVariants = useMemo(
    () => ({
      initial: isFirstLoad ? { opacity: 1 } : (shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.1 }),
      animate: { opacity: 1, scale: 1, zIndex: 1 },
      exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, zIndex: 0 }
    }),
    [shouldReduceMotion, isFirstLoad]
  );

  /**
   * Transition configuration for animations
   * Optimized for 60 FPS performance with proper easing
   * Instant on first load
   */
  const transitionConfig = useMemo(
    () =>
      isFirstLoad
        ? { duration: 0 }
        : (shouldReduceMotion
          ? { duration: 0.2 }
          : {
              duration: 0.7, // Slightly longer for smoother crossfade
              ease: [0.4, 0, 0.2, 1] as const // Custom cubic-bezier for smooth motion
            }),
    [shouldReduceMotion, isFirstLoad]
  );

  return (
    <section
      className="relative h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] max-h-[900px] overflow-hidden bg-gray-900"
      role="banner"
      aria-label="Surjomukhi Kindergarten hero slideshow"
      aria-live="polite"
      aria-atomic="true"
      itemScope
      itemType="https://schema.org/EducationalOrganization"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        // Ensure proper viewport height on mobile browsers
        minHeight: 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
        height: 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))'
      }}
    >
        {/* Enhanced Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["EducationalOrganization", "School"],
              "name": "Surjomukhi Kindergarten",
              "alternateName": ["সূর্যমুখী কিন্ডারগার্টেন", "Surjamukhi Kindergarten"],
              "description": "Premier early childhood education institution providing quality Bangla medium education from nursery to Grade 5 with modern facilities and experienced teachers",
              "url": "https://www.surjamukhikindergarten.com",
              "logo": "https://www.surjamukhikindergarten.com/logo.png",
              "image": "https://www.surjamukhikindergarten.com/hero/school-tour.webp",
              "sameAs": [
                "https://www.facebook.com/surjamukhikindergarten",
                "https://www.instagram.com/surjamukhikindergarten"
              ],
              "foundingDate": "2004-01-01",
              "numberOfStudents": 55,
              "educationalCredentialAwarded": "Primary Education Certificate",
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Primary Education",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Ministry of Education, Bangladesh"
                }
              },
              "identifier": [
                {
                  "@type": "PropertyValue",
                  "name": "EIIN",
                  "value": "06310160508"
                },
                {
                  "@type": "PropertyValue",
                  "name": "Institution Code",
                  "value": "424528"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Salauddin Complex, Aona Bazar",
                "addressLocality": "Nawabganj",
                "addressRegion": "Dhaka",
                "postalCode": "1320",
                "addressCountry": "BD"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "23.8859",
                "longitude": "90.2934"
              },
              "telephone": ["+880-1954113374"],
              "email": "info.surjamukhikindergarten@gmail.com",
              "openingHours": "Mo-Th 08:00-16:00",
              "priceRange": "$$",
              "paymentAccepted": "Cash, Bank Transfer",
              "currenciesAccepted": "BDT",
              "areaServed": {
                "@type": "Place",
                "name": "Nawabganj, Dhaka, Bangladesh"
              },
              "audience": {
                "@type": "EducationalAudience",
                "educationalRole": "student",
                "audienceType": "children aged 3-10"
              },
              "offers": {
                "@type": "Offer",
                "category": "Education",
                "name": "Early Childhood Education Programs",
                "description": "Comprehensive educational programs for nursery to grade 5 students"
              }
            })
          }}
        />
      
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={motionVariants.initial}
          animate={motionVariants.animate}
          exit={motionVariants.exit}
          transition={transitionConfig}
          className="absolute inset-0"
        >
          {/* Optimized Background Image with GPU acceleration */}
          <div className="absolute inset-0">
            {/* Neutral fallback - prevents blue gradient flash */}
            <div className="absolute inset-0 bg-gray-900 z-0" />

            {/* Performance-optimized Next.js image with responsive sizes and adaptive quality */}
            <div className="absolute inset-0 z-10">
              <Image
                src={currentSlideData.image}
                alt={currentSlideData.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                className="object-cover object-center"
                priority={currentSlide === 0}
                quality={currentSlide === 0 ? imageQuality : Math.max(imageQuality - 15, 50)}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZjI5MzciLz48L3N2Zz4="
                loading={currentSlide === 0 ? "eager" : "lazy"}
                fetchPriority={currentSlide === 0 ? "high" : "low"}
              />
            </div>

            {/* Optimized overlay with better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 z-20" />
          </div>

          {/* Enhanced Mobile-Optimized Content with Professional Typography */}
          <div className="relative z-30 flex items-center justify-center h-full px-3 xs:px-4 sm:px-6 lg:px-8 pb-20 xs:pb-24 sm:pb-28 pt-safe-top">
            <div className="max-w-7xl mx-auto text-center text-white w-full">
              <div className="space-y-3 xs:space-y-4 sm:space-y-6 lg:space-y-8">
                <header className="space-y-2 xs:space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* Subtitle with stagger animation */}
                  <motion.p
                    initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.2 : 0.4,
                      delay: shouldReduceMotion ? 0 : 0.1,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-blue-200 uppercase tracking-wider px-2 leading-tight"
                    itemProp="alternateName"
                    role="doc-subtitle"
                    style={{
                      // Professional typography
                      letterSpacing: '0.1em',
                      fontWeight: 600
                    }}
                  >
                    {t(currentSlideData.subtitleKey, currentSlideData.subtitleKey)}
                  </motion.p>

                  {/* Main title with stagger animation and professional typography */}
                  <motion.h1
                    initial={shouldReduceMotion ? { opacity: 0 } : { y: 30, opacity: 0 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.2 : 0.5,
                      delay: shouldReduceMotion ? 0 : 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold px-2"
                    itemProp="name"
                    id="hero-title"
                    style={{
                      // Professional typography with optimal line-height
                      lineHeight: '1.2',
                      letterSpacing: '-0.02em',
                      fontWeight: 700,
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {t(currentSlideData.titleKey, currentSlideData.titleKey)}
                  </motion.h1>

                  {/* Description with stagger animation */}
                  <motion.p
                    initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.2 : 0.4,
                      delay: shouldReduceMotion ? 0 : 0.35,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto text-gray-100 px-3 xs:px-4 sm:px-6"
                    itemProp="description"
                    role="doc-subtitle"
                    aria-describedby="hero-title"
                    style={{
                      // Professional typography with optimal readability
                      lineHeight: '1.6',
                      letterSpacing: '0',
                      fontWeight: 400,
                      textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {t(currentSlideData.descriptionKey, currentSlideData.descriptionKey)}
                  </motion.p>
                </header>

                {/* CTA Buttons with professional hover effects and stagger animation */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.4,
                    delay: shouldReduceMotion ? 0 : 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="flex flex-col xs:flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-4 lg:gap-6 justify-center items-center pt-3 xs:pt-4 sm:pt-6 px-3 xs:px-4 sm:px-0"
                >
                  <motion.a
                    href={currentSlideData.cta.primary.href}
                    className="w-full xs:w-full sm:w-auto max-w-xs xs:max-w-sm sm:max-w-none"
                    aria-label={t(currentSlideData.cta.primary.ariaLabelKey, currentSlideData.cta.primary.ariaLabelKey)}
                    whileHover={!shouldReduceMotion ? { scale: 1.03 } : undefined}
                    whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-6 xs:px-8 sm:px-8 py-3 xs:py-4 sm:py-4 text-sm xs:text-base sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out focus:ring-4 focus:ring-white/30 touch-target"
                      style={{
                        // Professional typography
                        letterSpacing: '0.01em',
                        fontWeight: 600
                      }}
                    >
                      {t(currentSlideData.cta.primary.textKey, currentSlideData.cta.primary.textKey)}
                    </Button>
                  </motion.a>

                  <motion.a
                    href={currentSlideData.cta.secondary.href}
                    className="w-full xs:w-full sm:w-auto max-w-xs xs:max-w-sm sm:max-w-none"
                    aria-label={t(currentSlideData.cta.secondary.ariaLabelKey, currentSlideData.cta.secondary.ariaLabelKey)}
                    whileHover={!shouldReduceMotion ? { scale: 1.03 } : undefined}
                    whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 xs:px-8 sm:px-8 py-3 xs:py-4 sm:py-4 text-sm xs:text-base sm:text-base font-semibold rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white transition-all duration-300 ease-out focus:ring-4 focus:ring-white/30 touch-target"
                      style={{
                        // Professional typography
                        letterSpacing: '0.01em',
                        fontWeight: 600
                      }}
                    >
                      {t(currentSlideData.cta.secondary.textKey, currentSlideData.cta.secondary.textKey)}
                    </Button>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Institutional Information Footer */}
      <InstitutionalFooter />
    </section>
  );
};

export default React.memo(Hero);