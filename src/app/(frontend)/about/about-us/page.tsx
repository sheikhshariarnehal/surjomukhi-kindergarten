'use client';

import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function AboutUsPage() {
  const { t, language } = useTranslation();

  const contactInfo = [
    { label: language === 'bn' ? 'ঠিকানা' : 'Address', value: t('about.contact.address'), icon: '📍' },
    { label: language === 'bn' ? 'ফোন' : 'Phone', value: t('about.contact.phone'), icon: '📞' },
    { label: language === 'bn' ? 'ইমেইল' : 'Email', value: t('about.contact.email'), icon: '✉️' },
    { label: language === 'bn' ? 'ওয়েবসাইট' : 'Website', value: t('about.contact.website'), icon: '🌐' }
  ];

  const facilities = t('about.facilities.items', []);
  const governance = t('about.governance.structure', []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">{t('common.home')}</a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <a href="/about" className="text-gray-500 hover:text-gray-700 transition-colors">{t('common.about')}</a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{t('about.pages.aboutUs.title')}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('common.schoolName')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('about.pages.aboutUs.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-4 text-lg">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {language === 'bn' ? 'প্রতিষ্ঠিত ২০০৪' : 'Est. 2004'}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {language === 'bn' ? 'বাংলা মাধ্যম' : 'Bangla Medium'}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {language === 'bn' ? 'নার্সারি - ৫ম শ্রেণী' : 'Nursery - Grade 5'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Us
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Surjomukhi Kindergarten is a private primary educational institution established on
                01-01-2004 and located at Salauddin Complex, Aona Bazar, Nawabganj, Dhaka-1320.
                The school offers instruction in the Bangla medium from nursery up to Grade 5 and
                works to foster students' holistic development through creative and ethical education.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">🏫</span>
                  <span className="text-gray-700">Established: January 1, 2004</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">📚</span>
                  <span className="text-gray-700">Medium: Bangla</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">👶</span>
                  <span className="text-gray-700">Classes: Nursery to Grade 5</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">Our Ideals</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">💡</span>
                  <span className="text-blue-700">"Education is the backbone of the nation"</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">☮️</span>
                  <span className="text-blue-700">"Peace is the supreme virtue"</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">🤝</span>
                  <span className="text-blue-700">Spirit of unity and progress</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">🌱</span>
                  <span className="text-blue-700">Building a progressive society through creative education</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg border border-green-100">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <span className="mr-3">🎯</span>
                Our Mission
              </h3>
              <ul className="space-y-4 text-green-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>Bring modern education to people's doorsteps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>Nurture students' creativity, moral character, and human values</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>Create a comprehensive learning environment through literature, culture, and sports</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-100">
              <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <span className="mr-3">🌟</span>
                Our Vision
              </h3>
              <ul className="space-y-4 text-purple-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-3 mt-1">•</span>
                  <span>Become a reliable and model local institution</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-3 mt-1">•</span>
                  <span>Ensure participation of underserved groups and support meritorious students in need</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Academics & Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">📚</span>
                Academics
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Instruction is provided in Bangla medium from nursery to Grade 5. Class-wise student numbers are maintained with proper structure:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Pre-primary: 30 students
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Grade 1: 25 students
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Other grades: Structured enrollment
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🏛️</span>
                Governance
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  A seven-member governing/management body framework ensures proper administration:
                </p>
                <ul className="space-y-2 text-gray-600">
                  {governance.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive facilities to support holistic development of our students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>

          {/* Student Support */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
              <span className="mr-3">🎓</span>
              Student Support
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-3">📚</div>
                <h4 className="font-semibold text-gray-900 mb-2">Library</h4>
                <p className="text-gray-600">Establishing a library as resources allow</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h4 className="font-semibold text-gray-900 mb-2">Scholarships</h4>
                <p className="text-gray-600">Offering scholarships through organizational examinations</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🛡️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Safety Committee</h4>
                <p className="text-gray-600">Anti-Sexual Harassment Committee with five members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-xl text-gray-600">
              Get in touch with us for admissions and inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((contact, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg text-center border border-blue-100">
                <div className="text-3xl mb-3">{contact.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{contact.label}</h3>
                <p className="text-gray-600 text-sm">{contact.value}</p>
              </div>
            ))}
          </div>

          {/* Finance & Compliance */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
              <span className="mr-3">💰</span>
              Finance & Compliance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Financial Management</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    General Fund: BDT 5,000
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Reserved Fund: BDT 25,000
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Bank certification maintained
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Compliance</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Joint signature operations
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Annual auditing conducted
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Designated subcommittee oversight
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Educational Journey
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience quality education in a nurturing environment where every child can thrive and grow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admission"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply for Admission
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
