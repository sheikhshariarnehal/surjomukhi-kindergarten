'use client';

import React from 'react';
import Head from 'next/head';
import { useTranslation } from '@/contexts/LanguageContext';

export default function PrincipalsPage() {
  const { language } = useTranslation();

  const principals = [
    {
      name: language === 'bn' ? 'বে\'লাল ইমরান মাহমুদ' : 'Belal Imran Mahmud',
      position: language === 'bn' ? 'প্রতিষ্ঠাতা ও পরিচালক' : 'Founder & Director',
      experience: language === 'bn' ? '২০+ বছর' : '20+ Years',
      education: language === 'bn' ? 'শিক্ষাবিদ' : 'Educational Leader',
      specialization: language === 'bn' ? 'প্রাথমিক শিক্ষা ব্যবস্থাপনা' : 'Early Childhood Education Management',
      role: language === 'bn' ? 'প্রতিষ্ঠাতা ও প্রধান উদ্যোক্তা' : 'Founder and main initiator',
      description: language === 'bn'
        ? 'সূর্যমুখী কিন্ডারগার্টেনের প্রতিষ্ঠাতা ও প্রধান উদ্যোক্তা। তিনি প্রতিষ্ঠানের পরিচালনা ও সকল সরকারি আবেদনে স্বাক্ষরদাতা হিসেবে দায়িত্ব পালন করেন।'
        : 'Founder and main initiator of Surjomukhi Kindergarten. He manages the institution and signs official applications as proprietor or director.',
      achievements: [
        language === 'bn' ? 'সূর্যমুখী কিন্ডারগার্টেন প্রতিষ্ঠা' : 'Established Surjomukhi Kindergarten',
        language === 'bn' ? '২০+ বছরের শিক্ষা অভিজ্ঞতা' : '20+ years of educational experience',
        language === 'bn' ? 'মানসম্পন্ন শিক্ষা প্রদান' : 'Quality education delivery',
        language === 'bn' ? 'শিক্ষাক্ষেত্রে উৎকর্ষতা' : 'Excellence in education sector'
      ],
      responsibilities: [
        language === 'bn' ? 'প্রতিষ্ঠান পরিচালনা' : 'Institution management',
        language === 'bn' ? 'সরকারি আবেদন স্বাক্ষর' : 'Official application signing',
        language === 'bn' ? 'নীতি নির্ধারণ' : 'Policy formulation',
        language === 'bn' ? 'কৌশলগত পরিকল্পনা' : 'Strategic planning'
      ],
      philosophy: language === 'bn'
        ? 'শিক্ষাই জাতির মেরুদণ্ড - মানসম্পন্ন শিক্ষার মাধ্যমে জাতি গঠনের ভিত্তি স্থাপন করা।'
        : 'Education is the backbone of the nation - establishing the foundation of nation building through quality education.',
      contact: '01819198965'
    },
    {
      name: language === 'bn' ? 'প্রধান শিক্ষক' : 'Head Teacher',
      position: language === 'bn' ? 'প্রধান শিক্ষক ও সদস্য-সচিব' : 'Head Teacher & Member-Secretary',
      experience: language === 'bn' ? 'অভিজ্ঞ শিক্ষাবিদ' : 'Experienced Educator',
      education: language === 'bn' ? 'শিক্ষাবিদ' : 'Professional Educator',
      specialization: language === 'bn' ? 'শিক্ষা প্রশাসন' : 'Educational Administration',
      role: language === 'bn' ? 'শিক্ষা প্রশাসন ও পরিচালনা' : 'Educational administration and management',
      description: language === 'bn'
        ? 'প্রধান শিক্ষক প্রতিষ্ঠানের শিক্ষাগত ও প্রশাসনিক শৃঙ্খলা বজায় রাখেন, শিক্ষক ও কর্মচারীদের তত্ত্বাবধান করেন এবং পরীক্ষা প্রক্রিয়া নিয়ন্ত্রণ করেন।'
        : 'The Head Teacher maintains academic and administrative discipline, supervises teachers and staff, and controls the examination process.',
      achievements: [
        language === 'bn' ? 'শিক্ষাগত উৎকর্ষতা নিশ্চিতকরণ' : 'Ensuring educational excellence',
        language === 'bn' ? 'শিক্ষক উন্নয়ন কর্মসূচি' : 'Teacher development programs',
        language === 'bn' ? 'শৃঙ্খলা ও নিয়মানুবর্তিতা' : 'Discipline and regularity',
        language === 'bn' ? 'পরীক্ষা ব্যবস্থাপনা' : 'Examination management'
      ],
      responsibilities: [
        language === 'bn' ? 'শিক্ষাগত ও প্রশাসনিক শৃঙ্খলা রক্ষা' : 'Academic and administrative discipline',
        language === 'bn' ? 'শিক্ষক ও কর্মচারী তত্ত্বাবধান' : 'Teacher and staff supervision',
        language === 'bn' ? 'ক্লাস রুটিন নিয়ন্ত্রণ' : 'Class routine control',
        language === 'bn' ? 'পরীক্ষা প্রক্রিয়া ও ফলাফল প্রকাশ' : 'Exam process and result publication'
      ],
      philosophy: language === 'bn'
        ? 'সেবা পরম ধর্ম - শিক্ষার মাধ্যমে সেবাপরায়ণ নাগরিক গড়ে তোলা।'
        : 'Service is the supreme virtue - nurturing service-minded citizens through education.',
      contact: '01711528045'
    }
  ];

  const managingCommittee = [
    {
      position: language === 'bn' ? 'সভাপতি' : 'President',
      role: language === 'bn' ? 'প্রতিষ্ঠাতা/পৃষ্ঠপোষক থেকে' : 'From founders/patrons',
      responsibilities: language === 'bn' ? 'কমিটির নেতৃত্ব, ভাউচার সহ-স্বাক্ষর' : 'Committee leadership, voucher co-signing'
    },
    {
      position: language === 'bn' ? 'প্রধান শিক্ষক' : 'Head Teacher',
      role: language === 'bn' ? 'সদস্য-সচিব' : 'Member-secretary',
      responsibilities: language === 'bn' ? 'প্রধান কমিটির সদস্য-সচিব' : 'Member-secretary of key committees'
    },
    {
      position: language === 'bn' ? 'শিক্ষক প্রতিনিধি' : 'Teacher Representative',
      role: language === 'bn' ? 'নির্বাচিত (১ জন)' : 'Elected (1 member)',
      responsibilities: language === 'bn' ? 'শিক্ষকদের প্রতিনিধিত্ব' : 'Teacher representation'
    },
    {
      position: language === 'bn' ? 'অভিভাবক প্রতিনিধি' : 'Guardian Representatives',
      role: language === 'bn' ? '২ জন (১ পুরুষ, ১ মহিলা)' : '2 members (1 male, 1 female)',
      responsibilities: language === 'bn' ? 'অভিভাবকদের প্রতিনিধিত্ব' : 'Guardian representation'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <a href="/about" className="text-gray-500 hover:text-gray-700">About</a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">Our Principals</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Educational Leaders
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Meet the dedicated principals who guide our institution with vision, experience, and unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Leadership Message
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Surjomukhi Kindergarten, our leadership team is committed to providing an exceptional 
                educational experience for every child. We believe that strong leadership is the foundation 
                of a successful educational institution.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our principals bring together decades of experience in early childhood education, 
                combining traditional values with modern teaching methodologies to create an environment 
                where children can thrive academically, socially, and emotionally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principals Profiles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {principals.map((principal, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                {/* Photo */}
                <div className="lg:w-1/3">
                  <div className="w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">{principal.name}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="lg:w-2/3">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {principal.name}
                      </h3>
                      <p className="text-xl text-indigo-600 font-medium mb-4">{principal.position}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <span className="font-semibold text-gray-700">Experience:</span>
                          <span className="ml-2 text-gray-600">{principal.experience}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Education:</span>
                          <span className="ml-2 text-gray-600">{principal.education}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-semibold text-gray-700">Specialization:</span>
                          <span className="ml-2 text-gray-600">{principal.specialization}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{principal.description}</p>
                    
                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Achievements:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {principal.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-600 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Philosophy */}
                    <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-indigo-800 mb-2">Educational Philosophy:</h4>
                      <p className="text-indigo-700 italic">"{principal.philosophy}"</p>
                    </div>
                    
                    {/* Contact */}
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📧</span>
                      <a href={`mailto:${principal.contact}`} className="hover:text-indigo-600 transition-colors">
                        {principal.contact}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Leadership Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The core principles that guide our leadership approach and decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-indigo-50 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Vision</h3>
              <p className="text-gray-600 text-sm">Clear direction and purpose in all our educational initiatives</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600 text-sm">Working together with teachers, parents, and community</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Embracing new ideas and modern teaching methods</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Care</h3>
              <p className="text-gray-600 text-sm">Genuine concern for every child's wellbeing and success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Leadership */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connect with Our Leadership
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Have questions or want to discuss your child's education? Our principals are always available 
            to meet with parents and address any concerns.
          </p>
          <a
            href="/contact"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Schedule a Meeting
          </a>
        </div>
      </section>
    </div>
  );
}
