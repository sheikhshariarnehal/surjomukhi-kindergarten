'use client';

import React from 'react';
import Hero from '@/components/frontend/Hero';
import NoticeBoard from '@/components/frontend/NoticeBoard';
import StatsCounter from '@/components/frontend/StatsCounter';
import MessagesSection from '@/components/frontend/MessagesSection';
import NewsEventsPreview from '@/components/frontend/NewsEventsPreview';
import TeacherPreview from '@/components/frontend/TeacherPreview';
import QuickLinks from '@/components/frontend/QuickLinks';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Counter */}
      <StatsCounter />

      {/* Messages Section */}
      <MessagesSection />

      {/* Notice Board */}
      <NoticeBoard />

      {/* News & Events Preview */}
      <NewsEventsPreview />

      {/* Teacher Preview */}
      <TeacherPreview />

      {/* Quick Links */}
      <QuickLinks />
    </main>
  );
}
