'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  GraduationCap,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  MessageSquare,
  Navigation,
  FileCheck,
  Calendar,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  message: string;
}

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Us - Surjomukhi Kindergarten",
  "description": "Get in touch with Surjomukhi Kindergarten for admissions, academic inquiries, campus visits, and fee queries in Nawabganj, Dhaka.",
  "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://www.surjamukhikindergarten.com"}/contact`,
  "mainEntity": {
    "@type": "EducationalOrganization",
    "name": "Surjomukhi Kindergarten",
    "alternateName": "সূর্যমুখী কিন্ডারগার্টেন",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Salauddin Complex, Aona Bazar",
      "addressLocality": "Nawabganj",
      "addressRegion": "Dhaka",
      "postalCode": "1320",
      "addressCountry": "BD"
    },
    "telephone": ["+880-1954113374"],
    "email": "info.surjamukhikindergarten@gmail.com",
    "url": "https://www.surjamukhikindergarten.com",
    "openingHours": "Sa-Th 08:00-16:00"
  }
};

const faqs = [
  {
    questionEn: 'How can I schedule a personal campus tour?',
    questionBn: 'ক্যাম্পাস পরিদর্শনের জন্য কিভাবে সময় নির্ধারণ করব?',
    answerEn: 'You may visit our campus anytime Saturday through Thursday between 9:00 AM and 2:00 PM, or submit the inquiry form above to schedule a guided tour with an Academic Counselor.',
    answerBn: 'শনিবার থেকে বৃহস্পতিবার সকাল ৯:০০ টা হতে দুপুর ২:০০ টার মধ্যে সরাসরি ক্যাম্পাসে আসতে পারেন অথবা উপরের ফরমটি পূরণ করে আপনার সুবিধাজনক সময় জানাতে পারেন।'
  },
  {
    questionEn: 'What documents are required for kindergarten admission?',
    questionBn: 'কিন্ডারগার্টেনে ভর্তির জন্য কী কী কাগজপত্র প্রয়োজন?',
    answerEn: 'Original and photocopy of child’s digital birth certificate, 4 passport-size photographs, and parent national ID (NID) copies are required during admission submission.',
    answerBn: 'শিক্ষার্থীর ডিজিটাল জন্ম সনদের মূল কপি ও ফটোকপি, ৪ কপি পাসপোর্ট সাইজ ছবি এবং পিতা-মাতার জাতীয় পরিচয়পত্রের (NID) ফটোকপি জমা দিতে হবে।'
  },
  {
    questionEn: 'Can tuition fees be paid online through mobile banking?',
    questionBn: 'টিউশন ফি কি অনলাইনে বা মোবাইল ব্যাংকিংয়ের মাধ্যমে দেওয়া যায়?',
    answerEn: 'Yes, we accept tuition fee payments via bKash, Nagad, Rocket merchant gateways, as well as direct bank deposits and campus cashier counters.',
    answerBn: 'হ্যাঁ, বিকাশ, নগদ, রকেট মোবাইল ব্যাংকিং এবং নির্ধারিত ব্যাংক অ্যাকাউন্টে জমা দেওয়ার পাশাপাশি ক্যাম্পাসের ক্যাশ কাউন্টারে সরাসরি ফি প্রদান করা যায়।'
  },
  {
    questionEn: 'How do I obtain a student transfer certificate (TC)?',
    questionBn: 'শিক্ষার্থীর ট্রান্সফার সার্টিফিকেট (টিসি) পাওয়ার নিয়ম কী?',
    answerEn: 'Submit a written application signed by the parent to the Principal’s office. Clearance of all tuition dues is required prior to TC issuance within 3 business days.',
    answerBn: 'অভিভাবকের স্বাক্ষরযুক্ত একটি লিখিত আবেদনপত্র অধ্যক্ষের কার্যালয়ে জমা দিতে হবে। বকেয়া পরিশোধ সাপেক্ষে ৩ কার্যদিবসের মধ্যে টিসি প্রদান করা হয়।'
  }
];

export default function ContactPage() {
  const { language } = useTranslation();
  const isBn = language === 'bn';

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    department: 'admissions',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          department: 'admissions',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* 1. Institutional Hero Header */}
        <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              {isBn ? 'প্রাতিষ্ঠানিক যোগাযোগ ও সহায়তা কেন্দ্র' : 'Official Communication & Helpdesk'}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              {isBn ? 'যোগাযোগ ও ক্যাম্পাস পরিদর্শন' : 'Contact & Campus Visit Desk'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isBn
                ? 'ভর্তি প্রক্রিয়া, একাডেমিক তথ্য, টিউশন সংক্রান্ত বিষয় অথবা সরাসরি ক্যাম্পাস পরিদর্শনের জন্য আমাদের সাথে যোগাযোগ করুন।'
                : 'Connect with our admissions office, academic coordinators, and administrative team. We welcome prospective parents, guardians, and visitors.'}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
              <div className="p-3">
                <div className="text-lg sm:text-xl font-bold text-gray-900 truncate">+880 1954-113374</div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'হটলাইন' : 'Direct Helpline'}</div>
              </div>
              <div className="p-3">
                <div className="text-lg sm:text-xl font-bold text-gray-900">Sat – Thu</div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? '৮:০০ AM – ৪:০০ PM' : '8:00 AM – 4:00 PM'}</div>
              </div>
              <div className="p-3">
                <div className="text-lg sm:text-xl font-bold text-blue-600">Aona Bazar</div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">Nawabganj, Dhaka</div>
              </div>
              <div className="p-3">
                <div className="text-lg sm:text-xl font-bold text-gray-900">&lt; 24 Hours</div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'দ্রুত উত্তর' : 'Response Guarantee'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Main Contact Grid */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Office Directory & Contact Information */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {isBn ? 'অফিস ঠিকানা ও ডেস্ক' : 'Department Directory'}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1 mb-4">
                    {isBn ? 'সরাসরি যোগাযোগের মাধ্যম' : 'Get in Touch with Our Offices'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {isBn
                      ? 'যেকোনো প্রয়োজনীয় তথ্যের জন্য নির্দিষ্ট বিভাগীয় হেল্পডেস্কে যোগাযোগ করতে পারেন।'
                      : 'Reach out directly to the specific department or visit our administrative reception during working hours.'}
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  {/* Location Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        {isBn ? 'ক্যাম্পাস ঠিকানা' : 'Campus Location'}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Salauddin Complex, Aona Bazar, Nawabganj, Dhaka-1320, Bangladesh
                      </p>
                      <a
                        href="#campus-map"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 mt-2"
                      >
                        <Navigation className="w-3 h-3" />
                        {isBn ? 'মানচিত্রে অবস্থান দেখুন' : 'View on Map & Directions'}
                      </a>
                    </div>
                  </div>

                  {/* Phone & Hotline Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        {isBn ? 'হেল্পলাইন ও মোবাইল' : 'Telephone & Helplines'}
                      </h3>
                      <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                        <p>Admission Hotline: <strong className="text-slate-900 font-semibold">+880 1954-113374</strong></p>
                        <p>General Office: <strong className="text-slate-900 font-semibold">+880 1712-345678</strong></p>
                      </div>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        {isBn ? 'ইমেইল যোগাযোগ' : 'Official Electronic Mail'}
                      </h3>
                      <div className="text-xs text-slate-600 mt-1 space-y-0.5 break-all">
                        <p>General: <a href="mailto:info.surjamukhikindergarten@gmail.com" className="text-blue-600 hover:underline">info.surjamukhikindergarten@gmail.com</a></p>
                        <p>Admissions: <a href="mailto:admissions@surjomukhi.edu.bd" className="text-blue-600 hover:underline">admissions@surjomukhi.edu.bd</a></p>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        {isBn ? 'অফিস সময়সূচী' : 'Administrative Working Hours'}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Saturday – Thursday: <strong className="text-slate-900">8:00 AM – 4:00 PM</strong><br />
                        Friday: <span className="text-rose-600 font-semibold">Weekly Closed</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick WhatsApp / Direct Support Pill */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-white">Need Immediate Assistance?</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Call our admissions coordinator directly.</p>
                  </div>
                  <a
                    href="tel:+8801954113374"
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs flex-shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Now
                  </a>
                </div>
              </div>

              {/* Right Column: Send Official Message Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 lg:p-10">
                  <div className="mb-8">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {isBn ? 'অনলাইন বার্তা' : 'Send An Inquiry'}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                      {isBn ? 'আমাদের বার্তা পাঠান' : 'Direct Institutional Message'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {isBn
                        ? 'আপনার বার্তা আমাদের অ্যাডমিশন ও একাডেমিক টিমের নিকট সরাসরি পৌঁছে যাবে।'
                        : 'Fill out the form below. We will review your query and reply via email or phone within 24 hours.'}
                    </p>
                  </div>

                  {/* Feedback Banners */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="font-bold block">Inquiry Submitted Successfully!</strong>
                        Thank you for reaching out to Surjomukhi Kindergarten. Our team will contact you shortly.
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="font-bold block">Failed to send message</strong>
                        Please verify your internet connection or call our office helpline directly at +880 1954-113374.
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Sheikh Shariar Nehal"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          {isBn ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+880 17XX-XXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          {isBn ? 'ইমেইল ঠিকানা' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          {isBn ? 'বিভাগ নির্বাচন করুন *' : 'Department / Purpose *'}
                        </label>
                        <select
                          name="department"
                          required
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer"
                        >
                          <option value="admissions">Admission Inquiry (Play – Class 5)</option>
                          <option value="academics">Academic Curriculum & Syllabus</option>
                          <option value="fees">Tuition & Accounts Inquiries</option>
                          <option value="verification">Certificate & Transfer (TC) Verification</option>
                          <option value="general">General Campus Inquiries</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isBn ? 'বিষয় / সংক্ষেপ *' : 'Subject *'}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Nursery Admission Seat Availability"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isBn ? 'আপনার বিস্তারিত বার্তা *' : 'Detailed Message *'}
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please write your inquiry in detail..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-xs disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Official Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Campus Location Map & Landmarks */}
        <section id="campus-map" className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {isBn ? 'ক্যাম্পাসের অবস্থান ও দিকনির্দেশনা' : 'Interactive Map & Directions'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                {isBn ? 'সহজে ক্যাম্পাসে পৌঁছানোর উপায়' : 'Find Our Campus in Nawabganj'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Situated in the prime educational zone of Aona Bazar, Nawabganj with accessible road links and secure drop-off areas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Map Iframe Container */}
              <div className="lg:col-span-8 bg-slate-100 rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs h-[360px] sm:h-[420px] relative">
                <iframe
                  title="Surjomukhi Kindergarten Location Map"
                  src="https://maps.google.com/maps?q=Nawabganj,Dhaka,Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Transportation & Landmark Cards */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Key Nearby Landmark
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Located within the prominent <strong>Salauddin Complex</strong> at Aona Bazar, adjacent to main central transport junctions.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                    <Navigation className="w-4 h-4 text-emerald-600" />
                    Transport Access
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Accessible via regular rickshaw, auto-rickshaw, and local CNG services from Nawabganj Sadar, Bandura, and Galimpur.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    Visitor Parking & Security
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designated visitor parking and secure guarded entrance gates with student pickup checkpoint protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Frequently Asked Questions */}
        <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-200/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {isBn ? 'সাধারণ প্রশ্নোত্তর' : 'Frequently Asked Inquiries'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                {isBn ? 'সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ' : 'Common Visitor Questions'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{isBn ? faq.questionBn : faq.questionEn}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                    {isBn ? faq.answerBn : faq.answerEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA Footer Helpdesk */}
        <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                Ready to Apply for the 2025 Academic Session?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Explore our straightforward online application portal or review the official admission criteria for Play Group through Class 5.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/admission/apply-online"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
                >
                  <GraduationCap className="w-4 h-4" />
                  Apply Online Now
                </Link>
                <Link
                  href="/admission/how-to-apply"
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  Step-by-Step Admission Guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
