import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Play Group (Ages 2-3) - Surjomukhi Kindergarten',
  description: 'Our Play Group program introduces toddlers to school environment with focus on social skills and learning through play.',
  keywords: ['play group', 'toddlers', 'ages 2-3', 'early learning', 'social skills'],
  openGraph: {
    title: 'Play Group (Ages 2-3) - Surjomukhi Kindergarten',
    description: 'Introduction to school environment with focus on social skills and basic learning through play.',
    type: 'website',
  },
};

export default function PlayGroupPage() {
  const curriculum = [
    {
      subject: 'Social & Emotional Development',
      activities: ['Circle time activities', 'Sharing and turn-taking', 'Emotional expression', 'Friendship building'],
      icon: '🤝'
    },
    {
      subject: 'Physical Development',
      activities: ['Gross motor skills', 'Fine motor activities', 'Sensory play', 'Outdoor exploration'],
      icon: '🏃‍♂️'
    },
    {
      subject: 'Language & Communication',
      activities: ['Story time', 'Singing and rhymes', 'Vocabulary building', 'Simple conversations'],
      icon: '💬'
    },
    {
      subject: 'Creative Expression',
      activities: ['Art and craft', 'Music and movement', 'Dramatic play', 'Creative exploration'],
      icon: '🎨'
    },
    {
      subject: 'Cognitive Development',
      activities: ['Sorting and matching', 'Simple puzzles', 'Cause and effect', 'Problem solving'],
      icon: '🧠'
    },
    {
      subject: 'Self-Help Skills',
      activities: ['Toilet training support', 'Eating independently', 'Dressing skills', 'Personal hygiene'],
      icon: '👶'
    }
  ];

  const dailySchedule = [
    { time: '8:00-8:30', activity: 'Arrival & Free Play' },
    { time: '8:30-9:00', activity: 'Morning Circle & Songs' },
    { time: '9:00-9:30', activity: 'Sensory Play Activities' },
    { time: '9:30-9:45', activity: 'Snack Time' },
    { time: '9:45-10:30', activity: 'Outdoor Play' },
    { time: '10:30-11:00', activity: 'Story Time' },
    { time: '11:00-11:30', activity: 'Art & Craft' },
    { time: '11:30-12:00', activity: 'Music & Movement' },
    { time: '12:00-12:45', activity: 'Lunch & Rest' },
    { time: '12:45-1:30', activity: 'Quiet Activities' },
    { time: '1:30-2:00', activity: 'Closing Circle' },
    { time: '2:00-2:30', activity: 'Departure Preparation' }
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
              <li><Link href="/academic/classes" className="text-gray-500 hover:text-gray-700">Classes</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Play Group</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🧸</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Play Group</h1>
            <p className="text-xl md:text-2xl mb-4">Ages 2-3 Years</p>
            <p className="text-lg max-w-3xl mx-auto">
              A gentle introduction to school life where toddlers learn through play, exploration, and social interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Program Overview</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our Play Group program is designed for children aged 2-3 years who are taking their first steps 
                into the world of formal learning. We focus on creating a warm, nurturing environment where 
                toddlers feel safe to explore, learn, and grow.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-pink-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Gentle Transition</h4>
                    <p className="text-gray-600 text-sm">Smooth introduction to school routines and environment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-pink-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Play-Based Learning</h4>
                    <p className="text-gray-600 text-sm">Learning through fun, engaging play activities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-pink-500 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Individual Care</h4>
                    <p className="text-gray-600 text-sm">Personal attention to each child&apos;s unique needs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-pink-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-pink-800 mb-6">Class Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Age Range:</span>
                  <span className="text-gray-900">2-3 Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Class Size:</span>
                  <span className="text-gray-900">Max 10 children</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Duration:</span>
                  <span className="text-gray-900">Half Day (4.5 hours)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Teacher Ratio:</span>
                  <span className="text-gray-900">1:5</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Schedule:</span>
                  <span className="text-gray-900">8:00 AM - 2:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Learning Areas</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our curriculum focuses on holistic development through age-appropriate activities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curriculum.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-4">{area.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{area.subject}</h3>
                <ul className="space-y-2">
                  {area.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start text-sm text-gray-600">
                      <span className="text-pink-500 mr-2 mt-1">•</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Daily Schedule</h2>
            <p className="text-lg text-gray-600">A typical day in our Play Group program</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dailySchedule.map((item, index) => (
                <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold text-pink-600 w-20 text-sm">{item.time}</span>
                  <span className="text-gray-700 text-sm">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Child&apos;s Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Give your toddler the perfect start with our nurturing Play Group program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admission" className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Apply Now
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
              Schedule Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
