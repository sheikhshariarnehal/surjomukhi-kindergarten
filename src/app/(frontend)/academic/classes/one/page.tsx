import React from 'react';
import { Metadata } from 'next';
import ClassDetailView from '@/components/academic/ClassDetailView';
import { classesDataMap } from '@/lib/classDetails';

export const metadata: Metadata = {
  title: 'Class One (১ম শ্রেণি) - Surjomukhi Kindergarten',
  description: 'Formal primary schooling inception covering national curriculum textbooks, reading fluency, handwriting, and mathematics for ages 5-6.',
  keywords: ['class one', 'grade 1', 'primary school', 'surjomukhi kindergarten'],
  openGraph: {
    title: 'Class One (১ম শ্রেণি) - Surjomukhi Kindergarten',
    description: 'Formal primary schooling introduction focusing on fluent reading and arithmetic.',
    type: 'website',
  },
};

export default function ClassOnePage() {
  const data = classesDataMap['one'];
  return <ClassDetailView data={data} />;
}
