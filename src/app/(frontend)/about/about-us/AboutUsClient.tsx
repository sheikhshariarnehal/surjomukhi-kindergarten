'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';

// Types
interface ContactInfo {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface SchoolIdeal {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Facility {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Governance {
  position: string;
  role: string;
  icon: string;
}

interface ListItem {
  text: string;
  icon: string;
}

interface StaticData {
  contactInfo: { en: ContactInfo[]; bn: ContactInfo[] };
  schoolIdeals: { en: SchoolIdeal[]; bn: SchoolIdeal[] };
  facilities: { en: Facility[]; bn: Facility[] };
  governance: { en: Governance[]; bn: Governance[] };
  missionItems: { en: ListItem[]; bn: ListItem[] };
  visionItems: { en: ListItem[]; bn: ListItem[] };
}

interface AboutUsClientProps {
  staticData: StaticData;
}

// Memoized Components for Performance
const HeroBadge = memo(({ children }: { children: React.ReactNode }) => (
  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/30 text-sm sm:text-base lg:text-lg whitespace-nowrap">
    {children}
  </span>
));
HeroBadge.displayName = 'HeroBadge';

const IdealCard = memo(({ ideal }: { ideal: SchoolIdeal }) => (
  <article className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
    <div className="text-center">
      <div 
        className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${ideal.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
        aria-hidden="true"
      >
        <span className="text-white text-2xl sm:text-3xl">{ideal.icon}</span>
      </div>
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
        {ideal.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
        {ideal.description}
      </p>
    </div>
  </article>
));
IdealCard.displayName = 'IdealCard';

const FacilityCard = memo(({ facility }: { facility: Facility }) => (
  <article className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
    <div className="text-center">
      <div 
        className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${facility.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
        aria-hidden="true"
      >
        <span className="text-white text-xl sm:text-2xl">{facility.icon}</span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        {facility.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
        {facility.description}
      </p>
    </div>
  </article>
));
FacilityCard.displayName = 'FacilityCard';

const ContactCard = memo(({ contact }: { contact: ContactInfo }) => (
  <article className="group bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 sm:p-8 rounded-2xl border border-blue-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div 
      className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
      aria-hidden="true"
    >
      <span className="text-white text-xl sm:text-2xl">{contact.icon}</span>
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
      {contact.label}
    </h3>
    <p className="text-gray-700 leading-relaxed break-words text-sm sm:text-base">
      {contact.value}
    </p>
  </article>
));
ContactCard.displayName = 'ContactCard';

const SupportCard = memo(({ 
  icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  gradient: string;
}) => (
  <article className="text-center group">
    <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <span className="text-white text-2xl sm:text-3xl" aria-hidden="true">{icon}</span>
    </div>
    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
      {title}
    </h4>
    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
      {description}
    </p>
  </article>
));
SupportCard.displayName = 'SupportCard';

export default function AboutUsClient({ staticData }: AboutUsClientProps) {
  const { language } = useTranslation();
  const lang = language === 'bn' ? 'bn' : 'en';

  // Memoized data selection
  const contactInfo = useMemo(() => staticData.contactInfo[lang], [lang, staticData.contactInfo]);
  const schoolIdeals = useMemo(() => staticData.schoolIdeals[lang], [lang, staticData.schoolIdeals]);
  const facilities = useMemo(() => staticData.facilities[lang], [lang, staticData.facilities]);
  const governance = useMemo(() => staticData.governance[lang], [lang, staticData.governance]);
  const missionItems = useMemo(() => staticData.missionItems[lang], [lang, staticData.missionItems]);
  const visionItems = useMemo(() => staticData.visionItems[lang], [lang, staticData.visionItems]);

  // Memoized text content
  const content = useMemo(() => ({
    heroTitle: lang === 'bn' ? 'সূর্যমুখী কিন্ডারগার্টেন' : 'Surjomukhi Kindergarten',
    heroSubtitle: lang === 'bn'
      ? 'সৃজনশীল, মূল্যবোধভিত্তিক শিক্ষার মাধ্যমে একটি প্রগতিশীল সমাজ গড়ে তোলার অগ্রযাত্রায় আমাদের সাথে যুক্ত হন'
      : 'Join us in building a progressive society through creative, value-based education that nurtures young minds',
    badges: {
      established: lang === 'bn' ? '🏛️ প্রতিষ্ঠিত ২০০৪' : '🏛️ Est. 2004',
      medium: lang === 'bn' ? '📚 বাংলা মাধ্যম' : '📚 Bangla Medium',
      classes: lang === 'bn' ? '🎓 প্লে - ৫ম শ্রেণী' : '🎓 Play - Grade 5',
      students: lang === 'bn' ? '👥 ৫৫+ শিক্ষার্থী' : '👥 55+ Students',
    },
    idealsTitle: lang === 'bn' ? 'আমাদের আদর্শ ও মূলমন্ত্র' : 'Our Ideals & Principles',
    idealsDescription: lang === 'bn'
      ? 'আমাদের প্রতিষ্ঠানের মূল ভিত্তি যা শিক্ষা দর্শনকে পরিচালিত করে'
      : 'The fundamental ideals that guide our educational philosophy',
    aboutTitle: lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Our Institution',
    aboutDescription: lang === 'bn'
      ? 'সূর্যমুখী কিন্ডারগার্টেন একটি বেসরকারি প্রাথমিক শিক্ষা প্রতিষ্ঠান যা ০১ জানুয়ারি ২০০৪ সালে প্রতিষ্ঠিত। স্কুলটি প্লে গ্রুপ থেকে ৫ম শ্রেণী পর্যন্ত বাংলা মাধ্যমে শিক্ষা প্রদান করে।'
      : 'Surjomukhi Kindergarten is a private primary educational institution established on January 1, 2004. The school offers instruction in Bangla medium from Play Group to Grade 5.',
    established: lang === 'bn' ? 'প্রতিষ্ঠাকাল:' : 'Established:',
    establishedValue: lang === 'bn' ? '০১ জানুয়ারি ২০০৪' : 'January 1, 2004',
    medium: lang === 'bn' ? 'শিক্ষার মাধ্যম:' : 'Medium:',
    mediumValue: lang === 'bn' ? 'বাংলা' : 'Bangla',
    classesLabel: lang === 'bn' ? 'শ্রেণীসমূহ:' : 'Classes:',
    classesValue: lang === 'bn' ? 'প্লে গ্রুপ থেকে ৫ম শ্রেণী' : 'Play Group to Grade 5',
    studentsLabel: lang === 'bn' ? 'শিক্ষার্থী সংখ্যা:' : 'Students:',
    studentsValue: lang === 'bn' ? '৫৫+ জন' : '55+ Students',
    keyInfo: lang === 'bn' ? 'আমাদের গুরুত্বপূর্ণ তথ্য' : 'Key Information',
    missionTitle: lang === 'bn' ? 'আমাদের মিশন' : 'Our Mission',
    visionTitle: lang === 'bn' ? 'আমাদের ভিশন' : 'Our Vision',
    academicsTitle: lang === 'bn' ? 'একাডেমিক' : 'Academics',
    academicsDescription: lang === 'bn'
      ? 'নার্সারি থেকে ৫ম শ্রেণী পর্যন্ত বাংলা মাধ্যমে শিক্ষা প্রদান করা হয়।'
      : 'Instruction is provided in Bangla medium from nursery to Grade 5.',
    governanceTitle: lang === 'bn' ? 'পরিচালনা পর্ষদ' : 'Governance',
    governanceDescription: lang === 'bn'
      ? 'সাত সদস্যের পরিচালনা কমিটি প্রশাসনিক কার্যক্রম নিশ্চিত করে।'
      : 'A seven-member governing body ensures proper administration.',
    facilitiesTitle: lang === 'bn' ? 'আমাদের সুবিধাসমূহ' : 'Our Facilities',
    facilitiesDescription: lang === 'bn'
      ? 'শিক্ষার্থীদের সামগ্রিক উন্নয়নের জন্য আধুনিক সুবিধা'
      : 'Modern facilities for holistic student development',
    supportTitle: lang === 'bn' ? 'শিক্ষার্থী সহায়তা' : 'Student Support',
    library: lang === 'bn' ? 'গ্রন্থাগার' : 'Library',
    libraryDesc: lang === 'bn' ? 'সম্পদ অনুযায়ী গ্রন্থাগার প্রতিষ্ঠা' : 'Establishing a library as resources allow',
    scholarships: lang === 'bn' ? 'বৃত্তি' : 'Scholarships',
    scholarshipsDesc: lang === 'bn' ? 'প্রাতিষ্ঠানিক পরীক্ষার মাধ্যমে বৃত্তি' : 'Scholarships through examinations',
    safety: lang === 'bn' ? 'নিরাপত্তা কমিটি' : 'Safety Committee',
    safetyDesc: lang === 'bn' ? 'পাঁচ সদস্যের যৌন হয়রানি বিরোধী কমিটি' : 'Anti-Sexual Harassment Committee',
    contactTitle: lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Information',
    contactDescription: lang === 'bn'
      ? 'আমাদের সাথে যোগাযোগ করতে নিচের তথ্যগুলো ব্যবহার করুন'
      : 'Feel free to contact us using the information below',
    ctaTitle: lang === 'bn' ? 'আজই যোগ দিন' : 'Join Us Today',
    ctaDescription: lang === 'bn'
      ? 'আপনার সন্তানের উজ্জ্বল ভবিষ্যতের জন্য আজই ভর্তি হোন'
      : 'Enroll your child today for a bright future',
    applyNow: lang === 'bn' ? 'এখনই আবেদন করুন' : 'Apply Now',
    contactUs: lang === 'bn' ? 'যোগাযোগ' : 'Contact Us',
  }), [lang]);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 sm:py-16 lg:py-20 overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <h1 
              id="hero-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              itemProp="name"
            >
              {content.heroTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed opacity-95">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4">
              <HeroBadge>{content.badges.established}</HeroBadge>
              <HeroBadge>{content.badges.medium}</HeroBadge>
              <HeroBadge>{content.badges.classes}</HeroBadge>
              <HeroBadge>{content.badges.students}</HeroBadge>
            </div>
          </header>
        </div>
      </section>

      {/* School Ideals Section */}
      <section 
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"
        aria-labelledby="ideals-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 
              id="ideals-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            >
              {content.idealsTitle}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {content.idealsDescription}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {schoolIdeals.map((ideal, index) => (
              <IdealCard key={index} ideal={ideal} />
            ))}
          </div>
        </div>
      </section>

      {/* About Institution Section */}
      <section 
        className="py-12 sm:py-16 lg:py-20 bg-white"
        aria-labelledby="about-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 lg:mb-20">
            {/* About Content */}
            <div>
              <h2 
                id="about-title"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8"
              >
                {content.aboutTitle}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                {content.aboutDescription}
              </p>
              <dl className="space-y-4 sm:space-y-6">
                {[
                  { icon: '🏛️', label: content.established, value: content.establishedValue },
                  { icon: '📚', label: content.medium, value: content.mediumValue },
                  { icon: '🎓', label: content.classesLabel, value: content.classesValue },
                  { icon: '👥', label: content.studentsLabel, value: content.studentsValue },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-blue-600 mr-3 sm:mr-4 text-xl sm:text-2xl" aria-hidden="true">{item.icon}</span>
                    <div>
                      <dt className="inline font-semibold text-gray-900 text-sm sm:text-base">{item.label}</dt>
                      <dd className="inline text-gray-700 ml-2 text-sm sm:text-base">{item.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Key Information Card */}
            <aside className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-blue-100 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-6 sm:mb-8 text-center">
                {content.keyInfo}
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: '💡', text: lang === 'bn' ? '"শিক্ষাই জাতির মেরুদণ্ড"' : '"Education is the backbone of the nation"' },
                  { icon: '☮️', text: lang === 'bn' ? '"শান্তিই পরম ধর্ম"' : '"Peace is the supreme virtue"' },
                  { icon: '🤝', text: lang === 'bn' ? 'ঐক্য ও অগ্রগতির চেতনা' : 'Spirit of unity and progress' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-3 sm:mr-4 text-xl sm:text-2xl" aria-hidden="true">{item.icon}</span>
                      <span className="text-blue-700 font-medium text-sm sm:text-base lg:text-lg">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            {/* Mission */}
            <article className="bg-gradient-to-br from-green-50 to-blue-50 p-6 sm:p-8 rounded-xl lg:rounded-2xl border border-green-100">
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4 sm:mb-6 flex items-center">
                <span className="mr-2 sm:mr-3" aria-hidden="true">🎯</span>
                {content.missionTitle}
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-green-700">
                {missionItems.map((item, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base">
                    <span className="text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0" aria-hidden="true">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Vision */}
            <article className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 sm:p-8 rounded-xl lg:rounded-2xl border border-purple-100">
              <h3 className="text-xl sm:text-2xl font-bold text-purple-800 mb-4 sm:mb-6 flex items-center">
                <span className="mr-2 sm:mr-3" aria-hidden="true">🌟</span>
                {content.visionTitle}
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-purple-700">
                {visionItems.map((item, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base">
                    <span className="text-purple-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0" aria-hidden="true">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Academics & Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Academics */}
            <article>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <span className="mr-2 sm:mr-3" aria-hidden="true">📚</span>
                {content.academicsTitle}
              </h3>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  {content.academicsDescription}
                </p>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  {[
                    lang === 'bn' ? 'প্রাক-প্রাথমিক: ৩০ শিক্ষার্থী' : 'Pre-primary: 30 students',
                    lang === 'bn' ? '১ম শ্রেণী: ২৫ শিক্ষার্থী' : 'Grade 1: 25 students',
                    lang === 'bn' ? 'অন্যান্য শ্রেণী: কাঠামোবদ্ধ ভর্তি' : 'Other grades: Structured enrollment',
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3 flex-shrink-0" aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Governance */}
            <article>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <span className="mr-2 sm:mr-3" aria-hidden="true">🏛️</span>
                {content.governanceTitle}
              </h3>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  {content.governanceDescription}
                </p>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  {governance.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <span className="font-medium">{item.position}:</span> {item.role}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section 
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50"
        aria-labelledby="facilities-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 
              id="facilities-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            >
              {content.facilitiesTitle}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {content.facilitiesDescription}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 lg:mb-16">
            {facilities.map((facility, index) => (
              <FacilityCard key={index} facility={facility} />
            ))}
          </div>

          {/* Student Support */}
          <article className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center flex items-center justify-center">
              <span className="mr-3 sm:mr-4 text-2xl sm:text-3xl lg:text-4xl" aria-hidden="true">🎓</span>
              {content.supportTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <SupportCard
                icon="📚"
                title={content.library}
                description={content.libraryDesc}
                gradient="from-blue-500 to-purple-600"
              />
              <SupportCard
                icon="🏆"
                title={content.scholarships}
                description={content.scholarshipsDesc}
                gradient="from-green-500 to-blue-600"
              />
              <SupportCard
                icon="🛡️"
                title={content.safety}
                description={content.safetyDesc}
                gradient="from-red-500 to-pink-600"
              />
            </div>
          </article>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        className="py-12 sm:py-16 lg:py-20 bg-white"
        aria-labelledby="contact-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 
              id="contact-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            >
              {content.contactTitle}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {content.contactDescription}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {contactInfo.map((contact, index) => (
              <ContactCard key={index} contact={contact} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
        aria-labelledby="cta-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            id="cta-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
          >
            {content.ctaTitle}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-95 max-w-2xl mx-auto">
            {content.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/admission"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              {content.applyNow}
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200 text-sm sm:text-base"
            >
              {content.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
