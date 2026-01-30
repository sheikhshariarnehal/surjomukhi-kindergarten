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
      icon: <InformationCircleIcon className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      shadowColor: 'shadow-blue-500/20',
    },
    {
      title: t('Admissions'),
      href: '/admission',
      description: 'Find out how to join our school family.',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700',
      shadowColor: 'shadow-emerald-500/20',
    },
    {
      title: t('Academic'),
      href: '/academic',
      description: 'Explore our curriculum and teaching approach.',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      shadowColor: 'shadow-purple-500/20',
    },
    {
      title: t('Teachers'),
      href: '/teachers',
      description: 'Meet our dedicated team of educators.',
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700',
      shadowColor: 'shadow-orange-500/20',
    },
    {
      title: t('Gallery'),
      href: '/gallery',
      description: 'Browse through our school events and memories.',
      icon: <PhotoIcon className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      hoverColor: 'hover:from-pink-600 hover:to-pink-700',
      shadowColor: 'shadow-pink-500/20',
    },
    {
      title: t('Contact Us'),
      href: '/contact',
      description: 'Get in touch with us for any inquiries.',
      icon: <PhoneIcon className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      hoverColor: 'hover:from-teal-600 hover:to-teal-700',
      shadowColor: 'shadow-teal-500/20',
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
        <div className="text-center mb-12 sm:mb-16">
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Quick Navigation
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Explore Surjomukhi Kindergarten
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Quick access to our main sections and resources for students, parents, and visitors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {internalLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <Link 
                href={link.href}
                className={`group flex items-start p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white hover:bg-gray-50/50 hover:shadow-2xl ${link.shadowColor} hover:border-gray-200/80 transition-all duration-300 h-full touch-manipulation active:scale-[0.98]`}
              >
                <div className={`bg-gradient-to-br ${link.color} ${link.hoverColor} p-3.5 sm:p-4 rounded-xl sm:rounded-2xl text-white mr-4 sm:mr-5 group-hover:scale-110 group-active:scale-105 transition-all duration-300 shadow-lg ${link.shadowColor}`}>
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {link.title}
                    </h3>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
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
