'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Calendar,
  Mail,
  Phone,
  Users,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

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

interface AcademicTeacherCardProps {
  teacher: TeacherData;
  index?: number;
  showContactInfo?: boolean;
}

const AcademicTeacherCard = React.memo(({ 
  teacher, 
  index = 0,
  showContactInfo = false 
}: AcademicTeacherCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Optimize image URL handling
  const getValidImageUrl = (url: string | undefined): string | null => {
    if (!url) return null;
    if (url.startsWith('/')) return url;
    if (url.startsWith('http')) return url;
    return `/${url}`;
  };

  const validImageUrl = getValidImageUrl(teacher.photo_url);
  const shouldShowImage = validImageUrl && !imageError;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto' as const,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  // Format experience display
  const experienceText = teacher.experience_years 
    ? `${teacher.experience_years}+ Years Experience`
    : 'Experienced Educator';

  // Format join date
  const joinYear = teacher.join_date 
    ? new Date(teacher.join_date).getFullYear()
    : null;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
      role="article"
      aria-label={`${teacher.name} - ${teacher.designation}`}
    >
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-teal-100 to-blue-100 ring-4 ring-white shadow-md">
              {shouldShowImage ? (
                <Image
                  src={validImageUrl}
                  alt={`${teacher.name} - ${teacher.designation}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 80px, 96px"
                  priority={index < 4}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMTYiIHI9IjYiIGZpbGw9IiNEMUQ1REIiLz4KPHN2Zz4K"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-8 w-8 sm:h-10 sm:w-10 text-teal-500" />
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
              {teacher.name}
            </h3>
            <p className="text-teal-600 font-semibold mb-2">
              {teacher.designation}
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
              <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                <Calendar className="h-3 w-3" />
                {experienceText}
              </span>
              {joinYear && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  <Star className="h-3 w-3" />
                  Since {joinYear}
                </span>
              )}
            </div>

            {/* Specialization */}
            {teacher.specialization && (
              <p className="text-gray-600 text-sm font-medium mb-2">
                <span className="text-gray-500">Specializes in:</span> {teacher.specialization}
              </p>
            )}

            {/* Classes Taught */}
            {teacher.classes_taught && teacher.classes_taught.length > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-500 justify-center sm:justify-start">
                <Users className="h-3 w-3" />
                <span>Teaching: {teacher.classes_taught.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subjects */}
      {teacher.subjects && teacher.subjects.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {teacher.subjects.slice(0, 4).map((subject, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
                title={subject}
              >
                <BookOpen className="h-3 w-3" />
                {subject}
              </span>
            ))}
            {teacher.subjects.length > 4 && (
              <span className="inline-flex items-center bg-gray-50 text-gray-500 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                +{teacher.subjects.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bio Preview */}
      {teacher.bio && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {teacher.bio}
          </p>
        </div>
      )}

      {/* Expand/Collapse Button */}
      <div className="px-6 pb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          aria-expanded={isExpanded}
          aria-controls={`teacher-details-${teacher.id}`}
          aria-label={`${isExpanded ? 'Hide' : 'Show'} detailed information about ${teacher.name}`}
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>View Details</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {/* Expanded Details */}
      <motion.div
        id={`teacher-details-${teacher.id}`}
        variants={expandVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-4">
          {/* Qualifications */}
          {teacher.qualifications && teacher.qualifications.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                <GraduationCap className="h-4 w-4 text-teal-600" />
                Qualifications
              </h4>
              <ul className="space-y-1">
                {teacher.qualifications.map((qual, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                    {qual}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {teacher.achievements && teacher.achievements.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                <Award className="h-4 w-4 text-yellow-600" />
                Key Achievements
              </h4>
              <div className="flex flex-wrap gap-2">
                {teacher.achievements.slice(0, 6).map((achievement, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded text-xs font-medium border border-yellow-200"
                    title={achievement}
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Teaching Philosophy */}
          {teacher.teaching_philosophy && (
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Teaching Philosophy</h4>
              <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg border-l-4 border-teal-400">
                "{teacher.teaching_philosophy}"
              </p>
            </div>
          )}

          {/* Contact Information */}
          {showContactInfo && (teacher.contact_email || teacher.contact_phone) && (
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Contact Information</h4>
              <div className="space-y-2">
                {teacher.contact_email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-teal-600" />
                    <a 
                      href={`mailto:${teacher.contact_email}`}
                      className="hover:text-teal-600 transition-colors"
                    >
                      {teacher.contact_email}
                    </a>
                  </div>
                )}
                {teacher.contact_phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-teal-600" />
                    <a 
                      href={`tel:${teacher.contact_phone}`}
                      className="hover:text-teal-600 transition-colors"
                    >
                      {teacher.contact_phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
});

AcademicTeacherCard.displayName = 'AcademicTeacherCard';

export default AcademicTeacherCard;
