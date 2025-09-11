'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  category: 'news' | 'event';
  type?: string;
}

const newsEventsData: NewsItem[] = [
  {
    id: '1',
    title: 'Annual Science Fair 2024',
    excerpt: 'Students showcase innovative projects and scientific discoveries in our biggest science fair yet.',
    date: '2024-02-15',
    thumbnail: '/news/science-fair.jpg',
    category: 'event',
    type: 'Academic Event'
  },
  {
    id: '2',
    title: 'Students Excel in National Mathematics Olympiad',
    excerpt: 'Our students secured top positions in the National Mathematics Olympiad, bringing pride to our institution.',
    date: '2024-01-20',
    thumbnail: '/news/math-olympiad.jpg',
    category: 'news',
    type: 'Achievement'
  },
  {
    id: '3',
    title: 'Cultural Week Celebration',
    excerpt: 'A week-long celebration of arts, culture, and traditions featuring performances by our talented students.',
    date: '2024-02-28',
    thumbnail: '/news/cultural-week.jpg',
    category: 'event',
    type: 'Cultural Event'
  },
  {
    id: '4',
    title: 'New Computer Lab Inauguration',
    excerpt: 'State-of-the-art computer laboratory equipped with latest technology to enhance digital learning.',
    date: '2024-01-15',
    thumbnail: '/news/computer-lab.jpg',
    category: 'news',
    type: 'Infrastructure'
  },
  {
    id: '5',
    title: 'Inter-School Sports Championship',
    excerpt: 'Annual sports championship bringing together schools from across the region for friendly competition.',
    date: '2024-03-10',
    thumbnail: '/news/sports-championship.jpg',
    category: 'event',
    type: 'Sports Event'
  },
  {
    id: '6',
    title: 'Teacher Training Workshop Success',
    excerpt: 'Professional development workshop enhances teaching methodologies and educational practices.',
    date: '2024-01-25',
    thumbnail: '/news/teacher-training.jpg',
    category: 'news',
    type: 'Professional Development'
  }
];

export default function NewsEventsPreview() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const newsItems = newsEventsData.filter(item => item.category === 'news').slice(0, 3);
  const eventItems = newsEventsData.filter(item => item.category === 'event').slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest News & Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest happenings and upcoming events at our school.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* News Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Latest News
              </h3>
              <Link
                href="/news"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                View All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-primary-600 flex-shrink-0"></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center mb-2">
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
                        {item.type}
                      </span>
                      <span className="text-sm text-gray-500 ml-3">{formatDate(item.date)}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-3 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                </svg>
                Upcoming Events
              </h3>
              <Link
                href="/events"
                className="text-secondary-600 hover:text-secondary-700 font-medium flex items-center"
              >
                View All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="space-y-6">
              {eventItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-secondary-400 to-secondary-600 flex-shrink-0"></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center mb-2">
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-800 text-xs font-medium rounded">
                        {item.type}
                      </span>
                      <span className="text-sm text-gray-500 ml-3">{formatDate(item.date)}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Event Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Don&apos;t Miss Our Next Big Event!</h3>
                <p className="text-primary-100 text-lg">
                  Annual Science Fair 2024 - February 15th, 2024
                </p>
                <p className="text-primary-200 mt-2">
                  Join us for an exciting showcase of student innovation and scientific discovery.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/events/science-fair-2024"
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Learn More
                </Link>
                <Link
                  href="/events"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-center"
                >
                  All Events
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
