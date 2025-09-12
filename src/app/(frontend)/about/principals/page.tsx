import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Principals - Surjomukhi Kindergarten',
  description: 'Meet our dedicated principals who lead our institution with vision, experience, and commitment to excellence.',
  keywords: ['principals', 'leadership', 'administration', 'school management'],
  openGraph: {
    title: 'Our Principals - Surjomukhi Kindergarten',
    description: 'Meet our dedicated educational leaders.',
    type: 'website',
  },
};

export default function PrincipalsPage() {
  const principals = [
    {
      name: 'Mrs. Fatema Khatun',
      position: 'Principal',
      experience: '15+ Years',
      education: 'M.Ed in Early Childhood Education',
      specialization: 'Child Development & Curriculum Design',
      description: 'Mrs. Fatema Khatun brings over 15 years of experience in early childhood education. She is passionate about creating innovative learning environments that foster creativity and critical thinking in young minds.',
      achievements: [
        'Certified in Montessori Education',
        'Child Psychology Specialist',
        'Curriculum Development Expert',
        'Parent-Teacher Relationship Advocate'
      ],
      philosophy: 'Every child is unique and deserves an education that recognizes their individual strengths and nurtures their potential.',
      contact: 'principal@surjomukhi.edu'
    },
    {
      name: 'Mr. Shahidul Islam',
      position: 'Vice Principal',
      experience: '12+ Years',
      education: 'M.A in Education Management',
      specialization: 'Educational Administration & Student Affairs',
      description: 'Mr. Shahidul Islam is dedicated to ensuring smooth operations and maintaining high educational standards. His focus on student welfare and academic excellence has been instrumental in our success.',
      achievements: [
        'Educational Leadership Certification',
        'Student Counseling Specialist',
        'Quality Assurance Expert',
        'Community Engagement Leader'
      ],
      philosophy: 'Quality education is built on strong foundations of care, discipline, and continuous improvement.',
      contact: 'viceprincipal@surjomukhi.edu'
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
                <span className="text-gray-900 font-medium">Our Principals</span>
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
              Our Educational Leaders
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Meet the dedicated principals who guide our institution with vision, experience, and unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Leadership Message
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Surjomukhi Kindergarten, our leadership team is committed to providing an exceptional 
                educational experience for every child. We believe that strong leadership is the foundation 
                of a successful educational institution.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our principals bring together decades of experience in early childhood education, 
                combining traditional values with modern teaching methodologies to create an environment 
                where children can thrive academically, socially, and emotionally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principals Profiles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {principals.map((principal, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                {/* Photo */}
                <div className="lg:w-1/3">
                  <div className="w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">{principal.name}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="lg:w-2/3">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {principal.name}
                      </h3>
                      <p className="text-xl text-indigo-600 font-medium mb-4">{principal.position}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <span className="font-semibold text-gray-700">Experience:</span>
                          <span className="ml-2 text-gray-600">{principal.experience}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Education:</span>
                          <span className="ml-2 text-gray-600">{principal.education}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-semibold text-gray-700">Specialization:</span>
                          <span className="ml-2 text-gray-600">{principal.specialization}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{principal.description}</p>
                    
                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Achievements:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {principal.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-600 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Philosophy */}
                    <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-indigo-800 mb-2">Educational Philosophy:</h4>
                      <p className="text-indigo-700 italic">"{principal.philosophy}"</p>
                    </div>
                    
                    {/* Contact */}
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📧</span>
                      <a href={`mailto:${principal.contact}`} className="hover:text-indigo-600 transition-colors">
                        {principal.contact}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Leadership Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The core principles that guide our leadership approach and decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-indigo-50 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Vision</h3>
              <p className="text-gray-600 text-sm">Clear direction and purpose in all our educational initiatives</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600 text-sm">Working together with teachers, parents, and community</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Embracing new ideas and modern teaching methods</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Care</h3>
              <p className="text-gray-600 text-sm">Genuine concern for every child's wellbeing and success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Leadership */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connect with Our Leadership
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Have questions or want to discuss your child's education? Our principals are always available 
            to meet with parents and address any concerns.
          </p>
          <a
            href="/contact"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Schedule a Meeting
          </a>
        </div>
      </section>
    </div>
  );
}
