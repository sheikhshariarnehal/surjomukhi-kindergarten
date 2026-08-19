'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  User,
  Users,
  MapPin,
  Sparkles,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  PhoneCall,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Send,
  HelpCircle,
  Receipt
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import {
  admissionApplicationSchema,
  type AdmissionApplicationFormData,
  AGE_CLASS_FEE_MAPPING,
  calculateAge,
  getClassOptionsForAge,
  getFeeStructureForClass
} from '@/lib/validators';
import toast from 'react-hot-toast';

export default function ApplyOnlinePage() {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [studentAge, setStudentAge] = useState<number | null>(null);
  const [feeInfo, setFeeInfo] = useState<{ monthlyFee: number; admissionFee: number } | null>(null);
  const [applicationId, setApplicationId] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AdmissionApplicationFormData>({
    resolver: zodResolver(admissionApplicationSchema),
    defaultValues: {
      terms_accepted: false,
    },
  });

  const dateOfBirth = watch('date_of_birth');
  const classApplying = watch('class_applying');

  // Calculate age when date of birth changes
  useEffect(() => {
    if (dateOfBirth) {
      const age = calculateAge(dateOfBirth);
      setStudentAge(age);

      // Auto-select class based on age
      const classOptions = getClassOptionsForAge(age);
      if (classOptions.length > 0) {
        const defaultClass = classOptions[0].className;
        setValue('class_applying', defaultClass);
      }
    }
  }, [dateOfBirth, setValue]);

  // Update fee info when class changes
  useEffect(() => {
    if (classApplying) {
      const feeStructure = getFeeStructureForClass(classApplying);
      if (feeStructure) {
        setFeeInfo({
          monthlyFee: feeStructure.monthlyFee,
          admissionFee: feeStructure.admissionFee,
        });
      }
    }
  }, [classApplying]);

  const onSubmit = async (data: AdmissionApplicationFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        const generatedToken = result.data?.id ? result.data.id.substring(0, 8).toUpperCase() : `SMK-${Math.floor(100000 + Math.random() * 900000)}`;
        setApplicationId(generatedToken);
        setSubmitSuccess(true);
        toast.success(isBn ? 'ভর্তি আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Admission application submitted successfully!');
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(result.error || (isBn ? 'আবেদন জমাদানে ত্রুটি হয়েছে' : 'Failed to submit application'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(isBn ? 'আবেদন জমাদানে ত্রুটি হয়েছে' : 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getClassOptions = () => {
    if (!studentAge) {
      return AGE_CLASS_FEE_MAPPING.map(item => ({
        value: item.className,
        label: `${item.className} (Age ${item.age} yrs)`,
      }));
    }

    const ageOptions = getClassOptionsForAge(studentAge);
    if (ageOptions.length === 0) {
      return AGE_CLASS_FEE_MAPPING.map(item => ({
        value: item.className,
        label: `${item.className} (Age ${item.age} yrs)`,
      }));
    }

    return ageOptions.map(item => ({
      value: item.className,
      label: item.className,
    }));
  };

  // Success Screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200/90 shadow-md p-8 sm:p-10 text-center">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
            {isBn ? 'আবেদন গৃহীত হয়েছে' : 'Application Received'}
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-4 mb-2">
            {isBn ? 'ভর্তি আবেদন সফলভাবে সম্পন্ন হয়েছে' : 'Admission Application Submitted!'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
            {isBn
              ? 'সূর্যমুখী কিন্ডারগার্টেনে আপনার সন্তানের আবেদনটি আমাদের ভর্তি কমিটি পর্যালোচনা করছে। খুব শীঘ্রই অফিসে যোগাযোগ করা হবে।'
              : 'Thank you for choosing Surjomukhi Kindergarten. Our admissions committee will review the submission and contact you within 2 business days.'}
          </p>

          {/* Token Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-8 max-w-sm mx-auto text-left">
            <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{isBn ? 'আবেদন রেফারেন্স নম্বর' : 'Application Tracking Ref'}</div>
            <div className="text-lg font-mono font-bold text-blue-600 mt-0.5">{applicationId || 'SMK-2025-APP'}</div>
            <div className="text-xs text-slate-500 mt-1">Please preserve this reference for office communication.</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/admission/how-to-apply"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-xs"
            >
              {isBn ? 'ভর্তি প্রক্রিয়া ও পরবর্তী ধাপ' : 'View Admission Process'}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-2.5 rounded-xl font-semibold text-xs transition-colors"
            >
              {isBn ? 'হোমপেজে ফিরে যান' : 'Return to Home'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Institutional Hero Header */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            {isBn ? '২০২৫-২৬ শিক্ষাবর্ষে অনলাইন ভর্তি আবেদন' : 'Academic Session 2025–26 Online Registration'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {isBn ? 'অনলাইন ভর্তি আবেদন পত্র' : 'Online Admission Application Form'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {isBn
              ? 'প্লে গ্রুপ হতে ৫ম শ্রেণি পর্যন্ত সীমিত আসনে ভর্তি চলছে। নির্ভুলভাবে তথ্য পূরণ করে অনলাইনে আবেদন জমা দিন।'
              : 'Enrol your child in our nurturing, high-craft academic programs from Play Group through Class 5. Please complete all required information below.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
            <div className="p-3">
              <div className="text-lg sm:text-xl font-bold text-gray-900">Play – Gr 5</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'ভর্তিযোগ্য শ্রেণি' : 'Eligible Classes'}</div>
            </div>
            <div className="p-3">
              <div className="text-lg sm:text-xl font-bold text-gray-900">3 – 10 Yrs</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'বয়সসীমা' : 'Age Bracket'}</div>
            </div>
            <div className="p-3">
              <div className="text-lg sm:text-xl font-bold text-blue-600">Instant Token</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'অনলাইন ট্র্যাকিং' : 'Tracking Reference'}</div>
            </div>
            <div className="p-3">
              <div className="text-lg sm:text-xl font-bold text-gray-900">&lt; 48 Hours</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'পর্যালোচনা সময়' : 'Review Window'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Application Form */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-10">
            <div className="mb-8 pb-6 border-b border-slate-100">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {isBn ? 'আবেদন পত্র' : 'Registration Protocol'}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                {isBn ? 'শিক্ষার্থী ও অভিভাবকের তথ্য প্রদান' : 'Student & Family Information'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {isBn
                  ? 'তারকাচিহ্নিত (*) ঘরগুলো পূরণ করা বাধ্যতামূলক। নির্ভুল মোবাইল নম্বর প্রদান করুন।'
                  : 'Fields marked with an asterisk (*) are mandatory. Ensure valid contact details for verification.'}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Section 1: Student Information */}
              <div>
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>{isBn ? '১. শিক্ষার্থীর ব্যক্তিগত তথ্য' : '1. Student Information'}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'শিক্ষার্থীর পূর্ণ নাম *' : 'Student Full Name *'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sheikh Shariar Nehal"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      {...register('student_name')}
                    />
                    {errors.student_name && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.student_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'জন্ম তারিখ *' : 'Date of Birth *'}
                    </label>
                    <input
                      type="date"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      {...register('date_of_birth')}
                    />
                    {errors.date_of_birth && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.date_of_birth.message}</p>
                    )}
                    {studentAge !== null && (
                      <p className="mt-1 text-xs text-blue-600 font-medium">
                        {isBn ? `গণনাকৃত বয়স: ${studentAge} বছর` : `Calculated Age: ${studentAge} years`}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'লিঙ্গ *' : 'Gender *'}
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer"
                      {...register('gender')}
                    >
                      <option value="">{isBn ? 'লিঙ্গ নির্বাচন করুন' : 'Select Gender'}</option>
                      <option value="male">{isBn ? 'ছেলে (Male)' : 'Male'}</option>
                      <option value="female">{isBn ? 'মেয়ে (Female)' : 'Female'}</option>
                      <option value="other">{isBn ? 'অন্যান্য (Other)' : 'Other'}</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.gender.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'আবেদনের শ্রেণি *' : 'Class Applying For *'}
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer"
                      {...register('class_applying')}
                    >
                      <option value="">{isBn ? 'শ্রেণি নির্বাচন করুন' : 'Select Desired Class'}</option>
                      {getClassOptions().map((opt, i) => (
                        <option key={i} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.class_applying && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.class_applying.message}</p>
                    )}
                  </div>

                  {/* Fee Estimate Card */}
                  {feeInfo && (
                    <div className="md:col-span-2 bg-blue-50/80 rounded-xl p-4 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                          <Receipt className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                            {isBn ? 'নির্বাচিত শ্রেণির ফি কাঠামো' : 'Official Tuition & Fee Estimate'}
                          </h4>
                          <p className="text-[11px] text-slate-600">Standard institutional fee schedule for 2025–26</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-right self-end sm:self-auto">
                        <div>
                          <div className="text-[11px] text-slate-500 font-medium uppercase">{isBn ? 'মাসিক বেতন' : 'Monthly Tuition'}</div>
                          <div className="text-base font-bold text-blue-700">৳ {feeInfo.monthlyFee}</div>
                        </div>
                        <div className="w-px h-8 bg-blue-200/80" />
                        <div>
                          <div className="text-[11px] text-slate-500 font-medium uppercase">{isBn ? 'ভর্তি ফি' : 'Admission Fee'}</div>
                          <div className="text-base font-bold text-slate-900">৳ {feeInfo.admissionFee}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Parent Information */}
              <div>
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>{isBn ? '২. পিতা-মাতা ও অভিভাবকের তথ্য' : '2. Parent & Guardian Information'}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'প্রধান অভিভাবকের নাম *' : 'Primary Guardian Name *'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mohammad Ali"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      {...register('parent_name')}
                    />
                    {errors.parent_name && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.parent_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'পিতার নাম' : "Father's Full Name"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Father's Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      {...register('father_name')}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'মাতার নাম' : "Mother's Full Name"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mother's Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      {...register('mother_name')}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'অভিভাবকের মোবাইল নম্বর *' : 'Primary Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      placeholder="+880 17XX-XXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      {...register('parent_phone')}
                    />
                    {errors.parent_phone && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.parent_phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      placeholder="parent@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      {...register('parent_email')}
                    />
                    {errors.parent_email && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.parent_email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Address Information */}
              <div>
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{isBn ? '৩. যোগাযোগের বর্তমান ঠিকানা' : '3. Residential Address'}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'বিস্তারিত ঠিকানা (গ্রাম / সড়ক / এলাকা) *' : 'Complete Residential Address *'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. House #12, Aona Bazar, Nawabganj, Dhaka"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                      {...register('address')}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isBn ? 'থানা / উপজেলা / শহর' : 'City / Sub-district'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Nawabganj"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        {...register('city')}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isBn ? 'পোস্ট কোড' : 'Postal Code'}
                      </label>
                      <input
                        type="text"
                        placeholder="1320"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        {...register('postal_code')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Academic Background */}
              <div>
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>{isBn ? '৪. পূর্বতন শিক্ষাগত তথ্য ও অন্যান্য' : '4. Academic Background & Special Notes'}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'পূর্বের বিদ্যালয়ের নাম (যদি থাকে)' : 'Previous School Attended (If any)'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Previous Kindergarten Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      {...register('previous_school')}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'বিশেষ স্বাস্থ্যগত চাহিদা বা এলার্জি (যদি থাকে)' : 'Special Medical Needs or Allergies (If any)'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Please note any health requirements..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                      {...register('special_needs')}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isBn ? 'বিদ্যালয় সম্পর্কে কীভাবে জেনেছেন?' : 'How did you hear about Surjomukhi?'}
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer"
                      {...register('how_did_you_hear')}
                    >
                      <option value="website">Official School Website</option>
                      <option value="socialMedia">Social Media / Facebook</option>
                      <option value="friendReferral">Friend / Parent Referral</option>
                      <option value="advertisement">Campus Banner / Notice</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="bg-slate-50/90 p-5 rounded-2xl border border-slate-200/80">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms_accepted"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                    {...register('terms_accepted')}
                  />
                  <label htmlFor="terms_accepted" className="text-xs sm:text-sm text-slate-700 cursor-pointer leading-relaxed">
                    <span>
                      {isBn
                        ? 'আমি নিশ্চিত করছি যে প্রদত্ত সকল তথ্য সঠিক ও সত্য। আমি সূর্যমুখী কিন্ডারগার্টেনের প্রাতিষ্ঠানিক '
                        : 'I hereby declare that the provided information is true and complete. I agree to comply with Surjomukhi Kindergarten '}
                    </span>
                    <Link href="/admission/policy" className="text-blue-600 font-semibold hover:underline">
                      {isBn ? 'ভর্তি ও আচরণ নীতিমালা' : 'Admission & Campus Policies'}
                    </Link>
                    <span>{isBn ? ' মেনে চলতে সম্মত।' : '.'}</span>
                  </label>
                </div>
                {errors.terms_accepted && (
                  <p className="mt-2 text-xs text-rose-600 font-medium pl-7">{errors.terms_accepted.message}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[220px] inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isBn ? 'আবেদন জমা হচ্ছে...' : 'Submitting Application...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {isBn ? 'অনলাইন আবেদন জমা দিন' : 'Submit Admission Application'}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
                >
                  {isBn ? 'ফর্ম রিসেট করুন' : 'Reset Form'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Three-Step Admission Protocol */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isBn ? 'ভর্তির পরবর্তী ধাপ' : 'Admission Lifecycle'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isBn ? 'আবেদনের পর করণীয় ৩টি ধাপ' : 'What Happens After You Apply?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                {isBn ? '১. আবেদনপত্র যাচাই' : '1. Document Review'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? 'আমাদের একাডেমিক কাউন্সিল অনলাইনে প্রাপ্ত তথ্য ও বয়সের মানদণ্ড যাচাই করে।'
                  : 'The admissions council reviews student eligibility, section capacity, and age criteria.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                {isBn ? '২. যোগাযোগ ও অভিভাবক সেশন' : '2. Parent Interaction'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? 'অভিভাবকের ফোনে যোগাযোগ করে ক্যাম্পাস পরিদর্শন ও শিশু-বান্ধব পরিচিতি সেশনের সময় নির্ধারণ।'
                  : 'We contact parents by phone to arrange a brief, welcoming visit to the campus.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                {isBn ? '৩. ভর্তি চূড়ান্তকরণ ও কিট' : '3. Enrolment & Welcome Kit'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? 'ফি পরিশোধ সাপেক্ষে শিক্ষার্থী আইডি, বই-খাতা ও পাঠ পরিকল্পনা সংক্রান্ত কিট হস্তান্তর।'
                  : 'Official admission clearance, student ID generation, and textbook syllabus bundle handover.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Support Helpline CTA */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {isBn ? 'ফর্ম পূরণে সহায়তার প্রয়োজন?' : 'Need Help With Your Application?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {isBn
                ? 'আমাদের অ্যাডমিশন হেল্পডেস্ক শনিবার থেকে বৃহস্পতিবার সকাল ৮:০০ টা হতে বিকাল ৪:০০ টা পর্যন্ত খোলা।'
                : 'Our admissions counselors are available on call Saturday through Thursday, 8:00 AM to 4:00 PM.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+8801954113374"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4" />
                {isBn ? 'ভর্তি হটলাইন: +880 1954-113374' : 'Admissions Hotline: +880 1954-113374'}
              </a>
              <Link
                href="/admission/how-to-apply"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                {isBn ? 'ভর্তি গাইডলাইন পড়ুন' : 'Read Admission Guide'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
