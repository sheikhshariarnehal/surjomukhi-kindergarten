'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/lib';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Welcome to Surjomukhi Kindergarten",
    subtitle: "Excellence in Early Education",
    description: "Nurturing young minds for a brighter future through quality education and holistic development in a caring environment.",
    image: "/hero/campus.jpg",
    cta: {
      primary: { text: "Apply for Admission", href: "/admission" },
      secondary: { text: "Learn More", href: "/about" }
    }
  },
  {
    id: 2,
    title: "Safe Learning Environment",
    subtitle: "Modern Kindergarten Facilities",
    description: "Our campus provides a safe, nurturing environment with age-appropriate facilities designed for early childhood development.",
    image: "/hero/campus2.jpg",
    cta: {
      primary: { text: "Explore Facilities", href: "/about/campus-tour" },
      secondary: { text: "Virtual Tour", href: "/gallery" }
    }
  },
  {
    id: 3,
    title: "Holistic Development",
    subtitle: "Beyond Academics",
    description: "We focus on the overall development of children through play-based learning, arts, and creative activities.",
    image: "/hero/children-learning.jpg",
    cta: {
      primary: { text: "View Activities", href: "/academic/classes" },
      secondary: { text: "Contact Us", href: "/contact" }
    }
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);





  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden" role="banner">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image - Professional Implementation */}
          <div className="absolute inset-0">
            {/* Gradient fallback */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 z-0" />

            {/* Background image using CSS background-image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out z-10"
              style={{
                backgroundImage: `url(${heroSlides[currentSlide].image})`,
              }}
            />

            {/* Professional overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/40 z-20" />
          </div>

          {/* Content */}
          <div className="relative z-30 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center text-white">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 sm:space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-sm sm:text-base md:text-lg font-medium text-blue-200 uppercase tracking-wider">
                    {heroSlides[currentSlide].subtitle}
                  </h2>
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-gray-100">
                    {heroSlides[currentSlide].description}
                  </p>
                </div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
                >
                  <a href={heroSlides[currentSlide].cta.primary.href} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-8 py-4 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px]">
                      {heroSlides[currentSlide].cta.primary.text}
                    </Button>
                  </a>
                  <a href={heroSlides[currentSlide].cta.secondary.href} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-base font-semibold rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white transition-all duration-300 min-h-[48px]"
                    >
                      {heroSlides[currentSlide].cta.secondary.text}
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>



      {/* Slide Indicators */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 sm:bottom-12 right-6 sm:right-8 z-20 hidden lg:block"
      >
        <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors cursor-pointer">
          <span className="text-xs font-medium mb-2 uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/20 backdrop-blur-sm rounded-full p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
