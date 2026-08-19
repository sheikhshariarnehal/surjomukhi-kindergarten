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
  const { t } = useTranslation();

  const internalLinks = [
    {
      title: t('About Us'),
      href: '/about',
      description: 'Learn about our history and mission since 2004.',
      icon: <InformationCircleIcon className="w-6 h-6 text-blue-700" />,
      bgClass: 'bg-blue-50',
    },
    {
      title: t('Admissions'),
      href: '/admission',
      description: 'Find out how to join our school family.',
      icon: <DocumentTextIcon className="w-6 h-6 text-amber-700" />,
      bgClass: 'bg-amber-50',
    },
    {
      title: t('Academic'),
      href: '/academic',
      description: 'Explore our curriculum and teaching approach.',
      icon: <AcademicCapIcon className="w-6 h-6 text-indigo-700" />,
      bgClass: 'bg-indigo-50',
    },
    {
      title: t('Teachers'),
      href: '/teachers',
      description: 'Meet our dedicated team of educators.',
      icon: <UserGroupIcon className="w-6 h-6 text-emerald-700" />,
      bgClass: 'bg-emerald-50',
    },
    {
      title: t('Gallery'),
      href: '/gallery',
      description: 'Browse through our school events and memories.',
      icon: <PhotoIcon className="w-6 h-6 text-orange-700" />,
      bgClass: 'bg-orange-50',
    },
    {
      title: t('Contact Us'),
      href: '/contact',
      description: 'Get in touch with us for any inquiries.',
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
            Explore Surjomukhi Kindergarten
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Quick access to our main sections and resources for students, parents, and visitors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {internalLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link 
                href={link.href}
                className="group flex items-start p-6 sm:p-7 rounded-2xl border border-gray-100 bg-white hover:bg-slate-50/60 shadow-sm hover:shadow-md hover:border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-300 h-full touch-manipulation active:scale-[0.99]"
              >
                <div className={`${link.bgClass} p-3 rounded-xl mr-4 group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h3>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {link.description}
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
