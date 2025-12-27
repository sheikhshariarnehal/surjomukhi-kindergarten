'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Types
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
  const { language, t } = useLanguage();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading', 'Loading class schedule...')}</p>
        </div>
      </div>
    );
  }

  if (!scheduleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{t('common.error', 'Failed to load class schedule data.')}</p>
        </div>
      </div>
    );
  }

  const classOptions = [
    { value: 'all', label: t('classSchedule.allClasses', 'All Classes') },
    ...scheduleData.classes.map((cls: ClassSchedule) => ({
      value: cls.className,
      label: language === 'bn' ? cls.className : cls.classNameEn
    }))
  ];

  const getFilteredSchedule = () => {
    if (selectedClass === 'all') {
      return scheduleData.classes;
    }
    return scheduleData.classes.filter((cls: ClassSchedule) => cls.className === selectedClass);
  };

  const getSubjectColors = (index: number) => {
    const colors = [
      'bg-blue-50 border-blue-200 text-blue-800',
      'bg-green-50 border-green-200 text-green-800', 
      'bg-purple-50 border-purple-200 text-purple-800',
      'bg-orange-50 border-orange-200 text-orange-800',
      'bg-pink-50 border-pink-200 text-pink-800',
      'bg-indigo-50 border-indigo-200 text-indigo-800'
    ];
    return colors[index % colors.length];
  };

  const getClassColors = (className: string) => {
    const colorMap: { [key: string]: string } = {
      'প্লে': 'bg-pink-100 text-pink-800 border-pink-200',
      'নার্সারি': 'bg-purple-100 text-purple-800 border-purple-200',
      'প্রথম': 'bg-blue-100 text-blue-800 border-blue-200',
      'দ্বিতীয়': 'bg-green-100 text-green-800 border-green-200',
      'তৃতীয়': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'চতুর্থ': 'bg-orange-100 text-orange-800 border-orange-200',
      'পঞ্চম': 'bg-red-100 text-red-800 border-red-200'
    };
    return colorMap[className] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 sm:space-x-4 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                  {t('common.home', 'Home')}
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/academic" className="text-gray-500 hover:text-gray-700 transition-colors">
                  {t('common.academic', 'Academic')}
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium truncate">
                  {t('classSchedule.title', 'Class Schedule')}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              {language === 'bn' ? scheduleData.title : t('classSchedule.title', 'Class Schedule')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              {t('classSchedule.subtitle', 'Our structured daily class routine designed for optimal learning and development')}
            </p>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-4 sm:py-6 lg:py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-stretch sm:items-center justify-between">
            {/* Class Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {t('classSchedule.selectClass', 'Select Class:')}
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {classOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {t('classSchedule.viewMode', 'View Mode:')}
              </span>
              <div className="flex border border-gray-300 rounded-lg w-full sm:w-auto">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-l-lg text-sm font-medium transition-colors ${
                    viewMode === 'table'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('classSchedule.table', 'Table')}
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-r-lg text-sm font-medium transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('classSchedule.cards', 'Cards')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'table' ? (
            // Table View
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">
                        {t('classSchedule.class', 'Class')}
                      </th>
                      {scheduleData.timeSlots.map((slot: TimeSlot, index: number) => (
                        <th key={index} className="px-2 sm:px-3 lg:px-4 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold min-w-[100px] sm:min-w-[120px]">
                          <div>
                            <div className="font-bold text-xs sm:text-sm">
                              {language === 'bn' ? slot.period : slot.periodEn}
                            </div>
                            <div className="text-[10px] sm:text-xs font-normal opacity-90 mt-1">
                              {language === 'bn' ? slot.time : slot.timeEn}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getFilteredSchedule().map((classItem: ClassSchedule, classIndex: number) => (
                      <tr key={classIndex} className={classIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                          <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getClassColors(classItem.className)}`}>
                            {language === 'bn' ? classItem.className : classItem.classNameEn}
                          </div>
                        </td>
                        {classItem.schedule.map((subject: Period, subjectIndex: number) => (
                          <td key={subjectIndex} className="px-2 sm:px-3 lg:px-4 py-3 sm:py-4 text-center">
                            {subject.subject !== '—' ? (
                              <div className={`p-2 sm:p-3 rounded-lg border ${getSubjectColors(subjectIndex)}`}>
                                <div className="font-semibold text-xs sm:text-sm mb-1 leading-tight">
                                  {language === 'bn' ? subject.subject : subject.subjectEn}
                                </div>
                                {subject.teacher && (
                                  <div className="text-[10px] sm:text-xs opacity-80 leading-tight">
                                    {language === 'bn' ? subject.teacher : subject.teacherEn}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-gray-400 text-xs sm:text-sm">
                                {t('classSchedule.freePeriod', 'Free Period')}
                              </div>
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
            // Cards View
            <div className="grid gap-4 sm:gap-6 lg:gap-8">
              {getFilteredSchedule().map((classItem: ClassSchedule, classIndex: number) => (
                <div key={classIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${getClassColors(classItem.className)} border`}>
                    <h3 className="text-lg sm:text-xl font-bold">
                      {language === 'bn' ? classItem.className : classItem.classNameEn}
                    </h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {classItem.schedule.map((subject: Period, subjectIndex: number) => (
                        <div key={subjectIndex} className={`p-3 sm:p-4 rounded-lg border ${getSubjectColors(subjectIndex)}`}>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                            <span className="text-xs sm:text-sm font-medium opacity-70 order-2 sm:order-1">
                              {language === 'bn' 
                                ? scheduleData.timeSlots[subjectIndex]?.period 
                                : scheduleData.timeSlots[subjectIndex]?.periodEn
                              }
                            </span>
                            <span className="text-xs opacity-70 order-1 sm:order-2">
                              {language === 'bn' 
                                ? scheduleData.timeSlots[subjectIndex]?.time 
                                : scheduleData.timeSlots[subjectIndex]?.timeEn
                              }
                            </span>
                          </div>
                          <div className="font-semibold mb-2 text-sm sm:text-base leading-tight">
                            {subject.subject !== '—' 
                              ? (language === 'bn' ? subject.subject : subject.subjectEn)
                              : t('classSchedule.freePeriod', 'Free Period')
                            }
                          </div>
                          {subject.teacher && subject.subject !== '—' && (
                            <div className="text-xs sm:text-sm opacity-80 leading-tight">
                              {language === 'bn' ? `${t('classSchedule.teacher', 'Teacher')}: ${subject.teacher}` : `${t('classSchedule.teacher', 'Teacher')}: ${subject.teacherEn}`}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Schedule Information */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">📅</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                {t('classSchedule.scheduleInfo.weeklySchedule.title', 'Weekly Schedule')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('classSchedule.scheduleInfo.weeklySchedule.description', 'Sunday to Thursday: Regular classes\nFriday: Special activities\nSaturday: Holiday')}
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🕘</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                {t('classSchedule.scheduleInfo.schoolHours.title', 'School Hours')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('classSchedule.scheduleInfo.schoolHours.description', '9:00 AM - 12:00 PM\nTotal 6 classes daily\nEach class 30 minutes')}
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">👨‍🏫</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                {t('classSchedule.scheduleInfo.teacherInfo.title', 'Teacher Information')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('classSchedule.scheduleInfo.teacherInfo.description', 'Experienced and qualified teachers\nSubject specialists\nRegularly trained staff')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('classSchedule.contactSection.title', 'Have Questions About Our Class Schedule?')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            {t('classSchedule.contactSection.subtitle', 'Contact us to learn more about our daily routine and how it benefits your child\'s development.')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            {t('common.contactUs', 'Contact Us')}
          </Link>
        </div>
      </section>
    </div>
  );
}
