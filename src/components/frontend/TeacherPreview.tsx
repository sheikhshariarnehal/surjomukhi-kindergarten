'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Teacher {
  id: string;
  name: string;
  designation: string;
  subjects: string[];
  photo: string;
  experience: string;
  education: string;
}

const teachersData: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    designation: 'Senior Mathematics Teacher',
    subjects: ['Mathematics', 'Statistics'],
    photo: '/teachers/emily-chen.jpg',
    experience: '12 Years',
    education: 'PhD in Mathematics'
  },
  {
    id: '2',
    name: 'Mr. James Wilson',
    designation: 'English Literature Teacher',
    subjects: ['English', 'Literature'],
    photo: '/teachers/james-wilson.jpg',
    experience: '8 Years',
    education: 'MA in English Literature'
  },
  {
    id: '3',
    name: 'Ms. Sarah Ahmed',
    designation: 'Science Department Head',
    subjects: ['Physics', 'Chemistry'],
    photo: '/teachers/sarah-ahmed.jpg',
    experience: '15 Years',
    education: 'MSc in Applied Physics'
  },
  {
    id: '4',
    name: 'Mr. David Brown',
    designation: 'Computer Science Teacher',
    subjects: ['Computer Science', 'ICT'],
    photo: '/teachers/david-brown.jpg',
    experience: '6 Years',
    education: 'BSc in Computer Science'
  }
];

export default function TeacherPreview() {
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
            Meet Our Dedicated Teachers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced and qualified faculty members are committed to providing excellent education and guidance to our students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachersData.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Photo Section */}
              <div className="relative">
                <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Experience badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {teacher.experience}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{teacher.designation}</p>
                
                {/* Education */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    {teacher.education}
                  </div>
                </div>

                {/* Subjects */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <Link
                  href={`/teachers/${teacher.id}`}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center block"
                >
                  View Profile
                </Link>
              </div>

              {/* Decorative bottom border */}
              <div className="h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"></div>
            </motion.div>
          ))}
        </div>

        {/* View All Teachers Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Discover Our Complete Faculty
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our school is proud to have a team of highly qualified and experienced teachers who are passionate about education and dedicated to student success.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">25+</div>
                <div className="text-gray-600">Qualified Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-2">15+</div>
                <div className="text-gray-600">Years Average Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">100%</div>
                <div className="text-gray-600">Degree Holders</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/teachers"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                View All Teachers
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/academic"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
              >
                Academic Programs
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
