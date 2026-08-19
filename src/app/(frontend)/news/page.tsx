'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  ArrowRight, 
  Tag, 
  Clock, 
  Sparkles,
  AlertCircle,
  Share2,
  Bookmark,
  Bell,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { News } from '@/types/news';
import { useLanguage } from '@/contexts/LanguageContext';

const DEFAULT_NEWS_STORIES: News[] = [
  {
    id: 'news-annual-sports-2025',
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক পুরস্কার বিতরণী ২০২৫ সফলভাবে সম্পন্ন',
    excerpt: 'সূর্যমুখী কিন্ডারগার্টেনের বার্ষিক ক্রীড়া ও সাংস্কৃতিক সপ্তাহ উৎসাহ-উদ্দীপনার মধ্য দিয়ে সমাপ্ত হয়েছে। বিজয়ী শিক্ষার্থীদের হাতে ট্রফি তুলে দেন প্রধান শিক্ষক।',
    content: 'সূর্যমুখী কিন্ডারগার্টেনের বর্ণাঢ্য বার্ষিক ক্রীড়া ও সাংস্কৃতিক সপ্তাহ ২০২৫ উৎসাহ-উদ্দীপনার মধ্য দিয়ে সমাপ্ত হয়েছে। প্লে গ্রুপ হতে ৫ম শ্রেণির শিক্ষার্থীরা দৌড়, যেমন খুশি তেমন সাজো, আবৃত্তি ও চিত্রাঙ্কনে স্বতঃস্ফূর্ত অংশগ্রহণ করে। প্রধান শিক্ষক ও পরিচালনা পর্ষদের সদস্যরা বিজয়ীদের মাঝে পদক ও প্রশংসাপত্র প্রদান করেন।',
    publish_date: '2025-02-15T09:00:00.000Z',
    image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    created_at: '2025-02-15T09:00:00.000Z',
    updated_at: '2025-02-15T09:00:00.000Z'
  },
  {
    id: 'news-math-olympiad-2025',
    title: 'প্রাথমিক গণিত উৎসবে সূর্যমুখী কিন্ডারগার্টেনের শিক্ষার্থীদের বিশেষ সম্মাননা',
    excerpt: 'উপজেলা ভিত্তিক প্রাথমিক গণিত অলিম্পিয়াডে ৪র্থ ও ৫ম শ্রেণির তিন শিক্ষার্থী গৌরবজনক শীর্ষ স্থান অর্জন করে বিদ্যালয়ের জন্য সম্মান বয়ে এনেছে।',
    content: 'উপজেলা ভিত্তিক প্রাথমিক গণিত অলিম্পিয়াডে ৪র্থ ও ৫ম শ্রেণির শিক্ষার্থীরা অসাধারণ নৈপুণ্য প্রদর্শন করেছে। সমস্যা সমাধান ও দ্রুত হিসাবের দক্ষতায় আমাদের ৩ জন শিক্ষার্থী শীর্ষ স্থান অধিকার করে। বিদ্যালয় পরিষদ কৃতি শিক্ষার্থীদের সংবর্ধনা জানিয়েছে।',
    publish_date: '2025-01-28T10:30:00.000Z',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    created_at: '2025-01-28T10:30:00.000Z',
    updated_at: '2025-01-28T10:30:00.000Z'
  },
  {
    id: 'news-book-festival-2025',
    title: 'নতুন শিক্ষাবর্ষের প্রথম দিনে বিনামূল্যে নতুন পাঠ্যবই বিতরণ উৎসব',
    excerpt: '১লা জানুয়ারি কোমলমতি শিক্ষার্থীদের হাতে নতুন বই তুলে দিয়ে আনন্দঘন পরিবেশে নতুন শিক্ষাবর্ষের শুভ উদ্বোধন করা হয়।',
    content: 'বছরের প্রথম দিনে সূর্যমুখী কিন্ডারগার্টেনের সকল শিক্ষার্থীর মাঝে নতুন বই বিতরণ উৎসব অনুষ্ঠিত হয়। নতুন বইয়ের গন্ধ ও আনন্দে মুখরিত হয়ে ওঠে পুরো ক্যাম্পাস প্রাঙ্গণ।',
    publish_date: '2025-01-01T08:30:00.000Z',
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    created_at: '2025-01-01T08:30:00.000Z',
    updated_at: '2025-01-01T08:30:00.000Z'
  },
  {
    id: 'news-science-exhibition-2024',
    title: 'শিশু বিজ্ঞান মেলা ও উদ্ভাবনী প্রকল্প প্রদর্শনী ২০২৪',
    excerpt: '৩য় থেকে ৫ম শ্রেণির ক্ষুদে বিজ্ঞানীরা তাদের তৈরি পরিবেশবান্ধব সৌর শক্তি, বৃষ্টির পানি সংরক্ষণ ও রোবোটিক্স মডেল উপস্থাপন করে।',
    content: 'বিজ্ঞান শিক্ষার প্রতি আগ্রহ বাড়াতে সূর্যমুখী ক্যাম্পাসে অনুষ্ঠিত হয় দিনব্যাপী ক্ষুদে বিজ্ঞান প্রদর্শনী। অভিভাবক ও দর্শনার্থীরা শিক্ষার্থীদের আত্মবিশ্বাস ও উদ্ভাবনী ধারণার ভূয়সী প্রশংসা করেন।',
    publish_date: '2024-11-20T11:00:00.000Z',
    image_url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    created_at: '2024-11-20T11:00:00.000Z',
    updated_at: '2024-11-20T11:00:00.000Z'
  },
  {
    id: 'news-health-checkup-2024',
    title: 'বিনামূল্যে বার্ষিক শিশু স্বাস্থ্য ও দন্ত পরীক্ষণ ক্যাম্প অনুষ্ঠিত',
    excerpt: 'বিশেষজ্ঞ শিশু বিশেষজ্ঞ ও ডেন্টিস্টদের মাধ্যমে সকল শিক্ষার্থীর চক্ষু, দন্ত ও সামগ্রিক স্বাস্থ্য পরীক্ষা সম্পন্ন হয়েছে।',
    content: 'বিদ্যালয়ের নিয়মিত স্বাস্থ্য সচেতনতা কর্মসূচির অংশ হিসেবে ক্যাম্পাসে আয়োজিত হয় স্বাস্থ্য ও ডেন্টাল ক্যাম্প। প্রতিটি শিক্ষার্থীর জন্য ব্যক্তিগত হেলথ রিপোর্ট কার্ড প্রস্তুত করে অভিভাবকদের হস্তান্তর করা হয়।',
    publish_date: '2024-10-12T09:30:00.000Z',
    image_url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    created_at: '2024-10-12T09:30:00.000Z',
    updated_at: '2024-10-12T09:30:00.000Z'
  }
];

export default function NewsPage() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', nameEn: 'All Stories', nameBn: 'সকল সংবাদ' },
    { id: 'academic', nameEn: 'Academic & Awards', nameBn: 'মেধাবৃত্তি ও ফলাফল' },
    { id: 'event', nameEn: 'Events & Festivals', nameBn: 'উৎসব ও আয়োজন' },
    { id: 'sports', nameEn: 'Sports & Cultural', nameBn: 'ক্রীড়া ও সংস্কৃতি' },
    { id: 'campus', nameEn: 'Campus Health & Life', nameBn: 'ক্যাম্পাস ও স্বাস্থ্য' },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/news?limit=50');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        const newsData = data.news && data.news.length > 0 ? data.news : DEFAULT_NEWS_STORIES;

        setNews(newsData);
        setFilteredNews(newsData);
      } catch (err) {
        console.error('Error fetching news, fallback to default:', err);
        setNews(DEFAULT_NEWS_STORIES);
        setFilteredNews(DEFAULT_NEWS_STORIES);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    // Filter by search term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(q) ||
        (item.content && item.content.toLowerCase().includes(q)) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const keywords: Record<string, string[]> = {
        academic: ['গণিত', 'মেধাবৃত্তি', 'অলিম্পিয়াড', 'math', 'academic', 'award', 'বই'],
        event: ['উৎসব', 'বার্ষিকী', 'উদ্বোধন', 'event', 'festival', 'celebration'],
        sports: ['ক্রীড়া', 'দৌড়', 'সাংস্কৃতিক', 'sports', 'cultural', 'art'],
        campus: ['বিজ্ঞান', 'স্বাস্থ্য', 'ক্যাম্পাস', 'health', 'science', 'campus']
      };

      const searchWords = keywords[selectedCategory] || [selectedCategory];

      filtered = filtered.filter(item => {
        const text = (item.title + ' ' + (item.content || '') + ' ' + (item.excerpt || '')).toLowerCase();
        return searchWords.some(kw => text.includes(kw.toLowerCase()));
      });
    }

    setFilteredNews(filtered);
  }, [news, selectedCategory, searchTerm]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return isBn ? 'সাম্প্রতিক' : 'Recent';
    return new Date(dateString).toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredStory = filteredNews.length > 0 ? filteredNews[0] : null;
  const regularStories = filteredNews.length > 1 ? filteredNews.slice(1) : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Institutional Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <Newspaper className="w-3.5 h-3.5 text-blue-600" />
            {isBn ? 'ক্যাম্পাস সংবাদ ও জার্নাল' : 'Official Campus Journal & Stories'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {isBn ? 'বিদ্যালয় সংবাদ ও কার্যক্রম সমাচার' : 'School News & Story Highlights'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {isBn
              ? 'সূর্যমুখী কিন্ডারগার্টেনের শিক্ষার্থীদের শিক্ষাগত অর্জন, বিজ্ঞান ও গণিত উৎসব, সাংস্কৃতিক অনুষ্ঠান এবং সহ-পাঠ্যক্রমিক কার্যক্রমের নিয়মিত বিবরণ।'
              : 'Discover inspiring classroom stories, academic milestones, sports celebrations, and developmental activities taking place across our campus.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">{news.length > 0 ? `${news.length}+` : '10+'}</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'প্রকাশিত সংবাদ' : 'Published Stories'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">Weekly</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'আপডেট ফ্রিকোয়েন্সি' : 'Update Cycle'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">5 Topics</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'সংবাদ বিভাগ' : 'News Categories'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">Nawabganj</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'ক্যাম্পাস কাভারেজ' : 'Campus Desk'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter and Search Bar */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder={isBn ? 'সংবাদ বা প্রতিবেদন অনুসন্ধান করুন...' : 'Search campus stories...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isBn ? cat.nameBn : cat.nameEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Content Section */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {isBn ? 'সংবাদ লোড হচ্ছে...' : 'Loading campus stories...'}
              </p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {isBn ? 'কোনো সংবাদ পাওয়া যায়নি' : 'No Stories Found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                {isBn ? 'আপনার অনুসন্ধানের সাথে কোনো সংবাদ মেলেনি।' : "We couldn't find any news articles matching your search query."}
              </p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-500 transition-colors"
              >
                {isBn ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Editorial Featured Story */}
              {featuredStory && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {isBn ? 'প্রধান শিরোনাম' : 'Lead Feature Story'}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
                    <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] bg-slate-100 overflow-hidden">
                      {featuredStory.image_url ? (
                        <Image
                          src={featuredStory.image_url}
                          alt={featuredStory.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                          <Newspaper className="w-16 h-16 opacity-30" />
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                            {isBn ? 'বিশেষ প্রতিবেদন' : 'Featured Story'}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {formatDate(featuredStory.publish_date || featuredStory.created_at)}
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-3 hover:text-blue-600 transition-colors">
                          <Link href={`/news/${featuredStory.id}`}>
                            {featuredStory.title}
                          </Link>
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4 mb-6">
                          {featuredStory.excerpt || (featuredStory.content ? featuredStory.content.substring(0, 200) + '...' : '')}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/news/${featuredStory.id}`}
                          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                        >
                          <span>{isBn ? 'সম্পূর্ণ প্রতিবেদন পড়ুন' : 'Read Complete Article'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <span className="text-xs text-slate-400 font-medium">3 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* News Grid */}
              {regularStories.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {isBn ? 'সাম্প্রতিক সংবাদ সমাচার' : 'Recent Campus News'}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {regularStories.length} {isBn ? 'টি প্রতিবেদন' : 'articles'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularStories.map((item) => (
                      <article
                        key={item.id}
                        className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative h-48 bg-slate-100 overflow-hidden">
                            {item.image_url ? (
                              <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                                <Newspaper className="w-10 h-10 opacity-30" />
                              </div>
                            )}
                            <div className="absolute top-3 left-3">
                              <span className="text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-slate-200/60">
                                {isBn ? 'ক্যাম্পাস সংবাদ' : 'Campus News'}
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{formatDate(item.publish_date || item.created_at)}</span>
                            </div>

                            <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2.5">
                              <Link href={`/news/${item.id}`}>
                                {item.title}
                              </Link>
                            </h4>

                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                              {item.excerpt || (item.content ? item.content.substring(0, 140) + '...' : '')}
                            </p>
                          </div>
                        </div>

                        <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                          <Link
                            href={`/news/${item.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                          >
                            <span>{isBn ? 'বিস্তারিত পড়ুন' : 'Read Story'}</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </Link>
                          <span className="text-[11px] text-slate-400">2 min read</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom Media Helpdesk Banner */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {isBn ? 'মিডিয়া বা তথ্য প্রকাশের অনুসন্ধান?' : 'Media Inquiries or School Publications?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {isBn
                ? 'আমাদের সকল প্রাতিষ্ঠানিক নোটিশ ও বিজ্ঞপ্তি দেখতে নোটিশ বোর্ড দেখুন অথবা যোগাযোগ করুন।'
                : 'Stay updated with official institutional announcements on our notice board or get in touch with our media desk.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/notices"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <Bell className="w-4 h-4" />
                {isBn ? 'নোটিশ বোর্ড দেখুন' : 'View Notice Board'}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                {isBn ? 'যোগাযোগ করুন' : 'Contact Media Desk'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
