'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Teacher } from '@/types/teacher';

interface TeacherCardProps {
  teacher: Teacher;
  index?: number;
}

const TeacherCard = React.memo(({ teacher, index = 0 }: TeacherCardProps) => {
  const [imageError, setImageError] = React.useState(false);

  const teacherSlug =
    teacher.slug ||
    teacher.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const displaySubjects = teacher.subjects?.slice(0, 3) || [];
  const hasMoreSubjects = (teacher.subjects?.length || 0) > 3;

  // Validate and normalize image URL
  const getValidImageUrl = (url: string | undefined): string | null => {
    if (!url) return null;

    try {
      // Handle relative paths that start with '-'
      if (url.startsWith('-')) {
        return url.substring(1); // Remove the leading '-'
      }

      // Handle relative paths
      if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
        return url;
      }

      // Handle absolute URLs
      if (url.startsWith('http://') || url.startsWith('https://')) {
        // Validate URL format
        new URL(url); // This will throw if invalid
        return url;
      }

      // If it doesn't start with '/', assume it's a relative path
      return url.startsWith('/') ? url : `/${url}`;
    } catch {
      return null;
    }
  };

  const validImageUrl = getValidImageUrl(teacher.photo_url);
  const shouldShowImage = validImageUrl && !imageError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.01 }}
      className="group w-full"
    >
      <Link href={`/teachers/${teacherSlug}`} className="block h-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 h-full">
          {/* Left: Fixed square Profile Image (flex-none so it never stretches) */}
          <div className="p-4 flex-none">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-lg overflow-hidden bg-gray-50">
              {shouldShowImage ? (
                <Image
                  src={validImageUrl}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 160px"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 p-4 pt-0 sm:pt-5 flex flex-col justify-center text-center sm:text-left">
            {/* Name */}
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {teacher.name}
            </h3>

            {/* Designation */}
            <p className="text-sm text-gray-600 font-medium mt-1">
              {teacher.designation}
            </p>

            {/* Subjects: small, responsive chips
                - Mobile (default): single-row horizontal scroller (no-wrap)
                - sm and up: chips wrap normally
                - Chips are compact (text-xs, smaller padding), truncated with title attribute
            */}
            <div className="w-full mt-3">
              <div
                className="overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0"
                style={{ WebkitOverflowScrolling: 'touch' }}
                aria-hidden={false}
              >
                <div className="flex items-center gap-2 min-w-full sm:min-w-0 flex-nowrap sm:flex-wrap">
                  {displaySubjects.length > 0 ? (
                    <>
                      {displaySubjects.map((subject, idx) => (
                        <span
                          key={idx}
                          title={subject}
                          className="flex-shrink-0 text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium border border-gray-200 shadow-sm hover:bg-gray-200 transition-colors max-w-[9rem] sm:max-w-[12rem] truncate inline-block"
                          aria-label={subject}
                        >
                          {subject}
                        </span>
                      ))}

                      {hasMoreSubjects && (
                        <span
                          className="flex-shrink-0 text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium border border-blue-200 shadow-sm inline-block"
                          aria-label={`${(teacher.subjects?.length || 0) - 3} more subjects`}
                          title={`${(teacher.subjects?.length || 0) - 3} more subjects`}
                        >
                          +{(teacher.subjects?.length || 0) - 3}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="flex-shrink-0 text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200 shadow-sm inline-block">
                      General Education
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

TeacherCard.displayName = 'TeacherCard';

export default TeacherCard;