import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/frontend/Hero';
import StatsCounter from '@/components/frontend/StatsCounter';
import NewsEventsPreview from '@/components/frontend/NewsEventsPreview';
import EventsNoticesSection from '@/components/frontend/EventsNoticesSection';
import StructuredData from '@/components/frontend/StructuredData';
import ErrorBoundary from '@/components/frontend/ErrorBoundary';
import TeacherPreview from '@/components/frontend/TeacherPreview';
import QuickLinks from '@/components/frontend/QuickLinks';
import { getHomePageData } from '@/lib/homepage-data';
import type { HomePageData } from '@/types/homepage';

// Enhanced metadata with comprehensive SEO optimization
export const metadata: Metadata = {
  title: 'Surjomukhi Kindergarten | Bangla Medium Primary Education | Established 2004',
  description: 'Surjomukhi Kindergarten is a private primary educational institution established in 2004, located in Nawabganj, Dhaka. We provide quality Bangla medium education from nursery to Grade 5 with focus on creative, ethical, and holistic development.',
  keywords: [
    'Surjomukhi Kindergarten',
    'Bangla medium school',
    'primary education Bangladesh',
    'Nawabganj school',
    'Dhaka kindergarten',
    'nursery to grade 5',
    'private school Bangladesh',
    'creative education',
    'ethical education',
    'holistic development',
    'Aona Bazar school',
    'established 2004',
    'quality education',
    'child development',
    'primary school admission',
    'Salauddin Complex',
    'educational institution',
    'student development',
    'moral values education',
    'progressive education'
  ],
  authors: [{ name: 'Surjomukhi Kindergarten' }],
  creator: 'Surjomukhi Kindergarten',
  publisher: 'Surjomukhi Kindergarten',
  category: 'Education',
  classification: 'Early Childhood Education',
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
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'bn-BD': '/bn',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Surjomukhi Kindergarten',
    title: 'Surjomukhi Kindergarten - Bangla Medium Primary Education Since 2004',
    description: 'Private primary educational institution in Nawabganj, Dhaka providing quality Bangla medium education from nursery to Grade 5 with focus on creative, ethical, and holistic development.',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Surjomukhi Kindergarten Campus - Modern facilities for early childhood education',
        type: 'image/jpeg',
      },
      {
        url: '/og-home-square.jpg',
        width: 600,
        height: 600,
        alt: 'Surjomukhi Kindergarten Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SurjomukhiKG',
    creator: '@SurjomukhiKG',
    title: 'Surjomukhi Kindergarten - Premier Early Childhood Education',
    description: 'Excellence in early childhood education with qualified teachers, modern facilities, and comprehensive development programs for your child\'s bright future.',
    images: ['/og-home.jpg'],
  },
  other: {
    'theme-color': '#2563eb',
    'color-scheme': 'light',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Surjomukhi KG',
    'application-name': 'Surjomukhi Kindergarten',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default async function HomePage() {
  // Fetch homepage data with optimized error handling
  const { news, events, notices }: HomePageData = await getHomePageData();

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Enhanced Structured Data for SEO */}
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Surjomukhi Kindergarten",
            "alternateName": "সূর্যমুখী কিন্ডারগার্টেন",
            "description": "Private primary educational institution established in 2004, providing quality Bangla medium education from nursery to Grade 5 with focus on creative, ethical, and holistic development.",
            "url": "http://www.surjamukhikindergarten.com",
            "logo": "/logo.png",
            "image": "/og-home.jpg",
            "telephone": ["+880-1819198965", "+880-1711528045"],
            "email": "surjamukhikindergarten@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD",
              "addressLocality": "Nawabganj",
              "addressRegion": "Dhaka",
              "postalCode": "1320",
              "streetAddress": "Salauddin Complex, Aona Bazar"
            },
            "foundingDate": "2004-01-01",
            "numberOfStudents": 55,
            "educationalCredentialAwarded": "Primary Education Certificate",
            "hasCredential": "Bangla Medium Primary Education",
            "educationalLevel": "Primary Education",
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": "student",
              "audienceType": "children aged 3-11"
            }
          })
        }}
      />

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

        {/* Teachers Section - Using Optimized Component */}
        <ErrorBoundary>
          <TeacherPreview />
        </ErrorBoundary>

        {/* Events & Notices Section */}
        <ErrorBoundary>
          <EventsNoticesSection initialEvents={events as any} initialNotices={notices as any} />
        </ErrorBoundary>

        {/* Latest News & Upcoming Events */}
        <ErrorBoundary>
          <NewsEventsPreview initialNews={news as any} initialEvents={events as any} />
        </ErrorBoundary>

        {/* Quick Links Section - Using Optimized Component */}
        <ErrorBoundary>
          <QuickLinks />
        </ErrorBoundary>
    </main>
    </>
  );
}
