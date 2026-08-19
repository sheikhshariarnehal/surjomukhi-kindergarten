'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ShieldCheck,
  HeartHandshake,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sun,
  Smile,
  Heart,
  Eye,
  Ear,
  Lightbulb,
  Users,
  Shirt,
  HeartPulse
} from 'lucide-react';

export default function StudentRulesPage() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const goldenTenets = [
    {
      titleEn: '1. Be Kind & Helpful',
      titleBn: '১. সর্বদা দয়ালু ও সাহায্যকারী হোন',
      descEn: 'Treat everyone with respect and empathy. Speak with encouraging words and share joy with classmates.',
      descBn: 'সকলের সাথে বিনম্র ও শ্রদ্ধাশীল আচরণ করুন। অন্যকে সাহায্য করার আনন্দ উপভোগ করুন এবং মার্জিত ভাষা ব্যবহার করুন।'
    },
    {
      titleEn: '2. Be Safe & Mindful',
      titleBn: '২. নিরাপদ ও সতর্ক থাকুন',
      descEn: 'Follow classroom and playground safety rules to protect yourself and your friends at all times.',
      descBn: 'ক্যাম্পাস, সিঁড়ি ও খেলার মাঠে সাবধানে চলুন এবং নিজের ও সহপাঠীদের সার্বিক নিরাপত্তা নিশ্চিত করুন।'
    },
    {
      titleEn: '3. Strive for Your Best',
      titleBn: '৩. নিষ্ঠা ও সেরা চেষ্টা করুন',
      descEn: 'Put genuine enthusiasm into your lessons, artwork, and personal habits each single day.',
      descBn: 'প্রতিটি কাজে নিজের সর্বোচ্চ মনোযোগ দিন, সততার সাথে পাঠ গ্রহণ করুন এবং পরিচ্ছন্ন জীবনযাপন করুন।'
    }
  ];

  const ruleCategories = [
    {
      id: 'conduct',
      titleEn: 'General Conduct & Respect',
      titleBn: 'সাধারণ আচরণ ও পারস্পরিক শ্রদ্ধা',
      icon: HeartHandshake,
      badgeEn: 'Core Values',
      badgeBn: 'মূল আদর্শ',
      rulesEn: [
        'Treat all fellow students, teachers, and school staff with kindness, warmth, and respect.',
        'Use polite language, greeting teachers with "As-salamu alaykum" or "Good Morning".',
        'Follow instructions from teachers and class prefects promptly and respectfully.',
        'Help maintain a peaceful, welcoming, and positive classroom environment.',
        'Report any misunderstandings or disputes to teachers immediately without shouting.'
      ],
      rulesBn: [
        'সকল সহপাঠী, শিক্ষক ও কর্মচারীদের সাথে নম্রতা, শ্রদ্ধা ও দয়ার সাথে আচরণ করুন।',
        'সর্বদা মার্জিত ভাষা ব্যবহার করুন এবং শিক্ষকদের যথাযথ সম্মান প্রদর্শন করুন।',
        'শিক্ষক ও শ্রেণি পরিচালকদের নির্দেশনা তৎক্ষণাৎ ও শ্রদ্ধার সাথে মেনে চলুন।',
        'শ্রেণিকক্ষে শান্ত, মনোরম ও ইতিবাচক পরিবেশ বজায় রাখতে সহায়তা করুন।',
        'কোনো সমস্যা বা মতানৈক্য দেখা দিলে চিৎকার না করে অবিলম্বে শিক্ষকদের জানান।'
      ]
    },
    {
      id: 'classroom',
      titleEn: 'Classroom Etiquette & Learning Habits',
      titleBn: 'শ্রেণিকক্ষের শৃঙ্খলা ও শিখন শিষ্টাচার',
      icon: BookOpen,
      badgeEn: 'Academics',
      badgeBn: 'শিক্ষা ও পাঠাভ্যাস',
      rulesEn: [
        'Listen attentively when teachers or classmates are speaking in the room.',
        'Raise your hand politely before asking questions or answering a prompt.',
        'Keep your study desk, pencil box, and bag clean and organized.',
        'Share classroom learning materials, crayons, and toys fairly with friends.',
        'Participate enthusiastically in all recitation, singing, and group tasks.'
      ],
      rulesBn: [
        'শিক্ষক বা সহপাঠীরা কথা বলার সময় মনোযোগ সহকারে শুনুন।',
        'কথা বলা বা প্রশ্ন করার আগে শৃঙ্খলা মেনে হাত তুলুন।',
        'নিজের পড়ার টেবিল, পেন্সিল বক্স ও ব্যাগ পরিষ্কার-পরিচ্ছন্ন ও পরিপাটি রাখুন।',
        'সহপাঠীদের সাথে খেলনা ও অঙ্কনের উপকরণ ভাগাভাগি করে ব্যবহার করুন।',
        'শ্রেণির সকল আবৃত্তি, গান ও দলগত কার্যক্রমে স্বতঃস্ফূর্তভাবে অংশগ্রহণ করুন।'
      ]
    },
    {
      id: 'safety',
      titleEn: 'Campus Safety & Corridor Guidelines',
      titleBn: 'ক্যাম্পাস নিরাপত্তা ও করিডোর নিয়মাবলী',
      icon: ShieldCheck,
      badgeEn: 'Campus Safety',
      badgeBn: 'নিরাপত্তা',
      rulesEn: [
        'Walk calmly in corridors, hallways, and staircases — running is strictly avoided.',
        'Keep hands, feet, and objects to yourself while standing in line or moving.',
        'Use playground swings, slides, and outdoor equipment under teacher supervision.',
        'Always remain with your allocated class section during recess and assembly.',
        'Report any slips, spills, or unsafe campus situations to staff right away.'
      ],
      rulesBn: [
        'করিডোর, বারান্দা ও সিঁড়িতে সবসময় সাবধানে হাঁটুন — কোনো অবস্থাতেই দৌড়াদৌড়ি করবেন না।',
        'লাইনের মধ্যে শৃঙ্খলার সাথে দাঁড়ান এবং কাউকে ধাক্কা দেবেন না।',
        'খেলার মাঠের দোলনা ও স্লিপার শিক্ষকের তত্ত্বাবধানে সতর্কতার সাথে ব্যবহার করুন।',
        'টিফিন বা অ্যাসেম্বলির সময় সর্বদা নিজের ক্লাসের নির্ধারিত স্থানে থাকুন।',
        'যেকোনো আঘাত বা বিপজ্জনক পরিস্থিতি দেখলে তাৎক্ষণিক শিক্ষককে জানান।'
      ]
    },
    {
      id: 'hygiene',
      titleEn: 'Personal Hygiene & Uniform Standards',
      titleBn: 'ব্যক্তিগত স্বাস্থ্যবিধি ও ইউনিফর্ম পরিচ্ছন্নতা',
      icon: Shirt,
      badgeEn: 'Hygiene & Dress',
      badgeBn: 'স্বাস্থ্য ও পোশাক',
      rulesEn: [
        'Wear the complete, clean, and well-ironed school uniform with designated badge.',
        'Wash hands with soap before tiffin meals and immediately after restroom visits.',
        'Cover your mouth with a handkerchief or elbow when coughing or sneezing.',
        'Keep fingernails trimmed and hair neatly combed according to dress policy.',
        'Always carry a water bottle and clean tissue or napkin in your backpack.'
      ],
      rulesBn: [
        'প্রতিদিন পরিচ্ছন্ন, ইস্ত্রি করা স্কুল ইউনিফর্ম ও নির্ধারিত ব্যাজ পরিধান করুন।',
        'টিফিন খাওয়ার পূর্বে এবং ওয়াশরুম ব্যবহারের পর সাবান দিয়ে হাত ধৌত করুন।',
        'হাঁচি বা কাশির সময় রুমাল বা কনুই দিয়ে মুখ ও নাক ঢেকে রাখুন।',
        'নখ ছোট ও পরিষ্কার রাখুন এবং চুল পরিপাটি করে আঁচড়িয়ে স্কুলে আসুন।',
        'ব্যাগ বা টিফিন বক্সে সবসময় পানির বোতল ও পরিষ্কার রুমাল রাখুন।'
      ]
    },
    {
      id: 'protection',
      titleEn: 'Child Protection & Safe Environment',
      titleBn: 'শিশু সুরক্ষা ও নিরাপদ ক্যাম্পাস অঙ্গীকার',
      icon: HeartPulse,
      badgeEn: 'Safeguarding',
      badgeBn: 'শিশু সুরক্ষা',
      rulesEn: [
        'Surjomukhi Kindergarten maintains a zero-tolerance policy against bullying.',
        'Report any uncomfortable touch or harsh words immediately to your class teacher.',
        'Our dedicated Child Safeguarding Committee ensures continuous supervision.',
        'Every child is entitled to equal dignity, care, and respectful listening.',
        'Parents must show student pickup ID cards at the gate during afternoon dismissal.'
      ],
      rulesBn: [
        'সূর্যমুখী কিন্ডারগার্টেনে যেকোনো ধরণের বুলিং বা উত্যক্ত করার ক্ষেত্রে জিরো টলারেন্স নীতি প্রযোজ্য।',
        'কোনো অস্বস্তিকর আচরণ বা কথা শুনলে সঙ্গে সঙ্গে ক্লাস টিচারকে অবহিত করুন।',
        'আমাদের বিশেষ শিশু সুরক্ষা কমিটি সার্বক্ষণিক শিক্ষার্থীদের নিরাপত্তায় নিয়োজিত।',
        'সকল শিক্ষার্থীর সমান মর্যাদা, যত্ন ও ভালোবাসা পাওয়ার পূর্ণ অধিকার রয়েছে।',
        'ছুটির সময় অভিভাবকদের গেটে নির্ধারিত স্টুডেন্ট পিকআপ আইডি কার্ড প্রদর্শন করতে হবে।'
      ]
    },
    {
      id: 'merit',
      titleEn: 'Merit, Awards & Positive Recognition',
      titleBn: 'মেধাবৃত্তি, পুরস্কার ও সদাচরণ স্বীকৃতি',
      icon: Award,
      badgeEn: 'Awards & Honors',
      badgeBn: 'স্বীকৃতি ও পুরস্কার',
      rulesEn: [
        'Annual merit awards recognize academic excellence and creative progress.',
        'Special monthly badges are awarded for 100% attendance and helpful conduct.',
        'Cultural competitions celebrate singing, art, calligraphy, and sportsmanship.',
        'Positive behavior tokens inspire teamwork and good citizenship in young minds.',
        'Every student receives encouraging recognition for effort and consistency.'
      ],
      rulesBn: [
        'বার্ষিক পরীক্ষায় সর্বোচ্চ ফলাফল অর্জনকারীদের বিশেষ মেধাবৃত্তি প্রদান করা হয়।',
        'শতভাগ উপস্থিতি ও পরিচ্ছন্ন আচরণের জন্য মাসিক বিশেষ পুরস্কার প্রদান করা হয়।',
        'গান, আবৃত্তি, চিত্রাঙ্কন ও সুন্দর হাতের লেখার জন্য নিয়মিত সাংস্কৃতিক পুরস্কার রয়েছে।',
        'সদাচরণের জন্য বিশেষ স্বীকৃতি টোকেন শিক্ষার্থীদের নৈতিকতা চর্চায় অনুপ্রাণিত করে।',
        'প্রত্যেক শিক্ষার্থীর আন্তরিক চেষ্টা ও অধ্যবসায়কে যথাযথভাবে উৎসাহিত করা হয়।'
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
            {isBn ? 'ক্যাম্পাস নীতিমালা ও আচরণবিধি' : 'Campus Code of Conduct & Standards'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {isBn ? 'শিক্ষার্থী আচরণবিধি ও নীতিমালা' : 'Student Code of Conduct & Rules'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {isBn
              ? 'একটি নিরাপদ, সুশৃঙ্খল এবং আনন্দময় পরিবেশে শিক্ষার্থীদের মানসিক ও নৈতিক বিকাশের লক্ষ্যে প্রণীত প্রাতিষ্ঠানিক আচরণবিধি।'
              : 'Clear, gentle, and constructive guidelines designed to foster safety, mutual respect, and positive character development across our kindergarten.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">Zero</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'বুলিং টলারেন্স' : 'Bullying Tolerance'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">100%</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'নিরাপদ ক্যাম্পাস' : 'Campus Safeguarding'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">Positive</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'উদ্বুদ্ধকরণ পদ্ধতি' : 'Reinforcement Model'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">Monthly</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'সদাচরণ স্বীকৃতি' : 'Merit Badges'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3 Core Golden Values */}
      <section className="py-12 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {isBn ? 'সূর্যমুখীর ৩টি সুবর্ণ স্তম্ভ' : 'Our 3 Golden Tenets'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {isBn ? 'দৈনন্দিন জীবনে শিশুর নৈতিক বিকাশের ভিত্তিপ্রস্তর' : 'Foundational pillars guiding student character and daily interaction'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goldenTenets.map((tenet, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all group">
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

      {/* 3. Rules Categories Grid */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {isBn ? 'শ্রেণি ও ক্যাম্পাস আচরণবিধি' : 'Campus Code of Conduct by Category'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {isBn
                ? 'প্রতিটি ক্ষেত্রে শৃঙ্খলার স্পষ্ট রূপরেখা যা শিক্ষার্থীদের দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলে।'
                : 'Structured expectations to help young learners develop accountability and ethical citizenship.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ruleCategories.map((cat) => {
              const IconComp = cat.icon;
              const title = isBn ? cat.titleBn : cat.titleEn;
              const rules = isBn ? cat.rulesBn : cat.rulesEn;
              const badge = isBn ? cat.badgeBn : cat.badgeEn;

              return (
                <div 
                  key={cat.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full">
                        {badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-4 leading-snug">
                      {title}
                    </h3>

                    <ul className="space-y-2.5">
                      {rules.map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>Surjomukhi Student Charter</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Positive Reinforcement & Constructive Guidance */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Positive Reinforcement */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {isBn ? 'সদাচরণের জন্য স্বীকৃতি ও প্রশংসা' : 'Positive Reinforcement & Praise'}
                  </h3>
                  <p className="text-xs text-emerald-800">
                    {isBn ? 'ধারাবাহিক ভালো কাজের অনুপ্রেরণা' : 'Celebrating consistent good conduct'}
                  </p>
                </div>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{isBn ? 'শ্রেণিকক্ষে স্টার টোকেন ও শিক্ষকের আন্তরিক মৌখিক প্রশংসা।' : 'Verbal appreciation and star tokens in class activity books.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{isBn ? 'মাসিক "উত্তম শিক্ষার্থী" ও "নিয়মিত পাঠক" বিশেষ সার্টিফিকেট।' : 'Monthly "Good Samaritan" and "Diligent Reader" certificates.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{isBn ? 'সাপ্তাহিক প্রাতঃকালীন সমাবেশে সহপাঠীদের সামনে আনুষ্ঠানিক সম্মাননা।' : 'Recognition during weekly morning assembly before peers.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{isBn ? 'অভিভাবকদের নিকট প্রশংসাপত্র প্রেরণ যা শিশুর আত্মবিশ্বাস বাড়ায়।' : 'Special commendation notes sent home to proud parents.'}</span>
                </li>
              </ul>
            </div>

            {/* Constructive Guidance */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {isBn ? 'গঠনমূলক সংশোধন ও পরামর্শ' : 'Constructive Restorative Guidance'}
                  </h3>
                  <p className="text-xs text-amber-800">
                    {isBn ? 'ভুল সংশোধনে শিক্ষকের স্নেহময় অভিভাবকত্ব' : 'How rule infractions are gently addressed'}
                  </p>
                </div>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{isBn ? 'ভুলের কারণ অনুধাবনের জন্য শ্রেণি শিক্ষকের সাথে একান্তে খোলামেলা কথা বলা।' : 'Gentle, 1-on-1 discussion with the class teacher to understand motives.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{isBn ? 'সহপাঠীর প্রতি সম্মান প্রদর্শন ও আন্তরিক ক্ষমাপ্রার্থনার সংস্কৃতি গড়ে তোলা।' : 'Guiding the child to reflect and offer a sincere apology to friends.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{isBn ? 'মানসিক উত্তেজনা প্রশমনে স্বল্প সময়ের নীরব অনুধ্যান ও কাউন্সেলিং।' : 'Short quiet reflection time during activity transition if agitated.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{isBn ? 'প্রয়োজনে অভিভাবকের সাথে বন্ধুত্বপূর্ণ পরামর্শের মাধ্যমে সমাধান খোঁজা।' : 'Coordinated parent dialogue if behavioral habits require joint support.'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Helpdesk */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {isBn ? 'শিক্ষার্থী কল্যাণ বা নীতিমালা সংক্রান্ত প্রশ্ন আছে?' : 'Questions Regarding Student Welfare or Policies?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {isBn
                ? 'আমাদের স্টুডেন্ট কাউন্সেলিং ডেস্ক ও প্রশাসনিক অফিস যেকোনো সহায়তার জন্য প্রস্তুত।'
                : 'Our Student Counseling Desk and Administration Office are available to support parents and guardians with any inquiries.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <HelpCircle className="w-4 h-4" />
                {isBn ? 'শিক্ষার্থী কল্যাণ ডেস্কে যোগাযোগ' : 'Contact Student Welfare'}
              </Link>
              <Link
                href="/admission/policy"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                {isBn ? 'ভর্তি নীতিমালা দেখুন' : 'Admission Policies'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
