'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/contexts/LanguageContext';
import dynamic from 'next/dynamic';

// Lazy load LanguageSwitcher for better initial load performance
const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), {
  ssr: true,
  loading: () => <div className="w-20 h-6 bg-blue-700/50 rounded animate-pulse" />
});

// Types
interface NavItem {
  labelKey: string;
  href: string;
  children?: NavItem[];
  description?: string;
}

interface SocialIconProps {
  platform: string;
}

interface CompactDesktopNavItemProps {
  item: NavItem;
  isActive: (href: string) => boolean;
  activeDropdown: string | null;
  setActiveDropdown: (value: string | null) => void;
  t: (key: string, fallback?: string) => string;
}

interface CompactDropdownItemProps {
  item: NavItem;
  t: (key: string, fallback?: string) => string;
  index: number;
}

interface CompactMobileNavigationProps {
  isMobileMenuOpen: boolean;
  expandedMobileItem: string | null;
  setExpandedMobileItem: (value: string | null) => void;
  navigationItems: readonly NavItem[];
  isActive: (href: string) => boolean;
  closeMobileMenu: () => void;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>;
  t: (key: string, fallback?: string) => string;
}

interface CompactMobileNavItemProps {
  item: NavItem;
  expandedMobileItem: string | null;
  setExpandedMobileItem: (value: string | null) => void;
  isActive: (href: string) => boolean;
  closeMobileMenu: () => void;
  t: (key: string, fallback?: string) => string;
  index: number;
}

interface CompactMobileSubNavItemProps {
  item: NavItem;
  parentKey: string;
  expandedMobileItem: string | null;
  setExpandedMobileItem: (value: string | null) => void;
  closeMobileMenu: () => void;
  t: (key: string, fallback?: string) => string;
  index: number;
}

// Constants
const NAVIGATION_ITEMS: readonly NavItem[] = [
  {
    labelKey: 'navigation.about',
    href: '/about',
    description: 'Learn about our school',
    children: [
      { labelKey: 'navigation.aboutUs', href: '/about/about-us', description: 'Our mission and vision' },
      { labelKey: 'navigation.founders', href: '/about/founders', description: 'Meet our founders' },
      { labelKey: 'navigation.history', href: '/about/history', description: 'Our rich history' },
      { labelKey: 'navigation.campusTour', href: '/about/campus-tour', description: 'Virtual campus tour' },
      { labelKey: 'navigation.principals', href: '/about/principals', description: 'Leadership team' },
      { labelKey: 'navigation.administrator', href: '/about/administrator', description: 'Administrative staff' },
    ]
  },
  {
    labelKey: 'navigation.academic',
    href: '/academic',
    description: 'Academic programs and curriculum',
    children: [
      { labelKey: 'navigation.classSchedule', href: '/academic/class-schedule', description: 'Daily class schedules' },
      {
        labelKey: 'navigation.classes',
        href: '/academic/classes',
        description: 'Class information',
        children: [
          { labelKey: 'Play Group', href: '/academic/classes/play-group' },
          { labelKey: 'Nursery', href: '/academic/classes/nursery' },
          { labelKey: 'One', href: '/academic/classes/one' },
          { labelKey: 'Two', href: '/academic/classes/two' },
          { labelKey: 'Three', href: '/academic/classes/three' },
          { labelKey: 'Four', href: '/academic/classes/four' },
          { labelKey: 'Five', href: '/academic/classes/five' },
        ]
      },
      { labelKey: 'navigation.teachers', href: '/academic/teachers', description: 'Our faculty' },
      { labelKey: 'navigation.subjects', href: '/academic/subjects', description: 'Curriculum subjects' },
      { labelKey: 'navigation.academicCalendar', href: '/academic/calendar', description: 'Academic year calendar' },
      { labelKey: 'navigation.academicRules', href: '/academic/rules', description: 'Academic policies' },
    ]
  },
  {
    labelKey: 'navigation.admission',
    href: '/admission',
    description: 'Admission process and requirements',
    children: [
      { labelKey: 'How to Apply?', href: '/admission/how-to-apply', description: 'Step-by-step application guide' },
      { labelKey: 'Admission Policy', href: '/admission/policy', description: 'Admission criteria and policies' },
      { labelKey: 'Apply Online', href: '/admission/apply-online', description: 'Online application form' },
    ]
  },
  {
    labelKey: 'navigation.student',
    href: '/student',
    description: 'Student resources and information',
    children: [
      { labelKey: 'navigation.studentsList', href: '/student/list', description: 'Student directory' },
      { labelKey: 'navigation.syllabus', href: '/student/syllabus', description: 'Course syllabus' },
      { labelKey: 'navigation.fees', href: '/student/fees', description: 'Fee structure' },
      { labelKey: 'navigation.examSchedule', href: '/student/exam-schedule', description: 'Examination timetable' },
      { labelKey: 'navigation.rules', href: '/student/rules', description: 'Student guidelines' },
      { labelKey: 'navigation.verifyCertificate', href: '/student/verify-certificate', description: 'Certificate verification' },
    ]
  },
  {
    labelKey: 'navigation.others',
    href: '/others',
    description: 'News, events, and resources',
    children: [
      { labelKey: 'navigation.notices', href: '/notices', description: 'Important announcements' },
      { labelKey: 'navigation.newsEvents', href: '/news', description: 'Latest news and events' },
      { labelKey: 'navigation.gallery', href: '/gallery', description: 'Photo gallery' },
      { labelKey: 'navigation.downloads', href: '/downloads', description: 'Downloadable resources' },
      { labelKey: 'navigation.teachers', href: '/teachers', description: 'Faculty profiles' },
    ]
  },
  { 
    labelKey: 'navigation.contact', 
    href: '/contact',
    description: 'Get in touch with us'
  },
] as const;

const CONTACT_INFO = {
  phone: '+880 1234-567890',
  email: 'info@school.edu.bd',
  officeHours: 'Office Hours: 8:00 AM - 4:00 PM',
  socialLinks: {
    facebook: 'https://facebook.com/schoolname',
    twitter: 'https://twitter.com/schoolname',
    instagram: 'https://instagram.com/schoolname',
    linkedin: 'https://linkedin.com/company/schoolname',
    youtube: 'https://youtube.com/@schoolname'
  }
} as const;

// Custom Hooks - Optimized with proper memoization
const useScrolled = (threshold: number = 10): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > threshold;
          setIsScrolled(prev => prev !== scrolled ? scrolled : prev);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};

const useClickOutside = (ref: React.RefObject<HTMLElement | null>, callback: () => void): void => {
  // Memoize callback to prevent unnecessary effect re-runs
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current();
      }
    };

    document.addEventListener('mousedown', handleClickOutside, { passive: true } as AddEventListenerOptions);
    document.addEventListener('touchstart', handleClickOutside, { passive: true } as AddEventListenerOptions);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref]);
};

const useKeyboardNavigation = (callbacks: Record<string, () => void>): void => {
  // Memoize callbacks to prevent unnecessary effect re-runs
  const callbacksRef = useRef(callbacks);

  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const callback = callbacksRef.current[event.key];
      if (callback) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};

// Loading Skeleton Component
const NavbarSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-blue-900 py-1">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="h-4 w-32 bg-blue-700 rounded"></div>
          <div className="h-4 w-40 bg-blue-700 rounded"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-6 w-20 bg-blue-700 rounded"></div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 w-6 bg-blue-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
            <div className="h-3 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="hidden lg:flex space-x-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

// Main Component
function ProfessionalNavbar() {
  // Hooks
  const pathname = usePathname();
  const { t } = useTranslation();
  const isScrolled = useScrolled(10);

  // State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  // Refs
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Memoized values - Optimized to prevent unnecessary re-renders
  const isActive = useCallback((href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  // Event handlers
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  }, [searchQuery]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobileItem(null);
  }, []);

  const closeAllMenus = useCallback(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setExpandedMobileItem(null);
  }, []);

  // Custom hooks
  useClickOutside(dropdownRef, () => setActiveDropdown(null));
  useClickOutside(mobileMenuRef, closeMobileMenu);
  
  useKeyboardNavigation({
    'Escape': closeAllMenus
  });

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // SEO structured data - Server-safe (no window references to prevent hydration mismatch)
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": t('common.schoolName', 'Surjamukhi Kindergarten'),
    "description": t('common.tagline', 'Excellence in Early Childhood Education'),
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "sameAs": Object.values(CONTACT_INFO.socialLinks),
    "logo": "/logo.webp",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD"
    }
  }), [t]);

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Blue Top Utility Bar - Semantic header element */}
      <header
        className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-white py-0.5 sm:py-0.5 lg:py-0.5 relative overflow-hidden border-b border-blue-700/50"
        role="banner"
        aria-label="Top utility bar with contact information"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/10 via-transparent to-blue-700/10 opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          <div className="flex justify-between items-center min-h-[26px] sm:min-h-[24px] lg:min-h-[24px]">
            {/* Contact Information - Compact design across all devices */}
            <div className="flex items-center space-x-1.5 xs:space-x-2 lg:space-x-3 flex-1 min-w-0">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="group flex items-center text-blue-100 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-300/30 rounded px-1 xs:px-1.5 lg:px-2 py-0.5 touch-manipulation"
                aria-label={`Call us at ${CONTACT_INFO.phone}`}
              >
                <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 lg:w-3 lg:h-3 mr-0.5 xs:mr-1 lg:mr-1.5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium text-[9px] xs:text-[10px] sm:text-[10px] lg:text-[11px] whitespace-nowrap tracking-tight">{CONTACT_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group hidden sm:flex items-center text-blue-100 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-300/30 rounded px-1.5 lg:px-2 py-0.5 touch-manipulation"
                aria-label={`Email us at ${CONTACT_INFO.email}`}
              >
                <svg className="w-3 h-3 lg:w-3 lg:h-3 mr-1 lg:mr-1.5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium truncate text-[10px] lg:text-[11px] max-w-[100px] md:max-w-none tracking-tight">{CONTACT_INFO.email}</span>
              </a>

              <div className="hidden lg:flex items-center text-blue-200/90 hover:text-blue-100 transition-colors duration-200" role="status" aria-label={CONTACT_INFO.officeHours}>
                <svg className="w-3 h-3 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[11px] whitespace-nowrap tracking-tight font-medium">{CONTACT_INFO.officeHours}</span>
              </div>
            </div>

            {/* Language Switcher & Social Links - Compact professional design */}
            <div className="flex items-center space-x-1.5 xs:space-x-2 lg:space-x-3 flex-shrink-0">
              <Suspense fallback={<div className="w-16 xs:w-20 h-6 bg-blue-700/30 rounded" />}>
                <LanguageSwitcher variant="toggle" size="sm" className="text-white" />
              </Suspense>

              <div className="flex items-center space-x-0.5 xs:space-x-1 lg:space-x-1.5 border-l border-blue-600/40 pl-1 xs:pl-1.5 sm:pl-2 lg:pl-3" role="navigation" aria-label="Social media links">
                {Object.entries(CONTACT_INFO.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-0.5 xs:p-1 lg:p-1.5 rounded-md hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300/50 flex items-center justify-center text-blue-200/90 hover:bg-blue-700/50 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                    aria-label={`Follow us on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                  >
                    <SocialIcon platform={platform} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Compact Main Navigation */}
      <nav
        className={cn(
          "bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 border-b border-gray-100",
          isScrolled ? "shadow-md bg-white/96 backdrop-blur-sm" : "shadow-sm"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-14 lg:h-16">
            {/* Compact Logo */}
            <div className="flex-shrink-0 min-w-0 flex-1 sm:flex-initial">
              <Link
                href="/"
                className="group flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500/30 rounded-lg p-0.5 xs:p-1 transition-all duration-200 min-w-0"
                aria-label="Surjamukhi Kindergarten - Homepage"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 lg:w-10 lg:h-10 rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 bg-white border border-gray-100">
                    <Image
                      src="/logo.webp"
                      alt="Surjamukhi Kindergarten Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain p-0.5"
                      priority
                    />
                  </div>
                </div>
                <div className="ml-1.5 xs:ml-2.5 min-w-0 flex-1 sm:flex-initial">
                  <div className="text-xs xs:text-sm sm:text-lg lg:text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 leading-tight truncate">
                    {t('common.schoolName')}
                  </div>
                  <div className="text-[10px] xs:text-xs text-gray-600 font-medium leading-tight hidden xs:block truncate">
                    {t('common.tagline')}
                  </div>
                </div>
              </Link>
            </div>

            {/* Compact Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-0.5" ref={dropdownRef}>
              {NAVIGATION_ITEMS.map((item) => (
                <CompactDesktopNavItem
                  key={item.labelKey}
                  item={item}
                  isActive={isActive}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  t={t}
                />
              ))}
            </div>

            {/* Compact Actions */}
            <div className="flex items-center space-x-1 xs:space-x-2 flex-shrink-0">
              {/* Compact Search - Optimized for touch */}
              <div className="relative">
                <form onSubmit={handleSearch} role="search">
                  {isSearchOpen ? (
                    <div className="fixed inset-0 bg-black/40 z-40 lg:relative lg:inset-auto lg:bg-transparent lg:z-auto backdrop-blur-sm">
                      <div className="flex items-center justify-center min-h-screen lg:min-h-0 p-3 xs:p-4 lg:p-0">
                        <div className="bg-white rounded-xl shadow-xl p-3 xs:p-4 w-full max-w-md lg:bg-white lg:shadow-lg lg:border lg:border-gray-200 lg:p-0 lg:max-w-none lg:w-64 lg:rounded-lg animate-in zoom-in-95 duration-200">
                          <div className="relative">
                            <input
                              ref={searchRef}
                              type="search"
                              placeholder={t('common.searchPlaceholder', 'Search...')}
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-9 xs:pl-10 pr-10 py-3 lg:py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-700 placeholder-gray-500 text-sm xs:text-base lg:text-sm touch-manipulation"
                              aria-label="Search the website"
                              autoFocus
                              inputMode="search"
                              enterKeyHint="search"
                            />
                            <div className="absolute left-2 xs:left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <svg className="w-4 h-4 xs:w-5 xs:h-5 lg:w-4 lg:h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsSearchOpen(false)}
                              className="absolute right-1 xs:right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 active:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 rounded-lg p-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                              aria-label="Close search"
                            >
                              <svg className="w-4 h-4 xs:w-5 xs:h-5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(true)}
                      className="group p-2 xs:p-2.5 lg:p-2 rounded-lg text-gray-500 hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 touch-manipulation min-w-[40px] min-h-[40px] xs:min-w-[44px] xs:min-h-[44px] flex items-center justify-center"
                      aria-label="Open search"
                    >
                      <svg className="w-4 h-4 xs:w-5 xs:h-5 lg:w-4 lg:h-4 transition-transform duration-200 group-hover:scale-105 group-active:scale-95" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  )}
                </form>
              </div>

              {/* Compact CTA - Optimized for touch */}
              <div className="hidden lg:block">
                <Link
                  href="/admission"
                  className="group relative inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 shadow-md hover:shadow-lg active:shadow-sm text-sm overflow-hidden touch-manipulation min-h-[44px]"
                  aria-label="Apply for admission"
                >
                  <span className="relative z-10 transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                    {t('navigation.admission')}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </div>

              {/* Mobile Menu Button - Optimized for touch with 44x44px minimum */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden group p-2 xs:p-2.5 rounded-lg text-gray-700 hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 touch-manipulation min-w-[40px] min-h-[40px] xs:min-w-[44px] xs:min-h-[44px] flex items-center justify-center"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-controls="mobile-menu"
              >
                <svg className="w-5 h-5 xs:w-6 xs:h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <CompactMobileNavigation
            isMobileMenuOpen={isMobileMenuOpen}
            expandedMobileItem={expandedMobileItem}
            setExpandedMobileItem={setExpandedMobileItem}
            navigationItems={NAVIGATION_ITEMS}
            isActive={isActive}
            closeMobileMenu={closeMobileMenu}
            mobileMenuRef={mobileMenuRef}
            t={t}
          />
        </div>
      </nav>
    </>
  );
}

// Compact Component Subcomponents - Optimized with proper memoization
const SocialIcon: React.FC<SocialIconProps> = React.memo(({ platform }) => {
  // Memoize icon paths to prevent recreation on every render
  const iconPaths = useMemo(() => ({
    facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    twitter: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    instagram: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  }), []);

  const path = iconPaths[platform as keyof typeof iconPaths];

  if (!path) {
    console.warn(`Unknown social platform: ${platform}`);
    return null;
  }

  return (
    <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 lg:w-3.5 lg:h-3.5 transition-all duration-300 group-hover:scale-110 group-hover:brightness-125" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
});

const CompactDesktopNavItem: React.FC<CompactDesktopNavItemProps> = React.memo(({ item, isActive, activeDropdown, setActiveDropdown, t }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (item.children) {
      setActiveDropdown(item.labelKey);
    }
  }, [item.children, item.labelKey, setActiveDropdown]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      timeoutRef.current = null;
    }, 150);
  }, [setActiveDropdown]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const linkClasses = useMemo(() => cn(
    "group relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md flex items-center touch-manipulation",
    "before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-600 before:to-indigo-600 before:transition-all before:duration-300 before:transform before:-translate-x-1/2",
    "hover:before:w-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-1",
    isActive(item.href)
      ? "text-blue-600 bg-blue-50/70 before:w-full"
      : "text-gray-700 hover:text-blue-600 active:text-blue-700 hover:bg-gray-50/70 active:bg-gray-100/70"
  ), [isActive, item.href]);

  return (
    <div className="relative">
      <Link
        href={item.href}
        className={linkClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-expanded={item.children ? activeDropdown === item.labelKey : undefined}
        aria-haspopup={item.children ? "menu" : undefined}
      >
        <span className="transition-transform duration-200 group-hover:-translate-y-px">
          {t(item.labelKey)}
        </span>
        {item.children && (
          <svg 
            className={cn(
              "w-3 h-3 ml-1 transition-all duration-200",
              activeDropdown === item.labelKey ? "rotate-180 text-blue-600" : "group-hover:text-blue-600"
            )} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>
      
      {item.children && activeDropdown === item.labelKey && (
        <div
          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="menu"
          aria-label={`${t(item.labelKey)} submenu`}
        >
          {item.children.map((child, index) => (
            <CompactDropdownItem key={child.href} item={child} t={t} index={index} />
          ))}
        </div>
      )}
    </div>
  );
});

const CompactDropdownItem: React.FC<CompactDropdownItemProps> = React.memo(({ item, t, index }) => {
  const linkClasses = useMemo(() => cn(
    "block px-3 py-2.5 text-sm transition-all duration-200 hover:bg-blue-50/70 active:bg-blue-100/70 hover:translate-x-0.5 rounded-md"
  ), []);

  return (
    <div className="relative group/submenu">
      {item.children ? (
        <>
          <div className="flex items-center justify-between px-3 py-2.5 text-sm hover:bg-blue-50/70 active:bg-blue-100/70 transition-all duration-200 cursor-pointer rounded-md touch-manipulation min-h-[44px]">
            <Link
              href={item.href}
              className="flex-1 font-medium text-gray-700 hover:text-blue-600 active:text-blue-700"
              role="menuitem"
              aria-label={t(item.labelKey, item.labelKey)}
            >
              {t(item.labelKey, item.labelKey)}
            </Link>
            <svg className="w-4 h-4 ml-2 text-gray-400 transition-all duration-200 group-hover/submenu:text-blue-600 group-hover/submenu:translate-x-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="absolute left-full top-0 ml-1 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50">
            {item.children.map((grandchild) => (
              <Link
                key={grandchild.href}
                href={grandchild.href}
                className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50/70 active:bg-blue-100/70 hover:text-blue-600 active:text-blue-700 transition-all duration-200 hover:translate-x-0.5 rounded-md touch-manipulation min-h-[44px] flex items-center"
                role="menuitem"
                aria-label={t(grandchild.labelKey, grandchild.labelKey)}
              >
                {t(grandchild.labelKey, grandchild.labelKey)}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Link
          href={item.href}
          className={linkClasses}
          role="menuitem"
          style={{ animationDelay: `${index * 20}ms` }}
          aria-label={item.description || t(item.labelKey, item.labelKey)}
        >
          <div className="font-medium text-gray-700 hover:text-blue-600 active:text-blue-700">{t(item.labelKey, item.labelKey)}</div>
          {item.description && (
            <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</div>
          )}
        </Link>
      )}
    </div>
  );
});

const CompactMobileNavigation: React.FC<CompactMobileNavigationProps> = React.memo(({
  isMobileMenuOpen, 
  expandedMobileItem, 
  setExpandedMobileItem, 
  navigationItems, 
  isActive, 
  closeMobileMenu, 
  mobileMenuRef, 
  t 
}) => {
  if (!isMobileMenuOpen) return null;

  return (
    <div 
      className="lg:hidden border-t border-gray-100 bg-white shadow-lg animate-in slide-in-from-top-2 duration-200"
      ref={mobileMenuRef}
      id="mobile-menu"
      role="menu"
      aria-label="Mobile navigation menu"
    >
      <div className="px-2 xs:px-3 py-3 xs:py-4 space-y-1 max-h-[calc(100vh-140px)] xs:max-h-[calc(100vh-160px)] sm:max-h-[calc(100vh-180px)] overflow-y-auto overscroll-contain">
        {navigationItems.map((item, index) => (
          <CompactMobileNavItem
            key={item.labelKey}
            item={item}
            expandedMobileItem={expandedMobileItem}
            setExpandedMobileItem={setExpandedMobileItem}
            isActive={isActive}
            closeMobileMenu={closeMobileMenu}
            t={t}
            index={index}
          />
        ))}

        <div className="pt-3 xs:pt-4 mt-3 xs:mt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1">
          <Link
            href="/admission"
            className="group flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 xs:px-5 py-3 xs:py-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 overflow-hidden relative text-sm xs:text-base touch-manipulation min-h-[48px] xs:min-h-[52px]"
            onClick={closeMobileMenu}
            role="menuitem"
            aria-label="Apply for admission"
          >
            <span className="relative z-10 transition-transform duration-200 group-hover:scale-105 group-active:scale-95">{t('navigation.admission')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
});

const CompactMobileNavItem: React.FC<CompactMobileNavItemProps> = React.memo(({
  item,
  expandedMobileItem,
  setExpandedMobileItem,
  isActive,
  closeMobileMenu,
  t,
  index
}) => {
  const handleToggle = useCallback(() => {
    setExpandedMobileItem(expandedMobileItem === item.labelKey ? null : item.labelKey);
  }, [expandedMobileItem, item.labelKey, setExpandedMobileItem]);

  const buttonClasses = useMemo(() => cn(
    "group flex items-center justify-between w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-medium transition-all duration-200 relative touch-manipulation",
    "before:absolute before:left-0 before:top-1/2 before:w-1 before:h-0 before:bg-blue-600 before:transition-all before:duration-300 before:transform before:-translate-y-1/2 before:rounded-r",
    "hover:before:h-full active:bg-gray-100",
    "min-h-[44px] xs:min-h-[48px]", // Ensure minimum touch target size
    isActive(item.href)
      ? "bg-blue-50 text-blue-700 before:h-full"
      : "text-gray-700 hover:text-blue-600 active:text-blue-700 hover:bg-gray-50"
  ), [isActive, item.href]);

  return (
    <div
      className="border-b border-gray-50 pb-1 last:border-b-0"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {item.children ? (
        <div>
          <button
            onClick={handleToggle}
            className={buttonClasses}
            aria-expanded={expandedMobileItem === item.labelKey}
            aria-controls={`mobile-submenu-${item.labelKey}`}
            role="menuitem"
          >
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 ml-1">{t(item.labelKey)}</span>
            <svg
              className={cn(
                "w-5 h-5 transition-transform duration-200 flex-shrink-0",
                expandedMobileItem === item.labelKey ? "rotate-180" : "group-hover:scale-105 group-active:scale-95"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

        <div 
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            expandedMobileItem === item.labelKey
              ? "max-h-80 opacity-100 mt-1"
              : "max-h-0 opacity-0"
          )}
          id={`mobile-submenu-${item.labelKey}`}
          role="menu"
          aria-label={`${t(item.labelKey)} submenu`}
        >
          <div className="ml-3 xs:ml-4 space-y-1 border-l border-blue-100 pl-2 xs:pl-3">
            {item.children.map((child, childIndex) => (
              <CompactMobileSubNavItem
                key={child.href}
                item={child}
                parentKey={item.labelKey}
                expandedMobileItem={expandedMobileItem}
                setExpandedMobileItem={setExpandedMobileItem}
                closeMobileMenu={closeMobileMenu}
                t={t}
                index={childIndex}
              />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <Link
        href={item.href}
        className={cn(
          "group flex items-center px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-medium transition-all duration-200 relative touch-manipulation",
          "before:absolute before:left-0 before:top-1/2 before:w-1 before:h-0 before:bg-blue-600 before:transition-all before:duration-300 before:transform before:-translate-y-1/2 before:rounded-r",
          "hover:before:h-full active:bg-gray-100",
          "min-h-[44px] xs:min-h-[48px]", // Ensure minimum touch target size
          isActive(item.href)
            ? "bg-blue-50 text-blue-700 before:h-full"
            : "text-gray-700 hover:text-blue-600 active:text-blue-700 hover:bg-gray-50"
        )}
        onClick={closeMobileMenu}
        role="menuitem"
      >
        <span className="transition-transform duration-200 group-hover:translate-x-0.5 ml-1">{t(item.labelKey, item.labelKey)}</span>
      </Link>
    )}
  </div>
  );
});

const CompactMobileSubNavItem: React.FC<CompactMobileSubNavItemProps> = React.memo(({
  item,
  parentKey,
  expandedMobileItem,
  setExpandedMobileItem,
  closeMobileMenu,
  t,
  index
}) => {
  const subMenuKey = useMemo(() => `${parentKey}-${item.labelKey}`, [parentKey, item.labelKey]);

  const handleToggle = useCallback(() => {
    setExpandedMobileItem(expandedMobileItem === subMenuKey ? null : subMenuKey);
  }, [expandedMobileItem, subMenuKey, setExpandedMobileItem]);

  if (item.children) {
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between px-2 xs:px-3 py-2 text-xs xs:text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-all duration-200 touch-manipulation min-h-[40px] xs:min-h-[44px]">
          <Link
            href={item.href}
            className="flex-1 group min-w-0"
            onClick={closeMobileMenu}
            role="menuitem"
          >
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 truncate block">• {t(item.labelKey, item.labelKey)}</span>
          </Link>
          <button
            onClick={handleToggle}
            className="p-1.5 xs:p-2 hover:bg-blue-100 active:bg-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 touch-manipulation min-w-[40px] min-h-[40px] xs:min-w-[44px] xs:min-h-[44px] flex items-center justify-center flex-shrink-0"
            aria-expanded={expandedMobileItem === subMenuKey}
            aria-label={`Toggle ${t(item.labelKey)} submenu`}
          >
            <svg
              className={cn(
                "w-3.5 h-3.5 xs:w-4 xs:h-4 transition-transform duration-200",
                expandedMobileItem === subMenuKey ? "rotate-180" : ""
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expandedMobileItem === subMenuKey
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0"
        )}>
          <div className="ml-3 xs:ml-4 space-y-1 border-l-2 border-blue-100 pl-2 xs:pl-3">
            {item.children.map((grandchild, grandchildIndex) => (
              <Link
                key={grandchild.href}
                href={grandchild.href}
                className="group block px-2 xs:px-3 py-2 text-xs xs:text-sm text-gray-600 hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-all duration-200 touch-manipulation min-h-[40px] xs:min-h-[44px] flex items-center"
                onClick={closeMobileMenu}
                role="menuitem"
                style={{ animationDelay: `${grandchildIndex * 20}ms` }}
              >
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 truncate">◦ {t(grandchild.labelKey, grandchild.labelKey)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className="group block px-2 xs:px-3 py-2 text-xs xs:text-sm text-gray-600 hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-all duration-200 touch-manipulation min-h-[40px] xs:min-h-[44px] flex items-center"
      onClick={closeMobileMenu}
      role="menuitem"
      style={{ animationDelay: `${index * 20}ms` }}
    >
      <span className="transition-transform duration-200 group-hover:translate-x-0.5 truncate">• {t(item.labelKey, item.labelKey)}</span>
    </Link>
  );
});

// Set display names for better debugging and React DevTools
SocialIcon.displayName = 'SocialIcon';
CompactDesktopNavItem.displayName = 'CompactDesktopNavItem';
CompactDropdownItem.displayName = 'CompactDropdownItem';
CompactMobileNavigation.displayName = 'CompactMobileNavigation';
CompactMobileNavItem.displayName = 'CompactMobileNavItem';
CompactMobileSubNavItem.displayName = 'CompactMobileSubNavItem';
NavbarSkeleton.displayName = 'NavbarSkeleton';
ProfessionalNavbar.displayName = 'ProfessionalNavbar';

// Export the component as default
export default ProfessionalNavbar;

// Export the skeleton for use in loading states
export { NavbarSkeleton };