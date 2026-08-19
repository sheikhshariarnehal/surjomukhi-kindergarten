'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Event } from '@/types/event';
import { DataLoadingErrorFallback } from '@/components/frontend/ErrorFallback';

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

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

  // Date badge helper
  const getEventDateBadge = (startDate: string) => {
    try {
      const d = new Date(startDate);
      if (isNaN(d.getTime())) return { month: 'EVT', day: '•' };
      return {
        month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        day: d.toLocaleDateString('en-US', { day: 'numeric' }),
      };
    } catch {
      return { month: 'EVT', day: '•' };
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
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-7 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-gray-100">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Upcoming Events</h3>
          <p className="text-xs sm:text-sm text-gray-500">School calendar & ceremonies</p>
        </div>
        
        {showViewAll && events.length > 0 && (
          <Link
            href="/events"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors flex items-center group"
            aria-label="View all events"
          >
            View All
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Events List */}
      <div className="divide-y divide-gray-100" role="list" aria-label="Upcoming events">
        <AnimatePresence>
          {events.length > 0 ? (
            events.slice(0, limit).map((event, index) => {
              const { month, day } = getEventDateBadge(event.start_date);
              return (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="group"
                  role="listitem"
                >
                  <Link
                    href={`/events/${createSlug(event.title)}/${event.id}`}
                    className="flex items-center space-x-3.5 py-3.5 px-2.5 -mx-2.5 rounded-xl hover:bg-slate-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:bg-slate-50/80 transition-all duration-200"
                  >
                    {/* Functional Calendar Date Tile */}
                    <div className="w-11 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100/80 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-emerald-100/70 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 leading-none mb-0.5">
                        {month}
                      </span>
                      <span className="text-base font-extrabold text-emerald-950 leading-none">
                        {day}
                      </span>
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1 text-sm sm:text-base leading-snug">
                        {event.title}
                      </h4>
                      
                      <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
                        <time dateTime={event.start_date} className="truncate">
                          {formatEventDate(event.start_date, event.end_date)}
                        </time>
                        {isUpcoming(event.start_date) && (
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[11px] font-medium flex-shrink-0">
                            Upcoming
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
              role="status"
              aria-live="polite"
            >
              <p className="text-gray-500 text-sm">No upcoming events scheduled</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
