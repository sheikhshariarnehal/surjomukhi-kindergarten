import React from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  description?: string;
  showDetails?: boolean;
  variant?: 'default' | 'minimal' | 'full-page';
  className?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  title = 'Something went wrong',
  description = 'We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.',
  showDetails = false,
  variant = 'default',
  className = ''
}) => {
  const handleRefresh = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleContactSupport = () => {
    window.location.href = '/contact';
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <AlertTriangle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-red-800 font-medium">{title}</p>
          {resetError && (
            <button
              onClick={handleRefresh}
              className="text-xs text-red-600 hover:text-red-800 underline mt-1"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'full-page') {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50 px-4 ${className}`}>
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
            
            <div className="space-y-3">
              <button
                onClick={handleRefresh}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
              
              <button
                onClick={handleGoHome}
                className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </button>
              
              <button
                onClick={handleContactSupport}
                className="w-full flex items-center justify-center px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-lg"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </button>
            </div>
            
            {showDetails && error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Technical Details
                </summary>
                <div className="mt-2 p-3 bg-gray-50 rounded border text-xs font-mono text-gray-700 overflow-auto max-h-32">
                  <p><strong>Error:</strong> {error.message}</p>
                  {error.stack && (
                    <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-white border border-red-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-medium text-red-800 mb-2">{title}</h3>
          <p className="text-red-700 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2">
            {resetError && (
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Try Again
              </button>
            )}
            
            <button
              onClick={handleGoHome}
              className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Home className="w-4 h-4 mr-1" />
              Homepage
            </button>
          </div>
          
          {showDetails && error && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
                Show Error Details
              </summary>
              <div className="mt-2 p-3 bg-red-50 rounded border text-xs font-mono text-red-800 overflow-auto max-h-32">
                <p><strong>Error:</strong> {error.message}</p>
                {error.stack && (
                  <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

// Specific error fallback components for different scenarios
export const NetworkErrorFallback: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <ErrorFallback
    title="Network Error"
    description="Unable to connect to our servers. Please check your internet connection and try again."
    resetError={onRetry}
    variant="default"
  />
);

export const DataLoadingErrorFallback: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <ErrorFallback
    title="Failed to Load Data"
    description="We couldn't load the requested information. This might be a temporary issue."
    resetError={onRetry}
    variant="minimal"
  />
);

export const PageNotFoundFallback: React.FC = () => (
  <ErrorFallback
    title="Page Not Found"
    description="The page you're looking for doesn't exist or has been moved."
    variant="full-page"
  />
);

export default ErrorFallback;
