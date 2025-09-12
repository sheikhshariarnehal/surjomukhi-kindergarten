import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Rules - Surjomukhi Kindergarten',
  description: 'Important academic rules and guidelines for students and parents at Surjomukhi Kindergarten.',
  keywords: ['academic rules', 'school rules', 'guidelines', 'policies', 'student conduct'],
};

export default function AcademicRulesPage() {
  const ruleCategories = [
    {
      title: 'Attendance & Punctuality',
      icon: '⏰',
      rules: [
        'Regular attendance is mandatory for academic progress',
        'School hours: 8:00 AM to 3:00 PM',
        'Students should arrive by 8:00 AM',
        'Late arrivals must report to the office',
        'Minimum 80% attendance required for promotion',
        'Notify school in advance for planned absences'
      ]
    },
    {
      title: 'Academic Conduct',
      icon: '📚',
      rules: [
        'Complete all assignments on time',
        'Participate actively in class activities',
        'Respect teachers and follow instructions',
        'Maintain academic honesty and integrity',
        'Bring required books and materials daily',
        'Keep homework diary updated'
      ]
    },
    {
      title: 'Behavior & Discipline',
      icon: '🤝',
      rules: [
        'Treat all students and staff with respect',
        'Use polite language at all times',
        'No bullying or aggressive behavior',
        'Follow classroom and playground rules',
        'Resolve conflicts peacefully',
        'Report any problems to teachers'
      ]
    },
    {
      title: 'Uniform & Appearance',
      icon: '👕',
      rules: [
        'Wear complete school uniform daily',
        'Maintain neat and clean appearance',
        'Proper school shoes required',
        'Hair should be neat and tidy',
        'No jewelry except small earrings for girls',
        'Name tags must be visible'
      ]
    },
    {
      title: 'Health & Safety',
      icon: '🏥',
      rules: [
        'Inform school of any health conditions',
        'Bring prescribed medications with proper labels',
        'Follow safety rules in all areas',
        'Report injuries or illness immediately',
        'Maintain personal hygiene',
        'No sharing of food with allergies'
      ]
    },
    {
      title: 'Parent Guidelines',
      icon: '👨‍👩‍👧‍👦',
      rules: [
        'Attend parent-teacher meetings regularly',
        'Support homework and study routines',
        'Communicate concerns promptly',
        'Follow pickup and drop-off procedures',
        'Update contact information when changed',
        'Participate in school activities'
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
              <li><a href="/academic" className="text-gray-500 hover:text-gray-700">Academic</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Academic Rules</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Rules & Guidelines</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Important rules and guidelines to ensure a positive learning environment for all students.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Creating a Positive Learning Environment
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our academic rules are designed to create a safe, respectful, and conducive learning environment 
              where every child can thrive. These guidelines help maintain order, promote respect, and ensure 
              the best possible educational experience for all students.
            </p>
          </div>
        </div>
      </section>

      {/* Rules Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ruleCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{category.icon}</span>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start text-sm text-gray-700">
                        <span className="text-red-500 mr-3 mt-1 flex-shrink-0">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consequences & Rewards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🌟</span>
                Positive Reinforcement
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-green-700">Praise and recognition for good behavior</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-green-700">Student of the month awards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-green-700">Special privileges for consistent good conduct</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-green-700">Parent communication about positive behavior</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">⚠️</span>
                Corrective Measures
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-orange-700">Gentle reminders and guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-orange-700">Time-out for reflection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-orange-700">Parent-teacher discussion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-orange-700">Behavior improvement plan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Important Notes</h2>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">For Parents:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Please review these rules with your child regularly</li>
                  <li>• Support school policies at home</li>
                  <li>• Contact teachers for any clarifications</li>
                  <li>• Attend orientation sessions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">For Students:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Ask questions if you don't understand a rule</li>
                  <li>• Help your classmates follow the rules</li>
                  <li>• Talk to teachers about any problems</li>
                  <li>• Be proud of following school rules</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions About Our Rules?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're here to help you understand our policies and create the best learning environment for your child.
          </p>
          <a
            href="/contact"
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
