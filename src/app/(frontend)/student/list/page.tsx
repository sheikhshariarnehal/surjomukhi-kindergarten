import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Students List - Surjomukhi Kindergarten',
  description: 'Access the students list and directory for Surjomukhi Kindergarten.',
  keywords: ['students list', 'student directory', 'class lists', 'student information'],
};

export default function StudentsListPage() {
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
              <li><span className="text-gray-900 font-medium">Students List</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Students List</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Access student directory and class information.
          </p>
        </div>
      </section>

      {/* Access Notice */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Restricted Access</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              The students list is available only to authorized personnel, current parents, and enrolled students 
              for privacy and security reasons. Please log in to access this information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Parent Login
              </button>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Staff Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Class Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Classes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Overview of our class structure and student capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Play Group', ages: '2-3 years', capacity: '15 students', color: 'from-pink-400 to-pink-600' },
              { name: 'Nursery', ages: '3-4 years', capacity: '18 students', color: 'from-purple-400 to-purple-600' },
              { name: 'Class One', ages: '4-5 years', capacity: '20 students', color: 'from-blue-400 to-blue-600' },
              { name: 'Class Two', ages: '5-6 years', capacity: '20 students', color: 'from-green-400 to-green-600' },
              { name: 'Class Three', ages: '6-7 years', capacity: '22 students', color: 'from-yellow-400 to-yellow-600' },
              { name: 'Class Four', ages: '7-8 years', capacity: '22 students', color: 'from-orange-400 to-orange-600' },
              { name: 'Class Five', ages: '8-9 years', capacity: '25 students', color: 'from-red-400 to-red-600' }
            ].map((classInfo, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className={`bg-gradient-to-r ${classInfo.color} p-6 text-white text-center`}>
                  <h3 className="text-xl font-bold mb-2">{classInfo.name}</h3>
                  <p className="opacity-90">{classInfo.ages}</p>
                </div>
                <div className="p-6 text-center">
                  <p className="text-gray-600 mb-2">Maximum Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">{classInfo.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Access to Student Information?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact our office for assistance with accessing student lists or directory information.
          </p>
          <a
            href="/contact"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Contact Office
          </a>
        </div>
      </section>
    </div>
  );
}
