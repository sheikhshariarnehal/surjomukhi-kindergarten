// Footer component types for better type safety and maintainability

import { ReactNode } from 'react';

/**
 * Navigation item interface for footer links
 */
export interface FooterNavItem {
  /** Translation key for the label */
  labelKey: string;
  /** URL path for the link */
  href: string;
  /** Optional description for accessibility */
  description?: string;
  /** Whether the link opens in a new tab */
  external?: boolean;
}

/**
 * Social media link interface
 */
export interface SocialLink {
  /** Platform name (e.g., 'Facebook', 'Instagram') */
  name: string;
  /** URL to the social media profile */
  href: string;
  /** SVG icon component */
  icon: ReactNode;
  /** Optional custom aria-label */
  ariaLabel?: string;
}

/**
 * Contact information item interface
 */
export interface ContactInfo {
  /** SVG icon component */
  icon: ReactNode;
  /** Display text for the contact information */
  text: string;
  /** Optional clickable link (mailto:, tel:, etc.) */
  href?: string | null;
  /** Type of contact information for structured data */
  type?: 'address' | 'email' | 'phone' | 'hours' | 'other';
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
}

/**
 * Footer navigation sections
 */
export interface FooterNavigation {
  /** Main navigation links */
  main: FooterNavItem[];
  /** Resource links */
  resources: FooterNavItem[];
  /** Support and service links */
  support: FooterNavItem[];
  /** Legal and policy links */
  legal: FooterNavItem[];
}

/**
 * Footer component props
 */
export interface FooterProps {
  /** Optional custom class name */
  className?: string;
  /** Whether to show the newsletter signup */
  showNewsletter?: boolean;
  /** Whether to show the back-to-top button */
  showBackToTop?: boolean;
  /** Custom navigation items (overrides default) */
  customNavigation?: Partial<FooterNavigation>;
  /** Custom social links (overrides default) */
  customSocialLinks?: SocialLink[];
  /** Custom contact information (overrides default) */
  customContactInfo?: ContactInfo[];
}

/**
 * Newsletter signup form data
 */
export interface NewsletterFormData {
  email: string;
  name?: string;
  preferences?: string[];
}

/**
 * Newsletter signup component props
 */
export interface NewsletterSignupProps {
  /** Callback when form is submitted */
  onSubmit: (data: NewsletterFormData) => Promise<void>;
  /** Whether the form is currently submitting */
  isLoading?: boolean;
  /** Success message to display */
  successMessage?: string;
  /** Error message to display */
  errorMessage?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Back to top button props
 */
export interface BackToTopProps {
  /** Scroll threshold to show the button */
  threshold?: number;
  /** Custom class name */
  className?: string;
  /** Whether to show scroll progress */
  showProgress?: boolean;
}

/**
 * Footer section props for better organization
 */
export interface FooterSectionProps {
  /** Section title translation key */
  titleKey: string;
  /** Section items */
  items: FooterNavItem[];
  /** Custom class name */
  className?: string;
  /** Whether this is a navigation section (for semantic HTML) */
  isNavigation?: boolean;
}

/**
 * Structured data for organization schema
 */
export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: Array<{
    '@type': string;
    telephone: string;
    contactType: string;
    email?: string;
    availableLanguage: string[];
  }>;
  sameAs: string[];
  foundingDate?: string;
  numberOfEmployees?: string;
  areaServed?: string;
}
