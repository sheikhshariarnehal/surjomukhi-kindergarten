import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission Policy - Surjomukhi Kindergarten',
  description: 'Read our comprehensive admission policy including eligibility criteria, selection process, and important guidelines.',
  keywords: ['admission policy', 'eligibility criteria', 'selection process', 'admission guidelines'],
};

export default function AdmissionPolicyPage() {
  const policies = [
    {
      title: 'Eligibility Criteria',
      icon: '📋',
      content: [
        'Children must meet the minimum age requirement for their respective class level',
        'Play Group: 2 years completed by May 1st of the academic year',
        'Nursery: 3 years completed by May 1st of the academic year',
        'Class One: 4 years completed by May 1st of the academic year',
        'All children must be toilet trained for Play Group and above',
        'Medical fitness certificate required for all applicants'
      ]
    },
    {
      title: 'Selection Process',
      icon: '🎯',
      content: [
        'Applications are processed on a first-come, first-served basis',
        'Priority given to siblings of current students',
        'Informal assessment to understand child\'s developmental readiness',
        'Parent interview to discuss child\'s needs and school expectations',
        'Final selection based on available seats and child\'s readiness',
        'Waiting list maintained for oversubscribed classes'
      ]
    },
    {
      title: 'Required Documentation',
      icon: '📄',
      content: [
        'Completed application form with recent photographs',
        'Original birth certificate and photocopy',
        'Immunization records and health certificate',
        'Previous school records (if applicable)',
        'Parent/guardian identification documents',
        'Proof of address (utility bill or rental agreement)'
      ]
    },
    {
      title: 'Fee Structure & Payment',
      icon: '💰',
      content: [
        'Application fee: Non-refundable processing fee',
        'Admission fee: One-time payment upon confirmation',
        'Monthly tuition: Payable in advance by 10th of each month',
        'Additional fees: Books, uniform, activities as applicable',
        'Payment methods: Cash, bank transfer, or online payment',
        'Fee concessions available for eligible families'
      ]
    },
    {
      title: 'Withdrawal & Refund Policy',
      icon: '🔄',
      content: [
        'One month written notice required for withdrawal',
        'Admission fee is non-refundable under all circumstances',
        'Monthly fees paid in advance are non-refundable',
        'Refund of security deposit after clearance of dues',
        'Transfer certificate issued within 7 working days',
        'No refund for partial month attendance'
      ]
    },
    {
      title: 'Special Considerations',
      icon: '⭐',
      content: [
        'Children with special needs welcome with prior discussion',
        'Individual education plans developed as needed',
        'Additional support services available',
        'Regular review meetings with parents',
        'Collaboration with external specialists when required',
        'Inclusive environment for all children'
      ]
    }
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
              <li><span className="text-gray-900 font-medium">Admission Policy</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Admission Policy</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Comprehensive guidelines and policies for admission to Surjomukhi Kindergarten.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Admission Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Surjomukhi Kindergarten, we believe every child deserves a quality education in a nurturing environment. 
              Our admission policy is designed to be fair, transparent, and inclusive while ensuring the best fit between 
              our educational approach and each child's needs. We welcome families from all backgrounds and are committed 
              to creating a diverse and supportive learning community.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policies.map((policy, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{policy.icon}</span>
                    <h3 className="text-xl font-bold">{policy.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {policy.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-sm text-gray-700">
                        <span className="text-blue-500 mr-3 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Important Admission Dates
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mark your calendar with these important admission timeline dates.
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📅</div>
                <h4 className="font-semibold text-blue-800 mb-2">Applications Open</h4>
                <p className="text-blue-700">January 1st</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⏰</div>
                <h4 className="font-semibold text-blue-800 mb-2">Application Deadline</h4>
                <p className="text-blue-700">March 31st</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📋</div>
                <h4 className="font-semibold text-blue-800 mb-2">Assessment Period</h4>
                <p className="text-blue-700">April 1-15</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">✅</div>
                <h4 className="font-semibold text-blue-800 mb-2">Results Announced</h4>
                <p className="text-blue-700">April 30th</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Our Policy?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Our admission team is available to clarify any questions about our policies and procedures.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2">📞</div>
                <h4 className="font-semibold text-gray-800">Admission Hotline</h4>
                <p className="text-gray-600">+880-1234-567890</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📧</div>
                <h4 className="font-semibold text-gray-800">Email Inquiries</h4>
                <p className="text-gray-600">admissions@surjomukhi.edu</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🕒</div>
                <h4 className="font-semibold text-gray-800">Office Hours</h4>
                <p className="text-gray-600">Mon-Fri: 9 AM - 4 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Apply?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Now that you understand our admission policy, take the next step and begin your application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admission/apply-online"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Online
            </a>
            <a
              href="/admission/how-to-apply"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Application Process
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
