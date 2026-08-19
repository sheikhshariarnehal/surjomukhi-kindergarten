'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  PhoneCall, 
  FileText, 
  Upload, 
  Users, 
  CheckCircle2, 
  GraduationCap, 
  ArrowRight,
  HelpCircle,
  Clock,
  Calendar
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function HowToApplyPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const steps = [
    {
      step: '01',
      title: isBn ? 'প্রাথমিক অনুসন্ধান ও ক্যাম্পাস পরিদর্শন' : 'Initial Inquiry & Campus Tour',
      description: isBn
        ? 'আমাদের ভর্তি তথ্য ডেস্ক বা ক্যাম্পাসে সরাসরি উপস্থিত হয়ে বিদ্যালয়ের কার্যক্রম, শিক্ষাদান পদ্ধতি ও পরিবেশ সম্পর্কে জানুন।'
        : 'Contact our admissions desk or visit our campus in person to learn about our curriculum, facilities, and class schedules.',
      icon: <PhoneCall className="w-6 h-6 text-blue-600" />,
      details: [
        isBn ? 'সরাসরি ক্যাম্পাস ঘুরে দেখা' : 'Schedule an on-site school tour',
        isBn ? 'ভর্তি কর্মকর্তার সাথে আলোচনা' : 'Consult with our admission counselor',
        isBn ? 'বয়সোপযোগী শ্রেণী ও আসন যাচাই' : 'Verify class availability & age criteria',
        isBn ? 'বেতন ও ফি কাঠামো সংগ্রহ' : 'Obtain the official fee structure'
      ]
    },
    {
      step: '02',
      title: isBn ? 'ভর্তি আবেদনপত্র সংগ্রহ বা অনলাইনে পূরণ' : 'Application Form Submission',
      description: isBn
        ? 'বিদ্যালয় অফিস থেকে নির্ধারিত আবেদনপত্র সংগ্রহ করুন অথবা সরাসরি আমাদের ওয়েবসাইটে অনলাইন ফরম পূরণ করুন।'
        : 'Collect an application form from the school office or complete our simple online admission form.',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      details: [
        isBn ? 'সঠিক তথ্য দিয়ে ফরম পূরণ' : 'Complete student & guardian details',
        isBn ? 'শিক্ষার্থীর বয়স অনুযায়ী সঠিক শ্রেণী নির্বাচন' : 'Select appropriate grade level',
        isBn ? 'জরুরি যোগাযোগের তথ্য প্রদান' : 'Provide active emergency contacts',
        isBn ? 'স্বাক্ষর ও অভিভাবকের সম্মতি' : 'Guardian signature & declaration'
      ]
    },
    {
      step: '03',
      title: isBn ? 'প্রয়োজনীয় নথিপত্র দাখিল' : 'Document Submission & Verification',
      description: isBn
        ? 'শিক্ষার্থীর জন্ম নিবন্ধন সনদ, পাসপোর্ট সাইজ ছবি এবং অভিভাবকের জাতীয় পরিচয়পত্রের অনুলিপি জমা দিন।'
        : 'Submit birth registration certificate, student photos, vaccination records, and parent NID copies for verification.',
      icon: <Upload className="w-6 h-6 text-blue-600" />,
      details: [
        isBn ? 'অনলাইন জন্ম নিবন্ধন সনদের কপি' : 'Birth registration certificate copy',
        isBn ? 'শিক্ষার্থীর ৪ কপি পাসপোর্ট সাইজ ছবি' : '4 Passport-size photographs',
        isBn ? 'পিতা-মাতার জাতীয় পরিচয়পত্রের কপি' : 'Parent / Guardian NID copies',
        isBn ? 'টিকা কার্ডের অনুলিপি (প্রযোজ্য ক্ষেত্রে)' : 'Immunization card (if applicable)'
      ]
    },
    {
      step: '04',
      title: isBn ? 'অনানুষ্ঠানিক মূল্যায়ন ও সাক্ষাৎকার' : 'Informal Readiness Assessment',
      description: isBn
        ? 'শিশুর স্বাচ্ছন্দ্য ও শিখন প্রস্তুতি বোঝার জন্য একটি আন্তরিক, শিশুবান্ধব মৌখিক মিথস্ক্রিয়া ও অভিভাবক সাক্ষাৎকার।'
        : 'A friendly, play-based interaction to gauge the child’s social comfort, fine motor readiness, and verbal skills.',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      details: [
        isBn ? 'খেলার ছলে সহজ কথাবার্তা' : 'Play-based oral interaction',
        isBn ? 'রং ও সাধারণ বস্তু চেনার দক্ষতা' : 'Color, shape & object recognition',
        isBn ? 'শিশুর আচরণ ও আগ্রহ অনুধাবন' : 'Observation of child comfort & curiosity',
        isBn ? 'অভিভাবকদের সাথে সার্বিক আলোচনা' : 'Brief parent-educator dialogue'
      ]
    },
    {
      step: '05',
      title: isBn ? 'ভর্তি অনুমোদন ও ফলাফল প্রকাশ' : 'Admission Confirmation & Notification',
      description: isBn
        ? 'ভর্তি কমিটির পর্যালোচনার পর যোগ্য প্রার্থীদের তালিকা প্রকাশ এবং এসএমএস বা ফোনে নিশ্চিতকরণ বার্তা প্রেরণ।'
        : 'Review of the application by the admissions committee and prompt notification to parents via phone or SMS.',
      icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />,
      details: [
        isBn ? 'আবেদন ও সাক্ষাৎকারের ফলাফল প্রকাশ' : 'Application & assessment review',
        isBn ? 'অভিভাবকদের নিশ্চিতকরণ বার্তা প্রেরণ' : 'Notification to selected guardians',
        isBn ? 'অতিরিক্ত আবেদনকারীদের অপেক্ষমাণ তালিকা' : 'Waiting list status if seats fill',
        isBn ? 'ভর্তি সম্পন্ন করার নির্ধারিত সময়সীমা' : 'Specific deadline for final enrollment'
      ]
    },
    {
      step: '06',
      title: isBn ? 'ভর্তি ফি পরিশোধ ও ক্লাস প্রস্তুতি' : 'Final Enrollment & Class Preparation',
      description: isBn
        ? 'নির্ধারিত ভর্তি ফি পরিশোধ, বই-খাতা সংগ্রহ এবং ওরিয়েন্টেশন ক্লাসে যোগদানের মাধ্যমে আনুষ্ঠানিক সূচনা।'
        : 'Payment of admission fees, collection of booklists and syllabus, and attending the student orientation session.',
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      details: [
        isBn ? 'ভর্তি ফি ও মাসিক বেতন পরিশোধ' : 'Payment of admission & monthly fees',
        isBn ? 'বইয়ের তালিকা ও সিলেবাস সংগ্রহ' : 'Collection of books & class syllabus',
        isBn ? 'স্কুল ড্রেস ও আইডি কার্ড প্রস্তুত' : 'School uniform & student ID card',
        isBn ? 'ওরিয়েন্টেশন ক্লাসে অংশগ্রহণ' : 'Orientation day participation'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* 1. Header Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              {isBn ? 'ভর্তি প্রক্রিয়া ও নির্দেশিকা' : 'How to Apply for Admission'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'প্লে গ্রুপ হতে ৫ম শ্রেণীতে আপনার সন্তানকে ভর্তি করানোর সহজ ৬টি ধাপ, প্রয়োজনীয় কাগজপত্র এবং নিয়মাবলী।'
                : 'A clear, step-by-step guide explaining the enrollment process, eligibility criteria, and required documentation.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">6 Steps</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'সহজ ধাপ' : 'Simple Steps'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Play – 5</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'শ্রেণীসমূহ' : 'Academic Levels'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">3 – 10</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'বয়সসীমা (বছর)' : 'Age Range (Yrs)'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Nawabganj</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'ঢাকা-১৩২০' : 'Dhaka, Bangladesh'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Step-by-Step Enrollment Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {isBn ? 'পর্যায়ক্রমিক ভর্তি ধাপসমূহ' : 'Step-by-Step Admission Process'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'আবেদন থেকে শুরু করে চূড়ান্ত ক্লাসে যোগদান পর্যন্ত ধারাবাহিক প্রক্রিয়া।'
              : 'Follow these straightforward steps to complete your child’s enrollment smoothly.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-xs hover:border-gray-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-sm font-extrabold text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full tabular-nums">
                    Step {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2.5">
                    {isBn ? 'করণীয় ও বিষয়সমূহ:' : 'Action Checklist:'}
                  </div>
                  <ul className="space-y-1.5">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 3. Bottom CTA & Application Links */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'এখনই অনলাইন ভর্তি আবেদন সম্পন্ন করুন' : 'Ready to Submit Your Online Application?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'অনলাইন ফর্মের মাধ্যমে ঘরে বসেই আবেদন জমা দিন। আমাদের ভর্তি কর্মকর্তা দ্রুত আপনার সাথে যোগাযোগ করবেন।'
                : 'Fill out our secure online application form in minutes. Our admissions officer will follow up with you promptly.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admission/apply-online"
                className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
              >
                <span>{isBn ? 'অনলাইনে আবেদন করুন' : 'Apply Online Now'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/admission/policy"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'ভর্তি নীতিমালা দেখুন' : 'Admission Policy'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
