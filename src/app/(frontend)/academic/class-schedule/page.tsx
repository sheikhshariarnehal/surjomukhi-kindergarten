'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Users, 
  Printer, 
  Table as TableIcon, 
  Grid, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

interface Period {
  subject: string;
  subjectEn: string;
  teacher: string;
  teacherEn: string;
}

interface TimeSlot {
  time: string;
  timeEn: string;
  period: string;
  periodEn: string;
}

interface ClassSchedule {
  className: string;
  classNameEn: string;
  schedule: Period[];
}

interface ScheduleData {
  title: string;
  timeSlots: TimeSlot[];
  classes: ClassSchedule[];
}

export default function ClassSchedulePage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScheduleData = async () => {
      try {
        const response = await fetch('/data/class-schedule.json');
        if (!response.ok) {
          throw new Error('Failed to load schedule data');
        }
        const data = await response.json();
        setScheduleData(data);
      } catch (error) {
        console.error('Error loading schedule data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadScheduleData();
  }, []);

  const getFilteredSchedule = () => {
    if (!scheduleData) return [];
    if (selectedClass === 'all') {
      return scheduleData.classes;
    }
    return scheduleData.classes.filter((cls: ClassSchedule) => cls.className === selectedClass);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/60 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-slate-600">
            {isBn ? 'ক্লাস রুটিন লোড হচ্ছে...' : 'Loading class schedule...'}
          </p>
        </div>
      </div>
    );
  }

  if (!scheduleData) {
    return (
      <div className="min-h-screen bg-slate-50/60 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 max-w-md">
          <p className="text-sm font-semibold text-rose-600 mb-4">
            {isBn ? 'ক্লাস রুটিন তথ্য লোড করা যায়নি।' : 'Failed to load class schedule data.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-xs hover:bg-blue-700 transition-colors"
          >
            {isBn ? 'পুনরায় চেষ্টা করুন' : 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  const filteredClasses = getFilteredSchedule();

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
              {isBn ? 'দৈনন্দিন ক্লাস রুটিন ২০২৫' : 'Class Schedule & Routine 2025'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'প্লে গ্রুপ হতে ৫ম শ্রেণী পর্যন্ত প্রতিটি শাখার সাপ্তাহিক সময়সূচী, বিষয় বণ্টন ও দায়িত্বপ্রাপ্ত শিক্ষক তালিকা।'
                : 'Complete daily timetable, period durations, subject allocations, and faculty assignments from Play through Grade 5.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">9:00 AM</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'প্রথম পিরিয়ড শুরু' : 'First Period'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">6</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'দৈনিক পিরিয়ড' : 'Daily Periods'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">30 min</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'পিরিয়ড ব্যপ্তিকাল' : 'Period Duration'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Sun – Thu</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'রবি – বৃহস্পতি' : 'Academic Days'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Controls & Schedule Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Class Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedClass('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedClass === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isBn ? 'সকল শ্রেণী' : 'All Classes'}
            </button>
            {scheduleData.classes.map((cls) => (
              <button
                key={cls.className}
                onClick={() => setSelectedClass(cls.className)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedClass === cls.className
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isBn ? cls.className : cls.classNameEn}
              </button>
            ))}
          </div>

          {/* View Toggle & Print */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center">
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
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center transition-all ${
                  viewMode === 'cards' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title={isBn ? 'কার্ড ভিউ' : 'Cards View'}
              >
                <Grid className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{isBn ? 'কার্ড' : 'Cards'}</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="p-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
              title={isBn ? 'প্রিন্ট করুন' : 'Print Routine'}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Schedule Display */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-gray-200/80 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="py-4 px-5 sm:px-6 min-w-[120px]">{isBn ? 'শ্রেণী' : 'Class'}</th>
                    {scheduleData.timeSlots.map((slot, idx) => (
                      <th key={idx} className="py-4 px-4 min-w-[140px]">
                        <div className="text-gray-900 font-bold text-xs">{isBn ? slot.period : slot.periodEn}</div>
                        <div className="text-[11px] text-slate-500 font-normal">{isBn ? slot.time : slot.timeEn}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredClasses.map((cls, cIdx) => (
                    <tr key={cIdx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 sm:px-6 font-bold text-gray-900 bg-slate-50/30">
                        {isBn ? cls.className : cls.classNameEn}
                      </td>
                      {cls.schedule.map((period, pIdx) => (
                        <td key={pIdx} className="py-4 px-4">
                          {period.subject && period.subject !== '—' ? (
                            <div className="p-2 rounded-xl bg-slate-50 border border-gray-100">
                              <div className="font-semibold text-gray-900 text-xs">
                                {isBn ? period.subject : period.subjectEn}
                              </div>
                              {period.teacher && (
                                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                                  {isBn ? period.teacher : period.teacherEn}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-300 font-light text-xs">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls, cIdx) => (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: cIdx * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:border-gray-200 transition-all"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    {isBn ? `শ্রেণী: ${cls.className}` : `Class: ${cls.classNameEn}`}
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {isBn ? 'রুটিন' : 'Routine'}
                  </span>
                </div>

                <div className="space-y-3">
                  {cls.schedule.map((period, pIdx) => {
                    const slot = scheduleData.timeSlots[pIdx];
                    return (
                      <div key={pIdx} className="p-3 rounded-xl bg-slate-50/80 border border-gray-100/80 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-semibold text-slate-500">
                            {slot ? (isBn ? slot.period : slot.periodEn) : `Period ${pIdx + 1}`} ({slot ? (isBn ? slot.time : slot.timeEn) : ''})
                          </div>
                          <div className="font-bold text-gray-900 text-xs sm:text-sm mt-0.5">
                            {isBn ? period.subject : period.subjectEn}
                          </div>
                        </div>
                        {period.teacher && (
                          <div className="text-xs text-slate-600 font-medium text-right">
                            {isBn ? period.teacher : period.teacherEn}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Related Links & CTA */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'শ্রেণী কাঠামো ও বিষয়সমূহ দেখুন' : 'Explore Classes & Academic Curriculum'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'আমাদের প্রাক-প্রাথমিক ও প্রাথমিক পাঠ্যক্রমের বিষয়ভিত্তিক কাঠামো এবং শিক্ষক বিবরণী জানতে ভিজিট করুন।'
                : 'Browse our complete class curriculum, developmental milestones, and subject syllabi.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/academic/classes"
                className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
              >
                <span>{isBn ? 'শ্রেণীসমূহ দেখুন' : 'View Classes'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/academic/subjects"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'বিষয়সমূহ দেখুন' : 'View Subjects'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
