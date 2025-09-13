'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Event } from '@/types/event';
import { formatDate } from '@/lib/utils';
import { DataLoadingErrorFallback } from '@/components/frontend/ErrorFallback';

interface EventsComponentProps {
  initialEvents?: Event[];
  limit?: number;
  showViewAll?: boolean;
  className?: string;
}

interface EventsResponse {
  events: Event[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function EventsComponent({ 
  initialEvents = [], 
  limit = 4, 
  showViewAll = true,
  className = '' 
}: EventsComponentProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(!initialEvents.length);
  const [error, setError] = useState<string | null>(null);

  // Format event date range
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

  // Check if event is upcoming
  const isUpcoming = (startDate: string) => {
    try {
      return new Date(startDate) > new Date();
    } catch {
      return false;
    }
  };

  // Fetch events from API
  useEffect(() => {
    if (initialEvents.length > 0) return;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/events?limit=${limit}&upcoming=true`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data: EventsResponse = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load upcoming events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [initialEvents.length, limit]);

  // Retry function for error handling
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events?limit=${limit}&upcoming=true`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data: EventsResponse = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load upcoming events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  };

  // Loading state
  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-5 h-5 bg-emerald-300 rounded animate-pulse"></div>
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
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
              <p className="text-sm text-gray-500">Stay updated with our latest events</p>
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
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3" aria-hidden="true">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
            <p className="text-sm text-gray-500">Stay updated with our latest events</p>
          </div>
        </div>
        
        {showViewAll && events.length > 0 && (
          <Link
            href="/events"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors duration-200 flex items-center group"
            aria-label="View all events"
          >
            View All
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Events List */}
      <div className="space-y-4" role="list" aria-label="Upcoming events">
        <AnimatePresence>
          {events.length > 0 ? (
            events.slice(0, limit).map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
                role="listitem"
              >
                <Link
                  href={`/events/${event.id}`}
                  className="flex items-start space-x-4 p-4 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-emerald-100"
                >
                  {/* Event Icon */}
                  <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
                    </svg>
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-1">
                      {event.title}
                    </h4>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
                      </svg>
                      <time dateTime={event.start_date}>
                        {formatEventDate(event.start_date, event.end_date)}
                      </time>
                      {isUpcoming(event.start_date) && (
                        <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          Upcoming
                        </span>
                      )}
                    </div>
                    
                    {event.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No upcoming events</p>
              <p className="text-gray-400 text-sm mt-1">Check back soon for new events!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
