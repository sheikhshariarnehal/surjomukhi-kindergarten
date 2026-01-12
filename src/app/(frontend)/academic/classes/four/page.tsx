import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Class Four (Ages 7-8) - Surjomukhi Kindergarten',
  description: 'Preparing for advanced learning with emphasis on analytical thinking and creativity.',
  keywords: ['class four', 'ages 7-8', 'analytical thinking', 'creativity', 'advanced learning'],
};

export default function ClassFourPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Class Four</h1>
          <p className="text-xl md:text-2xl mb-4">Ages 7-8 Years</p>
          <p className="text-lg max-w-3xl mx-auto">
            Preparing for advanced learning with emphasis on analytical thinking and creativity.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Preparation</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Class Four students are prepared for more complex academic challenges with advanced analytical and creative skills.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">Analytical Skills</h3>
              <p className="text-gray-600 text-sm">Data analysis and logical reasoning</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-4">✍️</div>
              <h3 className="font-bold text-gray-900 mb-2">Creative Writing</h3>
              <p className="text-gray-600 text-sm">Story creation and expression</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-4">🔢</div>
              <h3 className="font-bold text-gray-900 mb-2">Advanced Math</h3>
              <p className="text-gray-600 text-sm">Complex operations and concepts</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="font-bold text-gray-900 mb-2">Project Work</h3>
              <p className="text-gray-600 text-sm">Independent research projects</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Launch Advanced Learning</h2>
          <p className="text-xl mb-8">Prepare your child for complex academic challenges.</p>
          <Link href="/admission" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
