import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campus Tour - Surjomukhi Kindergarten | Explore Our Modern Facilities',
  description: 'Take a virtual tour of Surjomukhi Kindergarten. Explore our playground, library, classrooms, and safe learning environment. Schedule a visit to see our child-friendly campus in Bangladesh.',
  keywords: [
    'campus tour',
    'kindergarten facilities',
    'school campus',
    'playground',
    'library',
    'classrooms',
    'safe learning environment',
    'Surjomukhi Kindergarten',
    'Bangladesh kindergarten',
    'school facilities',
    'educational campus',
    'child-friendly environment',
    'ক্যাম্পাস ট্যুর',
    'স্কুল সুবিধা',
  ],
  openGraph: {
    title: 'Campus Tour - Surjomukhi Kindergarten',
    description: 'Explore our beautiful, child-friendly campus designed for optimal learning and development.',
    url: 'https://surjomukhikindergarten.com/about/campus-tour',
    siteName: 'Surjomukhi Kindergarten',
    images: [
      {
        url: '/images/Annual Sports Day.webp',
        width: 1200,
        height: 630,
        alt: 'Surjomukhi Kindergarten Campus',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campus Tour - Surjomukhi Kindergarten',
    description: 'Explore our beautiful, child-friendly campus designed for optimal learning.',
    images: ['/images/Annual Sports Day.webp'],
  },
  alternates: {
    canonical: 'https://surjomukhikindergarten.com/about/campus-tour',
  },
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
};
