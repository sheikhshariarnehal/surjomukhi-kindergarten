import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Classes - Surjomukhi Kindergarten',
  description: 'Explore our different class levels from Play Group to Class Five, each designed for specific age groups and developmental stages.',
  keywords: ['classes', 'grade levels', 'age groups', 'kindergarten classes'],
  openGraph: {
    title: 'Our Classes - Surjomukhi Kindergarten',
    description: 'Explore our different class levels and age-appropriate programs.',
    type: 'website',
  },
};

export default function ClassesPage() {
  const classes = [
    {
      name: 'Play Group',
      ageRange: '2-3 Years',
      slug: 'play-group',
      description: 'Introduction to school environment with focus on social skills and basic learning through play.',
      highlights: ['Social interaction', 'Basic motor skills', 'Sensory play', 'Simple routines'],
      color: 'from-pink-400 to-pink-600',
      icon: '🧸'
    },
    {
      name: 'Nursery',
      ageRange: '3-4 Years',
      slug: 'nursery',
      description: 'Building foundation skills in language, numbers, and creativity while developing independence.',
      highlights: ['Letter recognition', 'Number concepts', 'Creative expression', 'Independence skills'],
      color: 'from-purple-400 to-purple-600',
      icon: '🌱'
    },
    {
      name: 'Class One',
      ageRange: '4-5 Years',
      slug: 'one',
      description: 'Formal introduction to reading, writing, and mathematics with structured learning activities.',
      highlights: ['Reading readiness', 'Writing practice', 'Basic math', 'Science exploration'],
      color: 'from-blue-400 to-blue-600',
      icon: '📚'
    },
    {
      name: 'Class Two',
      ageRange: '5-6 Years',
      slug: 'two',
      description: 'Advancing literacy and numeracy skills while exploring science and social studies concepts.',
      highlights: ['Reading fluency', 'Math operations', 'Science experiments', 'Social awareness'],
      color: 'from-green-400 to-green-600',
      icon: '🔬'
    },
    {
      name: 'Class Three',
      ageRange: '6-7 Years',
      slug: 'three',
      description: 'Developing critical thinking skills and deeper understanding of academic subjects.',
      highlights: ['Critical thinking', 'Advanced reading', 'Problem solving', 'Research skills'],
      color: 'from-yellow-400 to-yellow-600',
      icon: '🎯'
    },
    {
      name: 'Class Four',
      ageRange: '7-8 Years',
      slug: 'four',
      description: 'Preparing for advanced learning with emphasis on analytical thinking and creativity.',
      highlights: ['Analytical skills', 'Creative writing', 'Advanced math', 'Project work'],
      color: 'from-orange-400 to-orange-600',
      icon: '🚀'
    },
    {
      name: 'Class Five',
      ageRange: '8-9 Years',
      slug: 'five',
      description: 'Final preparation for primary education with comprehensive skill development.',
      highlights: ['Leadership skills', 'Independent learning', 'Complex projects', 'Peer mentoring'],
      color: 'from-red-400 to-red-600',
      icon: '🏆'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Classes
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover our age-appropriate class levels designed to nurture your child&apos;s development at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* Classes Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Age-Appropriate Learning
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Each class level is carefully designed to meet the developmental needs and learning capabilities 
              of children at specific age ranges. Our progressive curriculum ensures smooth transitions 
              between levels while building strong foundations for future learning.
            </p>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classInfo, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-r ${classInfo.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{classInfo.icon}</span>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                      {classInfo.ageRange}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{classInfo.name}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">{classInfo.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Highlights:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {classInfo.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    href={`/academic/classes/${classInfo.slug}`}
                    className={`inline-flex items-center justify-center w-full bg-gradient-to-r ${classInfo.color} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Makes Our Classes Special
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every class at Surjomukhi Kindergarten is designed with your child&apos;s development in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Small Class Sizes</h3>
              <p className="text-gray-600 text-sm">Maximum 15 students per class for individual attention</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Qualified Teachers</h3>
              <p className="text-gray-600 text-sm">Experienced educators specialized in early childhood</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Creative Learning</h3>
              <p className="text-gray-600 text-sm">Hands-on activities and creative expression</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">Regular assessment and parent communication</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Find the Right Class for Your Child
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Not sure which class is right for your child? Contact us for a consultation and assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule Assessment
            </Link>
            <Link
              href="/admission"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
