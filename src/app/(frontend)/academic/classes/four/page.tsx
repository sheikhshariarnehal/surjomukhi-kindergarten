import React from 'react';
import { Metadata } from 'next';
import ClassDetailView from '@/components/academic/ClassDetailView';
import { classesDataMap } from '@/lib/classDetails';

export const metadata: Metadata = {
  title: 'Class Four (৪র্থ শ্রেণি) - Surjomukhi Kindergarten',
  description: 'Upper primary syllabus mastery, advanced arithmetic, essay composition, scientific investigation, and leadership skills for ages 8-9.',
  keywords: ['class four', 'grade 4', 'upper primary', 'surjomukhi kindergarten'],
  openGraph: {
    title: 'Class Four (৪র্থ শ্রেণি) - Surjomukhi Kindergarten',
    description: 'Advanced academic preparation, mathematical reasoning, and creative writing.',
    type: 'website',
  },
};

export default function ClassFourPage() {
  const data = classesDataMap['four'];
  return <ClassDetailView data={data} />;
}
