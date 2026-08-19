'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  BookOpen, 
  Award, 
  Sparkles, 
  Printer, 
  Table as TableIcon, 
  Grid, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

interface CalendarEvent {
  date: string;
  dateEn: string;
  month: string;
  monthEn: string;
  day: string;
  dayEn: string;
  title: string;
  titleEn: string;
  category: 'holiday' | 'academic' | 'event' | 'break';
  description: string;
  descriptionEn: string;
}

export default function AcademicCalendarPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('table');

  const events: CalendarEvent[] = [
    {
      date: '০১ জানুয়ারি',
      dateEn: 'January 1',
      month: 'জানুয়ারি',
      monthEn: 'January',
      day: '০১',
      dayEn: '01',
      title: 'প্রতিষ্ঠা বার্ষিকী ও নববর্ষ',
      titleEn: 'Foundation Day & New Year',
      category: 'event',
      description: 'সূর্যমুখী কিন্ডারগার্টেনের প্রতিষ্ঠা বার্ষিকী উদযাপন ও বই বিতরণ উৎসব।',
      descriptionEn: 'Surjomukhi Kindergarten Foundation Day and textbook distribution festival.'
    },
    {
      date: '১৫ জানুয়ারি',
      dateEn: 'January 15',
      month: 'জানুয়ারি',
      monthEn: 'January',
      day: '১৫',
      dayEn: '15',
      title: 'নতুন শিক্ষাবর্ষের ক্লাস শুরু',
      titleEn: 'First Term Classes Commence',
      category: 'academic',
      description: 'প্লে হতে ৫ম শ্রেণী পর্যন্ত প্রথম সাময়িক পর্বের নিয়মিত পাঠদান শুরু।',
      descriptionEn: 'Regular academic classes begin for all grade levels.'
    },
    {
      date: '২১ ফেব্রুয়ারি',
      dateEn: 'February 21',
      month: 'ফেব্রুয়ারি',
      monthEn: 'February',
      day: '২১',
      dayEn: '21',
      title: 'আন্তর্জাতিক মাতৃভাষা দিবস',
      titleEn: 'International Mother Language Day',
      category: 'holiday',
      description: 'শহীদ দিবস পালন, প্রভাতফেরি ও চিত্রাঙ্কন প্রতিযোগিতা।',
      descriptionEn: 'Martyrs’ Day commemoration, morning rally, and children’s art competition.'
    },
    {
      date: '২৬ মার্চ',
      dateEn: 'March 26',
      month: 'মার্চ',
      monthEn: 'March',
      day: '২৬',
      dayEn: '26',
      title: 'মহান স্বাধীনতা দিবস',
      titleEn: 'Independence & National Day',
      category: 'holiday',
      description: 'জাতীয় পতাকা উত্তোলন, বিশেষ সমাবেশ ও দেশাত্মবোধক সাংস্কৃতিক পরিবেশনা।',
      descriptionEn: 'National flag hoisting ceremony, special assembly, and cultural performance.'
    },
    {
      date: '১৪ এপ্রিল',
      dateEn: 'April 14',
      month: 'এপ্রিল',
      monthEn: 'April',
      day: '১৪',
      dayEn: '14',
      title: 'পহেলা বৈশাখ (বাংলা নববর্ষ)',
      titleEn: 'Bengali New Year (Pohela Boishakh)',
      category: 'holiday',
      description: 'ঐতিহ্যবাহী বৈশাখী আনন্দ উৎসব ও শিক্ষার্থীদের পরিবেশনা।',
      descriptionEn: 'Traditional Bengali New Year cultural celebration.'
    },
    {
      date: '০১ মে',
      dateEn: 'May 1',
      month: 'মে',
      monthEn: 'May',
      day: '০১',
      dayEn: '01',
      title: 'মহান মে দিবস',
      titleEn: 'May Day (Labor Day)',
      category: 'holiday',
      description: 'সরকারি ছুটি।',
      descriptionEn: 'Public holiday.'
    },
    {
      date: '১৫ মে',
      dateEn: 'May 15',
      month: 'মে',
      monthEn: 'May',
      day: '১৫',
      dayEn: '15',
      title: 'বার্ষিক ক্রীড়া ও শরীরচর্চা উৎসব',
      titleEn: 'Annual Sports & Athletic Meet',
      category: 'event',
      description: '১০০×৬০ গজ মাঠে বার্ষিক অ্যাথলেটিক প্রতিযোগিতা ও পুরস্কার বিতরণ।',
      descriptionEn: 'Annual track & field events and award distribution on the campus grounds.'
    },
    {
      date: '১০ জুন – ২৫ জুন',
      dateEn: 'June 10 – June 25',
      month: 'জুন',
      monthEn: 'June',
      day: '১০',
      dayEn: '10',
      title: '১ম সাময়িক মূল্যায়ন ও পরীক্ষা',
      titleEn: 'First Term Summative Assessment',
      category: 'academic',
      description: 'সকল শ্রেণীর প্রথম সাময়িক লিখিত ও মৌখিক মূল্যায়ন পরীক্ষা।',
      descriptionEn: 'First term written, oral, and practical examinations for all classes.'
    },
    {
      date: '০১ জুলাই – ১৫ জুলাই',
      dateEn: 'July 1 – July 15',
      month: 'জুলাই',
      monthEn: 'July',
      day: '০১',
      dayEn: '01',
      title: 'গ্রীষ্মকালীন অবকাশ',
      titleEn: 'Mid-Year Summer Break',
      category: 'break',
      description: 'গ্রীষ্মকালীন ছুটি ও ১ম সাময়িক ফলাফল প্রস্তুতি।',
      descriptionEn: 'Mid-year vacation and grade report compilation.'
    },
    {
      date: '১৬ জুলাই',
      dateEn: 'July 16',
      month: 'জুলাই',
      monthEn: 'July',
      day: '১৬',
      dayEn: '16',
      title: '২য় সাময়িক পর্ব শুরু ও অভিভাবক সমাবেশ',
      titleEn: 'Second Term Begins & PTA Meeting',
      category: 'academic',
      description: '২য় পর্বের পাঠদান শুরু এবং ১ম সাময়িক ফলাফল বিতরণ সভা।',
      descriptionEn: 'Second term commences along with report card distribution to parents.'
    },
    {
      date: '১৫ সেপ্টেম্বর',
      dateEn: 'September 15',
      month: 'সেপ্টেম্বর',
      monthEn: 'September',
      day: '১৫',
      dayEn: '15',
      title: 'বার্ষিক সাংস্কৃতিক ও বিজ্ঞান প্রদর্শনী',
      titleEn: 'Annual Science & Cultural Exhibition',
      category: 'event',
      description: 'শিক্ষার্থীদের তৈরি হস্তশিল্প, বিজ্ঞান প্রজেক্ট ও নাট্যোৎসব।',
      descriptionEn: 'Showcase of student science models, creative handicrafts, and recitation.'
    },
    {
      date: '০১ ডিসেম্বর – ১৫ ডিসেম্বর',
      dateEn: 'December 1 – December 15',
      month: 'ডিসেম্বর',
      monthEn: 'December',
      day: '০১',
      dayEn: '01',
      title: 'বার্ষিক চূড়ান্ত মূল্যায়ন পরীক্ষা',
      titleEn: 'Annual Final Examination',
      category: 'academic',
      description: 'শিক্ষাবর্ষ সমাপনী চূড়ান্ত পরীক্ষা ও মেধাবৃত্তি মূল্যায়ন।',
      descriptionEn: 'Final comprehensive academic assessment and scholarship evaluation.'
    },
    {
      date: '১৬ ডিসেম্বর',
      dateEn: 'December 16',
      month: 'ডিসেম্বর',
      monthEn: 'December',
      day: '১৬',
      dayEn: '16',
      title: 'মহান বিজয় দিবস',
      titleEn: 'Victory Day of Bangladesh',
      category: 'holiday',
      description: 'বিজয় দিবস উদযাপন ও বিশেষ ক্রীড়া প্রদর্শনী।',
      descriptionEn: 'Victory Day ceremonial parade, assembly, and patriotic celebrations.'
    },
    {
      date: '৩১ ডিসেম্বর',
      dateEn: 'December 31',
      month: 'ডিসেম্বর',
      monthEn: 'December',
      day: '৩১',
      dayEn: '31',
      title: 'বার্ষিক ফলাফল প্রকাশ ও পুরস্কার বিতরণী',
      titleEn: 'Annual Result Publication & Graduation',
      category: 'event',
      description: 'বার্ষিক চূড়ান্ত ফলাফল প্রকাশ, মেধা পুরষ্কার ও ৫ম শ্রেণীর সমাপনী সংবর্ধনা।',
      descriptionEn: 'Publication of final report cards, merit awards, and Grade 5 graduation ceremony.'
    }
  ];

  const categories = [
    { id: 'all', label: isBn ? 'সকল ইভেন্ট' : 'All Events' },
    { id: 'academic', label: isBn ? 'একাডেমিক ও পরীক্ষা' : 'Academics & Exams' },
    { id: 'holiday', label: isBn ? 'জাতীয় ছুটি' : 'National Holidays' },
    { id: 'event', label: isBn ? 'স্কুল উৎসব ও ক্রীড়া' : 'School Events & Sports' },
    { id: 'break', label: isBn ? 'ছুটি ও অবকাশ' : 'Vacations & Breaks' }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(e => e.category === selectedCategory);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'academic':
        return <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md">{isBn ? 'একাডেমিক' : 'Academic'}</span>;
      case 'holiday':
        return <span className="bg-rose-50 text-rose-700 text-xs font-semibold px-2.5 py-1 rounded-md">{isBn ? 'জাতীয় ছুটি' : 'Holiday'}</span>;
      case 'event':
        return <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-md">{isBn ? 'স্কুল উৎসব' : 'School Event'}</span>;
      case 'break':
        return <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-md">{isBn ? 'অবকাশ' : 'Vacation'}</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">{cat}</span>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* 1. Header Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              {isBn ? 'প্রাতিষ্ঠানিক শিক্ষাপঞ্জি ২০২৫' : 'Academic Calendar 2025'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'শিক্ষাবর্ষের গুরুত্বপূর্ণ পর্বসমূহ, পরীক্ষার সময়সূচী, জাতীয় ও ধর্মীয় ছুটি এবং বিদ্যালয়ের বার্ষিক সাংস্কৃতিক ও ক্রীড়া উৎসব।'
                : 'Key academic terms, examination schedules, national holidays, sports tournaments, and parent conferences.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">2025–26</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'শিক্ষাবর্ষ' : 'Academic Year'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">3</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'সাময়িক পর্ব' : 'Academic Terms'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">14+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'বার্ষিক ইভেন্ট' : 'Major Events'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Nawabganj</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'ঢাকা-১৩২০' : 'Dhaka, Bangladesh'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Controls & Calendar Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Toggle & Print */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center">
              <button
                onClick={() => setViewMode('timeline')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center transition-all ${
                  viewMode === 'timeline' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title={isBn ? 'ইভেন্ট কার্ড' : 'Card View'}
              >
                <Grid className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{isBn ? 'কার্ড' : 'Cards'}</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center transition-all ${
                  viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title={isBn ? 'টেবিল ভিউ' : 'Table View'}
              >
                <TableIcon className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{isBn ? 'টেবিল' : 'Table'}</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="p-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
              title={isBn ? 'প্রিন্ট করুন' : 'Print Calendar'}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Display Mode */}
        {viewMode === 'timeline' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredEvents.map((ev, idx) => {
              const displayMonthEn = ev.monthEn.length > 4 ? ev.monthEn.slice(0, 3).toUpperCase() : ev.monthEn.toUpperCase();

              return (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-xs hover:border-gray-200 hover:shadow-md transition-all flex items-start gap-4 sm:gap-5"
                >
                  {/* Date Tile */}
                  <div className="w-16 sm:w-20 py-2.5 px-1 rounded-2xl bg-blue-50/90 border border-blue-100/80 text-center flex-shrink-0">
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      {isBn ? ev.month : displayMonthEn}
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-gray-900 tabular-nums mt-0.5">
                      {isBn ? ev.day : ev.dayEn}
                    </div>
                  </div>

                  {/* Event Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug tracking-tight flex-1 min-w-[160px]">
                        {isBn ? ev.title : ev.titleEn}
                      </h3>
                      <div className="flex-shrink-0">
                        {getCategoryBadge(ev.category)}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {isBn ? ev.description : ev.descriptionEn}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-gray-200/80 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="py-4 px-5 sm:px-6">{isBn ? 'তারিখ' : 'Date'}</th>
                    <th className="py-4 px-6">{isBn ? 'ইভেন্ট ও বিবরণ' : 'Event & Details'}</th>
                    <th className="py-4 px-6 text-right">{isBn ? 'ধরন' : 'Type'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredEvents.map((ev, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 sm:px-6 font-bold text-gray-900 whitespace-nowrap">
                        {isBn ? ev.date : ev.dateEn}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900 text-sm">
                          {isBn ? ev.title : ev.titleEn}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {isBn ? ev.description : ev.descriptionEn}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        {getCategoryBadge(ev.category)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* 3. Bottom CTA */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'দৈনন্দিন ক্লাস রুটিন ও সময়সূচী দেখুন' : 'View Daily Class Routine & Schedules'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'প্রতিটি শ্রেণীর সাপ্তাহিক সময়সূচী ও শিক্ষক বণ্টন দেখতে ক্লাস রুটিন পেইজ ভিজিট করুন।'
                : 'Explore daily periods, time slots, and teacher allocations across all academic levels.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/academic/class-schedule"
                className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
              >
                <span>{isBn ? 'ক্লাস রুটিন দেখুন' : 'View Class Schedule'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/admission"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'ভর্তি নির্দেশিকা' : 'Admission Guidelines'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
