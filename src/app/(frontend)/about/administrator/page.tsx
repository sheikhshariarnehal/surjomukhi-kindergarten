'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Building2, 
  BookOpen, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function AdministratorPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const departments = [
    {
      name: isBn ? 'সাধারণ ও ভর্তি প্রশাসন' : 'General & Admissions Administration',
      description: isBn
        ? 'দৈনন্দিন প্রশাসনিক কার্যক্রম, নতুন ছাত্রছাত্রী ভর্তি প্রক্রিয়া, প্রাতিষ্ঠানিক নথি ও রেকর্ড ব্যবস্থাপনা পরিচালনা করে।'
        : 'Oversees daily school operations, student enrollment, academic records, and general institutional coordination.',
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      services: [
        isBn ? 'ছাত্রছাত্রী ভর্তি ও নিবন্ধন' : 'Student registration & admissions',
        isBn ? 'প্রাতিষ্ঠানিক রেকর্ড ও প্রত্যয়নপত্র' : 'Official transcripts & certificates',
        isBn ? 'সাধারণ তথ্য ও অভিভাবক পরামর্শ' : 'General parent consultations',
        isBn ? 'ক্যাম্পাস অবকাঠামো ব্যবস্থাপনা' : 'Campus facility maintenance'
      ]
    },
    {
      name: isBn ? 'একাডেমিক সমন্বয় বিভাগ' : 'Academic Affairs & Curriculum',
      description: isBn
        ? 'পাঠ্যক্রম প্রণয়ন, ক্লাস রুটিন সমন্বয়, শিক্ষক সহায়তা এবং শিক্ষাদানের মান নিয়ন্ত্রণ নিশ্চিত করে।'
        : 'Manages curriculum delivery, teaching schedules, faculty coordination, and academic quality assurance.',
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      services: [
        isBn ? 'জাতীয় পাঠ্যক্রম সমন্বয়' : 'Curriculum standard compliance',
        isBn ? 'ক্লাস রুটিন ও শিক্ষক বণ্টন' : 'Class routine & teacher scheduling',
        isBn ? 'পরীক্ষা ও মূল্যায়ন তদারকি' : 'Exam coordination & grading',
        isBn ? 'শিক্ষক পেশাগত প্রশিক্ষণ' : 'Teacher development programs'
      ]
    },
    {
      name: isBn ? 'শিক্ষার্থী কল্যাণ ও সহ-শিক্ষা' : 'Student Services & Welfare',
      description: isBn
        ? 'শিক্ষার্থীদের শারীরিক ও মানসিক কল্যাণ, সহ-পাঠ্যক্রমিক কার্যক্রম এবং ক্যাম্পাস নিরাপত্তা তদারকি করে।'
        : 'Focuses on child safety, extracurricular events, student health support, and anti-harassment committee oversight.',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      services: [
        isBn ? 'যৌন হয়রানি বিরোধী ৫ সদস্যের কমিটি' : '5-Member safety & anti-harassment committee',
        isBn ? 'বার্ষিক ক্রীড়া ও সাংস্কৃতিক উৎসব' : 'Annual sports & cultural coordination',
        isBn ? 'প্রাথমিক চিকিৎসা ও ফার্স্ট-এইড' : 'On-site basic first-aid support',
        isBn ? 'অভিভাবক-শিক্ষক সভা সমন্বয়' : 'Parent-teacher meeting facilitation'
      ]
    },
    {
      name: isBn ? 'হিসাব ও আর্থিক ব্যবস্থাপনা' : 'Accounts & Finance',
      description: isBn
        ? 'মাসিক বেতন ও ফি গ্রহণ, প্রতিষ্ঠানের বাজেট পরিকল্পনা এবং হিসাব নিরীক্ষণ পরিচালনা করে।'
        : 'Manages fee collection, tuition accounting, budget planning, and transparent fiscal administration.',
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      services: [
        isBn ? 'ভর্তি ও মাসিক ফি গ্রহণ' : 'Tuition & admission fee collection',
        isBn ? 'মেধাবী ও অভাবী শিক্ষার্থীদের বৃত্তি' : 'Merit & need-based scholarship processing',
        isBn ? 'বার্ষিক বাজেট ও আর্থিক বিবরণী' : 'Annual budget planning',
        isBn ? 'হিসাবরক্ষণ ও স্বচ্ছতা নিশ্চিতকরণ' : 'Financial auditing & reporting'
      ]
    }
  ];

  const adminTeam = [
    {
      name: isBn ? 'শেখ ইমরান মাহমুদ' : 'Sheikh Imran Mahmud',
      role: isBn ? 'প্রতিষ্ঠাতা ও স্বত্বাধিকারী / পরিচালক' : 'Founder & Proprietor / Director',
      dept: isBn ? 'সাধারণ প্রশাসন' : 'General Administration',
      contact: '01819198965'
    },
    {
      name: isBn ? 'প্রধান শিক্ষক' : 'Head Teacher',
      role: isBn ? 'সদস্য-সচিব ও একাডেমিক প্রধান' : 'Member-Secretary & Academic Head',
      dept: isBn ? 'একাডেমিক বিষয়ক' : 'Academic Affairs',
      contact: '01711528045'
    },
    {
      name: isBn ? 'প্রশাসনিক কর্মকর্তা' : 'Administrative Officer',
      role: isBn ? 'ভর্তি ও শিক্ষার্থী রেকর্ড ইন-চার্জ' : 'Admissions & Student Records In-Charge',
      dept: isBn ? 'সাধারণ প্রশাসন' : 'General Administration',
      contact: '01954113374'
    },
    {
      name: isBn ? 'হিসাব কর্মকর্তা' : 'Accounts Officer',
      role: isBn ? 'ফি ও হিসাবরক্ষণ ইন-চার্জ' : 'Finance & Fee Collection In-Charge',
      dept: isBn ? 'হিসাব বিভাগ' : 'Accounts Department',
      contact: 'info.surjamukhikindergarten@gmail.com'
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
              {isBn ? 'প্রশাসনিক ব্যবস্থাপনা ও দপ্তর' : 'Administrative Operations'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'সুষ্ঠু পরিচালনা, অভিভাবক সেবা এবং শিক্ষার্থীদের নিরাপদ ও আনন্দময় শিক্ষা পরিবেশ নিশ্চিত করতে আমাদের সার্বক্ষণিক প্রশাসনিক কাঠামো।'
                : 'Ensuring seamless day-to-day operations, parent assistance, transparent administration, and child-safe campus standards.'}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">4</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'প্রশাসনিক বিভাগ' : 'Core Departments'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">8AM – 2PM</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'অফিস সময়সূচী' : 'Office Hours'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">7 Members</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'পরিচালনা কমিটি' : 'Governing Body'}
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

      {/* 2. Administrative Departments */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {isBn ? 'প্রশাসনিক বিভাগ ও সেবাসমূহ' : 'Administrative Departments'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'অভিভাবক, শিক্ষক ও শিক্ষার্থীদের প্রয়োজনীয় সেবা প্রদানে নিয়োজিত বিভাগসমূহ।'
              : 'Dedicated units handling admissions, academic calendars, student support, and finance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {departments.map((dept, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-xs hover:border-gray-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  {dept.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                  {dept.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {dept.description}
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                    {isBn ? 'প্রধান সেবাসমূহ:' : 'Key Functions:'}
                  </div>
                  <ul className="space-y-2">
                    {dept.services.map((service, sIdx) => (
                      <li key={sIdx} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 3. Administration Directory Table */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
              {isBn ? 'প্রশাসনিক কর্মকর্তা ও যোগাযোগ' : 'Administrative Directory'}
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              {isBn
                ? 'সরাসরি তথ্য, ভর্তি সহায়তা বা পরামর্শের জন্য আমাদের কর্মকর্তাদের সাথে যোগাযোগ করুন।'
                : 'Direct contact channels for admissions, student records, and general institutional inquiries.'}
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-2xl border border-gray-100 shadow-xs overflow-hidden divide-y divide-gray-200/60">
            {adminTeam.map((member, idx) => (
              <div key={idx} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-white transition-colors">
                <div>
                  <div className="font-bold text-gray-900 text-base">
                    {member.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {member.role} • {member.dept}
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-blue-600">
                  {member.contact}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Office Summary Box */}
          <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-gray-100 text-center flex flex-col sm:flex-row items-center justify-around gap-4 text-xs sm:text-sm text-gray-700">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-blue-600 mr-2" />
              <span>{isBn ? 'রবি – বৃহস্পতি: সকাল ৮:০০ – দুপুর ২:০০' : 'Sun – Thu: 8:00 AM – 2:00 PM'}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-blue-600 mr-2" />
              <span>{isBn ? 'সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ' : 'Salauddin Complex, Aona Bazar, Nawabganj'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
            {isBn ? 'যেকোনো অনুসন্ধানে আমরা পাশে আছি' : 'Need Assistance with Admissions or Services?'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            {isBn
              ? 'আমাদের প্রশাসন অভিভাবক ও শিক্ষার্থীদের সর্বোচ্চ আন্তরিক সেবা প্রদান করতে প্রতিশ্রুতিবদ্ধ।'
              : 'Our administrative staff is ready to assist with admission forms, school visits, and questions.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
            >
              <span>{isBn ? 'যোগাযোগ করুন' : 'Contact Office'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/admission"
              className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
            >
              <span>{isBn ? 'ভর্তি তথ্য দেখুন' : 'View Admission Guidelines'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
