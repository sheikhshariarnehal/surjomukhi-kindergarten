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

interface SimpleTeacherCardProps {
  teacher: TeacherData;
  index?: number;
}

const SimpleTeacherCard = React.memo(({ teacher, index = 0 }: SimpleTeacherCardProps) => {
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
      className="block h-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-lg"
      aria-label={`${teacher.name} এর বিস্তারিত তথ্য দেখুন`}
    >
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.3 } }}
        className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 overflow-hidden transition-all duration-300 h-full flex flex-col w-full max-w-xs mx-auto cursor-pointer"
        role="article"
        aria-label={`${teacher.name} - ${teacher.designation}`}
        itemScope
        itemType="https://schema.org/Person"
      >
      {/* Profile Image Section */}
      <div className="relative pt-4 pb-3 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="flex justify-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ring-2 ring-white shadow-sm group-hover:shadow-md transition-all duration-300">
            {shouldShowImage ? (
              <Image
                src={validImageUrl}
                alt={`${teacher.name} - ${teacher.designation}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 96px, 112px"
                loading={index < 6 ? 'eager' : 'lazy'}
                quality={85}
                onError={() => setImageError(true)}
                itemProp="image"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-teal-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section - Only Name and Designation */}
      <div className="px-4 py-3 text-center">
        <h3 
          className="text-base sm:text-lg font-semibold text-gray-900 mb-1 leading-tight font-serif group-hover:text-teal-700 transition-colors duration-300"
          itemProp="name"
        >
          {teacher.name}
        </h3>
        
        <p 
          className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed"
          itemProp="jobTitle"
        >
          {teacher.designation}
        </p>

        {/* Hidden SEO metadata */}
        <meta itemProp="worksFor" content="সুর্যমুখী কিন্ডারগার্টেন" />
      </div>
    </motion.article>
    </Link>
  );
});

SimpleTeacherCard.displayName = 'SimpleTeacherCard';

export default SimpleTeacherCard;
