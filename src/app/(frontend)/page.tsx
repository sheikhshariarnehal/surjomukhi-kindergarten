import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/frontend/Hero';
import StatsCounter from '@/components/frontend/StatsCounter';
import NoticeBoard from '@/components/frontend/NoticeBoard';
import NewsEventsPreview from '@/components/frontend/NewsEventsPreview';
import { noticesApi, newsApi, teachersApi, eventsApi, type Notice, type News, type Event, type Teacher } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Home - Surjomukhi Kindergarten',
  description: 'Welcome to Surjomukhi Kindergarten. We provide quality early childhood education, nurture young minds, and prepare children for their educational journey with our experienced teachers and safe learning environment.',
  keywords: ['kindergarten', 'early education', 'children', 'teachers', 'learning', 'preschool', 'quality education', 'admission', 'Surjomukhi'],
  openGraph: {
    title: 'Surjomukhi Kindergarten - Excellence in Early Education',
    description: 'Welcome to Surjomukhi Kindergarten providing quality early childhood education and nurturing young minds.',
    type: 'website',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Surjomukhi Kindergarten Campus - Excellence in Early Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surjomukhi Kindergarten - Excellence in Early Education',
    description: 'Welcome to Surjomukhi Kindergarten providing quality early childhood education and nurturing young minds.',
    images: ['/og-home.jpg'],
  },
};

// Fetch data from Supabase
async function getHomePageData() {
  try {
    const [notices, news, events, teachers] = await Promise.all([
      noticesApi.getRecent(5),
      newsApi.getRecent(3),
      eventsApi.getUpcoming(3),
      teachersApi.getAll()
    ]);

    return {
      notices,
      news,
      events,
      teachers: teachers.slice(0, 4) // Limit to 4 featured teachers
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      notices: [],
      news: [],
      events: [],
      teachers: []
    };
  }
}

export default async function HomePage() {
  const { notices, news, events, teachers } = await getHomePageData();
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Counter */}
      <StatsCounter />

      {/* Notice Board Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Important Notices
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest announcements and important updates from Surjomukhi Kindergarten.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <NoticeBoard notices={notices} />
          </div>
        </div>
      </section>

      {/* Latest News & Upcoming Events */}
      <NewsEventsPreview initialNews={news} initialEvents={events} />

      {/* Meet Our Dedicated Teachers */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Dedicated Teachers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced and qualified faculty members are committed to providing excellent early childhood education and nurturing young minds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {teachers.length > 0 ? (
              teachers.map((teacher) => {
                // Calculate experience years from join_date
                const joinDate = teacher.join_date ? new Date(teacher.join_date) : null;
                const experienceYears = joinDate ? new Date().getFullYear() - joinDate.getFullYear() : 0;
                const subjects = teacher.subjects || [];

                return (
                  <div key={teacher.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        {teacher.photo_url ? (
                          <img
                            src={teacher.photo_url}
                            alt={teacher.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {experienceYears > 0 && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/95 backdrop-blur-sm text-blue-700 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                            {experienceYears}+ Years
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                          {teacher.name}
                        </h3>
                        <p className="text-blue-600 font-medium text-sm">{teacher.designation}</p>
                      </div>

                      {subjects.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {subjects.slice(0, 2).map((subject, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                                {subject}
                              </span>
                            ))}
                            {subjects.length > 2 && (
                              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
                                +{subjects.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <Link
                        href="/teachers"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block text-sm group-hover:bg-blue-700"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">No teacher profiles available</p>
                <p className="text-gray-400 text-sm mt-1">Check back soon to meet our amazing faculty!</p>
              </div>
            )}
          </div>

          {/* View All Teachers Button */}
          {teachers.length > 0 && (
            <div className="text-center">
              <Link
                href="/teachers"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
              >
                View All Teachers
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Links & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access important government portals, educational resources, and kindergarten services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Government Links */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Government Portals
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Ministry of Education', desc: 'Official website of the Ministry of Education, Bangladesh', url: 'https://moedu.gov.bd' },
                  { title: 'Education Board', desc: 'Secondary and Higher Secondary Education Board', url: 'https://dshe.gov.bd' }
                ].map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-white rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all duration-300 group hover:shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 mb-2 flex items-center">
                        {link.title}
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{link.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Educational Resources */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Educational Resources
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'National Curriculum Board', desc: 'National Curriculum and Textbook Board (NCTB)', url: 'https://nctb.gov.bd' },
                  { title: 'Education Board Results', desc: 'Check SSC, HSC and other board examination results', url: 'https://eboardresults.com' }
                ].map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-white rounded-xl hover:bg-green-50 hover:border-green-200 border border-gray-200 transition-all duration-300 group hover:shadow-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-green-800 mb-2 flex items-center">
                        {link.title}
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{link.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* School Services */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                School Services
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Admission Information', desc: 'Learn about our admission process and requirements', url: '/admission', internal: true },
                  { title: 'Contact Us', desc: 'Get in touch with our school administration', url: '/contact', internal: true }
                ].map((link, index) => (
                  link.internal ? (
                    <Link key={index} href={link.url} className="flex items-start p-6 bg-white rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-gray-200 transition-all duration-300 group hover:shadow-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-800 mb-2">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{link.desc}</p>
                      </div>
                    </Link>
                  ) : (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-white rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-gray-200 transition-all duration-300 group hover:shadow-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-800 mb-2 flex items-center">
                          {link.title}
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{link.desc}</p>
                      </div>
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
