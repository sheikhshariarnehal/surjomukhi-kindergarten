'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  QUICK_LINKS_DATA,
  COLOR_SCHEMES,
  ANIMATION_VARIANTS,
  CATEGORY_METADATA,
  SITE_CONFIG,
  type QuickLink,
  type CategoryType,
  type IconType,
  type ColorScheme
} from '@/constants/quickLinks';

// Component-specific constants and utilities

// Optimized Icon Component with better performance and accessibility
const IconComponent = React.memo<{ iconType: IconType; className: string; 'aria-hidden'?: boolean }>(
  ({ iconType, className, 'aria-hidden': ariaHidden = true }) => {
    const iconProps = {
      className,
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      'aria-hidden': ariaHidden,
      role: ariaHidden ? undefined : 'img'
    };

    const iconPaths = {
      government: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      education: ["M12 14l9-5-9-5-9 5 9 5z", "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"],
      curriculum: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      results: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      digital: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      library: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
      student: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      parent: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    };

    const paths = iconPaths[iconType];

    return (
      <svg {...iconProps}>
        {Array.isArray(paths) ? (
          paths.map((path, index) => <path key={index} d={path} />)
        ) : (
          <path d={paths} />
        )}
      </svg>
    );
  }
);

IconComponent.displayName = 'IconComponent';

// Optimized External Link Icon
const ExternalLinkIcon = React.memo<{ className?: string }>(({ className = "w-3.5 h-3.5 inline-block ml-1.5 opacity-70" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
    aria-label="External link"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
));

ExternalLinkIcon.displayName = 'ExternalLinkIcon';

// Optimized LinkCard component with better accessibility and performance
const LinkCard = React.memo<{
  link: QuickLink;
  index: number;
  colorScheme: ColorScheme;
}>(({ link, index, colorScheme }) => {
  const LinkWrapper = link.external ? 'a' : Link;

  // Optimized link props with better accessibility
  const linkProps = link.external
    ? {
        href: link.url,
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
        'aria-label': `${link.title} - ${link.description} (Opens in new tab)`,
        title: `${link.title} - ${link.description}`
      }
    : {
        href: link.url,
        'aria-label': `${link.title} - ${link.description}`,
        title: `${link.title} - ${link.description}`
      };

  return (
    <motion.article
      variants={ANIMATION_VARIANTS.card}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full will-change-transform"
      role="article"
      aria-labelledby={`link-title-${link.id}`}
      aria-describedby={`link-desc-${link.id}`}
    >
      <LinkWrapper
        {...linkProps}
        className={`
          group relative flex items-start p-5 bg-white rounded-2xl
          border border-gray-100 hover:border-${colorScheme.border}
          transition-all duration-300 ease-out
          shadow-sm hover:shadow-lg hover:shadow-${colorScheme.border}/10
          focus:outline-none focus:ring-2 focus:ring-${colorScheme.border} focus:ring-offset-2
          h-full overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-br
          before:from-${colorScheme.background} before:to-transparent
          before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
        `}
      >
        {/* Priority indicator for important links */}
        {link.priority && (
          <div className={`absolute top-3 right-3 w-2 h-2 rounded-full bg-${colorScheme.border} opacity-60`}
               aria-hidden="true" />
        )}

        {/* Icon container with better styling */}
        <div className={`
          relative z-10 ${colorScheme.primary} group-hover:${colorScheme.text}
          mr-4 mt-1 flex-shrink-0 p-2 rounded-lg
          bg-${colorScheme.background} group-hover:bg-${colorScheme.accent}
          transition-all duration-300
        `}>
          <IconComponent
            iconType={link.icon}
            className="w-5 h-5"
            aria-hidden={true}
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 flex-1 min-w-0">
          <h4
            id={`link-title-${link.id}`}
            className={`
              font-semibold text-gray-900 group-hover:${colorScheme.text}
              mb-2 text-sm md:text-base leading-tight
              transition-colors duration-300
            `}
          >
            {link.title}
            {link.external && (
              <ExternalLinkIcon className="w-3 h-3 inline-block ml-2 opacity-60 group-hover:opacity-100" />
            )}
          </h4>
          <p
            id={`link-desc-${link.id}`}
            className="text-xs md:text-sm text-gray-600 group-hover:text-gray-700 leading-relaxed line-clamp-2 transition-colors duration-300"
          >
            {link.description}
          </p>

          {/* Keywords for SEO (hidden visually but available to screen readers) */}
          {link.keywords && (
            <span className="sr-only">
              Keywords: {link.keywords.join(', ')}
            </span>
          )}
        </div>

        {/* Hover indicator */}
        <div className={`
          absolute bottom-0 left-0 right-0 h-1
          bg-gradient-to-r from-${colorScheme.border} to-${colorScheme.primary}
          transform scale-x-0 group-hover:scale-x-100
          transition-transform duration-300 origin-left
        `} aria-hidden="true" />
      </LinkWrapper>
    </motion.article>
  );
});

LinkCard.displayName = 'LinkCard';

// Optimized CategorySection with better structure and accessibility
const CategorySection = React.memo<{
  title: string;
  icon: React.ReactNode;
  links: readonly QuickLink[];
  colorScheme: ColorScheme;
  categoryId: string;
}>(({ title, icon, links, colorScheme, categoryId }) => (
  <motion.section
    variants={ANIMATION_VARIANTS.item}
    className="space-y-6"
    role="region"
    aria-labelledby={`category-title-${categoryId}`}
  >
    <header className="space-y-2">
      <h3
        id={`category-title-${categoryId}`}
        className="text-lg md:text-xl font-bold text-gray-900 flex items-center"
      >
        <span className={`${colorScheme.primary} mr-3 p-2 rounded-lg bg-${colorScheme.background}`}>
          {icon}
        </span>
        {title}
      </h3>
      <div className={`h-1 w-16 bg-gradient-to-r from-${colorScheme.border} to-${colorScheme.primary} rounded-full`}
           aria-hidden="true" />
    </header>

    <div className="grid gap-4" role="list">
      {links.map((link, index) => (
        <div key={link.id} role="listitem">
          <LinkCard
            link={link}
            index={index}
            colorScheme={colorScheme}
          />
        </div>
      ))}
    </div>

    {/* Category summary for screen readers */}
    <div className="sr-only">
      {title} section contains {links.length} links: {links.map(link => link.title).join(', ')}
    </div>
  </motion.section>
));

CategorySection.displayName = 'CategorySection';

// Main QuickLinks component with comprehensive optimizations
export default function QuickLinks() {
  // Memoized data filtering for better performance
  const categorizedLinks = useMemo(() => ({
    government: QUICK_LINKS_DATA.filter((link): link is QuickLink => link.category === 'government'),
    education: QUICK_LINKS_DATA.filter((link): link is QuickLink => link.category === 'education'),
    resources: QUICK_LINKS_DATA.filter((link): link is QuickLink => link.category === 'resources')
  }), []);

  // Enhanced SEO structured data with more comprehensive information
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Quick Links & Educational Resources - Surjomukhi Kindergarten",
    "description": "Access important government portals, educational resources, and school services for students, parents, and educators in Bangladesh. Find links to Ministry of Education, NCTB, student portals, and more.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://surjamukhikindergarten.com'}/#quick-links`,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${process.env.NEXT_PUBLIC_APP_URL || 'https://surjamukhikindergarten.com'}/#website`
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Educational Quick Links",
      "description": "Curated list of important educational and government resources",
      "numberOfItems": QUICK_LINKS_DATA.length,
      "itemListElement": QUICK_LINKS_DATA.map((link, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": link.external ? "WebPage" : "WebPageElement",
          "@id": link.external ? link.url : `${process.env.NEXT_PUBLIC_APP_URL || 'https://surjamukhikindergarten.com'}${link.url}`,
          "name": link.title,
          "description": link.description,
          "url": link.external ? link.url : `${process.env.NEXT_PUBLIC_APP_URL || 'https://surjamukhikindergarten.com'}${link.url}`,
          "keywords": link.keywords?.join(', '),
          "category": link.category,
          "isAccessibleForFree": true,
          ...(link.external && {
            "provider": {
              "@type": "Organization",
              "name": link.category === 'government' ? "Government of Bangladesh" : "Educational Institution"
            }
          })
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": process.env.NEXT_PUBLIC_APP_URL || 'https://surjamukhikindergarten.com'
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Quick Links",
          "item": `${process.env.NEXT_PUBLIC_APP_URL || 'https://surjamukhikindergarten.com'}/#quick-links`
        }
      ]
    }
  }), []);

  // Category configurations with enhanced metadata
  const categoryConfigs = useMemo(() => [
    {
      id: 'government',
      title: 'Government Portals',
      description: 'Official government websites and educational authorities',
      icon: <IconComponent iconType="government" className="w-5 h-5" aria-hidden={true} />,
      links: categorizedLinks.government,
      colorScheme: COLOR_SCHEMES.government
    },
    {
      id: 'education',
      title: 'Educational Resources',
      description: 'Academic resources, curriculum, and examination information',
      icon: <IconComponent iconType="education" className="w-5 h-5" aria-hidden={true} />,
      links: categorizedLinks.education,
      colorScheme: COLOR_SCHEMES.education
    },
    {
      id: 'resources',
      title: 'School Services',
      description: 'Student and parent portals, library, and school resources',
      icon: <IconComponent iconType="library" className="w-5 h-5" aria-hidden={true} />,
      links: categorizedLinks.resources,
      colorScheme: COLOR_SCHEMES.resources
    }
  ], [categorizedLinks]);

  return (
    <>
      {/* Enhanced SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main section with improved semantic structure */}
      <section
        id="quick-links"
        className="py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden"
        role="region"
        aria-labelledby="quick-links-title"
        aria-describedby="quick-links-description"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" aria-hidden="true" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced header section */}
          <motion.header
            variants={ANIMATION_VARIANTS.item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>

            <h2
              id="quick-links-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Quick Links &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Resources</span>
            </h2>

            <p
              id="quick-links-description"
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Access important government portals, educational resources, and school services with just one click.
              Everything you need for your educational journey in Bangladesh.
            </p>

            {/* Statistics */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" aria-hidden="true" />
                {categorizedLinks.government.length} Government Portals
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" aria-hidden="true" />
                {categorizedLinks.education.length} Educational Resources
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" aria-hidden="true" />
                {categorizedLinks.resources.length} School Services
              </div>
            </div>
          </motion.header>

          {/* Categories grid with enhanced layout */}
          <motion.div
            variants={ANIMATION_VARIANTS.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16"
          >
            {categoryConfigs.map((category) => (
              <CategorySection
                key={category.id}
                categoryId={category.id}
                title={category.title}
                icon={category.icon}
                links={category.links}
                colorScheme={category.colorScheme}
              />
            ))}
          </motion.div>

          {/* Enhanced help section */}
          <motion.div
            variants={ANIMATION_VARIANTS.item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-xl max-w-5xl mx-auto overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50" aria-hidden="true" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Need Help Finding Something?
                </h3>

                <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Can&apos;t find what you&apos;re looking for? Our dedicated support team is here to help you navigate
                  our comprehensive resources and services. We&apos;re committed to making your educational journey smooth and successful.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Contact our support team for assistance"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Support
                  </Link>

                  <Link
                    href="/downloads"
                    className="group inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Browse and download available resources"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Browse Downloads
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}