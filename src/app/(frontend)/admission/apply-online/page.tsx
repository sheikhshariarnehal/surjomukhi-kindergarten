'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@/contexts/LanguageContext';
import {
  admissionApplicationSchema,
  type AdmissionApplicationFormData,
  AGE_CLASS_FEE_MAPPING,
  calculateAge,
  getClassOptionsForAge,
  getFeeStructureForClass
} from '@/lib/validators';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

// Types
interface Step {
  icon: string;
  title: string;
  description: string;
}

export default function ApplyOnlinePage() {
  const { t, language } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [studentAge, setStudentAge] = useState<number | null>(null);
  const [feeInfo, setFeeInfo] = useState<{ monthlyFee: number; admissionFee: number } | null>(null);

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
        setSubmitSuccess(true);
        toast.success(t('admission.applyOnline.messages.success'));
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(result.error || t('admission.applyOnline.messages.error'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(t('admission.applyOnline.messages.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get class options based on student age
  const getClassOptions = () => {
    if (!studentAge) {
      return AGE_CLASS_FEE_MAPPING.map(item => ({
        value: item.className,
        label: `${item.className} (Age ${item.age})`,
      }));
    }

    const ageOptions = getClassOptionsForAge(studentAge);
    return ageOptions.map(item => ({
      value: item.className,
      label: item.className,
    }));
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('admission.applyOnline.messages.success')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('admission.applyOnline.messages.successDescription')}
          </p>
          <div className="space-y-3">
            <Link href="/admission">
              <Button variant="primary" className="w-full">
                {t('common.back')} {t('nav.admission')}
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                {t('nav.home')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  {t('admission.applyOnline.breadcrumb.home')}
                </Link>
              </li>
              <li><span className="text-gray-400">/</span></li>
              <li>
                <Link href="/admission" className="text-gray-500 hover:text-gray-700">
                  {t('admission.applyOnline.breadcrumb.admission')}
                </Link>
              </li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">{t('admission.applyOnline.breadcrumb.applyOnline')}</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            {t('admission.applyOnline.hero.title')}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
            {t('admission.applyOnline.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              {t('admission.applyOnline.formTitle')}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              {t('admission.applyOnline.formSubtitle')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
              {/* Student Information */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 pb-2 border-b border-gray-200">
                  {t('admission.applyOnline.sections.studentInfo')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label={`${t('admission.applyOnline.fields.studentName.label')} *`}
                      placeholder={t('admission.applyOnline.fields.studentName.placeholder')}
                      error={errors.student_name?.message}
                      {...register('student_name')}
                    />
                  </div>

                  <div>
                    <Input
                      type="date"
                      label={`${t('admission.applyOnline.fields.dateOfBirth.label')} *`}
                      error={errors.date_of_birth?.message}
                      {...register('date_of_birth')}
                    />
                    {studentAge && (
                      <p className="mt-1 text-sm text-gray-600">
                        {language === 'en' ? `Age: ${studentAge} years` : `বয়স: ${studentAge} বছর`}
                      </p>
                    )}
                  </div>

                  <div>
                    <Select
                      label={`${t('admission.applyOnline.fields.gender.label')} *`}
                      placeholder={t('admission.applyOnline.fields.gender.placeholder')}
                      options={[
                        { value: 'male', label: t('admission.applyOnline.fields.gender.options.male') },
                        { value: 'female', label: t('admission.applyOnline.fields.gender.options.female') },
                        { value: 'other', label: t('admission.applyOnline.fields.gender.options.other') },
                      ]}
                      error={errors.gender?.message}
                      {...register('gender')}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Select
                      label={`${t('admission.applyOnline.fields.classApplying.label')} *`}
                      placeholder={t('admission.applyOnline.fields.classApplying.placeholder')}
                      options={getClassOptions()}
                      error={errors.class_applying?.message}
                      {...register('class_applying')}
                    />
                    {studentAge && (
                      <p className="mt-1 text-sm text-primary-600">
                        {t('admission.applyOnline.fields.classApplying.autoSelected')}
                      </p>
                    )}
                  </div>

                  {/* Fee Information Display */}
                  {feeInfo && (
                    <div className="md:col-span-2 bg-primary-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t('admission.applyOnline.feeInfo.title')}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">{t('admission.applyOnline.feeInfo.monthlyFee')}:</span>
                          <span className="ml-2 font-semibold text-primary-700">
                            {t('admission.applyOnline.feeInfo.currency')}{feeInfo.monthlyFee}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">{t('admission.applyOnline.feeInfo.admissionFee')}:</span>
                          <span className="ml-2 font-semibold text-primary-700">
                            {t('admission.applyOnline.feeInfo.currency')}{feeInfo.admissionFee}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Parent/Guardian Information */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 pb-2 border-b border-gray-200">
                  {t('admission.applyOnline.sections.parentInfo')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label={`${t('admission.applyOnline.fields.parentName.label')} *`}
                      placeholder={t('admission.applyOnline.fields.parentName.placeholder')}
                      error={errors.parent_name?.message}
                      {...register('parent_name')}
                    />
                  </div>

                  <div>
                    <Input
                      label={t('admission.applyOnline.fields.fatherName.label')}
                      placeholder={t('admission.applyOnline.fields.fatherName.placeholder')}
                      error={errors.father_name?.message}
                      {...register('father_name')}
                    />
                  </div>

                  <div>
                    <Input
                      label={t('admission.applyOnline.fields.motherName.label')}
                      placeholder={t('admission.applyOnline.fields.motherName.placeholder')}
                      error={errors.mother_name?.message}
                      {...register('mother_name')}
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      label={`${t('admission.applyOnline.fields.parentPhone.label')} *`}
                      placeholder={t('admission.applyOnline.fields.parentPhone.placeholder')}
                      error={errors.parent_phone?.message}
                      {...register('parent_phone')}
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      label={`${t('admission.applyOnline.fields.parentEmail.label')} *`}
                      placeholder={t('admission.applyOnline.fields.parentEmail.placeholder')}
                      error={errors.parent_email?.message}
                      {...register('parent_email')}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 pb-2 border-b border-gray-200">
                  {t('admission.applyOnline.sections.addressInfo')}
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Textarea
                      label={`${t('admission.applyOnline.fields.address.label')} *`}
                      placeholder={t('admission.applyOnline.fields.address.placeholder')}
                      rows={3}
                      error={errors.address?.message}
                      {...register('address')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Input
                        label={t('admission.applyOnline.fields.city.label')}
                        placeholder={t('admission.applyOnline.fields.city.placeholder')}
                        error={errors.city?.message}
                        {...register('city')}
                      />
                    </div>

                    <div>
                      <Input
                        label={t('admission.applyOnline.fields.postalCode.label')}
                        placeholder={t('admission.applyOnline.fields.postalCode.placeholder')}
                        error={errors.postal_code?.message}
                        {...register('postal_code')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 pb-2 border-b border-gray-200">
                  {t('admission.applyOnline.sections.additionalInfo')}
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Input
                      label={t('admission.applyOnline.fields.previousSchool.label')}
                      placeholder={t('admission.applyOnline.fields.previousSchool.placeholder')}
                      error={errors.previous_school?.message}
                      {...register('previous_school')}
                    />
                  </div>

                  <div>
                    <Textarea
                      label={t('admission.applyOnline.fields.specialNeeds.label')}
                      placeholder={t('admission.applyOnline.fields.specialNeeds.placeholder')}
                      rows={3}
                      error={errors.special_needs?.message}
                      {...register('special_needs')}
                    />
                  </div>

                  <div>
                    <Select
                      label={t('admission.applyOnline.fields.howDidYouHear.label')}
                      placeholder={t('admission.applyOnline.fields.howDidYouHear.placeholder')}
                      options={[
                        { value: 'website', label: t('admission.applyOnline.fields.howDidYouHear.options.website') },
                        { value: 'socialMedia', label: t('admission.applyOnline.fields.howDidYouHear.options.socialMedia') },
                        { value: 'friendReferral', label: t('admission.applyOnline.fields.howDidYouHear.options.friendReferral') },
                        { value: 'advertisement', label: t('admission.applyOnline.fields.howDidYouHear.options.advertisement') },
                        { value: 'other', label: t('admission.applyOnline.fields.howDidYouHear.options.other') },
                      ]}
                      error={errors.how_did_you_hear?.message}
                      {...register('how_did_you_hear')}
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms_accepted"
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                    {...register('terms_accepted')}
                  />
                  <div className="flex-1">
                    <label htmlFor="terms_accepted" className="text-sm text-gray-700 cursor-pointer">
                      <p className="mb-2">
                        {t('admission.applyOnline.fields.termsAccepted.label')}
                      </p>
                      <p>
                        <Link href="/admission/policy" className="text-primary-600 hover:underline font-medium">
                          {t('admission.applyOnline.fields.termsAccepted.linkText')}
                        </Link>
                      </p>
                    </label>
                    {errors.terms_accepted && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.terms_accepted.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  {isSubmitting
                    ? t('admission.applyOnline.buttons.submitting')
                    : t('admission.applyOnline.buttons.submit')
                  }
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {t('admission.applyOnline.buttons.reset')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
              {t('admission.applyOnline.nextSteps.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              {t('admission.applyOnline.nextSteps.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {t('admission.applyOnline.nextSteps.steps', []).map((step: Step, index: number) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
