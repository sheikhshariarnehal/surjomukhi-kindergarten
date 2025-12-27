import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Class Three (Ages 6-7) - Surjomukhi Kindergarten',
  description: 'Developing critical thinking skills and deeper understanding of academic subjects.',
  keywords: ['class three', 'ages 6-7', 'critical thinking', 'academic subjects'],
};

export default function ClassThreePage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
              <li><span className="text-gray-900 font-medium">Class Three</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Class Three</h1>
          <p className="text-xl md:text-2xl mb-4">Ages 6-7 Years</p>
          <p className="text-lg max-w-3xl mx-auto">
            Developing critical thinking skills and deeper understanding of academic subjects.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Critical Thinking Development</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Class Three focuses on developing analytical skills and encouraging students to think critically about their learning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="font-bold text-gray-900 mb-2">Critical Analysis</h3>
              <p className="text-gray-600 text-sm">Questioning, reasoning, and problem-solving skills</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-4">📖</div>
              <h3 className="font-bold text-gray-900 mb-2">Advanced Reading</h3>
              <p className="text-gray-600 text-sm">Complex texts and comprehension strategies</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="font-bold text-gray-900 mb-2">Research Skills</h3>
              <p className="text-gray-600 text-sm">Information gathering and analysis</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Develop Critical Thinkers</h2>
          <p className="text-xl mb-8">Prepare your child&apos;s for advanced learning with critical thinking skills.</p>
          <Link href="/admission" className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
