import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Our Mission & Vision',
  description: 'Learn about our school\'s rich history, mission, vision, and commitment to providing quality education. Discover what makes us a leading educational institution.',
  keywords: ['about school', 'mission', 'vision', 'history', 'education philosophy', 'school values'],
  openGraph: {
    title: 'About Us - Our Mission & Vision',
    description: 'Learn about our school\'s rich history, mission, vision, and commitment to providing quality education.',
    type: 'website',
  },
};

// Structured data for Organization
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "School Name",
  "description": "A leading educational institution committed to excellence in education and holistic development of students.",
  "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  "logo": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/logo.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 School Street",
    "addressLocality": "Education City",
    "addressRegion": "EC",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "email": "info@school.edu"
  },
  "foundingDate": "1995",
  "numberOfStudents": 450,
  "sameAs": [
    "https://facebook.com/schoolname",
    "https://twitter.com/schoolname"
  ]
};

export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About Our School
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Discover our journey, mission, and commitment to educational excellence since 1995.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  To provide quality education that nurtures young minds, develops critical thinking skills, 
                  and prepares students for success in an ever-changing world. We are committed to fostering 
                  a learning environment that promotes academic excellence, character development, and social responsibility.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our dedicated faculty and staff work tirelessly to ensure that every student receives 
                  personalized attention and support to reach their full potential.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-primary-800 mb-4">Our Vision</h3>
                <p className="text-primary-700 text-lg leading-relaxed">
                  To be a leading educational institution that inspires lifelong learning, 
                  cultivates global citizens, and empowers students to make positive contributions 
                  to society through innovation, creativity, and ethical leadership.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our History
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A journey of educational excellence spanning nearly three decades.
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-64 rounded-lg"></div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Founded in 1995</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our school was established with a vision to provide quality education 
                    to the local community. Starting with just 50 students and 5 teachers, 
                    we have grown into a thriving educational institution.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-r from-secondary-400 to-secondary-600 h-64 rounded-lg"></div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Continuous Growth</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Over the years, we have expanded our facilities, enhanced our curriculum, 
                    and embraced modern teaching methodologies. Today, we serve over 450 students 
                    with a dedicated team of 25+ qualified teachers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description: "We strive for the highest standards in education and personal development.",
                  icon: "🏆"
                },
                {
                  title: "Integrity",
                  description: "We uphold honesty, transparency, and ethical behavior in all our actions.",
                  icon: "🤝"
                },
                {
                  title: "Innovation",
                  description: "We embrace new ideas and technologies to enhance the learning experience.",
                  icon: "💡"
                },
                {
                  title: "Inclusivity",
                  description: "We welcome and celebrate diversity, ensuring every student feels valued.",
                  icon: "🌍"
                },
                {
                  title: "Collaboration",
                  description: "We work together as a community to achieve common goals.",
                  icon: "👥"
                },
                {
                  title: "Responsibility",
                  description: "We take ownership of our actions and their impact on others.",
                  icon: "🎯"
                }
              ].map((value, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the dedicated leaders who guide our educational mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  position: "Principal",
                  description: "With over 20 years in education, Dr. Johnson leads our school with passion and vision.",
                  image: "/teachers/sample-teacher.jpg"
                },
                {
                  name: "Mr. David Wilson",
                  position: "Vice Principal",
                  description: "An experienced educator focused on curriculum development and student success.",
                  image: "/teachers/sample-teacher.jpg"
                },
                {
                  name: "Ms. Emily Chen",
                  position: "Academic Director",
                  description: "Dedicated to maintaining high academic standards and innovative teaching methods.",
                  image: "/teachers/sample-teacher.jpg"
                }
              ].map((leader, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{leader.position}</p>
                  <p className="text-gray-600">{leader.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Become part of our educational family and experience the difference quality education makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/admission"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply for Admission
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
