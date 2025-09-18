import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Class Schedule - Surjomukhi Kindergarten',
  description: 'View our comprehensive class schedule for all grades from Play to Class Five. Daily routine with experienced teachers for optimal learning and development.',
  keywords: [
    'class schedule',
    'class routine', 
    'school timetable',
    'kindergarten schedule',
    'surjomukhi kindergarten',
    'daily routine',
    'school hours',
    'academic schedule'
  ],
  openGraph: {
    title: 'Class Schedule - Surjomukhi Kindergarten',
    description: 'View our comprehensive class schedule for all grades from Play to Class Five.',
    type: 'website',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Surjomukhi Kindergarten Class Schedule',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class Schedule - Surjomukhi Kindergarten',
    description: 'View our comprehensive class schedule for all grades from Play to Class Five.',
    images: ['/twitter-card.jpg'],
  },
  alternates: {
    canonical: '/academic/class-schedule',
  },
};

interface ClassScheduleLayoutProps {
  children: ReactNode;
}

export default function ClassScheduleLayout({ children }: ClassScheduleLayoutProps) {
  return children;
}