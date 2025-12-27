'use client';

import React from 'react';
import { motion } from 'framer-motion';
import EventsComponent from './EventsComponent';
import NoticesComponent from './NoticesComponent';
import ErrorBoundary from './ErrorBoundary';
import { Event } from '@/types/event';
import { Notice } from '@/types/notice';
import { useTranslation } from '@/contexts/LanguageContext';

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
  const { t } = useTranslation();

  const ErrorFallback = ({ title }: { title: string; type?: string }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-500">Content temporarily unavailable</p>
      </div>
    </div>
  );

  return (
    <section 
      className={`py-16 bg-gray-50 ${className}`}
      aria-labelledby="events-notices-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            id="events-notices-heading" 
            className="text-3xl font-semibold text-gray-900 mb-3"
          >
            {t('eventsNotices.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('eventsNotices.subtitle')}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ErrorBoundary
              fallback={
                <ErrorFallback 
                  title={t('events.unavailable', 'Events Unavailable')} 
                  type="events" 
                />
              }
            >
              <EventsComponent 
                initialEvents={initialEvents}
                limit={3}
                showViewAll={true}
                className="h-full"
              />
            </ErrorBoundary>
          </motion.div>

          {/* Notices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ErrorBoundary
              fallback={
                <ErrorFallback 
                  title={t('notices.unavailable', 'Notices Unavailable')} 
                  type="notices" 
                />
              }
            >
              <NoticesComponent 
                initialNotices={initialNotices}
                limit={3}
                showViewAll={true}
                className="h-full"
              />
            </ErrorBoundary>
          </motion.div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Events and Notices",
            "description": "Latest events and important notices",
            "itemListElement": [
              ...initialEvents.slice(0, 3).map((event, index) => ({
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
              })),
              ...initialNotices.slice(0, 3).map((notice, index) => ({
                "@type": "Article",
                "position": initialEvents.length + index + 1,
                "headline": notice.title,
                "datePublished": notice.publish_date,
                "publisher": {
                  "@type": "Organization",
                  "name": "Surjomukhi Kindergarten"
                }
              }))
            ]
          })
        }}
      />
    </section>
  );
}