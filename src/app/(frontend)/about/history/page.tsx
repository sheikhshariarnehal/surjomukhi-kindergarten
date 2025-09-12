import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our History - Surjomukhi Kindergarten',
  description: 'Discover the rich history and milestones of Surjomukhi Kindergarten since its establishment.',
  keywords: ['history', 'milestones', 'establishment', 'kindergarten journey'],
  openGraph: {
    title: 'Our History - Surjomukhi Kindergarten',
    description: 'Discover our rich history and educational journey.',
    type: 'website',
  },
};

export default function HistoryPage() {
  const milestones = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'Surjomukhi Kindergarten was established with 25 students and 3 dedicated teachers.',
      icon: '🏗️'
    },
    {
      year: '2012',
      title: 'First Expansion',
      description: 'Added new classrooms and playground facilities to accommodate growing enrollment.',
      icon: '🏫'
    },
    {
      year: '2015',
      title: 'Curriculum Enhancement',
      description: 'Introduced modern teaching methodologies and play-based learning approaches.',
      icon: '📚'
    },
    {
      year: '2017',
      title: 'Technology Integration',
      description: 'Incorporated educational technology and digital learning tools in classrooms.',
      icon: '💻'
    },
    {
      year: '2019',
      title: 'Recognition',
      description: 'Received recognition for excellence in early childhood education from local authorities.',
      icon: '🏆'
    },
    {
      year: '2021',
      title: 'Modern Facilities',
      description: 'Upgraded facilities with modern amenities and safety features.',
      icon: '🔧'
    },
    {
      year: '2023',
      title: 'Continued Growth',
      description: 'Now serving 150+ students with 15+ qualified teachers and staff members.',
      icon: '📈'
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
                <span className="text-gray-900 font-medium">History</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Journey Through Time
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the milestones and achievements that have shaped our institution over the years.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A Legacy of Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Since our establishment, Surjomukhi Kindergarten has been committed to providing 
              exceptional early childhood education. Our journey has been marked by continuous 
              growth, innovation, and an unwavering dedication to nurturing young minds.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">{milestone.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                          <span className="text-blue-600 font-semibold">{milestone.year}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Over the years, we have achieved several milestones that reflect our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">500+</h3>
              <p className="text-gray-600">Graduates</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">15+</h3>
              <p className="text-gray-600">Qualified Teachers</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-purple-600 mb-2">5</h3>
              <p className="text-gray-600">Awards Received</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-orange-600 mb-2">13+</h3>
              <p className="text-gray-600">Years of Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Looking Towards the Future
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            As we continue our journey, we remain committed to innovation, excellence, and 
            providing the best possible start for every child's educational journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-blue-100">Embracing new teaching methods and technologies</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-blue-100">Strengthening our bond with families and community</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <p className="text-blue-100">Expanding our reach to serve more families</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
