import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Apply - Surjomukhi Kindergarten',
  description: 'Step-by-step guide on how to apply for admission at Surjomukhi Kindergarten.',
  keywords: ['how to apply', 'admission process', 'application steps', 'enrollment'],
};

export default function HowToApplyPage() {
  const steps = [
    {
      step: 1,
      title: 'Initial Inquiry',
      description: 'Contact us or visit our school to learn about our programs and admission requirements.',
      details: [
        'Schedule a school tour',
        'Meet with admission counselor',
        'Collect information brochure',
        'Understand fee structure'
      ],
      icon: '📞'
    },
    {
      step: 2,
      title: 'Application Form',
      description: 'Complete and submit the admission application form with required documents.',
      details: [
        'Fill out application form completely',
        'Attach recent photographs',
        'Submit required documents',
        'Pay application fee'
      ],
      icon: '📝'
    },
    {
      step: 3,
      title: 'Document Submission',
      description: 'Provide all necessary documents for verification and processing.',
      details: [
        'Birth certificate copy',
        'Vaccination records',
        'Previous school records (if any)',
        'Parent identification documents'
      ],
      icon: '📄'
    },
    {
      step: 4,
      title: 'Child Assessment',
      description: 'Informal assessment to understand your child\'s developmental level and needs.',
      details: [
        'Play-based interaction',
        'Basic skill observation',
        'Social behavior assessment',
        'Parent interview'
      ],
      icon: '👶'
    },
    {
      step: 5,
      title: 'Admission Decision',
      description: 'Review of application and notification of admission status.',
      details: [
        'Application review process',
        'Admission committee decision',
        'Notification to parents',
        'Waiting list if applicable'
      ],
      icon: '✅'
    },
    {
      step: 6,
      title: 'Enrollment Confirmation',
      description: 'Complete the enrollment process and prepare for school start.',
      details: [
        'Pay admission fees',
        'Complete enrollment forms',
        'Attend orientation session',
        'Purchase school uniform'
      ],
      icon: '🎒'
    }
  ];

  const requirements = [
    { category: 'Age Requirements', items: ['Play Group: 2-3 years', 'Nursery: 3-4 years', 'Class One: 4-5 years', 'And so on...'] },
    { category: 'Required Documents', items: ['Birth Certificate', 'Vaccination Records', 'Recent Photographs', 'Parent ID Copies'] },
    { category: 'Application Fee', items: ['Non-refundable application fee', 'Payment methods accepted', 'Fee waiver for eligible families'] },
    { category: 'Timeline', items: ['Applications open: January', 'Deadline: March 31st', 'Admission decisions: April', 'School starts: May'] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><a href="/admission" className="text-gray-500 hover:text-gray-700">Admission</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">How to Apply</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How to Apply</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Follow our simple step-by-step process to secure your child's place at Surjomukhi Kindergarten.
          </p>
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Application Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our admission process is designed to be straightforward and supportive for families.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                <div className="lg:w-1/2">
                  <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-500">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-sm text-gray-600">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/2 text-center">
                  <div className="text-8xl mb-4">{step.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-700">Step {step.step}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Admission Requirements
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Important information about requirements, documents, and timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((req, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{req.category}</h3>
                <ul className="space-y-2">
                  {req.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm text-gray-600">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Need Help with Your Application?</h2>
            <p className="text-lg text-green-700 mb-8 max-w-3xl mx-auto">
              Our admission team is here to guide you through every step of the process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📞</div>
                <h4 className="font-semibold text-green-800">Phone</h4>
                <p className="text-green-700">+880-1234-567890</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📧</div>
                <h4 className="font-semibold text-green-800">Email</h4>
                <p className="text-green-700">admissions@surjomukhi.edu</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🏫</div>
                <h4 className="font-semibold text-green-800">Visit</h4>
                <p className="text-green-700">Monday - Friday, 9 AM - 4 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start the Application Process?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Take the first step towards your child's bright future at Surjomukhi Kindergarten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admission/apply-online"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Online
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Schedule Visit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
