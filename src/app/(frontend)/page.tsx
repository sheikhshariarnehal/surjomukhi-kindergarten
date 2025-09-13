import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/frontend/Hero';
import StatsCounter from '@/components/frontend/StatsCounter';
import NewsEventsPreview from '@/components/frontend/NewsEventsPreview';
import EventsNoticesSection from '@/components/frontend/EventsNoticesSection';
import StructuredData from '@/components/frontend/StructuredData';
import ErrorBoundary from '@/components/frontend/ErrorBoundary';
import ModernTeacherCard from '@/components/frontend/ModernTeacherCard';
import { getHomePageData } from '@/lib/homepage-data';
import type { HomePageData } from '@/types/homepage';
import type { Teacher } from '@/types/teacher';

// Enhanced metadata with better SEO optimization
export const metadata: Metadata = {
  title: 'Home - Surjomukhi Kindergarten | Excellence in Early Childhood Education',
  description: 'Welcome to Surjomukhi Kindergarten - providing quality early childhood education since establishment. Our experienced teachers nurture young minds through play-based learning, preparing children for their educational journey in a safe, caring environment.',
  keywords: [
    'Surjomukhi Kindergarten',
    'kindergarten Bangladesh',
    'early childhood education',
    'preschool admission',
    'quality education',
    'child development',
    'play-based learning',
    'experienced teachers',
    'safe learning environment',
    'holistic development',
    'academic excellence',
    'kindergarten admission'
  ],
  authors: [{ name: 'Surjomukhi Kindergarten' }],
  creator: 'Surjomukhi Kindergarten',
  publisher: 'Surjomukhi Kindergarten',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Surjomukhi Kindergarten',
    title: 'Surjomukhi Kindergarten - Excellence in Early Childhood Education',
    description: 'Providing quality early childhood education with experienced teachers, modern facilities, and a nurturing environment for holistic child development.',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Surjomukhi Kindergarten Campus - Modern facilities for early childhood education',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SurjomukhiKG',
    creator: '@SurjomukhiKG',
    title: 'Surjomukhi Kindergarten - Excellence in Early Childhood Education',
    description: 'Quality early childhood education with experienced teachers and modern facilities for holistic child development.',
    images: ['/og-home.jpg'],
  },
};

export default async function HomePage() {
  // Fetch homepage data with optimized error handling
  const { news, events, notices, teachers }: HomePageData = await getHomePageData();
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Structured Data for SEO */}
      <StructuredData type="organization" />
      <StructuredData type="website" />

      <main id="main-content" className="min-h-screen" role="main">
        {/* Hero Section */}
        <ErrorBoundary fallback={
          <div className="h-screen bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Welcome to Surjomukhi Kindergarten</h1>
              <p className="text-xl">Excellence in Early Childhood Education</p>
            </div>
          </div>
        }>
          <Hero />
        </ErrorBoundary>

        {/* Stats Counter */}
        <ErrorBoundary>
          <StatsCounter />
        </ErrorBoundary>

        {/* Events & Notices Section */}
        <ErrorBoundary>
          <EventsNoticesSection initialEvents={events as any} initialNotices={notices as any} />
        </ErrorBoundary>

        {/* Latest News & Upcoming Events */}
        <ErrorBoundary>
          <NewsEventsPreview initialNews={news as any} initialEvents={events as any} />
        </ErrorBoundary>

        {/* Meet Our Dedicated Teachers */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50" aria-labelledby="teachers-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 id="teachers-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Dedicated Teachers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our experienced and qualified faculty members are committed to providing excellent early childhood education and nurturing young minds.
              </p>
            </div>

          <ErrorBoundary>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12" role="list">
              {teachers.length > 0 ? (
                teachers.map((teacher, index) => (
                  <ModernTeacherCard
                    key={teacher.id}
                    teacher={teacher as Teacher}
                    index={index}
                    variant="default"
                  />
                ))
            ) : (
              <div className="col-span-full text-center py-16" role="status" aria-live="polite">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">No teacher profiles available</p>
                <p className="text-gray-400 text-sm mt-1">Check back soon to meet our amazing faculty!</p>
              </div>
            )}
            </div>
          </ErrorBoundary>

          {/* View All Teachers Button */}
          {teachers.length > 0 && (
            <div className="text-center">
              <Link
                href="/teachers"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
              >
                View All Teachers
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

        {/* Quick Links */}
        <section className="py-16 bg-gradient-to-br from-white to-gray-50" aria-labelledby="quicklinks-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h2 id="quicklinks-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Quick Links & Resources
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access important government portals, educational resources, and kindergarten services.
              </p>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Government Links */}
            <section aria-labelledby="government-links-heading">
              <h3 id="government-links-heading" className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Government Portals
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Ministry of Education', desc: 'Official website of the Ministry of Education, Bangladesh', url: 'https://moedu.gov.bd' },
                  { title: 'Education Board', desc: 'Secondary and Higher Secondary Education Board', url: 'https://dshe.gov.bd' }
                ].map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-white rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all duration-300 group hover:shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 mb-2 flex items-center">
                        {link.title}
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{link.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Educational Resources */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Educational Resources
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'National Curriculum Board', desc: 'National Curriculum and Textbook Board (NCTB)', url: 'https://nctb.gov.bd' },
                  { title: 'Education Board Results', desc: 'Check SSC, HSC and other board examination results', url: 'https://eboardresults.com' }
                ].map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-white rounded-xl hover:bg-green-50 hover:border-green-200 border border-gray-200 transition-all duration-300 group hover:shadow-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-green-800 mb-2 flex items-center">
                        {link.title}
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{link.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* School Services */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                School Services
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Admission Information', desc: 'Learn about our admission process and requirements', url: '/admission', internal: true },
                  { title: 'Contact Us', desc: 'Get in touch with our school administration', url: '/contact', internal: true }
                ].map((link, index) => (
                  link.internal ? (
                    <Link key={index} href={link.url} className="flex items-start p-6 bg-white rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-gray-200 transition-all duration-300 group hover:shadow-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-800 mb-2">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{link.desc}</p>
                      </div>
                    </Link>
                  ) : (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-white rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-gray-200 transition-all duration-300 group hover:shadow-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-800 mb-2 flex items-center">
                          {link.title}
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{link.desc}</p>
                      </div>
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
