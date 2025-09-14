'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    titleKey: "hero.title",
    subtitleKey: "hero.subtitle",
    descriptionKey: "hero.description",
    image: "/hero/campus.jpg",
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
    image: "/hero/campus2.jpg",
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
    image: "/hero/children-learning.jpg",
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

// Optimized Slide Indicators with better accessibility
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

// Enhanced Institutional Footer with structured data
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
      transition={{ duration: 0.8, delay: 0.6 }}
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

// Main Hero Component
const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      let loadedCount = 0;
      const totalImages = heroSlides.length;

      heroSlides.forEach((slide) => {
        const img = new window.Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.src = slide.image;
      });
    };

    preloadImages();
  }, []);

  // Auto-play functionality with performance optimization
  useEffect(() => {
    if (!isAutoPlaying || !imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, imagesLoaded]);

  // Memoized slide change handler
  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [currentSlide]);

  // Touch handlers for mobile swipe
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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }

    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [touchStart, touchEnd]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== document.body) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
          break;
        case 'ArrowRight':
          event.preventDefault();
          setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
          break;
        case ' ':
          event.preventDefault();
          setIsAutoPlaying(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Memoized current slide data
  const currentSlideData = useMemo(() => heroSlides[currentSlide], [currentSlide]);

  // Enhanced loading state
  if (!imagesLoaded) {
    return (
      <section 
        className="relative h-screen min-h-[500px] sm:min-h-[600px] max-h-[900px] overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600" 
        role="banner"
        aria-label="Hero section loading"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-2 sm:border-4 border-b-transparent border-white mx-auto mb-4"></div>
            <p className="text-sm sm:text-lg font-medium">Loading experience...</p>
          </div>
        </div>
      </section>
    );
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
            },
            "sameAs": [
              "https://www.facebook.com/surjomukhi",
              "https://www.instagram.com/surjomukhi"
            ]
          })
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Optimized Background Image */}
          <div className="absolute inset-0">
            {/* Gradient fallback */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 z-0" />

            {/* Next.js optimized image */}
            <div className="absolute inset-0 z-10">
              <Image
                src={currentSlideData.image}
                alt={currentSlideData.imageAlt}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={currentSlide === 0}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIHAQAAAAAAAAAAAAABAgADBAUREiExUWGB/9oADAMBAAIRAxEAPwCdABmvSNnZA8U2K+ztmvSNnZA8U2K+ztmvSNnZA8U2K+ztmJzuYkOMPGr1zNP/Z"
              />
            </div>

            {/* Professional overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-20" />
          </div>

          {/* Content */}
          <div className="relative z-30 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
            <div className="max-w-6xl mx-auto text-center text-white">
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="space-y-4 sm:space-y-6 lg:space-y-8"
              >
                <header className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-blue-200 uppercase tracking-wider"
                  >
                    {t(currentSlideData.subtitleKey, currentSlideData.subtitleKey)}
                  </motion.h2>
                  
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight sm:leading-tight"
                  >
                    {t(currentSlideData.titleKey, currentSlideData.titleKey)}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed text-gray-100 px-2 sm:px-4"
                  >
                    {t(currentSlideData.descriptionKey, currentSlideData.descriptionKey)}
                  </motion.p>
                </header>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center pt-4 sm:pt-6"
                >
                  <a 
                    href={currentSlideData.cta.primary.href} 
                    className="w-full sm:w-auto"
                    aria-label={currentSlideData.cta.primary.ariaLabel}
                  >
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-white/30"
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
                      className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-white/30"
                    >
                      {t(currentSlideData.cta.secondary.textKey, currentSlideData.cta.secondary.textKey)}
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
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