import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Founders - Surjomukhi Kindergarten',
  description: 'Meet the visionary founders who established Surjomukhi Kindergarten with a mission to provide quality early childhood education.',
  keywords: ['founders', 'establishment', 'vision', 'kindergarten history'],
  openGraph: {
    title: 'Our Founders - Surjomukhi Kindergarten',
    description: 'Meet the visionary founders of our kindergarten.',
    type: 'website',
  },
};

export default function FoundersPage() {
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
                <a href="/about" className="text-gray-500 hover:text-gray-700">About</a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">Founders</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Visionary Founders
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Meet the dedicated individuals who laid the foundation of our educational institution.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Founding Story */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              The Beginning of Our Journey
            </h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Surjomukhi Kindergarten was founded with a simple yet powerful vision: to provide 
                quality early childhood education that nurtures young minds and prepares them for 
                a bright future. Our founders believed that every child deserves the best start 
                in their educational journey.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With years of experience in education and a deep understanding of child development, 
                our founders established this institution to create a learning environment that 
                combines academic excellence with emotional and social growth.
              </p>
            </div>
          </div>

          {/* Founders Profiles */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Meet Our Founders
            </h2>
            
            <div className="space-y-16">
              {/* Founder 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/3">
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-green-400 rounded-full mx-auto"></div>
                </div>
                <div className="lg:w-2/3">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Mrs. Rashida Begum
                  </h3>
                  <p className="text-xl text-blue-600 font-medium mb-6">Founder & Chairman</p>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    Mrs. Rashida Begum, with over 25 years of experience in early childhood education, 
                    founded Surjomukhi Kindergarten with a vision to create a nurturing environment 
                    for young learners. Her dedication to child development and innovative teaching 
                    methods has been the cornerstone of our institution.
                  </p>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    She holds a Master's degree in Education and has been recognized for her 
                    contributions to early childhood education in the community. Her philosophy 
                    of "learning through play" continues to guide our educational approach.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">M.Ed in Education</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">25+ Years Experience</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Child Development Expert</span>
                  </div>
                </div>
              </div>

              {/* Founder 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="lg:w-1/3">
                  <div className="w-64 h-64 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mx-auto"></div>
                </div>
                <div className="lg:w-2/3">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Mr. Abdul Karim
                  </h3>
                  <p className="text-xl text-green-600 font-medium mb-6">Co-Founder & Managing Director</p>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    Mr. Abdul Karim brings extensive experience in educational administration and 
                    child psychology to our institution. His vision of creating a holistic learning 
                    environment has shaped our curriculum and teaching methodologies.
                  </p>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    With a background in child psychology and educational management, he has been 
                    instrumental in developing our unique approach to early childhood education 
                    that focuses on individual growth and development.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Child Psychology</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Educational Management</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Curriculum Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Founders' Vision & Mission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  "To create a world where every child has access to quality early childhood education 
                  that nurtures their natural curiosity, creativity, and love for learning."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-green-600 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  "To provide a safe, nurturing, and stimulating environment where children can 
                  develop their full potential through play-based learning and individual attention."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
