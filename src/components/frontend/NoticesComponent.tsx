'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Notice } from '@/types/notice';
import { formatDate } from '@/lib/utils';
import { DataLoadingErrorFallback } from '@/components/frontend/ErrorFallback';

interface NoticesComponentProps {
  initialNotices?: Notice[];
  limit?: number;
  showViewAll?: boolean;
  className?: string;
}

interface NoticesResponse {
  notices: Notice[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function NoticesComponent({ 
  initialNotices = [], 
  limit = 4, 
  showViewAll = true,
  className = '' 
}: NoticesComponentProps) {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [loading, setLoading] = useState(!initialNotices.length);
  const [error, setError] = useState<string | null>(null);

  // Format relative time
  const getRelativeTime = (dateString: string) => {
    if (!dateString) return 'Recently';

    try {
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
    } catch {
      return 'Recently';
    }
  };

  // Check if notice is recent (within 7 days)
  const isRecent = (publishDate: string) => {
    try {
      const date = new Date(publishDate);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      return diffInDays <= 7;
    } catch {
      return false;
    }
  };

  // Fetch notices from API
  useEffect(() => {
    if (initialNotices.length > 0) return;

    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/notices?limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }

        const data: NoticesResponse = await response.json();
        setNotices(data.notices || []);
      } catch (err) {
        console.error('Error fetching notices:', err);
        setError('Failed to load latest notices');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [initialNotices.length, limit]);

  // Retry function for error handling
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    
    const fetchNotices = async () => {
      try {
        const response = await fetch(`/api/notices?limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }

        const data: NoticesResponse = await response.json();
        setNotices(data.notices || []);
      } catch (err) {
        console.error('Error fetching notices:', err);
        setError('Failed to load latest notices');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  };

  // Loading state
  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-5 h-5 bg-blue-300 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-1"></div>
              <div className="h-4 bg-gray-100 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Latest Notices</h3>
              <p className="text-sm text-gray-500">Important announcements and updates</p>
            </div>
          </div>
        </div>
        
        <DataLoadingErrorFallback onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3" aria-hidden="true">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Latest Notices</h3>
            <p className="text-sm text-gray-500">Important announcements and updates</p>
          </div>
        </div>
        
        {showViewAll && notices.length > 0 && (
          <Link
            href="/notices"
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors duration-200 flex items-center group"
            aria-label="View all notices"
          >
            View All
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Notices List */}
      <div className="space-y-4" role="list" aria-label="Latest notices">
        <AnimatePresence>
          {notices.length > 0 ? (
            notices.slice(0, limit).map((notice, index) => (
              <motion.article
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
                role="listitem"
              >
                <Link
                  href={`/notices/${notice.slug || notice.id}`}
                  className="flex items-start space-x-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-blue-100"
                >
                  {/* Notice Icon */}
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                    {notice.file_url ? (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>

                  {/* Notice Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-1">
                      {notice.title}
                    </h4>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <time dateTime={notice.publish_date}>
                        {getRelativeTime(notice.publish_date)}
                      </time>
                      {isRecent(notice.publish_date) && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          New
                        </span>
                      )}
                      {notice.file_url && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          PDF
                        </span>
                      )}
                    </div>
                    
                    {notice.content && (
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {notice.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                      </p>
                    )}
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
              role="status"
              aria-live="polite"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No notices available</p>
              <p className="text-gray-400 text-sm mt-1">Check back soon for important updates!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
