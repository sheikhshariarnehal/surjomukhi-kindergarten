import React from 'react';
import { Metadata } from 'next';
import ClassDetailView from '@/components/academic/ClassDetailView';
import { classesDataMap } from '@/lib/classDetails';

export const metadata: Metadata = {
  title: 'Class Five (৫ম শ্রেণি) - Surjomukhi Kindergarten',
  description: 'Graduating senior primary tier, comprehensive syllabus completion, merit scholarship exam mentoring, and secondary school readiness for ages 9-10.',
  keywords: ['class five', 'grade 5', 'scholarship examination', 'primary completion', 'surjomukhi kindergarten'],
  openGraph: {
    title: 'Class Five (৫ম শ্রেণি) - Surjomukhi Kindergarten',
    description: 'Premier Class Five graduation program, scholarship mentorship, and leadership excellence.',
    type: 'website',
  },
};

export default function ClassFivePage() {
  const data = classesDataMap['five'];
  return <ClassDetailView data={data} />;
}
