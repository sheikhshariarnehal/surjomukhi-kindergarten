import { Suspense } from 'react';
import NewsEventsPreview from '@/components/frontend/NewsEventsPreview';
import { newsApi, eventsApi } from '@/lib/supabase';
import { News } from '@/types/news';
import { Event } from '@/types/event';

// Reuse retry logic or import shared utility if possible, duplication for now to enable isolation
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

export default async function NewsEventsWrapper() {
  const [newsResult, eventsResult] = await Promise.allSettled([
    withRetry(() => newsApi.getRecent(3), 2, 500),
    withRetry(() => eventsApi.getRecent(3), 2, 500),
  ]);

  const news = (newsResult.status === 'fulfilled' ? newsResult.value : []) as News[];
  const events = (eventsResult.status === 'fulfilled' ? eventsResult.value : []) as Event[];

  return <NewsEventsPreview initialNews={news} initialEvents={events} />;
}
