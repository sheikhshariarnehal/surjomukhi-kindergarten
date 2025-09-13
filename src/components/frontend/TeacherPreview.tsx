'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GraduationCap, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import ModernTeacherCard from './ModernTeacherCard';
import { useTeachers } from '@/hooks/useTeachers';

export default function TeacherPreview() {
  const { teachers, loading, error } = useTeachers({
    limit: 4,
    autoFetch: true
  });

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading our amazing teachers...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-2">Failed to load teachers</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Dedicated Teachers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced and qualified faculty members are committed to providing excellent
            early childhood education and nurturing young minds.
          </p>
        </motion.div>

        {teachers.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">No teachers available at the moment</p>
            <p className="text-gray-500 text-sm mt-1">Check back soon to meet our amazing faculty!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {teachers.map((teacher, index) => (
              <ModernTeacherCard
                key={teacher.id}
                teacher={teacher}
                index={index}
                variant="default"
              />
            ))}
          </div>
        )}

        {/* View All Teachers Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/teachers"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View All Teachers
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
