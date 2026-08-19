'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  ShieldCheck,
  BrainCircuit,
  HeartHandshake,
  Activity,
  Palette,
  Calculator,
  Languages,
  Compass,
  Download
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export interface CurriculumItem {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  iconName: 'languages' | 'math' | 'science' | 'creative' | 'social' | 'motor' | 'tech';
}

export interface ScheduleItem {
  time: string;
  activityEn: string;
  activityBn: string;
}

export interface ClassDetailData {
  slug: string;
  nameEn: string;
  nameBn: string;
  tagEn: string;
  tagBn: string;
  ageEn: string;
  ageBn: string;
  maxCapacity: string;
  teacherRatio: string;
  durationEn: string;
  durationBn: string;
  heroDescEn: string;
  heroDescBn: string;
  overviewTitleEn: string;
  overviewTitleBn: string;
  overviewDescEn: string;
  overviewDescBn: string;
  highlightsEn: string[];
  highlightsBn: string[];
  curriculum: CurriculumItem[];
  schedule: ScheduleItem[];
  syllabusPdfUrl: string;
}

const allClassesList = [
  { slug: 'play-group', nameEn: 'Play Group', nameBn: 'প্লে গ্রুপ', age: '3–4 yrs' },
  { slug: 'nursery', nameEn: 'Nursery', nameBn: 'নার্সারি', age: '4–5 yrs' },
  { slug: 'one', nameEn: 'Class One', nameBn: '১ম শ্রেণি', age: '5–6 yrs' },
  { slug: 'two', nameEn: 'Class Two', nameBn: '২য় শ্রেণি', age: '6–7 yrs' },
  { slug: 'three', nameEn: 'Class Three', nameBn: '৩য় শ্রেণি', age: '7–8 yrs' },
  { slug: 'four', nameEn: 'Class Four', nameBn: '৪র্থ শ্রেণি', age: '8–9 yrs' },
  { slug: 'five', nameEn: 'Class Five', nameBn: '৫ম শ্রেণি', age: '9–10 yrs' },
];

export default function ClassDetailView({ data }: { data: ClassDetailData }) {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'languages':
        return <Languages className="w-5 h-5 text-blue-600" />;
      case 'math':
        return <Calculator className="w-5 h-5 text-emerald-600" />;
      case 'science':
        return <BrainCircuit className="w-5 h-5 text-purple-600" />;
      case 'creative':
        return <Palette className="w-5 h-5 text-amber-600" />;
      case 'social':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'motor':
        return <Activity className="w-5 h-5 text-teal-600" />;
      case 'tech':
        return <Compass className="w-5 h-5 text-indigo-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Institutional Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            {isBn ? data.tagBn : data.tagEn}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-3">
            {isBn ? data.nameBn : data.nameEn}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-blue-600 mb-4">
            {isBn ? `বয়সসীমা: ${data.ageBn}` : `Eligible Age: ${data.ageEn}`}
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {isBn ? data.heroDescBn : data.heroDescEn}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
            <div className="p-3">
              <div className="text-lg sm:text-xl font-bold text-gray-900">{isBn ? data.ageBn : data.ageEn}</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'বয়সসীমা' : 'Age Bracket'}</div>
            </div>
            <div className="p-3">
              <div className="text-lg sm:text-xl font-bold text-gray-900">{data.maxCapacity}</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'সর্বোচ্চ আসন' : 'Class Capacity'}</div>
            </div>
            <div className="p-3">
              <div className="text-lg sm:text-xl font-bold text-blue-600">{data.teacherRatio}</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'শিক্ষক অনুপাত' : 'Teacher Ratio'}</div>
            </div>
            <div className="p-3">
              <div className="text-lg sm:text-xl font-bold text-gray-900">{isBn ? data.durationBn : data.durationEn}</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'দৈনিক সময়' : 'Daily Schedule'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Class Switcher Tabs */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:inline-block flex-shrink-0 mr-2">
              {isBn ? 'শ্রেণি নির্বাচন:' : 'Switch Class:'}
            </span>
            <div className="flex items-center gap-2 flex-nowrap">
              {allClassesList.map((cls) => {
                const isActive = cls.slug === data.slug;
                return (
                  <Link
                    key={cls.slug}
                    href={`/academic/classes/${cls.slug}`}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {isBn ? cls.nameBn : cls.nameEn}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/academic/classes"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hidden lg:inline-flex items-center gap-1 flex-shrink-0"
            >
              {isBn ? 'সকল শ্রেণি' : 'All Classes'} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Program Overview & Key Specifications */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Pedagogical Overview & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {isBn ? 'পাঠ্যক্রম পরিচিতি' : 'Pedagogical Framework'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1 mb-4">
                  {isBn ? data.overviewTitleBn : data.overviewTitleEn}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {isBn ? data.overviewDescBn : data.overviewDescEn}
                </p>
              </div>

              {/* Highlights checklist */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  {isBn ? 'এই শ্রেণির প্রধান শিখন বৈশিষ্ট্য' : 'Key Learning Milestones & Highlights'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {(isBn ? data.highlightsBn : data.highlightsEn).map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Academic Specifications Card */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  {isBn ? 'প্রাতিষ্ঠানিক শ্রেণিকক্ষ বিবরণ' : 'Classroom Specifications'}
                </h3>

                <div className="space-y-4 divide-y divide-slate-100 text-xs sm:text-sm">
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-500">{isBn ? 'শ্রেণি পর্যায়' : 'Academic Tier'}</span>
                    <span className="font-semibold text-slate-900">{isBn ? data.tagBn : data.tagEn}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-slate-500">{isBn ? 'ভর্তি বয়সসীমা' : 'Age Eligibility'}</span>
                    <span className="font-semibold text-slate-900">{isBn ? data.ageBn : data.ageEn}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-slate-500">{isBn ? 'সর্বোচ্চ শাখা ধারণক্ষমতা' : 'Section Capacity'}</span>
                    <span className="font-semibold text-slate-900">{data.maxCapacity}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-slate-500">{isBn ? 'শিক্ষক ও সহকারী অনুপাত' : 'Staff Ratio'}</span>
                    <span className="font-semibold text-blue-600 font-mono">{data.teacherRatio}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-slate-500">{isBn ? 'দৈনিক সময়সূচী' : 'School Hours'}</span>
                    <span className="font-semibold text-slate-900">{isBn ? data.durationBn : data.durationEn}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                  <Link
                    href="/admission/apply-online"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                  >
                    <GraduationCap className="w-4 h-4" />
                    {isBn ? 'এই শ্রেণিতে অনলাইন ভর্তি আবেদন' : 'Apply for this Class'}
                  </Link>

                  <Link
                    href="/student/fees"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {isBn ? 'টিউশন ও সেশন ফি দেখুন' : 'View Fee Structure'}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Curriculum Modules & Subject Areas */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'পাঠ্যক্রম মডিউল' : 'Curriculum Modules'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'মূল শিক্ষণ ক্ষেত্র ও বিষয়সমূহ' : 'Core Learning Areas & Disciplines'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {isBn
                ? 'বয়সোপযোগী জ্ঞান, সৃজনশীল বিকাশ ও নৈতিক মূল্যবোধের সমন্বয়ে সুপরিকল্পিত পাঠদান।'
                : 'Balanced modules structured for cognitive curiosity, practical numeracy, creative expression, and social etiquette.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.curriculum.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {isBn ? item.titleBn : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isBn ? item.descBn : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Daily Classroom Routine Timeline */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'দৈনিক সময়সূচী' : 'Daily Classroom Routine'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'একটি সাধারণ ক্লাসরুম দিনের রূপরেখা' : 'A Structured Day in the Classroom'}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs divide-y divide-slate-100">
            {data.schedule.map((item, idx) => (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-900">
                    {isBn ? item.activityBn : item.activityEn}
                  </span>
                </div>
                <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Direct CTA Banner */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {isBn ? `${data.nameBn}-তে আপনার সন্তানের উজ্জ্বল সূচনা করুন` : `Enrol Your Child in ${data.nameEn}`}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {isBn
                ? 'সীমিত আসনে ২০২৫ শিক্ষাবর্ষে ভর্তি চলছে। আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী ও শিশুবান্ধব ক্যাম্পাসে স্বাগতম।'
                : 'Seats are strictly limited to ensure individual care and attention. Submit your admission application today.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admission/apply-online"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <GraduationCap className="w-4 h-4" />
                {isBn ? 'ভর্তি আবেদন করুন' : 'Apply for Admission'}
              </Link>
              <Link
                href="/student/syllabus"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                {isBn ? 'সিলেবাস ও পাঠ পরিকল্পনা' : 'Download Complete Syllabus'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
