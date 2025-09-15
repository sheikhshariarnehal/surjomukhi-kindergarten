'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  // Generate JSON-LD structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}${item.href}`
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <nav 
        className={`flex ${className}`} 
        aria-label="Breadcrumb"
        role="navigation"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRightIcon 
                  className="w-4 h-4 text-gray-400 mx-1" 
                  aria-hidden="true" 
                />
              )}
              
              {item.current ? (
                <span 
                  className="text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-current="page"
                >
                  {index === 0 ? (
                    <HomeIcon className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  {index === 0 ? (
                    <>
                      <HomeIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                      <span className="sr-only">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
