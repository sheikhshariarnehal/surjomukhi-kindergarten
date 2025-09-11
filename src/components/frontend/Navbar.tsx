'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/lib';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our History', href: '/about#history' },
      { label: 'Mission & Vision', href: '/about#mission' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Infrastructure', href: '/about#infrastructure' },
    ]
  },
  {
    label: 'Academic',
    href: '/academic',
    children: [
      { label: 'Curriculum', href: '/academic/curriculum' },
      { label: 'Classes & Sections', href: '/academic/classes' },
      { label: 'Subjects', href: '/academic/subjects' },
      { label: 'Academic Calendar', href: '/academic/calendar' },
      { label: 'Syllabus', href: '/academic/syllabus' },
    ]
  },
  {
    label: 'Admission',
    href: '/admission',
    children: [
      { label: 'Admission Process', href: '/admission#process' },
      { label: 'Requirements', href: '/admission#requirements' },
      { label: 'Fee Structure', href: '/admission#fees' },
      { label: 'Apply Online', href: '/admission/apply' },
    ]
  },
  {
    label: 'Student',
    href: '/student',
    children: [
      { label: 'Student Life', href: '/student/life' },
      { label: 'Activities', href: '/student/activities' },
      { label: 'Achievements', href: '/student/achievements' },
      { label: 'Student Council', href: '/student/council' },
    ]
  },
  {
    label: 'Facilities',
    href: '/facilities',
    children: [
      { label: 'Library', href: '/facilities/library' },
      { label: 'Laboratory', href: '/facilities/laboratory' },
      { label: 'Sports', href: '/facilities/sports' },
      { label: 'Transport', href: '/facilities/transport' },
    ]
  },
  {
    label: 'Result',
    href: '/result',
    children: [
      { label: 'Exam Results', href: '/result/exam' },
      { label: 'Academic Performance', href: '/result/performance' },
      { label: 'Certificate Verification', href: '/verify-certificate' },
    ]
  },
  {
    label: 'Others',
    href: '/others',
    children: [
      { label: 'Notices', href: '/notices' },
      { label: 'News & Events', href: '/news' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Downloads', href: '/downloads' },
      { label: 'Teachers', href: '/teachers' },
    ]
  },
  { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                className="h-10 w-auto"
                src="/logo.png"
                alt="School Logo"
                width={40}
                height={40}
                priority
              />
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                surjomukhi kindergarten
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <div>
                      <button
                        className={cn(
                          'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center',
                          isActiveLink(item.href)
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                        )}
                        onClick={() => handleDropdownToggle(item.label)}
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <svg
                          className={cn(
                            'ml-1 h-4 w-4 transition-transform duration-200',
                            activeDropdown === item.label && 'rotate-180'
                          )}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div
                        className={cn(
                          'absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200',
                          activeDropdown === item.label
                            ? 'opacity-100 visible transform translate-y-0'
                            : 'opacity-0 invisible transform -translate-y-2'
                        )}
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'block px-4 py-2 text-sm transition-colors duration-200',
                                isActiveLink(child.href)
                                  ? 'text-primary-600 bg-primary-50'
                                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                              )}
                              role="menuitem"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                        isActiveLink(item.href)
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/admission">
              <Button variant="outline" size="sm">
                Admission
              </Button>
            </Link>
            <Link href="/verify-certificate">
              <Button variant="primary" size="sm">
                Verify Certificate
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg
                className={cn('h-6 w-6', isMobileMenuOpen && 'hidden')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={cn('h-6 w-6', !isMobileMenuOpen && 'hidden')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn('md:hidden', isMobileMenuOpen ? 'block' : 'hidden')}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {navigationItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <div>
                  <button
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between',
                      isActiveLink(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    )}
                    onClick={() => handleDropdownToggle(item.label)}
                  >
                    {item.label}
                    <svg
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180'
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {activeDropdown === item.label && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                            isActiveLink(child.href)
                              ? 'text-primary-600 bg-primary-50'
                              : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                          )}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                    isActiveLink(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          
          {/* Mobile CTA Buttons */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-2 px-3">
              <Link href="/admission" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Admission
                </Button>
              </Link>
              <Link href="/verify-certificate" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Verify Certificate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
