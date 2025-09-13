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
      className={`py-16 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}
      aria-labelledby="events-notices-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
            </svg>
          </div>
          <h2 id="events-notices-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Events & Notices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about upcoming events and important announcements from our kindergarten community.
          </p>
        </motion.div>

        {/* Events and Notices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Events Component */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-1"
          >
            <ErrorBoundary
              fallback={
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Events Unavailable</h3>
                      <p className="text-gray-500">Unable to load events at this time.</p>
                    </div>
                  </div>
                </div>
              }
            >
              <EventsComponent 
                initialEvents={initialEvents}
                limit={4}
                showViewAll={true}
                className="h-full"
              />
            </ErrorBoundary>
          </motion.div>

          {/* Notices Component */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-2 lg:order-2"
          >
            <ErrorBoundary
              fallback={
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Notices Unavailable</h3>
                      <p className="text-gray-500">Unable to load notices at this time.</p>
                    </div>
                  </div>
                </div>
              }
            >
              <NoticesComponent 
                initialNotices={initialNotices}
                limit={4}
                showViewAll={true}
                className="h-full"
              />
            </ErrorBoundary>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Stay Connected</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Don't miss out on important updates! Our events and notices are regularly updated to keep our kindergarten community informed about activities, announcements, and important dates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/events"
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200 group"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
                  </svg>
                  View All Events
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="/notices"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 group"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View All Notices
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
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
                "position": initialEvents?.length + index + 1 || index + 1,
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
