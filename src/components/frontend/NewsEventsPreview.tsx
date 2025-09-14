'use client';

import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { News, Event } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';

interface NewsEventsPreviewProps {
  initialNews?: News[];
  initialEvents?: Event[];
}

// Memoized components for performance
const LoadingSkeleton = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 lg:p-6 space-y-3 lg:space-y-4 animate-pulse border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
          <div className="h-3 w-16 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-5 lg:h-6 bg-gray-200 rounded w-4/5"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
      </div>
    ))}
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

const EmptyState = memo(({ type, icon, title, description }: {
  type: 'news' | 'events';
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="col-span-full bg-white/70 backdrop-blur-sm rounded-xl p-8 lg:p-12 text-center border border-gray-100">
    <div className={`w-16 h-16 bg-gradient-to-br ${
      type === 'news' ? 'from-blue-50 to-indigo-100' : 'from-emerald-50 to-teal-100'
    } rounded-xl flex items-center justify-center mx-auto mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm lg:text-base max-w-sm mx-auto">{description}</p>
  </div>
));

EmptyState.displayName = 'EmptyState';

const NewsCard = memo(({ item, index }: { item: News; index: number }) => {
  const getRelativeTime = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 24) {
        return diffInHours < 1 ? 'Just now' : `${diffInHours}h ago`;
      }
      const diffInDays = Math.floor(diffInHours / 24);
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    } catch {
      return '';
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 border border-gray-100 hover:border-blue-200"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full">
          News
        </span>
        <time className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full" dateTime={item.publish_date || item.created_at}>
          {getRelativeTime(item.publish_date || item.created_at || '')}
        </time>
      </div>

      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-base lg:text-lg leading-snug">
        {item.title}
      </h4>

      <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
        {item.excerpt || item.content?.substring(0, 120) + '...'}
      </p>

      <Link
        href={`/news/${item.id}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
        aria-label={`Read more about ${item.title}`}
      >
        Read More
        <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.article>
  );
});

NewsCard.displayName = 'NewsCard';

const EventCard = memo(({ item, index }: { item: Event; index: number }) => {
  const formatEventDate = (startDate: string, endDate?: string) => {
    if (!startDate) return 'Date not available';
    try {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : null;

      if (end && start.toDateString() !== end.toDateString()) {
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      }

      return start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 hover:bg-white hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 border border-gray-100 hover:border-emerald-200"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full">
          Event
        </span>
        <time className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full" dateTime={item.start_date}>
          {formatEventDate(item.start_date, item.end_date)}
        </time>
      </div>

      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors text-base lg:text-lg leading-snug">
        {item.title}
      </h4>

      <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
        {item.description?.substring(0, 120) + '...'}
      </p>

      <Link
        href={`/events/${item.id}`}
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-200"
        aria-label={`Learn more about ${item.title}`}
      >
        Learn More
        <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.article>
  );
});

EventCard.displayName = 'EventCard';

export default function NewsEventsPreview({ initialNews = [], initialEvents = [] }: NewsEventsPreviewProps) {
  const { t } = useTranslation();
  const [news, setNews] = useState<News[]>(initialNews);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(!initialNews.length && !initialEvents.length);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'news' | 'events'>('news');

  useEffect(() => {
    if (initialNews.length || initialEvents.length) return;

    const fetchData = async () => {
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

        const newsData = await newsResponse.json();
        const eventsData = await eventsResponse.json();

        setNews(newsData.news || []);
        setEvents(eventsData.events || []);
      } catch (err) {
        console.error('Error fetching news and events:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialNews.length, initialEvents.length]);

  const newsItems = news.slice(0, 6);
  const eventItems = events.slice(0, 6);

  if (error) {
    return (
      <section className="py-12 lg:py-16" style={{ backgroundColor: '#FAFCFD' }} role="alert">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Content</h3>
            <p className="text-gray-600 mb-4 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
              aria-label="Reload page to try again"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-12 lg:py-20 relative"
      style={{ backgroundColor: '#FAFCFD' }}
      aria-labelledby="news-events-heading"
    >
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPageElement",
            "name": "News and Events",
            "description": "Latest news articles and upcoming events",
            "mainEntity": [
              ...(newsItems.map(item => ({
                "@type": "NewsArticle",
                "headline": item.title,
                "description": item.excerpt || item.content?.substring(0, 160),
                "datePublished": item.publish_date || item.created_at,
                "url": `/news/${item.id}`
              }))),
              ...(eventItems.map(item => ({
                "@type": "Event",
                "name": item.title,
                "description": item.description?.substring(0, 160),
                "startDate": item.start_date,
                "endDate": item.end_date,
                "url": `/events/${item.id}`
              })))
            ]
          })
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header without logo */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h1 
            id="news-events-heading"
            className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-3 lg:mb-4"
          >
            {t('newsEvents.title')}
          </h1>
          <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
            {t('newsEvents.subtitle')}
          </p>
        </motion.header>

        {/* Tab Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-8 lg:mb-10"
          role="tablist"
          aria-label="Content type selection"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1.5 shadow-sm border border-gray-200">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('news')}
                className={`px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg font-medium text-sm lg:text-base transition-all duration-200 ${
                  activeTab === 'news'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/60'
                }`}
                role="tab"
                aria-selected={activeTab === 'news'}
                aria-controls="news-panel"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>News</span>
                  {newsItems.length > 0 && (
                    <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                      {newsItems.length}
                    </span>
                  )}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg font-medium text-sm lg:text-base transition-all duration-200 ${
                  activeTab === 'events'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/60'
                }`}
                role="tab"
                aria-selected={activeTab === 'events'}
                aria-controls="events-panel"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Events</span>
                  {eventItems.length > 0 && (
                    <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                      {eventItems.length}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </motion.nav>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'news' ? (
              <motion.div
                key="news"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                id="news-panel"
                aria-labelledby="news-tab"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{t('newsEvents.news')}</h2>
                      <p className="text-xs lg:text-sm text-gray-500">
                        {newsItems.length} recent {newsItems.length === 1 ? 'article' : 'articles'}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/news"
                    className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 text-sm lg:text-base"
                  >
                    View All
                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {newsItems.length > 0 ? (
                    newsItems.map((item, index) => (
                      <NewsCard key={item.id} item={item} index={index} />
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
                      description="Check back later for the latest updates and announcements."
                    />
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="events"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                id="events-panel"
                aria-labelledby="events-tab"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Upcoming Events</h2>
                      <p className="text-xs lg:text-sm text-gray-500">
                        {eventItems.length} upcoming {eventItems.length === 1 ? 'activity' : 'activities'}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/events"
                    className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg font-medium transition-all duration-200 text-sm lg:text-base"
                  >
                    View All
                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {eventItems.length > 0 ? (
                    eventItems.map((item, index) => (
                      <EventCard key={item.id} item={item} index={index} />
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
                      description="Stay tuned for exciting upcoming events and activities."
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}