'use client';

import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function FoundersPage() {
  const { t, language } = useTranslation();

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{language === 'bn' ? 'আমাদের প্রতিষ্ঠাতা - সূর্যমুখী কিন্ডারগার্টেন' : 'Our Founder - Surjomukhi Kindergarten'}</title>
        <meta
          name="description"
          content={language === 'bn'
            ? 'শেখ ইমরান মাহমুদ - সূর্যমুখী কিন্ডারগার্টেনের প্রতিষ্ঠাতা ও স্বত্বাধিকারী। ২০০৪ সালে প্রতিষ্ঠিত এই শিক্ষা প্রতিষ্ঠানের দূরদর্শী নেতা।'
            : 'Sheikh Imran Mahmud - Founder and Proprietor of Surjomukhi Kindergarten. The visionary leader behind this educational institution established in 2004.'
          }
        />
        <meta property="og:title" content={language === 'bn' ? 'আমাদের প্রতিষ্ঠাতা' : 'Our Founder'} />
        <meta property="og:description" content={t('about.pages.founders.description')} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/about/founders`} />
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
                  <span className="text-gray-900 font-medium">{t('about.pages.founders.title')}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('about.pages.founders.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {t('about.pages.founders.subtitle')}
              </p>
            </div>
          </div>
        </section>


        {/* Founder Profile */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {language === 'bn' ? 'আমাদের প্রতিষ্ঠাতার সাথে পরিচিত হন' : 'Meet Our Founder'}
            </h2>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 bg-gradient-to-br from-green-500 to-blue-500 p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-48 h-48 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/images/SheikhImranMahmud.png"
                        alt={t('about.pages.founders.founder.name')}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{t('about.pages.founders.founder.name')}</h3>
                    <p className="text-lg opacity-90">{t('about.pages.founders.founder.title')}</p>
                  </div>
                </div>

                <div className="lg:w-2/3 p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {language === 'bn' ? 'পরিচিতি' : 'About'}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {t('about.pages.founders.founder.description')}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {language === 'bn' ? 'দৃষ্টিভঙ্গি' : 'Vision'}
                    </h4>
                    <p className="text-gray-600 leading-relaxed italic">
                      &quot;{t('about.pages.founders.founder.vision')}&quot;
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-3">📱</span>
                        <span className="text-gray-600 break-words">{t('about.pages.founders.founder.contact.mobile')}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-3">✉️</span>
                        <span className="text-gray-600 break-words">{t('about.pages.founders.founder.contact.email')}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-3">🌐</span>
                        <span className="text-gray-600 break-words">{t('about.pages.founders.founder.contact.website')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* School Ideals */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'bn' ? 'আমাদের আদর্শ' : 'Our Founding Ideals'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  {language === 'bn' ? 'শিক্ষাই জাতির মেরুদণ্ড' : 'Education is the backbone of the nation'}
                </h3>
                <p className="text-blue-700">
                  {language === 'bn'
                    ? 'আমাদের প্রতিষ্ঠানের মূল ভিত্তি হলো মানসম্পন্ন শিক্ষার মাধ্যমে জাতি গঠন।'
                    : 'Our institution is built on the foundation of nation-building through quality education.'
                  }
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg text-center">
                <div className="text-4xl mb-4">☮️</div>
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  {language === 'bn' ? 'শান্তিই পরম ধর্ম' : 'Peace is the supreme virtue'}
                </h3>
                <p className="text-green-700">
                  {language === 'bn'
                    ? 'শান্তি ও সম্প্রীতির মাধ্যমে একটি উন্নত সমাজ গড়ার প্রত্যাশা।'
                    : 'Building a better society through peace and harmony.'
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
