'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  InformationCircleIcon, 
  DocumentTextIcon, 
  PhotoIcon,
  PhoneIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const HomeInternalLinks = () => {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const internalLinks = [
    {
      titleEn: 'About Us',
      titleBn: 'আমাদের সম্পর্কে',
      href: '/about',
      descriptionEn: 'Learn about our history and mission since 2004.',
      descriptionBn: '২০০৪ সাল থেকে আমাদের সমৃদ্ধ ইতিহাস, লক্ষ্য ও শিক্ষাদর্শন জানুন।',
      icon: <InformationCircleIcon className="w-6 h-6 text-blue-700" />,
      bgClass: 'bg-blue-50',
    },
    {
      titleEn: 'Admissions',
      titleBn: 'ভর্তি তথ্য ও আবেদন',
      href: '/admission',
      descriptionEn: 'Find out how to join our school family.',
      descriptionBn: '২০২৫ শিক্ষাবর্ষে সীমিত আসনে ভর্তির নিয়ম ও অনলাইন আবেদন প্রক্রিয়া।',
      icon: <DocumentTextIcon className="w-6 h-6 text-amber-700" />,
      bgClass: 'bg-amber-50',
    },
    {
      titleEn: 'Academic',
      titleBn: 'একাডেমিক কার্যক্রম',
      href: '/academic',
      descriptionEn: 'Explore our curriculum and teaching approach.',
      descriptionBn: 'জাতীয় শিক্ষাক্রম, শ্রেণির রূপরেখা, সিলেবাস ও পাঠদান পরিকল্পনা।',
      icon: <AcademicCapIcon className="w-6 h-6 text-indigo-700" />,
      bgClass: 'bg-indigo-50',
    },
    {
      titleEn: 'Teachers',
      titleBn: 'শিক্ষকমণ্ডলী',
      href: '/teachers',
      descriptionEn: 'Meet our dedicated team of educators.',
      descriptionBn: 'আমাদের অভিজ্ঞ, প্রশিক্ষণপ্রাপ্ত ও স্নেহময় শিক্ষক পরিচিতি।',
      icon: <UserGroupIcon className="w-6 h-6 text-emerald-700" />,
      bgClass: 'bg-emerald-50',
    },
    {
      titleEn: 'Gallery',
      titleBn: 'ফটো গ্যালারি',
      href: '/gallery',
      descriptionEn: 'Browse through our school events and memories.',
      descriptionBn: 'বিদ্যালয়ের বিভিন্ন উৎসব, ক্রীড়া ও আনন্দঘন স্মৃতির চিত্রশালা।',
      icon: <PhotoIcon className="w-6 h-6 text-orange-700" />,
      bgClass: 'bg-orange-50',
    },
    {
      titleEn: 'Contact Us',
      titleBn: 'যোগাযোগ ও হেল্পডেস্ক',
      href: '/contact',
      descriptionEn: 'Get in touch with us for any inquiries.',
      descriptionBn: 'ক্যাম্পাস ঠিকানা, হটলাইন নম্বর ও সরাসরি যোগাযোগের মাধ্যম।',
      icon: <PhoneIcon className="w-6 h-6 text-slate-700" />,
      bgClass: 'bg-slate-100',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden" id="explore-sections">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight"
          >
            {isBn ? 'সূর্যমুখী কিন্ডারগার্টেন এক্সপ্লোর করুন' : 'Explore Surjomukhi Kindergarten'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {isBn 
              ? 'শিক্ষার্থী, অভিভাবক ও শুভানুধ্যায়ীদের জন্য আমাদের মূল বিভাগ ও প্রয়োজনীয় তথ্যভাণ্ডার।'
              : 'Quick access to our main sections and resources for students, parents, and visitors.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {internalLinks.map((link, index) => (
            <motion.div
              key={link.titleEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link 
                href={link.href}
                className="group flex items-start p-6 sm:p-7 rounded-2xl border border-gray-100 bg-white hover:bg-slate-50/60 shadow-xs hover:shadow-md hover:border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-300 h-full touch-manipulation active:scale-[0.99]"
              >
                <div className={`${link.bgClass} p-3 rounded-xl mr-4 group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {isBn ? link.titleBn : link.titleEn}
                    </h3>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {isBn ? link.descriptionBn : link.descriptionEn}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeInternalLinks;
