'use client';

import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

// Note: Metadata moved to layout or parent component for client components

// Structured data for Organization
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "School Name",
  "description": "A leading educational institution committed to excellence in education and holistic development of students.",
  "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  "logo": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/logo.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 School Street",
    "addressLocality": "Education City",
    "addressRegion": "EC",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "email": "info@school.edu"
  },
  "foundingDate": "1995",
  "numberOfStudents": 450,
  "sameAs": [
    "https://facebook.com/schoolname",
    "https://twitter.com/schoolname"
  ]
};

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('about.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {t('about.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {t('about.mission.title')}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t('about.mission.description1')}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('about.mission.description2')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-primary-800 mb-4">{t('about.vision.title')}</h3>
                <p className="text-primary-700 text-lg leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('about.history.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.history.subtitle')}
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-64 rounded-lg"></div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.history.founded.title')}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {t('about.history.founded.description')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-r from-secondary-400 to-secondary-600 h-64 rounded-lg"></div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.history.growth.title')}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {t('about.history.growth.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('about.values.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.values.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  titleKey: "about.values.excellence.title",
                  descriptionKey: "about.values.excellence.description",
                  icon: "🏆"
                },
                {
                  titleKey: "about.values.integrity.title",
                  descriptionKey: "about.values.integrity.description",
                  icon: "🤝"
                },
                {
                  titleKey: "about.values.innovation.title",
                  descriptionKey: "about.values.innovation.description",
                  icon: "💡"
                },
                {
                  titleKey: "about.values.inclusivity.title",
                  descriptionKey: "about.values.inclusivity.description",
                  icon: "🌍"
                },
                {
                  titleKey: "about.values.collaboration.title",
                  descriptionKey: "about.values.collaboration.description",
                  icon: "👥"
                },
                {
                  titleKey: "about.values.responsibility.title",
                  descriptionKey: "about.values.responsibility.description",
                  icon: "🎯"
                }
              ].map((value, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t(value.titleKey)}</h3>
                  <p className="text-gray-600">{t(value.descriptionKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('about.leadership.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.leadership.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  nameKey: "about.leadership.principal.name",
                  positionKey: "about.leadership.principal.position",
                  descriptionKey: "about.leadership.principal.description",
                  image: "/teachers/sample-teacher.jpg"
                },
                {
                  nameKey: "about.leadership.vicePrincipal.name",
                  positionKey: "about.leadership.vicePrincipal.position",
                  descriptionKey: "about.leadership.vicePrincipal.description",
                  image: "/teachers/sample-teacher.jpg"
                },
                {
                  nameKey: "about.leadership.academicDirector.name",
                  positionKey: "about.leadership.academicDirector.position",
                  descriptionKey: "about.leadership.academicDirector.description",
                  image: "/teachers/sample-teacher.jpg"
                }
              ].map((leader, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t(leader.nameKey)}</h3>
                  <p className="text-primary-600 font-medium mb-3">{t(leader.positionKey)}</p>
                  <p className="text-gray-600">{t(leader.descriptionKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/admission"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('common.applyForAdmission')}
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                {t('common.contactUs')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
