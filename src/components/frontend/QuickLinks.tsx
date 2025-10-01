'use client';

import React from 'react';
import Link from 'next/link';

interface QuickLink {
  id: string;
  title: string;
  description: string;
  url: string;
  external?: boolean;
  category: 'government' | 'education' | 'resources';
}

const quickLinksData: QuickLink[] = [
  {
    id: 'ministry-education',
    title: 'Ministry of Education',
    description: 'Official Ministry of Education Bangladesh',
    url: 'https://moedu.gov.bd',
    external: true,
    category: 'government'
  },
  {
    id: 'nctb',
    title: 'National Curriculum Board',
    description: 'NCTB curriculum and textbook resources',
    url: 'https://www.nctb.gov.bd',
    external: true,
    category: 'government'
  },
  {
    id: 'digital-bangladesh',
    title: 'Digital Bangladesh',
    description: 'Government digital education initiative',
    url: 'https://digitalbangladesh.gov.bd',
    external: true,
    category: 'government'
  },
  {
    id: 'education-board',
    title: 'Education Board Results',
    description: 'Check exam results and academic information',
    url: 'https://eboardresults.com',
    external: true,
    category: 'education'
  },
  {
    id: 'digital-library',
    title: 'Digital Library',
    description: 'Educational e-books and learning materials',
    url: 'https://library.gov.bd',
    external: true,
    category: 'education'
  },
  {
    id: 'student-portal',
    title: 'Student Portal',
    description: 'Access student dashboard and resources',
    url: '/student-portal',
    category: 'resources'
  },
  {
    id: 'parent-portal',
    title: 'Parent Portal',
    description: 'Monitor child progress and communication',
    url: '/parent-portal',
    category: 'resources'
  }
];

const LinkCard: React.FC<{ link: QuickLink }> = ({ link }) => {
  const LinkWrapper = link.external ? 'a' : Link;
  
  const linkProps = link.external
    ? {
        href: link.url,
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {
        href: link.url
      };

  return (
    <LinkWrapper
      {...linkProps}
      className="group block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {link.title}
            {link.external && (
              <svg className="w-3 h-3 inline-block ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{link.description}</p>
        </div>
      </div>
    </LinkWrapper>
  );
};

const CategorySection: React.FC<{ 
  title: string; 
  links: QuickLink[];
  icon: React.ReactNode;
}> = ({ title, links, icon }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
};

export default function QuickLinks() {
  const categorizedLinks = {
    government: quickLinksData.filter(link => link.category === 'government'),
    education: quickLinksData.filter(link => link.category === 'education'),
    resources: quickLinksData.filter(link => link.category === 'resources')
  };

  const categories = [
    {
      id: 'government',
      title: 'Government Portals',
      links: categorizedLinks.government,
      icon: (
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'education',
      title: 'Educational Resources',
      links: categorizedLinks.education,
      icon: (
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'resources',
      title: 'School Services',
      links: categorizedLinks.resources,
      icon: (
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    }
  ];

  return (
    <section 
      id="quick-links" 
      className="py-12 bg-gray-50"
      aria-labelledby="quick-links-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            id="quick-links-title"
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Quick Links & Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access important educational resources, government portals, and school services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            category.links.length > 0 && (
              <CategorySection
                key={category.id}
                title={category.title}
                links={category.links}
                icon={category.icon}
              />
            )
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Contact our support team for assistance.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}