'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  GraduationCap,
  Clock,
  Users,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface TeacherDetailsComponentProps {
  slug: string;
}

// Mock data with Bengali content
const getTeacherData = (slug: string) => {
  return {
    id: slug,
    name: "ড. সারাহ জনসন",
    nameEn: "Dr. Sarah Johnson",
    designation: "সিনিয়র গণিত শিক্ষক",
    designationEn: "Senior Mathematics Teacher",
    photo_url: "/images/teachers/teacher-003.jpg",
    email: "sarah.johnson@surjomukhi.edu",
    phone: "+880 1234 567890",
    address: "ঢাকা, বাংলাদেশ",
    experience_years: 12,
    education: [
      {
        degree: "গণিত শিক্ষায় পিএইচডি",
        degreeEn: "Ph.D. in Mathematics Education",
        institution: "ঢাকা বিশ্ববিদ্যালয়",
        institutionEn: "University of Dhaka",
        year: "২০১৫",
        details: "পাঠ্যক্রম উন্নয়নে বিশেষজ্ঞতা"
      },
      {
        degree: "গণিতে স্নাতকোত্তর",
        degreeEn: "M.Sc. in Mathematics",
        institution: "ঢাকা বিশ্ববিদ্যালয়",
        institutionEn: "Dhaka University",
        year: "২০১০",
        details: "প্রথম শ্রেণিতে উত্তীর্ণ"
      },
      {
        degree: "গণিতে স্নাতক",
        degreeEn: "B.Sc. in Mathematics",
        institution: "ঢাকা বিশ্ববিদ্যালয়",
        institutionEn: "Dhaka University", 
        year: "২০০৮",
        details: "সর্বোচ্চ সম্মানসহ উত্তীর্ণ"
      }
    ],
    specializations: [
      "প্রাথমিক গণিত",
      "সমস্যা সমাধানের কৌশল",
      "গাণিতিক যুক্তি",
      "পাঠ্যক্রম উন্নয়ন"
    ],
    subjects: ["গণিত", "মৌলিক অংক", "সমস্যা সমাধান", "মানসিক গণিত"],
    classes_taught: ["প্রথম শ্রেণি", "দ্বিতীয় শ্রেণি", "তৃতীয় শ্রেণি", "চতুর্থ শ্রেণি", "পঞ্চম শ্রেণি"],
    achievements: [
      "সেরা শিক্ষক পুরস্কার ২০২৩",
      "গণিত শিক্ষায় শ্রেষ্ঠত্বের পুরস্কার ২০২২",
      "শিশু গণিত শিক্ষায় ৫টি গবেষণাপত্র প্রকাশ",
      "সার্টিফাইড মন্টেসরি গণিত প্রশিক্ষক"
    ],
    teaching_philosophy: "আমি বিশ্বাস করি প্রতিটি শিশুর গণিতে দক্ষতা অর্জনের সম্ভাবনা রয়েছে যখন তাদের সঠিক ভিত্তি, উৎসাহ এবং সৃজনশীল শিক্ষা পদ্ধতি প্রদান করা হয় যা শেখাকে আনন্দদায়ক ও অর্থবহ করে তোলে।",
    languages: ["বাংলা", "ইংরেজি", "হিন্দি"]
  };
};

export default function TeacherDetailsComponent({ slug }: TeacherDetailsComponentProps) {
  const teacher = getTeacherData(slug);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // JSON-LD Schema markup
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": teacher.name,
    "jobTitle": teacher.designation,
    "worksFor": {
      "@type": "Organization",
      "name": "সুর্যমুখী কিন্ডারগার্টেন",
      "url": "https://surjomukhi-kindergarten.edu"
    },
    "email": teacher.email,
    "telephone": teacher.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "ঢাকা",
      "addressCountry": "বাংলাদেশ"
    },
    "image": teacher.photo_url,
    "knowsAbout": teacher.specializations,
    "alumniOf": teacher.education.map(edu => ({
      "@type": "Organization",
      "name": edu.institution
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="min-h-screen bg-gray-50 py-8" lang="bn">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              href="/academic/teachers"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              title="শিক্ষকমণ্ডলীর পাতায় ফিরে যান"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">শিক্ষকমণ্ডলীতে ফিরুন</span>
            </Link>
          </motion.div>

          {/* CV Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            itemScope
            itemType="https://schema.org/Person"
          >
            {/* Header Section */}
            <motion.div 
              variants={sectionVariants}
              className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-8 py-10"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white shadow-lg flex-shrink-0">
                  <Image
                    src={teacher.photo_url}
                    alt={`${teacher.name} - ${teacher.designation} - সুর্যমুখী কিন্ডারগার্টেন`}
                    fill
                    className="object-cover"
                    sizes="128px"
                    quality={90}
                    itemProp="image"
                  />
                </div>

                {/* Name and Contact */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2" itemProp="name">
                    {teacher.name}
                  </h1>
                  <p className="text-xl text-gray-200 mb-4 font-medium" itemProp="jobTitle">
                    {teacher.designation}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Mail className="h-4 w-4" />
                      <span itemProp="email">{teacher.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Phone className="h-4 w-4" />
                      <span itemProp="telephone">{teacher.phone}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <MapPin className="h-4 w-4" />
                      <span itemProp="address">{teacher.address}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{teacher.experience_years} বছরের অভিজ্ঞতা</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="px-8 py-8 space-y-8">
              {/* Teaching Philosophy */}
              <motion.section variants={sectionVariants}>
                <h2 className="text-2xl font-bold font-serif text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                  শিক্ষাদর্শন
                </h2>
                <p className="text-gray-700 leading-relaxed text-base italic">
                  "{teacher.teaching_philosophy}"
                </p>
              </motion.section>

              {/* Education */}
              <motion.section variants={sectionVariants}>
                <h2 className="text-2xl font-bold font-serif text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  শিক্ষাগত যোগ্যতা
                </h2>
                <div className="space-y-4">
                  {teacher.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-gray-300 pl-4" itemProp="alumniOf" itemScope itemType="https://schema.org/Organization">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700 font-medium" itemProp="name">{edu.institution}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-medium">{edu.year}</span>
                        <span>{edu.details}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Academic Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Specializations */}
                <motion.section variants={sectionVariants}>
                  <h2 className="text-xl font-bold font-serif text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    বিশেষত্ব
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    {teacher.specializations.map((spec, index) => (
                      <div key={index} className="bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                        <span className="text-gray-700 font-medium text-sm" itemProp="knowsAbout">{spec}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Subjects Taught */}
                <motion.section variants={sectionVariants}>
                  <h2 className="text-xl font-bold font-serif text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    পাঠদানের বিষয়
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    {teacher.subjects.map((subject, index) => (
                      <div key={index} className="bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                        <span className="text-gray-700 font-medium text-sm">{subject}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* Classes and Languages */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Classes Taught */}
                <motion.section variants={sectionVariants}>
                  <h2 className="text-xl font-bold font-serif text-gray-900 mb-4">
                    পাঠদানের শ্রেণি
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {teacher.classes_taught.map((cls, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                        {cls}
                      </span>
                    ))}
                  </div>
                </motion.section>

                {/* Languages */}
                <motion.section variants={sectionVariants}>
                  <h2 className="text-xl font-bold font-serif text-gray-900 mb-4">
                    ভাষাগত দক্ষতা
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {teacher.languages.map((lang, index) => (
                      <span key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                        {lang}
                      </span>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* Achievements */}
              <motion.section variants={sectionVariants}>
                <h2 className="text-2xl font-bold font-serif text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  পুরস্কার ও স্বীকৃতি
                </h2>
                <div className="space-y-3">
                  {teacher.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 font-medium">{achievement}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
