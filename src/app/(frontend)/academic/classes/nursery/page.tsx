import React from 'react';
import { Metadata } from 'next';
import ClassDetailView from '@/components/academic/ClassDetailView';
import { classesDataMap } from '@/lib/classDetails';

export const metadata: Metadata = {
  title: 'Nursery (নার্সারি) - Surjomukhi Kindergarten',
  description: 'Foundational learning in Bangla and English phonics, number concepts, creativity, and classroom independence for ages 4-5.',
  keywords: ['nursery', 'early learning', 'alphabet phonics', 'kindergarten', 'surjomukhi'],
  openGraph: {
    title: 'Nursery (নার্সারি) - Surjomukhi Kindergarten',
    description: 'Building pre-literacy and early numeracy through structured discovery.',
    type: 'website',
  },
};

export default function NurseryPage() {
  const data = classesDataMap['nursery'];
  return <ClassDetailView data={data} />;
}
