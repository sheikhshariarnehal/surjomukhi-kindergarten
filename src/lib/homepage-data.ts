import { newsApi, teachersApi, eventsApi, noticesApi } from '@/lib/supabase';
import type { HomePageData } from '@/types/homepage';

// Retry mechanism for failed requests
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

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError!;
}

// Optimized data fetching with error handling, caching, and retry logic
export async function getHomePageData(): Promise<HomePageData> {
  try {
    // Use Promise.allSettled for better error handling with retry mechanism
    const [newsResult, eventsResult, noticesResult, teachersResult] = await Promise.allSettled([
      withRetry(() => newsApi.getRecent(3), 2, 500),
      withRetry(() => eventsApi.getUpcoming(3), 2, 500),
      withRetry(() => noticesApi.getRecent(4), 2, 500),
      withRetry(() => teachersApi.getAll(), 2, 500)
    ]);

    // Extract data with fallbacks
    const news = newsResult.status === 'fulfilled' ? newsResult.value : [];
    const events = eventsResult.status === 'fulfilled' ? eventsResult.value : [];
    const notices = noticesResult.status === 'fulfilled' ? noticesResult.value : [];
    const allTeachers = teachersResult.status === 'fulfilled' ? teachersResult.value : [];

    // Log any errors for monitoring with more context
    const dataTypes = ['news', 'events', 'notices', 'teachers'];
    [newsResult, eventsResult, noticesResult, teachersResult].forEach((result, index) => {
      if (result.status === 'rejected') {
        const errorInfo = {
          dataType: dataTypes[index],
          error: result.reason,
          timestamp: new Date().toISOString(),
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
        };

        console.error(`Error fetching ${dataTypes[index]}:`, errorInfo);

        // In production, you might want to send this to an error tracking service
        if (process.env.NODE_ENV === 'production') {
          // Example: sendErrorToService(errorInfo);
        }
      }
    });

    return {
      news,
      events,
      notices,
      teachers: allTeachers.slice(0, 4) // Limit to 4 featured teachers for performance
    };
  } catch (error) {
    console.error('Critical error in getHomePageData:', error);

    // Return empty data structure to prevent page crashes
    return {
      news: [],
      events: [],
      notices: [],
      teachers: []
    };
  }
}

// Utility function to calculate teacher experience
export function calculateTeacherExperience(joinDate?: string): number {
  if (!joinDate) return 0;
  
  try {
    const join = new Date(joinDate);
    const now = new Date();
    return Math.max(0, now.getFullYear() - join.getFullYear());
  } catch {
    return 0;
  }
}

// Utility function to format subjects for display
export function formatSubjects(subjects?: string[]): string[] {
  if (!subjects || !Array.isArray(subjects)) return [];
  return subjects.filter(Boolean).slice(0, 3); // Limit to 3 subjects for UI
}

// Cache configuration for static data
export const CACHE_CONFIG = {
  revalidate: 300, // 5 minutes
  tags: ['homepage-data']
} as const;

// Type-safe data transformation
export function transformTeacherData(teachers: any[]): HomePageData['teachers'] {
  return teachers.map(teacher => ({
    id: teacher.id || '',
    name: teacher.name || 'Unknown Teacher',
    designation: teacher.designation || 'Teacher',
    bio: teacher.bio,
    photo_url: teacher.photo_url,
    subjects: Array.isArray(teacher.subjects) ? teacher.subjects : [],
    join_date: teacher.join_date,
    created_at: teacher.created_at,
    updated_at: teacher.updated_at
  }));
}

// Performance monitoring utility
export function measureDataFetchTime<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  const start = performance.now();
  
  return operation().finally(() => {
    const duration = performance.now() - start;
    if (duration > 1000) { // Log slow operations
      console.warn(`Slow data fetch detected: ${operationName} took ${duration.toFixed(2)}ms`);
    }
  });
}
