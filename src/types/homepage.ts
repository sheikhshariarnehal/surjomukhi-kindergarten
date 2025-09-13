// Homepage-specific types for better type safety and performance

export interface HomePageData {
  news: News[];
  events: Event[];
  notices: Notice[];
  teachers: Teacher[];
}

export interface Notice {
  id: string;
  title: string;
  slug: string;
  content: string;
  publish_date?: string;
  file_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface News {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  publish_date?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  bio?: string;
  photo_url?: string;
  subjects?: string[];
  join_date?: string;
  created_at?: string;
  updated_at?: string;
}

// Props interfaces for components
export interface TeacherCardProps {
  teacher: Teacher;
  experienceYears: number;
  subjects: string[];
}

export interface NoticeBoardProps {
  notices: Notice[];
  limit?: number;
}

export interface NewsEventsPreviewProps {
  initialNews: News[];
  initialEvents: Event[];
}

export interface StatsCounterProps {
  stats?: StatItem[];
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  color?: string;
  icon?: React.ReactNode;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Error handling types
export interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorMessage?: string;
}

export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

// SEO and metadata types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}
