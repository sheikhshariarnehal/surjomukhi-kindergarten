'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight } from 'lucide-react';
import ModernTeacherCard from './ModernTeacherCard';
import { useTeachers } from '@/hooks/useTeachers';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TeacherPreview() {
  const { teachers, loading, error } = useTeachers({
    limit: 4,
    autoFetch: true
  });
  
  const { language } = useLanguage();

  const title = language === 'bn' ? 'আমাদের নিবেদিতপ্রাণ শিক্ষকদের সাথে পরিচিত হন' : 'Meet Our Dedicated Teachers';
  const subtitle = language === 'bn' 
    ? 'আমাদের অভিজ্ঞ এবং যোগ্য শিক্ষকমণ্ডলী উৎকৃষ্ট প্রাথমিক শিক্ষা প্রদান এবং কোমলমতি শিশুদের লালন-পালনে প্রতিশ্রুতিবদ্ধ।'
    : 'Our experienced and qualified faculty members are committed to providing excellent early childhood education and nurturing young minds.';

  if (loading) {
    return (
      <section className="py-16 bg-gray-50" aria-label="Loading teachers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="aspect-square bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {language === 'bn' ? 'শিক্ষক তথ্য লোড করতে সমস্যা হচ্ছে' : 'Unable to load teacher information'}
          </p>
        </div>
      </section>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Surjomukhi Kindergarten",
    "employee": teachers.map(teacher => ({
      "@type": "Person",
      "name": teacher.name,
      "jobTitle": teacher.designation,
      "worksFor": "Surjomukhi Kindergarten"
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section 
        className="py-16 bg-gray-50"
        itemScope 
        itemType="https://schema.org/EducationalOrganization"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              itemProp="name"
            >
              {title}
            </h2>
            <p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              itemProp="description"
            >
              {subtitle}
            </p>
          </header>

          {teachers.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                {language === 'bn' ? 'কোন শিক্ষকের তথ্য পাওয়া যায়নি' : 'No teachers found'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {teachers.map((teacher, index) => (
                  <ModernTeacherCard
                    key={teacher.id}
                    teacher={teacher}
                    index={index}
                  />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/teachers"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  View All Teachers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
