'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Calendar, ArrowRight } from 'lucide-react';

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
      whileHover={{ y: -2, transition: { duration: 0.3 } }}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-300 h-full flex flex-col max-w-xs mx-auto"
      role="article"
      aria-label={`${teacher.name} - ${teacher.designation}`}
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Profile Image Section */}
      <div className="relative pt-6 pb-4 px-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="flex justify-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-100 ring-3 ring-white shadow-sm">
            {shouldShowImage ? (
              <Image
                src={validImageUrl}
                alt={`${teacher.name} - ${teacher.designation} - সুর্যমুখী কিন্ডারগার্টেন`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80px, 96px"
                loading={index < 6 ? 'eager' : 'lazy'}
                quality={85}
                onError={() => setImageError(true)}
                itemProp="image"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 px-6 py-5 flex flex-col">
        {/* Academic Information */}
        <div className="text-center mb-4 flex-1">
          <h3 
            className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight font-serif"
            itemProp="name"
          >
            {teacher.name}
          </h3>
          
          <p 
            className="text-sm text-gray-600 font-medium mb-3 leading-relaxed"
            itemProp="jobTitle"
          >
            {teacher.designation}
          </p>

          {/* Academic Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md">
            <Calendar className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              {teacher.experience_years ? `${teacher.experience_years} বছর অভিজ্ঞতা` : 'অভিজ্ঞ শিক্ষক'}
            </span>
          </div>
        </div>

        {/* Professional Action */}
        <div className="mt-auto border-t border-gray-100 pt-4">
          <Link
            href={`/academic/teachers/${teacherSlug}`}
            className="inline-flex items-center justify-center w-full gap-2 text-gray-700 font-medium text-sm py-2.5 px-4 rounded-md border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-400 group/btn"
            aria-label={`${teacher.name} এর বিস্তারিত তথ্য দেখুন`}
            title={`${teacher.name} - ${teacher.designation} - সুর্যমুখী কিন্ডারগার্টেন`}
          >
            <span className="font-medium">বিস্তারিত দেখুন</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
});

SimpleTeacherCard.displayName = 'SimpleTeacherCard';

export default SimpleTeacherCard;
