import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Administrator - Surjomukhi Kindergarten',
  description: 'Meet our dedicated administrative team who ensure smooth operations and excellent service for our school community.',
  keywords: ['administrator', 'administration', 'school management', 'support staff'],
  openGraph: {
    title: 'Administrator - Surjomukhi Kindergarten',
    description: 'Meet our dedicated administrative team.',
    type: 'website',
  },
};

export default function AdministratorPage() {
  const adminTeam = [
    {
      name: 'Mrs. Nasreen Akter',
      position: 'School Administrator',
      department: 'General Administration',
      experience: '10+ Years',
      responsibilities: [
        'Overall school operations management',
        'Student enrollment and records',
        'Staff coordination and scheduling',
        'Parent communication and relations'
      ],
      contact: 'admin@surjomukhi.edu',
      phone: '+880-1234-567890'
    },
    {
      name: 'Mr. Kamal Hossain',
      position: 'Academic Coordinator',
      department: 'Academic Affairs',
      experience: '8+ Years',
      responsibilities: [
        'Curriculum implementation oversight',
        'Teacher support and development',
        'Academic calendar management',
        'Assessment and evaluation coordination'
      ],
      contact: 'academic@surjomukhi.edu',
      phone: '+880-1234-567891'
    },
    {
      name: 'Ms. Ruma Begum',
      position: 'Student Affairs Officer',
      department: 'Student Services',
      experience: '6+ Years',
      responsibilities: [
        'Student welfare and support',
        'Extracurricular activities coordination',
        'Health and safety monitoring',
        'Student counseling services'
      ],
      contact: 'student.affairs@surjomukhi.edu',
      phone: '+880-1234-567892'
    },
    {
      name: 'Mr. Abdul Rahman',
      position: 'Finance Officer',
      department: 'Finance & Accounts',
      experience: '12+ Years',
      responsibilities: [
        'Financial planning and budgeting',
        'Fee collection and management',
        'Expense tracking and reporting',
        'Financial compliance and auditing'
      ],
      contact: 'finance@surjomukhi.edu',
      phone: '+880-1234-567893'
    }
  ];

  const departments = [
    {
      name: 'General Administration',
      description: 'Oversees daily operations, enrollment, and general school management.',
      icon: '🏢',
      services: ['Student Registration', 'Record Management', 'General Inquiries', 'Facility Management']
    },
    {
      name: 'Academic Affairs',
      description: 'Manages curriculum, teaching standards, and academic programs.',
      icon: '📚',
      services: ['Curriculum Development', 'Teacher Training', 'Academic Planning', 'Quality Assurance']
    },
    {
      name: 'Student Services',
      description: 'Focuses on student welfare, activities, and support services.',
      icon: '👥',
      services: ['Student Counseling', 'Activity Coordination', 'Health Monitoring', 'Parent Meetings']
    },
    {
      name: 'Finance & Accounts',
      description: 'Handles financial operations, budgeting, and fee management.',
      icon: '💰',
      services: ['Fee Collection', 'Budget Planning', 'Financial Reports', 'Payment Processing']
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
                <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-700">About</Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">Administrator</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Administrative Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Meet the dedicated professionals who ensure smooth operations and excellent service for our school community.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Excellence in Administration
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our administrative team works tirelessly behind the scenes to ensure that every aspect 
              of school operations runs smoothly. From enrollment to daily management, from academic 
              coordination to student services, our team is committed to providing exceptional support 
              to students, parents, and teachers.
            </p>
          </div>
        </div>
      </section>

      {/* Administrative Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced administrative professionals are here to serve you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {adminTeam.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-teal-600 font-medium mb-1">{member.position}</p>
                    <p className="text-gray-500 text-sm">{member.department}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">
                      {member.experience}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Responsibilities:</h4>
                  <ul className="space-y-1">
                    {member.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="flex items-start text-sm text-gray-600">
                        <span className="text-teal-500 mr-2 mt-1">•</span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📧</span>
                    <a href={`mailto:${member.contact}`} className="hover:text-teal-600 transition-colors">
                      {member.contact}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📞</span>
                    <a href={`tel:${member.phone}`} className="hover:text-teal-600 transition-colors">
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Administrative Departments
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our organized departmental structure ensures efficient service delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{dept.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{dept.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Services:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {dept.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center text-sm text-gray-600">
                        <span className="text-teal-500 mr-2">✓</span>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours & Contact */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Office Hours & Contact
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Our administrative office is open to serve you during the following hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl mb-4">🕐</div>
              <h3 className="text-xl font-bold mb-2">Office Hours</h3>
              <p className="text-teal-100">Monday - Friday: 8:00 AM - 4:00 PM</p>
              <p className="text-teal-100">Saturday: 9:00 AM - 1:00 PM</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-teal-100">Main Office: +880-1234-567890</p>
              <p className="text-teal-100">Emergency: +880-1234-567899</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-teal-100">info@surjomukhi.edu</p>
              <p className="text-teal-100">admin@surjomukhi.edu</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Administration
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
