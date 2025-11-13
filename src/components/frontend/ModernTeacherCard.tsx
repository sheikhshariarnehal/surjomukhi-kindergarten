'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Teacher } from '@/types/teacher';

interface ModernTeacherCardProps {
  teacher: Teacher;
  index?: number;
}

const ModernTeacherCard = React.memo(({ 
  teacher, 
  index = 0
}: ModernTeacherCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Generate teacher slug for navigation
  const teacherSlug = teacher.slug || 
    teacher.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Optimize image URL handling
  const getValidImageUrl = (url: string | undefined): string | null => {
    if (!url) return null;
    if (url.startsWith('-')) return url.substring(1);
    if (url.startsWith('/') || url.startsWith('http')) return url;
    return `/${url}`;
  };

  const validImageUrl = getValidImageUrl(teacher.photo_url);
  const shouldShowImage = validImageUrl && !imageError;

  // Optimized animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        delay: Math.min(index * 0.03, 0.3),
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group h-full"
    >
      <Link 
        href={`/teachers/${teacherSlug}`}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
        aria-label={`View ${teacher.name}'s profile - ${teacher.designation}`}
      >
        <article 
          className="bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 group-hover:border-blue-300 h-full flex flex-col cursor-pointer"
          itemScope
          itemType="https://schema.org/Person"
        >
        {/* Image Section */}
        <div className="relative aspect-[3/4] sm:aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
          {shouldShowImage ? (
            <Image
              src={validImageUrl}
              alt={`${teacher.name} - ${teacher.designation}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={index < 4 ? "eager" : "lazy"}
              quality={85}
              onError={() => setImageError(true)}
              itemProp="image"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
              <User className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300" />
            </div>
          )}
        </div>

        {/* Content Section - Only Name and Designation */}
        <div className="p-3 sm:p-4 text-center">
          <h3 
            className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2"
            itemProp="name"
          >
            {teacher.name}
          </h3>
          <p 
            className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2"
            itemProp="jobTitle"
          >
            {teacher.designation}
          </p>
          
          {/* Hidden SEO metadata */}
          <meta itemProp="worksFor" content="Surjomukhi Kindergarten" />
        </div>
      </article>
      </Link>
    </motion.div>
  );
});

ModernTeacherCard.displayName = 'ModernTeacherCard';

export default ModernTeacherCard;