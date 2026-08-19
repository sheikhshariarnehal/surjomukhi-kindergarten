'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight, Users } from 'lucide-react';
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
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" aria-label="Loading teachers" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded-xl w-1/2 mx-auto mb-4"></div>
              <div className="h-5 bg-gray-200 rounded-lg w-3/4 mx-auto mb-10"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="aspect-square bg-gray-200 rounded-xl animate-pulse mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
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
      <section className="py-16 sm:py-20 lg:py-24" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-lg">
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
        className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
        itemScope 
        itemType="https://schema.org/EducationalOrganization"
        style={{
          background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)',
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <header className="text-center mb-10 sm:mb-14">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight"
              itemProp="name"
            >
              {title}
            </h2>
            <p 
              className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              itemProp="description"
            >
              {subtitle}
            </p>
          </header>

          {teachers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-10 w-10 text-gray-300" />
              </div>
              <p className="text-gray-600 text-lg">
                {language === 'bn' ? 'কোন শিক্ষকের তথ্য পাওয়া যায়নি' : 'No teachers found'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
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
                  className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 sm:px-9 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 touch-manipulation"
                >
                  {language === 'bn' ? 'সকল শিক্ষক দেখুন' : 'View All Teachers'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
