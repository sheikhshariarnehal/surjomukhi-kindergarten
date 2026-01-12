import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Exam Schedule - Surjomukhi Kindergarten',
  description: 'View the exam schedule and assessment dates for all classes at Surjomukhi Kindergarten.',
  keywords: ['exam schedule', 'assessment dates', 'test schedule', 'evaluation'],
};

export default function ExamSchedulePage() {
  const examSchedule = [
    {
      term: 'First Term Assessment',
      period: 'March 15-25, 2024',
      classes: ['Play Group', 'Nursery', 'Class One', 'Class Two', 'Class Three', 'Class Four', 'Class Five'],
      type: 'Continuous Assessment',
      color: 'from-blue-400 to-blue-600'
    },
    {
      term: 'Mid-Year Evaluation',
      period: 'July 10-20, 2024',
      classes: ['Class One', 'Class Two', 'Class Three', 'Class Four', 'Class Five'],
      type: 'Portfolio Review',
      color: 'from-green-400 to-green-600'
    },
    {
      term: 'Final Assessment',
      period: 'November 20-30, 2024',
      classes: ['Play Group', 'Nursery', 'Class One', 'Class Two', 'Class Three', 'Class Four', 'Class Five'],
      type: 'Comprehensive Evaluation',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Exam Schedule</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Assessment schedule and evaluation dates for the academic year.
          </p>
        </div>
      </section>

      {/* Assessment Philosophy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Assessment Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Surjomukhi Kindergarten, we believe in age-appropriate assessment methods that focus on 
              celebrating each child&apos;s growth and development rather than creating stress. Our evaluations 
              are designed to be fun, engaging, and supportive of each child&apos;s learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Exam Schedule */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Assessment Schedule</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our assessment schedule is designed to track progress throughout the academic year.
            </p>
          </div>

          <div className="space-y-8">
            {examSchedule.map((exam, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${exam.color} p-6 text-white`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{exam.term}</h3>
                      <p className="text-lg opacity-90">{exam.period}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                        {exam.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Classes Included:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exam.classes.map((className, classIndex) => (
                      <span key={classIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {className}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Assessment Methods by Age Group</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We use different assessment methods appropriate for each age group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-pink-800 mb-4">Play Group & Nursery</h3>
              <ul className="space-y-2 text-sm text-pink-700">
                <li>• Play-based observations</li>
                <li>• Activity participation</li>
                <li>• Social interaction assessment</li>
                <li>• Motor skills evaluation</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Class One & Two</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Portfolio assessment</li>
                <li>• Creative projects</li>
                <li>• Oral presentations</li>
                <li>• Skill demonstrations</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-purple-800 mb-4">Class Three to Five</h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• Written assessments</li>
                <li>• Project-based evaluation</li>
                <li>• Peer collaboration</li>
                <li>• Self-reflection activities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Guidelines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Assessment Preparation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tips for parents to help their children prepare for assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">For Parents</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-violet-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Maintain regular study routines at home</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Ensure adequate sleep and nutrition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Create a positive, stress-free environment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Communicate with teachers about concerns</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">For Students</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-violet-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Review class activities and projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Practice skills learned in class</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Ask teachers for help when needed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Stay calm and do your best</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-violet-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-violet-800 mb-6 text-center">Important Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-violet-800 mb-3">Assessment Policies:</h4>
                <ul className="space-y-2 text-sm text-violet-700">
                  <li>• No formal exams for Play Group and Nursery</li>
                  <li>• Continuous assessment throughout the year</li>
                  <li>• Individual progress reports provided</li>
                  <li>• Parent-teacher conferences scheduled</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-violet-800 mb-3">Make-up Assessments:</h4>
                <ul className="space-y-2 text-sm text-violet-700">
                  <li>• Available for students who miss due to illness</li>
                  <li>• Medical certificate required</li>
                  <li>• Alternative assessment methods used</li>
                  <li>• Contact office within 3 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-violet-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions About Assessments?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our academic team is available to discuss assessment methods and answer any questions.
          </p>
          <a
            href="/contact"
            className="bg-white text-violet-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Academic Team
          </a>
        </div>
      </section>
    </div>
  );
}
