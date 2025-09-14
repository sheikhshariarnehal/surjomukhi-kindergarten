'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, languageMetadata, type Language } from '@/contexts/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'toggle' | 'buttons';
  size?: 'sm' | 'md' | 'lg';
  showFlag?: boolean;
  showText?: boolean;
  className?: string;
}

export default function LanguageSwitcher({
  variant = 'dropdown',
  size = 'md',
  showFlag = true,
  showText = true,
  className = '',
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
    
    // Announce language change for screen readers
    const announcement = `Language changed to ${languageMetadata[newLanguage].name}`;
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.className = 'sr-only';
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'lg':
        return 'text-base px-4 py-3';
      default:
        return 'text-sm px-3 py-2';
    }
  };

  const currentLang = languageMetadata[language];
  const availableLanguages = Object.entries(languageMetadata) as [Language, typeof languageMetadata[Language]][];

  // Toggle variant (simple button)
  if (variant === 'toggle') {
    const otherLanguage = language === 'en' ? 'bn' : 'en';
    const otherLangData = languageMetadata[otherLanguage];

    return (
      <button
        onClick={() => handleLanguageChange(otherLanguage)}
        className={`
          flex items-center ${getSizeClasses()} rounded-md 
          hover:bg-blue-800 transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-blue-300
          ${className}
        `}
        aria-label={`Switch to ${otherLangData.name}`}
        title={`Switch to ${otherLangData.name}`}
      >
        <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
        {showFlag && <span className="mr-1" aria-hidden="true">{otherLangData.flag}</span>}
        {showText && (
          <span className="font-medium">
            {otherLangData.nativeName}
          </span>
        )}
      </button>
    );
  }

  // Buttons variant (separate button for each language)
  if (variant === 'buttons') {
    return (
      <div className={`flex items-center space-x-1 ${className}`} role="group" aria-label="Language selection">
        {availableLanguages.map(([langCode, langData]) => (
          <button
            key={langCode}
            onClick={() => handleLanguageChange(langCode)}
            className={`
              flex items-center ${getSizeClasses()} rounded-md transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-300
              ${language === langCode
                ? 'bg-blue-700 text-white shadow-md'
                : 'hover:bg-blue-800 text-blue-100'
              }
            `}
            aria-label={`Switch to ${langData.name}`}
            aria-pressed={language === langCode}
            title={langData.name}
          >
            {showFlag && <span className="mr-1" aria-hidden="true">{langData.flag}</span>}
            {showText && (
              <span className="font-medium text-xs">
                {langData.nativeName}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center ${getSizeClasses()} rounded-md 
          hover:bg-blue-800 transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-blue-300
          ${isOpen ? 'bg-blue-800' : ''}
        `}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Select language"
      >
        <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
        {showFlag && <span className="mr-1" aria-hidden="true">{currentLang.flag}</span>}
        {showText && (
          <span className="font-medium">
            {currentLang.nativeName}
          </span>
        )}
        <ChevronDown 
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50"
            role="listbox"
            aria-label="Language options"
          >
            {availableLanguages.map(([langCode, langData]) => (
              <button
                key={langCode}
                onClick={() => handleLanguageChange(langCode)}
                className={`
                  w-full flex items-center px-4 py-3 text-sm transition-colors duration-150
                  hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700
                  focus:outline-none
                  ${language === langCode ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                `}
                role="option"
                aria-selected={language === langCode}
                title={`Switch to ${langData.name}`}
              >
                <span className="mr-3 text-lg" aria-hidden="true">{langData.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{langData.nativeName}</div>
                  <div className="text-xs text-gray-500">{langData.name}</div>
                </div>
                {language === langCode && (
                  <Check className="w-4 h-4 text-blue-600" aria-hidden="true" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact version for mobile
export function CompactLanguageSwitcher({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="toggle"
      size="sm"
      showFlag={true}
      showText={false}
      className={className}
    />
  );
}

// Full-featured version for desktop
export function FullLanguageSwitcher({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="dropdown"
      size="md"
      showFlag={true}
      showText={true}
      className={className}
    />
  );
}
