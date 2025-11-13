import HeroLoading from '@/components/frontend/HeroLoading';

/**
 * Loading UI for homepage
 * Displays while page is being generated/loaded
 * Provides instant visual feedback
 */
export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <HeroLoading />
      
      {/* Stats skeleton */}
      <div className="h-32 bg-gray-50 animate-pulse" />
      
      {/* Events & Notices skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-96 bg-white rounded-lg shadow animate-pulse" />
          <div className="h-96 bg-white rounded-lg shadow animate-pulse" />
        </div>
      </div>
      
      {/* Teachers skeleton */}
      <div className="h-96 bg-gray-50 animate-pulse" />
      
      {/* News skeleton */}
      <div className="h-96 bg-white animate-pulse" />
      
      {/* Quick links skeleton */}
      <div className="h-64 bg-gray-50 animate-pulse" />
    </div>
  );
}
