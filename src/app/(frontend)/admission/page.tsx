import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admissions - Join Our School Community',
  description: 'Learn about our admission process, requirements, fees, and how to apply. Join our educational community and start your journey with us.',
  keywords: ['school admission', 'enrollment', 'application process', 'admission requirements', 'school fees', 'apply now'],
  openGraph: {
    title: 'Admissions - Join Our School Community',
    description: 'Learn about our admission process, requirements, fees, and how to apply. Join our educational community and start your journey with us.',
    type: 'website',
  },
};

const admissionStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "School Admissions",
  "description": "Information about school admission process, requirements, and application procedures.",
  "url": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admission`,
  "mainEntity": {
    "@type": "EducationalOrganization",
    "name": "School Name",
    "offers": {
      "@type": "EducationalOccupationalProgram",
      "name": "Primary and Secondary Education",
      "description": "Comprehensive education program from kindergarten through grade 12"
    }
  }
};

export default function AdmissionPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(admissionStructuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Admissions
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Join our educational community and embark on a journey of learning, growth, and discovery.
              </p>
              <a
                href="#application-process"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Start Your Application
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our School?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover what makes our educational approach unique and effective.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Experienced Faculty",
                  description: "Our dedicated teachers bring years of experience and passion for education.",
                  icon: "👨‍🏫"
                },
                {
                  title: "Small Class Sizes",
                  description: "Personalized attention with optimal student-to-teacher ratios.",
                  icon: "👥"
                },
                {
                  title: "Modern Facilities",
                  description: "State-of-the-art classrooms, labs, and recreational facilities.",
                  icon: "🏫"
                },
                {
                  title: "Holistic Development",
                  description: "Focus on academic, social, emotional, and physical growth.",
                  icon: "🌟"
                },
                {
                  title: "Extracurricular Activities",
                  description: "Wide range of sports, arts, and club activities.",
                  icon: "🎨"
                },
                {
                  title: "Parent Involvement",
                  description: "Strong partnership between school, students, and families.",
                  icon: "🤝"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Admission Requirements */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Admission Requirements
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Here&apos;s what you need to know about our admission process.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h3>
                <div className="space-y-4">
                  {[
                    "Completed application form",
                    "Birth certificate (original and copy)",
                    "Previous school transcripts/report cards",
                    "Transfer certificate (if applicable)",
                    "Medical certificate and vaccination records",
                    "Passport-size photographs (4 copies)",
                    "Parent/Guardian identification documents",
                    "Proof of residence"
                  ].map((requirement, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Age Requirements</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="space-y-4">
                    {[
                      { grade: "Kindergarten", age: "4-5 years" },
                      { grade: "Grade 1", age: "5-6 years" },
                      { grade: "Grade 2", age: "6-7 years" },
                      { grade: "Grade 3", age: "7-8 years" },
                      { grade: "Grade 4", age: "8-9 years" },
                      { grade: "Grade 5", age: "9-10 years" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="font-medium text-gray-900">{item.grade}</span>
                        <span className="text-gray-600">{item.age}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    * Age as of September 1st of the academic year
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section id="application-process" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Application Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow these simple steps to complete your application.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Submit Application",
                  description: "Complete and submit the online application form with required documents."
                },
                {
                  step: "2",
                  title: "Document Review",
                  description: "Our admissions team will review your application and documents."
                },
                {
                  step: "3",
                  title: "Interview/Assessment",
                  description: "Attend an interview or assessment session (if required)."
                },
                {
                  step: "4",
                  title: "Admission Decision",
                  description: "Receive admission decision and complete enrollment process."
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fees Structure */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Fee Structure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transparent and affordable fee structure for quality education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "Kindergarten",
                  fees: [
                    { item: "Admission Fee", amount: "$200" },
                    { item: "Annual Tuition", amount: "$3,500" },
                    { item: "Books & Materials", amount: "$150" },
                    { item: "Activities Fee", amount: "$100" }
                  ]
                },
                {
                  category: "Elementary (Grades 1-5)",
                  fees: [
                    { item: "Admission Fee", amount: "$250" },
                    { item: "Annual Tuition", amount: "$4,200" },
                    { item: "Books & Materials", amount: "$200" },
                    { item: "Activities Fee", amount: "$150" }
                  ]
                },
                {
                  category: "Middle School (Grades 6-8)",
                  fees: [
                    { item: "Admission Fee", amount: "$300" },
                    { item: "Annual Tuition", amount: "$4,800" },
                    { item: "Books & Materials", amount: "$250" },
                    { item: "Activities Fee", amount: "$200" }
                  ]
                }
              ].map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{category.category}</h3>
                  <div className="space-y-3">
                    {category.fees.map((fee, feeIndex) => (
                      <div key={feeIndex} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-700">{fee.item}</span>
                        <span className="font-semibold text-primary-600">{fee.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                * Payment plans and financial assistance available. Contact our admissions office for more details.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Contact Admissions Office
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Important Dates
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Mark your calendar with these important admission dates.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { event: "Application Opens", date: "January 15, 2024" },
                  { event: "Application Deadline", date: "March 31, 2024" },
                  { event: "Entrance Assessments", date: "April 15-30, 2024" },
                  { event: "Admission Results", date: "May 15, 2024" },
                  { event: "Enrollment Deadline", date: "June 15, 2024" },
                  { event: "Academic Year Begins", date: "September 1, 2024" }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.event}</h3>
                    <p className="text-primary-600 font-medium">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Apply?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Take the first step towards your child&apos;s bright future. Start your application today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Schedule a Visit
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
