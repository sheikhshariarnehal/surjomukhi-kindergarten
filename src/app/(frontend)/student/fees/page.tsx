'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import {
  CreditCard,
  Building2,
  Smartphone,
  Receipt,
  ShieldCheck,
  Award,
  Clock,
  Users2,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

export default function TuitionFeesPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'cards' | 'table'>('table');

  const classList = [
    { key: 'play', nameEn: 'Play Group', nameBn: 'প্লে গ্রুপ', age: '2.5–3.5 yrs', admission: 4500, monthly: 1200, session: 2000 },
    { key: 'nursery', nameEn: 'Nursery', nameBn: 'নার্সারি', age: '3.5–4.5 yrs', admission: 4500, monthly: 1400, session: 2000 },
    { key: 'one', nameEn: 'Class One', nameBn: '১ম শ্রেণি', age: '5–6 yrs', admission: 5000, monthly: 1600, session: 2500 },
    { key: 'two', nameEn: 'Class Two', nameBn: '২য় শ্রেণি', age: '6–7 yrs', admission: 5000, monthly: 1700, session: 2500 },
    { key: 'three', nameEn: 'Class Three', nameBn: '৩য় শ্রেণি', age: '7–8 yrs', admission: 5500, monthly: 1800, session: 2500 },
    { key: 'four', nameEn: 'Class Four', nameBn: '৪র্থ শ্রেণি', age: '8–9 yrs', admission: 5500, monthly: 1900, session: 3000 },
    { key: 'five', nameEn: 'Class Five', nameBn: '৫ম শ্রেণি', age: '9–10 yrs', admission: 6000, monthly: 2000, session: 3000 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <Receipt className="w-3.5 h-3.5 text-blue-600" />
            {language === 'bn' ? 'স্বচ্ছ টিউশন ও ফি বিবরণী' : 'Transparent Tuition & Fee Schedule'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {language === 'bn' ? 'শিক্ষার্থীদের টিউশন ও ফি কাঠামো' : 'Student Tuition & Fee Structure'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'bn'
              ? 'সূর্যমুখী কিন্ডারগার্টেনের সকল শ্রেণির টিউশন ফি, ভর্তি চার্জ এবং বার্ষিক সেশন ফি সম্পর্কিত সম্পূর্ণ ও স্বচ্ছ বিবরণী।'
              : 'Complete and transparent fee schedule covering admission, monthly tuition, and session charges across all classes.'
            }
          </p>
        </div>
      </section>

      {/* Main Fee Matrix */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {language === 'bn' ? 'একাডেমিক ফি বিবরণ' : 'Academic Year 2024–2025'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
                {language === 'bn' ? 'শ্রেণিভিত্তিক নির্ধারিত ফি তালিকা' : 'Class-wise Scheduled Fees'}
              </h2>
            </div>

            {/* View Switcher */}
            <div className="inline-flex bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('table')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'table' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'bn' ? 'পূর্ণাঙ্গ ছক' : 'Comparison Table'}
              </button>
              <button
                onClick={() => setActiveTab('cards')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'cards' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'bn' ? 'শ্রেণিভিত্তিক কার্ড' : 'Class Cards'}
              </button>
            </div>
          </div>

          {/* Table View */}
          {activeTab === 'table' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-4 px-6">Class Tier</th>
                      <th className="py-4 px-6">Age Bracket</th>
                      <th className="py-4 px-6 text-right">Admission Fee</th>
                      <th className="py-4 px-6 text-right">Monthly Tuition</th>
                      <th className="py-4 px-6 text-right">Annual Session Fee</th>
                      <th className="py-4 px-6 text-right">Estimated Annual Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {classList.map((item) => {
                      const annualEstimated = item.admission + (item.monthly * 12) + item.session;
                      return (
                        <tr key={item.key} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 font-bold text-slate-900">
                            {language === 'bn' ? item.nameBn : item.nameEn}
                            <span className="block text-xs font-normal text-slate-500">
                              {language === 'bn' ? item.nameEn : item.nameBn}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-600 font-medium text-xs">
                            {item.age}
                          </td>
                          <td className="py-4 px-6 text-right font-semibold text-slate-900">
                            ৳{item.admission.toLocaleString()}
                          </td>
                          <td className="py-4 px-6 text-right font-bold text-blue-600">
                            ৳{item.monthly.toLocaleString()}
                            <span className="text-[11px] font-normal text-slate-400">/mo</span>
                          </td>
                          <td className="py-4 px-6 text-right font-semibold text-slate-700">
                            ৳{item.session.toLocaleString()}
                          </td>
                          <td className="py-4 px-6 text-right font-bold text-slate-900">
                            ৳{annualEstimated.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-50/70 p-4 border-t border-slate-200/60 text-xs text-slate-500 flex items-center justify-between flex-wrap gap-2">
                <span>* Books, stationery, and uniforms are billed separately at cost.</span>
                <span>All figures in Bangladeshi Taka (BDT ৳)</span>
              </div>
            </div>
          )}

          {/* Cards View */}
          {activeTab === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classList.map((item) => {
                const annualEstimated = item.admission + (item.monthly * 12) + item.session;
                return (
                  <div 
                    key={item.key}
                    className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs font-semibold text-blue-600">{item.age}</span>
                          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                            {language === 'bn' ? item.nameBn : item.nameEn}
                          </h3>
                        </div>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                          ৳{item.monthly.toLocaleString()}/mo
                        </span>
                      </div>

                      <div className="space-y-3 py-3 border-t border-slate-100 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Admission Fee (One-Time)</span>
                          <span className="font-semibold text-slate-900">৳{item.admission.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Monthly Tuition Fee</span>
                          <span className="font-semibold text-slate-900">৳{item.monthly.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Annual Session Charge</span>
                          <span className="font-semibold text-slate-900">৳{item.session.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-600">Est. Annual Total:</span>
                      <span className="text-base font-bold text-slate-900">৳{annualEstimated.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Payment Channels & Schedule */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Accepted Methods */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                <CreditCard className="w-4 h-4" />
                Payment Channels
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-6">
                Accepted Payment Methods
              </h2>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Mobile Financial Services (MFS)</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Pay via bKash, Nagad, or Rocket using our merchant payment number. Always provide the student ID and class roll in the payment reference.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Direct Bank Deposit / Transfer</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Direct deposits accepted at our designated accounts in Sonali Bank & Dutch-Bangla Bank (Nawabganj Branch). Submit the deposit slip copy to the cashier.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Campus Cashier Counter</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Pay in cash directly at the Accounts Desk, Saturday through Thursday from 8:30 AM to 2:00 PM. An official receipt will be issued immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule & Guidelines */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4" />
                Deadlines & Guidelines
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-6">
                Payment Schedule & Policies
              </h2>

              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Monthly Tuition Due Date</h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Monthly tuition must be cleared by the 10th of every calendar month.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Late Fee Consideration</h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      A nominal late fee of ৳50 applies for payments cleared after the 15th of the running month.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Sibling Tuition Concession</h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Families with 2 or more siblings actively enrolled receive a 15% concession on monthly tuition for the younger child.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Merit Scholarship Waivers</h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Top performers in annual exams are eligible for up to 50% tuition fee waivers under the Founder&apos;s Scholarship Trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Aid & Helpdesk CTA */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Need Assistance with Tuition or Payment Plans?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              We are committed to making quality foundational education accessible. Contact our Accounts Office for installment options or financial aid applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <HelpCircle className="w-4 h-4" />
                Contact Accounts Desk
              </Link>
              <Link
                href="/admission/how-to-apply"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                Admission Criteria & Process
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
