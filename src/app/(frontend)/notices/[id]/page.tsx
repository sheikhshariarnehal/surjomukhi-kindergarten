'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Notice } from '@/types/notice';

// Mock data for notices (same as in the list page)
const mockNotices: any[] = [
  {
    id: '1',
    title: 'School Reopening After Winter Break',
    content: `Dear students and parents,

We are pleased to announce that school will reopen on January 8th, 2024 after the winter break. Please ensure all students are ready with their books and uniforms.

Important reminders for the new term:
• All students must arrive by 8:00 AM
• Bring all required textbooks and notebooks
• Ensure school uniforms are clean and properly fitted
• Complete any pending holiday assignments

We look forward to welcoming everyone back for an exciting new term filled with learning and growth.

Best regards,
School Administration`,
    type: 'general',
    priority: 'high',
    is_published: true,
    published_at: '2024-01-02T10:00:00Z',
    created_at: '2024-01-02T10:00:00Z',
    updated_at: '2024-01-02T10:00:00Z',
    author_id: 'admin-1'
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting Schedule',
    content: `Dear Parents,

Parent-teacher meetings for all grades will be held from January 15-17, 2024. This is an important opportunity to discuss your child's academic progress and development.

Schedule:
• January 15: Grades K-2 (9:00 AM - 12:00 PM)
• January 16: Grades 3-5 (9:00 AM - 12:00 PM)
• January 17: Grades 6-8 (9:00 AM - 12:00 PM)

Please check the detailed schedule on the school notice board for specific time slots. If you cannot attend during your assigned time, please contact the school office to arrange an alternative meeting time.

We encourage all parents to attend these important meetings.

Thank you,
Academic Department`,
    type: 'academic',
    priority: 'medium',
    is_published: true,
    published_at: '2024-01-05T09:00:00Z',
    created_at: '2024-01-05T09:00:00Z',
    updated_at: '2024-01-05T09:00:00Z',
    author_id: 'admin-1'
  },
  {
    id: '3',
    title: 'Annual Sports Day Registration',
    content: `Dear Students,

Registration for Annual Sports Day is now open! This year's sports day promises to be bigger and better than ever.

Event Details:
• Date: February 25, 2024
• Venue: School Sports Ground
• Time: 8:00 AM - 4:00 PM

Available Events:
• Track and Field Events
• Team Sports (Football, Basketball, Volleyball)
• Individual Sports (Badminton, Table Tennis)
• Fun Games and Relay Races

Registration Process:
Students interested in participating should submit their names to their respective class teachers by January 20th, 2024. Please specify which events you would like to participate in.

Prizes will be awarded to winners in each category. Let's make this sports day memorable!

Sports Department`,
    type: 'event',
    priority: 'medium',
    is_published: true,
    published_at: '2024-01-08T11:00:00Z',
    created_at: '2024-01-08T11:00:00Z',
    updated_at: '2024-01-08T11:00:00Z',
    author_id: 'admin-1'
  }
];

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

const typeColors = {
  general: 'bg-blue-100 text-blue-800',
  academic: 'bg-purple-100 text-purple-800',
  event: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

export default function NoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundNotice = mockNotices.find(n => n.id === params.id);
      
      if (foundNotice) {
        setNotice(foundNotice);
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    };

    if (params.id) {
      fetchNotice();
    }
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = async () => {
    if (navigator.share && notice) {
      try {
        await navigator.share({
          title: notice.title,
          text: notice.content.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notice...</p>
        </div>
      </div>
    );
  }

  if (notFound || !notice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Notice Not Found</h1>
          <p className="text-gray-600 mb-6">The notice you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/notices"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Notices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/notices" className="text-gray-500 hover:text-primary-600">Notices</Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Notice Details</span>
          </nav>
        </div>
      </section>

      {/* Notice Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {notice.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <span>Published: {formatDate(notice.publish_date || notice.created_at)}</span>
                  {notice.updated_at !== notice.created_at && (
                    <span>Updated: {formatDate(notice.updated_at)}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleShare}
                    className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </button>
                  
                  <button
                    onClick={handlePrint}
                    className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="prose prose-lg max-w-none">
                {notice.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/notices"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4 sm:mb-0"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to All Notices
                </Link>
                
                <div className="text-sm text-gray-500">
                  Notice ID: {notice.id}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
