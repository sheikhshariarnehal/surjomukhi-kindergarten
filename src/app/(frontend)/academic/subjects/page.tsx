import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Subjects - Surjomukhi Kindergarten',
  description: 'Explore our comprehensive curriculum covering all essential subjects for early childhood development.',
  keywords: ['subjects', 'curriculum', 'language arts', 'mathematics', 'science', 'arts'],
};

export default function SubjectsPage() {
  const subjects = [
    {
      name: 'Language Arts',
      icon: '📚',
      description: 'Building strong communication and literacy skills',
      topics: ['Reading & Comprehension', 'Writing Skills', 'Vocabulary Development', 'Storytelling', 'Grammar Basics'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Mathematics',
      icon: '🔢',
      description: 'Developing number sense and problem-solving abilities',
      topics: ['Number Recognition', 'Counting & Operations', 'Shapes & Patterns', 'Measurement', 'Problem Solving'],
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Science',
      icon: '🔬',
      description: 'Encouraging curiosity about the natural world',
      topics: ['Nature Studies', 'Simple Experiments', 'Weather & Seasons', 'Plants & Animals', 'Health & Safety'],
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Creative Arts',
      icon: '🎨',
      description: 'Fostering creativity and artistic expression',
      topics: ['Drawing & Painting', 'Craft Activities', 'Music & Rhythm', 'Drama & Role Play', 'Creative Movement'],
      color: 'from-pink-400 to-pink-600'
    },
    {
      name: 'Physical Education',
      icon: '⚽',
      description: 'Promoting physical fitness and motor skills',
      topics: ['Gross Motor Skills', 'Fine Motor Skills', 'Sports & Games', 'Balance & Coordination', 'Team Activities'],
      color: 'from-orange-400 to-orange-600'
    },
    {
      name: 'Social Studies',
      icon: '🌍',
      description: 'Understanding community and cultural awareness',
      topics: ['Family & Community', 'Cultural Diversity', 'Good Citizenship', 'Geography Basics', 'History Stories'],
      color: 'from-teal-400 to-teal-600'
    }
  ];

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
              <li><span className="text-gray-900 font-medium">Subjects</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Subjects</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            A comprehensive curriculum designed to nurture all aspects of your child&apos;s development.
          </p>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Learning Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our curriculum covers all essential subjects to ensure holistic development of your child&apos;s 
              cognitive, physical, social, and emotional skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                  <div className="text-4xl mb-4 text-center">{subject.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-center">{subject.name}</h3>
                  <p className="text-center opacity-90">{subject.description}</p>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Topics:</h4>
                  <ul className="space-y-2">
                    {subject.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start text-sm text-gray-600">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Teaching Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We use innovative and age-appropriate methods to make learning engaging and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Play-Based Learning</h3>
              <p className="text-gray-600 text-sm">Learning through fun and engaging activities</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🤲</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hands-On Activities</h3>
              <p className="text-gray-600 text-sm">Interactive and practical learning experiences</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Collaborative Learning</h3>
              <p className="text-gray-600 text-sm">Working together and learning from peers</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Individual Attention</h3>
              <p className="text-gray-600 text-sm">Personalized support for each child</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Give Your Child a Well-Rounded Education
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our comprehensive curriculum ensures your child develops all the skills needed for future success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admission"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Enroll Your Child
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
