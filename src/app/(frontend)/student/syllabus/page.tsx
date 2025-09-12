import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syllabus - Surjomukhi Kindergarten',
  description: 'Download and view the complete syllabus for all classes at Surjomukhi Kindergarten.',
  keywords: ['syllabus', 'curriculum', 'course outline', 'academic program'],
};

export default function SyllabusPage() {
  const syllabusData = [
    {
      class: 'Play Group',
      age: '2-3 years',
      subjects: ['Basic Motor Skills', 'Sensory Play', 'Social Interaction', 'Language Introduction'],
      color: 'from-pink-400 to-pink-600',
      downloadLink: '/downloads/playgroup-syllabus.pdf'
    },
    {
      class: 'Nursery',
      age: '3-4 years',
      subjects: ['Pre-Reading Skills', 'Number Recognition', 'Creative Arts', 'Physical Development'],
      color: 'from-purple-400 to-purple-600',
      downloadLink: '/downloads/nursery-syllabus.pdf'
    },
    {
      class: 'Class One',
      age: '4-5 years',
      subjects: ['Reading & Writing', 'Basic Mathematics', 'Science Exploration', 'Social Studies'],
      color: 'from-blue-400 to-blue-600',
      downloadLink: '/downloads/class-one-syllabus.pdf'
    },
    {
      class: 'Class Two',
      age: '5-6 years',
      subjects: ['Language Arts', 'Mathematics', 'Environmental Science', 'Creative Expression'],
      color: 'from-green-400 to-green-600',
      downloadLink: '/downloads/class-two-syllabus.pdf'
    },
    {
      class: 'Class Three',
      age: '6-7 years',
      subjects: ['Advanced Reading', 'Problem Solving', 'Science & Nature', 'Cultural Studies'],
      color: 'from-yellow-400 to-yellow-600',
      downloadLink: '/downloads/class-three-syllabus.pdf'
    },
    {
      class: 'Class Four',
      age: '7-8 years',
      subjects: ['Analytical Thinking', 'Creative Writing', 'Advanced Math', 'Project Work'],
      color: 'from-orange-400 to-orange-600',
      downloadLink: '/downloads/class-four-syllabus.pdf'
    },
    {
      class: 'Class Five',
      age: '8-9 years',
      subjects: ['Leadership Skills', 'Independent Learning', 'Complex Projects', 'Peer Mentoring'],
      color: 'from-red-400 to-red-600',
      downloadLink: '/downloads/class-five-syllabus.pdf'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><a href="/student" className="text-gray-500 hover:text-gray-700">Student</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Syllabus</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Syllabus</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Comprehensive curriculum and learning objectives for all classes.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Comprehensive Curriculum
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our syllabus is carefully designed to provide age-appropriate learning experiences that foster 
              holistic development. Each class builds upon previous learning while introducing new concepts 
              and skills that prepare students for their next educational journey.
            </p>
          </div>
        </div>
      </section>

      {/* Syllabus by Class */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Syllabus by Class</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Click on any class to download the detailed syllabus document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {syllabusData.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-r ${item.color} p-6 text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{item.class}</h3>
                  <p className="opacity-90">{item.age}</p>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Subject Areas:</h4>
                  <ul className="space-y-2 mb-6">
                    {item.subjects.map((subject, subIndex) => (
                      <li key={subIndex} className="flex items-start text-sm text-gray-600">
                        <span className="text-indigo-500 mr-2 mt-1">•</span>
                        {subject}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Learning Objectives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every aspect of our curriculum is designed to achieve these core learning objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-indigo-50 rounded-lg">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cognitive Development</h3>
              <p className="text-gray-600 text-sm">Building thinking, reasoning, and problem-solving skills</p>
            </div>
            <div className="text-center p-6 bg-indigo-50 rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Social Skills</h3>
              <p className="text-gray-600 text-sm">Developing communication and interpersonal abilities</p>
            </div>
            <div className="text-center p-6 bg-indigo-50 rounded-lg">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Physical Development</h3>
              <p className="text-gray-600 text-sm">Enhancing motor skills and physical coordination</p>
            </div>
            <div className="text-center p-6 bg-indigo-50 rounded-lg">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Emotional Growth</h3>
              <p className="text-gray-600 text-sm">Nurturing emotional intelligence and self-awareness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Assessment & Evaluation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We use various age-appropriate assessment methods to track student progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">👀</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Observation-Based</h3>
              <p className="text-gray-600 text-sm">Continuous observation of student activities and interactions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Portfolio Assessment</h3>
              <p className="text-gray-600 text-sm">Collection of student work showing progress over time</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Milestone Tracking</h3>
              <p className="text-gray-600 text-sm">Regular assessment of developmental milestones</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions About Our Curriculum?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our academic team is available to discuss our syllabus and answer any questions about our curriculum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Academic Team
            </a>
            <a
              href="/academic/subjects"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              View Subjects
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
