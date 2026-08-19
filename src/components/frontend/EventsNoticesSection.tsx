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
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
      <div className="text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-500 text-sm">Content temporarily unavailable</p>
      </div>
    </div>
  );

  return (
    <section 
      className={`py-16 sm:py-20 lg:py-24 relative overflow-hidden ${className}`}
      aria-labelledby="events-notices-heading"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)',
      }}
    >
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with clean typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 
            id="events-notices-heading" 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight"
          >
            {t('eventsNotices.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('eventsNotices.subtitle')}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full"
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
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
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