import { Suspense } from 'react';
import EventsNoticesSection from '@/components/frontend/EventsNoticesSection';
import { eventsApi, noticesApi } from '@/lib/supabase';
import { Notice } from '@/types/notice';
import { Event } from '@/types/event';

// Retry mechanism for failed requests (copied from homepage-data.ts)
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxRetries) throw lastError;
      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  throw lastError!;
}

export default async function EventsNoticesWrapper() {
  // Parallel fetching for this section
  const [eventsResult, noticesResult] = await Promise.allSettled([
    withRetry(() => eventsApi.getRecent(3), 2, 500), 
    withRetry(() => noticesApi.getRecent(3), 2, 500),
  ]);

  const events = (eventsResult.status === 'fulfilled' ? eventsResult.value : []) as Event[];
  const notices = (noticesResult.status === 'fulfilled' ? noticesResult.value : []) as Notice[];

  return <EventsNoticesSection initialEvents={events} initialNotices={notices} />;
}
