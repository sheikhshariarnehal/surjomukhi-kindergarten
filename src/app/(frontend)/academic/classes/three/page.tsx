import React from 'react';
import { Metadata } from 'next';
import ClassDetailView from '@/components/academic/ClassDetailView';
import { classesDataMap } from '@/lib/classDetails';

export const metadata: Metadata = {
  title: 'Class Three (৩য় শ্রেণি) - Surjomukhi Kindergarten',
  description: 'Intermediate primary schooling with critical thinking, advanced grammar, fractions, Bangladesh studies, and scientific inquiry for ages 7-8.',
  keywords: ['class three', 'grade 3', 'primary schooling', 'surjomukhi kindergarten'],
  openGraph: {
    title: 'Class Three (৩য় শ্রেণি) - Surjomukhi Kindergarten',
    description: 'Cultivating analytical thinking and subject mastery in Class Three.',
    type: 'website',
  },
};

export default function ClassThreePage() {
  const data = classesDataMap['three'];
  return <ClassDetailView data={data} />;
}
