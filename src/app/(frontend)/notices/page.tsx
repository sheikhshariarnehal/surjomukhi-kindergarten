'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Notice } from '@/types/notice';
import { formatDate } from '@/lib/utils';
import { DataLoadingErrorFallback } from '@/components/frontend/ErrorFallback';

// Enhanced mock data for notices
const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'School Reopening After Winter Break',
    slug: 'school-reopening-winter-break',
    content: 'Dear students and parents, we are pleased to announce that school will reopen on January 8th, 2024 after the winter break. Please ensure all students are ready with their books and uniforms.',
    publish_date: '2024-01-02T10:00:00Z',
    created_at: '2024-01-02T10:00:00Z',
    updated_at: '2024-01-02T10:00:00Z',
    file_url: '/notices/school-reopening.pdf'
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting Schedule',
    slug: 'parent-teacher-meeting-schedule',
    content: 'Parent-teacher meetings for all grades will be held from January 15-17, 2024. Please check the detailed schedule on the school notice board.',
    publish_date: '2024-01-05T09:00:00Z',
    created_at: '2024-01-05T09:00:00Z',
    updated_at: '2024-01-05T09:00:00Z'
  },
  {
    id: '3',
    title: 'Annual Sports Day Registration',
    slug: 'annual-sports-day-registration',
    content: 'Registration for Annual Sports Day is now open. Students interested in participating should submit their names to their respective class teachers by January 20th, 2024.',
    publish_date: '2024-01-08T11:00:00Z',
    created_at: '2024-01-08T11:00:00Z',
    updated_at: '2024-01-08T11:00:00Z'
  },
  {
    id: '4',
    title: 'Library Book Return Reminder',
    slug: 'library-book-return-reminder',
    content: 'All students who have borrowed books from the library are requested to return them by January 25th, 2024. Late returns will incur a fine.',
    publish_date: '2024-01-10T14:00:00Z',
    created_at: '2024-01-10T14:00:00Z',
    updated_at: '2024-01-10T14:00:00Z'
  },
  {
    id: '5',
    title: 'Science Fair 2024 Announcement',
    slug: 'science-fair-2024-announcement',
    content: 'The annual Science Fair will be held on February 15th, 2024. Students from grades 6-12 are encouraged to participate. Registration deadline is January 30th, 2024.',
    publish_date: '2024-01-12T08:00:00Z',
    created_at: '2024-01-12T08:00:00Z',
    updated_at: '2024-01-12T08:00:00Z',
    file_url: '/notices/science-fair-2024.pdf'
  },
  {
    id: '6',
    title: 'Holiday Schedule for Spring Break',
    slug: 'holiday-schedule-spring-break',
    content: 'Spring break will be from March 15-22, 2024. School will resume on March 25th, 2024. Please plan accordingly.',
    publish_date: '2024-01-15T10:00:00Z',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '7',
    title: 'Exam Schedule for Mid-Term',
    slug: 'exam-schedule-mid-term',
    content: 'Mid-term examinations will be conducted from February 5-15, 2024. Please check the detailed schedule and prepare accordingly.',
    publish_date: '2024-01-18T09:00:00Z',
    created_at: '2024-01-18T09:00:00Z',
    updated_at: '2024-01-18T09:00:00Z',
    file_url: '/notices/mid-term-exam-schedule.pdf'
  },
  {
    id: '8',
    title: 'New Library Books Available',
    slug: 'new-library-books-available',
    content: 'The library has received new books for all grades. Students are encouraged to visit and borrow books for their studies.',
    publish_date: '2024-01-20T14:00:00Z',
    created_at: '2024-01-20T14:00:00Z',
    updated_at: '2024-01-20T14:00:00Z'
  }
];

// Filter options
const filterOptions = {
  categories: [
    { value: 'all', label: 'All Categories', icon: '📋' },
    { value: 'academic', label: 'Academic', icon: '📚' },
    { value: 'general', label: 'General', icon: '📢' },
    { value: 'events', label: 'Events', icon: '🎉' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'exams', label: 'Exams', icon: '📝' }
  ],
  timeframes: [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ]
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch notices from API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        setNotices(mockNotices);
        setFilteredNotices(mockNotices);
      } catch (err) {
        console.error('Error fetching notices:', err);
        setError('Failed to load notices');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Filter and search notices
  useEffect(() => {
    let filtered = [...notices];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter (simplified for demo)
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

    // Timeframe filter
    if (selectedTimeframe !== 'all') {
      const now = new Date();
      filtered = filtered.filter(notice => {
        const noticeDate = new Date(notice.publish_date);
        const diffTime = now.getTime() - noticeDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (selectedTimeframe) {
          case 'today':
            return diffDays <= 1;
          case 'week':
            return diffDays <= 7;
          case 'month':
            return diffDays <= 30;
          default:
            return true;
        }
      });
    }

    // Sort notices
    filtered.sort((a, b) => {
      const dateA = new Date(a.publish_date);
      const dateB = new Date(b.publish_date);
      
      switch (sortBy) {
        case 'oldest':
          return dateA.getTime() - dateB.getTime();
        case 'newest':
        default:
          return dateB.getTime() - dateA.getTime();
      }
    });

    setFilteredNotices(filtered);
  }, [notices, searchTerm, selectedCategory, selectedTimeframe, sortBy]);

  // Utility functions
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

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    
    setTimeout(() => {
      setNotices(mockNotices);
      setFilteredNotices(mockNotices);
      setLoading(false);
    }, 800);
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Notices</h3>
            <p className="text-gray-600">Please wait while we fetch the latest announcements...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Notices</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                School Notice Board
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Stay informed with the latest announcements, important updates, and school news
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Updated daily</span>
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Official announcements</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search notices, announcements, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 absolute left-3 sm:left-4 top-3 sm:top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2 sm:gap-3 w-full lg:w-auto">
                {/* Category Filter */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
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

                {/* Timeframe Filter */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    {filterOptions.timeframes.map((timeframe) => (
                      <option key={timeframe.value} value={timeframe.value}>
                        {timeframe.label}
                      </option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-gray-400 absolute right-2 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Sort Filter */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                  <svg className="w-4 h-4 text-gray-400 absolute right-2 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* View Mode Toggle - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2">
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
          </div>
        </div>
      </section>

      {/* Notices Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Results Summary */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {filteredNotices.length} Notice{filteredNotices.length !== 1 ? 's' : ''} Found
                  </h2>
                  <p className="text-gray-600">
                    {searchTerm && `Searching for "${searchTerm}"`}
                    {selectedCategory !== 'all' && ` • ${filterOptions.categories.find(c => c.value === selectedCategory)?.label}`}
                    {selectedTimeframe !== 'all' && ` • ${filterOptions.timeframes.find(t => t.value === selectedTimeframe)?.label}`}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                    </svg>
                    Advanced Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Notices List/Grid */}
            {filteredNotices.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No notices found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search terms or filters to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedTimeframe('all');
                  }}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <AnimatePresence>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4 sm:space-y-6'}>
                  {filteredNotices.map((notice, index) => (
                    <motion.div
                      key={notice.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`group ${
                        viewMode === 'grid' 
                          ? 'bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden' 
                          : 'bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100'
                      } transition-all duration-300`}
                    >
                      <Link href={`/notices/${notice.slug || notice.id}`} className="block">
                        <div className={viewMode === 'grid' ? 'p-4 sm:p-6' : 'p-4 sm:p-6'}>
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
                              <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
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
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">
                            {notice.content}
                          </p>

                          {/* Notice Footer */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 gap-2">
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="hidden sm:inline">Published {formatDate(new Date(notice.publish_date), { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                              <span className="sm:hidden">{formatDate(new Date(notice.publish_date), { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                              <span className="text-xs sm:text-sm font-medium mr-1">Read more</span>
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
