'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Notice } from '@/types/notice';
import { formatDate } from '@/lib/utils';

interface NoticeBoardMobileProps {
  notices: Notice[];
  limit?: number;
  className?: string;
}

const NoticeBoardMobile: React.FC<NoticeBoardMobileProps> = ({
  notices,
  limit = 5,
  className = ''
}) => {
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);

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

  const displayNotices = notices.slice(0, limit);

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Latest Notices</h3>
              <p className="text-xs text-gray-500">Important announcements</p>
            </div>
          </div>
          
          {notices.length > limit && (
            <Link
              href="/notices"
              className="text-blue-600 hover:text-blue-700 text-xs font-semibold transition-colors"
            >
              View All
            </Link>
          )}
        </div>
      </div>

      {/* Notices List */}
      <div className="p-4">
        {displayNotices.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No notices available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {isRecent(notice.publish_date) && (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          New
                        </span>
                      )}
                      {notice.file_url && (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          PDF
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                      {notice.title}
                    </h4>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <div className="text-xs text-gray-500 text-right">
                      {getRelativeTime(notice.publish_date)}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                  {notice.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatDate(new Date(notice.publish_date), { month: 'short', day: 'numeric' })}</span>
                  </div>
                  
                  <Link
                    href={`/notices/${notice.slug || notice.id}`}
                    className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoardMobile;
