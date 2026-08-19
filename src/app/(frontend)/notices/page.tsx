'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Bell, 
  Search, 
  Calendar, 
  Download, 
  Share2, 
  Printer, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Filter,
  Sparkles
} from 'lucide-react';
import { Notice } from '@/types/notice';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const categories = [
    { id: 'all', nameEn: 'All Notices', nameBn: 'সকল নোটিশ' },
    { id: 'academic', nameEn: 'Academic & Class', nameBn: 'একাডেমিক' },
    { id: 'exam', nameEn: 'Exams & Results', nameBn: 'পরীক্ষা ও ফলাফল' },
    { id: 'holiday', nameEn: 'Holidays & Closures', nameBn: 'ছুটি ও বন্ধ' },
    { id: 'admission', nameEn: 'Admission & Fees', nameBn: 'ভর্তি ও ফি' },
    { id: 'event', nameEn: 'Events & Sports', nameBn: 'অনুষ্ঠান ও ক্রীড়া' },
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/notices?limit=100');
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        
        const data = await response.json();
        const noticesList = data.notices || [];
        
        setNotices(noticesList);
        setFilteredNotices(noticesList);
      } catch (err) {
        console.error('Error fetching notices:', err);
        setError('Failed to load notices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    let filtered = notices;

    // Filter by search term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(q) ||
        notice.content.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(notice => {
        const text = (notice.title + ' ' + notice.content).toLowerCase();
        if (selectedCategory === 'exam') return text.includes('exam') || text.includes('পরীক্ষা') || text.includes('routine');
        if (selectedCategory === 'holiday') return text.includes('holiday') || text.includes('ছুটি') || text.includes('closed');
        if (selectedCategory === 'admission') return text.includes('admission') || text.includes('ভর্তি') || text.includes('fee');
        if (selectedCategory === 'event') return text.includes('event') || text.includes('sports') || text.includes('অনুষ্ঠান');
        return true;
      });
    }

    setFilteredNotices(filtered);
  }, [notices, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <Bell className="w-3.5 h-3.5 text-blue-600" />
            {language === 'bn' ? 'অফিসিয়াল নোটিশ বোর্ড' : 'Official Notice Board'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {language === 'bn' ? 'বিদ্যালয়ের নোটিশ ও ঘোষণা' : 'School Notices & Announcements'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'bn'
              ? 'একাডেমিক সূচি, ছুটির নোটিশ, পরীক্ষার রুটিন এবং প্রশাসনিক সার্কুলার সম্পর্কিত সর্বশেষ আপডেট।'
              : 'Stay informed with the latest official announcements, academic schedules, holiday notices, and institutional directives.'
            }
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'নোটিশ খুঁজুন...' : 'Search notices & circulars...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {language === 'bn' ? cat.nameBn : cat.nameEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Notice Listing */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-medium">
            <span>
              Showing <strong className="text-slate-900">{filteredNotices.length}</strong> of {notices.length} notices
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Loading official notices...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/80">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">Failed to Load Notices</h3>
              <p className="text-xs text-slate-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
              >
                Retry Loading
              </button>
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">No Notices Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                No published announcements match your current filter or search criteria.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((notice, index) => {
                const dateObj = new Date(notice.publish_date || notice.created_at);
                const day = dateObj.getDate();
                const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                const year = dateObj.getFullYear();

                return (
                  <article
                    key={notice.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col sm:flex-row items-start gap-5"
                  >
                    {/* Date Block */}
                    <div className="flex sm:flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-3 sm:w-20 text-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                        {day}
                      </span>
                      <span className="text-[11px] font-bold text-blue-600 uppercase mt-0.5 sm:mt-1">
                        {month}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-2 sm:ml-0 font-medium">
                        {year}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                          Notice #{notice.id.substring(0, 6).toUpperCase()}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Published {dateObj.toLocaleDateString()}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug mb-2">
                        <Link href={`/notices/${notice.slug || notice.id}`}>
                          {notice.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                        {notice.content}
                      </p>

                      {/* Action Tools */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                        <Link
                          href={`/notices/${notice.slug || notice.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                        >
                          Read Full Notice <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <div className="flex items-center gap-2">
                          {notice.file_url && (
                            <a
                              href={notice.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                              title="Download Attached PDF"
                            >
                              <Download className="w-3.5 h-3.5 text-slate-600" />
                              PDF Attachment
                            </a>
                          )}

                          <button
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({
                                  title: notice.title,
                                  text: notice.content,
                                  url: `/notices/${notice.slug || notice.id}`
                                }).catch(() => {});
                              }
                            }}
                            className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                            title="Share notice link"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => window.print()}
                            className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                            title="Print notice"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
