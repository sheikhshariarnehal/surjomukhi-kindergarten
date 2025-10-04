'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Notice } from '@/types/notice';
import { formatDate } from '@/lib/utils';

// Enhanced mock data for notices
const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'School Reopening After Winter Break',
    slug: 'school-reopening-winter-break',
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
    publish_date: '2024-01-02T10:00:00Z',
    created_at: '2024-01-02T10:00:00Z',
    updated_at: '2024-01-02T10:00:00Z',
    file_url: '/notices/school-reopening.pdf'
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting Schedule',
    slug: 'parent-teacher-meeting-schedule',
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
    publish_date: '2024-01-05T09:00:00Z',
    created_at: '2024-01-05T09:00:00Z',
    updated_at: '2024-01-05T09:00:00Z'
  },
  {
    id: '3',
    title: 'Annual Sports Day Registration',
    slug: 'annual-sports-day-registration',
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
    publish_date: '2024-01-08T11:00:00Z',
    created_at: '2024-01-08T11:00:00Z',
    updated_at: '2024-01-08T11:00:00Z'
  },
  {
    id: '4',
    title: 'Library Book Return Reminder',
    slug: 'library-book-return-reminder',
    content: `Dear Students,

All students who have borrowed books from the library are requested to return them by January 25th, 2024. Late returns will incur a fine.

Please check your library account and return any overdue books as soon as possible.

Library Department`,
    publish_date: '2024-01-10T14:00:00Z',
    created_at: '2024-01-10T14:00:00Z',
    updated_at: '2024-01-10T14:00:00Z'
  },
  {
    id: '5',
    title: 'Science Fair 2024 Announcement',
    slug: 'science-fair-2024-announcement',
    content: `Dear Students and Parents,

The annual Science Fair will be held on February 15th, 2024. Students from grades 6-12 are encouraged to participate. Registration deadline is January 30th, 2024.

This is a great opportunity to showcase your scientific knowledge and creativity.

Science Department`,
    publish_date: '2024-01-12T08:00:00Z',
    created_at: '2024-01-12T08:00:00Z',
    updated_at: '2024-01-12T08:00:00Z',
    file_url: '/notices/science-fair-2024.pdf'
  }
];

export default function NoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [relatedNotices, setRelatedNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundNotice = mockNotices.find(n => n.id === params.id || n.slug === params.id);
      
      if (foundNotice) {
        setNotice(foundNotice);
        // Get related notices (exclude current notice)
        setRelatedNotices(mockNotices.filter(n => n.id !== foundNotice.id).slice(0, 3));
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    };

    if (params.id) {
      fetchNotice();
    }
  }, [params.id]);

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    
    return formatDate(date, { month: 'short', day: 'numeric' });
  };

  const isRecent = (publishDate: string) => {
    const date = new Date(publishDate);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7;
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

  const handleDownload = () => {
    if (notice?.file_url) {
      window.open(notice.file_url, '_blank');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Notice</h3>
            <p className="text-gray-600">Please wait while we fetch the notice details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound || !notice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Notice Not Found</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              The notice you're looking for doesn't exist or has been removed. It may have been deleted or the link might be incorrect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/notices"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Notices
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Breadcrumb */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/notices" className="text-gray-500 hover:text-blue-600 transition-colors">Notices</Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate">{notice.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 lg:p-8 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      {isRecent(notice.publish_date) && (
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          New
                        </span>
                      )}
                      {notice.file_url && (
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          PDF Available
                        </span>
                      )}
                    </div>
                    
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                      {notice.title}
                    </h1>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Published {formatDate(new Date(notice.publish_date), { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span className="mx-2">•</span>
                        <span>{getRelativeTime(notice.publish_date)}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleShare}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          Share
                        </button>
                        
                        <button
                          onClick={handlePrint}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                          Print
                        </button>
                        
                        {notice.file_url && (
                          <button
                            onClick={handleDownload}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <div className="prose prose-lg max-w-none">
                      {notice.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 lg:p-8 bg-gray-50 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <Link
                        href="/notices"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
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

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Related Notices */}
                  {relatedNotices.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Related Notices</h3>
                      <div className="space-y-4">
                        {relatedNotices.map((relatedNotice) => (
                          <Link
                            key={relatedNotice.id}
                            href={`/notices/${relatedNotice.slug || relatedNotice.id}`}
                            className="block group"
                          >
                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                                {relatedNotice.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{getRelativeTime(relatedNotice.publish_date)}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Link
                        href="/notices"
                        className="flex items-center w-full p-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>All Notices</span>
                      </Link>
                      
                      <button
                        onClick={handleShare}
                        className="flex items-center w-full p-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span>Share Notice</span>
                      </button>
                      
                      <button
                        onClick={handlePrint}
                        className="flex items-center w-full p-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        <span>Print Notice</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
