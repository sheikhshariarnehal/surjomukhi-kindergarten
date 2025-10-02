'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TeacherData {
  id: string;
  name: string;
  designation: string;
  photo_url?: string;
  subjects?: string[];
  experience_years?: number;
  specialization?: string;
  classes_taught?: string[];
}

interface SimpleTeacherCardProps {
  teacher: TeacherData;
  index?: number;
}

const SimpleTeacherCard = React.memo(({ teacher, index = 0 }: SimpleTeacherCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

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

  // Format experience display
  const experienceText = teacher.experience_years 
    ? `${teacher.experience_years}+ Years Experience`
    : 'Experienced Educator';

  // Show only first 2 subjects
  const displaySubjects = teacher.subjects?.slice(0, 2) || [];
  const hasMoreSubjects = (teacher.subjects?.length || 0) > 2;

  // Generate teacher slug for URL
  const teacherSlug = teacher.id || teacher.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.3 } }}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 overflow-hidden transition-all duration-300 h-full flex flex-col w-full max-w-xs mx-auto"
      role="article"
      aria-label={`${teacher.name} - ${teacher.designation}`}
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Profile Image Section */}
      <div className="relative pt-4 pb-3 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="flex justify-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ring-2 ring-white shadow-sm group-hover:shadow-md transition-all duration-300">
            {shouldShowImage ? (
              <Image
                src={validImageUrl}
                alt={`${teacher.name} - ${teacher.designation} - সুর্যমুখী কিন্ডারগার্টেন`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 64px, 80px"
                loading={index < 6 ? 'eager' : 'lazy'}
                quality={85}
                onError={() => setImageError(true)}
                itemProp="image"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100">
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
              </div>
            )}
            {/* Online status indicator */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 px-4 py-3 flex flex-col">
        {/* Academic Information */}
        <div className="text-center mb-3 flex-1">
          <h3 
            className="text-base sm:text-lg font-semibold text-gray-900 mb-1 leading-tight font-serif group-hover:text-teal-700 transition-colors duration-300"
            itemProp="name"
          >
            {teacher.name}
          </h3>
          
          <p 
            className="text-xs sm:text-sm text-gray-600 font-medium mb-3 leading-relaxed"
            itemProp="jobTitle"
          >
            {teacher.designation}
          </p>

          {/* Academic Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-md shadow-sm">
            <Calendar className="h-3 w-3 text-teal-600" />
            <span className="text-xs font-medium text-teal-800">
              {teacher.experience_years ? 
                `${teacher.experience_years} ${t('teachersCard.yearsExperience', 'বছর অভিজ্ঞতা')}` : 
                t('teachersCard.experiencedTeacher', 'অভিজ্ঞ শিক্ষক')
              }
            </span>
          </div>
        </div>

        {/* Professional Action */}
        <div className="mt-auto border-t border-gray-100 pt-3">
          <Link
            href={`/academic/teachers/${teacherSlug}`}
            className="inline-flex items-center justify-center w-full gap-1.5 text-white font-medium text-sm py-2 px-3 rounded-md bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1 group/btn shadow-sm hover:shadow-md"
            aria-label={`${teacher.name} এর বিস্তারিত তথ্য দেখুন`}
            title={`${teacher.name} - ${teacher.designation} - সুর্যমুখী কিন্ডারগার্টেন`}
          >
            <span className="font-medium">{t('teachersCard.viewDetails', 'বিস্তারিত দেখুন')}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
});

SimpleTeacherCard.displayName = 'SimpleTeacherCard';

export default SimpleTeacherCard;
