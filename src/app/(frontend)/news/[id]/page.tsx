'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { News } from '@/types';

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(`/api/news/${params.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setNews(data);
        } else if (response.status === 404) {
          setNotFound(true);
        } else {
          throw new Error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNews();
    }
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = async () => {
    if (navigator.share && news) {
      try {
        await navigator.share({
          title: news.title,
          text: news.excerpt || news.content?.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news article...</p>
        </div>
      </div>
    );
  }

  if (notFound || !news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">News Article Not Found</h1>
          <p className="text-gray-600 mb-6">The news article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/news"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* News Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Featured Image */}
            {news.image_url && (
              <div className="aspect-video relative">
                <Image
                  src={news.image_url}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  News
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {news.title}
              </h1>

              {news.excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {news.excerpt}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <span>Published: {formatDate(news.publish_date || news.created_at)}</span>
                  {news.updated_at !== news.created_at && (
                    <span>Updated: {formatDate(news.updated_at)}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleShare}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </button>
                  
                  <button
                    onClick={handlePrint}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="prose prose-lg max-w-none">
                {news.content ? (
                  news.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {news.excerpt || 'No content available.'}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/news"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 sm:mb-0"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to All News
                </Link>
                
                <div className="text-sm text-gray-500">
                  Article ID: {news.id}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
