'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  Quote,
  History,
  Users
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function FoundersPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const founderData = {
    name: isBn ? 'শেখ ইমরান মাহমুদ' : 'Sheikh Imran Mahmud',
    title: isBn ? 'প্রতিষ্ঠাতা ও স্বত্বাধিকারী' : 'Founder & Proprietor',
    organization: isBn ? 'সূর্যমুখী কিন্ডারগার্টেন' : 'Surjomukhi Kindergarten',
    image: '/images/SheikhImranMahmud.png',
    bio: isBn
      ? 'শেখ ইমরান মাহমুদ সূর্যমুখী কিন্ডারগার্টেনের মূল উদ্যোক্তা ও প্রতিষ্ঠাতা। ২০০৪ সালের ০১ জানুয়ারি নবাবগঞ্জের আওনা বাজারে এই শিক্ষা প্রতিষ্ঠানটি প্রতিষ্ঠা করার পর থেকে তিনি নিবেদিতভাবে এর সার্বিক বিকাশ ও পরিচালনায় নেতৃত্ব দিয়ে আসছেন। তাঁর দিকনির্দেশনায় প্রতিষ্ঠানটি নবাবগঞ্জ অঞ্চলের শিশুদের মাঝে মানসম্পন্ন বাংলা মাধ্যম শিক্ষা, নৈতিক মূল্যবোধ ও সৃজনশীল মেধা বিকাশে এক অনন্য আস্থা অর্জন করেছে।'
      : 'Sheikh Imran Mahmud is the founder, chief initiator, and proprietor of Surjomukhi Kindergarten. Since establishing the institution on January 1, 2004, at Aona Bazar in Nawabganj, Dhaka, he has steered its vision with steadfast commitment. Under his leadership, the school has earned trusted community reverence by providing holistic Bangla medium education, ethical character formation, and creative development from Nursery through Grade 5.',
    vision: isBn
      ? 'শিক্ষাই জাতির মেরুদণ্ড—এই মূলমন্ত্রকে ধারণ করে প্রতিটি শিশুর অন্তরে মানবিক মূল্যবোধ, শান্তি ও প্রগতির চেতনা জাগ্রত করা এবং মানসম্পন্ন শিক্ষার মাধ্যমে একটি আলোকিত সমাজ গঠন করাই আমাদের মূল ব্রত।'
      : 'Embodying the conviction that education is the backbone of the nation, our mission is to awaken moral values, peace, and progress in every child, building an enlightened society through quality primary education.',
    contacts: [
      {
        icon: <Phone className="w-4 h-4 text-blue-600" />,
        label: isBn ? 'মোবাইল' : 'Phone',
        value: '01819198965',
        href: 'tel:01819198965'
      },
      {
        icon: <Mail className="w-4 h-4 text-blue-600" />,
        label: isBn ? 'ইমেইল' : 'Email',
        value: 'imransirkp@gmail.com',
        href: 'mailto:imransirkp@gmail.com'
      },
      {
        icon: <MapPin className="w-4 h-4 text-blue-600" />,
        label: isBn ? 'ক্যাম্পাস' : 'Location',
        value: isBn ? 'সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ' : 'Salauddin Complex, Aona Bazar, Nawabganj',
        href: '/contact'
      }
    ]
  };

  const ideals = [
    {
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      title: isBn ? 'শিক্ষাই জাতির মেরুদণ্ড' : 'Education is the Backbone of the Nation',
      description: isBn
        ? 'মানসম্পন্ন ও যুগোপযোগী প্রাথমিক শিক্ষার মাধ্যমে শিশুর মেধা ও সুনাগরিক গুণাবলীর সর্বোচ্চ বিকাশ সাধন।'
        : 'Fostering excellence and responsible civic character as the foundational bedrock of society through quality learning.'
    },
    {
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      title: isBn ? 'শান্তিই পরম ধর্ম' : 'Peace is the Supreme Virtue',
      description: isBn
        ? 'পারস্পরিক সম্প্রীতি, শৃঙ্খলা, পরোপকার ও নৈতিক মূল্যবোধে প্রতিটি শিশুকে অনুপ্রাণিত করা।'
        : 'Instilling empathy, discipline, mutual respect, and ethical harmony from early childhood.'
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
              {isBn ? 'আমাদের প্রতিষ্ঠাতা ও দূরদর্শিতা' : 'Our Founders & Vision'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              {isBn
                ? '২০০৪ সালে সূর্যমুখী কিন্ডারগার্টেন প্রতিষ্ঠার পেছনের দূরদর্শী নেতৃত্ব এবং মূল্যবোধভিত্তিক শিক্ষার মূল রূপকার।'
                : 'Honoring the visionary leadership and founding dedication that established Surjomukhi Kindergarten in 2004.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-3xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tabular-nums">2004</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'প্রতিষ্ঠার বছর' : 'Year Founded'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {isBn ? 'নবাবগঞ্জ' : 'Nawabganj'}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'ঢাকা-১৩২০' : 'Dhaka, Bangladesh'}
                </div>
              </div>
              <div className="p-3 col-span-2 md:col-span-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {isBn ? 'প্লে - ৫ম' : 'Play – 5'}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'প্রাথমিক শিক্ষা' : 'Primary Education'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Founder Showcase Profile */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.article 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden"
          itemScope
          itemType="https://schema.org/Person"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-start">
            {/* Left Column: Portrait & Title */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden bg-slate-100 border border-gray-200/80 shadow-xs mb-5">
                <Image
                  src={founderData.image}
                  alt={founderData.name}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                  itemProp="image"
                />
              </div>

              <h2 
                className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight"
                itemProp="name"
              >
                {founderData.name}
              </h2>
              <div 
                className="inline-flex items-center px-3.5 py-1 bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold rounded-full mt-2"
                itemProp="jobTitle"
              >
                {founderData.title}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1" itemProp="worksFor">
                {founderData.organization}
              </p>

              {/* Direct Contact Links */}
              <div className="w-full max-w-sm mt-6 pt-6 border-t border-gray-100 space-y-2.5 text-left">
                {founderData.contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.href}
                    className="flex items-center text-xs sm:text-sm text-gray-700 hover:text-blue-600 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      {contact.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        {contact.label}
                      </div>
                      <div className="font-medium text-gray-900 truncate">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Narrative & Vision */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
                  {isBn ? 'পটভূমি ও অবদান' : 'Leadership & Dedication'}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-4">
                  {isBn ? 'প্রতিষ্ঠাতার পরিচিতি ও শিক্ষা দর্শন' : 'Founding Journey & Philosophy'}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6" itemProp="description">
                  {founderData.bio}
                </p>

                {/* Vision Quote Box */}
                <div className="relative bg-blue-50/50 border-l-[3px] border-blue-600 rounded-r-2xl p-6 mb-6">
                  <Quote className="w-8 h-8 text-blue-200 absolute top-4 right-4 opacity-50" />
                  <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
                    {isBn ? 'প্রতিষ্ঠাতার দূরদর্শিতা (Founder’s Vision)' : 'Founder’s Vision Statement'}
                  </div>
                  <blockquote className="text-sm sm:text-base text-gray-800 leading-relaxed italic relative z-10">
                    &quot;{founderData.vision}&quot;
                  </blockquote>
                </div>
              </div>

              {/* Related Navigation Links */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/about/history"
                  className="inline-flex items-center text-xs sm:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <History className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{isBn ? 'আমাদের ইতিহাস দেখুন' : 'Explore Our History'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
                <Link
                  href="/about/principals"
                  className="inline-flex items-center text-xs sm:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{isBn ? 'অধ্যক্ষ ও শিক্ষকমণ্ডলী' : 'Principals & Faculty'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </motion.article>
      </section>

      {/* 3. Founding Ideals Section */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
              {isBn ? 'প্রতিষ্ঠার মূল আদর্শসমূহ' : 'Our Founding Ideals'}
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              {isBn
                ? 'যে মৌলিক মূল্যবোধ ও আদর্শের ওপর ভিত্তি করে প্রতিষ্ঠানটি পরিচালিত হচ্ছে।'
                : 'The foundational principles that guide our institutional mission and academic practice.'}
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

          {/* Admission CTA Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-md">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'সূর্যমুখী কিন্ডারগার্টেনের সাথে যুক্ত হোন' : 'Join the Surjomukhi Educational Family'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'মানসম্মত শিক্ষা ও মানবিক মূল্যবোধে আপনার সন্তানের উজ্জ্বল ভবিষ্যত গঠনে আজই যোগাযোগ করুন।'
                : 'Enroll your child or contact our administration to learn more about our admissions process.'}
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
  );
}
