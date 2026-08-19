'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Heart, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Activity, 
  BookOpen, 
  ShieldCheck, 
  Layout, 
  Briefcase, 
  ArrowRight,
  Target,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

interface ContactInfo {
  label: string;
  value: string;
  icon: string;
}

interface SchoolIdeal {
  title: string;
  description: string;
  icon: string;
}

interface Facility {
  title: string;
  description: string;
  icon: string;
}

interface Governance {
  position: string;
  role: string;
}

interface StaticData {
  contactInfo: { en: ContactInfo[]; bn: ContactInfo[] };
  schoolIdeals: { en: SchoolIdeal[]; bn: SchoolIdeal[] };
  facilities: { en: Facility[]; bn: Facility[] };
  governance: { en: Governance[]; bn: Governance[] };
  missionItems: { en: string[]; bn: string[] };
  visionItems: { en: string[]; bn: string[] };
}

interface AboutUsClientProps {
  staticData: StaticData;
}

const renderIcon = (iconName: string, className: string = 'w-5 h-5') => {
  switch (iconName) {
    case 'graduation-cap':
      return <GraduationCap className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'users':
      return <Users className={className} />;
    case 'map-pin':
      return <MapPin className={className} />;
    case 'phone':
      return <Phone className={className} />;
    case 'mail':
      return <Mail className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'activity':
      return <Activity className={className} />;
    case 'book-open':
      return <BookOpen className={className} />;
    case 'shield-check':
      return <ShieldCheck className={className} />;
    case 'layout':
      return <Layout className={className} />;
    case 'briefcase':
      return <Briefcase className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};

export default function AboutUsClient({ staticData }: AboutUsClientProps) {
  const { language } = useTranslation();
  const lang = language === 'bn' ? 'bn' : 'en';

  const contactInfo = useMemo(() => staticData.contactInfo[lang], [lang, staticData.contactInfo]);
  const schoolIdeals = useMemo(() => staticData.schoolIdeals[lang], [lang, staticData.schoolIdeals]);
  const facilities = useMemo(() => staticData.facilities[lang], [lang, staticData.facilities]);
  const governance = useMemo(() => staticData.governance[lang], [lang, staticData.governance]);
  const missionItems = useMemo(() => staticData.missionItems[lang], [lang, staticData.missionItems]);
  const visionItems = useMemo(() => staticData.visionItems[lang], [lang, staticData.visionItems]);

  const isBn = lang === 'bn';

  return (
    <div className="min-h-screen">
      {/* 1. Harmonious Institutional Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              {isBn ? 'সূর্যমুখী কিন্ডারগার্টেন পরিচিতি' : 'About Surjomukhi Kindergarten'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? '২০০৪ সাল থেকে নবাবগঞ্জ, ঢাকায় প্লে গ্রুপ থেকে ৫ম শ্রেণী পর্যন্ত মানবিক মূল্যবোধ ও সৃজনশীলতার সমন্বয়ে মানসম্মত প্রাথমিক শিক্ষা প্রদানকারী একটি বিশ্বস্ত প্রতিষ্ঠান।'
                : 'A distinguished private primary educational institution established in 2004, nurturing creativity, ethics, and holistic academic excellence from Play to Grade 5 in Nawabganj, Dhaka.'}
            </p>

            {/* Clean Metrics Band with Hairline Dividers */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tabular-nums">2004</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'প্রতিষ্ঠাকাল' : 'Established'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                  {isBn ? 'বাংলা' : 'Bangla'}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'শিক্ষার মাধ্যম' : 'Medium of Instruction'}
                </div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Play – 5</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {isBn ? 'শ্রেণীসমূহ' : 'Academic Levels'}
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

      {/* 2. Core Ideals & Philosophy */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
              {isBn ? 'আমাদের আদর্শ ও মূলমন্ত্র' : 'Our Guiding Ideals'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? 'যে মৌলিক দর্শন ও নীতির ওপর ভিত্তি করে আমাদের প্রতিটি শিক্ষা কার্যক্রম পরিচালিত হয়।'
                : 'The enduring foundational principles guiding our educational philosophy and student care.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {schoolIdeals.map((ideal, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="p-7 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  {renderIcon(ideal.icon, 'w-6 h-6')}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                  {ideal.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {ideal.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About the School & Mission / Vision */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left: School Narrative */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                {isBn ? 'প্রতিষ্ঠানের ইতিহাস ও পটভূমি' : 'Our Story & Foundation'}
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {isBn
                  ? 'সূর্যমুখী কিন্ডারগার্টেন ০১ জানুয়ারি ২০০৪ সালে ঢাকা জেলার নবাবগঞ্জ উপজেলার আওনা বাজার সংলগ্ন সালাউদ্দিন কমপ্লেক্সে প্রতিষ্ঠিত হয়। শুরু থেকেই প্রতিষ্ঠানটি স্থানীয় শিশুদের মধ্যে মানসম্পন্ন প্রাথমিক শিক্ষা বিস্তার এবং সৃজনশীল মেধা বিকাশের লক্ষ্যে নিবেদিতভাবে কাজ করে যাচ্ছে।'
                  : 'Surjomukhi Kindergarten was founded on January 1, 2004, at Salauddin Complex, Aona Bazar, in the historic upazila of Nawabganj, Dhaka. Since inception, our school has remained devoted to expanding quality primary education, moral values, and creative potential among children in the local community.'}
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {isBn
                  ? 'প্লে গ্রুপ, নার্সারি থেকে ৫ম শ্রেণী পর্যন্ত শিক্ষার্থীদের জন্য রয়েছে অভিজ্ঞ শিক্ষক মণ্ডলী, শিশুবান্ধব শ্রেণীকক্ষ এবং পাঠ্যক্রমিক ও সহ-পাঠ্যক্রমিক কার্যক্রমের সুসমন্বিত ব্যবস্থা।'
                  : 'From Nursery to Grade 5, our certified educators combine standard Bangla medium curriculum with creative arts, moral education, physical training, and individualized care.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-slate-50/80 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    {isBn ? 'ক্যাম্পাস অবস্থান' : 'Campus Location'}
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {isBn ? 'সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ' : 'Salauddin Complex, Aona Bazar, Nawabganj'}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50/80 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    {isBn ? 'শ্রেণী কাঠামো' : 'Academic Structure'}
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {isBn ? 'প্লে গ্রুপ হতে ৫ম শ্রেণী' : 'Play Group through Grade 5'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Mission & Vision */}
            <div className="space-y-6">
              {/* Mission */}
              <div className="p-7 rounded-2xl bg-slate-50/80 border border-gray-100 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    {isBn ? 'আমাদের মিশন (Mission)' : 'Our Mission'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {missionItems.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vision */}
              <div className="p-7 rounded-2xl bg-slate-50/80 border border-gray-100 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    {isBn ? 'আমাদের ভিশন (Vision)' : 'Our Vision'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {visionItems.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Campus Facilities & Infrastructure */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
              {isBn ? 'ক্যাম্পাস সুবিধাসমূহ' : 'Campus Facilities'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? 'শিশুদের শারীরিক, মানসিক ও বুদ্ধিবৃত্তিক বিকাশের জন্য সুপরিকল্পিত পরিবেশ ও সুবিধাদি।'
                : 'Purpose-built infrastructure designed to foster intellectual growth, recreation, and safety.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  {renderIcon(fac.icon, 'w-5 h-5')}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5 tracking-tight">
                  {fac.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {fac.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Governance & Management Structure */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
              {isBn ? 'পরিচালনা পর্ষদ' : 'Governance & Leadership'}
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              {isBn
                ? 'প্রাতিষ্ঠানিক স্বচ্ছতা ও প্রাতিষ্ঠানিক মান নিশ্চিতকরণে ৭ সদস্যবিশিষ্ট কার্যনির্বাহী কমিটি।'
                : 'A dedicated governing body ensuring academic standards, transparent administration, and student welfare.'}
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-2xl border border-gray-100 shadow-xs overflow-hidden divide-y divide-gray-200/60">
            {governance.map((gov, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 hover:bg-white transition-colors">
                <div className="font-bold text-gray-900 text-sm sm:text-base">
                  {gov.position}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">
                  {gov.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Information & Admissions CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
              {isBn ? 'যোগাযোগের ঠিকানা' : 'Contact & Inquiries'}
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              {isBn
                ? 'ভর্তি, তথ্য বা যেকোনো পরামর্শের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।'
                : 'Get in touch with our administration for admissions, campus visits, or general inquiries.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {contactInfo.map((contact, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xs transition-all text-center flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  {renderIcon(contact.icon, 'w-5 h-5')}
                </div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  {contact.label}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 break-words max-w-full">
                  {contact.value}
                </p>
              </div>
            ))}
          </div>

          {/* Admission CTA Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-md">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              {isBn ? 'আপনার সন্তানের উজ্জ্বল ভবিষ্যতের সূচনা হোক এখানে' : 'Begin Your Child’s Educational Journey'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isBn
                ? 'প্লে গ্রুপ হতে ৫ম শ্রেণীতে সীমিত আসনে ভর্তি চলছে। বিস্তারিত জানতে আজই আবেদন করুন।'
                : 'Admissions are now open for Nursery through Grade 5. Contact our office or apply online.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admission"
                className="inline-flex items-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all touch-manipulation"
              >
                <span>{isBn ? 'ভর্তি তথ্য দেখুন' : 'View Admission Details'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all touch-manipulation"
              >
                <span>{isBn ? 'যোগাযোগ করুন' : 'Contact Administration'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
