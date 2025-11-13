'use client';

import React from 'react';

/**
 * Lightweight Hero Loading Component
 * Displays immediately while Hero component loads
 * Minimal JavaScript and CSS for instant rendering
 */
export default function HeroLoading() {
  return (
    <section
      className="relative h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] max-h-[900px] overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600"
      aria-label="Loading hero section"
    >
      {/* Simplified background pattern for visual interest */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
      </div>

      {/* Content area */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white max-w-4xl animate-pulse">
          {/* School name skeleton */}
          <div className="mb-4 space-y-2">
            <div className="h-8 sm:h-12 lg:h-16 bg-white/20 rounded-lg mx-auto max-w-2xl" />
            <div className="h-6 sm:h-8 bg-white/15 rounded-lg mx-auto max-w-md" />
          </div>
          
          {/* Description skeleton */}
          <div className="mt-6 space-y-2 max-w-xl mx-auto">
            <div className="h-4 bg-white/10 rounded mx-auto w-3/4" />
            <div className="h-4 bg-white/10 rounded mx-auto w-2/3" />
          </div>

          {/* Button skeleton */}
          <div className="mt-8 flex gap-4 justify-center">
            <div className="h-12 w-32 bg-white/20 rounded-lg" />
            <div className="h-12 w-32 bg-white/10 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Institutional footer skeleton */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-gradient-to-r from-orange-500 via-blue-800 to-orange-500">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`${
                  i % 2 === 0 ? 'bg-orange-500' : 'bg-blue-800'
                } text-white text-center py-2 sm:py-3 px-2 lg:px-4`}
              >
                <div className="h-3 bg-white/20 rounded mx-auto w-16 mb-1" />
                <div className="h-4 bg-white/30 rounded mx-auto w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
