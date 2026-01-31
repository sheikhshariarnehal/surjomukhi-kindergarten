'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

interface GalleryImage {
  id: string;
  title: string;
  caption?: string;
  image_url: string;
  album: string;
  created_at: string;
}

export default function GalleryMarquee() {
  const { t } = useTranslation();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gallery?limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        const data = await response.json();
        setImages(data.images || []);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError('Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Don't render if there are no images
  if (loading) {
    return (
      <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-6 sm:h-8 w-32 sm:w-48 bg-gray-200 rounded-lg animate-pulse mx-auto mb-3 sm:mb-4" />
            <div className="h-4 w-48 sm:w-64 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
          <div className="flex gap-3 sm:gap-6 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-56 h-40 sm:w-72 sm:h-52 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || images.length === 0) {
    return null; // Don't show section if no images
  }

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section className="py-10 sm:py-14 md:py-20 relative overflow-hidden w-full" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)' }}>
      {/* Decorative background elements - Hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block" aria-hidden="true">
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-amber-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-36 sm:w-56 md:w-72 h-36 sm:h-56 md:h-72 bg-orange-100/20 rounded-full blur-3xl" />
      </div>

      {/* Section Header - Contained */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-50 rounded-full mb-3 sm:mb-4">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
            <span className="text-amber-600 font-medium text-xs sm:text-sm">{t('gallery.badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('gallery.headingPart1')}{' '}
            <span className="text-amber-600">{t('gallery.headingPart2')}</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            {t('gallery.description')}
          </p>
        </motion.div>
      </div>

      {/* First Row - Moving Left - Full Width */}
      <div className="relative w-full mb-3 sm:mb-4 md:mb-6">
        <div className="marquee-container overflow-hidden will-change-transform">
          <div className="marquee-track flex gap-3 sm:gap-4 md:gap-6 animate-marquee-left">
            {duplicatedImages.map((image, index) => (
              <GalleryCard key={`left-${image.id}-${index}`} image={image} priority={index < 6} />
            ))}
          </div>
        </div>
      </div>

      {/* Second Row - Moving Right - Full Width */}
      <div className="relative w-full">
        <div className="marquee-container overflow-hidden will-change-transform">
          <div className="marquee-track flex gap-3 sm:gap-4 md:gap-6 animate-marquee-right">
            {[...duplicatedImages].reverse().map((image, index) => (
              <GalleryCard key={`right-${image.id}-${index}`} image={image} priority={false} />
            ))}
          </div>
        </div>
      </div>

      {/* View All Button - Contained */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 sm:mt-10 md:mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm sm:text-base font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 sm:hover:scale-105"
          >
            <span>{t('gallery.viewFullGallery')}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>

      {/* CSS for Marquee Animation */}
      <style jsx>{`
        .marquee-container {
          width: 100%;
          -webkit-overflow-scrolling: touch;
        }
        
        .marquee-track {
          width: max-content;
          will-change: transform;
        }

        @keyframes marquee-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translate3d(-33.333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        /* Optimized animation speeds with GPU acceleration - Very smooth and slow */
        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Even slower on larger screens for smooth viewing */
        @media (min-width: 640px) {
          .animate-marquee-left {
            animation: marquee-left 80s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 80s linear infinite;
          }
        }

        @media (min-width: 1024px) {
          .animate-marquee-left {
            animation: marquee-left 100s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 100s linear infinite;
          }
        }

        /* Pause on hover - desktop only */
        @media (hover: hover) {
          .marquee-container:hover .animate-marquee-left,
          .marquee-container:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left,
          .animate-marquee-right {
            animation: none;
            transform: translate3d(0, 0, 0);
          }
          
          .marquee-track {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

function GalleryCard({ image, priority }: { image: GalleryImage; priority?: boolean }) {
  return (
    <div className="flex-shrink-0 group relative w-52 h-36 xs:w-60 xs:h-44 sm:w-72 sm:h-52 md:w-80 md:h-56 lg:w-96 lg:h-64 rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-xl touch-manipulation transform-gpu">
      {/* Image with optimized loading */}
      <Image
        src={image.image_url}
        alt={image.title || 'Gallery image'}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
        sizes="(max-width: 480px) 208px, (max-width: 640px) 240px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
        loading={priority ? "eager" : "lazy"}
        quality={85}
      />
      
      {/* Overlay - Hidden by default, shown on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content - Hidden by default, shown on hover */}
      <div className="absolute inset-0 p-2.5 sm:p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <h3 className="text-white font-semibold text-sm sm:text-lg line-clamp-1">
          {image.title}
        </h3>
        {image.album && (
          <span className="text-amber-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
            {image.album}
          </span>
        )}
      </div>

      {/* Border Glow Effect */}
      <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-amber-400/50 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}
