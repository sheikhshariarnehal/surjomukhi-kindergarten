'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { safeBodyStyle } from '@/utils/ssr-safe';

interface NavItem {
  labelKey: string;
  href: string;
  children?: NavItem[];
  description?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  expandedItem: string | null;
  setExpandedItem: (value: string | null) => void;
  navigationItems: readonly NavItem[];
  isActive: (href: string) => boolean;
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  t: (key: string, fallback?: string) => string;
}

export default function MobileMenu({
  isOpen,
  expandedItem,
  setExpandedItem,
  navigationItems,
  isActive,
  onClose,
  menuRef,
  t
}: MobileMenuProps) {
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      safeBodyStyle.setOverflow('hidden');
    }
    return () => {
      safeBodyStyle.resetOverflow();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Enhanced Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Enhanced Side Menu Panel */}
      <div 
        className={cn(
          "lg:hidden fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 transition-all duration-300 ease-out",
          "transform translate-x-0"
        )}
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl overflow-hidden mr-3 shadow-md">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="text-base font-bold text-gray-900">
                {t('common.schoolName')}
              </div>
              <div className="text-xs text-gray-600">
                {t('navigation.menu', 'Navigation Menu')}
              </div>
            </div>
          </div>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Enhanced Navigation Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="px-4 py-6 space-y-2">
            {navigationItems.map((item, index) => (
              <MobileNavItem
                key={item.labelKey}
                item={item}
                expandedItem={expandedItem}
                setExpandedItem={setExpandedItem}
                isActive={isActive}
                onClose={onClose}
                t={t}
                index={index}
              />
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
            <Link
              href="/admission"
              className="group flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 overflow-hidden relative min-h-[48px]"
              onClick={onClose}
              role="menuitem"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('navigation.admission', 'Apply for Admission')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            
            {/* Quick Contact */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600 mb-2">Need help?</p>
              <a 
                href="tel:+880-1234-567890" 
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Call us: +880 1234-567890
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Enhanced Mobile Nav Item Component
const MobileNavItem: React.FC<{
  item: NavItem;
  expandedItem: string | null;
  setExpandedItem: (value: string | null) => void;
  isActive: (href: string) => boolean;
  onClose: () => void;
  t: (key: string, fallback?: string) => string;
  index: number;
}> = ({ 
  item, 
  expandedItem, 
  setExpandedItem, 
  isActive, 
  onClose, 
  t,
  index
}) => (
  <div 
    className="border-b border-gray-100 pb-2 last:border-b-0"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {item.children ? (
      <div>
        <button
          onClick={() => setExpandedItem(
            expandedItem === item.labelKey ? null : item.labelKey
          )}
          className={cn(
            "group flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 relative min-h-[48px]",
            "before:absolute before:left-0 before:top-1/2 before:w-1 before:h-0 before:bg-blue-600 before:transition-all before:duration-300 before:transform before:-translate-y-1/2 before:rounded-r",
            "hover:before:h-full focus:before:h-full",
            isActive(item.href)
              ? "bg-blue-50 text-blue-700 before:h-full"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:bg-gray-50"
          )}
          aria-expanded={expandedItem === item.labelKey}
          aria-controls={`mobile-submenu-${item.labelKey}`}
          role="menuitem"
        >
          <span className="transition-transform duration-200 group-hover:translate-x-1 ml-2">
            {t(item.labelKey)}
          </span>
          <svg
            className={cn(
              "w-5 h-5 transition-transform duration-200",
              expandedItem === item.labelKey ? "rotate-180" : "group-hover:scale-110"
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
            expandedItem === item.labelKey
              ? "max-h-96 opacity-100 mt-2"
              : "max-h-0 opacity-0"
          )}
          id={`mobile-submenu-${item.labelKey}`}
          role="menu"
          aria-label={`${t(item.labelKey)} submenu`}
        >
          <div className="ml-6 space-y-1 border-l-2 border-blue-100 pl-4">
            {item.children.map((child, childIndex) => (
              <Link
                key={child.href}
                href={child.href}
                className="group block px-3 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
                onClick={onClose}
                role="menuitem"
                style={{ animationDelay: `${childIndex * 30}ms` }}
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  • {t(child.labelKey, child.labelKey)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <Link
        href={item.href}
        className={cn(
          "group flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 relative min-h-[48px]",
          "before:absolute before:left-0 before:top-1/2 before:w-1 before:h-0 before:bg-blue-600 before:transition-all before:duration-300 before:transform before:-translate-y-1/2 before:rounded-r",
          "hover:before:h-full focus:before:h-full",
          isActive(item.href)
            ? "bg-blue-50 text-blue-700 before:h-full"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:bg-gray-50"
        )}
        onClick={onClose}
        role="menuitem"
      >
        <span className="transition-transform duration-200 group-hover:translate-x-1 ml-2">
          {t(item.labelKey, item.labelKey)}
        </span>
      </Link>
    )}
  </div>
);
