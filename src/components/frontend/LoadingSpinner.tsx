import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'gray' | 'white';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue', 
  text,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    white: 'text-white'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} role="status" aria-live="polite">
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className={`mt-2 text-sm ${colorClasses[color]} font-medium`}>
          {text}
        </p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Skeleton loading components for better UX
export const TeacherCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
    <div className="aspect-square bg-gray-200" />
    <div className="p-4">
      <div className="text-center mb-4">
        <div className="h-5 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
      </div>
      <div className="flex justify-center gap-1 mb-4">
        <div className="h-6 bg-gray-200 rounded w-16" />
        <div className="h-6 bg-gray-200 rounded w-12" />
      </div>
      <div className="h-10 bg-gray-200 rounded" />
    </div>
  </div>
);

export const NoticeCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="h-6 bg-gray-200 rounded w-20" />
      <div className="h-4 bg-gray-200 rounded w-24" />
    </div>
    <div className="h-5 bg-gray-200 rounded mb-3" />
    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
  </div>
);

export const NewsCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="h-6 bg-gray-200 rounded w-16" />
      <div className="h-4 bg-gray-200 rounded w-20" />
    </div>
    <div className="h-6 bg-gray-200 rounded mb-3" />
    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-6" />
    <div className="h-4 bg-gray-200 rounded w-24" />
  </div>
);

export default LoadingSpinner;
