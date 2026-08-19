'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Phone, 
  ArrowRight,
  Quote,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function PrincipalsPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const leaders = [
    {
      name: isBn ? 'শেখ ইমরান মাহমুদ' : 'Sheikh Imran Mahmud',
      position: isBn ? 'প্রতিষ্ঠাতা ও পরিচালক' : 'Founder & Director',
      experience: isBn ? '২০+ বছর অভিজ্ঞতা' : '20+ Years Experience',
      role: isBn ? 'প্রাতিষ্ঠানিক নীতি ও পরিচালনা' : 'Institutional Leadership & Policy',
      description: isBn
        ? 'সূর্যমুখী কিন্ডারগার্টেনের প্রতিষ্ঠাতা ও প্রধান উদ্যোক্তা। ২০০৪ সাল থেকে প্রতিষ্ঠানের সামগ্রিক রূপরেখা, কৌশলগত উন্নয়ন এবং সরকারি ও সামাজিক সমন্বয়ে মূল ভূমিকা পালন করে আসছেন।'
        : 'Founder and main initiator of Surjomukhi Kindergarten. Leading strategic governance, long-term development, and institutional oversight since 2004.',
      philosophy: isBn
        ? 'শিক্ষাই জাতির মেরুদণ্ড — মানসম্পন্ন শিক্ষার মাধ্যমে প্রতিটি শিশুর অন্তর্নিহিত মেধার বিকাশ ঘটিয়ে জাতি গঠনের ভিত্তি স্থাপন করাই আমাদের মূল ব্রত।'
        : 'Education is the backbone of the nation — establishing the foundation of character and nation building through quality early education.',
      responsibilities: [
        isBn ? 'প্রতিষ্ঠানের সামগ্রিক নীতি ও পরিচালনা' : 'Institutional policy & strategic direction',
        isBn ? 'প্রশাসনিক ও আর্থিক সমন্বয়' : 'Administrative & financial coordination',
        isBn ? 'সরকারি ও প্রাতিষ্ঠানিক যোগাযোগ' : 'Government & stakeholder relations',
        isBn ? 'ভবিষ্যৎ সম্প্রসারণ ও মান নিয়ন্ত্রণ' : 'Future expansion & quality assurance'
      ],
      contact: '01819198965'
    },
    {
      name: isBn ? 'প্রধান শিক্ষক' : 'Head Teacher',
      position: isBn ? 'প্রধান শিক্ষক ও সদস্য-সচিব' : 'Head Teacher & Member-Secretary',
      experience: isBn ? 'অভিজ্ঞ শিক্ষাবিদ' : 'Senior Educational Leader',
      role: isBn ? 'একাডেমিক শৃঙ্খলা ও পাঠদান পরিচালনা' : 'Academic Administration & Pedagogy',
      description: isBn
        ? 'বিদ্যালয়ের শিক্ষাগত ও প্রশাসনিক শৃঙ্খলা রক্ষা, শিক্ষক ও কর্মচারীদের সরাসরি তত্ত্বাবধান, ক্লাস রুটিন নিয়ন্ত্রণ এবং পরীক্ষা প্রক্রিয়া পরিচালনার দায়িত্বে নিয়োজিত।'
        : 'Maintains academic and administrative discipline, supervises teaching faculty, enforces curriculum standards, and oversees examination systems.',
      philosophy: isBn
        ? 'সেবা পরম ধর্ম — পরম মমতা ও নিষ্ঠার সাথে পাঠদানের মাধ্যমে একটি সুশৃঙ্খল ও সেবাপরায়ণ ভবিষ্যৎ প্রজন্ম গড়ে তোলা।'
        : 'Service is the supreme virtue — nurturing disciplined, empathetic, and academically capable young minds through devoted teaching.',
      responsibilities: [
        isBn ? 'শিক্ষাগত ও প্রশাসনিক শৃঙ্খলা রক্ষা' : 'Academic discipline & faculty supervision',
        isBn ? 'পাঠ্যক্রম ও ক্লাস রুটিন নিয়ন্ত্রণ' : 'Curriculum delivery & schedule oversight',
        isBn ? 'পরীক্ষা প্রক্রিয়া ও মূল্যায়ন' : 'Examination management & evaluation',
        isBn ? 'শিক্ষক প্রশিক্ষণ ও গুণগত মান নিশ্চিতকরণ' : 'Teacher development & academic standards'
      ],
      contact: '01711528045'
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
              {isBn ? 'একাডেমিক নেতৃত্ব ও প্রশাসন' : 'Principals & Educational Leaders'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'সূর্যমুখী কিন্ডারগার্টেনের শিক্ষা দর্শন, প্রাতিষ্ঠানিক মান এবং শিক্ষার্থীদের সার্বিক বিকাশে দিকনির্দেশনা প্রদানকারী অভিজ্ঞ নেতৃত্ব।'
                : 'Meet the dedicated leaders steering our pedagogical standards, academic discipline, and student success with decades of experience.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">20+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                  {isBn ? '৭ সদস্য' : '7 Members'}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'পরিচালনা পর্ষদ' : 'Governing Body'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Play – 5</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'শ্রেণী কাঠামো' : 'Academic Levels'}
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

      {/* 2. Leaders Showcase Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {isBn ? 'আমাদের প্রধান শিক্ষাবিদ ও পরিচালকবৃন্দ' : 'Institutional Leaders'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'বিদ্যালয়ের লক্ষ্য ও উদ্দেশ্যের সফল বাস্তবায়নে নিবেদিতপ্রাণ নেতৃত্ব।'
              : 'Providing visionary direction, teacher mentorship, and operational excellence.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {leaders.map((leader, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-7 sm:p-9 border border-gray-100 shadow-xs hover:border-gray-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    {leader.experience}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                  {leader.name}
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-blue-600 mb-4">
                  {leader.position}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {leader.description}
                </p>

                {/* Leadership Philosophy Quote */}
                <div className="bg-slate-50 border-l-[3px] border-blue-600 rounded-r-xl p-4 mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {isBn ? 'শিক্ষা দর্শন' : 'Guiding Philosophy'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                    &quot;{leader.philosophy}&quot;
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                    {isBn ? 'প্রধান দায়িত্বসমূহ:' : 'Key Responsibilities:'}
                  </div>
                  <ul className="space-y-2">
                    {leader.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Contact Channel */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={`tel:${leader.contact}`}
                  className="inline-flex items-center text-xs sm:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{leader.contact}</span>
                </a>
                <span className="text-[11px] text-slate-400 font-medium">
                  {leader.role}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 3. Meet the Faculty CTA */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'আমাদের অভিজ্ঞ শিক্ষক মণ্ডলীর সাথে পরিচিত হন' : 'Meet Our Dedicated Faculty'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'আমাদের শ্রেণীকক্ষে প্রতিটি বিষয়ে দক্ষ, স্নেহশীল ও নিবেদিত শিক্ষকগণ নিয়মিত পাঠদান পরিচালনা করেন।'
                : 'Browse our complete teacher directory to explore faculty qualifications, subjects, and departmental profiles.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/teachers"
                className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
              >
                <span>{isBn ? 'শিক্ষক তালিকা দেখুন' : 'View Teacher Directory'}</span>
                <Users className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/about/administrator"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'প্রশাসনিক ব্যবস্থাপনা' : 'Administrative Team'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
