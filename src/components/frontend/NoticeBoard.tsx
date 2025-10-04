'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Notice } from '@/types/notice';
import { formatDate } from '@/lib/utils';

interface NoticeBoardProps {
  notices?: Notice[];
  showFilters?: boolean;
  showSearch?: boolean;
  limit?: number;
  className?: string;
  title?: string;
  showViewAll?: boolean;
}

interface NoticeCardProps {
  notice: Notice;
  viewMode?: 'grid' | 'list';
  showActions?: boolean;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, viewMode = 'list', showActions = true }) => {
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
    if (navigator.share) {
      try {
        await navigator.share({
          title: notice.title,
          text: notice.content.substring(0, 100) + '...',
          url: window.location.origin + `/notices/${notice.slug || notice.id}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin + `/notices/${notice.slug || notice.id}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group ${
        viewMode === 'grid' 
          ? 'bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden' 
          : 'bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100'
      } transition-all duration-300`}
    >
      <Link href={`/notices/${notice.slug || notice.id}`} className="block">
        <div className={viewMode === 'grid' ? 'p-6' : 'p-6'}>
          {/* Notice Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {isRecent(notice.publish_date) && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    New
                  </span>
                )}
                {notice.file_url && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    PDF
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                {notice.title}
              </h3>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {getRelativeTime(notice.publish_date)}
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(new Date(notice.publish_date), { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          </div>

          {/* Notice Content */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {notice.content}
          </p>

          {/* Notice Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Published {formatDate(new Date(notice.publish_date), { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
              <span className="text-sm font-medium mr-1">Read more</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>

      {/* Actions */}
      {showActions && (
        <div className="px-6 pb-6 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleShare();
              }}
              className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
            
            {notice.file_url && (
              <a
                href={notice.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const NoticeBoard: React.FC<NoticeBoardProps> = ({
  notices = [],
  showFilters = false,
  showSearch = false,
  limit,
  className = '',
  title = 'Latest Notices',
  showViewAll = true
}) => {
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>(notices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [loading, setLoading] = useState(false);

  // Filter options
  const filterOptions = {
    categories: [
      { value: 'all', label: 'All Categories', icon: '📋' },
      { value: 'academic', label: 'Academic', icon: '📚' },
      { value: 'general', label: 'General', icon: '📢' },
      { value: 'events', label: 'Events', icon: '🎉' },
      { value: 'sports', label: 'Sports', icon: '⚽' },
      { value: 'exams', label: 'Exams', icon: '📝' }
    ]
  };

  // Filter notices
  useEffect(() => {
    let filtered = [...notices];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(notice => {
        const title = notice.title.toLowerCase();
        switch (selectedCategory) {
          case 'academic':
            return title.includes('exam') || title.includes('study') || title.includes('academic');
          case 'events':
            return title.includes('event') || title.includes('fair') || title.includes('day');
          case 'sports':
            return title.includes('sports') || title.includes('game');
          case 'exams':
            return title.includes('exam') || title.includes('test');
          default:
            return true;
        }
      });
    }

    // Apply limit
    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    setFilteredNotices(filtered);
  }, [notices, searchTerm, selectedCategory, limit]);

  const displayNotices = limit ? filteredNotices.slice(0, limit) : filteredNotices;

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">Important announcements and updates</p>
            </div>
          </div>
          
          {showViewAll && notices.length > 0 && (
            <Link
              href="/notices"
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors duration-200 flex items-center group"
            >
              View All
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Filters */}
      {(showFilters || showSearch) && (
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            {showSearch && (
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search notices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            )}
            
            {showFilters && (
              <div className="flex gap-3">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {filterOptions.categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-gray-400 absolute right-2 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notices List */}
      <div className="p-6">
        {displayNotices.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No notices available</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon for important updates!</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {displayNotices.map((notice, index) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  viewMode={viewMode}
                  showActions={showFilters}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;