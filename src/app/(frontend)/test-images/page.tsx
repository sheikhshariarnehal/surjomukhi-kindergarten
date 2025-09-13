'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const testUrls = [
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
  'https://lh3.googleusercontent.com/pw/AP1GczNmf0RlUCccti6rOnBH5aM81DF1KrVj-UJ755SwG2KM_YOeFVTfCZ4L1Evc3sllC3LDmaLOFc3Tz-rk05n46nlfuuxuj0R65yNO5CTZ9MV5447iBj-kj1r4p4UalL7uZmcnIqPIfzYklz0qj-XkCM5Bzg=w720-h720-s-no-gm?authuser=0'
];

export default function TestImagesPage() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

  const handleLoad = (url: string) => {
    console.log('Image loaded:', url);
    setLoadedImages(prev => ({ ...prev, [url]: true }));
  };

  const handleError = (url: string) => {
    console.error('Image failed to load:', url);
    setErrorImages(prev => ({ ...prev, [url]: true }));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Image Loading Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testUrls.map((url, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Test Image {index + 1}</h3>
            
            {/* Status indicators */}
            <div className="mb-4 flex gap-2">
              <span className={`px-2 py-1 rounded text-sm ${loadedImages[url] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                {loadedImages[url] ? 'Loaded' : 'Loading...'}
              </span>
              {errorImages[url] && (
                <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-800">
                  Error
                </span>
              )}
            </div>

            {/* Image with Next.js Image component */}
            <div className="relative w-32 h-32 mb-4 border rounded">
              <Image
                src={url}
                alt={`Test image ${index + 1}`}
                fill
                className="object-cover rounded"
                sizes="128px"
                onLoad={() => handleLoad(url)}
                onError={() => handleError(url)}
              />
            </div>

            {/* Direct img tag for comparison */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Direct img tag:</p>
              <img
                src={url}
                alt={`Direct test image ${index + 1}`}
                className="w-32 h-32 object-cover rounded border"
                onLoad={() => console.log('Direct img loaded:', url)}
                onError={() => console.error('Direct img failed:', url)}
              />
            </div>

            {/* URL display */}
            <div className="text-xs text-gray-500 break-all">
              {url}
            </div>
          </div>
        ))}
      </div>

      {/* Network test */}
      <div className="mt-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Network Test</h3>
        <button
          onClick={async () => {
            for (const url of testUrls) {
              try {
                const response = await fetch(url, { method: 'HEAD' });
                console.log(`${url}: ${response.status} ${response.statusText}`);
              } catch (error) {
                console.error(`${url}: Network error`, error);
              }
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Network Access
        </button>
      </div>
    </div>
  );
}
