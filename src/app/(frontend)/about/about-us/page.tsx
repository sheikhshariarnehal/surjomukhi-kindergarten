'use client';

import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function AboutUsPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-700">{t('common.home')}</a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <a href="/about" className="text-gray-500 hover:text-gray-700">{t('common.about')}</a>
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
              {t('about.pages.aboutUs.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('about.pages.aboutUs.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Surjomukhi Kindergarten is a premier early childhood education institution dedicated to 
                providing a nurturing and stimulating environment for young learners. We believe that 
                the early years of a child's life are crucial for their overall development.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our school focuses on holistic development, combining academic excellence with 
                character building, creativity, and social skills development. We provide a safe, 
                caring, and inclusive environment where every child can thrive.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With experienced and qualified teachers, modern facilities, and a child-centered 
                approach to learning, we prepare our students for their future academic journey 
                while ensuring they enjoy their childhood to the fullest.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Our Commitment</h3>
              <ul className="space-y-3 text-blue-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Quality early childhood education
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Individual attention to each child
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Safe and nurturing environment
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Holistic development approach
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Experienced and caring teachers
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Modern teaching methodologies
                </li>
              </ul>
            </div>
          </div>

          {/* Our Approach */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Educational Approach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Creative Learning</h3>
                <p className="text-gray-600">
                  We encourage creativity through art, music, and imaginative play activities.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Social Development</h3>
                <p className="text-gray-600">
                  Building social skills through group activities and collaborative learning.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cognitive Growth</h3>
                <p className="text-gray-600">
                  Developing critical thinking and problem-solving skills through engaging activities.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-gray-600">Happy Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Qualified Teachers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <div className="text-gray-600">Class Levels</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
