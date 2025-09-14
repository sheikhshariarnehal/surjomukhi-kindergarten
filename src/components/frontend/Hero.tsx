'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@/lib';
import { useTranslation } from '@/contexts/LanguageContext';
import Image from 'next/image';

interface HeroSlide {
  id: number;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  image: string;
  imageAlt: string;
  cta: {
    primary: { textKey: string; href: string; ariaLabel: string };
    secondary: { textKey: string; href: string; ariaLabel: string };
  };
}

// Optimized image sources - you should convert these to WebP format
const heroSlides: HeroSlide[] = [
  {
    id: 1,
    titleKey: "hero.title",
    subtitleKey: "hero.subtitle", 
    descriptionKey: "hero.description",
    image: "/hero/campus3.webp", // TODO: Convert to .webp for better performance
    imageAlt: "Surjomukhi Kindergarten campus - Modern educational facility for early childhood development",
    cta: {
      primary: { 
        textKey: "hero.enrollNow", 
        href: "/admission", 
        ariaLabel: "Start enrollment process for Surjomukhi Kindergarten"
      },
      secondary: { 
        textKey: "hero.learnMore", 
        href: "/about",
        ariaLabel: "Learn more about Surjomukhi Kindergarten programs"
      }
    }
  },
  {
    id: 2,
    titleKey: "Safe Learning Environment",
    subtitleKey: "Modern Kindergarten Facilities",
    descriptionKey: "Our campus provides a safe, nurturing environment with age-appropriate facilities designed for early childhood development.",
    image: "/hero/campus4.webp", // TODO: Convert to .webp
    imageAlt: "Safe learning environment at Surjomukhi Kindergarten with modern facilities",
    cta: {
      primary: { 
        textKey: "Explore Facilities", 
        href: "/about/campus-tour",
        ariaLabel: "Take a virtual tour of our kindergarten facilities"
      },
      secondary: { 
        textKey: "Virtual Tour", 
        href: "/gallery",
        ariaLabel: "View our photo gallery and virtual campus tour"
      }
    }
  },
  {
    id: 3,
    titleKey: "Holistic Development",
    subtitleKey: "Beyond Academics",
    descriptionKey: "We focus on the overall development of children through play-based learning, arts, and creative activities.",
    image: "/hero/school-playground.webp", // TODO: Convert to .webp
    imageAlt: "Children engaged in holistic learning activities at Surjomukhi Kindergarten",
    cta: {
      primary: { 
        textKey: "View Activities", 
        href: "/academic/classes",
        ariaLabel: "Explore our educational activities and curriculum"
      },
      secondary: { 
        textKey: "common.contact", 
        href: "/contact",
        ariaLabel: "Contact Surjomukhi Kindergarten for inquiries"
      }
    }
  }
];

// Optimized slide indicators with minimal re-renders
const SlideIndicators: React.FC<{
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (index: number) => void;
}> = React.memo(({ currentSlide, totalSlides, onSlideChange }) => (
  <nav 
    className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-30"
    aria-label="Hero slideshow navigation"
  >
    <div className="flex space-x-2 sm:space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-1 focus:ring-offset-black/20 ${
            index === currentSlide
              ? 'bg-white scale-125 shadow-lg'
              : 'bg-white/50 hover:bg-white/75 hover:scale-110'
          }`}
          aria-label={`Go to slide ${index + 1} of ${totalSlides}`}
          aria-current={index === currentSlide ? 'true' : 'false'}
        />
      ))}
    </div>
  </nav>
));

SlideIndicators.displayName = 'SlideIndicators';

// Inline InstitutionalFooter component for better bundle optimization
const InstitutionalFooter: React.FC = React.memo(() => {
  const institutionalData = [
    { 
      label: "EIIN", 
      value: "06310160508", 
      bgColor: "bg-orange-500",
      description: "Educational Institution Identification Number"
    },
    { 
      label: "Institution Code", 
      value: "424528", 
      bgColor: "bg-blue-800",
      description: "Official Institution Code"
    },
    { 
      label: "Center Code", 
      value: "N/A", 
      bgColor: "bg-orange-500",
      description: "Center Identification Code"
    },
    { 
      label: "Estd Year", 
      value: "1836", 
      bgColor: "bg-blue-800",
      description: "Year of Establishment"
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="absolute bottom-0 left-0 right-0 z-40"
      role="contentinfo"
      aria-label="Institution information"
    >
      <div className="bg-gradient-to-r from-orange-500 via-blue-800 to-orange-500">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {institutionalData.map((item, index) => (
            <div
              key={item.label}
              className={`${item.bgColor} text-white text-center py-2 sm:py-3 px-1 sm:px-2 lg:px-4 transition-all duration-200 hover:brightness-110`}
              title={item.description}
            >
              <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
                {item.label}
              </div>
              <div className="text-sm sm:text-base font-bold mt-1">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.footer>
  );
});

InstitutionalFooter.displayName = 'InstitutionalFooter';

// Minimal loading component
const LoadingState: React.FC = React.memo(() => (
  <section 
    className="relative h-screen min-h-[500px] sm:min-h-[600px] max-h-[900px] overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600" 
    role="banner"
    aria-label="Hero section loading"
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-2 sm:border-4 border-b-transparent border-white mx-auto mb-4"></div>
        <p className="text-sm sm:text-lg font-medium">Loading...</p>
      </div>
    </div>
  </section>
));

LoadingState.displayName = 'LoadingState';

// Main Hero Component
const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();
  const shouldReduceMotion = useReducedMotion();

  // Optimized image preloading - only preload first image initially
  useEffect(() => {
    const preloadCriticalImages = () => {
      const firstImage = new window.Image();
      firstImage.onload = firstImage.onerror = () => {
        setImagesLoaded(true);
        
        // Lazy load remaining images after first one is loaded
        setTimeout(() => {
          heroSlides.slice(1).forEach((slide) => {
            const lazyImg = new window.Image();
            lazyImg.src = slide.image;
          });
        }, 1000);
      };
      firstImage.src = heroSlides[0].image;
    };

    preloadCriticalImages();
  }, []);

  // Optimized auto-play with cleanup
  useEffect(() => {
    if (!isAutoPlaying || !imagesLoaded) return;

    autoPlayTimeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isAutoPlaying, imagesLoaded, currentSlide]);

  // Debounced slide change handler
  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, [currentSlide]);

  // Optimized touch handlers with threshold
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 75;
    
    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }

    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, [touchStart, touchEnd]);

  // Optimized keyboard navigation with debouncing
  useEffect(() => {
    let keyDebounceTimeout: NodeJS.Timeout;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== document.body) return;
      
      clearTimeout(keyDebounceTimeout);
      keyDebounceTimeout = setTimeout(() => {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 8000);
            break;
          case 'ArrowRight':
            event.preventDefault();
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 8000);
            break;
          case ' ':
            event.preventDefault();
            setIsAutoPlaying(prev => !prev);
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

  // Memoized current slide data
  const currentSlideData = useMemo(() => heroSlides[currentSlide], [currentSlide]);

  // Reduced motion variants
  const motionVariants = useMemo(() => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 },
    exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 },
    transition: shouldReduceMotion 
      ? { duration: 0.3 } 
      : { duration: 0.6, ease: "easeInOut" }
  }), [shouldReduceMotion]);

  if (!imagesLoaded) {
    return <LoadingState />;
  }

  return (
    <section 
      className="relative h-screen min-h-[500px] sm:min-h-[600px] max-h-[900px] overflow-hidden" 
      role="banner"
      aria-label="Surjomukhi Kindergarten hero slideshow"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Surjomukhi Kindergarten",
            "description": "Premier kindergarten providing quality early childhood education",
            "url": "https://surjomukhi-kindergarten.com",
            "foundingDate": "1836",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD"
            }
          })
        }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={motionVariants.initial}
          animate={motionVariants.animate}
          exit={motionVariants.exit}
          transition={motionVariants.transition}
          className="absolute inset-0"
        >
          {/* Optimized Background Image */}
          <div className="absolute inset-0">
            {/* CSS gradient fallback */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 z-0" />

            {/* Optimized Next.js image */}
            <div className="absolute inset-0 z-10">
              <Image
                src={currentSlideData.image}
                alt={currentSlideData.imageAlt}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={currentSlide === 0}
                quality={75} // Reduced from 85 for better performance
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIHAQAAAAAAAAAAAAABAgADBAUREiExUWGB/9oADAMBAAIRAxEAPwCdABmvSNnZA8U2K+ztmvSNnZA8U2K+ztmvSNnZA8U2K+ztmJzuYkOMPGr1zNP/Z"
                loading={currentSlide === 0 ? "eager" : "lazy"}
              />
            </div>

            {/* Simplified overlay */}
            <div className="absolute inset-0 bg-black/50 z-20" />
          </div>

          {/* Optimized Content with reduced animations */}
          <div className="relative z-30 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
            <div className="max-w-6xl mx-auto text-center text-white">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.3 : 0.6, delay: 0.1 }}
                className="space-y-4 sm:space-y-6 lg:space-y-8"
              >
                <header className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-blue-200 uppercase tracking-wider">
                    {t(currentSlideData.subtitleKey, currentSlideData.subtitleKey)}
                  </h2>
                  
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight sm:leading-tight">
                    {t(currentSlideData.titleKey, currentSlideData.titleKey)}
                  </h1>
                  
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed text-gray-100 px-2 sm:px-4">
                    {t(currentSlideData.descriptionKey, currentSlideData.descriptionKey)}
                  </p>
                </header>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center pt-4 sm:pt-6">
                  <a 
                    href={currentSlideData.cta.primary.href} 
                    className="w-full sm:w-auto"
                    aria-label={currentSlideData.cta.primary.ariaLabel}
                  >
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-white/30"
                    >
                      {t(currentSlideData.cta.primary.textKey, currentSlideData.cta.primary.textKey)}
                    </Button>
                  </a>
                  
                  <a 
                    href={currentSlideData.cta.secondary.href} 
                    className="w-full sm:w-auto"
                    aria-label={currentSlideData.cta.secondary.ariaLabel}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white transition-all duration-300 focus:ring-4 focus:ring-white/30"
                    >
                      {t(currentSlideData.cta.secondary.textKey, currentSlideData.cta.secondary.textKey)}
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <SlideIndicators
        currentSlide={currentSlide}
        totalSlides={heroSlides.length}
        onSlideChange={goToSlide}
      />

      {/* Institutional Information Footer */}
      <InstitutionalFooter />
    </section>
  );
};

export default React.memo(Hero);