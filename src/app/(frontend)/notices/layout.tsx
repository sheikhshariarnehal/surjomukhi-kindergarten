import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Notices | Surjamukhi Kindergarten - সূর্যমুখী কিন্ডারগার্টেন | স্কুল নোটিশ',
  description: 'Stay updated with the latest school notices, announcements, and important information from Surjamukhi Kindergarten. স্কুল নোটিশ, ঘোষণা এবং গুরুত্বপূর্ণ তথ্য। Academic notices, general announcements, and event updates.',
  keywords: [
    'school notices',
    'announcements',
    'Surjamukhi Kindergarten',
    'school news',
    'academic notices',
    'school updates',
    'important information',
    'স্কুল নোটিশ',
    'ঘোষণা',
    'সূর্যমুখী কিন্ডারগার্টেন',
    'স্কুল খবর',
    'শিক্ষা বিষয়ক নোটিশ',
    'গুরুত্বপূর্ণ তথ্য',
    'Bangladesh kindergarten',
    'Dhaka school notices'
  ],
  authors: [{ name: 'Surjamukhi Kindergarten' }],
  creator: 'Surjamukhi Kindergarten',
  publisher: 'Surjamukhi Kindergarten',
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
    canonical: 'https://www.surjamukhikindergarten.com/notices',
    languages: {
      'en-US': 'https://www.surjamukhikindergarten.com/notices',
      'bn-BD': 'https://www.surjamukhikindergarten.com/notices',
    },
  },
  openGraph: {
    title: 'School Notices | Surjamukhi Kindergarten',
    description: 'Stay updated with the latest school notices, announcements, and important information from Surjamukhi Kindergarten.',
    type: 'website',
    url: 'https://www.surjamukhikindergarten.com/notices',
    siteName: 'Surjamukhi Kindergarten',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [
      {
        url: 'https://www.surjamukhikindergarten.com/og-notices.jpg',
        width: 1200,
        height: 630,
        alt: 'Surjamukhi Kindergarten School Notices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School Notices | Surjamukhi Kindergarten',
    description: 'Stay updated with the latest school notices and announcements.',
    images: ['https://www.surjamukhikindergarten.com/og-notices.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function NoticesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
