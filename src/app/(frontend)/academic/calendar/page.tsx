import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Calendar - Surjomukhi Kindergarten',
  description: 'View our academic calendar with important dates, holidays, and school events.',
  keywords: ['academic calendar', 'school calendar', 'important dates', 'holidays', 'events'],
};

export default function AcademicCalendarPage() {
  const academicYear = "2024-2025";
  
  const events = [
    { date: 'January 1', event: 'New Year Holiday', type: 'holiday' },
    { date: 'January 15', event: 'School Reopens', type: 'academic' },
    { date: 'February 21', event: 'International Mother Language Day', type: 'special' },
    { date: 'March 26', event: 'Independence Day', type: 'holiday' },
    { date: 'April 14', event: 'Bengali New Year', type: 'special' },
    { date: 'May 1', event: 'May Day', type: 'holiday' },
    { date: 'May 15', event: 'Annual Sports Day', type: 'event' },
    { date: 'June 30', event: 'First Term Ends', type: 'academic' },
    { date: 'July 1-15', event: 'Summer Break', type: 'break' },
    { date: 'July 16', event: 'Second Term Begins', type: 'academic' },
    { date: 'August 15', event: 'National Mourning Day', type: 'special' },
    { date: 'September 15', event: 'Cultural Program', type: 'event' },
    { date: 'October 10', event: 'Parent-Teacher Meeting', type: 'meeting' },
    { date: 'November 30', event: 'Second Term Ends', type: 'academic' },
    { date: 'December 1', event: 'Final Term Begins', type: 'academic' },
    { date: 'December 16', event: 'Victory Day', type: 'holiday' },
    { date: 'December 25', event: 'Christmas Holiday', type: 'holiday' },
    { date: 'December 31', event: 'Year End Celebration', type: 'event' }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'holiday': return 'bg-red-100 text-red-800';
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'special': return 'bg-purple-100 text-purple-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'break': return 'bg-orange-100 text-orange-800';
      case 'meeting': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><a href="/academic" className="text-gray-500 hover:text-gray-700">Academic</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Academic Calendar</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Calendar</h1>
          <p className="text-xl md:text-2xl mb-4">Academic Year {academicYear}</p>
          <p className="text-lg max-w-3xl mx-auto">
            Stay informed about important dates, holidays, and school events throughout the academic year.
          </p>
        </div>
      </section>

      {/* Calendar Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Important Dates & Events
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Plan ahead with our comprehensive academic calendar featuring all important dates and events.
            </p>
          </div>

          {/* Legend */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types:</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Holidays</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Academic</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Special Days</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">School Events</span>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Breaks</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Meetings</span>
            </div>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Event</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.event}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Term Structure */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Academic Term Structure
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our academic year is divided into three terms for optimal learning progression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">First Term</h3>
              <p className="text-gray-600 mb-4">January - June</p>
              <p className="text-sm text-gray-500">Foundation building and skill development</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Second Term</h3>
              <p className="text-gray-600 mb-4">July - November</p>
              <p className="text-sm text-gray-500">Skill enhancement and concept reinforcement</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Final Term</h3>
              <p className="text-gray-600 mb-4">December - March</p>
              <p className="text-sm text-gray-500">Assessment and preparation for next level</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Connected with School Events
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Download our calendar or contact us for more information about upcoming events and important dates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/admission"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Apply for Admission
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
