'use client';

import React from 'react';
import { motion } from 'framer-motion';
import EventsComponent from './EventsComponent';
import NoticesComponent from './NoticesComponent';
import ErrorBoundary from './ErrorBoundary';
import { Event } from '@/types/event';
import { Notice } from '@/types/notice';

interface EventsNoticesSectionProps {
  initialEvents?: Event[];
  initialNotices?: Notice[];
  className?: string;
}

export default function EventsNoticesSection({ 
  initialEvents = [], 
  initialNotices = [],
  className = '' 
}: EventsNoticesSectionProps) {
  return (
    <section 
      className={`py-8 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50/70 to-blue-50/30 ${className}`}
      aria-labelledby="events-notices-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Main Content Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8 lg:mb-10"
        >
          <h2 id="events-notices-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            Events & Notices
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            Stay updated with our latest events and announcements
          </p>
        </motion.div>

        {/* Events and Notices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {/* Events Component */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <ErrorBoundary
              fallback={
                <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <div className="flex items-center justify-center py-6 sm:py-8">
                    <div className="text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Events Unavailable</h4>
                      <p className="text-xs sm:text-sm text-gray-500">Please check back later</p>
                    </div>
                  </div>
                </div>
              }
            >
              <EventsComponent 
                initialEvents={initialEvents}
                limit={3}
                showViewAll={true}
                className="w-full h-full"
              />
            </ErrorBoundary>
          </motion.div>

          {/* Notices Component */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <ErrorBoundary
              fallback={
                <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <div className="flex items-center justify-center py-6 sm:py-8">
                    <div className="text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Notices Unavailable</h4>
                      <p className="text-xs sm:text-sm text-gray-500">Please check back later</p>
                    </div>
                  </div>
                </div>
              }
            >
              <NoticesComponent 
                initialNotices={initialNotices}
                limit={3}
                showViewAll={true}
                className="w-full h-full"
              />
            </ErrorBoundary>
          </motion.div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Surjomukhi Kindergarten Events and Notices",
            "description": "Latest events and important notices from Surjomukhi Kindergarten",
            "itemListElement": [
              ...(initialEvents?.slice(0, 3).map((event, index) => ({
                "@type": "Event",
                "position": index + 1,
                "name": event.title,
                "description": event.description,
                "startDate": event.start_date,
                "endDate": event.end_date,
                "location": {
                  "@type": "Place",
                  "name": "Surjomukhi Kindergarten"
                }
              })) || []),
              ...(initialNotices?.slice(0, 3).map((notice, index) => ({
                "@type": "Article",
                "position": (initialEvents?.length || 0) + index + 1,
                "headline": notice.title,
                "datePublished": notice.publish_date,
                "publisher": {
                  "@type": "Organization",
                  "name": "Surjomukhi Kindergarten"
                }
              })) || [])
            ]
          })
        }}
      />
    </section>
  );
}