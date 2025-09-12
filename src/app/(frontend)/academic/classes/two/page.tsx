import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Class Two (Ages 5-6) - Surjomukhi Kindergarten',
  description: 'Advancing literacy and numeracy skills while exploring science and social studies concepts.',
  keywords: ['class two', 'ages 5-6', 'literacy', 'numeracy', 'science', 'social studies'],
};

export default function ClassTwoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><a href="/academic" className="text-gray-500 hover:text-gray-700">Academic</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><a href="/academic/classes" className="text-gray-500 hover:text-gray-700">Classes</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Class Two</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🔬</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Class Two</h1>
          <p className="text-xl md:text-2xl mb-4">Ages 5-6 Years</p>
          <p className="text-lg max-w-3xl mx-auto">
            Advancing literacy and numeracy skills while exploring science and social studies concepts.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Learning</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Class Two students build upon their foundation skills with more advanced concepts in all subject areas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-bold text-gray-900 mb-2">Reading Fluency</h3>
              <p className="text-gray-600 text-sm">Comprehension and vocabulary expansion</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-4">➕</div>
              <h3 className="font-bold text-gray-900 mb-2">Math Operations</h3>
              <p className="text-gray-600 text-sm">Addition, subtraction, and problem solving</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-4">🧪</div>
              <h3 className="font-bold text-gray-900 mb-2">Science Exploration</h3>
              <p className="text-gray-600 text-sm">Hands-on experiments and discovery</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="font-bold text-gray-900 mb-2">Social Awareness</h3>
              <p className="text-gray-600 text-sm">Community and cultural understanding</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Expand Learning Horizons</h2>
          <p className="text-xl mb-8">Help your child explore new concepts and develop advanced skills.</p>
          <a href="/admission" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
}
