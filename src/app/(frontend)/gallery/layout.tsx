import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Gallery - Photos & Memories',
  description: 'Explore our school gallery featuring photos of students, events, activities, and memorable moments at Surjomukhi Kindergarten. See our vibrant school community in action.',
  keywords: ['school gallery', 'school photos', 'student activities', 'school events', 'kindergarten photos', 'school memories', 'educational activities'],
  openGraph: {
    title: 'School Gallery - Photos & Memories',
    description: 'Explore our school gallery featuring photos of students, events, activities, and memorable moments at Surjomukhi Kindergarten.',
    type: 'website',
    images: [
      {
        url: '/images/gallery-og.jpg',
        width: 1200,
        height: 630,
        alt: 'School Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School Gallery - Photos & Memories',
    description: 'Explore our school gallery featuring photos of students, events, activities, and memorable moments.',
    images: ['/images/gallery-og.jpg'],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
