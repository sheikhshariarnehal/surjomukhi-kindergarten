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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-t border-b border-gray-100">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Contact information component
const ContactInfo: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  if (!teacher.contact_email && !teacher.contact_phone) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900 flex items-center">
        <Mail className="h-3 w-3 mr-2 text-blue-500" />
        Contact
      </h3>
      {teacher.contact_email && (
        <a 
          href={`mailto:${teacher.contact_email}`}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm p-2 rounded-lg hover:bg-blue-50 group"
          aria-label={`Email ${teacher.name}`}
        >
          <Mail className="h-3 w-3 mr-2 flex-shrink-0 text-gray-400 group-hover:text-blue-500" />
          <span className="truncate">{teacher.contact_email}</span>
          <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      )}
      {teacher.contact_phone && (
        <a 
          href={`tel:${teacher.contact_phone}`}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm p-2 rounded-lg hover:bg-blue-50 group"
          aria-label={`Call ${teacher.name}`}
        >
          <Phone className="h-3 w-3 mr-2 flex-shrink-0 text-gray-400 group-hover:text-blue-500" />
          <span>{teacher.contact_phone}</span>
          <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      )}
    </div>
  );
};

// Content section component
const ContentSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, icon, children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
    <div className="flex items-center mb-3">
      {icon}
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
    </div>
    {children}
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
        className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
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
              <div className="p-4 space-y-3">
                <div className="text-center">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                    {teacher.name}
                  </h1>
                  <p className="text-blue-600 font-medium text-sm sm:text-base">
                    {teacher.designation}
                  </p>
                  {teacher.department && (
                    <div className="flex items-center justify-center text-gray-500 text-xs mt-1">
                      <MapPin className="h-3 w-3 mr-1" aria-hidden="true" />
                      <span>{teacher.department}</span>
                    </div>
                  )}
                </div>

                <ProfileStats teacher={teacher} />
                <ContactInfo teacher={teacher} />

                {/* Join Date */}
                {teacher.join_date && (
                  <div className="flex items-center text-gray-500 text-xs bg-gray-50 p-2 rounded-lg">
                    <Calendar className="h-3 w-3 mr-2 flex-shrink-0" aria-hidden="true" />
                    <span>Joined {formatJoinDate(teacher.join_date)}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>

          {/* Content Area */}
          <section className="lg:col-span-2 space-y-4">
            {/* Subjects */}
            {teacher.subjects && teacher.subjects.length > 0 && (
              <motion.div variants={ANIMATION_CONFIG.item}>
                <ContentSection
                  title="Subjects Taught"
                  icon={<BookOpen className="h-4 w-4 text-blue-600 mr-2" aria-hidden="true" />}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {teacher.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1.5 rounded-md text-xs font-medium text-center hover:bg-blue-100 transition-colors"
                        title={subject}
                      >
                        {truncateText(subject, 14)}
                      </div>
                    ))}
                  </div>
                </ContentSection>
              </motion.div>
            )}

            {/* About */}
            {teacher.bio && (
              <motion.div variants={ANIMATION_CONFIG.item}>
                <ContentSection
                  title="About"
                  icon={<User className="h-4 w-4 text-green-600 mr-2" aria-hidden="true" />}
                >
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {teacher.bio}
                  </p>
                </ContentSection>
              </motion.div>
            )}

            {/* Two Column Layout for Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Qualifications */}
              {teacher.qualifications && teacher.qualifications.length > 0 && (
                <motion.div variants={ANIMATION_CONFIG.item}>
                  <ContentSection
                    title="Education"
                    icon={<GraduationCap className="h-4 w-4 text-purple-600 mr-2" aria-hidden="true" />}
                  >
                    <ul className="space-y-2" role="list">
                      {teacher.qualifications.slice(0, DISPLAY_LIMITS.qualifications).map((qualification, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-3 w-3 text-purple-500 mt-0.5 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-700 text-xs leading-relaxed">
                            {qualification}
                          </span>
                        </li>
                      ))}
                      {teacher.qualifications.length > DISPLAY_LIMITS.qualifications && (
                        <li className="text-xs text-gray-500 ml-5 italic">
                          +{teacher.qualifications.length - DISPLAY_LIMITS.qualifications} more qualifications
                        </li>
                      )}
                    </ul>
                  </ContentSection>
                </motion.div>
              )}

              {/* Achievements */}
              {teacher.achievements && teacher.achievements.length > 0 && (
                <motion.div variants={ANIMATION_CONFIG.item}>
                  <ContentSection
                    title="Achievements"
                    icon={<Award className="h-4 w-4 text-yellow-600 mr-2" aria-hidden="true" />}
                  >
                    <ul className="space-y-2" role="list">
                      {teacher.achievements.slice(0, DISPLAY_LIMITS.achievements).map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-3 w-3 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-700 text-xs leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                      {teacher.achievements.length > DISPLAY_LIMITS.achievements && (
                        <li className="text-xs text-gray-500 ml-5 italic">
                          +{teacher.achievements.length - DISPLAY_LIMITS.achievements} more achievements
                        </li>
                      )}
                    </ul>
                  </ContentSection>
                </motion.div>
              )}
            </div>

            {/* Certifications */}
            {teacher.certifications && teacher.certifications.length > 0 && (
              <motion.div variants={ANIMATION_CONFIG.item}>
                <ContentSection
                  title="Certifications"
                  icon={<Award className="h-4 w-4 text-emerald-600 mr-2" aria-hidden="true" />}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {teacher.certifications.slice(0, DISPLAY_LIMITS.certifications).map((certification, index) => (
                      <div
                        key={index}
                        className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-2 rounded-md text-xs font-medium hover:bg-emerald-100 transition-colors"
                        title={certification}
                      >
                        {truncateText(certification, 30)}
                      </div>
                    ))}
                  </div>
                  {teacher.certifications.length > DISPLAY_LIMITS.certifications && (
                    <p className="text-xs text-gray-500 mt-2 italic">
                      +{teacher.certifications.length - DISPLAY_LIMITS.certifications} more certifications
                    </p>
                  )}
                </ContentSection>
              </motion.div>
            )}

            {/* Teaching Philosophy */}
            {teacher.teaching_philosophy && (
              <motion.div variants={ANIMATION_CONFIG.item}>
                <ContentSection
                  title="Teaching Philosophy"
                  icon={<Clock className="h-4 w-4 text-blue-600 mr-2" aria-hidden="true" />}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                >
                  <blockquote className="text-gray-700 text-sm leading-relaxed italic border-l-3 border-blue-400 pl-3">
                    "{teacher.teaching_philosophy}"
                  </blockquote>
                </ContentSection>
              </motion.div>
            )}
          </section>
        </div>
      </motion.main>
    </div>
  );
}