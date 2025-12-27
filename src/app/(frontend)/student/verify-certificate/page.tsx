import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Verify Certificate - Surjomukhi Kindergarten',
  description: 'Verify the authenticity of certificates issued by Surjomukhi Kindergarten.',
  keywords: ['verify certificate', 'certificate verification', 'document verification', 'authenticity'],
};

export default function VerifyCertificatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li><Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><Link href="/student" className="text-gray-500 hover:text-gray-700">Student</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Verify Certificate</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Verify Certificate</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Verify the authenticity of certificates issued by Surjomukhi Kindergarten.
          </p>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Certificate Verification System
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Enter the certificate details below to verify its authenticity and validity.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Number *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter certificate number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter student's full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Issue *
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Type *
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select Certificate Type</option>
                    <option value="completion">Completion Certificate</option>
                    <option value="transfer">Transfer Certificate</option>
                    <option value="character">Character Certificate</option>
                    <option value="achievement">Achievement Certificate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Security Code (if available)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter security code from certificate"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-12 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-colors"
                >
                  Verify Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Certificate Verification Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our verification system ensures the authenticity of all certificates issued by our school.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 1: Enter Details</h3>
              <p className="text-gray-600 text-sm">Provide the certificate number, student name, and other required information</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 2: System Check</h3>
              <p className="text-gray-600 text-sm">Our system searches the database for matching certificate records</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 3: Get Results</h3>
              <p className="text-gray-600 text-sm">Receive instant verification results with certificate details</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Certificates We Issue</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We issue various types of certificates for our students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-cyan-50 p-6 rounded-lg text-center">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="font-bold text-cyan-800 mb-2">Completion Certificate</h3>
              <p className="text-cyan-700 text-sm">Issued upon successful completion of a class level</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="font-bold text-blue-800 mb-2">Transfer Certificate</h3>
              <p className="text-blue-700 text-sm">Required when transferring to another school</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl mb-4">⭐</div>
              <h3 className="font-bold text-green-800 mb-2">Character Certificate</h3>
              <p className="text-green-700 text-sm">Certifies the student&apos;s character and conduct</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="font-bold text-purple-800 mb-2">Achievement Certificate</h3>
              <p className="text-purple-700 text-sm">Recognizes special achievements and awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cyan-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-cyan-800 mb-6 text-center">Important Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-cyan-800 mb-3">For Certificate Holders:</h4>
                <ul className="space-y-2 text-sm text-cyan-700">
                  <li>• Keep your certificate number safe and secure</li>
                  <li>• Report any discrepancies immediately</li>
                  <li>• Contact us if you lose your certificate</li>
                  <li>• Duplicate certificates can be issued with proper documentation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-800 mb-3">For Employers/Institutions:</h4>
                <ul className="space-y-2 text-sm text-cyan-700">
                  <li>• Always verify certificates before making decisions</li>
                  <li>• Contact our office for additional verification</li>
                  <li>• Look for security features on physical certificates</li>
                  <li>• Report suspected fraudulent certificates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Help */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help with Verification?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            If you&apos;re having trouble with the verification process or need additional assistance, please contact our office.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">📞</div>
              <h4 className="font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600">+880-1234-567890</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📧</div>
              <h4 className="font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600">certificates@surjomukhi.edu</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏫</div>
              <h4 className="font-semibold text-gray-800">Visit Office</h4>
              <p className="text-gray-600">Monday - Friday, 9 AM - 4 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Verify Your Certificate Now
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Use our secure verification system to confirm the authenticity of your Surjomukhi Kindergarten certificate.
          </p>
          <a
            href="#verification-form"
            className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Verification
          </a>
        </div>
      </section>
    </div>
  );
}
