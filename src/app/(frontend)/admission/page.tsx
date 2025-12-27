'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from '@/contexts/LanguageContext';

// Enhanced SEO and Schema Data
const SCHOOL_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Surjomukhi Kindergarten",
  "alternateName": "সূর্যমুখী কিন্ডারগার্টেন",
  "url": "https://surjamukhikindergarten.com",
  "logo": "https://surjamukhikindergarten.com/logo.webp",
  "description": "Premier Bangla medium kindergarten education from Nursery to Grade 5 since 2004. Quality education, sports, cultural activities, and safe learning environment in Nawabganj, Dhaka.",
  "foundingDate": "2004-01-01",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Salauddin Complex, Aona Bazar",
    "addressLocality": "Nawabganj",
    "addressRegion": "Dhaka",
    "postalCode": "1320",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.8103",
    "longitude": "90.4125"
  },
  "telephone": ["+880-1954113374"],
  "email": "info.surjamukhikindergarten@gmail.com",
  "sameAs": [
    "https://www.facebook.com/surjamukhikindergarten",
    "https://www.youtube.com/surjamukhikindergarten"
  ],
  "priceRange": "৳300-৳500",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Educational Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Nursery Education",
          "description": "Pre-primary education for young children"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Course",
          "name": "Primary Education Grade 1-5",
          "description": "Bangla medium primary education"
        }
      }
    ]
  },
  "areaServed": {
    "@type": "Place",
    "name": "Nawabganj, Dhaka, Bangladesh"
  }
};

// Enhanced school data with better structure
const SCHOOL_INFO = {
  established: '2004',
  address: 'Salauddin Complex, Aona Bazar, Nawabganj, Dhaka-1320',
  phones: ['01954113374'],
  email: 'info.surjamukhikindergarten@gmail.com',
  website: 'https://surjamukhikindergarten.com',
  medium: 'Bangla',
  grades: 'Nursery to Grade 5',
  studentCapacity: '155 students across 6 classes',
  establishedYear: 2004,
  accreditation: 'Government Approved Primary School'
};

// TypeScript interfaces for better type safety
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
}

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

// Enhanced memoized components with professional styling
const FeatureCard = React.memo<FeatureCardProps>(({ title, description, icon }) => (
  <article className="group bg-white rounded-lg p-3 xs:p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200 h-full transform hover:-translate-y-1">
    {icon && (
      <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mb-2 xs:mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
        <span className="text-base xs:text-lg sm:text-xl lg:text-2xl" role="img" aria-hidden="true">{icon}</span>
      </div>
    )}
    <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 xs:mb-2 sm:mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed text-xs xs:text-sm sm:text-sm lg:text-base line-clamp-4">
      {description}
    </p>
  </article>
));

const ProcessStep = React.memo<ProcessStepProps>(({ step, title, description, icon }) => (
  <div className="text-center group" role="listitem">
    <div className="relative mx-auto mb-2 xs:mb-3 sm:mb-4">
      <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-xs xs:text-sm sm:text-base lg:text-lg font-bold mx-auto shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        {icon ? <span role="img" aria-hidden="true">{icon}</span> : step}
      </div>
      {step < 4 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-12 h-0.5 bg-gradient-to-r from-blue-300 to-gray-200 transform -translate-y-1/2 translate-x-3"></div>
      )}
    </div>
    <h3 className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1.5 xs:mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600 text-xs xs:text-xs sm:text-sm lg:text-base leading-relaxed px-1 xs:px-2 lg:px-4">
      {description}
    </p>
  </div>
));

const AdmissionPage = () => {
  const { language } = useTranslation();

  // Enhanced SEO meta injection with comprehensive optimization
  React.useEffect(() => {
    // Add structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(SCHOOL_SCHEMA);
    document.head.appendChild(script);

    // Enhanced page title with keywords
    const pageTitle = language === 'en' 
      ? 'Admission 2024-25 - Surjomukhi Kindergarten | Premier Bangla Medium Education Since 2004 | Nawabganj, Dhaka'
      : 'ভর্তি ২০২৪-২৫ - সূর্যমুখী কিন্ডারগার্টেন | ২০০ৄ সাল থেকে প্রিমিয়ার বাংলা মাধ্যম শিক্ষা | নবাবগঞ্জ, ঢাকা';
    
    document.title = pageTitle;
    
    // Enhanced meta description with rich content
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', language === 'en'
      ? 'Apply for admission at Surjomukhi Kindergarten 2024-25. Premier Bangla medium education from Nursery to Grade 5. Established 2004. Safe environment, sports, cultural activities. Located in Nawabganj, Dhaka. Affordable fees starting ৳300/month.'
      : 'সূর্যমুখী কিন্ডারগার্টেনে ২০২৪-২৫ শিক্ষাবর্ষে ভর্তির জন্য আবেদন করুন। নার্সারি থেকে পঞ্চম শ্রেণী পর্যন্ত প্রিমিয়ার বাংলা মাধ্যম শিক্ষা। ২০০৪ সালে প্রতিষ্ঠিত। নিরাপদ পরিবেশ, খেলাধুলা, সাংস্কৃতিক কার্যক্রম। নবাবগঞ্জ, ঢাকায় অবস্থিত। সাশ্রয়ী ফি মাসিক ৳৩০০ থেকে শুরু।'
    );
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    // Add Open Graph meta tags for better social sharing
    const ogTags = [
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: metaDescription.getAttribute('content') },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://surjamukhikindergarten.com/admission' },
      { property: 'og:image', content: 'https://surjamukhikindergarten.com/og-admission.jpg' },
      { property: 'og:site_name', content: 'Surjomukhi Kindergarten' },
      { property: 'og:locale', content: language === 'en' ? 'en_US' : 'bn_BD' }
    ];

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content || '');
    });

    // Add Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: metaDescription.getAttribute('content') || '' },
      { name: 'twitter:image', content: 'https://surjamukhikindergarten.com/twitter-admission.jpg' }
    ];

    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content || '');
    });

    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://surjamukhikindergarten.com/admission');

    // Add hreflang for multilingual SEO
    const hreflangLinks = [
      { lang: 'en', href: 'https://surjamukhikindergarten.com/admission?lang=en' },
      { lang: 'bn', href: 'https://surjamukhikindergarten.com/admission?lang=bn' },
      { lang: 'x-default', href: 'https://surjamukhikindergarten.com/admission' }
    ];

    hreflangLinks.forEach(link => {
      let hreflangLink = document.querySelector(`link[hreflang="${link.lang}"]`);
      if (!hreflangLink) {
        hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', link.lang);
        document.head.appendChild(hreflangLink);
      }
      hreflangLink.setAttribute('href', link.href);
    });

    return () => {
      // Enhanced cleanup
      const elementsToRemove = [
        'script[type="application/ld+json"]',
        'meta[property^="og:"]',
        'meta[name^="twitter:"]',
        'link[rel="canonical"]',
        'link[rel="alternate"][hreflang]'
      ];
      
      elementsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => element.remove());
      });
    };
  }, [language]);

  // Enhanced data arrays with icons and better professional structure
  const schoolFeatures = React.useMemo(() => [
    {
      id: 'bangla-education',
      icon: '📚',
      title: language === 'en' ? 'Premier Bangla Medium Education' : 'প্রিমিয়ার বাংলা মাধ্যম শিক্ষা',
      description: language === 'en' 
        ? 'Comprehensive Bangla medium curriculum from Nursery to Grade 5, designed to build strong academic foundations while preserving cultural heritage and values.'
        : 'নার্সারি থেকে পঞ্চম শ্রেণী পর্যন্ত ব্যাপক বাংলা মাধ্যম পাঠ্যক্রম, যা সাংস্কৃতিক ঐতিহ্য ও মূল্যবোধ সংরক্ষণ করার পাশাপাশি শক্তিশালী একাডেমিক ভিত্তি তৈরি করার জন্য ডিজাইন করা।'
    },
    {
      id: 'creative-education',
      icon: '🎨',
      title: language === 'en' ? 'Creative & Ethical Development' : 'সৃজনশীল ও নৈতিক উন্নয়ন',
      description: language === 'en' 
        ? 'Holistic education approach fostering creativity, critical thinking, moral values, and character development through innovative teaching methodologies.'
        : 'উদ্ভাবনী শিক্ষা পদ্ধতির মাধ্যমে সৃজনশীলতা, সমালোচনামূলক চিন্তা, নৈতিক মূল্যবোধ এবং চরিত্র উন্নয়নে সামগ্রিক শিক্ষা পদ্ধতি।'
    },
    {
      id: 'sports-culture',
      icon: '⚽',
      title: language === 'en' ? 'Sports & Cultural Excellence' : 'খেলাধুলা ও সাংস্কৃতিক উৎকর্ষতা',
      description: language === 'en' 
        ? 'Comprehensive sports program including football, cricket, badminton, chess, and rich cultural activities with annual competitions to develop physical and artistic talents.'
        : 'শারীরিক ও শৈল্পিক প্রতিভা বিকাশের জন্য ফুটবল, ক্রিকেট, ব্যাডমিন্টন, দাবা এবং বার্ষিক প্রতিযোগিতা সহ সমৃদ্ধ সাংস্কৃতিক কার্যক্রম সহ ব্যাপক খেলাধুলা কর্মসূচি।'
    },
    {
      id: 'safe-environment',
      icon: '🛡️',
      title: language === 'en' ? 'Safe & Secure Environment' : 'নিরাপদ ও সুরক্ষিত পরিবেশ',
      description: language === 'en' 
        ? 'Fully secured campus with modern safety measures, CCTV surveillance, trained security personnel, and dedicated Anti-Sexual Harassment Committee ensuring child protection.'
        : 'আধুনিক নিরাপত্তা ব্যবস্থা, সিসিটিভি নিরীক্ষণ, প্রশিক্ষিত নিরাপত্তা কর্মী এবং শিশু সুরক্ষা নিশ্চিত করার জন্য নিবেদিত যৌন হয়রানি বিরোধী কমিটি সহ সম্পূর্ণ সুরক্ষিত ক্যাম্পাস।'
    },
    {
      id: 'student-support',
      icon: '🎓',
      title: language === 'en' ? 'Comprehensive Student Support' : 'ব্যাপক শিক্ষার্থী সহায়তা',
      description: language === 'en' 
        ? 'Merit-based scholarship programs, individualized attention, special needs support, and comprehensive counseling services to ensure every child reaches their potential.'
        : 'মেধাভিত্তিক বৃত্তি কর্মসূচি, ব্যক্তিগতকৃত মনোযোগ, বিশেষ চাহিদা সহায়তা এবং প্রতিটি শিশু তার সম্ভাবনায় পৌঁছানো নিশ্চিত করতে ব্যাপক কাউন্সেলিং সেবা।'
    },
    {
      id: 'regular-programs',
      icon: '📅',
      title: language === 'en' ? 'Enriching Regular Programs' : 'সমৃদ্ধ নিয়মিত কার্যক্রম',
      description: language === 'en' 
        ? 'Daily morning assemblies, debate competitions, Cub Scout activities, regular parent-teacher conferences, and community engagement programs for well-rounded development.'
        : 'সুসংগত উন্নয়নের জন্য দৈনিক প্রাতঃকালীন সমাবেশ, বিতর্ক প্রতিযোগিতা, কাব স্কাউট কার্যক্রম, নিয়মিত অভিভাবক-শিক্ষক সম্মেলন এবং সম্প্রদায়িক অংশগ্রহণ কর্মসূচি।'
    }
  ], [language]);

  const admissionSteps = React.useMemo(() => [
    {
      step: 1,
      icon: '📝',
      title: language === 'en' ? 'Submit Application' : 'আবেদন জমা দিন',
      description: language === 'en' 
        ? 'Complete our comprehensive online application form with all required documents and academic records for review.'
        : 'পর্যালোচনার জন্য সমস্ত প্রয়োজনীয় নথি এবং একাডেমিক রেকর্ড সহ আমাদের ব্যাপক অনলাইন আবেদন ফর্ম পূরণ করুন।'
    },
    {
      step: 2,
      icon: '🔍',
      title: language === 'en' ? 'Document Verification' : 'কাগজপত্র যাচাই',
      description: language === 'en' 
        ? 'Our experienced admissions team carefully reviews and verifies all submitted documents for authenticity and completeness.'
        : 'আমাদের অভিজ্ঞ ভর্তি দল সত্যতা এবং সম্পূর্ণতার জন্য সমস্ত জমা দেওয়া নথি সাবধানে পর্যালোচনা এবং যাচাই করে।'
    },
    {
      step: 3,
      icon: '🏫',
      title: language === 'en' ? 'Campus Visit & Interview' : 'ক্যাম্পাস ভিজিট ও সাক্ষাৎকার',
      description: language === 'en' 
        ? 'Visit our modern campus facilities, meet experienced teachers, and participate in a friendly interview to assess suitability.'
        : 'আমাদের আধুনিক ক্যাম্পাস সুবিধা দেখুন, অভিজ্ঞ শিক্ষকদের সাথে দেখা করুন এবং উপযুক্ততা মূল্যায়নের জন্য একটি বন্ধুত্বপূর্ণ সাক্ষাৎকারে অংশগ্রহণ করুন।'
    },
    {
      step: 4,
      icon: '✅',
      title: language === 'en' ? 'Admission Confirmation' : 'ভর্তি নিশ্চিতকরণ',
      description: language === 'en' 
        ? 'Receive official admission confirmation, complete enrollment procedures, and begin your child\'s educational journey with us.'
        : 'অফিসিয়াল ভর্তি নিশ্চিতকরণ পান, তালিকাভুক্তি পদ্ধতি সম্পূর্ণ করুন এবং আমাদের সাথে আপনার সন্তানের শিক্ষার যাত্রা শুরু করুন।'
    }
  ], [language]);

  const feeStructure = React.useMemo(() => [
    { class: 'Pre-Primary/Nursery', classBn: 'প্রাক-প্রাথমিক/নার্সারি', students: 30, monthly: 300, admission: 500, total: 800 },
    { class: 'Class One', classBn: 'প্রথম শ্রেণী', students: 25, monthly: 350, admission: 600, total: 950 },
    { class: 'Class Two', classBn: 'দ্বিতীয় শ্রেণী', students: 25, monthly: 400, admission: 600, total: 1000 },
    { class: 'Class Three', classBn: 'তৃতীয় শ্রেণী', students: 25, monthly: 450, admission: 700, total: 1150 },
    { class: 'Class Four', classBn: 'চতুর্থ শ্রেণী', students: 25, monthly: 500, admission: 800, total: 1300 },
    { class: 'Class Five', classBn: 'পঞ্চম শ্রেণী', students: 25, monthly: 500, admission: 800, total: 1300 },
  ], []);

  const requiredDocuments = React.useMemo(() => [
    language === 'en' ? 'Birth certificate (original + 2 copies)' : 'জন্ম সনদ (মূল + ২ কপি)',
    language === 'en' ? 'Recent passport-size photographs (4 copies)' : 'সাম্প্রতিক পাসপোর্ট সাইজ ছবি (৪ কপি)',
    language === 'en' ? 'Parent/Guardian national ID (copy)' : 'অভিভাবক জাতীয় পরিচয়পত্র (কপি)',
    language === 'en' ? 'Address verification document' : 'ঠিকানা যাচাইকরণ নথি',
    language === 'en' ? 'Medical certificate from registered doctor' : 'নিবন্ধিত ডাক্তারের কাছ থেকে চিকিৎসা সনদ',
    language === 'en' ? 'Previous school transfer certificate (if applicable)' : 'পূর্ববর্তী স্কুল স্থানান্তর সনদ (প্রযোজ্য হলে)'
  ], [language]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header Section with better professional styling */}
      <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 opacity-5 transform translate-x-16 -translate-y-16" viewBox="0 0 200 200" fill="currentColor">
              <circle cx="100" cy="100" r="80"/>
            </svg>
            <svg className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 opacity-5 transform -translate-x-12 translate-y-12" viewBox="0 0 200 200" fill="currentColor">
              <polygon points="100,20 180,170 20,170"/>
            </svg>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-5 sm:py-8 lg:py-12">
          {/* Enhanced Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-3 xs:mb-4 sm:mb-6">
            <ol className="flex items-center space-x-1 xs:space-x-2 text-blue-100 text-xs xs:text-sm font-medium">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-white transition-colors duration-200 flex items-center space-x-1" 
                  aria-label="Go to homepage"
                >
                  <span>🏠</span>
                  <span className="hidden xs:inline">{language === 'en' ? 'Home' : 'হোম'}</span>
                </Link>
              </li>
              <li aria-hidden="true" className="text-blue-300">/</li>
              <li aria-current="page" className="text-white font-semibold flex items-center space-x-1">
                <span>🎓</span>
                <span>{language === 'en' ? 'Admission' : 'ভর্তি'}</span>
              </li>
            </ol>
          </nav>

          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-2 xs:mb-3 sm:mb-4">
              <span className="inline-flex items-center px-2 xs:px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30">
                <span className="mr-1 xs:mr-2">🌟</span>
                <span className="text-xs xs:text-sm">{language === 'en' ? 'Admission Open 2024-25' : 'ভর্তি চালু ২০২৪-২৫'}</span>
              </span>
            </div>
            
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 xs:mb-3 sm:mb-4 leading-tight tracking-tight px-2 xs:px-0">
              {language === 'en' ? 'Join Surjomukhi Kindergarten' : 'সূর্যমুখী কিন্ডারগার্টেনে যোগ দিন'}
            </h1>
            
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-1.5 xs:mb-2 sm:mb-3 text-blue-100 px-2 xs:px-0">
              {language === 'en' ? 'Premier Bangla Medium Education Since 2004' : '২০০৪ সাল থেকে প্রিমিয়ার বাংলা মাধ্যম শিক্ষা'}
            </p>
            
            <p className="text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-6 text-blue-100 leading-relaxed px-3 xs:px-2 sm:px-0 max-w-4xl mx-auto">
              {language === 'en' 
                ? 'Building character, nurturing creativity, and fostering excellence through quality education, sports, and cultural programs in a safe and supportive environment.'
                : 'নিরাপদ ও সহায়ক পরিবেশে মানসম্পন্ন শিক্ষা, খেলাধুলা এবং সাংস্কৃতিক কর্মসূচির মাধ্যমে চরিত্র গঠন, সৃজনশীলতা লালন এবং উৎকর্ষতা বৃদ্ধি।'
              }
            </p>

            {/* Enhanced Call-to-Action Buttons */}
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center px-3 xs:px-4 sm:px-0">
              <Link
                href="#admission-process"
                className="group inline-flex items-center justify-center bg-white text-blue-600 px-4 xs:px-5 sm:px-6 lg:px-7 py-2 xs:py-2.5 sm:py-3 lg:py-3.5 rounded-lg font-bold text-xs xs:text-sm sm:text-base lg:text-lg hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                aria-label="Start admission application process"
              >
                <span className="mr-1.5 xs:mr-2 group-hover:scale-105 transition-transform duration-300">🚀</span>
                <span className="text-xs xs:text-sm sm:text-base lg:text-lg">{language === 'en' ? 'Start Application' : 'আবেদন শুরু করুন'}</span>
              </Link>
              
              <Link
                href="#school-features"
                className="group inline-flex items-center justify-center border-2 border-white text-white px-4 xs:px-5 sm:px-6 lg:px-7 py-2 xs:py-2.5 sm:py-3 lg:py-3.5 rounded-lg font-bold text-xs xs:text-sm sm:text-base lg:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-0.5"
                aria-label="Learn more about school features"
              >
                <span className="mr-1.5 xs:mr-2 group-hover:scale-105 transition-transform duration-300">📖</span>
                <span className="text-xs xs:text-sm sm:text-base lg:text-lg">{language === 'en' ? 'Explore Features' : 'বৈশিষ্ট্য দেখুন'}</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 xs:mt-5 sm:mt-8 pt-4 xs:pt-5 sm:pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
                <div className="text-center">
                  <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5 xs:mb-1">20+</div>
                  <div className="text-xs leading-tight text-blue-100">{language === 'en' ? 'Years Experience' : 'বছরের অভিজ্ঞতা'}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5 xs:mb-1">155+</div>
                  <div className="text-xs leading-tight text-blue-100">{language === 'en' ? 'Happy Students' : 'খুশি শিক্ষার্থী'}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5 xs:mb-1">6</div>
                  <div className="text-xs leading-tight text-blue-100">{language === 'en' ? 'Grade Levels' : 'শ্রেণী স্তর'}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5 xs:mb-1">100%</div>
                  <div className="text-xs leading-tight text-blue-100">{language === 'en' ? 'Safe Environment' : 'নিরাপদ পরিবেশ'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content with better spacing and professional design */}
      <main className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-5 sm:py-8 lg:py-12">
        {/* Enhanced School Features Section */}
        <section id="school-features" className="mb-6 xs:mb-8 sm:mb-12 lg:mb-16" aria-labelledby="features-heading">
          <div className="text-center mb-4 xs:mb-5 sm:mb-8 lg:mb-12">
            <div className="inline-flex items-center px-2 xs:px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium mb-2 xs:mb-3 sm:mb-4">
              <span className="mr-1 xs:mr-2">✨</span>
              <span className="text-xs xs:text-sm">{language === 'en' ? 'Why Choose Us' : 'কেন আমাদের বেছে নিবেন'}</span>
            </div>
            
            <h2 id="features-heading" className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 tracking-tight px-2 xs:px-0">
              {language === 'en' ? 'Excellence in Every Aspect' : 'প্রতিটি দিকে উৎকর্ষতা'}
            </h2>
            
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-3 xs:px-2 sm:px-0">
              {language === 'en'
                ? 'Discover what makes Surjomukhi Kindergarten the premier choice for quality Bangla medium education and holistic child development.'
                : 'আবিষ্কার করুন কী সূর্যমুখী কিন্ডারগার্টেনকে মানসম্পন্ন বাংলা মাধ্যম শিক্ষা এবং সামগ্রিক শিশু উন্নয়নের জন্য প্রিমিয়ার পছন্দ করে তোলে।'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
            {schoolFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </section>

        {/* Admission Requirements Section */}
        <section id="admission-requirements" className="mb-6 xs:mb-7 sm:mb-10 lg:mb-12" aria-labelledby="requirements-heading">
          <div className="bg-white rounded-lg p-3 xs:p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
              <h2 id="requirements-heading" className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1.5 xs:mb-2 sm:mb-3 tracking-tight px-2 xs:px-0">
                {language === 'en' ? 'Admission Requirements' : 'ভর্তির প্রয়োজনীয়তা'}
              </h2>
              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-3 xs:px-2 sm:px-0 max-w-3xl mx-auto">
                {language === 'en'
                  ? 'Everything you need to know about our admission requirements and documentation.'
                  : 'আমাদের ভর্তির প্রয়োজনীয়তা এবং ডকুমেন্টেশন সম্পর্কে আপনার যা জানা দরকার।'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
              {/* Required Documents */}
              <div>
                <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                  {language === 'en' ? 'Required Documents' : 'প্রয়োজনীয় কাগজপত্র'}
                </h3>
                <ol className="space-y-1.5 xs:space-y-2 sm:space-y-2.5" role="list">
                  {requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-start space-x-2 xs:space-x-3 p-2 xs:p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors duration-200">
                      <div className="w-4 h-4 xs:w-5 xs:h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 text-xs leading-relaxed">{doc}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Class Information */}
              <div>
                <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                  {language === 'en' ? 'Class Information' : 'শ্রেণীর তথ্য'}
                </h3>
                <div className="space-y-1.5 xs:space-y-2">
                  {feeStructure.map((cls, index) => (
                    <div key={index} className="flex justify-between items-center p-2 xs:p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors duration-200">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-xs">
                          {language === 'en' ? cls.class : cls.classBn}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-blue-600 font-bold text-xs xs:text-sm">
                          {cls.students} {language === 'en' ? 'students' : 'শিক্ষার্থী'}
                        </span>
                        <div className="text-xs text-gray-500 leading-tight">
                          {language === 'en' ? 'max capacity' : 'সর্বোচ্চ ধারণক্ষমতা'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 xs:mt-4 p-2 xs:p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-1.5 xs:space-x-2">
                    <span className="text-amber-600 text-sm xs:text-lg" aria-hidden="true">💡</span>
                    <div>
                      <p className="text-xs font-medium text-amber-800">
                        {language === 'en' ? 'Important Note' : 'গুরুত্বপূর্ণ নোট'}
                      </p>
                      <p className="text-xs text-amber-700 mt-0.5 xs:mt-1 leading-relaxed">
                        {language === 'en'
                          ? 'Limited seats available per class. Admission is subject to seat availability and merit-based selection.'
                          : 'প্রতি শ্রেণীতে সীমিত আসন উপলব্ধ। ভর্তি আসনের প্রাপ্যতা এবং মেধাভিত্তিক নির্বাচনের উপর নির্ভরশীল।'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Admission Process Section with better UX */}
        <section id="admission-process" className="mb-6 xs:mb-8 sm:mb-12 lg:mb-16" aria-labelledby="process-heading">
          <div className="text-center mb-4 xs:mb-5 sm:mb-8 lg:mb-12">
            <div className="inline-flex items-center px-2 xs:px-3 py-1 rounded-full bg-green-50 text-green-600 font-medium mb-2 xs:mb-3 sm:mb-4">
              <span className="mr-1 xs:mr-2">🎯</span>
              <span className="text-xs xs:text-sm">{language === 'en' ? 'Simple Process' : 'সহজ প্রক্রিয়া'}</span>
            </div>
            
            <h2 id="process-heading" className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 tracking-tight px-2 xs:px-0">
              {language === 'en' ? 'Your Path to Admission' : 'ভর্তির পথ'}
            </h2>
            
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-3 xs:px-2 sm:px-0">
              {language === 'en'
                ? 'Follow our streamlined four-step process to secure your child\'s place at Surjomukhi Kindergarten.'
                : 'সূর্যমুখী কিন্ডারগার্টেনে আপনার সন্তানের স্থান সুরক্ষিত করতে আমাদের সুশৃঙ্খল চার-ধাপের প্রক্রিয়া অনুসরণ করুন।'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8 relative">
            {admissionSteps.map((step) => (
              <ProcessStep
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </div>

          <div className="text-center mt-4 xs:mt-5 sm:mt-8 lg:mt-12">
            <div className="flex flex-col xs:flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center">
              <Link
                href="/admission/apply"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 xs:px-5 sm:px-7 lg:px-8 py-2.5 xs:py-3 sm:py-3.5 lg:py-4 rounded-lg font-bold text-sm xs:text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                aria-label="Start your admission application now"
              >
                <span className="mr-1.5 xs:mr-2 group-hover:scale-105 transition-transform duration-300">🚀</span>
                <span className="text-sm xs:text-base sm:text-lg">{language === 'en' ? 'Start Your Application' : 'আপনার আবেদন শুরু করুন'}</span>
              </Link>
              
              <Link
                href="#contact-information"
                className="group inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-4 xs:px-5 sm:px-7 lg:px-8 py-2.5 xs:py-3 sm:py-3.5 lg:py-4 rounded-lg font-bold text-sm xs:text-base sm:text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-0.5"
                aria-label="Get help with admission process"
              >
                <span className="mr-1.5 xs:mr-2 group-hover:scale-105 transition-transform duration-300">💬</span>
                <span className="text-sm xs:text-base sm:text-lg">{language === 'en' ? 'Need Help?' : 'সাহায্য দরকার?'}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Fee Structure Section */}
        <section id="fee-structure" className="mb-6 xs:mb-7 sm:mb-10 lg:mb-12" aria-labelledby="fees-heading">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-3 xs:p-4 sm:p-5 lg:p-6 border border-gray-200">
            <div className="text-center mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
              <h2 id="fees-heading" className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1.5 xs:mb-2 sm:mb-3 tracking-tight px-2 xs:px-0">
                {language === 'en' ? 'Transparent Fee Structure' : 'স্বচ্ছ ফি কাঠামো'}
              </h2>
              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-3 xs:px-2 sm:px-0 max-w-3xl mx-auto">
                {language === 'en'
                  ? 'Affordable, transparent pricing with no hidden costs.'
                  : 'কোন লুকানো খরচ ছাড়াই সাশ্রয়ী, স্বচ্ছ মূল্য।'
                }
              </p>
            </div>

            {/* Fee Table - Enhanced for Mobile */}
            <div className="overflow-x-auto mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
              <table className="w-full bg-white rounded-lg shadow-sm overflow-hidden min-w-[500px] xs:min-w-[550px] sm:min-w-[600px]">
                <caption className="sr-only">
                  {language === 'en' ? 'Fee structure for all classes' : 'সকল শ্রেণীর ফি কাঠামো'}
                </caption>
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th scope="col" className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-left font-bold text-xs">
                      {language === 'en' ? 'Class' : 'শ্রেণী'}
                    </th>
                    <th scope="col" className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-center font-bold text-xs">
                      {language === 'en' ? 'Capacity' : 'ধারণক্ষমতা'}
                    </th>
                    <th scope="col" className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-center font-bold text-xs">
                      {language === 'en' ? 'Monthly Fee' : 'মাসিক ফি'}
                    </th>
                    <th scope="col" className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-center font-bold text-xs">
                      {language === 'en' ? 'Admission Fee' : 'ভর্তি ফি'}
                    </th>
                    <th scope="col" className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-center font-bold text-xs">
                      {language === 'en' ? 'First Month Total' : 'প্রথম মাসের মোট'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((fee, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}>
                      <th scope="row" className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 font-semibold text-gray-900 text-left text-xs">
                        {language === 'en' ? fee.class : fee.classBn}
                      </th>
                      <td className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-center text-gray-700 text-xs">
                        {fee.students} {language === 'en' ? 'students' : 'শিক্ষার্থী'}
                      </td>
                      <td className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-center">
                        <span className="text-blue-600 font-bold text-xs xs:text-sm sm:text-base">৳{fee.monthly}</span>
                      </td>
                      <td className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-center">
                        <span className="text-green-600 font-bold text-xs xs:text-sm sm:text-base">৳{fee.admission}</span>
                      </td>
                      <td className="px-2 xs:px-2 sm:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-center">
                        <span className="text-purple-600 font-bold text-xs xs:text-sm sm:text-base">৳{fee.total}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payment Information */}
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 lg:gap-5">
              <div className="bg-white p-2.5 xs:p-3 sm:p-4 lg:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-900 mb-1.5 xs:mb-2 sm:mb-3 text-xs xs:text-sm sm:text-base lg:text-lg">
                  {language === 'en' ? 'Payment Methods' : 'পেমেন্ট পদ্ধতি'}
                </h3>
                <ul className="text-gray-600 space-y-1 xs:space-y-1.5 sm:space-y-2 text-xs">
                  <li className="flex items-center">
                    <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-1.5 xs:mr-2 flex-shrink-0"></span>
                    {language === 'en' ? 'Cash payments' : 'নগদ পেমেন্ট'}
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-1.5 xs:mr-2 flex-shrink-0"></span>
                    {language === 'en' ? 'Bank transfer' : 'ব্যাংক ট্রান্সফার'}
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-1.5 xs:mr-2 flex-shrink-0"></span>
                    {language === 'en' ? 'Mobile banking' : 'মোবাইল ব্যাংকিং'}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-2.5 xs:p-3 sm:p-4 lg:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-900 mb-1.5 xs:mb-2 sm:mb-3 text-xs xs:text-sm sm:text-base lg:text-lg">
                  {language === 'en' ? 'Payment Schedule' : 'পেমেন্ট সময়সূচী'}
                </h3>
                <ul className="text-gray-600 space-y-1 xs:space-y-1.5 sm:space-y-2 text-xs">
                  <li className="flex items-center">
                    <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 xs:mr-2 flex-shrink-0"></span>
                    {language === 'en' ? 'Due by 10th of each month' : 'প্রতি মাসের ১০ তারিখের মধ্যে'}
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 xs:mr-2 flex-shrink-0"></span>
                    {language === 'en' ? 'Late fee applies after 15th' : '১৫ তারিখের পর দেরি ফি'}
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 xs:mr-2 flex-shrink-0"></span>
                    {language === 'en' ? 'Advance payment discounts' : 'অগ্রিম পেমেন্ট ছাড়'}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-2.5 xs:p-3 sm:p-4 lg:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 col-span-1 xs:col-span-1 sm:col-span-2 lg:col-span-1">
                <h3 className="font-bold text-gray-900 mb-1.5 xs:mb-2 sm:mb-3 text-xs xs:text-sm sm:text-base lg:text-lg">
                  {language === 'en' ? 'Special Offers' : 'বিশেষ অফার'}
                </h3>
                <ul className="text-gray-600 space-y-1 xs:space-y-1.5 sm:space-y-2 text-xs">
                  <li className="flex items-center">
                    <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mr-1.5 xs:mr-2 flex-shrink-0"></span>
                    {language === 'en' ? 'Sibling discounts available' : 'ভাইবোন ছাড় উপলব্ধ'}
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mr-1.5 xs:mr-2 flex-shrink-0"></span>
                    {language === 'en' ? 'Early bird registration' : 'প্রাথমিক নিবন্ধন'}
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mr-1.5 xs:mr-2 flex-shrink-0"></span>
                    {language === 'en' ? 'Financial aid programs' : 'আর্থিক সহায়তা কর্মসূচি'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section id="contact-information" className="mb-6 xs:mb-7 sm:mb-10 lg:mb-12" aria-labelledby="contact-heading">
          <div className="bg-white rounded-lg p-3 xs:p-4 sm:p-5 lg:p-6 shadow-md border border-gray-100">
            <div className="text-center mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
              <h2 id="contact-heading" className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1.5 xs:mb-2 sm:mb-3 tracking-tight px-2 xs:px-0">
                {language === 'en' ? 'Contact Information' : 'যোগাযোগের তথ্য'}
              </h2>
              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-3 xs:px-2 sm:px-0">
                {language === 'en'
                  ? 'Have questions? Our admissions team is here to help you.'
                  : 'প্রশ্ন আছে? আমাদের ভর্তি দল আপনাকে সাহায্য করার জন্য এখানে আছে।'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
              {/* Contact Details */}
              <div className="space-y-3 xs:space-y-4 sm:space-y-5">
                <address className="not-italic">
                  <div className="flex items-start space-x-2 xs:space-x-2 sm:space-x-3 mb-3 xs:mb-4 sm:mb-5">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <span className="text-sm xs:text-base sm:text-lg lg:text-xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 xs:mb-1 sm:mb-2 text-xs xs:text-sm sm:text-base lg:text-lg">
                        {language === 'en' ? 'Phone Numbers' : 'ফোন নম্বর'}
                      </h3>
                      <div className="space-y-0.5 xs:space-y-1 text-gray-600">
                        <p className="text-xs leading-tight">
                          <span className="sr-only">{language === 'en' ? 'Main Office:' : 'প্রধান অফিস:'}</span>
                          <a href={`tel:+880${SCHOOL_INFO.phones[0]}`} className="hover:text-blue-600 transition-colors">
                            {language === 'en' ? 'Main Office:' : 'প্রধান অফিস:'} {SCHOOL_INFO.phones[0]}
                          </a>
                        </p>
                        <p className="text-xs leading-tight">
                          <span className="sr-only">{language === 'en' ? 'Alternative:' : 'বিকল্প:'}</span>
                          <a href={`tel:+880${SCHOOL_INFO.phones[1]}`} className="hover:text-blue-600 transition-colors">
                            {language === 'en' ? 'Alternative:' : 'বিকল্প:'} {SCHOOL_INFO.phones[1]}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 xs:space-x-2 sm:space-x-3 mb-3 xs:mb-4 sm:mb-5">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <span className="text-sm xs:text-base sm:text-lg lg:text-xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 xs:mb-1 sm:mb-2 text-xs xs:text-sm sm:text-base lg:text-lg">
                        {language === 'en' ? 'Email & Website' : 'ইমেইল ও ওয়েবসাইট'}
                      </h3>
                      <div className="space-y-0.5 xs:space-y-1 text-gray-600">
                        <p className="text-xs leading-tight">
                          <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-blue-600 transition-colors break-all">
                            {SCHOOL_INFO.email}
                          </a>
                        </p>
                        <p className="text-xs leading-tight">
                          <a href={SCHOOL_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors break-all">
                            {SCHOOL_INFO.website}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 xs:space-x-2 sm:space-x-3 mb-3 xs:mb-4 sm:mb-5">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <span className="text-sm xs:text-base sm:text-lg lg:text-xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 xs:mb-2 sm:mb-3 text-xs xs:text-sm sm:text-base lg:text-lg">
                        {language === 'en' ? 'School Address' : 'স্কুলের ঠিকানা'}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-xs">
                        {SCHOOL_INFO.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 xs:space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <span className="text-sm xs:text-base sm:text-lg lg:text-xl">🕒</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 xs:mb-2 sm:mb-3 text-xs xs:text-sm sm:text-base lg:text-lg">
                        {language === 'en' ? 'Office Hours' : 'অফিস সময়'}
                      </h3>
                      <div className="space-y-0.5 xs:space-y-1 text-gray-600 text-xs leading-tight">
                        <p>{language === 'en' ? 'Sunday - Thursday: 8:00 AM - 5:00 PM' : 'রবিবার - বৃহস্পতিবার: সকাল ৮:০০ - বিকাল ৫:০০'}</p>
                        <p>{language === 'en' ? 'Friday: 8:00 AM - 12:00 PM' : 'শুক্রবার: সকাল ৮:০০ - দুপুর ১২:০০'}</p>
                        <p>{language === 'en' ? 'Saturday: Closed' : 'শনিবার: বন্ধ'}</p>
                      </div>
                    </div>
                  </div>
                </address>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-3 xs:space-y-4 sm:space-y-5">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 xs:p-4 sm:p-5 lg:p-6 rounded-lg border border-blue-200">
                  <h3 className="text-sm xs:text-base sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5">
                    {language === 'en' ? 'Quick Actions' : 'দ্রুত কার্যক্রম'}
                  </h3>
                  <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                    <Link
                      href="/admission/apply"
                      className="block w-full bg-blue-600 text-white text-center py-2 xs:py-2.5 sm:py-3.5 px-3 xs:px-4 sm:px-5 rounded-lg font-semibold text-xs xs:text-sm sm:text-base hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                      aria-label="Apply for admission online"
                    >
                      {language === 'en' ? 'Apply Online Now' : 'এখনই অনলাইনে আবেদন করুন'}
                    </Link>
                    
                    <Link
                      href="/contact"
                      className="block w-full border-2 border-blue-600 text-blue-600 text-center py-2 xs:py-2.5 sm:py-3.5 px-3 xs:px-4 sm:px-5 rounded-lg font-semibold text-xs xs:text-sm sm:text-base hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      aria-label="Contact us for more information"
                    >
                      {language === 'en' ? 'Contact Us' : 'আমাদের সাথে যোগাযোগ করুন'}
                    </Link>
                    
                    <a
                      href="/school-brochure.pdf"
                      className="block w-full border-2 border-gray-400 text-gray-700 text-center py-2 xs:py-2.5 sm:py-3.5 px-3 xs:px-4 sm:px-5 rounded-lg font-semibold text-xs xs:text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Download school brochure (PDF)"
                    >
                      {language === 'en' ? 'Download Brochure' : 'ব্রোশিউর ডাউনলোড করুন'}
                    </a>
                    
                    <a
                      href={`tel:+880${SCHOOL_INFO.phones[0]}`}
                      className="block w-full border-2 border-green-500 text-green-600 text-center py-2 xs:py-2.5 sm:py-3.5 px-3 xs:px-4 sm:px-5 rounded-lg font-semibold text-xs xs:text-sm sm:text-base hover:bg-green-50 transition-colors duration-200"
                      aria-label={`Call us at ${SCHOOL_INFO.phones[0]}`}
                    >
                      {language === 'en' ? 'Call Now' : 'এখনই কল করুন'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 xs:py-5 sm:py-8 lg:py-10" aria-labelledby="cta-heading">
        <div className="max-w-6xl mx-auto text-center px-3 xs:px-4 sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 lg:mb-5 leading-tight tracking-tight px-2 xs:px-0">
            {language === 'en' ? 'Ready to Begin?' : 'শুরু করতে প্রস্তুত?'}
          </h2>
          <p className="text-xs xs:text-sm sm:text-base lg:text-lg mb-3 xs:mb-4 sm:mb-6 lg:mb-8 text-blue-100 leading-relaxed px-3 xs:px-2 sm:px-0 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Join hundreds of families who trust us with their children\'s education. Your child\'s bright future starts here.'
              : 'শত শত পরিবারের সাথে যোগ দিন যারা তাদের সন্তানদের শিক্ষার জন্য আমাদের উপর আস্থা রাখেন। আপনার সন্তানের উজ্জ্বল ভবিষ্যৎ এখানেই শুরু হয়।'
            }
          </p>
          <div className="flex flex-col xs:flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 lg:gap-5 justify-center">
            <Link
              href="/admission/apply"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-3 xs:px-4 sm:px-6 lg:px-7 py-2 xs:py-2.5 sm:py-3 lg:py-3.5 rounded-lg font-bold text-xs xs:text-sm sm:text-base lg:text-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              aria-label="Apply for admission now"
            >
              <span className="text-xs xs:text-sm sm:text-base lg:text-lg">{language === 'en' ? 'Apply Now' : 'এখনই আবেদন করুন'}</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white px-3 xs:px-4 sm:px-6 lg:px-7 py-2 xs:py-2.5 sm:py-3 lg:py-3.5 rounded-lg font-bold text-xs xs:text-sm sm:text-base lg:text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-1"
              aria-label="Ask questions about admission"
            >
              <span className="text-xs xs:text-sm sm:text-base lg:text-lg">{language === 'en' ? 'Ask Questions' : 'প্রশ্ন করুন'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add display names for memoized components for better debugging
FeatureCard.displayName = 'FeatureCard';
ProcessStep.displayName = 'ProcessStep';

// Add component metadata for SEO tools
AdmissionPage.displayName = 'AdmissionPage';

export default AdmissionPage;