'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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
      { label: 'About Us', href: '/about/about-us' },
      { label: 'Founders', href: '/about/founders' },
      { label: 'History', href: '/about/history' },
      { label: 'Campus Tour', href: '/about/campus-tour' },
      { label: 'Our Principals', href: '/about/principals' },
      { label: 'Administrator', href: '/about/administrator' },
    ]
  },
  {
    label: 'Academic',
    href: '/academic',
    children: [
      { label: 'Class Schedule', href: '/academic/class-schedule' },
      {
        label: 'Classes',
        href: '/academic/classes',
        children: [
          { label: 'Play Group', href: '/academic/classes/play-group' },
          { label: 'Nursery', href: '/academic/classes/nursery' },
          { label: 'One', href: '/academic/classes/one' },
          { label: 'Two', href: '/academic/classes/two' },
          { label: 'Three', href: '/academic/classes/three' },
          { label: 'Four', href: '/academic/classes/four' },
          { label: 'Five', href: '/academic/classes/five' },
        ]
      },
      { label: 'Our Teachers', href: '/academic/teachers' },
      { label: 'Subjects', href: '/academic/subjects' },
      { label: 'Academic Calendar', href: '/academic/calendar' },
      { label: 'Academic Rules', href: '/academic/rules' },
    ]
  },
  {
    label: 'Admission',
    href: '/admission',
    children: [
      { label: 'How to Apply?', href: '/admission/how-to-apply' },
      { label: 'Admission Policy', href: '/admission/policy' },
      { label: 'Apply Online', href: '/admission/apply-online' },
    ]
  },
  {
    label: 'Student',
    href: '/student',
    children: [
      { label: 'Students List', href: '/student/list' },
      { label: 'Syllabus', href: '/student/syllabus' },
      { label: 'Tuition Fees', href: '/student/fees' },
      { label: 'Exam Schedule', href: '/student/exam-schedule' },
      { label: 'Rules & Regulations', href: '/student/rules' },
      { label: 'Verify Certificate', href: '/student/verify-certificate' },
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

export default function ProfessionalNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'bn'>('en');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdowns and mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Language persistence
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'bn';
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'bn' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-2.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            {/* Contact Information */}
            <div className="flex items-center space-x-3 sm:space-x-6 overflow-x-auto">
              <a
                href="tel:+8801234567890"
                className="flex items-center hover:text-blue-200 transition-colors"
                aria-label="Call us"
              >
                <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">+880 1234-567890</span>
                <span className="sm:hidden">Call</span>
              </a>
              <a
                href="mailto:info@school.edu.bd"
                className="hidden sm:flex items-center hover:text-blue-200 transition-colors"
                aria-label="Email us"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@school.edu.bd</span>
              </a>
              <div className="hidden md:flex items-center text-blue-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Office Hours: 8:00 AM - 4:00 PM</span>
              </div>
            </div>

            {/* Language Switcher & Social Links */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center px-3 py-1 rounded-md hover:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label={`Switch to ${currentLanguage === 'en' ? 'Bengali' : 'English'}`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="font-medium">
                  {currentLanguage === 'en' ? 'বাংলা' : 'English'}
                </span>
              </button>

              <div className="flex items-center space-x-3 border-l border-blue-700 pl-4">
                <a
                  href="https://facebook.com/schoolname"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-200 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/schoolname"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-200 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={cn(
        "bg-white shadow-lg sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "shadow-xl bg-white/95 backdrop-blur-sm" : "shadow-lg"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center h-full group">
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 lg:ml-4 hidden sm:block">
                  <div className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {currentLanguage === 'en' ? 'School Name' : 'স্কুলের নাম'}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">
                    {currentLanguage === 'en' ? 'Excellence in Education' : 'শিক্ষায় উৎকর্ষতা'}
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group">
                  <button
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                      isActive(item.href) 
                        ? "bg-primary-100 text-primary-800" 
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    )}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {currentLanguage === 'en' ? item.label : item.label}
                    {item.children && (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Mega Menu Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.children.map((child) => (
                        <div key={child.href} className="relative group/submenu">
                          {child.children ? (
                            // Item with nested children
                            <>
                              <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer">
                                <Link href={child.href} className="flex-1">
                                  {child.label}
                                </Link>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                              {/* Nested submenu */}
                              <div className="absolute left-full top-0 ml-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50">
                                {child.children.map((grandchild) => (
                                  <Link
                                    key={grandchild.href}
                                    href={grandchild.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                  >
                                    {grandchild.label}
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            // Regular menu item
                            <Link
                              href={child.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            >
                              {child.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search & Quick Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className={cn(
                    "relative transition-all duration-300",
                    isSearchOpen ? "w-64" : "w-10"
                  )}>
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={cn(
                        "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
                        isSearchOpen ? "opacity-100" : "opacity-0 w-0 px-0"
                      )}
                    />
                    <button
                      type="button"
                      onClick={toggleSearch}
                      className="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors"
                      aria-label="Search"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              {/* Quick Action Button */}
              <div className="flex items-center border-l border-gray-200 pl-4">
                <Link
                  href="/admission"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {currentLanguage === 'en' ? 'Admission' : 'ভর্তি'}
                </Link>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Search Button */}
              <button
                onClick={toggleSearch}
                className="p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px] min-w-[48px]"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 mobile-menu min-h-[48px] min-w-[48px]"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden border-t border-gray-200 px-4 py-4 bg-gradient-to-r from-blue-50 to-green-50">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder={currentLanguage === 'en' ? 'Search our website...' : 'আমাদের ওয়েবসাইট খুঁজুন...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm text-gray-700 placeholder-gray-500"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg mobile-menu">
              <div className="px-4 py-6 space-y-2 max-h-screen overflow-y-auto">

                {navigationItems.map((item) => (
                  <div key={item.label} className="border-b border-gray-100 pb-2 last:border-b-0">
                    {item.children ? (
                      // Expandable menu item
                      <div>
                        <button
                          onClick={() => setExpandedMobileItem(
                            expandedMobileItem === item.label ? null : item.label
                          )}
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200",
                            isActive(item.href)
                              ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                          )}
                        >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span>{currentLanguage === 'en' ? item.label : item.label}</span>
                          </div>
                          <svg
                            className={cn(
                              "w-5 h-5 transition-transform duration-200",
                              expandedMobileItem === item.label ? "rotate-180" : ""
                            )}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Expandable submenu */}
                        <div className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          expandedMobileItem === item.label
                            ? "max-h-96 opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        )}>
                          <div className="ml-6 space-y-1 border-l-2 border-blue-100 pl-4">
                            {item.children.map((child) => (
                              <div key={child.href}>
                                {child.children ? (
                                  // Nested submenu item
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200">
                                      <Link
                                        href={child.href}
                                        className="flex-1"
                                        onClick={() => {
                                          setIsMobileMenuOpen(false);
                                          setExpandedMobileItem(null);
                                        }}
                                      >
                                        • {child.label}
                                      </Link>
                                      <button
                                        onClick={() => setExpandedMobileItem(
                                          expandedMobileItem === `${item.label}-${child.label}` ? null : `${item.label}-${child.label}`
                                        )}
                                        className="p-1 hover:bg-blue-100 rounded"
                                      >
                                        <svg
                                          className={cn(
                                            "w-4 h-4 transition-transform duration-200",
                                            expandedMobileItem === `${item.label}-${child.label}` ? "rotate-180" : ""
                                          )}
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </button>
                                    </div>
                                    {/* Nested children */}
                                    <div className={cn(
                                      "overflow-hidden transition-all duration-300 ease-in-out",
                                      expandedMobileItem === `${item.label}-${child.label}`
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                    )}>
                                      <div className="ml-4 space-y-1 border-l border-blue-100 pl-3">
                                        {child.children.map((grandchild) => (
                                          <Link
                                            key={grandchild.href}
                                            href={grandchild.href}
                                            className="block px-2 py-1 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                                            onClick={() => {
                                              setIsMobileMenuOpen(false);
                                              setExpandedMobileItem(null);
                                            }}
                                          >
                                            ◦ {grandchild.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  // Regular submenu item
                                  <Link
                                    href={child.href}
                                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setExpandedMobileItem(null);
                                    }}
                                  >
                                    • {child.label}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Simple menu item
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200",
                          isActive(item.href)
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{currentLanguage === 'en' ? item.label : item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Quick Actions */}
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <Link
                      href="/admission"
                      className="flex items-center justify-center w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {currentLanguage === 'en' ? 'Admission' : 'ভর্তি'}
                    </Link>


                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
