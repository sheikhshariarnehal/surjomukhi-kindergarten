import React from 'react';
import type { Metadata } from 'next';
import { teachersApi, type Teacher } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Our Teachers - Excellence in Education',
  description: 'Meet our dedicated and experienced faculty members who are committed to providing quality education and nurturing young minds.',
  keywords: ['teachers', 'faculty', 'education', 'staff', 'qualified teachers', 'experienced educators'],
  openGraph: {
    title: 'Our Teachers - Excellence in Education',
    description: 'Meet our dedicated and experienced faculty members who are committed to providing quality education.',
    type: 'website',
    images: [
      {
        url: '/og-teachers.jpg',
        width: 1200,
        height: 630,
        alt: 'Our Teachers - Excellence in Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Teachers - Excellence in Education',
    description: 'Meet our dedicated and experienced faculty members who are committed to providing quality education.',
    images: ['/og-teachers.jpg'],
  },
};

// Fetch teachers data from Supabase
async function getTeachers(): Promise<Teacher[]> {
  try {
    return await teachersApi.getAll();
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
}

const departments = [
  { name: 'Mathematics', count: 4, head: 'Dr. Sarah Johnson' },
  { name: 'English', count: 3, head: 'Mr. James Wilson' },
  { name: 'Science', count: 5, head: 'Ms. Fatima Rahman' },
  { name: 'Computer Science', count: 2, head: 'Mr. David Brown' },
  { name: 'Bengali', count: 3, head: 'Mrs. Rashida Begum' },
  { name: 'Social Studies', count: 3, head: 'Mr. Ahmed Hassan' },
  { name: 'Arts & Crafts', count: 2, head: 'Ms. Nadia Khan' },
  { name: 'Physical Education', count: 2, head: 'Mr. Karim Ahmed' }
];

export default async function TeachersPage() {
  const teachers = await getTeachers();
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Dedicated Teachers
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Meet our experienced and qualified faculty members who are committed to providing 
              excellence in education and nurturing the next generation of leaders.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">25+</div>
                <div className="text-blue-100">Qualified Teachers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">8</div>
                <div className="text-blue-100">Departments</div>
              </div>
              <div>
                <div className="text-3xl font-bold">200+</div>
                <div className="text-blue-100">Years Combined Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Academic Departments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our school is organized into specialized departments, each led by experienced department heads 
              who ensure quality education and professional development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-gray-600 mb-2">{dept.count} Teachers</p>
                  <p className="text-sm text-blue-600 font-medium">Head: {dept.head}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Faculty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our teachers are not just educators, but mentors, guides, and inspirations who shape the future of our students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Teacher Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-400 to-green-400">
                  {teacher.photo_url ? (
                    <img
                      src={teacher.photo_url}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {teacher.join_date ? `${new Date().getFullYear() - new Date(teacher.join_date).getFullYear()} Years` : 'Experienced'}
                    </span>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{teacher.designation}</p>

                  {/* Subjects */}
                  {teacher.subjects && teacher.subjects.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Subjects:</p>
                      <div className="flex flex-wrap gap-2">
                        {teacher.subjects.map((subject, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  {teacher.bio && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {teacher.bio}
                      </p>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <a
                        href={`mailto:${teacher.name.toLowerCase().replace(/\s+/g, '.')}@school.edu.bd`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="Send Email"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                      <a
                        href="tel:+8801234567890"
                        className="text-green-600 hover:text-green-700 transition-colors"
                        title="Call"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Teaching Community
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Are you passionate about education and want to make a difference? 
            We're always looking for dedicated teachers to join our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/careers" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Open Positions
            </a>
            <a 
              href="/contact" 
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact HR Department
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
