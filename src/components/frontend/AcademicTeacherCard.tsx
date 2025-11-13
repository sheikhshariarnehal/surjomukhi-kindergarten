'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface TeacherData {
  id: string;
  name: string;
  designation: string;
  photo_url?: string;
}

interface AcademicTeacherCardProps {
  teacher: TeacherData;
  index?: number;
}

const AcademicTeacherCard = React.memo(({ 
  teacher, 
  index = 0
}: AcademicTeacherCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Generate teacher slug for URL
  const teacherSlug = teacher.id || teacher.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Optimize image URL handling
  const getValidImageUrl = (url: string | undefined): string | null => {
    if (!url) return null;
    if (url.startsWith('/')) return url;
    if (url.startsWith('http')) return url;
    return `/${url}`;
  };

  const validImageUrl = getValidImageUrl(teacher.photo_url);
  const shouldShowImage = validImageUrl && !imageError;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <Link 
      href={`/academic/teachers/${teacherSlug}`}
      className="block h-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-xl"
      aria-label={`View ${teacher.name}'s profile - ${teacher.designation}`}
    >
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer h-full"
        role="article"
        aria-label={`${teacher.name} - ${teacher.designation}`}
        itemScope
        itemType="https://schema.org/Person"
      >
      {/* Content Section */}
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-br from-teal-100 to-blue-100 ring-4 ring-white shadow-md">
              {shouldShowImage ? (
                <Image
                  src={validImageUrl}
                  alt={`${teacher.name} - ${teacher.designation}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 96px, 112px"
                  priority={index < 4}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  quality={85}
                  onError={() => setImageError(true)}
                  itemProp="image"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-10 w-10 sm:h-12 sm:w-12 text-teal-500" />
                </div>
              )}
            </div>
          </div>

          {/* Name and Designation */}
          <div className="w-full">
            <h3 
              className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors"
              itemProp="name"
            >
              {teacher.name}
            </h3>
            <p 
              className="text-sm sm:text-base text-teal-600 font-semibold"
              itemProp="jobTitle"
            >
              {teacher.designation}
            </p>

            {/* Hidden SEO metadata */}
            <meta itemProp="worksFor" content="Surjomukhi Kindergarten" />
          </div>
        </div>
      </div>
    </motion.article>
    </Link>
  );
});

AcademicTeacherCard.displayName = 'AcademicTeacherCard';

export default AcademicTeacherCard;
