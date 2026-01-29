'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from '@/contexts/LanguageContext';

export default function AcademicPage() {
  const { t, language } = useTranslation();
  const academicHighlights = [
    {
      title: language === 'bn' ? 'সৃজনশীল শিক্ষা' : 'Creative Education',
      description: language === 'bn' ? 'সৃজনশীল পদ্ধতির মাধ্যমে শিক্ষা প্রদান যা শিশুদের স্বাভাবিকভাবে আকৃষ্ট করে' : 'Creative educational methods that naturally engage children',
      icon: '🎨',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: language === 'bn' ? 'নৈতিক শিক্ষা' : 'Ethical Education',
      description: language === 'bn' ? 'নৈতিক মূল্যবোধ ও চরিত্র গঠনে বিশেষ গুরুত্ব' : 'Special emphasis on moral values and character building',
      icon: '🌟',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: language === 'bn' ? 'সামগ্রিক উন্নয়ন' : 'Holistic Development',
      description: language === 'bn' ? 'শিশুদের সামগ্রিক উন্নয়নে ফোকাস - শারীরিক, মানসিক ও সামাজিক' : 'Focus on overall development - physical, mental and social',
      icon: '🌱',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: language === 'bn' ? 'বাংলা মাধ্যম' : 'Bangla Medium',
      description: language === 'bn' ? 'মাতৃভাষায় শিক্ষা প্রদানের মাধ্যমে শক্তিশালী ভিত্তি তৈরি' : 'Building strong foundation through mother tongue education',
      icon: '📚',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const quickLinks = [
    { title: t('academic.calendar.title'), href: '/academic/calendar', icon: '📅' },
    { title: t('academic.subjects.title'), href: '/academic/subjects', icon: '📚' },
    { title: t('academic.teachers.title'), href: '/academic/teachers', icon: '👨‍🏫' },
    { title: t('academic.rules.title'), href: '/academic/rules', icon: '📋' },
    { title: language === 'bn' ? 'ক্লাস সময়সূচী' : 'Class Schedule', href: '/academic/class-schedule', icon: '⏰' },
    { title: language === 'bn' ? 'আমাদের ক্লাসগুলি' : 'Our Classes', href: '/academic/classes', icon: '🏫' }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{language === 'bn' ? 'শিক্ষাক্রম - সূর্যমুখী কিন্ডারগার্টেন' : 'Academic Programs - Surjomukhi Kindergarten'}</title>
        <meta
          name="description"
          content={language === 'bn'
            ? 'নার্সারি থেকে ৫ম শ্রেণী পর্যন্ত আমাদের ব্যাপক শিক্ষাক্রম এবং শিক্ষাগত পদ্ধতি অন্বেষণ করুন।'
            : 'Explore our comprehensive academic programs from nursery to Grade 5 with Bangla medium education and holistic development approach.'
          }
        />
        <meta property="og:title" content={t('academic.title')} />
        <meta property="og:description" content={t('academic.description')} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/academic`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('academic.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {t('academic.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Academic Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'bn' ? 'আমাদের শিক্ষাগত পদ্ধতি' : 'Our Academic Approach'}
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t('academic.description')}
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {academicHighlights.map((highlight, index) => (
              <div key={index} className={`p-6 rounded-lg ${highlight.color}`}>
                <div className="text-4xl mb-4 text-center">{highlight.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-center">{highlight.title}</h3>
                <p className="text-sm text-center opacity-80">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Academic Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our academic offerings and resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                aria-label={`Learn more about ${link.title}`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4" aria-hidden="true">{link.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                </div>
                <div className="flex items-center text-blue-600 group-hover:text-blue-700" aria-hidden="true">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Curriculum
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our curriculum is carefully crafted to meet the developmental needs of young children. 
                We integrate various learning domains to ensure comprehensive growth and development.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Language & Literacy</h4>
                    <p className="text-gray-600 text-sm">Building communication skills and early reading foundations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mathematics & Logic</h4>
                    <p className="text-gray-600 text-sm">Developing number sense and problem-solving abilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Science & Discovery</h4>
                    <p className="text-gray-600 text-sm">Encouraging curiosity and exploration of the natural world</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Creative Arts</h4>
                    <p className="text-gray-600 text-sm">Fostering creativity through art, music, and dramatic play</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Class Levels</h3>
              <div className="space-y-3">
                <Link href="/academic/classes/play-group" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Play Group</span>
                    <span className="text-sm text-gray-500">Ages 2-3</span>
                  </div>
                </Link>
                <Link href="/academic/classes/nursery" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Nursery</span>
                    <span className="text-sm text-gray-500">Ages 3-4</span>
                  </div>
                </Link>
                <Link href="/academic/classes/one" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class One</span>
                    <span className="text-sm text-gray-500">Ages 4-5</span>
                  </div>
                </Link>
                <Link href="/academic/classes/two" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class Two</span>
                    <span className="text-sm text-gray-500">Ages 5-6</span>
                  </div>
                </Link>
                <Link href="/academic/classes/three" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class Three</span>
                    <span className="text-sm text-gray-500">Ages 6-7</span>
                  </div>
                </Link>
                <Link href="/academic/classes/four" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class Four</span>
                    <span className="text-sm text-gray-500">Ages 7-8</span>
                  </div>
                </Link>
                <Link href="/academic/classes/five" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class Five</span>
                    <span className="text-sm text-gray-500">Ages 8-9</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Child&apos;s Academic Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of learners and give your child the best start in their educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admission"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply for Admission
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
