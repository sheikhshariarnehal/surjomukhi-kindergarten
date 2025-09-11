'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Notice Board
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-500">Loading notices...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!displayedNotices.length) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Notice Board
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No notices available at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Notice Board
          </CardTitle>
          <Link 
            href="/notices" 
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Featured Notice */}
        <div className="p-6 border-b border-gray-200">
          <motion.div
            key={currentNoticeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {displayedNotices[currentNoticeIndex].title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {displayedNotices[currentNoticeIndex].content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {formatDate(displayedNotices[currentNoticeIndex].publish_date)}
                  </span>
                  {displayedNotices[currentNoticeIndex].file_url && (
                    <a
                      href={displayedNotices[currentNoticeIndex].file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
            <Link
              href={`/notices/${displayedNotices[currentNoticeIndex].slug}`}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Read More →
            </Link>
          </motion.div>
        </div>

        {/* Notice List */}
        <div className="max-h-64 overflow-y-auto scrollbar-thin">
          {displayedNotices.map((notice, index) => (
            <button
              key={notice.id}
              onClick={() => handleNoticeClick(index)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                index === currentNoticeIndex ? 'bg-primary-50 border-primary-200' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">
                    {notice.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(notice.publish_date)}
                  </p>
                </div>
                <div className="flex items-center ml-2">
                  {notice.file_url && (
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {index === currentNoticeIndex && (
                    <div className="w-2 h-2 bg-primary-600 rounded-full ml-2"></div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* View All Button */}
        <div className="p-4 bg-gray-50">
          <Link
            href="/notices"
            className="block w-full text-center py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
          >
            View All Notices
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticeBoard;
