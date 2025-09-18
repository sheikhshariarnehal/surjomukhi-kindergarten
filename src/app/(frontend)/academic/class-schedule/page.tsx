'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ClassSchedulePage() {
  const { language, t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [scheduleData, setScheduleData] = useState<any>(null);
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
    ...scheduleData.classes.map((cls: any) => ({
      value: cls.className,
      label: language === 'bn' ? cls.className : cls.classNameEn
    }))
  ];

  const getFilteredSchedule = () => {
    if (selectedClass === 'all') {
      return scheduleData.classes;
    }
    return scheduleData.classes.filter((cls: any) => cls.className === selectedClass);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-700">
                  {t('common.home', 'Home')}
                </a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <a href="/academic" className="text-gray-500 hover:text-gray-700">
                  {t('common.academic', 'Academic')}
                </a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">
                  {t('classSchedule.title', 'Class Schedule')}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'bn' ? scheduleData.title : t('classSchedule.title', 'Class Schedule')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('classSchedule.subtitle', 'Our structured daily class routine designed for optimal learning and development')}
            </p>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Class Filter */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                {t('classSchedule.selectClass', 'Select Class:')}
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {classOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {t('classSchedule.viewMode', 'View Mode:')}
              </span>
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-l-lg text-sm font-medium transition-colors ${
                    viewMode === 'table'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('classSchedule.table', 'Table')}
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-r-lg text-sm font-medium transition-colors ${
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
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'table' ? (
            // Table View
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        {t('classSchedule.class', 'Class')}
                      </th>
                      {scheduleData.timeSlots.map((slot: any, index: number) => (
                        <th key={index} className="px-4 py-4 text-center text-sm font-semibold min-w-[120px]">
                          <div>
                            <div className="font-bold">
                              {language === 'bn' ? slot.period : slot.periodEn}
                            </div>
                            <div className="text-xs font-normal opacity-90">
                              {language === 'bn' ? slot.time : slot.timeEn}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getFilteredSchedule().map((classItem: any, classIndex: number) => (
                      <tr key={classIndex} className={classIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getClassColors(classItem.className)}`}>
                            {language === 'bn' ? classItem.className : classItem.classNameEn}
                          </div>
                        </td>
                        {classItem.schedule.map((subject: any, subjectIndex: number) => (
                          <td key={subjectIndex} className="px-4 py-4 text-center">
                            {subject.subject !== '—' ? (
                              <div className={`p-3 rounded-lg border ${getSubjectColors(subjectIndex)}`}>
                                <div className="font-semibold text-sm mb-1">
                                  {language === 'bn' ? subject.subject : subject.subjectEn}
                                </div>
                                {subject.teacher && (
                                  <div className="text-xs opacity-80">
                                    {language === 'bn' ? subject.teacher : subject.teacherEn}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-gray-400 text-sm">
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
            <div className="grid gap-8">
              {getFilteredSchedule().map((classItem: any, classIndex: number) => (
                <div key={classIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className={`px-6 py-4 border-b ${getClassColors(classItem.className)} border`}>
                    <h3 className="text-xl font-bold">
                      {language === 'bn' ? classItem.className : classItem.classNameEn}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {classItem.schedule.map((subject: any, subjectIndex: number) => (
                        <div key={subjectIndex} className={`p-4 rounded-lg border ${getSubjectColors(subjectIndex)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium opacity-70">
                              {language === 'bn' 
                                ? scheduleData.timeSlots[subjectIndex]?.period 
                                : scheduleData.timeSlots[subjectIndex]?.periodEn
                              }
                            </span>
                            <span className="text-xs opacity-70">
                              {language === 'bn' 
                                ? scheduleData.timeSlots[subjectIndex]?.time 
                                : scheduleData.timeSlots[subjectIndex]?.timeEn
                              }
                            </span>
                          </div>
                          <div className="font-semibold mb-1">
                            {subject.subject !== '—' 
                              ? (language === 'bn' ? subject.subject : subject.subjectEn)
                              : t('classSchedule.freePeriod', 'Free Period')
                            }
                          </div>
                          {subject.teacher && subject.subject !== '—' && (
                            <div className="text-sm opacity-80">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {t('classSchedule.scheduleInfo.weeklySchedule.title', 'Weekly Schedule')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('classSchedule.scheduleInfo.weeklySchedule.description', 'Sunday to Thursday: Regular classes\nFriday: Special activities\nSaturday: Holiday')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🕘</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {t('classSchedule.scheduleInfo.schoolHours.title', 'School Hours')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('classSchedule.scheduleInfo.schoolHours.description', '9:00 AM - 12:00 PM\nTotal 6 classes daily\nEach class 30 minutes')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">�‍🏫</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {t('classSchedule.scheduleInfo.teacherInfo.title', 'Teacher Information')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('classSchedule.scheduleInfo.teacherInfo.description', 'Experienced and qualified teachers\nSubject specialists\nRegularly trained staff')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('classSchedule.contactSection.title', 'Have Questions About Our Class Schedule?')}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('classSchedule.contactSection.subtitle', 'Contact us to learn more about our daily routine and how it benefits your child\'s development.')}
          </p>
          <a
            href="/contact"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('common.contactUs', 'Contact Us')}
          </a>
        </div>
      </section>
    </div>
  );
}
