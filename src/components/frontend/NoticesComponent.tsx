'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Notice } from '@/types/notice';
import { formatDate } from '@/lib/utils';
import { DataLoadingErrorFallback } from '@/components/frontend/ErrorFallback';
import NoticeBoard from './NoticeBoard';

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
    <NoticeBoard
      notices={notices}
      limit={limit}
      showViewAll={showViewAll}
      className={className}
      title="Latest Notices"
    />
  );
}
