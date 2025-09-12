'use client';

import React, { useState, useEffect } from 'react';
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
  MapPin,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Teacher } from '@/types/teacher';

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = params.slug as string;

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);

        // Use the direct API endpoint which handles both UUID and slug lookups
        const response = await fetch(`/api/teachers/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Teacher not found');
          } else {
            throw new Error('Failed to fetch teacher');
          }
          return;
        }

        const data = await response.json();
        setTeacher(data.teacher);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching teacher:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTeacher();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading teacher profile...</p>
        </div>
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Teacher Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested teacher profile could not be found.'}</p>
          <div className="space-x-4">
            <button 
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
            <Link 
              href="/teachers"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              View All Teachers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/teachers" className="text-gray-500 hover:text-gray-700">Teachers</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{teacher.name}</span>
          </div>
        </div>
      </nav>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Teachers
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
              {/* Profile Photo */}
              <div className="relative h-80 bg-gradient-to-br from-blue-100 to-green-100">
                {teacher.photo_url ? (
                  <Image
                    src={teacher.photo_url}
                    alt={`${teacher.name} - ${teacher.designation}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{teacher.name}</h1>
                <p className="text-blue-600 font-medium text-lg mb-4">{teacher.designation}</p>
                
                {teacher.department && (
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{teacher.department}</span>
                  </div>
                )}

                {teacher.experience_years && (
                  <div className="flex items-center text-gray-600 mb-3">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{teacher.experience_years} Years Experience</span>
                  </div>
                )}

                {teacher.join_date && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {new Date(teacher.join_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}</span>
                  </div>
                )}

                {/* Contact Info */}
                {(teacher.contact_email || teacher.contact_phone) && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                    {teacher.contact_email && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <Mail className="h-4 w-4 mr-2" />
                        <a 
                          href={`mailto:${teacher.contact_email}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {teacher.contact_email}
                        </a>
                      </div>
                    )}
                    {teacher.contact_phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <a 
                          href={`tel:${teacher.contact_phone}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {teacher.contact_phone}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subjects Taught */}
            {teacher.subjects && teacher.subjects.length > 0 && (
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Subjects Taught</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {teacher.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bio/Description */}
            {teacher.bio && (
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <User className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">About</h2>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
                </div>
              </motion.div>
            )}

            {/* Education & Qualifications */}
            {teacher.qualifications && teacher.qualifications.length > 0 && (
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Education & Qualifications</h2>
                </div>
                <ul className="space-y-3">
                  {teacher.qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Teaching Philosophy */}
            {teacher.teaching_philosophy && (
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-yellow-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Teaching Philosophy</h2>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed italic">"{teacher.teaching_philosophy}"</p>
                </div>
              </motion.div>
            )}

            {/* Achievements */}
            {teacher.achievements && teacher.achievements.length > 0 && (
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-yellow-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Achievements & Recognition</h2>
                </div>
                <ul className="space-y-3">
                  {teacher.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Certifications */}
            {teacher.certifications && teacher.certifications.length > 0 && (
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {teacher.certifications.map((certification, index) => (
                    <div
                      key={index}
                      className="bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-200"
                    >
                      {certification}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
