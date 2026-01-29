import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nursery (Ages 3-4) - Surjomukhi Kindergarten',
  description: 'Our Nursery program builds foundation skills in language, numbers, and creativity while developing independence.',
  keywords: ['nursery', 'ages 3-4', 'foundation skills', 'independence', 'early learning'],
};

export default function NurseryPage() {
  const subjects = [
    { name: 'Language Arts', icon: '📖', focus: 'Letter recognition, phonics, vocabulary building' },
    { name: 'Mathematics', icon: '🔢', focus: 'Numbers 1-20, shapes, patterns, counting' },
    { name: 'Science', icon: '🔬', focus: 'Nature exploration, simple experiments, observation' },
    { name: 'Creative Arts', icon: '🎨', focus: 'Drawing, painting, music, dramatic play' },
    { name: 'Physical Education', icon: '⚽', focus: 'Gross motor skills, coordination, games' },
    { name: 'Social Studies', icon: '🌍', focus: 'Family, community, cultural awareness' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🌱</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nursery</h1>
          <p className="text-xl md:text-2xl mb-4">Ages 3-4 Years</p>
          <p className="text-lg max-w-3xl mx-auto">
            Building foundation skills in language, numbers, and creativity while developing independence.
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Program Highlights</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Foundation Skills</h4>
                    <p className="text-gray-600">Building essential pre-academic skills through structured activities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Independence Development</h4>
                    <p className="text-gray-600">Encouraging self-help skills and confident decision-making</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Creative Expression</h4>
                    <p className="text-gray-600">Fostering imagination through art, music, and storytelling</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-800 mb-6">Class Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Age Range:</span>
                  <span>3-4 Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Class Size:</span>
                  <span>Max 12 children</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>Full Day (6 hours)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Teacher Ratio:</span>
                  <span>1:6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Learning Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-4">{subject.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{subject.name}</h3>
                <p className="text-gray-600 text-sm">{subject.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Nurture Your Child&apos;s Growth</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Help your child build strong foundations for future learning success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admission" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" aria-label="Apply now for Nursery admission">
              Apply Now
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors" aria-label="Contact us to learn more about Nursery program">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
