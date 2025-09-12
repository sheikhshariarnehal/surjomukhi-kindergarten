import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Academic Programs - Surjomukhi Kindergarten',
  description: 'Explore our comprehensive academic programs, curriculum, and educational approach designed for early childhood development.',
  keywords: ['academic programs', 'curriculum', 'early childhood education', 'kindergarten classes'],
  openGraph: {
    title: 'Academic Programs - Surjomukhi Kindergarten',
    description: 'Explore our comprehensive academic programs and curriculum.',
    type: 'website',
  },
};

export default function AcademicPage() {
  const academicHighlights = [
    {
      title: 'Play-Based Learning',
      description: 'Learning through play activities that engage children naturally',
      icon: '🎮',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Individual Attention',
      description: 'Small class sizes ensuring personalized care for each child',
      icon: '👥',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Holistic Development',
      description: 'Focus on cognitive, social, emotional, and physical growth',
      icon: '🌟',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Modern Methods',
      description: 'Contemporary teaching techniques and educational resources',
      icon: '💡',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const quickLinks = [
    { title: 'Class Schedule', href: '/academic/class-schedule', icon: '📅' },
    { title: 'Our Classes', href: '/academic/classes', icon: '🏫' },
    { title: 'Our Teachers', href: '/academic/teachers', icon: '👨‍🏫' },
    { title: 'Subjects', href: '/academic/subjects', icon: '📚' },
    { title: 'Academic Calendar', href: '/academic/calendar', icon: '📆' },
    { title: 'Academic Rules', href: '/academic/rules', icon: '📋' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">Academic</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Academic Excellence
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover our comprehensive academic programs designed to nurture young minds and foster lifelong learning.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Academic Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Surjomukhi Kindergarten, we believe that early childhood education should be engaging, 
              nurturing, and developmentally appropriate. Our academic programs are designed to support 
              each child's unique learning journey while building strong foundations for future success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {academicHighlights.map((highlight, index) => (
              <div key={index} className={`p-6 rounded-lg ${highlight.color}`}>
                <div className="text-4xl mb-4 text-center">{highlight.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-center">{highlight.title}</h3>
                <p className="text-sm text-center opacity-80">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Academic Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our academic offerings and resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{link.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                </div>
                <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Curriculum
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our curriculum is carefully crafted to meet the developmental needs of young children. 
                We integrate various learning domains to ensure comprehensive growth and development.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Language & Literacy</h4>
                    <p className="text-gray-600 text-sm">Building communication skills and early reading foundations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mathematics & Logic</h4>
                    <p className="text-gray-600 text-sm">Developing number sense and problem-solving abilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Science & Discovery</h4>
                    <p className="text-gray-600 text-sm">Encouraging curiosity and exploration of the natural world</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Creative Arts</h4>
                    <p className="text-gray-600 text-sm">Fostering creativity through art, music, and dramatic play</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Class Levels</h3>
              <div className="space-y-3">
                <Link href="/academic/classes/play-group" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Play Group</span>
                    <span className="text-sm text-gray-500">Ages 2-3</span>
                  </div>
                </Link>
                <Link href="/academic/classes/nursery" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Nursery</span>
                    <span className="text-sm text-gray-500">Ages 3-4</span>
                  </div>
                </Link>
                <Link href="/academic/classes/one" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class One</span>
                    <span className="text-sm text-gray-500">Ages 4-5</span>
                  </div>
                </Link>
                <Link href="/academic/classes/two" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class Two</span>
                    <span className="text-sm text-gray-500">Ages 5-6</span>
                  </div>
                </Link>
                <Link href="/academic/classes/three" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class Three</span>
                    <span className="text-sm text-gray-500">Ages 6-7</span>
                  </div>
                </Link>
                <Link href="/academic/classes/four" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class Four</span>
                    <span className="text-sm text-gray-500">Ages 7-8</span>
                  </div>
                </Link>
                <Link href="/academic/classes/five" className="block p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Class Five</span>
                    <span className="text-sm text-gray-500">Ages 8-9</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Child's Academic Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of learners and give your child the best start in their educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admission"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply for Admission
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
