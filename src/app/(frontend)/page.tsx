import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/frontend/Hero';
import StatsCounter from '@/components/frontend/StatsCounter';
import NoticeBoard from '@/components/frontend/NoticeBoard';
import { noticesApi, newsApi, teachersApi, eventsApi, type Notice, type News, type Event, type Teacher } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Home - Excellence in Education',
  description: 'Welcome to our prestigious educational institution. We provide quality education, nurture young minds, and prepare students for a bright future with our experienced faculty and modern facilities.',
  keywords: ['school', 'education', 'students', 'teachers', 'learning', 'academic excellence', 'quality education', 'admission'],
  openGraph: {
    title: 'School Website - Excellence in Education',
    description: 'Welcome to our prestigious educational institution providing quality education and nurturing young minds.',
    type: 'website',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'School Campus - Excellence in Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School Website - Excellence in Education',
    description: 'Welcome to our prestigious educational institution providing quality education and nurturing young minds.',
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

      {/* Notice Board */}
      <NoticeBoard notices={notices} />

      {/* Latest News & Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest News & Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest happenings and upcoming events at our school.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* News Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Latest News
                </h3>
                <Link href="/news" className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="space-y-6">
                {news.length > 0 ? (
                  news.map((article) => (
                    <article key={article.id} className="flex bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-600 flex-shrink-0 flex items-center justify-center">
                        {article.image_url ? (
                          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-center mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            News
                          </span>
                          <span className="text-sm text-gray-500 ml-3">
                            {article.publish_date ? new Date(article.publish_date).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h4>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {article.excerpt || 'Latest updates from our school community...'}
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <p className="text-gray-500">No news available at the moment.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Events Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                  </svg>
                  Upcoming Events
                </h3>
                <Link href="/events" className="text-green-600 hover:text-green-700 font-medium flex items-center transition-colors">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="space-y-6">
                {events.length > 0 ? (
                  events.map((event) => (
                    <article key={event.id} className="flex bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 flex-shrink-0 flex items-center justify-center">
                        {event.image_url ? (
                          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-center mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Event
                          </span>
                          <span className="text-sm text-gray-500 ml-3">
                            {new Date(event.start_date).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h4>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {event.description || 'Join us for this exciting upcoming event...'}
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                    </svg>
                    <p className="text-gray-500">No upcoming events at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Dedicated Teachers */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Dedicated Teachers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced and qualified faculty members are committed to providing excellent education and nurturing young minds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {teachers.length > 0 ? (
              teachers.map((teacher) => {
                // Calculate experience years from join_date
                const joinDate = teacher.join_date ? new Date(teacher.join_date) : null;
                const experienceYears = joinDate ? new Date().getFullYear() - joinDate.getFullYear() : 0;
                const subjects = teacher.subjects || [];

                return (
                  <div key={teacher.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative">
                      <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        {teacher.photo_url ? (
                          <img
                            src={teacher.photo_url}
                            alt={teacher.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                      {experienceYears > 0 && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-white/90 backdrop-blur-sm text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {experienceYears} Years
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{teacher.designation}</p>
                      {subjects.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm text-gray-600 mb-2">Subjects:</p>
                          <div className="flex flex-wrap gap-2">
                            {subjects.slice(0, 3).map((subject, idx) => (
                              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {subject}
                              </span>
                            ))}
                            {subjects.length > 3 && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                +{subjects.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <Link
                        href="/teachers"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-gray-500 text-lg">No teacher profiles available at the moment.</p>
              </div>
            )}
          </div>

          {/* View All Teachers Button */}
          {teachers.length > 0 && (
            <div className="text-center">
              <Link
                href="/teachers"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                View All Teachers
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Links & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access important government portals, educational resources, and school services.
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
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-300 group hover:shadow-md">
                    <div className="text-blue-600 group-hover:text-blue-700 mr-4 mt-1">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 mb-1">
                        {link.title}
                        <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h4>
                      <p className="text-sm text-gray-600">{link.desc}</p>
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
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:border-green-200 border border-transparent transition-all duration-300 group hover:shadow-md">
                    <div className="text-green-600 group-hover:text-green-700 mr-4 mt-1">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-green-800 mb-1">
                        {link.title}
                        <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h4>
                      <p className="text-sm text-gray-600">{link.desc}</p>
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
                    <Link key={index} href={link.url} className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all duration-300 group hover:shadow-md">
                      <div className="text-purple-600 group-hover:text-purple-700 mr-4 mt-1">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-800 mb-1">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600">{link.desc}</p>
                      </div>
                    </Link>
                  ) : (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all duration-300 group hover:shadow-md">
                      <div className="text-purple-600 group-hover:text-purple-700 mr-4 mt-1">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-800 mb-1">
                          {link.title}
                          <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </h4>
                        <p className="text-sm text-gray-600">{link.desc}</p>
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
