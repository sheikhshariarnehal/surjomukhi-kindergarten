'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Scale
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function AdmissionPolicyPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const policies = [
    {
      title: isBn ? 'বয়সসীমা ও ভর্তি যোগ্যতা' : 'Age & Eligibility Criteria',
      description: isBn
        ? 'প্রতিটি শ্রেণীতে ভর্তির জন্য সরকারি শিক্ষানীতি ও প্রাতিষ্ঠানিক মান অনুযায়ী নির্ধারিত বয়সসীমা পূরণ করতে হবে।'
        : 'Applicants must satisfy the standard age criteria for their respective grade level by the start of the academic year.',
      icon: <Scale className="w-6 h-6 text-blue-600" />,
      guidelines: [
        isBn ? 'প্লে গ্রুপ: ৩ বছর সম্পন্ন হতে হবে' : 'Play Group: Completed 3 years of age',
        isBn ? 'নার্সারি: ৪ বছর সম্পন্ন হতে হবে' : 'Nursery: Completed 4 years of age',
        isBn ? '১ম শ্রেণী: ৫+ বছর সম্পন্ন হতে হবে' : 'Class One: Completed 5+ years of age',
        isBn ? 'পূর্ববর্তী শ্রেণীর ছাড়পত্র (২য়-৫ম শ্রেণীর ক্ষেত্রে)' : 'Transfer certificate required for Grades 2–5'
      ]
    },
    {
      title: isBn ? 'নির্বাচন ও আসন বণ্টন প্রক্রিয়া' : 'Selection & Seat Allocation',
      description: isBn
        ? 'স্বচ্ছতা ও মেধার ভিত্তিতে আসন বণ্টন করা হয়। প্রাক-প্রাথমিক ক্ষেত্রে মৌখিক মিথস্ক্রিয়া ও প্রাথমিক ক্ষেত্রে মূল্যায়ন অনুষ্ঠিত হয়।'
        : 'Transparent merit-based admission. Play and Nursery tiers are admitted via play-based assessment, while primary grades undergo basic skills evaluation.',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      guidelines: [
        isBn ? 'পূর্বে আবেদনকারীদের অগ্রাধিকার ভিত্তিতে বিবেচনা' : 'Processed on a first-come, first-evaluated basis',
        isBn ? 'সহোদর ভাই-বোনদের জন্য আসন অগ্রাধিকার' : 'Sibling preference for current school families',
        isBn ? 'শিশুর শারীরিক ও মানসিক বিকাশ বিবেচনা' : 'Age-appropriate developmental readiness',
        isBn ? 'সীমিত আসনের কারণে অপেক্ষমাণ তালিকা সংরক্ষণ' : 'Reserved waiting list for oversubscribed classes'
      ]
    },
    {
      title: isBn ? 'প্রয়োজনীয় নথিপত্র ও প্রমাণপত্র' : 'Mandatory Verification Documents',
      description: isBn
        ? 'ভর্তি নিশ্চিত করার পূর্বে সকল নথিপত্রের মূল কপি প্রদর্শন এবং সত্যায়িত অনুলিপি অফিসে জমা দিতে হবে।'
        : 'All supporting documents must be submitted to the school administration during enrollment verification.',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      guidelines: [
        isBn ? 'অনলাইন জন্ম নিবন্ধন সনদের মূল ও ফটোকপি' : 'Original & photocopy of birth registration',
        isBn ? 'পাসপোর্ট সাইজের ৪ কপি সাম্প্রতিক রঙিন ছবি' : '4 Recent passport-size photographs of the student',
        isBn ? 'পিতা ও মাতার জাতীয় পরিচয়পত্রের ফটোকপি' : 'Photocopies of parent / guardian NID cards',
        isBn ? 'পূর্বের স্কুলের প্রত্যয়নপত্র/মার্কশিট (প্রযোজ্য ক্ষেত্রে)' : 'Previous school transfer certificate (if applicable)'
      ]
    },
    {
      title: isBn ? 'বেতন ও ফি পরিশোধ নীতিমালা' : 'Fee Structure & Payment Policy',
      description: isBn
        ? 'ভর্তি ফি এককালীন এবং মাসিক বেতন প্রতি মাসের ১০ তারিখের মধ্যে পরিশোধযোগ্য। মেধাবী শিক্ষার্থীদের জন্য বৃত্তি সুবিধা রয়েছে।'
        : 'Admission fee is one-time upon confirmation. Monthly tuition is payable by the 10th of each calendar month.',
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      guidelines: [
        isBn ? 'ভর্তি ফি অফেরতযোগ্য হিসেবে গণ্য হবে' : 'Admission processing fee is non-refundable',
        isBn ? 'প্রতি মাসের ১০ তারিখের মধ্যে বেতন পরিশোধ' : 'Tuition payable in advance by the 10th of each month',
        isBn ? 'নগদ, বিকাশ বা ব্যাংক চালানের মাধ্যমে ফি প্রদান' : 'Accepted via bank transfer, bKash, or cash desk',
        isBn ? 'মেধাবী ও অভাবী শিক্ষার্থীদের বিশেষ ছাড়' : 'Merit & need-based scholarship provisions available'
      ]
    },
    {
      title: isBn ? 'উপস্থিতি ও প্রাতিষ্ঠানিক শৃঙ্খলা' : 'Attendance & Code of Conduct',
      description: isBn
        ? 'শিক্ষার্থীদের নিয়মিত উপস্থিতি ও নির্ধারিত স্কুল ড্রেস পরিধান বাধ্যতামূলক। সার্বিক শৃঙ্খলা ও নৈতিক চরিত্র গঠন অন্যতম লক্ষ্য।'
        : 'Regular class attendance and proper uniform are mandatory. Parents collaborate closely with teachers regarding discipline.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      guidelines: [
        isBn ? 'বাৎসরিক ন্যূনতম ৮০% ক্লাসে উপস্থিতি' : 'Minimum 80% annual attendance required for exams',
        isBn ? 'অসুস্থতার ক্ষেত্রে লিখিত ছুটির আবেদন' : 'Written medical notice required for prolonged absence',
        isBn ? 'নির্ধারিত স্কুল ড্রেস ও পরিচয়পত্র পরিধান' : 'Mandatory prescribed school uniform & ID badge',
        isBn ? 'অভিভাবক-শিক্ষক মতবিনিময় সভায় সক্রিয় অংশগ্রহণ' : 'Mandatory attendance in parent-teacher meetings'
      ]
    },
    {
      title: isBn ? 'নিরাপত্তা ও শিশুবান্ধব পরিবেশ রক্ষা' : 'Child Safety & Protection Oversight',
      description: isBn
        ? 'ক্যাম্পাসে সকল শিক্ষার্থীর জন্য নিরাপদ, হয়রানি-মুক্ত ও মানসিক স্বস্তি নিশ্চিত করতে ৫ সদস্যের কমিটি সার্বক্ষণিক দায়িত্ব পালন করে।'
        : 'Active oversight by a 5-member safety committee ensuring an inclusive, secure, and respectful learning sanctuary.',
      icon: <AlertCircle className="w-6 h-6 text-blue-600" />,
      guidelines: [
        isBn ? '৫ সদস্যের যৌন হয়রানি বিরোধী কমিটি' : '5-Member anti-harassment & safety committee',
        isBn ? 'ক্যাম্পাসে বহিরাগতদের প্রবেশাধিকার নিয়ন্ত্রণ' : 'Controlled gate access & visitor verification',
        isBn ? 'শারীরিক বা মানসিক শাস্তি সম্পূর্ণ নিষিদ্ধ' : 'Strict zero-tolerance policy on corporal punishment',
        isBn ? 'প্রাথমিক স্বাস্থ্য ও ফার্স্ট-এইড সুবিধা' : 'On-site emergency first-aid and medical care'
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
              {isBn ? 'ভর্তি নীতিমালা ও নির্দেশিকা' : 'Admission Policy & Guidelines'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'সূর্যমুখী কিন্ডারগার্টেনে শিক্ষার্থী নির্বাচন, যোগ্যতা, ফি কাঠামো এবং শৃঙ্খলা সম্পর্কিত প্রাতিষ্ঠানিক নীতিমালা।'
                : 'Comprehensive institutional guidelines covering eligibility, merit selection, documentation, and child protection.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">100%</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'স্বচ্ছ মূল্যায়ন' : 'Transparent Merit'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">80%+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'উপস্থিতির বাধ্যবাধকতা' : 'Attendance Target'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">5 Members</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'নিরাপত্তা কমিটি' : 'Safety Committee'}
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

      {/* 2. Policy Framework Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {isBn ? 'প্রাতিষ্ঠানিক ভর্তি বিধিমালা' : 'Institutional Policy Areas'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'সুষ্ঠু প্রাতিষ্ঠানিক পরিবেশ এবং শিশুদের সুষ্ঠু বিকাশ নিশ্চিতকল্পে প্রণীত নীতিমালা।'
              : 'Our official code governing admissions, payments, conduct, and safety.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {policies.map((policy, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-xs hover:border-gray-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  {policy.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                  {policy.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {policy.description}
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2.5">
                    {isBn ? 'মূল নির্দেশনাসমূহ:' : 'Key Directives:'}
                  </div>
                  <ul className="space-y-1.5">
                    {policy.guidelines.map((item, gIdx) => (
                      <li key={gIdx} className="flex items-start text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 3. Bottom CTA Banner */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'আবেদন শুরু করতে প্রস্তুত?' : 'Ready to Begin the Admission Process?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'অনলাইনে আবেদন ফরম পূরণ করুন অথবা ভর্তি প্রক্রিয়া সংক্রান্ত বিস্তারিত ধাপসমূহ জেনে নিন।'
                : 'Complete your online application or review the step-by-step application walkthrough.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admission/apply-online"
                className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
              >
                <span>{isBn ? 'অনলাইনে আবেদন করুন' : 'Apply Online'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/admission/how-to-apply"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'আবেদন নির্দেশিকা' : 'How to Apply'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
