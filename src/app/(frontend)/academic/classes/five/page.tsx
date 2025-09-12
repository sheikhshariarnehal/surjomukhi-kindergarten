import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Class Five (Ages 8-9) - Surjomukhi Kindergarten',
  description: 'Final preparation for primary education with comprehensive skill development.',
  keywords: ['class five', 'ages 8-9', 'primary education', 'comprehensive skills', 'leadership'],
};

export default function ClassFivePage() {
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
              <li><span className="text-gray-900 font-medium">Class Five</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🏆</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Class Five</h1>
          <p className="text-xl md:text-2xl mb-4">Ages 8-9 Years</p>
          <p className="text-lg max-w-3xl mx-auto">
            Final preparation for primary education with comprehensive skill development.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Leadership & Excellence</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Our highest level prepares students for primary school with leadership skills and academic excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-red-50 rounded-lg">
              <div className="text-3xl mb-4">👑</div>
              <h3 className="font-bold text-gray-900 mb-2">Leadership Skills</h3>
              <p className="text-gray-600 text-sm">Student leadership and responsibility</p>
            </div>
            <div className="p-6 bg-red-50 rounded-lg">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="font-bold text-gray-900 mb-2">Independent Learning</h3>
              <p className="text-gray-600 text-sm">Self-directed study skills</p>
            </div>
            <div className="p-6 bg-red-50 rounded-lg">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-bold text-gray-900 mb-2">Complex Projects</h3>
              <p className="text-gray-600 text-sm">Multi-disciplinary assignments</p>
            </div>
            <div className="p-6 bg-red-50 rounded-lg">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-bold text-gray-900 mb-2">Peer Mentoring</h3>
              <p className="text-gray-600 text-sm">Helping younger students</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Achieve Excellence</h2>
          <p className="text-xl mb-8">Complete your child's kindergarten journey with our premier Class Five program.</p>
          <a href="/admission" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
}
