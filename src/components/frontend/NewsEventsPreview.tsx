'use client';

import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { News, Event } from '@/types';

// Types
interface NewsEventsPreviewProps {
  initialNews?: News[];
  initialEvents?: Event[];
}

type TabType = 'news' | 'events';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const tabVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Utility functions
const formatRelativeTime = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  } catch {
    return '';
  }
};

const formatEventDate = (startDate: string, endDate?: string): string => {
  if (!startDate) return 'Date TBA';
  
  try {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const formatOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };

    if (end && start.toDateString() !== end.toDateString()) {
      const startFormatted = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endFormatted = end.toLocaleDateString('en-US', formatOptions);
      return `${startFormatted} - ${endFormatted}`;
    }

    return start.toLocaleDateString('en-US', formatOptions);
  } catch {
    return 'Invalid date';
  }
};

const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Loading Skeleton Component
const LoadingSkeleton = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
    {Array.from({ length: 3 }, (_, i) => (
      <div 
        key={i} 
        className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100 animate-pulse"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="h-4 w-12 bg-gray-200 rounded-full" />
          <div className="h-3 w-16 bg-gray-200 rounded-full" />
        </div>
        <div className="h-5 bg-gray-200 rounded mb-1.5" />
        <div className="space-y-1.5 mb-3">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    ))}
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

// Empty State Component
const EmptyState = memo(({ 
  type, 
  icon, 
  title, 
  description 
}: {
  type: TabType;
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={itemVariants}
    className="col-span-full bg-white rounded-lg p-6 sm:p-8 text-center shadow-sm border border-gray-100"
  >
    <div className={`
      w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mx-auto mb-4
      ${type === 'news' 
        ? 'bg-gradient-to-br from-blue-50 to-blue-100' 
        : 'bg-gradient-to-br from-emerald-50 to-emerald-100'
      }
    `}>
      {icon}
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed px-4">{description}</p>
  </motion.div>
));

EmptyState.displayName = 'EmptyState';

// News Card Component
const NewsCard = memo(({ item }: { item: News }) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = item.image_url && !imageError;

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link
        href={`/news/${item.id}`}
        className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-gray-100 hover:border-gray-200 transition-all duration-300 flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-label={`Read article: ${item.title}`}
      >
        {/* Thumbnail Image with refined editorial fallback */}
        <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
          {hasImage ? (
            <Image
              src={item.image_url!}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Campus Story</span>
            </div>
          )}
        </div>
        
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <time 
              dateTime={item.publish_date || item.created_at}
              className="text-xs font-semibold text-slate-400 mb-2 block"
            >
              {formatRelativeTime(item.publish_date || item.created_at || '')}
            </time>

            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base sm:text-lg leading-snug line-clamp-2 mb-2 tracking-tight">
              {item.title}
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {truncateText(item.excerpt || item.content || '', 130)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

NewsCard.displayName = 'NewsCard';

// Event Card Component
const EventCard = memo(({ item }: { item: Event }) => (
  <motion.article
    variants={itemVariants}
    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col h-full"
  >
    {/* Thumbnail Image */}
    <div className="relative w-full h-36 bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden">
      {item.image_url ? (
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-12 h-12 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
    
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-md">
          Event
        </span>
        <time 
          className="text-xs text-gray-500" 
          dateTime={item.start_date}
        >
          {formatEventDate(item.start_date, item.end_date)}
        </time>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors text-base leading-snug">
        {item.title}
      </h3>

      <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
        {truncateText(item.description || '', 150)}
      </p>

      <div className="pt-2">
        <Link
          href={`/events/${createSlug(item.title)}/${item.id}`}
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors group"
          aria-label={`View event details: ${item.title}`}
        >
          View Event
          <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </motion.article>
));

EventCard.displayName = 'EventCard';

// Error State Component
const ErrorState = memo(({ onRetry }: { onRetry: () => void }) => (
  <div className="text-center py-10 sm:py-12">
    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Unable to Load Content</h3>
    <p className="text-sm text-gray-600 mb-4 sm:mb-5 max-w-md mx-auto px-4">
      We&apos;re having trouble loading the latest news and events. Please try again.
    </p>
    <button
      onClick={onRetry}
      className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Try Again
    </button>
  </div>
));

ErrorState.displayName = 'ErrorState';

// Tab Button Component
const TabButton = memo(({ 
  active, 
  onClick, 
  icon, 
  label, 
  count, 
  colorScheme 
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
  colorScheme: 'blue' | 'emerald';
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200
      ${active
        ? `bg-gradient-to-r ${colorScheme === 'blue' 
          ? 'from-blue-500 to-blue-600' 
          : 'from-emerald-500 to-emerald-600'
        } text-white shadow-sm`
        : `text-gray-600 hover:text-${colorScheme}-600 hover:bg-${colorScheme}-50`
      }
    `}
    role="tab"
    aria-selected={active}
  >
    {icon}
    <span>{label}</span>
    {count > 0 && (
      <span className={`
        text-xs px-2 py-0.5 rounded-full
        ${active ? 'bg-white/20' : `bg-${colorScheme}-100 text-${colorScheme}-600`}
      `}>
        {count}
      </span>
    )}
  </button>
));

TabButton.displayName = 'TabButton';

// View All Button Component
const ViewAllButton = memo(({ 
  href, 
  colorScheme, 
  children 
}: {
  href: string;
  colorScheme: 'blue' | 'emerald';
  children: React.ReactNode;
}) => (
  <div className="flex justify-end mb-4 sm:mb-5">
    <Link
      href={href}
      className={`
        inline-flex items-center px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 shadow-sm
        ${colorScheme === 'blue'
          ? 'bg-blue-500 hover:bg-blue-600 text-white'
          : 'bg-emerald-500 hover:bg-emerald-600 text-white'
        }
      `}
    >
      {children}
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
));

ViewAllButton.displayName = 'ViewAllButton';

// Main Component
export default function NewsEventsPreview({ 
  initialNews = [], 
  initialEvents = [] 
}: NewsEventsPreviewProps) {
  const [news, setNews] = useState<News[]>(initialNews);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(!initialNews.length && !initialEvents.length);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('news');

  const fetchData = useCallback(async () => {
    if (initialNews.length || initialEvents.length) return;

    try {
      setLoading(true);
      setError(null);

      const [newsResponse, eventsResponse] = await Promise.all([
        fetch('/api/news?limit=3'),
        fetch('/api/events?limit=3') // Get recent events, not just upcoming
      ]);

      if (!newsResponse.ok || !eventsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [newsData, eventsData] = await Promise.all([
        newsResponse.json(),
        eventsResponse.json()
      ]);

      setNews(newsData.news || []);
      setEvents(eventsData.events || []);
    } catch (err) {
      console.error('Error fetching news and events:', err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [initialNews.length, initialEvents.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRetry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const newsItems = news.slice(0, 3);
  const eventItems = events.slice(0, 3);
  const hasContent = newsItems.length > 0 || eventItems.length > 0;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "name": "News and Events",
    "description": "Latest news articles and upcoming events",
    "mainEntity": [
      ...newsItems.map(item => ({
        "@type": "NewsArticle",
        "headline": item.title,
        "description": truncateText(item.excerpt || item.content || '', 160),
        "datePublished": item.publish_date || item.created_at,
        "url": `/news/${item.id}`
      })),
      ...eventItems.map(item => ({
        "@type": "Event",
        "name": item.title,
        "description": truncateText(item.description || '', 160),
        "startDate": item.start_date,
        "endDate": item.end_date,
        "url": `/events/${item.id}`
      }))
    ]
  };

  if (error) {
    return (
      <section className="py-16 bg-gray-50" role="alert">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState onRetry={handleRetry} />
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-16 sm:py-20 lg:py-24 bg-slate-50/60"
      aria-labelledby="news-events-section"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 
            id="news-events-section"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight"
          >
            Campus News & Stories
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Highlights, student achievements, and stories from the Surjomukhi Kindergarten community.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))
              ) : (
                <EmptyState
                  type="news"
                  icon={
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  }
                  title="No News Available"
                  description="Check back soon for the latest updates and announcements from our school."
                />
              )}
            </motion.div>

            {newsItems.length > 0 && (
              <div className="text-center mt-10 sm:mt-12">
                <Link
                  href="/news"
                  className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 sm:px-9 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 touch-manipulation"
                >
                  <span>View All News & Stories</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}