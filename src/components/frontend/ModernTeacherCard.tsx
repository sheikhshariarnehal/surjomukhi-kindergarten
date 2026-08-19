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
  showDetails?: boolean;
}

const ModernTeacherCard = React.memo(({ 
  teacher, 
  index = 0,
  showDetails = false
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
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: Math.min(index * 0.04, 0.3)
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group h-full"
    >
      <Link 
        href={`/teachers/${teacherSlug}`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl"
        aria-label={`View ${teacher.name}'s profile - ${teacher.designation}`}
      >
        <article 
          className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:border-gray-200 h-full flex flex-col cursor-pointer"
          itemScope
          itemType="https://schema.org/Person"
        >
          {/* Image Section - Elegant Portrait Aspect */}
          <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
            {shouldShowImage ? (
              <Image
                src={validImageUrl}
                alt={`${teacher.name} - ${teacher.designation}`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={index < 4 ? "eager" : "lazy"}
                quality={85}
                onError={() => setImageError(true)}
                itemProp="image"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100" aria-hidden="true">
                <User className="h-12 w-12 text-slate-300" />
              </div>
            )}
          </div>

          {/* Content Section - Clear, High-Contrast Typography */}
          <div className="p-4 sm:p-5 text-center flex-1 flex flex-col justify-center">
            <h3 
              className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 tracking-tight"
              itemProp="name"
            >
              {teacher.name}
            </h3>
            <p 
              className="text-xs sm:text-sm font-medium text-slate-500 mt-1 line-clamp-1"
              itemProp="jobTitle"
            >
              {teacher.designation}
            </p>

            {/* Department / Subject Badges (Clean Tone-on-Tone Pills) */}
            {((teacher.subjects && teacher.subjects.length > 0) || teacher.department) && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                {teacher.department && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100/60">
                    {teacher.department}
                  </span>
                )}
                {teacher.subjects && teacher.subjects.slice(0, 2).map((subject, sIdx) => (
                  <span 
                    key={sIdx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            )}
            
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