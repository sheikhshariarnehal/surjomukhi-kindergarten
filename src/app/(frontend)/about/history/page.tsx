'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Heart, 
  Calendar, 
  Award, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  Users,
  Compass
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function HistoryPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const milestones = [
    {
      year: '2004',
      badge: isBn ? 'প্রতিষ্ঠা ও যাত্রা শুরু' : 'Founding & Inception',
      title: isBn ? '০১ জানুয়ারি ২০০৪: স্কুলের সূচনা' : 'January 1, 2004: School Inception',
      description: isBn
        ? 'ঢাকা জেলার নবাবগঞ্জ উপজেলার আওনা বাজার সংলগ্ন সালাউদ্দিন কমপ্লেক্সে শেখ ইমরান মাহমুদের উদ্যোগে সূর্যমুখী কিন্ডারগার্টেনের আনুষ্ঠানিক যাত্রা শুরু। প্লে গ্রুপ হতে ৫ম শ্রেণী পর্যন্ত শিশুদের মানসম্মত প্রাথমিক শিক্ষার পথ উন্মোচিত হয়।'
        : 'Surjomukhi Kindergarten officially opened its doors at Salauddin Complex, Aona Bazar, Nawabganj, Dhaka under the leadership of founder Sheikh Imran Mahmud, providing foundational education from Play to Grade 5.'
    },
    {
      year: '2010',
      badge: isBn ? 'একাডেমিক আধুনিকায়ন' : 'Academic Enrichment',
      title: isBn ? 'পাঠ্যক্রম ও সহ-শিক্ষা কার্যক্রম সম্প্রসারণ' : 'Curriculum & Co-Curricular Expansion',
      description: isBn
        ? 'জাতীয় পাঠ্যক্রমের সঙ্গে আধুনিক শিশুতোষ শিক্ষা উপকরণ, হাতের লেখা প্রতিযোগিতা, চিত্রাঙ্কন ও সাংস্কৃতিক উৎসবকে নিয়মিত পাঠ্যসূচির অবিচ্ছেদ্য অংশ হিসেবে অন্তর্ভুক্ত করা হয়।'
        : 'Integration of modern audio-visual teaching aids, annual cultural exhibitions, sports tournaments, and art recitation competitions alongside national curriculum standards.'
    },
    {
      year: '2018',
      badge: isBn ? 'ক্যাম্পাস ও পরিবেশ উন্নয়ন' : 'Campus Infrastructure',
      title: isBn ? 'পাঠাগার ও শিশুবান্ধব পরিবেশ সুসংগঠিতকরণ' : 'Library & Child-Safe Campus Development',
      description: isBn
        ? 'প্রায় ১০০ গজ × ৬০ গজ খেলার মাঠ, সমৃদ্ধ শিশু পাঠাগার এবং ৫ সদস্যবিশিষ্ট যৌন হয়রানি বিরোধী ও সার্বিক নিরাপত্তা কমিটি গঠনের মাধ্যমে শিশুদের সুরক্ষিত বিকাশ নিশ্চিত করা হয়।'
        : 'Dedicated safety oversight, expansion of the 100 × 60 yard playground, and establishment of a dedicated children’s reading library promoting early literacy.'
    },
    {
      year: 'Present',
      badge: isBn ? '২০+ বছরের গৌরবময় ঐতিহ্য' : '20+ Years of Excellence',
      title: isBn ? 'অভিভাবকদের বিশ্বস্ত আস্থা ও ভবিষ্যৎ রূপরেখা' : 'Community Trust & Continuous Progress',
      description: isBn
        ? 'দুই দশকেরও বেশি সময় ধরে নিরবচ্ছিন্নভাবে কয়েক শত সফল শিক্ষার্থী উপহার দিয়ে নবাবগঞ্জ অঞ্চলে প্রাথমিক শিক্ষার এক অনন্য মডেল হিসেবে স্বমহিমায় সমুজ্জ্বল।'
        : 'Two decades of uninterrupted educational service, nurturing confident, compassionate, and academically prepared primary graduates who excel in higher secondary tiers.'
    }
  ];

  const ideals = [
    {
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      title: isBn ? 'শিক্ষাই জাতির মেরুদণ্ড' : 'Education is the Backbone of the Nation',
      description: isBn
        ? 'মানসম্পন্ন শিক্ষার মাধ্যমে শিশুদের আত্মমর্যাদাশীল, নৈতিক ও আধুনিক সমাজের যোগ্য প্রতিনিধি হিসেবে গড়ে তোলা।'
        : 'Guiding learners through holistic instruction and character building to become enlightened contributors to society.'
    },
    {
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      title: isBn ? 'শান্তিই পরম ধর্ম' : 'Peace is the Supreme Virtue',
      description: isBn
        ? 'পারস্পরিক সহমর্মিতা, সেবা ও শান্তির পরিবেশে শিশুদের সংবেদনশীল ও মানবিক মূল্যবোধে উদ্দীপিত করা।'
        : 'Fostering empathetic, harmonious, and service-oriented young minds within a peaceful school community.'
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
              {isBn ? 'আমাদের ইতিহাস ও অগ্রযাত্রার গল্প' : 'Our History & Milestones'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? '২০০৪ সালে সূচনার পর থেকে দুই দশকেরও বেশি সময় ধরে নবাবগঞ্জ, ঢাকায় মানসম্মত প্রাথমিক শিক্ষা ও মানবিক মূল্যবোধ বিকাশের এক গৌরবময় ঐতিহ্য।'
                : 'A distinguished journey of over two decades dedicated to primary education, character building, and community trust in Nawabganj, Dhaka since 2004.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">2004</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'প্রতিষ্ঠাকাল' : 'Founded'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">20+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'বছরের অভিজ্ঞতা' : 'Years Excellence'}
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

      {/* 2. Foundational Narrative */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-4">
              {isBn ? 'যেভাবে শুরু হয়েছিল আমাদের যাত্রা' : 'The Inception of Surjomukhi'}
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6" />
          </div>

          <div className="space-y-5 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              {isBn
                ? '২০০৪ সালের ১ জানুয়ারি ঢাকা জেলার নবাবগঞ্জ উপজেলার ঐতিহ্যবাহী আওনা বাজার সংলগ্ন সালাউদ্দিন কমপ্লেক্সে প্রতিষ্ঠিত হয় সূর্যমুখী কিন্ডারগার্টেন। প্রতিষ্ঠানটির মূল লক্ষ্য ছিল প্রত্যন্ত এবং উন্নয়নশীল এলাকার শিশুদের জন্য মানসম্মত, আধুনিক ও মূল্যবোধভিত্তিক শিক্ষার দ্বার উন্মোচন করা।'
                : 'Surjomukhi Kindergarten was founded on January 1, 2004, situated in Salauddin Complex at Aona Bazar in Nawabganj, Dhaka. The founding vision was to make high-quality, creative, and values-centered primary education accessible to families throughout the region.'}
            </p>
            <p>
              {isBn
                ? 'একটি আদর্শ প্রাথমিক বিদ্যালয় হিসেবে প্রতিষ্ঠানটি প্লে গ্রুপ, নার্সারি থেকে শুরু করে ৫ম শ্রেণী পর্যন্ত অত্যন্ত যত্ন সহকারে শিক্ষার্থীদের পাঠদান পরিচালনা করে আসছে। পাঠ্যবইয়ের শিক্ষার পাশাপাশি খেলাধুলা, সাংস্কৃতিক চর্চা, শৃঙ্খলা ও নৈতিক চরিত্রের সুসমন্বয়ই আমাদের অগ্রযাত্রার মূল ভিত্তি।'
                : 'Operating as a dedicated primary educational institution from Play Group through Grade 5, the school balances standard curriculum with sports, creative arts, disciplined habits, and character development under close teacher mentorship.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Chronological Milestone Timeline */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
              {isBn ? 'প্রাতিষ্ঠানিক অগ্রযাত্রার মাইলফলক' : 'Key Milestones Along Our Journey'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? 'প্রতিষ্ঠা থেকে বর্তমান পর্যন্ত আমাদের ধারাবাহিক বিকাশ ও উন্নয়নের স্মরণীয় অধ্যায়সমূহ।'
                : 'A chronological timeline tracing our institutional growth, improvements, and community impact.'}
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10 sm:space-y-12">
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Timeline Dot optically centered with year row */}
                <div className="absolute -left-[33px] sm:-left-[49px] top-7 sm:top-9 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 shadow-xs group-hover:scale-125 transition-transform" />

                {/* Card Body */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs hover:border-gray-200 hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-lg sm:text-xl font-extrabold text-blue-600 tabular-nums">
                      {item.year}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Founding Ideals Section */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
              {isBn ? 'প্রতিষ্ঠার মৌলিক আদর্শ' : 'Founding Ideals & Guiding Philosophy'}
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              {isBn
                ? 'যে চিরন্তন আদর্শের ওপর ভিত্তি করে সূর্যমুখী কিন্ডারগার্টেন পরিচালিত হয়।'
                : 'The foundational philosophy and core principles that continue to inspire our institutional work.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
            {ideals.map((ideal, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl border border-gray-100 bg-slate-50/60 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-xs">
                  {ideal.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                  {ideal.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {ideal.description}
                </p>
              </div>
            ))}
          </div>

          {/* Related Links & Admission CTA */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-md">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'আমাদের শিক্ষা পরিবারের সাথে যুক্ত হোন' : 'Join Our Educational Legacy'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'প্লে গ্রুপ হতে ৫ম শ্রেণীতে মানসম্মত ও আনন্দময় শিক্ষার জন্য আজই ভর্তি সংক্রান্ত তথ্য জানুন।'
                : 'Admissions are open for Nursery through Grade 5. Contact our administration or apply online.'}
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
                href="/about/founders"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'প্রতিষ্ঠাতাবৃন্দ দেখুন' : 'Meet Our Founders'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
