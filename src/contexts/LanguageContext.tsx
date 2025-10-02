'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files
import enTranslations from '@/locales/en.json';
import bnTranslations from '@/locales/bn.json';

// Types
export type Language = 'en' | 'bn';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: any) => any;
  isRTL: boolean;
}

// Translation data
const translations = {
  en: enTranslations,
  bn: bnTranslations,
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguageState(savedLanguage);
    } else {
      // Detect browser language preference
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('bn') || browserLang.includes('bangladesh')) {
        setLanguageState('bn');
      }
    }
  }, []);

  // Set language and persist to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (isClient) {
      localStorage.setItem('preferred-language', lang);
      
      // Update document language and direction
      document.documentElement.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
      document.documentElement.dir = lang === 'bn' ? 'ltr' : 'ltr'; // Bengali is LTR
    }
  };

  // Translation function with nested key support
  const t = (key: string, fallback?: any): any => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Key not found, try English as fallback
          if (language !== 'en') {
            let englishValue: any = translations.en;
            for (const k of keys) {
              if (englishValue && typeof englishValue === 'object' && k in englishValue) {
                englishValue = englishValue[k];
              } else {
                englishValue = null;
                break;
              }
            }
            if (englishValue !== null) {
              return englishValue;
            }
          }
          
          // Return fallback or key if no translation found
          return fallback || key;
        }
      }
      
      return value !== undefined ? value : (fallback || key);
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return fallback || key;
    }
  };

  // Check if current language is RTL (Bengali is LTR, but keeping for future languages)
  const isRTL = false; // Currently no RTL languages supported

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Utility hook for translations only
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}

// Higher-order component for class components
export function withLanguage<P extends object>(
  Component: React.ComponentType<P & { language: Language; t: (key: string, fallback?: any) => any }>
) {
  return function WrappedComponent(props: P) {
    const { language, t } = useLanguage();
    return <Component {...props} language={language} t={t} />;
  };
}

// Language detection utility
export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  // Check localStorage first
  const saved = localStorage.getItem('preferred-language') as Language;
  if (saved && (saved === 'en' || saved === 'bn')) {
    return saved;
  }
  
  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('bn') || browserLang.includes('bangladesh')) {
    return 'bn';
  }
  
  return 'en';
}

// Language metadata for SEO and accessibility
export const languageMetadata = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '',
    dir: 'ltr',
    locale: 'en-US',
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '',
    dir: 'ltr',
    locale: 'bn-BD',
  },
} as const;
