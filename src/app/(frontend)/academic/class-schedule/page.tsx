import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Class Schedule - Surjomukhi Kindergarten',
  description: 'View our daily class schedules and timetables for all grade levels at Surjomukhi Kindergarten.',
  keywords: ['class schedule', 'timetable', 'daily routine', 'school hours'],
  openGraph: {
    title: 'Class Schedule - Surjomukhi Kindergarten',
    description: 'View our daily class schedules and timetables.',
    type: 'website',
  },
};

export default function ClassSchedulePage() {
  const scheduleData = [
    {
      time: '8:00 - 8:30 AM',
      activity: 'Arrival & Free Play',
      description: 'Children arrive and engage in free play activities',
      allClasses: true
    },
    {
      time: '8:30 - 9:00 AM',
      activity: 'Morning Circle',
      description: 'Welcome song, calendar time, and daily discussion',
      allClasses: true
    },
    {
      time: '9:00 - 9:45 AM',
      activity: 'Language Arts',
      description: 'Reading, writing, and communication skills',
      playGroup: 'Story Time & Vocabulary',
      nursery: 'Letter Recognition & Phonics',
      classOne: 'Reading & Writing Practice',
      classTwo: 'Grammar & Comprehension',
      classThree: 'Advanced Reading & Writing',
      classFour: 'Literature & Composition',
      classFive: 'Creative Writing & Analysis'
    },
    {
      time: '9:45 - 10:00 AM',
      activity: 'Snack Break',
      description: 'Healthy snack time and social interaction',
      allClasses: true
    },
    {
      time: '10:00 - 10:45 AM',
      activity: 'Mathematics',
      description: 'Number concepts and problem-solving',
      playGroup: 'Counting & Shapes',
      nursery: 'Numbers 1-20 & Patterns',
      classOne: 'Addition & Subtraction',
      classTwo: 'Multiplication & Division',
      classThree: 'Fractions & Geometry',
      classFour: 'Advanced Math Concepts',
      classFive: 'Problem Solving & Logic'
    },
    {
      time: '10:45 - 11:30 AM',
      activity: 'Science & Discovery',
      description: 'Exploration and hands-on learning',
      playGroup: 'Sensory Exploration',
      nursery: 'Nature Discovery',
      classOne: 'Basic Science Concepts',
      classTwo: 'Simple Experiments',
      classThree: 'Earth & Life Science',
      classFour: 'Physical Science',
      classFive: 'Scientific Method'
    },
    {
      time: '11:30 - 12:15 PM',
      activity: 'Creative Arts',
      description: 'Art, music, and creative expression',
      allClasses: true
    },
    {
      time: '12:15 - 1:00 PM',
      activity: 'Lunch Break',
      description: 'Nutritious meal and rest time',
      allClasses: true
    },
    {
      time: '1:00 - 1:45 PM',
      activity: 'Physical Education',
      description: 'Outdoor play and physical activities',
      allClasses: true
    },
    {
      time: '1:45 - 2:30 PM',
      activity: 'Social Studies',
      description: 'Community awareness and social skills',
      playGroup: 'Family & Friends',
      nursery: 'My Community',
      classOne: 'Our School & Neighborhood',
      classTwo: 'Our City & Country',
      classThree: 'Geography & Culture',
      classFour: 'History & Civics',
      classFive: 'World Studies'
    },
    {
      time: '2:30 - 3:00 PM',
      activity: 'Review & Dismissal',
      description: 'Day recap and preparation for home',
      allClasses: true
    }
  ];

  const classLevels = [
    { key: 'playGroup', name: 'Play Group', color: 'bg-pink-100 text-pink-800' },
    { key: 'nursery', name: 'Nursery', color: 'bg-purple-100 text-purple-800' },
    { key: 'classOne', name: 'Class One', color: 'bg-blue-100 text-blue-800' },
    { key: 'classTwo', name: 'Class Two', color: 'bg-green-100 text-green-800' },
    { key: 'classThree', name: 'Class Three', color: 'bg-yellow-100 text-yellow-800' },
    { key: 'classFour', name: 'Class Four', color: 'bg-orange-100 text-orange-800' },
    { key: 'classFive', name: 'Class Five', color: 'bg-red-100 text-red-800' }
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
                <a href="/academic" className="text-gray-500 hover:text-gray-700">Academic</a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">Class Schedule</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Daily Class Schedule
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Our structured daily routine provides a balanced mix of learning, play, and development activities.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              School Hours: 8:00 AM - 3:00 PM
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our daily schedule is designed to provide a perfect balance of structured learning and 
              creative play time, ensuring optimal development for each age group.
            </p>
          </div>

          {/* Class Level Legend */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Levels:</h3>
            <div className="flex flex-wrap gap-2">
              {classLevels.map((level) => (
                <span key={level.key} className={`px-3 py-1 rounded-full text-sm font-medium ${level.color}`}>
                  {level.name}
                </span>
              ))}
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Activity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {scheduleData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                        {item.activity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.allClasses ? (
                          item.description
                        ) : (
                          <div className="space-y-1">
                            <p className="font-medium text-gray-800 mb-2">{item.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
                              {classLevels.map((level) => {
                                const content = item[level.key as keyof typeof item];
                                return content ? (
                                  <div key={level.key} className="flex items-center">
                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${level.color.split(' ')[0].replace('bg-', 'bg-').replace('-100', '-400')}`}></span>
                                    <span className="font-medium">{level.name}:</span>
                                    <span className="ml-1">{content}</span>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Weekly Schedule</h3>
              <p className="text-gray-600 text-sm mb-4">
                Monday to Friday: Regular classes
                Saturday: Special activities and events
                Sunday: Holiday
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🍎</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Meal Times</h3>
              <p className="text-gray-600 text-sm mb-4">
                Morning Snack: 9:45 AM
                Lunch: 12:15 PM
                Afternoon Snack: Available upon request
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🚌</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Transportation</h3>
              <p className="text-gray-600 text-sm mb-4">
                School bus service available
                Pick-up: 7:30 AM onwards
                Drop-off: 3:15 PM onwards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for More Info */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have Questions About Our Schedule?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us to learn more about our daily routine and how it benefits your child's development.
          </p>
          <a
            href="/contact"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
