import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Class One (Ages 4-5) - Surjomukhi Kindergarten',
  description: 'Formal introduction to reading, writing, and mathematics with structured learning activities.',
  keywords: ['class one', 'ages 4-5', 'reading', 'writing', 'mathematics', 'structured learning'],
};

export default function ClassOnePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li><Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><Link href="/academic" className="text-gray-500 hover:text-gray-700">Academic</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><Link href="/academic/classes" className="text-gray-500 hover:text-gray-700">Classes</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Class One</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Class One</h1>
          <p className="text-xl md:text-2xl mb-4">Ages 4-5 Years</p>
          <p className="text-lg max-w-3xl mx-auto">
            Formal introduction to reading, writing, and mathematics with structured learning activities.
          </p>
        </div>
      </section>

      {/* Content sections similar to other class pages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Academic Foundation</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Class One marks the beginning of formal academic learning with structured lessons in reading, 
            writing, and mathematics while maintaining a play-based approach.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-4">📖</div>
              <h3 className="font-bold text-gray-900 mb-2">Reading Readiness</h3>
              <p className="text-gray-600 text-sm">Phonics, sight words, and comprehension skills</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-4">✏️</div>
              <h3 className="font-bold text-gray-900 mb-2">Writing Skills</h3>
              <p className="text-gray-600 text-sm">Letter formation, handwriting, and creative expression</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-4">🔢</div>
              <h3 className="font-bold text-gray-900 mb-2">Mathematics</h3>
              <p className="text-gray-600 text-sm">Number concepts, basic operations, and problem solving</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Begin Formal Learning</h2>
          <p className="text-xl mb-8">Start your child&apos;s academic journey with our Class One program.</p>
          <Link href="/admission" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
