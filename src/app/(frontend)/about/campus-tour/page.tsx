'use client';

import React, { useMemo } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

// SEO metadata (moved to layout.tsx or metadata.ts for App Router)
// This component uses client-side rendering for language switching

export default function CampusTourPage() {
  const { language } = useTranslation();

  // Memoized content for better performance
  const content = useMemo(() => ({
    meta: {
      title: language === 'bn' 
        ? 'ক্যাম্পাস ট্যুর - সূর্যমুখী কিন্ডারগার্টেন | আমাদের সুবিধাসমূহ দেখুন' 
        : 'Campus Tour - Surjomukhi Kindergarten | Explore Our Facilities',
      description: language === 'bn'
        ? 'সূর্যমুখী কিন্ডারগার্টেনের ক্যাম্পাস ট্যুর। আমাদের আধুনিক খেলার মাঠ, গ্রন্থাগার, শ্রেণীকক্ষ এবং নিরাপদ পরিবেশ দেখুন। শিশুদের জন্য আদর্শ শিক্ষা পরিবেশ।'
        : 'Take a virtual tour of Surjomukhi Kindergarten campus. Explore our modern playground, library, classrooms, and safe learning environment designed for children\'s growth and development.',
    },
    hero: {
      title: language === 'bn' ? 'আমাদের ক্যাম্পাস ঘুরে দেখুন' : 'Explore Our Campus',
      subtitle: language === 'bn'
        ? 'আমাদের সুন্দর, শিশু-বান্ধব সুবিধা ঘুরে দেখুন যা শিশুদের সর্বোত্তম শিক্ষা এবং বিকাশের জন্য ডিজাইন করা হয়েছে।'
        : 'Take a virtual tour of our beautiful, child-friendly facilities designed for optimal learning and development.',
    },
    overview: {
      title: language === 'bn' ? 'নিরাপদ ও উন্নয়নশীল পরিবেশ' : 'A Safe & Nurturing Environment',
      description: language === 'bn'
        ? 'আমাদের ক্যাম্পাসটি সুচিন্তিতভাবে ডিজাইন করা হয়েছে একটি নিরাপদ, উদ্দীপনাময় এবং লালন-পালনমূলক পরিবেশ প্রদান করতে যেখানে শিশুরা শিখতে, খেলতে এবং বেড়ে উঠতে পারে। প্রতিটি স্থান তরুণ শিক্ষার্থীদের মাথায় রেখে তৈরি করা হয়েছে, তাদের আরাম, নিরাপত্তা এবং সংযুক্তি নিশ্চিত করে।'
        : 'Our campus is thoughtfully designed to provide a safe, stimulating, and nurturing environment where children can learn, play, and grow. Every space is created with young learners in mind, ensuring their comfort, safety, and engagement.',
    },
    facilitiesTitle: language === 'bn' ? 'আমাদের সুবিধাসমূহ' : 'Our Facilities',
    facilitiesSubtitle: language === 'bn'
      ? 'বিভিন্ন স্থান এবং সুবিধা আবিষ্কার করুন যা আমাদের ক্যাম্পাসকে বিশেষ করে তোলে।'
      : 'Discover the various spaces and amenities that make our campus special.',
    safetyTitle: language === 'bn' ? 'নিরাপত্তা ও সুরক্ষা' : 'Safety & Security',
    safetySubtitle: language === 'bn'
      ? 'আপনার সন্তানের নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার। আমাদের ক্যাম্পাস ব্যাপক নিরাপত্তা ব্যবস্থা সহ সজ্জিত।'
      : 'Your child\'s safety is our top priority. Our campus is equipped with comprehensive safety measures.',
    ctaTitle: language === 'bn' ? 'ব্যক্তিগত ট্যুর নির্ধারণ করুন' : 'Schedule a Personal Tour',
    ctaSubtitle: language === 'bn'
      ? 'আমরা আপনাকে ব্যক্তিগতভাবে আমাদের ক্যাম্পাসে দেখাতে পছন্দ করব। আমাদের সুবিধা দেখতে এবং আমাদের নিবেদিত দলের সাথে দেখা করতে একটি সফর নির্ধারণ করুন।'
      : 'We\'d love to show you around our campus in person. Schedule a visit to see our facilities and meet our dedicated team.',
    ctaButton1: language === 'bn' ? 'সফর নির্ধারণ করুন' : 'Schedule a Visit',
    ctaButton2: language === 'bn' ? 'ভর্তির জন্য আবেদন করুন' : 'Apply for Admission',
    breadcrumb: {
      home: language === 'bn' ? 'হোম' : 'Home',
      about: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About',
      campusTour: language === 'bn' ? 'ক্যাম্পাস ট্যুর' : 'Campus Tour',
    },
  }), [language]);

  const facilities = useMemo(() => [
    {
      name: language === 'bn' ? 'বিশাল খেলার মাঠ' : 'Large Playground',
      description: language === 'bn'
        ? 'প্রায় ১০০ গজ × ৬০ গজ আয়তনের খেলার মাঠ যেখানে ফুটবল, ক্রিকেট, ব্যাডমিন্টন, দাবা এবং অন্যান্য ক্রীড়া কার্যক্রম অনুষ্ঠিত হয়।'
        : 'Approximately 100 yards × 60 yards playground where football, cricket, badminton, chess, and other athletic activities are held.',
      features: [
        language === 'bn' ? 'ফুটবল মাঠ' : 'Football field',
        language === 'bn' ? 'ক্রিকেট খেলার স্থান' : 'Cricket playing area',
        language === 'bn' ? 'ব্যাডমিন্টন কোর্ট' : 'Badminton court',
        language === 'bn' ? 'দাবা খেলার এলাকা' : 'Chess playing area'
      ],
      icon: '🏟️'
    },
    {
      name: language === 'bn' ? 'কার্যকর গ্রন্থাগার' : 'Functional Library',
      description: language === 'bn'
        ? 'প্রধান শিক্ষকের তত্ত্বাবধানে পরিচালিত গ্রন্থাগার যেখানে শিক্ষার্থীদের জন্য বিভিন্ন শিক্ষামূলক বই ও উপকরণ রয়েছে।'
        : 'Operational library managed under Head Teacher\'s supervision with various educational books and materials for students.',
      features: [
        language === 'bn' ? 'শিক্ষামূলক বই' : 'Educational books',
        language === 'bn' ? 'গল্পের বই' : 'Story books',
        language === 'bn' ? 'পাঠ্য উপকরণ' : 'Learning materials',
        language === 'bn' ? 'নিয়মিত তত্ত্বাবধান' : 'Regular supervision'
      ],
      icon: '📚'
    },
    {
      name: language === 'bn' ? 'শ্রেণীকক্ষ' : 'Classrooms',
      description: language === 'bn'
        ? 'প্রাথমিক বিদ্যালয়ের মানসম্মত শ্রেণীকক্ষ যেখানে প্রাক-প্রাথমিক থেকে পঞ্চম শ্রেণী পর্যন্ত পাঠদান করা হয়।'
        : 'Standard primary school classrooms where teaching is conducted from pre-primary to fifth grade.',
      features: [
        language === 'bn' ? 'প্রাক-প্রাথমিক শ্রেণী' : 'Pre-primary class',
        language === 'bn' ? 'প্রথম থেকে পঞ্চম শ্রেণী' : 'Class One to Five',
        language === 'bn' ? 'শিক্ষা উপকরণ' : 'Educational materials',
        language === 'bn' ? 'উপযুক্ত আসবাবপত্র' : 'Appropriate furniture'
      ],
      icon: '🏫'
    },
    {
      name: language === 'bn' ? 'প্রশাসনিক কার্যালয়' : 'Administrative Office',
      description: language === 'bn'
        ? 'প্রধান শিক্ষক ও প্রশাসনিক কর্মকর্তাদের কার্যালয় যেখানে সকল প্রশাসনিক কাজকর্ম পরিচালিত হয়।'
        : 'Head Teacher and administrative staff office where all administrative work is conducted.',
      features: [
        language === 'bn' ? 'প্রধান শিক্ষকের কক্ষ' : 'Head Teacher\'s room',
        language === 'bn' ? 'প্রশাসনিক কাজ' : 'Administrative work',
        language === 'bn' ? 'নথি সংরক্ষণ' : 'Document storage',
        language === 'bn' ? 'অভিভাবক সাক্ষাৎ' : 'Parent meetings'
      ],
      icon: '🏢'
    },
    {
      name: language === 'bn' ? 'নিরাপদ নথি সংরক্ষণাগার' : 'Secure Document Storage',
      description: language === 'bn'
        ? 'অগ্নিনিরোধক নিরাপদ সংরক্ষণাগার যেখানে প্রতিষ্ঠানের গুরুত্বপূর্ণ নথিপত্র সংরক্ষিত থাকে।'
        : 'Fireproof safe storage where important institutional documents are preserved.',
      features: [
        language === 'bn' ? 'অগ্নিনিরোধক নিরাপত্তা' : 'Fireproof security',
        language === 'bn' ? 'গুরুত্বপূর্ণ নথি' : 'Important documents',
        language === 'bn' ? 'প্রধান শিক্ষকের তত্ত্বাবধান' : 'Head Teacher\'s custody',
        language === 'bn' ? 'নিয়ন্ত্রিত প্রবেশাধিকার' : 'Controlled access'
      ],
      icon: '🗄️'
    },
    {
      name: language === 'bn' ? 'সাংস্কৃতিক কার্যক্রমের স্থান' : 'Cultural Activities Area',
      description: language === 'bn'
        ? 'নিয়মিত সাংস্কৃতিক প্রতিযোগিতা ও সাপ্তাহিক সমাবেশ অনুষ্ঠানের জন্য নির্ধারিত স্থান।'
        : 'Designated area for regular cultural competitions and weekly assembly programs.',
      features: [
        language === 'bn' ? 'সাংস্কৃতিক প্রতিযোগিতা' : 'Cultural competitions',
        language === 'bn' ? 'সাপ্তাহিক সমাবেশ' : 'Weekly assemblies',
        language === 'bn' ? 'জাতীয় দিবস পালন' : 'National day observances',
        language === 'bn' ? 'বিশেষ অনুষ্ঠান' : 'Special programs'
      ],
      icon: '🎭'
    }
  ], [language]);

  const safetyFeatures = useMemo(() => [
    {
      icon: '🔒',
      title: language === 'bn' ? 'নিরাপদ প্রবেশদ্বার' : 'Secure Entry',
      description: language === 'bn' 
        ? 'দর্শক ব্যবস্থাপনা সিস্টেম সহ নিয়ন্ত্রিত প্রবেশাধিকার'
        : 'Controlled access with visitor management system',
      color: 'bg-blue-50'
    },
    {
      icon: '📹',
      title: language === 'bn' ? 'সিসিটিভি পর্যবেক্ষণ' : 'CCTV Monitoring',
      description: language === 'bn'
        ? 'উন্নত নিরাপত্তার জন্য ২৪/৭ নজরদারি'
        : '24/7 surveillance for enhanced security',
      color: 'bg-green-50'
    },
    {
      icon: '🚨',
      title: language === 'bn' ? 'জরুরি ব্যবস্থা' : 'Emergency Systems',
      description: language === 'bn'
        ? 'অগ্নি নিরাপত্তা এবং জরুরি প্রতিক্রিয়া প্রোটোকল'
        : 'Fire safety and emergency response protocols',
      color: 'bg-yellow-50'
    },
    {
      icon: '👥',
      title: language === 'bn' ? 'প্রশিক্ষিত কর্মী' : 'Trained Staff',
      description: language === 'bn'
        ? 'প্রাথমিক চিকিৎসা সার্টিফাইড এবং নিরাপত্তা প্রশিক্ষিত কর্মী'
        : 'First aid certified and safety trained personnel',
      color: 'bg-purple-50'
    }
  ], [language]);

  const campusImages = useMemo(() => [
    {
      src: '/images/Annual Sports Day (1).webp',
      alt: language === 'bn' 
        ? 'বার্ষিক ক্রীড়া দিবস - ক্যাম্পাস কার্যক্রম'
        : 'Annual Sports Day - Campus Activity',
    },
    {
      src: '/images/Annual Sports Day (2).webp',
      alt: language === 'bn'
        ? 'বার্ষিক ক্রীড়া দিবস - শিক্ষার্থী কার্যক্রম'
        : 'Annual Sports Day - Student Activities',
    },
    {
      src: '/images/Annual Sports Day.webp',
      alt: language === 'bn'
        ? 'বার্ষিক ক্রীড়া দিবস - ক্যাম্পাস অনুষ্ঠান'
        : 'Annual Sports Day - Campus Event',
    }
  ], [language]);

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Surjomukhi Kindergarten",
            "url": "https://surjomukhikindergarten.com/about/campus-tour",
            "description": content.meta.description,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bangladesh"
            },
            "image": campusImages.map(img => `https://surjomukhikindergarten.com${img.src}`),
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb - SEO Optimized */}
        <nav className="bg-white border-b" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <ol className="flex items-center space-x-2 sm:space-x-4 text-sm sm:text-base" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  href="/" 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{content.breadcrumb.home}</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li>
                <span className="text-gray-400" aria-hidden="true">/</span>
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  href="/about" 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{content.breadcrumb.about}</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li>
                <span className="text-gray-400" aria-hidden="true">/</span>
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-gray-900 font-medium" itemProp="name">
                  {content.breadcrumb.campusTour}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section - Optimized for Mobile */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                {content.hero.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                {content.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Campus Overview */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                {content.overview.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                {content.overview.description}
              </p>
            </div>

            {/* Campus Image Gallery - Optimized with Next.js Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
              {campusImages.map((image, index) => (
                <div 
                  key={index}
                  className="relative h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden shadow-lg group"
                >
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities - Responsive Grid */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                {content.facilitiesTitle}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                {content.facilitiesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {facilities.map((facility, index) => (
                <article 
                  key={index} 
                  className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl lg:text-4xl mr-3 sm:mr-4" aria-hidden="true">
                      {facility.icon}
                    </span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                      {facility.name}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                    {facility.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                      {language === 'bn' ? 'বৈশিষ্ট্য:' : 'Features:'}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                      {facility.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-start text-xs sm:text-sm text-gray-600"
                        >
                          <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Features - Mobile-First Grid */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                {content.safetyTitle}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                {content.safetySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {safetyFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 sm:p-6 ${feature.color} rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Responsive Buttons */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-teal-600 to-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
              {content.ctaTitle}
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              {content.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <a
                href="/contact"
                className="w-full sm:w-auto bg-white text-teal-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                aria-label={content.ctaButton1}
              >
                {content.ctaButton1}
              </a>
              <a
                href="/admission"
                className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                aria-label={content.ctaButton2}
              >
                {content.ctaButton2}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
