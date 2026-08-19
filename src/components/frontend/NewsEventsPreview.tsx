'use client';

import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { News, Event } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';

interface NewsEventsPreviewProps {
  initialNews?: News[];
  initialEvents?: Event[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

const toBengaliNumber = (num: number | string): string => {
  const digits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return String(num).replace(/[0-9]/g, (d) => digits[d] || d);
};

// Relative Time Helper with Bengali support
const formatRelativeTime = (dateString: string, isBn: boolean): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return isBn ? 'এইমাত্র' : 'Just now';
    if (diffInHours < 24) return isBn ? `${toBengaliNumber(diffInHours)} ঘণ্টা আগে` : `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return isBn ? '১ দিন আগে`' : '1 day ago';
    if (diffInDays < 30) return isBn ? `${toBengaliNumber(diffInDays)} দিন আগে` : `${diffInDays} days ago`;
    
    return date.toLocaleDateString(isBn ? 'bn-BD' : 'en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  } catch {
    return '';
  }
};

// Loading Skeleton Component
const LoadingSkeleton = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {Array.from({ length: 3 }, (_, i) => (
      <div 
        key={i} 
        className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 animate-pulse"
      >
        <div className="aspect-[16/10] bg-gray-200 rounded-xl mb-4" />
        <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
        <div className="h-5 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    ))}
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

// News Card Component
const NewsCard = memo(({ item, isBn }: { item: News; isBn: boolean }) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = item.image_url && !imageError;

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link
        href={`/news/${item.id}`}
        className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-gray-100 hover:border-gray-200 transition-all duration-300 flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-label={`Read article: ${item.title}`}
      >
        {/* Thumbnail Image with refined editorial fallback */}
        <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
          {hasImage ? (
            <Image
              src={item.image_url!}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                {isBn ? 'ক্যাম্পাস সংবাদ' : 'Campus Story'}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <time 
              dateTime={item.publish_date || item.created_at}
              className="text-xs font-semibold text-slate-400 mb-2 block"
            >
              {formatRelativeTime(item.publish_date || item.created_at || '', isBn)}
            </time>

            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base sm:text-lg leading-snug line-clamp-2 mb-2 tracking-tight">
              {item.title}
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {truncateText(item.excerpt || item.content || '', 130)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

NewsCard.displayName = 'NewsCard';

// Main Component
export default function NewsEventsPreview({ 
  initialNews = [], 
  initialEvents = [] 
}: NewsEventsPreviewProps) {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const [news, setNews] = useState<News[]>(initialNews);
  const [loading, setLoading] = useState(!initialNews.length && !initialEvents.length);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (initialNews.length) return;

    try {
      setLoading(true);
      setError(null);

      const newsResponse = await fetch('/api/news?limit=3');
      if (!newsResponse.ok) {
        throw new Error('Failed to fetch news');
      }

      const newsData = await newsResponse.json();
      setNews(newsData.news || []);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [initialNews.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const newsItems = news.slice(0, 3);

  return (
    <section 
      className="py-16 sm:py-20 lg:py-24 bg-slate-50/60"
      aria-labelledby="news-events-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 
            id="news-events-section"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight"
          >
            {isBn ? 'ক্যাম্পাস সংবাদ ও হাইলাইটস' : 'Campus News & Stories'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isBn 
              ? 'সূর্যমুখী কিন্ডারগার্টেনের শিক্ষার্থীদের সাম্প্রতিক অর্জন, উৎসব ও শিক্ষণীয় গল্পসমূহ।'
              : 'Highlights, student achievements, and stories from the Surjomukhi Kindergarten community.'}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : error && newsItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-slate-500 mb-3">
              {isBn ? 'সংবাদ লোড করা সম্ভব হয়নি।' : 'Unable to load news updates.'}
            </p>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
            >
              {isBn ? 'পুনরায় চেষ্টা করুন' : 'Try Again'}
            </button>
          </div>
        ) : (
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {newsItems.map((item) => (
                <NewsCard key={item.id} item={item} isBn={isBn} />
              ))}
            </motion.div>

            <div className="text-center mt-10 sm:mt-12">
              <Link
                href="/news"
                className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 sm:px-9 py-3.5 rounded-xl font-semibold shadow-xs hover:shadow-md transition-all duration-200 touch-manipulation text-sm sm:text-base"
              >
                <span>{isBn ? 'সকল সংবাদ ও গল্প দেখুন' : 'View All News & Stories'}</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}