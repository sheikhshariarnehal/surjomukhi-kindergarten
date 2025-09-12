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

export default function TeacherCard({ teacher, index = 0 }: TeacherCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -4,
      transition: {
        duration: 0.3
      }
    }
  };

  // Generate slug from name if not provided
  const teacherSlug = teacher.slug || teacher.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group w-full"
    >
      <Link href={`/teachers/${teacherSlug}`}>
        <motion.div
          variants={hoverVariants}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer h-full"
        >
          <div className="flex items-center p-4 sm:p-6 min-h-[120px] sm:min-h-[140px]">
            {/* Profile Photo - Left Side */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 mr-4 sm:mr-6">
              {teacher.photo_url ? (
                <Image
                  src={teacher.photo_url}
                  alt={`${teacher.name} - ${teacher.designation}`}
                  fill
                  className="object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                </div>
              )}
            </div>

            {/* Teacher Information - Right Side */}
            <div className="flex-1 min-w-0 pr-2 sm:pr-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                <span className="block sm:hidden">
                  {teacher.name.length > 15 ? `${teacher.name.substring(0, 15)}...` : teacher.name}
                </span>
                <span className="hidden sm:block">
                  {teacher.name.length > 25 ? `${teacher.name.substring(0, 25)}...` : teacher.name}
                </span>
              </h3>
              <p className="text-blue-600 font-medium text-xs sm:text-sm leading-tight mb-1">
                <span className="block sm:hidden">
                  {teacher.designation && teacher.designation.length > 12 ? `${teacher.designation.substring(0, 12)}...` : teacher.designation}
                </span>
                <span className="hidden sm:block">
                  {teacher.designation && teacher.designation.length > 20 ? `${teacher.designation.substring(0, 20)}...` : teacher.designation}
                </span>
              </p>
              {teacher.department && (
                <p className="text-gray-500 text-xs leading-tight">
                  <span className="block sm:hidden">
                    {teacher.department.length > 10 ? `${teacher.department.substring(0, 10)}...` : teacher.department}
                  </span>
                  <span className="hidden sm:block">
                    {teacher.department.length > 18 ? `${teacher.department.substring(0, 18)}...` : teacher.department}
                  </span>
                </p>
              )}
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
