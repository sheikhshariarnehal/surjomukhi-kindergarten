'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { News, Event } from '@/types';

interface NewsEventsPreviewProps {
  initialNews?: News[];
  initialEvents?: Event[];
}

export default function NewsEventsPreview({ initialNews = [], initialEvents = [] }: NewsEventsPreviewProps) {
  const [news, setNews] = useState<News[]>(initialNews);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(!initialNews.length && !initialEvents.length);
  const [error, setError] = useState<string | null>(null);



  const formatEventDate = (startDate: string, endDate?: string) => {
    if (!startDate) return 'Date not available';

    try {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : null;

      if (end && start.toDateString() !== end.toDateString()) {
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }

      return start.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getRelativeTime = (dateString: string) => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

      if (diffInHours < 24) {
        return diffInHours < 1 ? 'Just now' : `${diffInHours}h ago`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
      }
    } catch {
      return '';
    }
  };

  useEffect(() => {
    if (initialNews.length || initialEvents.length) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [newsResponse, eventsResponse] = await Promise.all([
          fetch('/api/news?limit=3'),
          fetch('/api/events?limit=4&upcoming=true')
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
        setError('Failed to load latest news and upcoming events');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialNews.length, initialEvents.length]);

  const newsItems = news.slice(0, 3);
  const eventItems = events.slice(0, 4);

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Content</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            News & Events
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Stay informed about our latest updates and upcoming activities.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Loading skeleton */}
            {[1, 2].map((section) => (
              <div key={section} className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded-lg p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Latest News Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Latest News</h3>
                <Link
                  href="/news"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  View All →
                </Link>
              </div>

              {/* News Items */}
              <div className="space-y-4">
                {newsItems.length > 0 ? (
                  newsItems.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                          News
                        </span>
                        <time className="text-xs text-gray-500">
                          {getRelativeTime(item.publish_date || item.created_at || '')}
                        </time>
                      </div>

                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {item.excerpt || item.content?.substring(0, 120) + '...'}
                      </p>

                      <Link
                        href={`/news/${item.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                      >
                        Read More →
                      </Link>
                    </motion.article>
                  ))
                ) : (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">No News Available</h3>
                    <p className="text-gray-600 text-sm">Check back later for updates.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Upcoming Events Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
                <Link
                  href="/events"
                  className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                >
                  View All →
                </Link>
              </div>

              {/* Events List */}
              <div className="space-y-4">
                {eventItems.length > 0 ? (
                  eventItems.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                          Event
                        </span>
                        <time className="text-xs text-gray-500">
                          {formatEventDate(item.start_date, item.end_date)}
                        </time>
                      </div>

                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {item.description?.substring(0, 120) + '...'}
                      </p>

                      <Link
                        href={`/events/${item.id}`}
                        className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
                      >
                        Learn More →
                      </Link>
                    </motion.article>
                  ))
                ) : (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">No Events Scheduled</h3>
                    <p className="text-gray-600 text-sm">Stay tuned for upcoming events.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}


      </div>
    </section>
  );
}
