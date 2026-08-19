import React from 'react';
import { Metadata } from 'next';
import ClassDetailView from '@/components/academic/ClassDetailView';
import { classesDataMap } from '@/lib/classDetails';

export const metadata: Metadata = {
  title: 'Class Two (২য় শ্রেণি) - Surjomukhi Kindergarten',
  description: 'Advancing literacy comprehension, multiplication tables, short essay writing, experimental science inquiry, and peer teamwork for ages 6-7.',
  keywords: ['class two', 'grade 2', 'primary education', 'surjomukhi kindergarten'],
  openGraph: {
    title: 'Class Two (২য় শ্রেণি) - Surjomukhi Kindergarten',
    description: 'Advancing literacy, numeracy, and environmental inquiry.',
    type: 'website',
  },
};

export default function ClassTwoPage() {
  const data = classesDataMap['two'];
  return <ClassDetailView data={data} />;
}
