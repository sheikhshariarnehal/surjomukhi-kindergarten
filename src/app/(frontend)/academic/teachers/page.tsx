import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Teachers - Surjomukhi Kindergarten',
  description: 'Meet our qualified and experienced teachers dedicated to providing quality early childhood education.',
  keywords: ['teachers', 'faculty', 'qualified educators', 'early childhood specialists'],
  openGraph: {
    title: 'Our Teachers - Surjomukhi Kindergarten',
    description: 'Meet our dedicated teaching team.',
    type: 'website',
  },
};

export default function AcademicTeachersPage() {
  const teachers = [
    {
      name: 'Mrs. Salma Khatun',
      position: 'Head Teacher',
      qualification: 'M.Ed in Early Childhood Education',
      experience: '15+ Years',
      specialization: 'Curriculum Development & Child Psychology',
      classes: 'Play Group & Nursery',
      description: 'Passionate about creating nurturing learning environments for young children.',
      achievements: ['Child Development Specialist', 'Montessori Certified', 'Parent Counseling Expert']
    },
    {
      name: 'Ms. Rashida Begum',
      position: 'Senior Teacher',
      qualification: 'B.Ed in Primary Education',
      experience: '12+ Years',
      specialization: 'Language Arts & Creative Expression',
      classes: 'Class One & Two',
      description: 'Dedicated to fostering creativity and language development in children.',
      achievements: ['Creative Arts Specialist', 'Storytelling Expert', 'Reading Specialist']
    },
    {
      name: 'Mr. Kamal Ahmed',
      position: 'Mathematics Teacher',
      qualification: 'M.Sc in Mathematics, B.Ed',
      experience: '10+ Years',
      specialization: 'Mathematics & Logical Thinking',
      classes: 'Class Three, Four & Five',
      description: 'Makes mathematics fun and accessible for young learners.',
      achievements: ['Math Olympiad Coach', 'Problem Solving Expert', 'STEM Advocate']
    },
    {
      name: 'Mrs. Fatema Rahman',
      position: 'Science Teacher',
      qualification: 'M.Sc in Biology, B.Ed',
      experience: '8+ Years',
      specialization: 'Science & Nature Studies',
      classes: 'All Classes',
      description: 'Encourages scientific curiosity and hands-on exploration.',
      achievements: ['Science Fair Coordinator', 'Nature Study Expert', 'Lab Safety Specialist']
    },
    {
      name: 'Ms. Nasreen Akter',
      position: 'Art & Music Teacher',
      qualification: 'BFA, Diploma in Music',
      experience: '6+ Years',
      specialization: 'Creative Arts & Music',
      classes: 'All Classes',
      description: 'Nurtures artistic expression and musical talents in children.',
      achievements: ['Art Exhibition Organizer', 'Music Performance Director', 'Creative Workshop Leader']
    },
    {
      name: 'Mr. Abdul Hamid',
      position: 'Physical Education Teacher',
      qualification: 'B.P.Ed, Sports Coaching Certificate',
      experience: '7+ Years',
      specialization: 'Physical Development & Sports',
      classes: 'All Classes',
      description: 'Promotes physical fitness and healthy lifestyle habits.',
      achievements: ['Youth Sports Coach', 'Fitness Program Developer', 'Safety Training Certified']
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
              <li><a href="/academic" className="text-gray-500 hover:text-gray-700">Academic</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Our Teachers</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Dedicated Teachers</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Meet our qualified and passionate educators who are committed to nurturing your child's growth and development.
            </p>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Experienced & Qualified Faculty
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our teachers are carefully selected for their expertise, experience, and passion for early childhood education. 
              Each brings unique skills and dedication to creating the best learning environment for our students.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {teachers.map((teacher, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 mx-auto sm:mx-0">
                      <span className="text-white font-bold text-lg sm:text-xl">{teacher.name.split(' ')[1]?.charAt(0) || teacher.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                      <p className="text-teal-600 font-medium mb-2">{teacher.position}</p>
                      <div className="flex flex-wrap gap-2 mb-2 justify-center sm:justify-start">
                        <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">
                          {teacher.experience}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {teacher.classes}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Qualification:</h4>
                      <p className="text-gray-600 text-sm">{teacher.qualification}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Specialization:</h4>
                      <p className="text-gray-600 text-sm">{teacher.specialization}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 text-sm italic">{teacher.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Key Achievements:</h4>
                      <div className="flex flex-wrap gap-1">
                        {teacher.achievements.map((achievement, achIndex) => (
                          <span key={achIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Teaching Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our teachers share a common commitment to excellence in early childhood education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Nurturing Care</h3>
              <p className="text-gray-600 text-sm">Creating a loving and supportive environment</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Individual Focus</h3>
              <p className="text-gray-600 text-sm">Recognizing each child's unique needs and potential</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Growth Mindset</h3>
              <p className="text-gray-600 text-sm">Encouraging continuous learning and development</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Partnership</h3>
              <p className="text-gray-600 text-sm">Working closely with parents and families</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Our Teachers in Person
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Schedule a visit to meet our dedicated teaching team and see how they create magical learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-teal-600 px-6 sm:px-8 py-4 text-base sm:text-lg rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center min-h-[48px] flex items-center justify-center"
            >
              Schedule a Visit
            </a>
            <a
              href="/admission"
              className="border-2 border-white text-white px-6 sm:px-8 py-4 text-base sm:text-lg rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors text-center min-h-[48px] flex items-center justify-center"
            >
              Apply for Admission
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
