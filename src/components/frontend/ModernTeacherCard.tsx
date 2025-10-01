'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Calendar } from 'lucide-react';
import { Teacher } from '@/types/teacher';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t, language } = useLanguage();

  // Memoize translation with fallback
  const experienceText = useMemo(() => {
    return t('teachers.experience') || (language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'years experience');
  }, [t, language]);

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

  // Optimized animation variants - reduced motion for better performance
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        delay: Math.min(index * 0.03, 0.3), // Cap delay to prevent too much stagger
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
        itemScope
        itemType="https://schema.org/Person"
      >
        <article className="bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 group-hover:border-blue-300 h-full flex flex-col">
          {/* Optimized Image Section with lazy loading */}
          <div className="relative aspect-[3/2] sm:aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
            {shouldShowImage ? (
              <Image
                src={validImageUrl}
                alt={`${teacher.name} - ${teacher.designation} at Surjomukhi Kindergarten`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={index < 4 ? "eager" : "lazy"} // Eager load first 4, lazy load rest
                quality={85} // Optimize quality
                onError={() => setImageError(true)}
                itemProp="image"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300" />
              </div>
            )}
          </div>

          {/* SEO-Optimized Content Section */}
          <div className="p-3 sm:p-4 space-y-2 flex-grow flex flex-col">
            {/* Name and Designation with structured data */}
            <div className="space-y-0.5 flex-grow">
              <h3 
                className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1"
                itemProp="name"
              >
                {teacher.name}
              </h3>
              <p 
                className="text-xs sm:text-sm text-gray-500 line-clamp-1"
                itemProp="jobTitle"
              >
                {teacher.designation}
              </p>
              
              {/* Hidden SEO metadata */}
              <meta itemProp="worksFor" content="Surjomukhi Kindergarten" />
              {teacher.qualifications && teacher.qualifications.length > 0 && (
                <meta itemProp="hasCredential" content={teacher.qualifications.join(', ')} />
              )}
            </div>

            {/* Experience with semantic markup */}
            {teacher.experience_years && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                <span itemProp="experienceLevel">
                  {teacher.experience_years}+ {experienceText}
                </span>
              </div>
            )}

            {/* Subjects - Optimized Display with keywords */}
            {displaySubjects.length > 0 && (
              <div className="flex flex-wrap gap-1" role="list" aria-label="Subjects taught">
                {displaySubjects.map((subject, idx) => (
                  <span
                    key={idx}
                    role="listitem"
                    className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded border border-blue-100 transition-colors hover:bg-blue-100"
                    title={subject}
                    itemProp="knowsAbout"
                  >
                    {subject.length > 12 ? `${subject.substring(0, 12)}...` : subject}
                  </span>
                ))}
                {hasMoreSubjects && (
                  <span 
                    className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-50 text-gray-500 rounded border border-gray-100"
                    title={`${remainingSubjectsCount} more subject${remainingSubjectsCount > 1 ? 's' : ''}`}
                  >
                    +{remainingSubjectsCount}
                  </span>
                )}
              </div>
            )}

            {/* Optional Contact Info - Very Compact */}
            {showContactInfo && teacher.contact_email && (
              <div className="pt-2 mt-auto border-t border-gray-100">
                <p className="text-xs text-gray-400 truncate" itemProp="email">
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