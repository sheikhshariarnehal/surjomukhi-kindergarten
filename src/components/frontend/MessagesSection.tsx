'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MessageData {
  id: string;
  name: string;
  position: string;
  photo: string;
  message: string;
  signature?: string;
}

const messagesData: MessageData[] = [
  {
    id: 'headteacher',
    name: 'Dr. Sarah Johnson',
    position: 'Head Teacher',
    photo: '/messages/headteacher.jpg',
    message: 'Welcome to our esteemed institution where we nurture young minds and foster excellence in education. Our commitment to providing quality education and holistic development ensures that every student reaches their full potential. We believe in creating a supportive environment where learning is both engaging and meaningful.',
    signature: 'Dr. Sarah Johnson'
  },
  {
    id: 'chairman',
    name: 'Mr. David Wilson',
    position: 'Chairman, Governing Body',
    photo: '/messages/chairman.jpg',
    message: 'As Chairman of the Governing Body, I am proud of our school\'s achievements and dedication to educational excellence. We continue to invest in modern facilities, qualified teachers, and innovative programs to ensure our students receive the best possible education for their bright future.',
    signature: 'Mr. David Wilson'
  }
];

export default function MessagesSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Messages from Leadership
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Inspiring words from our educational leaders who guide our institution towards excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {messagesData.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-8">
                {/* Header with Photo and Info */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 rounded-full border-2 border-primary-200"></div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900">{message.name}</h3>
                    <p className="text-primary-600 font-medium">{message.position}</p>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="mb-4">
                  <svg className="w-8 h-8 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>

                {/* Message Content */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {message.message}
                  </p>
                </div>

                {/* Signature */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="text-gray-600 italic">Sincerely,</p>
                      <p className="font-semibold text-gray-900">{message.signature}</p>
                    </div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600"></div>
                  </div>
                </div>
              </div>

              {/* Decorative bottom border */}
              <div className="h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Educational Community
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Experience the difference that dedicated leadership and quality education can make in your child&apos;s future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/admission"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                aria-label="Apply for admission to Surjomukhi Kindergarten"
              >
                Apply for Admission
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="Learn more about Surjomukhi Kindergarten's mission, vision, and values"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
