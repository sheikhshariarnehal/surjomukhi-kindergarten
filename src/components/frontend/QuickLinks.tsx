'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface QuickLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: 'government' | 'education' | 'resources';
  external?: boolean;
}

const quickLinksData: QuickLink[] = [
  {
    id: '1',
    title: 'Ministry of Education',
    description: 'Official website of the Ministry of Education, Bangladesh',
    url: 'https://moedu.gov.bd',
    icon: 'government',
    category: 'government',
    external: true
  },
  {
    id: '2',
    title: 'Directorate of Secondary Education',
    description: 'Secondary and Higher Secondary Education Board',
    url: 'https://dshe.gov.bd',
    icon: 'education',
    category: 'government',
    external: true
  },
  {
    id: '3',
    title: 'National Curriculum Board',
    description: 'National Curriculum and Textbook Board (NCTB)',
    url: 'https://nctb.gov.bd',
    icon: 'curriculum',
    category: 'education',
    external: true
  },
  {
    id: '4',
    title: 'Education Board Results',
    description: 'Check SSC, HSC and other board examination results',
    url: 'https://eboardresults.com',
    icon: 'results',
    category: 'education',
    external: true
  },
  {
    id: '5',
    title: 'Digital Bangladesh',
    description: 'Government\'s digital initiative for education',
    url: 'https://digitalbangladesh.gov.bd',
    icon: 'digital',
    category: 'government',
    external: true
  },
  {
    id: '6',
    title: 'Online Library',
    description: 'Access digital books and educational resources',
    url: '/resources/library',
    icon: 'library',
    category: 'resources',
    external: false
  },
  {
    id: '7',
    title: 'Student Portal',
    description: 'Student information system and academic records',
    url: '/student/portal',
    icon: 'student',
    category: 'resources',
    external: false
  },
  {
    id: '8',
    title: 'Parent Portal',
    description: 'Track your child\'s progress and school activities',
    url: '/parent/portal',
    icon: 'parent',
    category: 'resources',
    external: false
  }
];

const IconComponent = React.memo(({ iconType, className }: { iconType: string; className: string }) => {
  const iconProps = {
    className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  switch (iconType) {
    case 'government':
      return (
        <svg {...iconProps}>
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'education':
      return (
        <svg {...iconProps}>
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case 'curriculum':
      return (
        <svg {...iconProps}>
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'results':
      return (
        <svg {...iconProps}>
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'digital':
      return (
        <svg {...iconProps}>
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'library':
      return (
        <svg {...iconProps}>
          <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      );
    case 'student':
      return (
        <svg {...iconProps}>
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'parent':
      return (
        <svg {...iconProps}>
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
  }
});

IconComponent.displayName = 'IconComponent';

const ExternalLinkIcon = React.memo(() => (
  <svg className="w-3.5 h-3.5 inline-block ml-1.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
));

ExternalLinkIcon.displayName = 'ExternalLinkIcon';

const LinkCard = React.memo(({ link, index, colorScheme }: { 
  link: QuickLink; 
  index: number; 
  colorScheme: { primary: string; hover: string; border: string; text: string } 
}) => {
  const LinkWrapper = link.external ? 'a' : Link;
  const linkProps = link.external 
    ? { 
        href: link.url, 
        target: '_blank', 
        rel: 'noopener noreferrer',
        'aria-label': `${link.title} - Opens in new tab`
      }
    : { href: link.url };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <LinkWrapper
        {...linkProps}
        className={`flex items-start p-4 bg-white rounded-xl hover:${colorScheme.hover} hover:border-${colorScheme.border} border border-gray-100 hover:border-opacity-60 transition-all duration-300 group shadow-sm hover:shadow-md h-full`}
      >
        <div className={`${colorScheme.primary} group-hover:${colorScheme.text} mr-3 mt-0.5 flex-shrink-0`}>
          <IconComponent iconType={link.icon} className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-gray-900 group-hover:${colorScheme.text} mb-1.5 text-sm md:text-base leading-tight`}>
            {link.title}
            {link.external && <ExternalLinkIcon />}
          </h4>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-2">{link.description}</p>
        </div>
      </LinkWrapper>
    </motion.div>
  );
});

LinkCard.displayName = 'LinkCard';

const CategorySection = React.memo(({ 
  title, 
  icon, 
  links, 
  colorScheme 
}: {
  title: string;
  icon: React.ReactNode;
  links: QuickLink[];
  colorScheme: { primary: string; hover: string; border: string; text: string };
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
      <span className={`${colorScheme.primary} mr-2.5`}>
        {icon}
      </span>
      {title}
    </h3>
    <div className="grid gap-3">
      {links.map((link, index) => (
        <LinkCard 
          key={link.id} 
          link={link} 
          index={index} 
          colorScheme={colorScheme}
        />
      ))}
    </div>
  </div>
));

CategorySection.displayName = 'CategorySection';

export default function QuickLinks() {
  const governmentLinks = quickLinksData.filter(link => link.category === 'government');
  const educationLinks = quickLinksData.filter(link => link.category === 'education');
  const resourceLinks = quickLinksData.filter(link => link.category === 'resources');

  const colorSchemes = {
    government: {
      primary: 'text-blue-600',
      hover: 'bg-blue-50',
      border: 'blue-200',
      text: 'text-blue-700'
    },
    education: {
      primary: 'text-emerald-600',
      hover: 'bg-emerald-50',
      border: 'emerald-200',
      text: 'text-emerald-700'
    },
    resources: {
      primary: 'text-purple-600',
      hover: 'bg-purple-50',
      border: 'purple-200',
      text: 'text-purple-700'
    }
  };

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Quick Links & Educational Resources",
    "description": "Access important government portals, educational resources, and school services for students, parents, and educators in Bangladesh.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": quickLinksData.map((link, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "name": link.title,
          "description": link.description,
          "url": link.url
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="py-12 bg-[#FAFCFD]" role="region" aria-labelledby="quick-links-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 id="quick-links-title" className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Quick Links & Resources
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access important government portals, educational resources, and school services with just one click.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            <CategorySection
              title="Government Portals"
              icon={<IconComponent iconType="government" className="w-5 h-5" />}
              links={governmentLinks}
              colorScheme={colorSchemes.government}
            />
            
            <CategorySection
              title="Educational Resources"
              icon={<IconComponent iconType="education" className="w-5 h-5" />}
              links={educationLinks}
              colorScheme={colorSchemes.education}
            />
            
            <CategorySection
              title="School Services"
              icon={<IconComponent iconType="library" className="w-5 h-5" />}
              links={resourceLinks}
              colorScheme={colorSchemes.resources}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm max-w-4xl mx-auto">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                Need Help Finding Something?
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help you navigate our resources and services.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                  aria-label="Contact our support team"
                >
                  Contact Support
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
                <Link
                  href="/downloads"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
                  aria-label="Browse available downloads"
                >
                  Browse Downloads
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}