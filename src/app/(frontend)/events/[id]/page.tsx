'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Event } from '@/types';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(`/api/events/${params.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else if (response.status === 404) {
          setNotFound(true);
        } else {
          throw new Error('Failed to fetch event');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const getEventStatus = (startDate: string, endDate?: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;

    if (now < start) {
      return { status: 'upcoming', color: 'bg-blue-100 text-blue-800' };
    } else if (now >= start && now <= end) {
      return { status: 'ongoing', color: 'bg-green-100 text-green-800' };
    } else {
      return { status: 'completed', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const handleShare = async () => {
    if (navigator.share && event) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description?.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/events"
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const eventStatus = getEventStatus(event.start_date, event.end_date);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-emerald-600">Home</Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/events" className="text-gray-500 hover:text-emerald-600">Events</Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Event Details</span>
          </nav>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Featured Image */}
            {event.featured_image && (
              <div className="aspect-video relative">
                <Image
                  src={event.featured_image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Event
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${eventStatus.color}`}>
                  {eventStatus.status.charAt(0).toUpperCase() + eventStatus.status.slice(1)}
                </span>
                {event.category && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {event.category}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Date:</span>
                    <span className="ml-2">{formatEventDate(event.start_date, event.end_date)}</span>
                  </div>
                  
                  {event.start_time && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Time:</span>
                      <span className="ml-2">{event.start_time}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {event.location && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{event.location}</span>
                    </div>
                  )}

                  {event.organizer && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">Organizer:</span>
                      <span className="ml-2">{event.organizer}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <span>Published: {formatDate(event.created_at)}</span>
                  {event.updated_at !== event.created_at && (
                    <span>Updated: {formatDate(event.updated_at)}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleShare}
                    className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </button>
                  
                  <button
                    onClick={handlePrint}
                    className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="prose prose-lg max-w-none">
                {event.description ? (
                  event.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    No description available for this event.
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/events"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 sm:mb-0"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to All Events
                </Link>
                
                <div className="text-sm text-gray-500">
                  Event ID: {event.id}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
