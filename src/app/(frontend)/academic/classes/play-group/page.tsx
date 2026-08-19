import React from 'react';
import { Metadata } from 'next';
import ClassDetailView from '@/components/academic/ClassDetailView';
import { classesDataMap } from '@/lib/classDetails';

export const metadata: Metadata = {
  title: 'Play Group (প্লে গ্রুপ) - Surjomukhi Kindergarten',
  description: 'Gentle introduction to school life where toddlers (ages 3-4) learn through play, sensory exploration, and joyful social interaction.',
  keywords: ['play group', 'toddlers', 'early childhood', 'kindergarten', 'surjomukhi', 'nawabganj'],
  openGraph: {
    title: 'Play Group (প্লে গ্রুপ) - Surjomukhi Kindergarten',
    description: 'Nurturing early childhood development through play-based activities and care.',
    type: 'website',
  },
};

export default function PlayGroupPage() {
  const data = classesDataMap['play-group'];
  return <ClassDetailView data={data} />;
}
