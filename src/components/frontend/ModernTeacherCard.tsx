'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Calendar } from 'lucide-react';
import { Teacher } from '@/types/teacher';

interface ModernTeacherCardProps {
  teacher: Teacher;
  index?: number;
  showContactInfo?: boolean;
}

const ModernTeacherCard = React.memo(({ 
  teacher, 
  index = 0,
  showContactInfo = false 
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

  // Optimize subjects display - max 2 subjects for compact design
  const displaySubjects = teacher.subjects?.slice(0, 2) || [];
  const hasMoreSubjects = (teacher.subjects?.length || 0) > 2;
  const remainingSubjectsCount = (teacher.subjects?.length || 0) - 2;

  // Simplified animation variants for better performance
  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="group"
    >
      <Link 
        href={`/teachers/${teacherSlug}`} 
        className="block focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 rounded-lg"
        aria-label={`View ${teacher.name}'s profile`}
      >
        <article className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-shadow duration-200 group-hover:border-blue-200">
          {/* Compact Image Section */}
          <div className="relative aspect-[3/2] sm:aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
            {shouldShowImage ? (
              <Image
                src={validImageUrl}
                alt={teacher.name}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4} // Priority load for first 4 cards
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-gray-300" />
              </div>
            )}
          </div>

          {/* Compact Content Section */}
          <div className="p-3 sm:p-4 space-y-2">
            {/* Name and Designation */}
            <div className="space-y-0.5">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {teacher.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                {teacher.designation}
              </p>
            </div>

            {/* Experience */}
            {teacher.experience_years && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>{teacher.experience_years}+ years</span>
              </div>
            )}

            {/* Subjects - Compact Display */}
            {displaySubjects.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {displaySubjects.map((subject, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded border border-blue-100"
                    title={subject}
                  >
                    {subject.length > 12 ? `${subject.substring(0, 12)}...` : subject}
                  </span>
                ))}
                {hasMoreSubjects && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-50 text-gray-500 rounded border border-gray-100">
                    +{remainingSubjectsCount}
                  </span>
                )}
              </div>
            )}

            {/* Optional Contact Info - Very Compact */}
            {showContactInfo && teacher.contact_email && (
              <div className="pt-1 border-t border-gray-50">
                <p className="text-xs text-gray-400 truncate">
                  {teacher.contact_email}
                </p>
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
});

ModernTeacherCard.displayName = 'ModernTeacherCard';

export default ModernTeacherCard;