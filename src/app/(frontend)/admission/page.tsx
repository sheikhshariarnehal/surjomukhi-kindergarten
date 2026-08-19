'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  FileText, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  Users, 
  BookOpen, 
  Award, 
  HeartHandshake, 
  ChevronDown,
  Building,
  School,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AdmissionHubPage() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const classEligibility = [
    { slug: 'play-group', nameEn: 'Play Group', nameBn: 'প্লে গ্রুপ', ageEn: '3 – 4 Years', ageBn: '৩ – ৪ বছর', seats: '18', tierEn: 'Early Childhood', tierBn: 'প্রাক-প্রাথমিক' },
    { slug: 'nursery', nameEn: 'Nursery', nameBn: 'নার্সারি', ageEn: '4 – 5 Years', ageBn: '৪ – ৫ বছর', seats: '20', tierEn: 'Foundational', tierBn: 'ভিত্তি পর্যায়' },
    { slug: 'one', nameEn: 'Class One', nameBn: '১ম শ্রেণি', ageEn: '5 – 6 Years', ageBn: '৫ – ৬ বছর', seats: '24', tierEn: 'Primary Inception', tierBn: 'প্রাথমিক সূচনা' },
    { slug: 'two', nameEn: 'Class Two', nameBn: '২য় শ্রেণি', ageEn: '6 – 7 Years', ageBn: '৬ – ৭ বছর', seats: '24', tierEn: 'Skill Advancement', tierBn: 'দক্ষতা উন্নয়ন' },
    { slug: 'three', nameEn: 'Class Three', nameBn: '৩য় শ্রেণি', ageEn: '7 – 8 Years', ageBn: '৭ – ৮ বছর', seats: '24', tierEn: 'Intermediate Core', tierBn: 'মধ্যম পর্যায়' },
    { slug: 'four', nameEn: 'Class Four', nameBn: '৪র্থ শ্রেণি', ageEn: '8 – 9 Years', ageBn: '৮ – ৯ বছর', seats: '24', tierEn: 'Senior Preparation', tierBn: 'উচ্চ পর্যায়' },
    { slug: 'five', nameEn: 'Class Five', nameBn: '৫ম শ্রেণি', ageEn: '9 – 10 Years', ageBn: '৯ – ১০ বছর', seats: '24', tierEn: 'Graduating Primary', tierBn: 'সমাপনী পর্যায়' },
  ];

  const pillars = [
    {
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      titleEn: 'Excellence in Bangla Medium Education',
      titleBn: 'মানসম্মত বাংলা মাধ্যম শিক্ষা',
      descEn: 'National curriculum foundation enriched with oral English fluency, practical numeracy, and moral values.',
      descBn: 'জাতীয় শিক্ষাক্রমের পূর্ণাঙ্গ অনুসরণের সাথে স্পোকেন ইংলিশ, ব্যবহারিক গণিত ও নৈতিক শিক্ষার সমন্বয়।'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      titleEn: 'Safe, Caring & Inclusive Campus',
      titleBn: 'নিরাপদ, শিশুবান্ধব ও সুরক্ষিত পরিবেশ',
      descEn: 'Dedicated child safety oversight, hygienic classrooms, and compassionate female caregiver assistance.',
      descBn: 'শিশুবান্ধব ক্লাসরুম, পরিষ্কার-পরিচ্ছন্ন পরিবেশ এবং স্নেহময় সহকারী আয়াদের সার্বক্ষণিক সহায়তা।'
    },
    {
      icon: <Award className="w-5 h-5 text-amber-600" />,
      titleEn: 'Merit Scholarships & Support',
      titleBn: 'মেধাবৃত্তি ও সহমর্মিতামূলক ছাড়',
      descEn: 'Institutional fee concessions for meritorious candidates, siblings, and deserving family backgrounds.',
      descBn: 'মেধাবী শিক্ষার্থী, সহোদর ভাই-বোন এবং সুবিধাবঞ্চিত পরিবারের সন্তানদের জন্য বিশেষ বেতন মওকুফ।'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
      titleEn: 'Holistic Co-Curricular Growth',
      titleBn: 'সহশিক্ষা ও সাংস্কৃতিক বিকাশ',
      descEn: 'Weekly art classes, cultural celebrations, sports days, and speech recitation workshops.',
      descBn: 'নিয়মিত চিত্রাঙ্কন, আবৃত্তি, বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক উৎসবের বর্ণাঢ্য আয়োজন।'
    }
  ];

  const faqs = [
    {
      qEn: 'What is the minimum age requirement for Play Group admission?',
      qBn: 'প্লে গ্রুপে ভর্তির জন্য ন্যূনতম বয়স কত হতে হবে?',
      aEn: 'For Play Group, the child should be at least 3 years of age at the time of session commencement.',
      aBn: 'প্লে গ্রুপে ভর্তির জন্য চলতি শিক্ষাবর্ষের শুরুতে শিশুর বয়স ন্যূনতম ৩ বছর পূর্ণ হতে হবে।'
    },
    {
      qEn: 'Can I apply for admission completely online?',
      qBn: 'অনলাইনে কি সম্পূর্ণ ভর্তি আবেদন জমা দেওয়া যাবে?',
      aEn: 'Yes! You can complete our online admission form, generate an official application token, and our admissions team will contact you.',
      aBn: 'হ্যাঁ! আমাদের ওয়েবসাইটের "অনলাইন ভর্তি আবেদন" ফরম পূরণ করে তাৎক্ষণিক ট্র্যাকিং টোকেন সংগ্রহ করতে পারবেন।'
    },
    {
      qEn: 'What documents are required for enrollment verification?',
      qBn: 'ভর্তি নিশ্চিতকরণের জন্য কী কী নথিপত্র প্রয়োজন?',
      aEn: 'A digital birth registration copy, 4 passport-size photographs of the student, and copies of parent/guardian NID cards.',
      aBn: 'শিক্ষার্থীর অনলাইন জন্ম নিবন্ধন সনদ, ৪ কপি পাসপোর্ট সাইজ ছবি এবং পিতা-মাতার জাতীয় পরিচয়পত্রের ফটোকপি।'
    },
    {
      qEn: 'Are there any hidden admission or development fees?',
      qBn: 'ভর্তির ক্ষেত্রে কোনো লুকায়িত বা অতিরিক্ত ফি রয়েছে কি?',
      aEn: 'No. Surjomukhi Kindergarten maintains a 100% transparent fee structure published openly for all grades.',
      aBn: 'না। সূর্যমুখী কিন্ডারগার্টেনের বেতন ও ফি কাঠামো সম্পূর্ণ স্বচ্ছ এবং আমাদের ওয়েবসাইটে উন্মুক্তভাবে প্রকাশিত।'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Institutional Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <School className="w-3.5 h-3.5 text-blue-600" />
            {isBn ? 'ভর্তি ও শিক্ষার্থী নিবন্ধন শিক্ষাবর্ষ ২০২৫–২৬' : 'Admissions & Enrollment Session 2025–26'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {isBn ? 'সূর্যমুখী কিন্ডারগার্টেন ভর্তি তথ্য ও পোর্টাল' : 'Admissions & Enrollment Hub'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {isBn
              ? 'প্লে গ্রুপ হতে ৫ম শ্রেণি পর্যন্ত সীমিত আসনে ভর্তি চলছে। আপনার সন্তানের নিরাপদ, আনন্দময় ও মানসম্মত শিক্ষার সূচনা করুন।'
              : 'Empowering young minds with curiosity, discipline, and strong foundations. Enroll your child in our nurturing kindergarten environment.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">Play – 5</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'শ্রেণি পর্যায়' : 'Grade Levels'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">2025–26</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'চলতি শিক্ষাবর্ষ' : 'Academic Session'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">1:12</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'শিক্ষক অনুপাত' : 'Staff Ratio'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">৳0</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'অনলাইন আবেদন ফি' : 'Application Fee'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Main Admission Pathways */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'ভর্তি কার্যক্রম' : 'Admission Pathways'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'ভর্তি প্রক্রিয়ার মূল ধাপসমূহ' : 'Choose Your Enrollment Action'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Apply Online Card */}
            <div className="bg-white rounded-2xl border-2 border-blue-600/30 p-7 shadow-xs hover:shadow-lg hover:border-blue-600 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                {isBn ? 'অনলাইন ফরম' : 'Instant Form'}
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {isBn ? 'অনলাইনে ভর্তি আবেদন' : 'Apply Online'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {isBn
                    ? 'সহজ ৪ ধাপে ঘরে বসেই শিক্ষার্থীর যাবতীয় তথ্য দিয়ে ভর্তি আবেদন জমা দিন এবং ট্র্যাকিং কোড সংগ্রহ করুন।'
                    : 'Submit your child’s application digitally in 4 easy steps, calculate estimated fees, and receive a confirmation token.'}
                </p>
              </div>
              <Link
                href="/admission/apply-online"
                className="inline-flex items-center justify-between w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors shadow-xs"
              >
                <span>{isBn ? 'আবেদন শুরু করুন' : 'Start Online Application'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 2. How to Apply Guide */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {isBn ? 'ভর্তি নির্দেশিকা ও নিয়মাবলী' : 'How to Apply'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {isBn
                    ? 'আবেদনপত্র সংগ্রহ থেকে শুরু করে নথিপত্র দাখিল ও ওরিয়েন্টেশন ক্লাস পর্যন্ত পূর্ণাঙ্গ ৬ ধাপের ভর্তি নির্দেশিকা।'
                    : 'Step-by-step roadmap outlining document verification, readiness interview, fee clearance, and orientation.'}
                </p>
              </div>
              <Link
                href="/admission/how-to-apply"
                className="inline-flex items-center justify-between w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 px-4 rounded-xl transition-colors"
              >
                <span>{isBn ? 'নির্দেশিকা দেখুন' : 'View Step-by-Step Guide'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3. Admission Policy */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {isBn ? 'ভর্তি নীতিমালা ও যোগ্যতা' : 'Admission Policy'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {isBn
                    ? 'সরকারি শিক্ষাক্রম নীতিমালা, বয়সসীমা, আসন বণ্টন, উপস্থিতি সংক্রান্ত শর্তাবলী ও সার্বিক প্রাতিষ্ঠানিক আচরণবিধি।'
                    : 'Review age eligibility rules, document checklist, refund criteria, safety measures, and code of conduct.'}
                </p>
              </div>
              <Link
                href="/admission/policy"
                className="inline-flex items-center justify-between w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 px-4 rounded-xl transition-colors"
              >
                <span>{isBn ? 'নীতিমালা পড়ুন' : 'Read Official Policy'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Class-Wise Age Criteria & Seat Allocation */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'শ্রেণিভিত্তিক যোগ্যতা' : 'Class Eligibility'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'শ্রেণিভিত্তিক বয়সসীমা ও আসন সংখ্যা' : 'Grade-Wise Age Criteria & Capacity'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {isBn
                ? '২০২৫ শিক্ষাবর্ষে ভর্তির জন্য সরকারি ও প্রাতিষ্ঠানিক নির্ধারিত মানদণ্ড।'
                : 'Standard age requirements for Session 2025–26 to ensure healthy peer learning and development.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-6">{isBn ? 'শ্রেণি' : 'Class / Grade'}</th>
                    <th className="py-4 px-6">{isBn ? 'পর্যায়' : 'Academic Tier'}</th>
                    <th className="py-4 px-6">{isBn ? 'নির্ধারিত বয়সসীমা' : 'Required Age'}</th>
                    <th className="py-4 px-6 text-center">{isBn ? 'সর্বোচ্চ আসন' : 'Section Seats'}</th>
                    <th className="py-4 px-6 text-right">{isBn ? 'বিস্তারিত' : 'Details'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {classEligibility.map((cls) => (
                    <tr key={cls.slug} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="py-4 px-6 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {isBn ? cls.nameBn : cls.nameEn}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                          {isBn ? cls.tierBn : cls.tierEn}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-700">
                        {isBn ? cls.ageBn : cls.ageEn}
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-blue-600">
                        {cls.seats}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/academic/classes/${cls.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                        >
                          <span>{isBn ? 'সিলেবাস ও রুটিন' : 'Explore'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Four Core Institutional Pillars */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'কেন সূর্যমুখী?' : 'Why Choose Surjomukhi?'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'আমাদের প্রধান অঙ্গীকার ও বৈশিষ্ট্যসমূহ' : 'Our Educational Tenets'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">
                  {isBn ? pillar.titleBn : pillar.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBn ? pillar.descBn : pillar.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'সাধারণ প্রশ্নোত্তর' : 'FAQ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'অভিভাবকদের সচরাচর জিজ্ঞাসিত প্রশ্ন' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                  >
                    <span>{isBn ? faq.qBn : faq.qEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4">
                      {isBn ? faq.aBn : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Admission Helpdesk & Campus Contacts */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {isBn ? 'ভর্তি বিষয়ে সরাসরি পরামর্শ প্রয়োজন?' : 'Need Direct Admission Counseling?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {isBn
                ? 'আমাদের ভর্তি হেল্পডেস্কে সরাসরি ফোন করুন অথবা ক্যাম্পাসে উপস্থিত হয়ে আসন নিশ্চিত করুন।'
                : 'Call our direct admissions officer or visit our campus office at Salauddin Complex, Nawabganj, Dhaka.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:01954113374"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isBn ? 'হটলাইন: ০১৯৫৪-১১৩৩৭৪' : 'Call: +880 1954-113374'}</span>
              </a>
              <Link
                href="/admission/apply-online"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                {isBn ? 'অনলাইন ফরম পূরণ' : 'Apply Online Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}