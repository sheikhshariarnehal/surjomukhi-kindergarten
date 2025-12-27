'use client';

import React, { useState, useEffect, use, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  GraduationCap,
  Award,
  Mail,
  Phone,
  Star,
  Globe,
  Loader2,
  AlertCircle,
  MapPin,
  Calendar,
  CheckCircle,
  Printer,
  Users
} from 'lucide-react';

// Types
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
  address?: string;
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

interface TeacherDetailsProps {
  params: Promise<{ slug: string }>;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3 }
};

// Utility functions
const createSlug = (name: string): string => 
  name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const getValidImageUrl = (url?: string): string | null => {
  if (!url) return null;
  if (url.startsWith('/') || url.startsWith('http')) return url;
  return `/${url}`;
};

// SEO Component
const TeacherSEO = React.memo(({ teacher, slug }: { teacher: TeacherData; slug: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://surjomukhi.edu.bd';
  const teacherUrl = `${baseUrl}/academic/teachers/${slug}`;
  const imageUrl = teacher.photo_url ? `${baseUrl}${teacher.photo_url}` : `${baseUrl}/og-teacher-default.jpg`;

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': teacherUrl,
    name: teacher.name,
    jobTitle: teacher.designation,
    description: teacher.bio || `${teacher.name} is a ${teacher.designation} at Surjomukhi Kindergarten with ${teacher.experience_years || 'several'} years of experience.`,
    email: teacher.contact_email,
    telephone: teacher.contact_phone,
    image: imageUrl,
    worksFor: {
      '@type': 'EducationalOrganization',
      '@id': `${baseUrl}/#organization`,
      name: 'Surjomukhi Kindergarten',
      url: baseUrl
    },
    hasCredential: teacher.qualifications?.map(qual => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: qual
    })),
    knowsAbout: teacher.subjects,
    award: teacher.achievements,
    address: teacher.address ? {
      '@type': 'PostalAddress',
      addressLocality: teacher.address
    } : undefined
  }), [teacher, teacherUrl, imageUrl, baseUrl]);

  return (
    <Head>
      <title>{teacher.name} - {teacher.designation} | Surjomukhi Kindergarten</title>
      <meta
        name="description"
        content={`Meet ${teacher.name}, ${teacher.designation} at Surjomukhi Kindergarten. ${teacher.bio || `Experienced educator with ${teacher.experience_years || 'several'} years in early childhood education.`}`}
      />
      <meta
        name="keywords"
        content={`${teacher.name}, ${teacher.designation}, Surjomukhi Kindergarten teacher, early childhood educator, ${teacher.subjects?.join(', ') || 'kindergarten teacher'}, qualified teacher`}
      />
      <meta property="og:title" content={`${teacher.name} - ${teacher.designation}`} />
      <meta property="og:description" content={`Meet ${teacher.name}, our dedicated ${teacher.designation} at Surjomukhi Kindergarten.`} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={teacherUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary" />
      <link rel="canonical" href={teacherUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
      />
    </Head>
  );
});

TeacherSEO.displayName = 'TeacherSEO';

// Contact Info Component
const ContactInfo = React.memo(({ teacher }: { teacher: TeacherData }) => {
  const contactItems = useMemo(() => [
    { icon: Mail, value: teacher.contact_email, type: 'email' },
    { icon: Phone, value: teacher.contact_phone, type: 'phone' },
    { icon: MapPin, value: teacher.address, type: 'address' },
    { icon: Calendar, value: teacher.join_date ? `Joined: ${teacher.join_date}` : null, type: 'date' }
  ].filter(item => item.value), [teacher]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-700">
      {contactItems.map(({ icon: Icon, value, type }) => (
        <div key={type} className="flex items-center justify-center lg:justify-start gap-2">
          <Icon className="h-4 w-4 text-slate-500 flex-shrink-0" />
          <span className="truncate">{value}</span>
        </div>
      ))}
    </div>
  );
});

ContactInfo.displayName = 'ContactInfo';

// Section Component
const Section = React.memo(({ 
  title, 
  icon: Icon, 
  children, 
  className = "" 
}: { 
  title: string; 
  icon?: React.ElementType; 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <section className={className}>
    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 uppercase tracking-wider border-b-2 border-slate-300 pb-2 flex items-center gap-2">
      {Icon && <Icon className="h-5 w-5" />}
      {title}
    </h3>
    {children}
  </section>
));

Section.displayName = 'Section';

// List Item Component
const ListItem = React.memo(({ 
  icon: Icon, 
  children, 
  iconColor = "text-slate-800" 
}: { 
  icon?: React.ElementType; 
  children: React.ReactNode; 
  iconColor?: string; 
}) => (
  <div className="flex items-start gap-3 sm:gap-4">
    {Icon ? (
      <Icon className={`h-4 w-4 ${iconColor} mt-1 flex-shrink-0`} />
    ) : (
      <div className="w-2 h-2 bg-slate-800 rounded-full mt-3 flex-shrink-0" />
    )}
    <div className="flex-1 text-sm sm:text-base leading-relaxed">{children}</div>
  </div>
));

ListItem.displayName = 'ListItem';

// Main Component
export default function TeacherDetailsPage({ params }: TeacherDetailsProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  // Memoized image URL
  const validImageUrl = useMemo(() => getValidImageUrl(teacher?.photo_url), [teacher?.photo_url]);
  const shouldShowImage = validImageUrl && !imageError;

  // Load teacher data with error handling and caching
  const loadTeacher = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/data/teachers.json', {
        headers: { 'Cache-Control': 'public, max-age=300' } // 5 minutes cache
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load teacher data`);
      }
      
      const data: TeachersData = await response.json();
      
      const foundTeacher = data.teachers.find(t => 
        t.id === slug || createSlug(t.name) === slug
      );
      
      if (!foundTeacher) {
        throw new Error('Teacher not found');
      }
      
      setTeacher(foundTeacher);
    } catch (err) {
      console.error('Error loading teacher:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Print handler
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Image error handler
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  useEffect(() => {
    loadTeacher();
  }, [loadTeacher]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading teacher information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Teacher Not Found</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            {error || 'The requested teacher could not be found.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-all duration-200 font-medium"
            >
              Go Back
            </button>
            <Link
              href="/academic/teachers"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 font-medium"
            >
              View All Teachers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <TeacherSEO teacher={teacher} slug={slug} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <motion.div {...fadeInLeft} className="mb-6 sm:mb-8">
            <Link
              href="/academic/teachers"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to Faculty</span>
            </Link>
          </motion.div>

          {/* CV Container */}
          <motion.article
            {...fadeInUp}
            className="bg-white shadow-2xl border border-slate-200 overflow-hidden print:shadow-none print:border-0"
            style={{ 
              fontFamily: '"Times New Roman", "Georgia", serif',
              lineHeight: '1.6'
            }}
          >
            {/* Header */}
            <header className="bg-white border-b-4 border-slate-800 px-6 sm:px-12 py-6 sm:py-8">
              <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                {/* Photo */}
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 bg-slate-100 border-2 border-slate-300 flex-shrink-0 mx-auto lg:mx-0">
                  {shouldShowImage ? (
                    <Image
                      src={validImageUrl}
                      alt={`${teacher.name} - ${teacher.designation}`}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 640px) 112px, 128px"
                      quality={95}
                      priority
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                      <User className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Header Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-wider leading-tight">
                    {teacher.name.toUpperCase()}
                  </h1>
                  <h2 className="text-lg sm:text-xl text-slate-700 mb-4 sm:mb-6 font-semibold tracking-wide">
                    {teacher.designation}
                  </h2>
                  <ContactInfo teacher={teacher} />
                </div>
              </div>
            </header>

            {/* Content */}
            <main className="px-6 sm:px-12 py-6 sm:py-8 space-y-8">
              {/* Professional Summary */}
              {teacher.bio && (
                <Section title="Professional Summary">
                  <p className="text-slate-700 leading-relaxed text-justify hyphens-auto text-sm sm:text-base">
                    {teacher.bio}
                  </p>
                </Section>
              )}

              {/* Teaching Philosophy */}
              {teacher.teaching_philosophy && (
                <Section title="Teaching Philosophy">
                  <blockquote className="text-slate-700 leading-relaxed italic border-l-4 border-slate-300 pl-4 sm:pl-6 text-justify hyphens-auto text-sm sm:text-base">
                    <span className="text-slate-500 text-lg">&ldquo;</span>
                    {teacher.teaching_philosophy}
                    <span className="text-slate-500 text-lg">&rdquo;</span>
                  </blockquote>
                </Section>
              )}

              {/* Education */}
              {teacher.qualifications && teacher.qualifications.length > 0 && (
                <Section title="Education & Qualifications" icon={GraduationCap}>
                  <div className="space-y-4">
                    {teacher.qualifications.map((qualification, index) => (
                      <ListItem key={index}>
                        <h4 className="font-semibold text-slate-900">{qualification}</h4>
                      </ListItem>
                    ))}
                  </div>
                </Section>
              )}

              {/* Experience */}
              <Section title="Professional Experience">
                <div className="space-y-4">
                  <ListItem>
                    <div>
                      <h4 className="font-semibold text-slate-900">{teacher.designation}</h4>
                      <p className="text-slate-600 font-medium">Surjomukhi Kindergarten</p>
                      {teacher.experience_years && (
                        <p className="text-sm text-slate-500 mb-2">
                          {teacher.experience_years} Years of Experience
                        </p>
                      )}
                      {teacher.specialization && (
                        <p className="text-slate-700 mt-2">
                          <strong className="font-semibold">Specialization:</strong> {teacher.specialization}
                        </p>
                      )}
                    </div>
                  </ListItem>
                </div>
              </Section>

              {/* Competencies Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Subjects */}
                {teacher.subjects && teacher.subjects.length > 0 && (
                  <Section title="Subjects Taught">
                    <div className="space-y-2">
                      {teacher.subjects.map((subject, index) => (
                        <ListItem key={index} icon={CheckCircle} iconColor="text-emerald-600">
                          {subject}
                        </ListItem>
                      ))}
                    </div>
                  </Section>
                )}

                {/* Classes */}
                {teacher.classes_taught && teacher.classes_taught.length > 0 && (
                  <Section title="Classes Taught">
                    <div className="space-y-2">
                      {teacher.classes_taught.map((cls, index) => (
                        <ListItem key={index} icon={CheckCircle} iconColor="text-blue-600">
                          {cls}
                        </ListItem>
                      ))}
                    </div>
                  </Section>
                )}
              </div>

              {/* Languages */}
              {teacher.languages && teacher.languages.length > 0 && (
                <Section title="Languages">
                  <div className="flex flex-wrap gap-4">
                    {teacher.languages.map((language, index) => (
                      <div key={index} className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-md">
                        <Globe className="h-4 w-4 text-teal-600" />
                        <span className="text-slate-700 font-medium text-sm sm:text-base">{language}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Certifications */}
              {teacher.certifications && teacher.certifications.length > 0 && (
                <Section title="Professional Certifications">
                  <div className="space-y-3">
                    {teacher.certifications.map((certification, index) => (
                      <ListItem key={index} icon={Award} iconColor="text-amber-600">
                        {certification}
                      </ListItem>
                    ))}
                  </div>
                </Section>
              )}

              {/* Achievements */}
              {teacher.achievements && teacher.achievements.length > 0 && (
                <Section title="Achievements & Recognition">
                  <div className="space-y-3">
                    {teacher.achievements.map((achievement, index) => (
                      <ListItem key={index} icon={Star} iconColor="text-amber-500">
                        {achievement}
                      </ListItem>
                    ))}
                  </div>
                </Section>
              )}

              {/* Footer */}
              <footer className="mt-12 pt-8 border-t-2 border-slate-300">
                <div className="text-center text-sm text-slate-500 space-y-1">
                  <p className="font-bold text-slate-700 tracking-widest">SURJOMUKHI KINDERGARTEN</p>
                  <p className="italic">Committed to Excellence in Early Childhood Education</p>
                  <p className="text-xs mt-2">Professional Curriculum Vitae</p>
                </div>
              </footer>
            </main>
          </motion.article>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center print:hidden"
          >
            <button
              onClick={handlePrint}
              className="bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print CV
            </button>
            <Link
              href="/academic/teachers"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
            >
              <Users className="h-4 w-4" />
              View All Faculty
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}