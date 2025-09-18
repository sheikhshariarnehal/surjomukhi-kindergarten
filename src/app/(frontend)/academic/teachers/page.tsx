'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Users, GraduationCap, Award, BookOpen } from 'lucide-react';
import SimpleTeacherCard from '@/components/frontend/SimpleTeacherCard';

// Teacher data interface
interface TeacherData {
  id: string;
  name: string;
  designation: string;
  photo_url?: string;
  bio?: string;
  qualifications?: string[];
  subjects?: string[];
  experience_years?: number;
  specialization?: string;
  classes_taught?: string[];
  contact_email?: string;
  contact_phone?: string;
  join_date?: string;
  achievements?: string[];
  teaching_philosophy?: string;
  certifications?: string[];
  languages?: string[];
}

interface TeachersData {
  teachers: TeacherData[];
  metadata: {
    total_teachers: number;
    last_updated: string;
    version: string;
    description: string;
  };
}

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-16">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-4" />
      <p className="text-gray-600">Loading our amazing teachers...</p>
    </div>
  </div>
);

// Error component
const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex items-center justify-center py-16">
    <div className="text-center max-w-md">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Teachers</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);



export default function TeachersPage() {
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load teacher data
  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/data/teachers.json');
      if (!response.ok) {
        throw new Error('Failed to load teacher data');
      }

      const data: TeachersData = await response.json();
      setTeachers(data.teachers);
    } catch (err) {
      console.error('Error loading teachers:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!teachers.length) return {};

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://surjomukhi.edu.bd';

    return {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      '@id': `${baseUrl}/#organization`,
      name: 'Surjomukhi Kindergarten',
      alternateName: 'Surjomukhi KG',
      url: baseUrl,
      description: 'Meet our qualified and experienced teachers dedicated to providing quality early childhood education at Surjomukhi Kindergarten.',
      employee: teachers.map(teacher => ({
        '@type': 'Person',
        '@id': `${baseUrl}/teachers/${teacher.id}`,
        name: teacher.name,
        jobTitle: teacher.designation,
        description: teacher.bio,
        email: teacher.contact_email,
        telephone: teacher.contact_phone,
        image: teacher.photo_url ? `${baseUrl}${teacher.photo_url}` : undefined,
        worksFor: {
          '@type': 'EducationalOrganization',
          '@id': `${baseUrl}/#organization`,
          name: 'Surjomukhi Kindergarten'
        },
        hasCredential: teacher.qualifications?.map(qual => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: qual
        })),
        knowsAbout: teacher.subjects,
        award: teacher.achievements,
        alumniOf: teacher.qualifications?.map(qual => ({
          '@type': 'EducationalOrganization',
          name: qual
        }))
      })),
      numberOfEmployees: teachers.length,
      department: [
        {
          '@type': 'Organization',
          name: 'Early Childhood Education Department',
          employee: teachers.filter(t => t.classes_taught?.some(c => ['Play Group', 'Nursery'].includes(c)))
        },
        {
          '@type': 'Organization',
          name: 'Primary Education Department',
          employee: teachers.filter(t => t.classes_taught?.some(c => ['Class One', 'Class Two', 'Class Three', 'Class Four', 'Class Five'].includes(c)))
        }
      ]
    };
  };

  // Custom SEO Head component
  const TeachersSEO = () => (
    <Head>
      <title>শিক্ষকমণ্ডলী | সুর্যমুখী কিন্ডারগার্টেন - অভিজ্ঞ ও যোগ্য শিক্ষকবৃন্দ</title>
      <meta
        name="description"
        content="সুর্যমুখী কিন্ডারগার্টেনের অভিজ্ঞ ও যোগ্য শিক্ষকমণ্ডলীর সাথে পরিচিত হন। আমাদের শিক্ষকরা শিশুদের সার্বিক বিকাশে নিবেদিত এবং প্রাথমিক শিক্ষায় বিশেষজ্ঞ।"
      />
      <meta
        name="keywords"
        content="সুর্যমুখী কিন্ডারগার্টেন শিক্ষক, কিন্ডারগার্টেন শিক্ষকমণ্ডলী, অভিজ্ঞ শিক্ষক, যোগ্য শিক্ষক, প্রাথমিক শিক্ষা, শিশু শিক্ষা বিশেষজ্ঞ, teachers, faculty, qualified educators, early childhood specialists"
      />

      {/* Open Graph */}
      <meta property="og:title" content="শিক্ষকমণ্ডলী - সুর্যমুখী কিন্ডারগার্টেন" />
      <meta property="og:description" content="সুর্যমুখী কিন্ডারগার্টেনের অভিজ্ঞ ও যোগ্য শিক্ষকমণ্ডলীর সাথে পরিচিত হন। আমাদের শিক্ষকরা শিশুদের সার্বিক বিকাশে নিবেদিত।" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="/academic/teachers" />
      <meta property="og:image" content="/og-teachers.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="সুর্যমুখী কিন্ডারগার্টেন শিক্ষকমণ্ডলী" />
      <meta property="og:locale" content="bn_BD" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="শিক্ষকমণ্ডলী - সুর্যমুখী কিন্ডারগার্টেন" />
      <meta name="twitter:description" content="আমাদের অভিজ্ঞ ও যোগ্য শিক্ষকমণ্ডলীর সাথে পরিচিত হন।" />
      <meta name="twitter:image" content="/twitter-teachers.jpg" />

      {/* Canonical URL */}
      <link rel="canonical" href="/academic/teachers" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(), null, 2)
        }}
      />
    </Head>
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TeachersSEO />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li><a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a></li>
                <li><span className="text-gray-400">/</span></li>
                <li><a href="/academic" className="text-gray-500 hover:text-gray-700 transition-colors">Academic</a></li>
                <li><span className="text-gray-400">/</span></li>
                <li><span className="text-gray-900 font-medium">Our Teachers</span></li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section
          className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16"
          aria-labelledby="page-title"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 id="page-title" className="text-4xl md:text-5xl font-bold mb-6">
                Our Dedicated Teachers
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Meet our qualified and passionate educators who are committed to nurturing your child's growth and development.
              </p>
            </div>
          </div>
        </section>

        <LoadingSpinner />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TeachersSEO />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li><a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a></li>
                <li><span className="text-gray-400">/</span></li>
                <li><a href="/academic" className="text-gray-500 hover:text-gray-700 transition-colors">Academic</a></li>
                <li><span className="text-gray-400">/</span></li>
                <li><span className="text-gray-900 font-medium">Our Teachers</span></li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Dedicated Teachers</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Meet our qualified and passionate educators who are committed to nurturing your child's growth and development.
              </p>
            </div>
          </div>
        </section>

        <ErrorMessage message={error} onRetry={loadTeachers} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TeachersSEO />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-teal-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb navigation">
            <ol className="flex items-center space-x-4" role="list">
              <li role="listitem">
                <a
                  href="/"
                  className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                  aria-label="Go to homepage"
                >
                  Home
                </a>
              </li>
              <li role="listitem" aria-hidden="true">
                <span className="text-gray-400">/</span>
              </li>
              <li role="listitem">
                <a
                  href="/academic"
                  className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                  aria-label="Go to academic section"
                >
                  Academic
                </a>
              </li>
              <li role="listitem" aria-hidden="true">
                <span className="text-gray-400">/</span>
              </li>
              <li role="listitem">
                <span className="text-gray-900 font-medium" aria-current="page">Our Teachers</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Our Dedicated Teachers</h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
              Meet our qualified and passionate educators who are committed to nurturing your child's growth and development.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mt-6 sm:mt-8">
              <div className="text-center min-w-[120px]">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">{teachers.length}</div>
                <div className="text-teal-100 text-xs sm:text-sm">Expert Teachers</div>
              </div>
              <div className="text-center min-w-[120px]">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                  {Math.round(teachers.reduce((sum, t) => sum + (t.experience_years || 0), 0) / teachers.length)}+
                </div>
                <div className="text-teal-100 text-xs sm:text-sm">Avg. Years Experience</div>
              </div>
              <div className="text-center min-w-[120px]">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                  {teachers.reduce((sum, t) => sum + (t.subjects?.length || 0), 0)}
                </div>
                <div className="text-teal-100 text-xs sm:text-sm">Subject Areas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <main id="main-content" role="main">
        <section
          className="py-8 sm:py-12 lg:py-16 bg-white"
          aria-labelledby="faculty-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <h2 id="faculty-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Experienced & Qualified Faculty
              </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our teachers are carefully selected for their expertise, experience, and passion for early childhood education.
              Each brings unique skills and dedication to creating the best learning environment for our students.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 min-w-[140px] justify-center">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{teachers.length} Expert Educators</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 min-w-[140px] justify-center">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Advanced Qualifications</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 min-w-[140px] justify-center">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Certified Specialists</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 min-w-[140px] justify-center">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Diverse Subject Areas</span>
              </div>
            </div>
          </motion.div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {teachers.map((teacher, index) => (
              <div key={teacher.id} className="flex justify-center">
                <SimpleTeacherCard
                  teacher={teacher}
                  index={index}
                />
              </div>
            ))}
          </div>

          {/* Load more button for future pagination */}
          {teachers.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-600 text-sm">
                Showing all {teachers.length} teachers
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-10 sm:py-12 lg:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Teaching Philosophy
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Our teachers share a common commitment to excellence in early childhood education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Nurturing Care</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Creating a loving and supportive environment</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Individual Focus</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Recognizing each child's unique needs and potential</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Growth Mindset</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Encouraging continuous learning and development</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Partnership</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Working closely with parents and families</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Meet Our Teachers in Person
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
            Schedule a visit to meet our dedicated teaching team and see how they create magical learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md sm:max-w-none mx-auto">
            <a
              href="/contact"
              className="bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-center min-h-[48px] sm:min-h-[56px] flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Schedule a Visit
            </a>
            <a
              href="/admission"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 text-center min-h-[48px] sm:min-h-[56px] flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Apply for Admission
            </a>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}
