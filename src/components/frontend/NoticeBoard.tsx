'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/lib';
import { formatDate } from '@/lib/utils';
import { noticesApi, type Notice } from '@/lib/supabase';

interface NoticeBoardProps {
  notices?: Notice[];
  limit?: number;
}

// Mock data for development
const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'School Reopening Notice',
    slug: 'school-reopening-notice',
    content: 'School will reopen on January 15th, 2024 after winter break.',
    publish_date: '2024-01-10T10:00:00Z',
    file_url: '/documents/reopening-notice.pdf',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Annual Sports Day 2024',
    slug: 'annual-sports-day-2024',
    content: 'Annual sports day will be held on February 20th, 2024. All students are required to participate.',
    publish_date: '2024-01-12T09:00:00Z',
    created_at: '2024-01-12T09:00:00Z',
    updated_at: '2024-01-12T09:00:00Z',
  },
  {
    id: '3',
    title: 'Parent-Teacher Meeting',
    slug: 'parent-teacher-meeting',
    content: 'Monthly parent-teacher meeting scheduled for January 25th, 2024.',
    publish_date: '2024-01-15T11:00:00Z',
    created_at: '2024-01-15T11:00:00Z',
    updated_at: '2024-01-15T11:00:00Z',
  },
  {
    id: '4',
    title: 'Exam Schedule Released',
    slug: 'exam-schedule-released',
    content: 'Final examination schedule for the academic year 2023-24 has been released.',
    publish_date: '2024-01-18T08:00:00Z',
    file_url: '/documents/exam-schedule.pdf',
    created_at: '2024-01-18T08:00:00Z',
    updated_at: '2024-01-18T08:00:00Z',
  },
  {
    id: '5',
    title: 'Science Fair Registration',
    slug: 'science-fair-registration',
    content: 'Registration for the annual science fair is now open. Deadline: February 10th, 2024.',
    publish_date: '2024-01-20T14:00:00Z',
    created_at: '2024-01-20T14:00:00Z',
    updated_at: '2024-01-20T14:00:00Z',
  },
];

const NoticeBoard: React.FC<NoticeBoardProps> = ({
  notices: propNotices,
  limit = 5
}) => {
  const [notices, setNotices] = useState<Notice[]>(propNotices || []);
  const [loading, setLoading] = useState(!propNotices);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true);

  const displayedNotices = notices.slice(0, limit);

  // Fetch notices from Supabase if not provided as props
  useEffect(() => {
    if (!propNotices) {
      fetchNotices();
    }
  }, [propNotices]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await noticesApi.getRecent(limit);
      setNotices(data);
    } catch (err) {
      console.error('Error fetching notices:', err);
      // Fallback to mock data if API fails
      setNotices(mockNotices);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isScrolling || displayedNotices.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentNoticeIndex((prev) => (prev + 1) % displayedNotices.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isScrolling, displayedNotices.length]);

  const handleNoticeClick = (index: number) => {
    setCurrentNoticeIndex(index);
    setIsScrolling(false);
    setTimeout(() => setIsScrolling(true), 10000); // Resume scrolling after 10 seconds
  };

  if (loading) {
    return (
      <Card className="h-full overflow-hidden bg-gradient-to-br from-white to-gray-50/50 shadow-xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
            <div className="w-6 h-6 mr-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Notice Board
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-primary-200 rounded-full animate-spin border-t-primary-600"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-primary-400"></div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-600 font-medium">Loading notices...</p>
              <p className="text-sm text-gray-400">Please wait while we fetch the latest updates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!displayedNotices.length) {
    return (
      <Card className="h-full overflow-hidden bg-gradient-to-br from-white to-gray-50/50 shadow-xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
            <div className="w-6 h-6 mr-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Notice Board
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-600 font-medium">No notices available</p>
              <p className="text-sm text-gray-400">Check back later for important updates and announcements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden bg-gradient-to-br from-white to-gray-50/50 shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4 bg-gradient-to-r from-primary-50 to-primary-100/50 border-b border-primary-100">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
            <div className="w-6 h-6 mr-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Notice Board
          </CardTitle>
          <Link
            href="/notices"
            className="group flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 font-semibold transition-all duration-200 hover:scale-105"
          >
            <span>View All</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Featured Notice */}
        <div className="relative bg-gradient-to-br from-white to-gray-50/30 p-6 lg:p-8">
          <motion.div
            key={currentNoticeIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* Priority Badge */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse shadow-lg"></div>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 border border-primary-200">
                      Featured
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {displayedNotices[currentNoticeIndex].publish_date && formatDate(displayedNotices[currentNoticeIndex].publish_date!)}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl lg:text-2xl text-gray-900 leading-tight line-clamp-2 hover:text-primary-700 transition-colors duration-200">
                    {displayedNotices[currentNoticeIndex].title}
                  </h3>

                  <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
                    {displayedNotices[currentNoticeIndex].content}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <Link
                  href={`/notices/${displayedNotices[currentNoticeIndex].slug}`}
                  className="group inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-all duration-200 hover:scale-105"
                >
                  <span>Read Full Notice</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {displayedNotices[currentNoticeIndex].file_url && (
                  <a
                    href={displayedNotices[currentNoticeIndex].file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-medium rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Notice List */}
        <div className="bg-gray-50/50 border-t border-gray-100">
          <div className="p-4 pb-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Recent Notices
            </h4>
          </div>

          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="grid gap-1 px-4 pb-4">
              {displayedNotices.map((notice, index) => (
                <motion.button
                  key={notice.id}
                  onClick={() => handleNoticeClick(index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`group relative w-full text-left p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                    index === currentNoticeIndex
                      ? 'bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-200 shadow-lg'
                      : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-semibold text-sm truncate transition-colors duration-200 ${
                          index === currentNoticeIndex ? 'text-primary-900' : 'text-gray-900 group-hover:text-primary-700'
                        }`}>
                          {notice.title}
                        </h4>
                        {index === currentNoticeIndex && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary-600 text-white">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        {notice.publish_date && formatDate(notice.publish_date)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 ml-3">
                      {notice.file_url && (
                        <div className="p-1.5 bg-secondary-100 rounded-lg">
                          <svg className="w-3 h-3 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}

                      <svg className={`w-4 h-4 transform transition-all duration-200 ${
                        index === currentNoticeIndex ? 'text-primary-600 rotate-90' : 'text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Active indicator */}
                  {index === currentNoticeIndex && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary-500 to-primary-600 rounded-r-full"></div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-200">
          <Link
            href="/notices"
            className="group block w-full text-center py-4 px-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>View All Notices</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {displayedNotices.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNoticeClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentNoticeIndex
                    ? 'bg-primary-600 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticeBoard;
