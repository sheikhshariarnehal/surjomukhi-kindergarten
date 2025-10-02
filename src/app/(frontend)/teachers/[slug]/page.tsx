'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Mail, 
  Phone,
  Award,
  Clock,
  Loader2,
  AlertCircle,
  Star,
  CheckCircle,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Teacher } from '@/types/teacher';

// Constants for optimization
const ANIMATION_CONFIG = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        duration: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut" as const
      }
    }
  }
} as const;

const DISPLAY_LIMITS = {
  qualifications: 4,
  achievements: 4,
  certifications: 6
};

// Custom hooks for better code organization
const useTeacherData = (slug: string) => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeacher = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/teachers/${slug}`, {
        headers: {
          'Cache-Control': 'max-age=300' // 5 minutes cache
        }
      });

      if (!response.ok) {
        throw new Error(
          response.status === 404 
            ? 'Teacher not found' 
            : `Failed to fetch teacher data (${response.status})`
        );
      }

      const data = await response.json();
      setTeacher(data.teacher);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load teacher profile');
      console.error('Teacher fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchTeacher();
    }
  }, [slug, fetchTeacher]);

  return { teacher, loading, error, refetch: fetchTeacher };
};

// Utility functions
const getOptimizedImageUrl = (url: string | undefined): string | null => {
  if (!url?.trim()) return null;
  
  // Handle various URL formats
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return url;
  if (url.startsWith('-')) return url.substring(1);
  
  return `/${url}`;
};

const formatJoinDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Unknown';
  }
};

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Component for error and loading states
const StatusDisplay: React.FC<{
  type: 'loading' | 'error';
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
}> = ({ type, message, onRetry, onBack }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      {type === 'loading' ? (
        <>
          <div className="relative mb-6">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
            <div className="absolute inset-0 h-12 w-12 border-2 border-blue-100 rounded-full mx-auto animate-pulse" />
          </div>
          <p className="text-gray-600 font-medium">Loading teacher profile...</p>
        </>
      ) : (
        <>
          <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-6 border border-red-100">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Profile Not Available</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message || 'The requested teacher profile could not be loaded.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={onBack}
              className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 text-sm font-medium shadow-sm"
            >
              Go Back
            </button>
            {onRetry && (
              <button 
                onClick={onRetry}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                Try Again
              </button>
            )}
            <Link 
              href="/teachers"
              className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm font-medium text-center shadow-sm"
            >
              View All Teachers
            </Link>
          </div>
        </>
      )}
    </div>
  </div>
);

// Profile stats component
const ProfileStats: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  const stats = useMemo(() => [
    teacher.experience_years ? {
      value: `${teacher.experience_years}+`,
      label: 'Years Exp.',
      color: 'text-blue-600'
    } : null,
    teacher.subjects?.length ? {
      value: teacher.subjects.length,
      label: 'Subjects',
      color: 'text-green-600'
    } : null,
    teacher.qualifications?.length ? {
      value: teacher.qualifications.length,
      label: 'Qualifications',
      color: 'text-purple-600'
    } : null
  ].filter(stat => stat !== null) as Array<{ value: string | number; label: string; color: string }>, [teacher]);

  if (stats.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Contact information component
const ContactInfo: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  if (!teacher.contact_email && !teacher.contact_phone) return null;

  return (
    <div className="space-y-2.5 pt-1">
      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-2">
        <Mail className="h-3.5 w-3.5 mr-2 text-blue-500" />
        Contact
      </h3>
      {teacher.contact_email && (
        <a 
          href={`mailto:${teacher.contact_email}`}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm p-2 rounded-md hover:bg-blue-50 group"
          aria-label={`Email ${teacher.name}`}
        >
          <Mail className="h-3.5 w-3.5 mr-2.5 flex-shrink-0 text-gray-400 group-hover:text-blue-500" />
          <span className="truncate text-[13px]">{teacher.contact_email}</span>
          <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      )}
      {teacher.contact_phone && (
        <a 
          href={`tel:${teacher.contact_phone}`}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm p-2 rounded-md hover:bg-blue-50 group"
          aria-label={`Call ${teacher.name}`}
        >
          <Phone className="h-3.5 w-3.5 mr-2.5 flex-shrink-0 text-gray-400 group-hover:text-blue-500" />
          <span className="text-[13px]">{teacher.contact_phone}</span>
          <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      )}
    </div>
  );
};

// Content section component - Professional CV Style
const ContentSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  iconColor?: string;
}> = ({ title, icon, children, className = '', iconColor = 'from-blue-500 to-blue-600' }) => (
  <div className={`space-y-5 ${className}`}>
    <div className="flex items-center gap-3.5 pb-3.5 mb-1 border-b-2 border-gray-300">
      <div className={`flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-br ${iconColor} shadow-sm`}>
        <div className="text-white flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h2 className="text-[15px] sm:text-base font-bold text-gray-900 tracking-wide uppercase leading-none">
        {title}
      </h2>
    </div>
    <div className="pl-0">
      {children}
    </div>
  </div>
);

// Main component
export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  
  const slug = params.slug as string;
  const { teacher, loading, error, refetch } = useTeacherData(slug);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const validImageUrl = useMemo(() => 
    getOptimizedImageUrl(teacher?.photo_url), 
    [teacher?.photo_url]
  );
  
  const shouldShowImage = validImageUrl && !imageError;

  // Loading state
  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  // Error state
  if (error || !teacher) {
    return (
      <StatusDisplay
        type="error"
        message={error || undefined}
        onBack={handleBack}
        onRetry={error ? refetch : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 backdrop-blur-sm bg-white/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </button>
            
            <nav className="hidden sm:flex items-center space-x-1 text-xs" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors focus:outline-none focus:underline">
                Home
              </Link>
              <span className="text-gray-300" aria-hidden="true">/</span>
              <Link href="/teachers" className="text-gray-500 hover:text-blue-600 transition-colors focus:outline-none focus:underline">
                Teachers
              </Link>
              <span className="text-gray-300" aria-hidden="true">/</span>
              <span className="text-gray-900 font-medium truncate max-w-32" title={teacher.name}>
                {teacher.name}
              </span>
            </nav>
          </div>
        </div>
      </header>

      <motion.main
        variants={ANIMATION_CONFIG.container}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Card */}
          <motion.aside variants={ANIMATION_CONFIG.item} className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              {/* Profile Image */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700">
                {shouldShowImage ? (
                  <Image
                    src={validImageUrl}
                    alt={`${teacher.name} - ${teacher.designation}`}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority
                    onError={() => setImageError(true)}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" role="img" aria-label="Default profile image">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                      <User className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>

              {/* Profile Information */}
              <div className="p-5 space-y-4">
                <div className="text-center">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-1.5">
                    {teacher.name}
                  </h1>
                  <p className="text-blue-600 font-semibold text-sm sm:text-base">
                    {teacher.designation}
                  </p>
                  {teacher.department && (
                    <div className="flex items-center justify-center text-gray-500 text-xs mt-2">
                      <MapPin className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                      <span>{teacher.department}</span>
                    </div>
                  )}
                </div>

                <ProfileStats teacher={teacher} />
                <ContactInfo teacher={teacher} />

                {/* Join Date */}
                {teacher.join_date && (
                  <div className="flex items-center text-gray-500 text-xs bg-gray-50 p-2.5 rounded-md mt-3">
                    <Calendar className="h-3.5 w-3.5 mr-2 flex-shrink-0" aria-hidden="true" />
                    <span>Joined {formatJoinDate(teacher.join_date)}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>

          {/* Content Area - CV Style */}
          <section className="lg:col-span-2">
            {/* Professional CV Card */}
            <motion.div variants={ANIMATION_CONFIG.item} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 space-y-10">
                
                {/* Subjects */}
                <div>
                {teacher.subjects && teacher.subjects.length > 0 && (
                  <ContentSection
                    title="Subjects Taught"
                    icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
                    iconColor="from-blue-500 to-indigo-600"
                  >
                    <div className="flex flex-wrap gap-2.5">
                      {teacher.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-4 py-2 bg-blue-50/80 border border-blue-200 text-blue-900 rounded-md text-sm font-semibold hover:bg-blue-100 hover:shadow-sm transition-all duration-200"
                          title={subject}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </ContentSection>
                )}
                </div>

                {/* About */}
                <div className={teacher.subjects && teacher.subjects.length > 0 ? 'pt-2' : ''}>
                {teacher.bio && (
                  <ContentSection
                    title="Professional Summary"
                    icon={<User className="h-4 w-4" aria-hidden="true" />}
                    iconColor="from-slate-500 to-slate-600"
                  >
                    <p className="text-gray-800 text-[15px] leading-relaxed text-justify" style={{ textAlignLast: 'left' }}>
                      {teacher.bio}
                    </p>
                  </ContentSection>
                )}
                </div>

                {/* Qualifications */}
                <div className={teacher.bio ? 'pt-2' : ''}>
                {teacher.qualifications && teacher.qualifications.length > 0 && (
                  <ContentSection
                    title="Education & Qualifications"
                    icon={<GraduationCap className="h-4 w-4" aria-hidden="true" />}
                    iconColor="from-purple-500 to-purple-600"
                  >
                    <ul className="space-y-3.5" role="list">
                      {teacher.qualifications.slice(0, DISPLAY_LIMITS.qualifications).map((qualification, index) => (
                        <li key={index} className="flex items-start group pl-0.5">
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-3.5 group-hover:scale-150 transition-transform"></div>
                          <span className="text-gray-800 text-[15px] leading-relaxed -mt-0.5">
                            {qualification}
                          </span>
                        </li>
                      ))}
                      {teacher.qualifications.length > DISPLAY_LIMITS.qualifications && (
                        <li className="text-sm text-gray-500 ml-5 italic">
                          +{teacher.qualifications.length - DISPLAY_LIMITS.qualifications} more qualifications
                        </li>
                      )}
                    </ul>
                  </ContentSection>
                )}
                </div>

                {/* Certifications */}
                <div className={teacher.qualifications && teacher.qualifications.length > 0 ? 'pt-2' : ''}>
                {teacher.certifications && teacher.certifications.length > 0 && (
                  <ContentSection
                    title="Certifications & Training"
                    icon={<Award className="h-4 w-4" aria-hidden="true" />}
                    iconColor="from-emerald-500 to-emerald-600"
                  >
                    <ul className="space-y-3.5" role="list">
                      {teacher.certifications.slice(0, DISPLAY_LIMITS.certifications).map((certification, index) => (
                        <li key={index} className="flex items-start group pl-0.5">
                          <CheckCircle className="h-[18px] w-[18px] text-emerald-600 mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                          <span className="text-gray-800 text-[15px] leading-relaxed">
                            {certification}
                          </span>
                        </li>
                      ))}
                      {teacher.certifications.length > DISPLAY_LIMITS.certifications && (
                        <p className="text-sm text-gray-500 ml-[26px] italic">
                          +{teacher.certifications.length - DISPLAY_LIMITS.certifications} more certifications
                        </p>
                      )}
                    </ul>
                  </ContentSection>
                )}
                </div>

                {/* Achievements */}
                <div className={teacher.certifications && teacher.certifications.length > 0 ? 'pt-2' : ''}>
                {teacher.achievements && teacher.achievements.length > 0 && (
                  <ContentSection
                    title="Achievements & Recognition"
                    icon={<Star className="h-4 w-4" aria-hidden="true" />}
                    iconColor="from-amber-500 to-yellow-600"
                  >
                    <ul className="space-y-3.5" role="list">
                      {teacher.achievements.slice(0, DISPLAY_LIMITS.achievements).map((achievement, index) => (
                        <li key={index} className="flex items-start group pl-0.5">
                          <div className="flex-shrink-0 mt-0.5">
                            <Award className="h-[18px] w-[18px] text-amber-600 mr-3 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                          </div>
                          <span className="text-gray-800 text-[15px] leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                      {teacher.achievements.length > DISPLAY_LIMITS.achievements && (
                        <li className="text-sm text-gray-500 ml-[26px] italic">
                          +{teacher.achievements.length - DISPLAY_LIMITS.achievements} more achievements
                        </li>
                      )}
                    </ul>
                  </ContentSection>
                )}
                </div>

                {/* Teaching Philosophy */}
                <div className={teacher.achievements && teacher.achievements.length > 0 ? 'pt-2' : ''}>
                {teacher.teaching_philosophy && (
                  <ContentSection
                    title="Teaching Philosophy"
                    icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
                    iconColor="from-indigo-500 to-indigo-600"
                  >
                    <div className="relative bg-gradient-to-br from-blue-50/60 via-indigo-50/60 to-purple-50/60 border-l-[3px] border-indigo-500 px-5 py-4 rounded-r-lg">
                      <div className="absolute top-1 left-2 text-5xl text-indigo-300 opacity-40 font-serif leading-none">"</div>
                      <blockquote className="text-gray-800 text-[15px] leading-relaxed italic relative z-10 pt-3 pr-4">
                        {teacher.teaching_philosophy}
                      </blockquote>
                      <div className="absolute bottom-0 right-3 text-5xl text-indigo-300 opacity-40 font-serif leading-none">"</div>
                    </div>
                  </ContentSection>
                )}
                </div>

              </div>
            </motion.div>
          </section>
        </div>
      </motion.main>
    </div>
  );
}