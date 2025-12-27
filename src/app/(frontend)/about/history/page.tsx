'use client';

import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import Head from 'next/head';
import Link from 'next/link';

export default function HistoryPage() {
  const { t, language } = useTranslation();

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{language === 'bn' ? 'আমাদের ইতিহাস - সূর্যমুখী কিন্ডারগার্টেন' : 'Our History - Surjomukhi Kindergarten'}</title>
        <meta
          name="description"
          content={language === 'bn'
            ? '২০০৪ সাল থেকে সূর্যমুখী কিন্ডারগার্টেনের সমৃদ্ধ ইতিহাস এবং শিক্ষাগত যাত্রা আবিষ্কার করুন।'
            : 'Discover the rich history and educational journey of Surjomukhi Kindergarten since 2004.'
          }
        />
        <meta property="og:title" content={language === 'bn' ? 'আমাদের ইতিহাস' : 'Our History'} />
        <meta property="og:description" content={t('about.pages.history.description')} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/about/history`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">{t('common.home')}</Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-gray-700 transition-colors">{t('common.about')}</Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">{t('about.pages.history.title')}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('about.pages.history.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {t('about.pages.history.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'bn' ? 'শিক্ষাগত উৎকর্ষতার ঐতিহ্য' : 'A Legacy of Educational Excellence'}
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t('about.pages.history.description')}
              </p>
            </div>

            {/* Founding Story */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg mb-16">
              <div className="text-center">
                <div className="text-6xl mb-6">🏫</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('about.pages.history.founding.title')} - {t('about.pages.history.founding.year')}
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {t('about.pages.history.founding.description')}
                </p>
              </div>
            </div>

            {/* Founding Ideals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4">
                    {language === 'bn' ? 'প্রাথমিক আদর্শ' : 'Primary Ideal'}
                  </h3>
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    &quot;{language === 'bn' ? 'শিক্ষাই জাতির মেরুদণ্ড' : 'Education is the backbone of the nation'}&quot;
                  </p>
                  <p className="text-gray-600">
                    {language === 'bn'
                      ? 'এই আদর্শ প্রতিষ্ঠানটিকে মানসম্পন্ন শিক্ষার মাধ্যমে একটি প্রগতিশীল, অন্তর্ভুক্তিমূলক সমাজ গড়তে পথ দেখায়।'
                      : 'This ideal guides the institution to foster a progressive, inclusive society through quality education.'
                    }
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">☮️</div>
                  <h3 className="text-xl font-bold text-green-600 mb-4">
                    {language === 'bn' ? 'গৌণ আদর্শ' : 'Secondary Ideal'}
                  </h3>
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    &quot;{language === 'bn' ? 'শান্তিই পরম ধর্ম' : 'Peace is the supreme virtue'}&quot;
                  </p>
                  <p className="text-gray-600">
                    {language === 'bn'
                      ? 'শান্তি ও সম্প্রীতির মাধ্যমে একটি উন্নত সমাজ গড়ার প্রত্যাশা।'
                      : 'Fostering a better society through peace and harmony.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg">
              <div className="text-center">
                <div className="text-5xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('about.pages.history.mission.title')}
                </h3>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  {t('about.pages.history.mission.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Status */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'bn' ? 'বর্তমান অবস্থা' : 'Current Status'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'bn'
                  ? '২০ বছরের যাত্রায় আমাদের অর্জনসমূহ যা শিক্ষাগত উৎকর্ষতার প্রতি আমাদের অঙ্গীকার প্রতিফলিত করে।'
                  : 'Our achievements over 20 years that reflect our commitment to educational excellence.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">2004</h3>
                <p className="text-gray-600">{language === 'bn' ? 'প্রতিষ্ঠিত' : 'Established'}</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-4xl mb-4">👨‍🎓</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">55+</h3>
                <p className="text-gray-600">{language === 'bn' ? 'বর্তমান শিক্ষার্থী' : 'Current Students'}</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">6</h3>
                <p className="text-gray-600">{language === 'bn' ? 'শ্রেণী (নার্সারি-৫ম)' : 'Grades (Nursery-5th)'}</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-4xl mb-4">🏫</div>
                <h3 className="text-2xl font-bold text-orange-600 mb-2">20+</h3>
                <p className="text-gray-600">{language === 'bn' ? 'বছরের সেবা' : 'Years of Service'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'bn' ? 'ভবিষ্যতের দিকে তাকিয়ে' : 'Looking Towards the Future'}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {language === 'bn'
                ? 'আমাদের যাত্রা অব্যাহত রাখতে গিয়ে, আমরা উদ্ভাবন, উৎকর্ষতা এবং প্রতিটি শিশুর শিক্ষাগত যাত্রার জন্য সর্বোত্তম সূচনা প্রদানে প্রতিশ্রুতিবদ্ধ থাকি।'
                : 'As we continue our journey, we remain committed to innovation, excellence, and providing the best possible start for every child\'s educational journey.'
              }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold mb-2">
                  {language === 'bn' ? 'উদ্ভাবন' : 'Innovation'}
                </h3>
                <p className="text-blue-100">
                  {language === 'bn'
                    ? 'নতুন শিক্ষণ পদ্ধতি এবং প্রযুক্তি গ্রহণ'
                    : 'Embracing new teaching methods and technologies'
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">
                  {language === 'bn' ? 'সম্প্রদায়' : 'Community'}
                </h3>
                <p className="text-blue-100">
                  {language === 'bn'
                    ? 'পরিবার এবং সম্প্রদায়ের সাথে আমাদের বন্ধন দৃঢ়করণ'
                    : 'Strengthening our bond with families and community'
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">
                  {language === 'bn' ? 'বৃদ্ধি' : 'Growth'}
                </h3>
                <p className="text-blue-100">
                  {language === 'bn'
                    ? 'আরও পরিবারের সেবা করার জন্য আমাদের পৌঁছানোর ক্ষেত্র সম্প্রসারণ'
                    : 'Expanding our reach to serve more families'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
