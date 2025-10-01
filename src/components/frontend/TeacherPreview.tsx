'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GraduationCap, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import ModernTeacherCard from './ModernTeacherCard';
import { useTeachers } from '@/hooks/useTeachers';

// Memoized container variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function TeacherPreview() {
  const { teachers, loading, error } = useTeachers({
    limit: 4,
    autoFetch: true
  });

  // Memoize schema.org structured data for SEO optimization
  const structuredData = useMemo(() => {
    if (teachers.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Surjomukhi Kindergarten",
      "description": "Experienced and qualified faculty members committed to excellent early childhood education",
      "employee": teachers.map(teacher => ({
        "@type": "Person",
        "name": teacher.name,
        "jobTitle": teacher.designation,
        "worksFor": {
          "@type": "EducationalOrganization",
          "name": "Surjomukhi Kindergarten"
        },
        ...(teacher.qualifications && teacher.qualifications.length > 0 && { 
          "hasCredential": teacher.qualifications.join(', ') 
        }),
        ...(teacher.experience_years && { 
          "yearsOfExperience": teacher.experience_years 
        }),
        ...(teacher.subjects && teacher.subjects.length > 0 && {
          "knowsAbout": teacher.subjects
        })
      }))
    };
  }, [teachers]);

  // Optimized loading skeleton with better UX
  if (loading) {
    return (
      <section 
        className="py-16 lg:py-20" 
        style={{ backgroundColor: '#FAFCFD' }}
        aria-label="Loading teachers section"
        aria-busy="true"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded-lg w-2/3 md:w-1/2 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-100 rounded-lg w-3/4 md:w-2/3 mx-auto animate-pulse" />
          </div>
          
          {/* Loading skeleton cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-100 rounded w-16 animate-pulse" />
                    <div className="h-6 bg-gray-100 rounded w-20 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state with retry option
  if (error) {
    return (
      <section 
        className="py-16 lg:py-20" 
        style={{ backgroundColor: '#FAFCFD' }}
        aria-labelledby="teachers-error-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" role="alert" aria-live="assertive">
            <AlertCircle 
              className="h-12 w-12 text-red-500 mx-auto mb-4" 
              aria-hidden="true"
            />
            <h2 id="teachers-error-heading" className="text-xl font-semibold text-red-600 mb-2">
              Unable to Load Teachers
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              We're having trouble loading our teacher profiles. Please refresh the page or try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* SEO: Inject structured data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <section 
        className="py-16 lg:py-20" 
        style={{ backgroundColor: '#FAFCFD' }}
        aria-labelledby="teachers-heading"
        itemScope 
        itemType="https://schema.org/EducationalOrganization"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SEO-Optimized Header Section */}
          <motion.header
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 
              id="teachers-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
              itemProp="name"
            >
              Meet Our Dedicated Teachers
            </h2>
            <p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              itemProp="description"
            >
              Our experienced and qualified faculty members are committed to providing excellent
              early childhood education and nurturing young minds with care and dedication.
            </p>
            
            {/* SEO: Additional context for search engines */}
            <meta itemProp="numberOfEmployees" content={teachers.length.toString()} />
            <meta itemProp="employerType" content="Educational Institution" />
          </motion.header>

        {/* Teachers Grid or Empty State */}
        {teachers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-4" 
            role="status"
          >
            <GraduationCap 
              className="h-16 w-16 text-gray-300 mx-auto mb-4" 
              aria-hidden="true"
            />
            <p className="text-gray-600 text-lg font-medium mb-2">
              No teachers available at the moment
            </p>
            <p className="text-gray-500 text-sm">
              Check back soon to meet our amazing faculty!
            </p>
          </motion.div>
        ) : (
          <>
            {/* Optimized Grid with better responsive breakpoints */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr"
              role="list"
              aria-label="Featured teachers"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              {teachers.map((teacher, index) => (
                <div 
                  key={teacher.id} 
                  role="listitem" 
                  itemProp="itemListElement"
                  className="h-full"
                >
                  <ModernTeacherCard
                    teacher={teacher}
                    index={index}
                  />
                </div>
              ))}
            </motion.div>

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
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:visible"
                aria-label="View all teachers page"
                title="View complete list of our teachers"
              >
                View All Teachers
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
    </>
  );
}