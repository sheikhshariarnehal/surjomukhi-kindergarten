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
  PhoneIcon 
} from '@heroicons/react/24/outline';

const HomeInternalLinks = () => {
  const { t } = useTranslation();

  const internalLinks = [
    {
      title: t('About Us'),
      href: '/about',
      description: 'Learn about our history and mission since 2004.',
      icon: <InformationCircleIcon className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: t('Admissions'),
      href: '/admission',
      description: 'Find out how to join our school family.',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: t('Academic'),
      href: '/academic',
      description: 'Explore our curriculum and teaching approach.',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      title: t('Teachers'),
      href: '/teachers',
      description: 'Meet our dedicated team of educators.',
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: 'bg-orange-500',
    },
    {
      title: t('Gallery'),
      href: '/gallery',
      description: 'Browse through our school events and memories.',
      icon: <PhotoIcon className="w-6 h-6" />,
      color: 'bg-pink-500',
    },
    {
      title: t('Contact Us'),
      href: '/contact',
      description: 'Get in touch with us for any inquiries.',
      icon: <PhoneIcon className="w-6 h-6" />,
      color: 'bg-teal-500',
    },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden" id="explore-sections">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Explore Surjomukhi Kindergarten
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Quick access to our main sections and resources for students, parents, and visitors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internalLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={link.href}
                className="group flex items-start p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 h-full"
              >
                <div className={`${link.color} p-3 rounded-xl text-white mr-4 group-hover:scale-110 transition-transform`}>
                  {link.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
