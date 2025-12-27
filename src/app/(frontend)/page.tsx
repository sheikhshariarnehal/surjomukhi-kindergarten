import React, { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import StructuredData from '@/components/frontend/StructuredData';
import ErrorBoundary from '@/components/frontend/ErrorBoundary';
import { getHomePageData } from '@/lib/homepage-data';
import type { HomePageData } from '@/types/homepage';

// Import Hero directly without dynamic import for instant rendering
import Hero from '@/components/frontend/Hero';

// Dynamic imports for heavy components - reduces initial bundle
const StatsCounter = dynamic(() => import('@/components/frontend/StatsCounter'), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />,
  ssr: true
});

const EventsNoticesSection = dynamic(() => import('@/components/frontend/EventsNoticesSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
  ssr: true
});

const TeacherPreview = dynamic(() => import('@/components/frontend/TeacherPreview'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const NewsEventsPreview = dynamic(() => import('@/components/frontend/NewsEventsPreview'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
  ssr: true
});

const QuickLinks = dynamic(() => import('@/components/frontend/QuickLinks'), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
  ssr: true
});

// Enhanced metadata with comprehensive SEO optimization
export const viewport: Viewport = {
  themeColor: '#2563eb',
  colorScheme: 'light',
};

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
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Surjomukhi KG',
    'application-name': 'Surjomukhi Kindergarten',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
  },
};

// Enable ISR (Incremental Static Regeneration) for better performance
export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
  // Fetch only critical initial data - defer non-critical data
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
            "telephone": ["+880-1954113374"],
            "email": "info.surjamukhikindergarten@gmail.com",
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
        {/* Hero Section - Optimized for instant loading */}
        <ErrorBoundary fallback={
          <div className="h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Welcome to Surjomukhi Kindergarten</h1>
              <p className="text-xl">Excellence in Early Childhood Education</p>
            </div>
          </div>
        }>
          <Hero />
        </ErrorBoundary>

        {/* Stats Counter - Deferred loading */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-32 bg-gray-50 animate-pulse" />}>
            <StatsCounter />
          </Suspense>
        </ErrorBoundary>

        {/* Events & Notices Section - Below fold, can be deferred */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
            <EventsNoticesSection initialEvents={events} initialNotices={notices} />
          </Suspense>
        </ErrorBoundary>

        {/* Teachers Section - Deferred loading */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
            <TeacherPreview />
          </Suspense>
        </ErrorBoundary>

        {/* Latest News & Upcoming Events - Lower priority */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
            <NewsEventsPreview initialNews={news} initialEvents={events} />
          </Suspense>
        </ErrorBoundary>

        {/* Quick Links Section - Lowest priority */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse" />}>
            <QuickLinks />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
}
