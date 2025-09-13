'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, ChevronRight } from 'lucide-react';
import { Teacher } from '@/types/teacher';

interface TeacherCardProps {
  teacher: Teacher;
  index?: number;
}

export default function TeacherCard({ teacher, index = 0 }: TeacherCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.08,
      }
    }
  };

  // Generate slug from name if not provided
  const teacherSlug = teacher.slug || teacher.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Format subjects for display - show max 2 subjects
  const displaySubjects = teacher.subjects?.slice(0, 2) || [];
  const hasMoreSubjects = teacher.subjects?.length > 2;

  // Professional compact design - default variant
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      className="group w-full"
    >
      <Link href={`/teachers/${teacherSlug}`}>
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 cursor-pointer h-full">
          {/* Header with Photo */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-4 text-center">
            <div className="relative w-16 h-16 mx-auto mb-3">
              {teacher.photo_url ? (
                <Image
                  src={teacher.photo_url}
                  alt={`${teacher.name} - ${teacher.designation}`}
                  fill
                  className="object-cover rounded-full border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-200"
                  sizes="64px"
                  loading="lazy"
                  quality={85}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <User className="h-7 w-7 text-blue-600" />
                </div>
              )}
            </div>

            {/* Name and Designation */}
            <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
              {teacher.name}
            </h3>
            <p className="text-xs text-blue-600 font-medium line-clamp-1">
              {teacher.designation}
            </p>
          </div>

          {/* Subjects */}
          <div className="p-3">
            {displaySubjects.length > 0 ? (
              <div className="flex flex-wrap gap-1 justify-center">
                {displaySubjects.map((subject, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md font-medium"
                  >
                    {subject}
                  </span>
                ))}
                {hasMoreSubjects && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">
                    +{teacher.subjects.length - 2}
                  </span>
                )}
              </div>
            ) : (
              <div className="text-center">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                  General Education
                </span>
              </div>
            )}
          </div>

          {/* View Profile Indicator */}
          <div className="px-3 pb-3">
            <div className="flex items-center justify-center text-blue-600 text-xs font-medium group-hover:text-blue-700 transition-colors duration-200">
              <span>View Profile</span>
              <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
