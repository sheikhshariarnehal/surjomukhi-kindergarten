'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, 
  History, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Compass, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Heart
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

// Structured data for Organization
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Surjomukhi Kindergarten",
  "alternateName": "সূর্যমুখী কিন্ডারগার্টেন",
  "description": "A private primary educational institution established in 2004, fostering holistic development through creative and ethical education in Bangla medium from Play Group to Grade 5.",
  "url": process.env.NEXT_PUBLIC_APP_URL || "https://www.surjamukhikindergarten.com",
  "logo": `${process.env.NEXT_PUBLIC_APP_URL || "https://www.surjamukhikindergarten.com"}/logo.png`,
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
    "telephone": "+880-1819198965",
    "contactType": "customer service",
    "email": "info.surjamukhikindergarten@gmail.com"
  },
  "foundingDate": "2004-01-01",
  "educationalLevel": "Primary Education",
  "languageOfInstruction": "Bengali"
};

export default function AboutPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const aboutSections = [
    {
      title: isBn ? 'আমাদের সম্পর্কে' : 'About Us',
      description: isBn 
        ? 'প্রতিষ্ঠানের পরিচিতি, মূল দর্শন, লক্ষ্য, উদ্দেশ্য এবং সামগ্রিক একাডেমিক কাঠামো জানুন।'
        : 'Comprehensive institutional overview, guiding philosophy, mission, vision, and campus facilities.',
      href: '/about/about-us',
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      tag: isBn ? 'সার্বিক পরিচিতি' : 'Overview'
    },
    {
      title: isBn ? 'আমাদের ইতিহাস' : 'Our History',
      description: isBn 
        ? '২০০৪ সালে প্রতিষ্ঠা থেকে শুরু করে বর্তমান সময় পর্যন্ত আমাদের প্রাতিষ্ঠানিক অগ্রযাত্রার মাইলফলক।'
        : 'The foundational journey, pivotal milestones, and growth of our school from 2004 to today.',
      href: '/about/history',
      icon: <History className="w-6 h-6 text-blue-600" />,
      tag: isBn ? 'প্রতিষ্ঠা ২০০৪' : 'Est. 2004'
    },
    {
      title: isBn ? 'প্রতিষ্ঠাতাবৃন্দ' : 'Founders & Patrons',
      description: isBn 
        ? 'যে সকল স্বপ্নদ্রষ্টা ও উদ্যোক্তাগণের ঐকান্তিক প্রচেষ্টায় প্রতিষ্ঠানটি প্রতিষ্ঠিত ও বিকশিত হয়েছে।'
        : 'Meet the visionary founders and patrons whose dedication established Surjomukhi Kindergarten.',
      href: '/about/founders',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      tag: isBn ? 'স্বপ্নদ্রষ্টা' : 'Founders'
    },
    {
      title: isBn ? 'অধ্যক্ষ ও শিক্ষকমণ্ডলী' : 'Principals & Leadership',
      description: isBn 
        ? 'একাডেমিক নেতৃত্ব ও নিবেদিতপ্রাণ শিক্ষকমণ্ডলী যারা প্রতিটি শিশুর উজ্জ্বল ভবিষ্যৎ গড়তে কাজ করছেন।'
        : 'Academic leadership and educators guiding our pedagogical standards and student character.',
      href: '/about/principals',
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      tag: isBn ? 'একাডেমিক নেতৃত্ব' : 'Leadership'
    },
    {
      title: isBn ? 'প্রশাসনিক ব্যবস্থাপনা' : 'Administration',
      description: isBn 
        ? 'বিদ্যালয়ের দৈনন্দিন পরিচালনা, ভর্তি প্রক্রিয়া ও অভিভাবক সেবায় নিয়োজিত প্রশাসনিক টিম।'
        : 'Administrative officers and management ensuring smooth daily operations, admissions, and student care.',
      href: '/about/administrator',
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      tag: isBn ? 'পরিচালনা' : 'Operations'
    },
    {
      title: isBn ? 'ক্যাম্পাস পরিদর্শন' : 'Campus Tour',
      description: isBn 
        ? 'আমাদের শিশুবান্ধব শ্রেণীকক্ষ, সমৃদ্ধ পাঠাগার, খেলার মাঠ ও সুরক্ষিত ক্যাম্পাস অবকাঠামো দেখুন।'
        : 'Explore our child-friendly classrooms, library, open playground, and secure learning spaces.',
      href: '/about/campus-tour',
      icon: <Compass className="w-6 h-6 text-blue-600" />,
      tag: isBn ? 'ক্যাম্পাস' : 'Facilities'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

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
                {isBn ? 'সূর্যমুখী কিন্ডারগার্টেন সম্পর্কিত' : 'About Surjomukhi Kindergarten'}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                {isBn
                  ? 'নবাবগঞ্জ, ঢাকায় ২০০৪ সাল থেকে সৃজনশীল ও নৈতিক প্রাথমিক শিক্ষা বিস্তারে নিবেদিত একটি আদর্শ শিক্ষা প্রতিষ্ঠান।'
                  : 'A distinguished primary educational institution in Nawabganj, Dhaka, dedicated to creative, value-based learning from Nursery to Grade 5 since 2004.'}
              </p>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
                <div className="p-3">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">2004</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                    {isBn ? 'প্রতিষ্ঠাকাল' : 'Established'}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                    {isBn ? 'বাংলা' : 'Bangla'}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                    {isBn ? 'শিক্ষার মাধ্যম' : 'Medium of Instruction'}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Play – 5</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                    {isBn ? 'শ্রেণীসমূহ' : 'Academic Levels'}
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

        {/* 2. Explore About Hub Directory Grid */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                {isBn ? 'প্রতিষ্ঠান সম্পর্কে বিস্তারিত জানুন' : 'Explore Our Institution'}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {isBn
                  ? 'আমাদের ইতিহাস, নেতৃত্ব, প্রতিষ্ঠাতা এবং ক্যাম্পাস অবকাঠামো সম্পর্কিত প্রয়োজনীয় সকল তথ্য।'
                  : 'Discover different dimensions of our history, visionary founders, academic leadership, and campus.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {aboutSections.map((section, idx) => (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  <Link
                    href={section.href}
                    className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 touch-manipulation"
                    aria-label={`Explore ${section.title}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          {section.icon}
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          {section.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug tracking-tight">
                        {section.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {section.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-blue-600 group-hover:text-blue-700 font-semibold text-xs sm:text-sm">
                      <span>{isBn ? 'বিস্তারিত দেখুন' : 'Learn More'}</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Core Pillars Summary */}
        <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {isBn ? 'মানসম্পন্ন বাংলা মাধ্যম' : 'Quality Bangla Medium'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {isBn
                    ? 'জাতীয় পাঠ্যক্রমের সঙ্গে আধুনিক শিক্ষা উপকরণের সমন্বয়ে আনন্দময় প্রাথমিক শিক্ষা।'
                    : 'A rich curriculum blending national educational standards with creative learning aids.'}
                </p>
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {isBn ? 'নৈতিক ও মানবিক শিক্ষা' : 'Ethical Character Building'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {isBn
                    ? 'শৃঙ্খলা, সহানুভূতি ও পরোপকারের মূল্যবোধে প্রতিটি শিশুকে গড়ে তোলা।'
                    : 'Instilling empathy, mutual respect, discipline, and moral integrity from early childhood.'}
                </p>
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {isBn ? 'সৃজনশীল মেধা বিকাশ' : 'Creative Potential'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {isBn
                    ? 'খেলাধুলা, চিত্রাঙ্কন, আবৃত্তি ও সাংস্কৃতিক কার্যক্রমের মাধ্যমে প্রতিভা বিকাশ।'
                    : 'Encouraging self-expression through sports, art, recitation, and cultural programs.'}
                </p>
              </div>
            </div>

            {/* Admission CTA Banner */}
            <div className="mt-14 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-md">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
                {isBn ? 'আপনার সন্তানের সুন্দর আগামীর সূচনা হোক এখানে' : 'Begin Your Child’s Bright Educational Journey'}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                {isBn
                  ? 'প্লে গ্রুপ হতে ৫ম শ্রেণীতে ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।'
                  : 'Admissions are now open for Nursery through Grade 5. Contact our administration or apply online.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/admission"
                  className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
                >
                  <span>{isBn ? 'ভর্তি তথ্য দেখুন' : 'View Admission Details'}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
                >
                  <span>{isBn ? 'যোগাযোগ করুন' : 'Contact Administration'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
