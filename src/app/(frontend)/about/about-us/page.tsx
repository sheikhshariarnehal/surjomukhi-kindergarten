'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';

export default function AboutUsPage() {
  const { language } = useTranslation();

  const contactInfo = [
    {
      label: language === 'bn' ? 'ঠিকানা' : 'Address',
      value: language === 'bn' ? 'সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ, ঢাকা-১৩২০' : 'Salauddin Complex, Aona Bazar, Nawabganj, Dhaka-1320',
      icon: '📍',
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: language === 'bn' ? 'ফোন' : 'Phone',
      value: language === 'bn' ? '০১৯৫৪১১৩৩৭৪' : '01954113374',
      icon: '📞',
      color: 'from-green-500 to-green-600'
    },
    {
      label: language === 'bn' ? 'ইমেইল' : 'Email',
      value: 'info.surjamukhikindergarten@gmail.com',
      icon: '✉️',
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: language === 'bn' ? 'ওয়েবসাইট' : 'Website',
      value: 'www.surjamukhikindergarten.com',
      icon: '🌐',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const schoolIdeals = [
    {
      bangla: 'শিক্ষাই জাতির মেরুদণ্ড',
      english: 'Education is the backbone of the nation',
      description: language === 'bn' ? 'জাতি গঠনের ভিত্তি হিসেবে মানসম্পন্ন শিক্ষা সম্প্রসারণ করা' : 'Expand quality education as the foundation of nation building',
      icon: '🎓',
      color: 'from-blue-400 to-blue-600'
    },
    {
      bangla: 'শান্তিই পরম ধর্ম',
      english: 'Peace is the supreme virtue',
      description: language === 'bn' ? 'শিক্ষার মাধ্যমে শান্তিপ্রিয় ও সেবাপরায়ণ নাগরিক গড়ে তোলা' : 'Nurture peaceful and service-minded citizens through education',
      icon: '☮️',
      color: 'from-green-400 to-green-600'
    },
    {
      bangla: 'ঐক্য ও অগ্রগতির চেতনা',
      english: 'Spirit of unity and progress',
      description: language === 'bn' ? 'উন্নত সমাজের দিকে অগ্রসর হওয়ার জন্য শিক্ষার্থীদের সম্পৃক্ত করা' : 'Engage learners in progressing toward an advanced society',
      icon: '🤝',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const facilities = [
    {
      title: language === 'bn' ? 'খেলার মাঠ' : 'Playground',
      description: language === 'bn' ? 'প্রায় ১০০ গজ × ৬০ গজ বিস্তৃত খেলার মাঠ' : 'Approximately 100 yards × 60 yards playground',
      icon: '⚽',
      color: 'from-green-400 to-green-500'
    },
    {
      title: language === 'bn' ? 'গ্রন্থাগার' : 'Library',
      description: language === 'bn' ? 'শিক্ষার্থীদের জন্য সমৃদ্ধ গ্রন্থাগার' : 'Well-equipped library for students',
      icon: '📚',
      color: 'from-blue-400 to-blue-500'
    },
    {
      title: language === 'bn' ? 'নিরাপদ পরিবেশ' : 'Safe Environment',
      description: language === 'bn' ? 'শিশুদের জন্য নিরাপদ ও স্বাস্থ্যকর পরিবেশ' : 'Safe and healthy environment for children',
      icon: '🛡️',
      color: 'from-red-400 to-red-500'
    },
    {
      title: language === 'bn' ? 'আধুনিক শ্রেণীকক্ষ' : 'Modern Classrooms',
      description: language === 'bn' ? 'আধুনিক শিক্ষা উপকরণসহ শ্রেণীকক্ষ' : 'Classrooms with modern educational materials',
      icon: '🏫',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      title: language === 'bn' ? 'প্রশাসনিক অফিস' : 'Administrative Office',
      description: language === 'bn' ? 'সুসংগঠিত প্রশাসনিক কার্যালয়' : 'Well-organized administrative office',
      icon: '🏢',
      color: 'from-purple-400 to-purple-500'
    },
    {
      title: language === 'bn' ? 'নথি সংরক্ষণাগার' : 'Document Storage',
      description: language === 'bn' ? 'নিরাপদ নথিপত্র সংরক্ষণাগার' : 'Secure document storage facility',
      icon: '📁',
      color: 'from-indigo-400 to-indigo-500'
    }
  ];

  const governance = [
    {
      position: language === 'bn' ? 'সভাপতি' : 'President',
      role: language === 'bn' ? 'প্রতিষ্ঠাতা/পৃষ্ঠপোষক প্রতিনিধি' : 'Representative from founders/patrons',
      icon: '👑'
    },
    {
      position: language === 'bn' ? 'প্রধান শিক্ষক' : 'Head Teacher',
      role: language === 'bn' ? 'সদস্য-সচিব' : 'Member-Secretary',
      icon: '🎯'
    },
    {
      position: language === 'bn' ? 'শিক্ষক প্রতিনিধি' : 'Teacher Representative',
      role: language === 'bn' ? 'নির্বাচিত প্রতিনিধি (১ জন)' : 'Elected representative (1 member)',
      icon: '👨‍🏫'
    },
    {
      position: language === 'bn' ? 'অভিভাবক প্রতিনিধি' : 'Guardian Representatives',
      role: language === 'bn' ? '২ জন (১ পুরুষ, ১ মহিলা)' : '2 members (1 male, 1 female)',
      icon: '👪'
    },
    {
      position: language === 'bn' ? 'অবসরপ্রাপ্ত সরকারি কর্মকর্তা' : 'Retired Government Officer',
      role: language === 'bn' ? 'উপদেষ্টা সদস্য' : 'Advisory member',
      icon: '🏛️'
    }
  ];

  const missionItems = [
    {
      text: language === 'bn' ? 'আধুনিক, মূল্যবোধভিত্তিক, সাংস্কৃতিকভাবে প্রোথিত শিক্ষা নিশ্চিত করা' : 'Ensure modern, value-based, culturally rooted education',
      icon: '🎯'
    },
    {
      text: language === 'bn' ? 'সৃজনশীলতা, নৈতিক চরিত্র এবং নাগরিক মূল্যবোধ বিকাশ করা' : 'Foster creativity, moral character, and civic values',
      icon: '✨'
    },
    {
      text: language === 'bn' ? 'খেলাধুলা এবং সাংস্কৃতিক চর্চাকে শিক্ষার অবিচ্ছেদ্য অংশ হিসেবে প্রসার করা' : 'Promote sports and cultural practice as integral parts of education',
      icon: '🎨'
    }
  ];

  const visionItems = [
    {
      text: language === 'bn' ? 'সৃজনশীল শিক্ষার মাধ্যমে একটি প্রগতিশীল সমাজ গঠন করা' : 'Build a progressive society through creative education',
      icon: '🌟'
    },
    {
      text: language === 'bn' ? 'একটি নির্ভরযোগ্য এবং আদর্শ স্থানীয় শিক্ষা প্রতিষ্ঠান হয়ে ওঠা' : 'Become a reliable and model local educational institution',
      icon: '🏆'
    },
    {
      text: language === 'bn' ? 'সুবিধাবঞ্চিত গোষ্ঠীর অংশগ্রহণ নিশ্চিত করা এবং মেধাবী অভাবী শিক্ষার্থীদের সহায়তা করা' : 'Ensure participation of underserved groups and support meritorious students in need',
      icon: '🤲'
    }
  ];

  return (
    <>
      <Head>
        <title>
          {language === 'bn'
            ? 'আমাদের সম্পর্কে - সূর্যমুখী কিন্ডারগার্টেন | মানসম্পন্ন প্রাথমিক শিক্ষা'
            : 'About Us - Surjomukhi Kindergarten | Quality Primary Education in Dhaka'
          }
        </title>
        <meta
          name="description"
          content={language === 'bn'
            ? 'সূর্যমুখী কিন্ডারগার্টেন সম্পর্কে জানুন - ২০০৪ সালে প্রতিষ্ঠিত একটি প্রিমিয়ার বাংলা মাধ্যম প্রাথমিক বিদ্যালয়। নবাবগঞ্জ, ঢাকায় অবস্থিত। প্লে গ্রুপ থেকে ৫ম শ্রেণী পর্যন্ত আধুনিক সুবিধাসহ মানসম্পন্ন শিক্ষা প্রদান।'
            : 'Learn about Surjomukhi Kindergarten, a premier Bangla-medium primary school established in 2004 in Nawabganj, Dhaka. Offering quality education from Play Group to Grade 5 with modern facilities and value-based learning.'
          }
        />
        <meta
          name="keywords"
          content={language === 'bn'
            ? 'সূর্যমুখী কিন্ডারগার্টেন, ঢাকার প্রাথমিক বিদ্যালয়, বাংলা মাধ্যম স্কুল, নবাবগঞ্জ কিন্ডারগার্টেন, বাংলাদেশে মানসম্পন্ন শিক্ষা'
            : 'Surjomukhi Kindergarten, primary school Dhaka, Bangla medium school, kindergarten Nawabganj, quality education Bangladesh, private school Dhaka'
          }
        />
        <meta name="author" content="Surjomukhi Kindergarten" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/about/about-us`} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={language === 'bn' ? 'আমাদের সম্পর্কে - সূর্যমুখী কিন্ডারগার্টেন' : 'About Us - Surjomukhi Kindergarten'} />
        <meta property="og:description" content={language === 'bn' ? 'সূর্যমুখী কিন্ডারগার্টেন সম্পর্কে বিস্তারিত তথ্য' : 'Detailed information about Surjomukhi Kindergarten'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/about/about-us`} />
        <meta property="og:locale" content={language === 'bn' ? 'bn_BD' : 'en_US'} />
        <meta property="og:site_name" content="Surjomukhi Kindergarten" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={language === 'bn' ? 'আমাদের সম্পর্কে - সূর্যমুখী কিন্ডারগার্টেন' : 'About Us - Surjomukhi Kindergarten'} />
        <meta name="twitter:description" content={language === 'bn' ? 'সূর্যমুখী কিন্ডারগার্টেন সম্পর্কে বিস্তারিত তথ্য' : 'Premier Bangla-medium primary education institution in Dhaka since 2004'} />
      </Head>

      <main className="min-h-screen bg-gray-50"
        itemScope
        itemType="https://schema.org/EducationalOrganization"
      >

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Surjomukhi Kindergarten",
            "alternateName": "সূর্যমুখী কিন্ডারগার্টেন",
            "description": "Non-government Bangla-medium primary institution established in 2004",
            "foundingDate": "2004-01-01",
            "founder": {
              "@type": "Person",
              "name": "Belal Imran Mahmud",
              "alternateName": "বে'লাল ইমরান মাহমুদ"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Salauddin Complex, Aona Bazar",
              "addressLocality": "Nawabganj",
              "addressRegion": "Dhaka",
              "postalCode": "1320",
              "addressCountry": "BD"
            },
            "telephone": ["01954113374"],
            "email": "info.surjamukhikindergarten@gmail.com",
            "url": "https://www.surjamukhikindergarten.com",
            "numberOfStudents": 55,
            "educationalLevel": "Primary Education",
            "foundingLocation": {
              "@type": "Place",
              "name": "Nawabganj, Dhaka, Bangladesh"
            }
          })
        }}
      />
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {language === 'bn' ? 'সূর্যমুখী কিন্ডারগার্টেন' : 'Surjomukhi Kindergarten'}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                {language === 'bn'
                  ? 'সৃজনশীল, মূল্যবোধভিত্তিক শিক্ষার মাধ্যমে একটি প্রগতিশীল সমাজ গড়ে তোলার অগ্রযাত্রায় আমাদের সাথে যুক্ত হন'
                  : 'Join us in building a progressive society through creative, value-based education that nurtures young minds and develops future leaders'
                }
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-lg">
                <span 
                  className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30"
                >
                  {language === 'bn' ? '🏛️ প্রতিষ্ঠিত ২০০৪' : '🏛️ Est. 2004'}
                </span>
                <span 
                  className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30"
                >
                  {language === 'bn' ? '📚 বাংলা মাধ্যম' : '📚 Bangla Medium'}
                </span>
                <span 
                  className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30"
                >
                  {language === 'bn' ? '🎓 প্লে গ্রুপ - ৫ম শ্রেণী' : '🎓 Play Group - Grade 5'}
                </span>
                <span 
                  className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30"
                >
                  {language === 'bn' ? '👥 ৫৫+ শিক্ষার্থী' : '👥 55+ Students'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* School Ideals Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === 'bn' ? 'আমাদের আদর্শ ও মূলমন্ত্র' : 'Our Ideals & Principles'}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {language === 'bn'
                  ? 'আমাদের প্রতিষ্ঠানের মূল ভিত্তি হলো তিনটি মৌলিক আদর্শ যা আমাদের শিক্ষা দর্শনকে পরিচালিত করে এবং প্রতিটি শিক্ষার্থীর চরিত্র গঠনে সাহায্য করে'
                  : 'Our institution is founded on three fundamental ideals that guide our educational philosophy and help shape the character of every student'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {schoolIdeals.map((ideal, index) => (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${ideal.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white text-3xl">{ideal.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {language === 'bn' ? ideal.bangla : ideal.english}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {ideal.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Institution Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                  {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Our Institution'}
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {language === 'bn'
                    ? 'সূর্যমুখী কিন্ডারগার্টেন একটি বেসরকারি প্রাথমিক শিক্ষা প্রতিষ্ঠান যা ০১ জানুয়ারি ২০০৪ সালে প্রতিষ্ঠিত হয় এবং সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ, ঢাকা-১৩২০ এ অবস্থিত। স্কুলটি প্লে গ্রুপ থেকে ৫ম শ্রেণী পর্যন্ত বাংলা মাধ্যমে শিক্ষা প্রদান করে এবং সৃজনশীল ও নৈতিক শিক্ষার মাধ্যমে শিক্ষার্থীদের সামগ্রিক উন্নয়নে কাজ করে।'
                    : 'Surjomukhi Kindergarten is a private primary educational institution established on January 1, 2004, located at Salauddin Complex, Aona Bazar, Nawabganj, Dhaka-1320. The school offers instruction in Bangla medium from play group to Grade 5 and works to foster students holistic development through creative and ethical education.'
                  }
                </p>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-4 text-2xl">�️</span>
                    <div>
                      <span className="font-semibold text-gray-900">{language === 'bn' ? 'প্রতিষ্ঠাকাল:' : 'Established:'}</span>
                      <span className="text-gray-700 ml-2">{language === 'bn' ? '০১ জানুয়ারি ২০০৪' : 'January 1, 2004'}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-4 text-2xl">📚</span>
                    <div>
                      <span className="font-semibold text-gray-900">{language === 'bn' ? 'শিক্ষার মাধ্যম:' : 'Medium of Instruction:'}</span>
                      <span className="text-gray-700 ml-2">{language === 'bn' ? 'বাংলা' : 'Bangla'}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-4 text-2xl">🎓</span>
                    <div>
                      <span className="font-semibold text-gray-900">{language === 'bn' ? 'শ্রেণীসমূহ:' : 'Classes:'}</span>
                      <span className="text-gray-700 ml-2">{language === 'bn' ? 'প্লে গ্রুপ থেকে ৫ম শ্রেণী' : 'Play Group to Grade 5'}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-4 text-2xl">👥</span>
                    <div>
                      <span className="font-semibold text-gray-900">{language === 'bn' ? 'শিক্ষার্থী সংখ্যা:' : 'Number of Students:'}</span>
                      <span className="text-gray-700 ml-2">{language === 'bn' ? '৫৫+ জন' : '55+ Students'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-10 rounded-3xl border border-blue-100 shadow-lg">
                <h3 className="text-3xl font-bold text-blue-800 mb-8 text-center">
                  {language === 'bn' ? 'আমাদের গুরুত্বপূর্ণ তথ্য' : 'Key Information'}
                </h3>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-4 text-2xl">💡</span>
                      <span className="text-blue-700 font-medium text-lg">
                        {language === 'bn' ? '"শিক্ষাই জাতির মেরুদণ্ড"' : '"Education is the backbone of the nation"'}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-4 text-2xl">☮️</span>
                      <span className="text-blue-700 font-medium text-lg">
                        {language === 'bn' ? '"শান্তিই পরম ধর্ম"' : '"Peace is the supreme virtue"'}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-4 text-2xl">🤝</span>
                      <span className="text-blue-700 font-medium text-lg">
                        {language === 'bn' ? 'ঐক্য ও অগ্রগতির চেতনা' : 'Spirit of unity and progress'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg border border-green-100">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <span className="mr-3">🎯</span>
                Our Mission
              </h3>
              <ul className="space-y-4 text-green-700">
                {missionItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-100">
              <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <span className="mr-3">🌟</span>
                Our Vision
              </h3>
              <ul className="space-y-4 text-purple-700">
                {visionItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-500 mr-3 mt-1">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Academics & Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">📚</span>
                Academics
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Instruction is provided in Bangla medium from nursery to Grade 5. Class-wise student numbers are maintained with proper structure:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Pre-primary: 30 students
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Grade 1: 25 students
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Other grades: Structured enrollment
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🏛️</span>
                Governance
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  A seven-member governing/management body framework ensures proper administration:
                </p>
                <ul className="space-y-2 text-gray-600">
                  {governance.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                      <div>
                        <span className="font-medium">{item.position}:</span> {item.role}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === 'bn' ? 'আমাদের সুবিধাসমূহ' : 'Our Facilities'}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {language === 'bn'
                  ? 'আমাদের শিক্ষার্থীদের সামগ্রিক উন্নয়নের জন্য আমরা বিভিন্ন আধুনিক সুবিধা প্রদান করি'
                  : 'We provide comprehensive modern facilities to support holistic development of our students'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${facility.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white text-2xl">{facility.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {facility.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Student Support */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
                <span className="mr-4 text-4xl">🎓</span>
                {language === 'bn' ? 'শিক্ষার্থী সহায়তা' : 'Student Support'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-3xl">📚</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'bn' ? 'গ্রন্থাগার' : 'Library'}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'bn' 
                      ? 'সম্পদ অনুযায়ী গ্রন্থাগার প্রতিষ্ঠা করা হবে'
                      : 'Establishing a library as resources allow'
                    }
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-3xl">🏆</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'bn' ? 'বৃত্তি' : 'Scholarships'}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'bn'
                      ? 'প্রাতিষ্ঠানিক পরীক্ষার মাধ্যমে বৃত্তি প্রদান'
                      : 'Offering scholarships through organizational examinations'
                    }
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-3xl">🛡️</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'bn' ? 'নিরাপত্তা কমিটি' : 'Safety Committee'}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'bn'
                      ? 'পাঁচ সদস্যের যৌন হয়রানি বিরোধী কমিটি'
                      : 'Anti-Sexual Harassment Committee with five members'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-xl text-gray-600">
              Get in touch with us for admissions and inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((contact, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg text-center border border-blue-100">
                <div className="text-3xl mb-3">{contact.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{contact.label}</h3>
                <p className="text-gray-600 text-sm break-words">{contact.value}</p>
              </div>
            ))}
          </div>

          {/* Finance & Compliance */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
              <span className="mr-3">💰</span>
              Finance & Compliance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Financial Management</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    General Fund: BDT 5,000
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Reserved Fund: BDT 25,000
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Bank certification maintained
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Compliance</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Joint signature operations
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Annual auditing conducted
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Designated subcommittee oversight
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Information'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {language === 'bn'
                ? 'আমাদের সাথে যোগাযোগ করতে নিচের তথ্যগুলো ব্যবহার করুন। আমরা সর্বদা আপনার সেবায় নিয়োজিত।'
                : 'Feel free to contact us using the information below. We are always here to serve you and answer your questions.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl border border-blue-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-2xl">{info.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {info.label}
                </h3>
                <p className="text-gray-700 leading-relaxed break-words">
                  {info.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Test</h2>
          <p className="text-xl mb-8">This is a test</p>
          <a href="/admission" className="bg-white text-blue-600 px-8 py-4 rounded">
            Apply Now
          </a>
        </div>
      </section>
    </main>
    </>
  );
}
