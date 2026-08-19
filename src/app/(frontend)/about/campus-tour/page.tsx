'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, 
  BookOpen, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function CampusTourPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const facilities = [
    {
      title: isBn ? 'প্রশস্ত খেলার মাঠ' : 'Spacious Athletic Field',
      dimension: '100 yd × 60 yd',
      description: isBn
        ? 'প্রায় ১০০ গজ × ৬০ গজ আয়তনের উন্মুক্ত সবুজ খেলার মাঠ যা শিশুদের শারীরিক বিকাশ, শরীরচর্চা, ফুটবল, ক্রিকেট এবং বার্ষিক ক্রীড়া প্রতিযোগিতার জন্য ব্যবহৃত হয়।'
        : 'Approximately 100 yards × 60 yards open sports ground dedicated to athletic activities, daily assemblies, football, cricket, and annual sports events.',
      icon: <Activity className="w-6 h-6 text-blue-600" />,
      features: [
        isBn ? 'দৈনিক সমাবেশ ও শরীরচর্চা' : 'Morning assemblies & PT',
        isBn ? 'ফুটবল ও ক্রিকেট খেলার ব্যবস্থা' : 'Football & cricket field',
        isBn ? 'বার্ষিক ক্রীড়া প্রতিযোগিতা' : 'Annual athletic tournaments',
        isBn ? 'নিরাপদ উন্মুক্ত ঘাসযুক্ত মাঠ' : 'Safe open-grass play area'
      ]
    },
    {
      title: isBn ? 'সমৃদ্ধ শিশু পাঠাগার' : 'Children’s Reading Library',
      dimension: isBn ? 'বয়সোপযোগী বই' : 'Age-Appropriate',
      description: isBn
        ? 'প্রধান শিক্ষকের সরাসরি তত্ত্বাবধানে পরিচালিত পাঠাগার যেখানে শিক্ষার্থীদের জন্য রয়েছে শিক্ষামূলক গল্পের বই, শিশুতোষ জ্ঞানকোষ এবং পড়ার চমৎকার পরিবেশ।'
        : 'Curated library overseen by the Head Teacher containing illustrated storybooks, children’s encyclopedias, and literature fostering early literacy.',
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      features: [
        isBn ? 'শিশুতোষ গল্পের বই ও সাময়িকী' : 'Illustrated storybooks & magazines',
        isBn ? 'সহজ রেফারেন্স ও শিক্ষামূলক বই' : 'Learning resources & references',
        isBn ? 'নিয়মিত পাঠাভ্যাস কর্মসূচি' : 'Supervised reading hours',
        isBn ? 'শান্ত ও মনোরম পাঠ পরিবেশ' : 'Quiet, comfortable environment'
      ]
    },
    {
      title: isBn ? 'শিশুবান্ধব শ্রেণীকক্ষ' : 'Modern Child-Centric Classrooms',
      dimension: 'Play – Grade 5',
      description: isBn
        ? 'পর্যাপ্ত আলো-বাতাস সমৃদ্ধ আধুনিক শ্রেণীকক্ষ যা শিক্ষা উপকরণ, মানচিত্র, চার্ট ও আধুনিক আসবাবপত্রে সজ্জিত।'
        : 'Well-ventilated, naturally lit classrooms equipped with visual learning charts, child-friendly ergonomic desks, and teaching aids.',
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      features: [
        isBn ? 'প্রাক-প্রাথমিক শিশুবান্ধব পরিবেশ' : 'Pre-primary sensory decor',
        isBn ? 'শ্রেণীভিত্তিক ভিজ্যুয়াল চার্ট' : 'Subject & moral learning charts',
        isBn ? 'পর্যাপ্ত প্রাকৃতিক আলো ও বায়ু' : 'Optimal natural light & ventilation',
        isBn ? 'নিয়মিত পরিচ্ছন্নতা নিশ্চিতকরণ' : 'Daily sanitization & cleaning'
      ]
    },
    {
      title: isBn ? 'প্রশাসনিক কার্যালয়' : 'Administrative & Counseling Office',
      dimension: isBn ? 'অভিভাবক সেবা' : 'Parent Care',
      description: isBn
        ? 'অভিভাবক ও দর্শনার্থীদের তথ্য সেবা, ভর্তি প্রক্রিয়া ও ছাত্রছাত্রীদের একাডেমিক পরামর্শের জন্য সুসংগঠিত প্রশাসনিক অফিস।'
        : 'Well-coordinated central office handling admissions, academic records, fee structures, and personalized parent consultations.',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      features: [
        isBn ? 'ভর্তি ও তথ্য সহায়তা ডেস্ক' : 'Admissions & inquiries desk',
        isBn ? 'অভিভাবক মিটিং ও পরামর্শ' : 'Parent-teacher consultation room',
        isBn ? 'শিক্ষার্থী রেকর্ড সংরক্ষণাগার' : 'Secure student record archives',
        isBn ? 'দৈনন্দিন প্রাতিষ্ঠানিক সমন্বয়' : 'Daily operational oversight'
      ]
    },
    {
      title: isBn ? 'নিরাপদ ও সুরক্ষিত পরিবেশ' : 'Comprehensive Campus Safety',
      dimension: isBn ? 'সার্বক্ষণিক সুরক্ষা' : '24/7 Monitored',
      description: isBn
        ? 'সীমানা প্রাচীরবেষ্টিত সুরক্ষিত ক্যাম্পাস এবং ৫ সদস্যবিশিষ্ট যৌন হয়রানি প্রতিরোধ ও সার্বিক নিরাপত্তা কমিটির প্রত্যক্ষ নজরদারি।'
        : 'Enclosed secure perimeter monitored with active supervision and a 5-member dedicated safety & anti-harassment committee.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      features: [
        isBn ? 'সুরক্ষিত সীমানা প্রাচীর ও গেইট' : 'Enclosed campus gates',
        isBn ? 'যৌন হয়রানি বিরোধী ৫ সদস্যের কমিটি' : '5-Member safety committee',
        isBn ? 'প্রাথমিক চিকিৎসা ফার্স্ট-এইড ব্যবস্থা' : 'On-site first aid support',
        isBn ? 'নিরাপদ বিশুদ্ধ পানির ব্যবস্থা' : 'Pure filtered drinking water'
      ]
    },
    {
      title: isBn ? 'সাংস্কৃতিক ও মেধা বিকাশ অঞ্চল' : 'Co-Curricular & Activity Spaces',
      dimension: isBn ? 'সৃজনশীল মেধা' : 'Creative Arts',
      description: isBn
        ? 'চিত্রাঙ্কন, আবৃত্তি, বিতর্ক ও সাংস্কৃতিক অনুষ্ঠান উদযাপনের জন্য নির্ধারিত মুক্তমঞ্চ ও ইনডোর অ্যাক্টিভিটি স্পেস।'
        : 'Dedicated multipurpose spaces for children’s art competitions, recitation, cultural celebrations, and national day observances.',
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      features: [
        isBn ? 'জাতীয় দিবস ও সাংস্কৃতিক মঞ্চ' : 'National days celebration stage',
        isBn ? 'চিত্রাঙ্কন ও হস্তলিপি কর্নার' : 'Handwriting & art exhibition',
        isBn ? 'ইনডোর ইনডোর দাবা ও শব্দখেলার স্থান' : 'Chess & vocabulary games',
        isBn ? 'পুরস্কার বিতরণী আয়োজন' : 'Academic award assemblies'
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
              {isBn ? 'ক্যাম্পাস ও পরিবেশ পরিদর্শন' : 'Campus Tour & Facilities'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'নবাবগঞ্জের আওনা বাজারে শিশুদের শারীরিক, মানসিক ও বুদ্ধিবৃত্তিক বিকাশের জন্য সুপরিকল্পিত শিশুবান্ধব ক্যাম্পাস অবকাঠামো।'
                : 'A thoughtfully planned, secure, and stimulating educational environment designed to nurture young learners in Nawabganj, Dhaka.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">100×60</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'খেলার মাঠ (গজ)' : 'Playground (Yards)'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                  {isBn ? 'লাইব্রেরি' : 'Library'}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'সমৃদ্ধ পাঠাগার' : 'Children’s Books'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Play – 5</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'শ্রেণীকক্ষ' : 'Classrooms'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                  {isBn ? 'নিরাপদ' : 'Secure'}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'সুরক্ষিত ক্যাম্পাস' : 'Child-Safe Campus'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Facilities Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {isBn ? 'ক্যাম্পাসের প্রধান সুবিধাসমূহ' : 'Core Campus Infrastructure'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'আনন্দময় পাঠদান, শারীরিক ব্যায়াম এবং সুশৃঙ্খল পরিবেশ বজায় রাখতে আমাদের সুবিন্যস্ত সুবিধাদি।'
              : 'Purpose-built spaces ensuring healthy physical development, focused academics, and complete safety.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {facilities.map((fac, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    {fac.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                    {fac.dimension}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                  {fac.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {fac.description}
                </p>

                <ul className="space-y-2 border-t border-gray-100 pt-4">
                  {fac.features.map((item, fIdx) => (
                    <li key={fIdx} className="flex items-center text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 3. Schedule Visit & Admissions CTA */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 text-amber-300">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'সরাসরি আমাদের ক্যাম্পাস পরিদর্শন করুন' : 'Schedule a Personal Campus Visit'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ। যেকোনো কার্যদিবসে সকাল ৮:০০ থেকে দুপুর ২:০০ পর্যন্ত আমাদের ক্যাম্পাস ঘুরে দেখার জন্য আমন্ত্রণ রইল।'
                : 'Visit us at Salauddin Complex, Aona Bazar, Nawabganj, Dhaka. Campus tours and admissions consultations are welcome Sunday–Thursday (8:00 AM – 2:00 PM).'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
              >
                <span>{isBn ? 'সফর নির্ধারণ করুন' : 'Schedule a Visit'}</span>
                <Calendar className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/admission"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'অনলাইন ভর্তি তথ্য' : 'Admission Guidelines'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
