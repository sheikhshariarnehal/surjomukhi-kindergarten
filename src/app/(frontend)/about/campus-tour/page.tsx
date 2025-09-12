import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campus Tour - Surjomukhi Kindergarten',
  description: 'Take a virtual tour of our beautiful campus facilities designed for early childhood education.',
  keywords: ['campus tour', 'facilities', 'classrooms', 'playground', 'kindergarten campus'],
  openGraph: {
    title: 'Campus Tour - Surjomukhi Kindergarten',
    description: 'Explore our beautiful campus facilities.',
    type: 'website',
  },
};

export default function CampusTourPage() {
  const facilities = [
    {
      name: 'Bright Classrooms',
      description: 'Spacious, well-lit classrooms designed for interactive learning with child-friendly furniture.',
      features: ['Natural lighting', 'Interactive whiteboards', 'Child-sized furniture', 'Learning corners'],
      icon: '🏫'
    },
    {
      name: 'Safe Playground',
      description: 'Secure outdoor play area with age-appropriate equipment for physical development.',
      features: ['Soft play surfaces', 'Climbing structures', 'Swings and slides', 'Shaded areas'],
      icon: '🛝'
    },
    {
      name: 'Library Corner',
      description: 'Cozy reading space filled with age-appropriate books and storytelling area.',
      features: ['Picture books', 'Story time area', 'Reading cushions', 'Educational materials'],
      icon: '📚'
    },
    {
      name: 'Art & Craft Room',
      description: 'Creative space for artistic expression and hands-on learning activities.',
      features: ['Art supplies', 'Craft materials', 'Display boards', 'Washable surfaces'],
      icon: '🎨'
    },
    {
      name: 'Music Room',
      description: 'Dedicated space for musical activities and rhythm-based learning.',
      features: ['Musical instruments', 'Sound system', 'Performance area', 'Recording equipment'],
      icon: '🎵'
    },
    {
      name: 'Cafeteria',
      description: 'Clean and hygienic dining area serving nutritious meals and snacks.',
      features: ['Healthy meals', 'Clean environment', 'Child-friendly seating', 'Supervised dining'],
      icon: '🍽️'
    }
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
                <a href="/about" className="text-gray-500 hover:text-gray-700">About</a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">Campus Tour</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our Campus
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Take a virtual tour of our beautiful, child-friendly facilities designed for optimal learning and development.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A Safe & Nurturing Environment
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our campus is thoughtfully designed to provide a safe, stimulating, and nurturing 
              environment where children can learn, play, and grow. Every space is created with 
              young learners in mind, ensuring their comfort, safety, and engagement.
            </p>
          </div>

          {/* Campus Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-blue-200 to-blue-400 h-64 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Main Building</span>
            </div>
            <div className="bg-gradient-to-br from-green-200 to-green-400 h-64 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Playground</span>
            </div>
            <div className="bg-gradient-to-br from-purple-200 to-purple-400 h-64 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Garden Area</span>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Facilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the various spaces and amenities that make our campus special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{facility.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900">{facility.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{facility.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Features:</h4>
                  <ul className="grid grid-cols-2 gap-1">
                    {facility.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Safety & Security
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your child's safety is our top priority. Our campus is equipped with comprehensive safety measures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Entry</h3>
              <p className="text-gray-600 text-sm">Controlled access with visitor management system</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">CCTV Monitoring</h3>
              <p className="text-gray-600 text-sm">24/7 surveillance for enhanced security</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Emergency Systems</h3>
              <p className="text-gray-600 text-sm">Fire safety and emergency response protocols</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Trained Staff</h3>
              <p className="text-gray-600 text-sm">First aid certified and safety trained personnel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Schedule a Personal Tour
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We'd love to show you around our campus in person. Schedule a visit to see our facilities 
            and meet our dedicated team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule a Visit
            </a>
            <a
              href="/admission"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
            >
              Apply for Admission
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
