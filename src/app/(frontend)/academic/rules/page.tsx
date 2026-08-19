'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  BookOpen,
  HeartHandshake,
  Shirt,
  HeartPulse,
  Users,
  Sparkles,
  Award,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  PhoneCall,
  Download,
  GraduationCap
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function AcademicRulesPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const goldenTenets = [
    {
      titleEn: 'Integrity in Learning',
      titleBn: 'সততা ও নিষ্ঠা',
      descEn: 'Honesty in homework, truthfulness in speech, and genuine dedication to knowledge.',
      descBn: 'হোমওয়ার্কে সততা, সত্যবাদিতা এবং জ্ঞানার্জনে আন্তরিক একাগ্রতা বজায় রাখা।'
    },
    {
      titleEn: 'Punctuality & Regularity',
      titleBn: 'সময়নিষ্ঠা ও নিয়মিত উপস্থিতি',
      descEn: 'Arriving on time, active engagement, and respecting school daily schedules.',
      descBn: 'প্রতিদিন সঠিক সময়ে উপস্থিত হওয়া ও প্রতিটি কার্যক্রমে সক্রিয় অংশ নেওয়া।'
    },
    {
      titleEn: 'Mutual Respect & Safety',
      titleBn: 'পারস্পরিক শ্রদ্ধা ও নিরাপত্তা',
      descEn: 'Treating teachers, peers, and staff with kindness, empathy, and courteous language.',
      descBn: 'শিক্ষক, সহপাঠী ও বিদ্যালয় কর্মীদের প্রতি শ্রদ্ধা, অমায়িক আচরণ ও ভদ্র ভাষা ব্যবহার।'
    }
  ];

  const ruleCategories = [
    {
      id: 'attendance',
      titleEn: 'Attendance, Timing & Punctuality',
      titleBn: 'উপস্থিতি ও সময়ানুবর্তিতা',
      icon: Clock,
      rulesEn: [
        'Regular attendance of at least 80% is required for term evaluation and class promotion.',
        'Morning assembly begins at 8:30 AM; late arrivals after 8:40 AM must check in with the office.',
        'Prior written notice from parents is required for planned leave or family events.',
        'For medical absences exceeding 2 consecutive days, a medical prescription or letter is needed.'
      ],
      rulesBn: [
        'সাময়িক পরীক্ষা ও পরবর্তী শ্রেণিতে উত্তীর্ণের জন্য ন্যূনতম ৮০% উপস্থিতি বাধ্যতামূলক।',
        'সকাল ৮:৩০ টায় প্রাতঃকালীন সমাবেশ শুরু হয়; ৮:৪০ এর পর পৌঁছালে অফিসে নাম এন্ট্রি করতে হবে।',
        'পূর্বপরিকল্পিত ছুটির জন্য অভিভাবকের স্বাক্ষরিত আবেদনপত্র আগেই জমা দিতে হবে।',
        'টানা ২ দিনের বেশি অসুস্থতাজনিত অনুপস্থিতির ক্ষেত্রে চিকিৎসকের ব্যবস্থাপত্র প্রদর্শন আবশ্যক।'
      ]
    },
    {
      id: 'conduct',
      titleEn: 'Academic Conduct & Learning Habits',
      titleBn: 'শ্রেণিকক্ষের শিষ্টাচার ও পাঠাভ্যাস',
      icon: BookOpen,
      rulesEn: [
        'Students must bring the prescribed textbooks, workbooks, and stationery as per the daily routine.',
        'The student homework diary must be maintained daily and countersigned by parents.',
        'Active listening and courteous permission before speaking foster an optimal learning space.',
        'Class assignments and projects must be completed independently and submitted on time.'
      ],
      rulesBn: [
        'দৈনন্দিন ক্লাস রুটিন অনুযায়ী নির্দিষ্ট পাঠ্যবই, খাতা ও শিক্ষা উপকরণ সাথে আনতে হবে।',
        'শিক্ষার্থীর দৈনিক ডায়েরি নিয়মিত আপডেট রাখা এবং অভিভাবকের স্বাক্ষর গ্রহণ বাধ্যতামূলক।',
        'শ্রেণিকক্ষে মনোযোগ সহকারে শিক্ষকের পাঠ শোনা ও কথা বলার পূর্বে হাত তোলার শিষ্টাচার মানা।',
        'হোমওয়ার্ক ও অ্যাসাইনমেন্ট সময়মতো এবং নিজস্ব উদ্যোগে সম্পন্ন করা।'
      ]
    },
    {
      id: 'behavior',
      titleEn: 'Student Etiquette & Peer Harmony',
      titleBn: 'আচরণবিধি ও সহপাঠী সম্প্রীতি',
      icon: HeartHandshake,
      rulesEn: [
        'Strict zero-tolerance policy against physical fighting, bullying, or teasing.',
        'Polite, respectful Bangla and English communication is encouraged at all times.',
        'School furniture, smart classroom equipment, and library books must be treated with care.',
        'Conflicts must be reported to the class teacher or counselor for peaceful resolution.'
      ],
      rulesBn: [
        'কোনো ধরনের উৎপীড়ন, উপহাস, গালিগালাজ বা মারামারির বিরুদ্ধে কঠোর জিরো টলারেন্স নীতি।',
        'সর্বদা শালীন, মার্জিত ও বন্ধুভাবাপন্ন ভাষা ব্যবহার করতে হবে।',
        'বিদ্যালয়ের আসবাবপত্র, আধুনিক শিক্ষা উপকরণ ও লাইব্রেরির বইয়ের যত্ন নেওয়া আবশ্যক।',
        'যেকোনো মতবিরোধ নিজে মারামারি না করে শ্রেণি শিক্ষকের নিকট অবহিত করে সমাধান করা।'
      ]
    },
    {
      id: 'uniform',
      titleEn: 'School Uniform, Identity & Grooming',
      titleBn: 'বিদ্যালয়ের পোশাক ও পরিচ্ছন্নতা',
      icon: Shirt,
      rulesEn: [
        'Approved school uniform with official logo badge must be worn cleanly and neatly every day.',
        'Clean black school shoes with white socks and official student ID card are mandatory.',
        'Personal grooming: Hair should be neatly trimmed/tied; fingernails clipped weekly.',
        'Valuable jewelry, expensive electronic gadgets, or toys are strictly prohibited on campus.'
      ],
      rulesBn: [
        'বিদ্যালয় নির্ধারিত পরিষ্কার-পরিচ্ছন্ন ইউনিফর্ম ও লোগোযুক্ত ব্যাজ পরিধান করে আসতে হবে।',
        'কালো জুতা, সাদা মোজা এবং আইডি কার্ড পরিধান বাধ্যতামূলক।',
        'ব্যক্তিগত পরিচ্ছন্নতা: ছেলেদের চুল শালীনভাবে ছাঁটা এবং মেয়েদের চুল পরিপাটি রাখা; নখ ছোট রাখা।',
        'দামি গহনা, ইলেকট্রনিক খেলনা বা মোবাইল ফোন ক্যাম্পাসে আনা সম্পূর্ণ নিষেধ।'
      ]
    },
    {
      id: 'health',
      titleEn: 'Health, Hygiene & Campus Safety',
      titleBn: 'স্বাস্থ্য সচেতনতা ও নিরাপত্তা',
      icon: HeartPulse,
      rulesEn: [
        'Students must carry healthy home-prepared tiffin and clean drinking water bottles.',
        'Parents must inform the administration in writing of any chronic allergies or medical conditions.',
        'Washing hands before meals and proper waste disposal in classroom bins is practiced daily.',
        'Campus exit during school hours is permitted only with parent authorization and gate pass.'
      ],
      rulesBn: [
        'শিক্ষার্থীদের জন্য বাড়ি থেকে স্বাস্থ্যসম্মত পুষ্টিকর টিফিন ও নিরাপদ পানির বোতল পাঠানো জরুরি।',
        'কোনো বিশেষ এলার্জি বা স্বাস্থ্য সমস্যা থাকলে ভর্তির সময় ও লিখিতভাবে অফিসকে জানাতে হবে।',
        'খাওয়ার আগে সাবান দিয়ে হাত ধোয়া এবং ময়লা-আবর্জনা নির্ধারিত বিনে ফেলার অভ্যাস মানা।',
        'স্কুল চলাকালীন সময়ে লিখিত অনুমতি ও গেটপাস ব্যতীত কোনো শিক্ষার্থী বাইরে যেতে পারবে না।'
      ]
    },
    {
      id: 'parent',
      titleEn: 'Parent Partnership & Communication',
      titleBn: 'অভিভাবক মৈত্রী ও সহযোগিতা',
      icon: Users,
      rulesEn: [
        'Parents are warmly encouraged to attend all Parent-Teacher Meetings (PTMs) and orientations.',
        'Constructive feedback or concerns should be shared directly with the administration desk.',
        'Timely drop-off and pick-up at the designated school security gates ensure student safety.',
        'Notify the registrar immediately regarding any change in contact phone numbers or address.'
      ],
      rulesBn: [
        'সকল অভিভাবক-শিক্ষক মতবিনিময় সভা (PTM) ও ক্লাসের অগ্রগতি সভায় আন্তরিক উপস্থিতি কাম্য।',
        'যেকোনো পরামর্শ বা অভিযোগ সরাসরি প্রধান শিক্ষক বা প্রশাসনিক হেল্পডেস্কে উপস্থাপন করতে হবে।',
        'নির্ধারিত সময়ে ক্যাম্পাসের নির্দিষ্ট গেটে শিক্ষার্থীকে নিয়ে আসা ও নিয়ে যাওয়ার নিয়ম মানা।',
        'জরুরি যোগাযোগ নম্বর বা ঠিকানার পরিবর্তন হলে দ্রুত অফিসকে অবহিত করা।'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Institutional Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            {isBn ? 'একাডেমিক নীতিমালা ও আচরণ নির্দেশিকা' : 'Academic Standards & Disciplinary Framework'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {isBn ? 'একাডেমিক নিয়মাবলী ও আচরণবিধি' : 'Academic Rules & Code of Conduct'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {isBn
              ? 'সূর্যমুখী কিন্ডারগার্টেনে একটি নিরাপদ, সুশৃঙ্খল এবং আনন্দময় পরিবেশে শিক্ষার্থীদের মানসিক ও নৈতিক বিকাশের লক্ষ্যে প্রণীত প্রাতিষ্ঠানিক নির্দেশিকা।'
              : 'Our institutional guidelines establish a safe, respectful, and nurturing environment where every child develops character, moral excellence, and academic confidence.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">80%</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'ন্যূনতম উপস্থিতি' : 'Min Attendance'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">8:30 AM</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'সমাবেশ শুরু' : 'Morning Assembly'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">Zero</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'বুলিং টলারেন্স' : 'Bullying Tolerance'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">Restorative</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'পজিটিভ গাইডেন্স' : 'Discipline Model'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Golden Tenets */}
      <section className="py-12 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'আমাদের মূল আদর্শ' : 'Foundational Tenets'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'আদর্শ শিক্ষার্থীর ৩টি মূল অঙ্গীকার' : 'Three Pillars of Student Character'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goldenTenets.map((tenet, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  {isBn ? tenet.titleBn : tenet.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isBn ? tenet.descBn : tenet.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Rule Categories (6 Cards Grid) */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'নীতিমালার পূর্ণাঙ্গ তালিকা' : 'Detailed Policy Taxonomy'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'দৈনন্দিন প্রাতিষ্ঠানিক নির্দেশিকা' : 'Classroom & Campus Guidelines'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {isBn
                ? 'শিক্ষার্থী, শিক্ষক ও অভিভাবক সবার সম্মিলিত প্রচেষ্টায় একটি সুন্দর শিক্ষাঙ্গন গড়ে তোলার নিয়মাবলী।'
                : 'Clear, gentle, and constructive expectations ensuring safety, intellectual engagement, and mutual respect.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ruleCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {isBn ? category.titleBn : category.titleEn}
                      </h3>
                    </div>

                    <ul className="space-y-3 mt-4">
                      {(isBn ? category.rulesBn : category.rulesEn).map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2.5 mt-0.5 flex-shrink-0" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>Surjomukhi Code of Conduct</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Positive Reinforcement vs. Restorative Guidance */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'শৃঙ্খলা ও মূল্যবোধ বিকাশ' : 'Disciplinary Framework'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'উৎসাহ প্রদান ও সংশোধনমূলক গাইডেন্স' : 'Positive Reinforcement & Restorative Guidance'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {isBn
                ? 'কঠোর শাস্তির পরিবর্তে স্নেহ ও দিকনির্দেশনার মাধ্যমে শিশুর আচরণগত পরিবর্তন আনা আমাদের লক্ষ্য।'
                : 'We prioritize empathetic mentorship, praise, and restorative counseling over punitive measures.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Positive Reinforcement */}
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-emerald-950">
                  {isBn ? 'সদাচরণের জন্য স্বীকৃতি ও পুরস্কার' : 'Positive Reinforcement & Awards'}
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Student of the Month Awards:</strong> Monthly recognition for outstanding character, kindness, and effort.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Merit Tokens & Badges:</strong> Weekly stars and appreciation certificates presented during morning assembly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Appreciation Letters:</strong> Commendation letters sent to parents highlighting positive leadership and conduct.</span>
                </li>
              </ul>
            </div>

            {/* Restorative Guidance */}
            <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/50 border border-amber-200/70 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-amber-950">
                  {isBn ? 'সংশোধনমূলক পরামর্শ ও কাউন্সেলিং' : 'Restorative Guidance & Counseling'}
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Gentle Reflective Mentorship:</strong> One-on-one dialogue with the teacher to understand consequences.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Peer Apology & Restoration:</strong> Constructive activities that heal hurt feelings and rebuild friendships.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Collaborative Parent Meeting:</strong> Constructive family counseling sessions when persistent guidance is needed.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct CTA Helpdesk Banner */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {isBn ? 'নীতিমালা সম্পর্কিত কোনো প্রশ্ন আছে?' : 'Questions Regarding Our Academic Policies?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {isBn
                ? 'আমাদের প্রধান শিক্ষক ও প্রশাসনিক টিম যেকোনো পরামর্শ বা ব্যাখ্যার জন্য সদাপ্রস্তুত।'
                : 'Our administrative coordinators and counseling team are available to discuss student policies and support your child.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                {isBn ? 'যোগাযোগ করুন' : 'Contact Administrative Desk'}
              </Link>
              <Link
                href="/student/syllabus"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                {isBn ? 'পাঠ্যক্রম ও সিলেবাস দেখুন' : 'Explore Academic Syllabi'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
