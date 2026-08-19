'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calculator, 
  Atom, 
  Palette, 
  Activity, 
  Globe, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function SubjectsPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const subjects = [
    {
      name: isBn ? 'বাংলা ভাষা ও সাহিত্য' : 'Bangla Language & Literature',
      code: 'BNG-101',
      description: isBn
        ? 'মাতৃভাষার সঠিক উচ্চারণ, বর্ণমালা, সাবলীল রিডিং, সৃজনশীল রচনা, ছড়া ও ব্যাকরণের মৌলিক জ্ঞান গঠন।'
        : 'Foundational mother tongue literacy, phonetic pronunciation, creative writing, poetry, and grammar basics.',
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      topics: [
        isBn ? 'বর্ণমালা ও বানান শুদ্ধিকরণ' : 'Alphabet & spelling accuracy',
        isBn ? 'সাবলীল রিডিং ও উচ্চারণ' : 'Fluent reading & oral recitation',
        isBn ? 'সৃজনশীল অনুচ্ছেদ লিখন' : 'Creative paragraph writing',
        isBn ? 'সহজ ব্যাকরণ ও বাক্য গঠন' : 'Basic grammar & sentence structure'
      ]
    },
    {
      name: isBn ? 'ইংরেজি (English)' : 'English Language & Communication',
      code: 'ENG-102',
      description: isBn
        ? 'আন্তর্জাতিক ভাষার প্রাথমিক শব্দভাণ্ডার, ইংরেজি কথোপকথন, বাক্য গঠন ও সঠিক উচ্চারণ অনুশীলন।'
        : 'Second language acquisition focusing on interactive vocabulary, conversational English, and phonetic reading.',
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      topics: [
        isBn ? 'বেসিক ইংরেজি কথোপকথন' : 'Daily conversational English',
        isBn ? 'শব্দভাণ্ডার ও বাক্য রচনা' : 'Vocabulary & sentence construction',
        isBn ? 'রাইমস ও ফনিক্স উচ্চারণ' : 'Rhymes & phonetic pronunciation',
        isBn ? 'হ্যান্ডরাইটিং ও স্পেলিং' : 'Handwriting & spelling drills'
      ]
    },
    {
      name: isBn ? 'প্রাথমিক গণিত' : 'Elementary Mathematics',
      code: 'MTH-103',
      description: isBn
        ? 'সংখ্যা জ্ঞান, গণনা, যোগ-বিয়োগ, গুণ-ভাগ, জ্যামিতিক আকার ও বাস্তবমুখী যৌক্তিক সমস্যা সমাধান।'
        : 'Developing numerical literacy, basic arithmetic operations, geometry, patterns, and everyday logic.',
      icon: <Calculator className="w-6 h-6 text-blue-600" />,
      topics: [
        isBn ? 'সংখ্যা গণনা ও স্থানীয় মান' : 'Number counting & place value',
        isBn ? 'মৌলিক চার নিয়ম (যোগ/বিয়োগ/গুণ/ভাগ)' : 'Four fundamental operations',
        isBn ? 'জ্যামিতি ও পরিমাপ' : 'Shapes, geometry & measurement',
        isBn ? 'বাস্তব জীবনের সমস্যা সমাধান' : 'Real-world math word problems'
      ]
    },
    {
      name: isBn ? 'প্রাথমিক বিজ্ঞান ও পরিবেশ' : 'General Science & Environment',
      code: 'SCI-104',
      description: isBn
        ? 'প্রকৃতি, ঋতু বৈচিত্র্য, উদ্ভিদ ও প্রাণীজগত, স্বাস্থ্য সচেতনতা এবং পরিবেশ রক্ষার প্রাথমিক জ্ঞান।'
        : 'Nurturing curiosity about living things, nature, weather cycles, bodily health, and environmental care.',
      icon: <Atom className="w-6 h-6 text-blue-600" />,
      topics: [
        isBn ? 'আমাদের পরিবেশ ও উদ্ভিদ-প্রাণী' : 'Surroundings, plants & animals',
        isBn ? 'স্বাস্থ্যবিধি ও ব্যক্তিগত যত্ন' : 'Personal hygiene & health habits',
        isBn ? 'ঋতু ও আবহাওয়া জ্ঞান' : 'Seasons & weather phenomena',
        isBn ? 'মৌলিক বৈজ্ঞানিক পর্যবেক্ষণ' : 'Simple scientific observations'
      ]
    },
    {
      name: isBn ? 'ধর্ম ও নৈতিক শিক্ষা' : 'Religious & Moral Education',
      code: 'REL-105',
      description: isBn
        ? 'সততা, পরোপকার, পিতামাতা ও শিক্ষকের প্রতি শ্রদ্ধা, এবং ধর্মীয় আদর্শ ও মানবিক চরিত্রের ভিত গঠন।'
        : 'Instilling core moral values, empathy, truthfulness, mutual respect, and foundational religious teachings.',
      icon: <Heart className="w-6 h-6 text-blue-600" />,
      topics: [
        isBn ? 'মৌলিক ধর্মীয় অনুশাসন ও দুয়া' : 'Core religious basics & prayers',
        isBn ? 'সততা, শৃঙ্খলা ও পরোপকার' : 'Honesty, discipline & service',
        isBn ? 'পিতামাতা ও সমাজের প্রতি দায়িত্ব' : 'Respect for elders & teachers',
        isBn ? 'সর্বজনীন মানবিক মূল্যবোধ' : 'Universal moral virtues'
      ]
    },
    {
      name: isBn ? 'চিত্রাঙ্কন, হস্তশিল্প ও সঙ্গীত' : 'Creative Arts & Expression',
      code: 'ART-106',
      description: isBn
        ? 'রং চেনা, ছবি আঁকা, হস্তশিল্প এবং দেশাত্মবোধক গানের মাধ্যমে শিশুদের সুপ্ত সৃজনশীল মেধার বিকাশ।'
        : 'Fostering artistic imagination through drawing, crafts, patriotic songs, and stage confidence.',
      icon: <Palette className="w-6 h-6 text-blue-600" />,
      topics: [
        isBn ? 'রং ও ড্রয়িং কৌশল' : 'Color theory & guided sketching',
        isBn ? 'সহজ হস্তশিল্প ও পেপার ক্রাফট' : 'Paper crafts & model making',
        isBn ? 'জাতীয় ও শিশুতোষ সঙ্গীত' : 'Patriotic songs & children’s melodies',
        isBn ? 'আবৃত্তি ও সাংস্কৃতিক প্রকাশ' : 'Recitation & cultural stage arts'
      ]
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
              {isBn ? 'পাঠ্যক্রম ও পাঠ্য বিষয়সমূহ' : 'Curriculum & Academic Subjects'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'জাতীয় শিক্ষাক্রমের আলোকে বাংলা মাধ্যম প্রাথমিক শিক্ষার সকল মৌলিক বিষয়ের আনন্দময় ও সমন্বিত সিলেবাস।'
                : 'A comprehensive primary curriculum blending foundational literacy, numeracy, science, ethics, and creative arts.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">6</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'মূল বিষয়শ্রেণী' : 'Core Disciplines'}
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
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">NCTB</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'জাতীয় পাঠ্যক্রম' : 'Curriculum Standard'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Play – 5</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'শ্রেণী ব্যপ্তি' : 'Grade Coverage'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Subjects Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {isBn ? 'বিষয়ভিত্তিক পাঠ্যসূচী ও শিখন ক্ষেত্র' : 'Subject Areas & Learning Goals'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'প্রতিটি বিষয়ে অভিজ্ঞ শিক্ষক মণ্ডলী আধুনিক শিক্ষা উপকরণের মাধ্যমে শিক্ষার্থীদের দক্ষ করে তোলেন।'
              : 'Structured syllabus modules designed to build mastery, analytical thought, and moral integrity.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {subjects.map((subject, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-xs hover:border-gray-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    {subject.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {subject.code}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                  {subject.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {subject.description}
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2.5">
                    {isBn ? 'মূল পাঠ্য বিষয়সমূহ:' : 'Key Topics Covered:'}
                  </div>
                  <ul className="space-y-1.5">
                    {subject.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-center text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/academic/class-schedule"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  <span>{isBn ? 'ক্লাস রুটিন' : 'Class Routine'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
                <Link
                  href="/teachers"
                  className="text-xs font-semibold text-slate-500 hover:text-gray-900"
                >
                  {isBn ? 'শিক্ষক তালিকা' : 'Faculty'}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 3. Bottom CTA */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'আমাদের পাঠ্যক্রম সম্পর্কে আরও জানতে চান?' : 'Want to Learn More About Our Curriculum?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'ভর্তি নির্দেশিকা, সিলেবাস এবং মূল্যায়ন পদ্ধতি সম্পর্কে জানতে আমাদের সাথে যোগাযোগ করুন।'
                : 'Contact our administration for detailed syllabus outlines, examination criteria, and admissions.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admission"
                className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
              >
                <span>{isBn ? 'ভর্তি তথ্য দেখুন' : 'Admission Guidelines'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/academic/classes"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'শ্রেণীসমূহ দেখুন' : 'Explore Classes'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
