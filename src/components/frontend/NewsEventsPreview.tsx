'use client';

import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { News, Event } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';

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
      ease: 'easeOut',
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

// Loading Skeleton Component
const LoadingSkeleton = memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
    {Array.from({ length: 6 }, (_, i) => (
      <div 
        key={i} 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-4 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="h-6 bg-gray-200 rounded mb-3" />
        <div className="space-y-2 mb-4">
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
    className="col-span-full bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100"
  >
    <div className={`
      w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6
      ${type === 'news' 
        ? 'bg-gradient-to-br from-blue-50 to-blue-100' 
        : 'bg-gradient-to-br from-emerald-50 to-emerald-100'
      }
    `}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">{description}</p>
  </motion.div>
));

EmptyState.displayName = 'EmptyState';

// News Card Component
const NewsCard = memo(({ item, index }: { item: News; index: number }) => (
  <motion.article
    variants={itemVariants}
    className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full">
        News
      </span>
      <time 
        className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full" 
        dateTime={item.publish_date || item.created_at}
      >
        {formatRelativeTime(item.publish_date || item.created_at || '')}
      </time>
    </div>

    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors text-lg leading-tight">
      {item.title}
    </h3>

    <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
      {truncateText(item.excerpt || item.content || '', 150)}
    </p>

    <Link
      href={`/news/${item.id}`}
      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group"
      aria-label={`Read full article: ${item.title}`}
    >
      Read Article
      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </motion.article>
));

NewsCard.displayName = 'NewsCard';

// Event Card Component
const EventCard = memo(({ item, index }: { item: Event; index: number }) => (
  <motion.article
    variants={itemVariants}
    className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full">
        Event
      </span>
      <time 
        className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full" 
        dateTime={item.start_date}
      >
        {formatEventDate(item.start_date, item.end_date)}
      </time>
    </div>

    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors text-lg leading-tight">
      {item.title}
    </h3>

    <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
      {truncateText(item.description || '', 150)}
    </p>

    <Link
      href={`/events/${item.id}`}
      className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors group"
      aria-label={`View event details: ${item.title}`}
    >
      View Event
      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </motion.article>
));

EventCard.displayName = 'EventCard';

// Error State Component
const ErrorState = memo(({ onRetry }: { onRetry: () => void }) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">Unable to Load Content</h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">
      We're having trouble loading the latest news and events. Please try again.
    </p>
    <button
      onClick={onRetry}
      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
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
      flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200
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
  <div className="flex justify-end mb-8">
    <Link
      href={href}
      className={`
        inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
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
  const { t } = useTranslation();
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
        fetch('/api/news?limit=6'),
        fetch('/api/events?limit=6&upcoming=true')
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

  const newsItems = news.slice(0, 6);
  const eventItems = events.slice(0, 6);
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
      className="py-16 lg:py-24 bg-gray-50"
      aria-labelledby="news-events-section"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        {hasContent && (
          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mb-8"
            role="tablist"
            aria-label="Content type selection"
          >
            <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200">
              <div className="flex space-x-2">
                <TabButton
                  active={activeTab === 'news'}
                  onClick={() => setActiveTab('news')}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  }
                  label="News"
                  count={newsItems.length}
                  colorScheme="blue"
                />
                <TabButton
                  active={activeTab === 'events'}
                  onClick={() => setActiveTab('events')}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  label="Events"
                  count={eventItems.length}
                  colorScheme="emerald"
                />
              </div>
            </div>
          </motion.nav>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'news' ? (
              <motion.div
                key="news"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                role="tabpanel"
                id="news-panel"
              >
                {/* View All News Button - Now positioned above content */}
                {newsItems.length > 0 && (
                  <ViewAllButton href="/news" colorScheme="blue">
                    View All News
                  </ViewAllButton>
                )}

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {newsItems.length > 0 ? (
                    newsItems.map((item) => (
                      <NewsCard key={item.id} item={item} index={0} />
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
                      description="Check back soon for the latest updates and announcements from our team."
                    />
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="events"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                role="tabpanel"
                id="events-panel"
              >
                {/* View All Events Button - Now positioned above content */}
                {eventItems.length > 0 && (
                  <ViewAllButton href="/events" colorScheme="emerald">
                    View All Events
                  </ViewAllButton>
                )}

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {eventItems.length > 0 ? (
                    eventItems.map((item) => (
                      <EventCard key={item.id} item={item} index={0} />
                    ))
                  ) : (
                    <EmptyState
                      type="events"
                      icon={
                        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      }
                      title="No Events Scheduled"
                      description="Stay tuned for exciting upcoming events and activities from our community."
                    />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}