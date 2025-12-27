'use client';

import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import Link from 'next/link';

// Types
interface Facility {
  icon: string;
  title: string;
  description: string;
}

// Structured data for Organization
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Surjomukhi Kindergarten",
  "alternateName": "সূর্যমুখী কিন্ডারগার্টেন",
  "description": "A private primary educational institution established in 2004, fostering holistic development through creative and ethical education in Bangla medium from play group to Grade 5.",
  "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  "logo": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/logo.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Salauddin Complex, Aona Bazar",
    "addressLocality": "Nawabganj",
    "addressRegion": "Dhaka",
    "postalCode": "1320",
    "addressCountry": "BD"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+880-1954113374",
    "contactType": "customer service",
    "email": "info.surjamukhikindergarten@gmail.com"
  },
  "foundingDate": "2004-01-01",
  "numberOfStudents": 55,
  "educationalLevel": "Primary Education",
  "languageOfInstruction": "Bengali",
  "sameAs": [
    "http://www.surjamukhikindergarten.com"
  ]
};

export default function AboutPage() {
  const { t, language } = useTranslation();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('about.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {t('about.subtitle')}
              </p>
              <div className="flex items-center justify-center space-x-4 text-lg">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {language === 'bn' ? 'প্রতিষ্ঠিত ২০০৪' : 'Est. 2004'}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {language === 'bn' ? 'বাংলা মাধ্যম' : 'Bangla Medium'}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {language === 'bn' ? 'প্লে গ্রুপ - ৫ম শ্রেণী' : 'Play Group - Grade 5'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* About Description */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t('about.description')}
              </p>
            </div>

            {/* Ideals */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
                <span className="mr-3">💡</span>
                {t('about.ideals.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t('about.ideals.items', []).map((ideal: string, index: number) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✨</span>
                      <span className="text-gray-700 font-medium">{ideal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                  <span className="mr-3">🎯</span>
                  {t('about.mission.title')}
                </h3>
                <ul className="space-y-4">
                  {t('about.mission.items', []).map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                  <span className="mr-3">🌟</span>
                  {t('about.vision.title')}
                </h3>
                <ul className="space-y-4">
                  {t('about.vision.items', []).map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about.objectives.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t('about.objectives.items', []).map((objective: string, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1 text-xl">🎯</span>
                    <span className="text-gray-700 font-medium">{objective}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History & Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('about.history.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.history.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.history.founded.title')}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {t('about.history.founded.description')}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.history.growth.title')}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {t('about.history.growth.description')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                  {t('about.stats.title')}
                </h3>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{t('about.stats.established')}</div>
                    <div className="text-gray-600">{language === 'bn' ? 'প্রতিষ্ঠিত' : 'Established'}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{t('about.stats.students')}</div>
                    <div className="text-gray-600">{language === 'bn' ? 'শিক্ষার্থী' : 'Students'}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{t('about.stats.grades')}</div>
                    <div className="text-gray-600">{language === 'bn' ? 'শ্রেণী' : 'Grade Levels'}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{t('about.stats.experience')}</div>
                    <div className="text-gray-600">{language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academics & Facilities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3">📚</span>
                  {t('about.academics.title')}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t('about.academics.description')}
                </p>
                <ul className="space-y-2">
                  {t('about.academics.details', []).map((detail: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3">🏛️</span>
                  {t('about.governance.title')}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t('about.governance.description')}
                </p>
                <ul className="space-y-2">
                  {t('about.governance.structure', []).map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Facilities */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('about.facilities.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.facilities.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t('about.facilities.items', []).map((facility: Facility, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{facility.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('about.contact.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {language === 'bn' ? 'ভর্তি ও অনুসন্ধানের জন্য আমাদের সাথে যোগাযোগ করুন' : 'Get in touch with us for admissions and inquiries'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg text-center border border-blue-100">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-semibold text-gray-900 mb-2">{language === 'bn' ? 'ঠিকানা' : 'Address'}</h3>
                <p className="text-gray-600 text-sm">{t('about.contact.address')}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg text-center border border-blue-100">
                <div className="text-3xl mb-3">📞</div>
                <h3 className="font-semibold text-gray-900 mb-2">{language === 'bn' ? 'ফোন' : 'Phone'}</h3>
                <p className="text-gray-600 text-sm">{t('about.contact.phone')}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg text-center border border-blue-100">
                <div className="text-3xl mb-3">✉️</div>
                <h3 className="font-semibold text-gray-900 mb-2">{language === 'bn' ? 'ইমেইল' : 'Email'}</h3>
                <p className="text-gray-600 text-sm break-words">{t('about.contact.email')}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg text-center border border-blue-100">
                <div className="text-3xl mb-3">🌐</div>
                <h3 className="font-semibold text-gray-900 mb-2">{language === 'bn' ? 'ওয়েবসাইট' : 'Website'}</h3>
                <p className="text-gray-600 text-sm break-words">{t('about.contact.website')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Pages Navigation */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Learn More About Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore different aspects of our institution and discover what makes us special
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link
                href="/about/about-us"
                className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏫</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">About Us</h3>
                <p className="text-gray-600 mb-4">
                  Learn about our history, mission, vision, and the values that guide our educational approach.
                </p>
                <span className="text-blue-600 font-medium group-hover:text-blue-800">Learn More →</span>
              </Link>

              <Link
                href="/about/history"
                className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our History</h3>
                <p className="text-gray-600 mb-4">
                  Discover our journey since establishment and the milestones that shaped our institution.
                </p>
                <span className="text-green-600 font-medium group-hover:text-green-800">Explore →</span>
              </Link>

              <Link
                href="/about/founders"
                className="group bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👥</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Founders</h3>
                <p className="text-gray-600 mb-4">
                  Meet the visionaries who established our institution and their inspiring story.
                </p>
                <span className="text-purple-600 font-medium group-hover:text-purple-800">Meet Them →</span>
              </Link>

              <Link
                href="/about/principals"
                className="group bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg border border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Principals</h3>
                <p className="text-gray-600 mb-4">
                  Learn about our educational leaders and their commitment to excellence.
                </p>
                <span className="text-orange-600 font-medium group-hover:text-orange-800">View Leadership →</span>
              </Link>

              <Link
                href="/about/administrator"
                className="group bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-lg border border-teal-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚙️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Administration</h3>
                <p className="text-gray-600 mb-4">
                  Meet our administrative team that ensures smooth operations and student support.
                </p>
                <span className="text-teal-600 font-medium group-hover:text-teal-800">View Team →</span>
              </Link>

              <Link
                href="/about/campus-tour"
                className="group bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-lg border border-pink-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏛️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Campus Tour</h3>
                <p className="text-gray-600 mb-4">
                  Take a virtual tour of our facilities and see where learning comes to life.
                </p>
                <span className="text-pink-600 font-medium group-hover:text-pink-800">Take Tour →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'bn' ? 'আমাদের শিক্ষা পরিবারে যোগ দিন' : 'Join Our Educational Family'}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {language === 'bn'
                ? 'একটি লালনকারী পরিবেশে মানসম্পন্ন শিক্ষার অভিজ্ঞতা নিন যেখানে প্রতিটি শিশু বিকশিত হতে পারে'
                : 'Experience quality education in a nurturing environment where every child can thrive'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admission"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {language === 'bn' ? 'ভর্তির জন্য আবেদন করুন' : 'Apply for Admission'}
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
