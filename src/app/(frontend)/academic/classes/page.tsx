'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Calendar
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ClassesPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const classes = [
    {
      slug: 'play-group',
      name: isBn ? 'প্লে গ্রুপ (Play Group)' : 'Play Group',
      ageRange: isBn ? '৩ – ৪ বছর' : 'Age 3 – 4 Years',
      description: isBn
        ? 'খেলাধুলা, ছবি আঁকা এবং মজার কার্যক্রমের মাধ্যমে বিদ্যালয় পরিবেশের সাথে প্রথম পরিচয় ও সামাজিক বিকাশ।'
        : 'Early socialization and foundational cognitive development through sensory play, rhymes, and interactive routines.',
      highlights: [
        isBn ? 'মৌখিক ভাষা ও ছড়া শিক্ষা' : 'Oral vocabulary & nursery rhymes',
        isBn ? 'রং ও সাধারণ আকার পরিচিতি' : 'Color & shape recognition',
        isBn ? 'সহপাঠীদের সাথে ভাব বিনিময়' : 'Social sharing & play habits',
        isBn ? 'হাতের পেশীর প্রাথমিক সমন্বয়' : 'Fine motor skill exercises'
      ],
      tag: isBn ? 'প্রাক-প্রাথমিক' : 'Early Years'
    },
    {
      slug: 'nursery',
      name: isBn ? 'নার্সারি (Nursery)' : 'Nursery',
      ageRange: isBn ? '৪ – ৫ বছর' : 'Age 4 – 5 Years',
      description: isBn
        ? 'বর্ণমালা পরিচিতি, সংখ্যা গণনা, প্রাথমিক ইংরেজি ও নৈতিক মূল্যবোধের ভিত গঠন।'
        : 'Building structured pre-literacy, numeracy, bilingual familiarity, and self-confidence through active learning.',
      highlights: [
        isBn ? 'বাংলা ও ইংরেজি বর্ণমালা চেনা' : 'Bangla & English alphabet basics',
        isBn ? 'সংখ্যা গণনা ও প্রাথমিক ধারণা' : 'Number counting & basic operations',
        isBn ? 'ড্রয়িং ও সৃজনশীল কাজ' : 'Guided drawing & creative crafts',
        isBn ? 'নিয়মানুবর্তিতা ও পরিচ্ছন্নতা' : 'Classroom discipline & cleanliness'
      ],
      tag: isBn ? 'ভিত্তি পর্যায়' : 'Foundational'
    },
    {
      slug: 'one',
      name: isBn ? '১ম শ্রেণী (Class 1)' : 'Class One (Grade 1)',
      ageRange: isBn ? '৫ – ৬ বছর' : 'Age 5 – 6 Years',
      description: isBn
        ? 'জাতীয় শিক্ষাক্রমের আলোকে বাংলা ও ইংরেজি পঠন, লিখন, সহজ গণিত ও পরিবেশ সচেতনতার সূচনা।'
        : 'Formal primary schooling introduction focusing on fluent reading, handwriting, arithmetic, and general science.',
      highlights: [
        isBn ? 'বাক্য গঠন ও সাবলীল রিডিং' : 'Sentence reading & comprehension',
        isBn ? 'যোগ-বিয়োগ ও সংখ্যা জ্ঞান' : 'Addition, subtraction & numerals',
        isBn ? 'প্রাথমিক ইংরেজি কথোপকথন' : 'Introductory English conversation',
        isBn ? 'ধর্ম ও নৈতিক মূল্যবোধ শিক্ষা' : 'Moral education & religious values'
      ],
      tag: isBn ? 'প্রাথমিক ধাপ ১' : 'Primary Tier 1'
    },
    {
      slug: 'two',
      name: isBn ? '২য় শ্রেণী (Class 2)' : 'Class Two (Grade 2)',
      ageRange: isBn ? '৬ – ৭ বছর' : 'Age 6 – 7 Years',
      description: isBn
        ? 'ভাষাগত দক্ষতা বৃদ্ধি, গুণ-ভাগের প্রাথমিক ধারণা এবং পরিবেশ ও সমাজ বিজ্ঞানের প্রাথমিক পাঠ।'
        : 'Expanding literacy vocabulary, arithmetic operations, science exploration, and social awareness.',
      highlights: [
        isBn ? 'দ্রুত পঠন ও বোধগম্যতা' : 'Reading fluency & spelling mastery',
        isBn ? 'গুণ-ভাগ ও সহজ সমস্যা সমাধান' : 'Multiplication, division & logic',
        isBn ? 'বিজ্ঞান ও পরিবেশ অন্বেষণ' : 'Science & natural surroundings',
        isBn ? 'সুন্দর হাতের লেখা অনুশীলন' : 'Cursive handwriting mastery'
      ],
      tag: isBn ? 'প্রাথমিক ধাপ ২' : 'Primary Tier 2'
    },
    {
      slug: 'three',
      name: isBn ? '৩য় শ্রেণী (Class 3)' : 'Class Three (Grade 3)',
      ageRange: isBn ? '৭ – ৮ বছর' : 'Age 7 – 8 Years',
      description: isBn
        ? 'বিশ্লেষণধর্মী চিন্তা বিকাশ, ব্যাকরণ, গণিতের গভীরে প্রবেশ এবং তথ্য ও যোগাযোগ প্রযুক্তির প্রাথমিক ধারণা।'
        : 'Developing critical thinking, grammar structures, deeper arithmetic, and basic digital awareness.',
      highlights: [
        isBn ? 'ব্যাকরণ ও সৃজনশীল রচনা' : 'Grammar rules & creative composition',
        isBn ? 'বাস্তবভিত্তিক গাণিতিক সমস্যা' : 'Practical mathematical problems',
        isBn ? 'বাংলাদেশ ও বিশ্বপরিচয়' : 'Bangladesh & Global studies',
        isBn ? 'প্রাথমিক বিজ্ঞান ও পরীক্ষণ' : 'Elementary scientific inquiry'
      ],
      tag: isBn ? 'মধ্য পর্যায়' : 'Intermediate'
    },
    {
      slug: 'four',
      name: isBn ? '৪র্থ শ্রেণী (Class 4)' : 'Class Four (Grade 4)',
      ageRange: isBn ? '৮ – ৯ বছর' : 'Age 8 – 9 Years',
      description: isBn
        ? 'স্বাধীনভাবে সমস্যা সমাধানের দক্ষতা, গভীর জ্ঞানার্জন এবং সহ-পাঠ্যক্রমিক কার্যক্রমে সক্রিয় অংশগ্রহণ।'
        : 'Independent problem-solving, project-based tasks, analytical writing, and structured examination preparation.',
      highlights: [
        isBn ? 'অগ্রবর্তী গণিত ও জ্যামিতি' : 'Advanced arithmetic & geometry',
        isBn ? 'ইংরেজি গ্রামার ও রাইটিং' : 'English grammar & paragraph writing',
        isBn ? 'বিজ্ঞান অনুসন্ধান ও সমাজচিন্তা' : 'Scientific methods & social values',
        isBn ? 'নেতৃত্ব ও দলগত দায়িত্ব' : 'Peer teamwork & presentation'
      ],
      tag: isBn ? 'অগ্রবর্তী পর্যায়' : 'Advanced'
    },
    {
      slug: 'five',
      name: isBn ? '৫ম শ্রেণী (Class 5)' : 'Class Five (Grade 5)',
      ageRange: isBn ? '৯ – ১০ বছর' : 'Age 9 – 10 Years',
      description: isBn
        ? 'প্রাথমিক শিক্ষা সমাপনী এবং মাধ্যমিক স্তরে উত্তরণের জন্য পূর্ণাঙ্গ প্রস্তুতি, আত্মবিশ্বাস ও মেধার বিকাশ।'
        : 'Culmination of primary schooling, comprehensive syllabus mastery, scholarship preparation, and leadership readiness.',
      highlights: [
        isBn ? 'সম্পূর্ণ সিলেবাসের সার্বিক প্রস্তুতি' : 'Comprehensive syllabus mastery',
        isBn ? 'বৃত্তি পরীক্ষার বিশেষ মেন্টরিং' : 'Merit scholarship examination prep',
        isBn ? 'সৃজনশীল মেধার সর্বোচ্চ স্ফুরণ' : 'Analytical thinking & creative expression',
        isBn ? 'মাধ্যমিক শিক্ষার আদর্শ প্রস্তুতি' : 'Secondary school transition readiness'
      ],
      tag: isBn ? 'সমাপনী পর্যায়' : 'Graduating Tier'
    }
  ];

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
              {isBn ? 'আমাদের একাডেমিক শ্রেণীসমূহ' : 'Our Academic Classes'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'প্লে গ্রুপ হতে ৫ম শ্রেণী পর্যন্ত প্রতিটি বয়সোপযোগী পাঠ্যক্রম, শিশুবান্ধব পরিবেশ এবং শিক্ষাদানের সুনির্দিষ্ট লক্ষ্য।'
                : 'Carefully structured class tiers from Play to Grade 5 designed for age-appropriate cognitive, moral, and physical growth.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">7</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'শ্রেণী স্তর' : 'Grade Levels'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                  {isBn ? 'বাংলা' : 'Bangla'}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'শিক্ষার মাধ্যম' : 'Instruction Medium'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">3 – 10</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'বয়সসীমা (বছর)' : 'Age Range'}
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

      {/* 2. Class Levels Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {isBn ? 'শ্রেণীভিত্তিক শিক্ষণ কাঠামো' : 'Class Levels & Learning Framework'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'শিশুর শারীরিক ও মানসিক বিকাশের প্রতিটি ধাপে পাঠ্যক্রম ও শিক্ষাদানের নিবিড় সমন্বয়।'
              : 'Progressive educational stages fostering literacy, numeracy, critical thinking, and character.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {classes.map((cls, idx) => {
            const isGraduating = idx === 6; // Class 5
            
            return (
              <motion.article
                key={cls.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
                  isGraduating 
                    ? 'lg:col-span-3 border-blue-200 shadow-sm bg-gradient-to-br from-blue-50/20 via-white to-slate-50/50 p-7 sm:p-9' 
                    : 'border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 p-6 sm:p-7'
                }`}
              >
                <div className={isGraduating ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start' : ''}>
                  <div className={isGraduating ? 'lg:col-span-7' : ''}>
                    {/* Top Row: Tag and Age Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                        isGraduating 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                          : 'text-slate-700 bg-slate-100 border-slate-200/80'
                      }`}>
                        {cls.tag}
                      </span>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/80">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span>{cls.ageRange}</span>
                      </div>
                    </div>

                    {/* Class Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight mb-2.5">
                      <Link href={`/academic/classes/${cls.slug}`}>
                        {cls.name}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {cls.description}
                    </p>
                  </div>

                  {/* Highlights Box */}
                  <div className={isGraduating ? 'lg:col-span-5 lg:border-l lg:border-slate-200/80 lg:pl-8' : ''}>
                    <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 mb-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        {isBn ? 'প্রধান শিখন বৈশিষ্ট্যসমূহ:' : 'Key Learning Focus:'}
                      </div>
                      <ul className="space-y-2">
                        {cls.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start text-xs text-slate-700 leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/academic/classes/${cls.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors py-1.5"
                  >
                    <span>{isBn ? 'বিস্তারিত ও পাঠ্যক্রম' : 'Explore Details & Curriculum'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/admission/apply-online"
                    className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 px-3.5 py-1.5 rounded-lg transition-colors shadow-2xs"
                  >
                    {isBn ? 'ভর্তি আবেদন' : 'Apply Online'}
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 3. Bottom CTA Banner */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'আপনার সন্তানের জন্য আদর্শ শ্রেণীতে ভর্তি করান' : 'Enroll Your Child in the Right Grade Level'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'প্লে গ্রুপ হতে ৫ম শ্রেণীতে সীমিত আসনে নতুন শিক্ষাবর্ষে ভর্তি চলছে। আজই যোগাযোগ করুন।'
                : 'Admissions are open for Nursery through Grade 5. Contact our office or submit an online application.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admission"
                className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
              >
                <span>{isBn ? 'ভর্তি তথ্য ও আবেদন' : 'Apply for Admission'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/academic/subjects"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'পাঠ্যক্রম ও বিষয়সমূহ' : 'Curriculum & Subjects'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
