'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

// Note: Metadata for client components needs to be handled differently
// This will be handled in the layout or through dynamic imports

export default function TuitionFeesPage() {
  const { t } = useLanguage();

  const classNames = ['play', 'nursery', 'one', 'two', 'three', 'four', 'five'];
  const colors = [
    'from-pink-400 to-pink-600',
    'from-purple-400 to-purple-600', 
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-orange-400 to-orange-600',
    'from-red-400 to-red-600'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li><Link href="/" className="text-gray-500 hover:text-gray-700">{t('common.home')}</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><Link href="/student" className="text-gray-500 hover:text-gray-700">{t('common.students')}</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">{t('students.fees.title')}</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('students.fees.title')}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t('students.fees.subtitle')}
          </p>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('students.fees.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('students.fees.description')}
            </p>
          </div>

          {/* Monthly and Admission Fees Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Monthly Fees */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {t('students.fees.monthlyFees')}
              </h3>
              <div className="space-y-4">
                {classNames.map((className) => (
                  <div key={className} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        {t(`students.fees.classes.${className}`)}
                      </span>
                      <span className="font-bold text-emerald-600 text-lg">
                        ৳{t(`students.fees.feeStructure.${className}.monthlyFee`)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admission Fees */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {t('students.fees.admissionFees')}
              </h3>
              <div className="space-y-4">
                {classNames.map((className) => (
                  <div key={className} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        {t(`students.fees.classes.${className}`)}
                      </span>
                      <span className="font-bold text-blue-600 text-lg">
                        ৳{t(`students.fees.feeStructure.${className}.admissionFee`)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Combined View Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classNames.map((className, index) => (
              <div key={className} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className={`bg-gradient-to-r ${colors[index]} p-6 text-white text-center`}>
                  <h3 className="text-2xl font-bold mb-2">{t(`students.fees.classes.${className}`)}</h3>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">{t('students.fees.admissionFees')}</span>
                      <span className="font-semibold text-gray-900">৳{t(`students.fees.feeStructure.${className}.admissionFee`)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">{t('students.fees.monthlyFees')}</span>
                      <span className="font-semibold text-gray-900">৳{t(`students.fees.feeStructure.${className}.monthlyFee`)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-800 font-medium">Annual Total</span>
                      <span className="font-bold text-emerald-600 text-lg">
                        ৳{parseInt(t(`students.fees.feeStructure.${className}.monthlyFee`)) * 12 + parseInt(t(`students.fees.feeStructure.${className}.admissionFee`))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('students.fees.paymentMethods')}</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">💳</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('students.fees.paymentInfo.methods.bankTransfer.title')}</h4>
                    <p className="text-gray-600 text-sm">{t('students.fees.paymentInfo.methods.bankTransfer.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">💰</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('students.fees.paymentInfo.methods.cash.title')}</h4>
                    <p className="text-gray-600 text-sm">{t('students.fees.paymentInfo.methods.cash.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📱</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('students.fees.paymentInfo.methods.mobileBanking.title')}</h4>
                    <p className="text-gray-600 text-sm">{t('students.fees.paymentInfo.methods.mobileBanking.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('students.fees.paymentSchedule')}</h2>
              <div className="bg-emerald-50 p-6 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{t('students.fees.paymentInfo.schedule.monthlyDue')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{t('students.fees.paymentInfo.schedule.lateFee')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{t('students.fees.paymentInfo.schedule.siblingDiscount')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Assistance */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('students.fees.financialAssistance')}</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('students.fees.assistance.title')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-bold text-gray-900 mb-2">{t('students.fees.assistance.needBased.title')}</h3>
              <p className="text-gray-600 text-sm">{t('students.fees.assistance.needBased.description')}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="font-bold text-gray-900 mb-2">{t('students.fees.assistance.merit.title')}</h3>
              <p className="text-gray-600 text-sm">{t('students.fees.assistance.merit.description')}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="font-bold text-gray-900 mb-2">{t('students.fees.assistance.paymentPlans.title')}</h3>
              <p className="text-gray-600 text-sm">{t('students.fees.assistance.paymentPlans.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('students.fees.contact.title')}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('students.fees.contact.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('students.fees.contact.contactOffice')}
            </a>
            <a
              href="/admission"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              {t('students.fees.contact.applyNow')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
