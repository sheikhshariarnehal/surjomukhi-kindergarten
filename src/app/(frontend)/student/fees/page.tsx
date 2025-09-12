import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tuition Fees - Surjomukhi Kindergarten',
  description: 'View the tuition fees and payment information for Surjomukhi Kindergarten.',
  keywords: ['tuition fees', 'school fees', 'payment', 'cost', 'admission fees'],
};

export default function TuitionFeesPage() {
  const feeStructure = [
    {
      class: 'Play Group',
      admissionFee: '5,000',
      monthlyFee: '3,000',
      annualFee: '36,000',
      color: 'from-pink-400 to-pink-600'
    },
    {
      class: 'Nursery',
      admissionFee: '5,500',
      monthlyFee: '3,200',
      annualFee: '38,400',
      color: 'from-purple-400 to-purple-600'
    },
    {
      class: 'Class One',
      admissionFee: '6,000',
      monthlyFee: '3,500',
      annualFee: '42,000',
      color: 'from-blue-400 to-blue-600'
    },
    {
      class: 'Class Two',
      admissionFee: '6,000',
      monthlyFee: '3,500',
      annualFee: '42,000',
      color: 'from-green-400 to-green-600'
    },
    {
      class: 'Class Three',
      admissionFee: '6,500',
      monthlyFee: '3,800',
      annualFee: '45,600',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      class: 'Class Four',
      admissionFee: '6,500',
      monthlyFee: '3,800',
      annualFee: '45,600',
      color: 'from-orange-400 to-orange-600'
    },
    {
      class: 'Class Five',
      admissionFee: '7,000',
      monthlyFee: '4,000',
      annualFee: '48,000',
      color: 'from-red-400 to-red-600'
    }
  ];

  const additionalFees = [
    { item: 'Application Fee', amount: '500', description: 'Non-refundable processing fee' },
    { item: 'Books & Materials', amount: '2,000-3,000', description: 'Annual cost varies by class' },
    { item: 'School Uniform', amount: '1,500-2,000', description: 'Complete set including accessories' },
    { item: 'Activity Fee', amount: '1,000', description: 'Annual fee for special activities' },
    { item: 'Transport (Optional)', amount: '2,500', description: 'Monthly fee for school transport' },
    { item: 'Lunch (Optional)', amount: '1,500', description: 'Monthly fee for school lunch' }
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
              <li><a href="/student" className="text-gray-500 hover:text-gray-700">Student</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Tuition Fees</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tuition Fees</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transparent and affordable fee structure for quality early childhood education.
          </p>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Fee Structure by Class
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              All fees are in Bangladeshi Taka (BDT). Fees are subject to annual review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feeStructure.map((fee, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className={`bg-gradient-to-r ${fee.color} p-6 text-white text-center`}>
                  <h3 className="text-2xl font-bold mb-2">{fee.class}</h3>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Admission Fee</span>
                      <span className="font-semibold text-gray-900">৳{fee.admissionFee}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Monthly Fee</span>
                      <span className="font-semibold text-gray-900">৳{fee.monthlyFee}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-800 font-medium">Annual Total</span>
                      <span className="font-bold text-emerald-600 text-lg">৳{fee.annualFee}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Fees */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Fees</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Additional costs that may apply depending on your requirements.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Item</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Amount (BDT)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {additionalFees.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.item}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                        ৳{item.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Methods</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">💳</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Bank Transfer</h4>
                    <p className="text-gray-600 text-sm">Direct transfer to school account</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">💰</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cash Payment</h4>
                    <p className="text-gray-600 text-sm">Pay at school office during business hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📱</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mobile Banking</h4>
                    <p className="text-gray-600 text-sm">bKash, Nagad, Rocket accepted</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Schedule</h2>
              <div className="bg-emerald-50 p-6 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">Monthly fees due by 10th of each month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">Late payment fee: ৳200 after 15th</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">Annual payment discount: 5% off total fees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">Sibling discount: 10% for second child</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Assistance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Financial Assistance Available</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            We believe quality education should be accessible to all. Limited financial assistance is available for eligible families.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-bold text-gray-900 mb-2">Need-Based Aid</h3>
              <p className="text-gray-600 text-sm">Financial assistance based on family income</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="font-bold text-gray-900 mb-2">Merit Scholarships</h3>
              <p className="text-gray-600 text-sm">Awards for exceptional students</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="font-bold text-gray-900 mb-2">Payment Plans</h3>
              <p className="text-gray-600 text-sm">Flexible payment arrangements available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions About Fees?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our finance team is available to discuss payment options and answer any questions about our fee structure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Finance Office
            </a>
            <a
              href="/admission/apply-online"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
