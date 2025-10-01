/**
 * Quick Links Configuration
 * 
 * @fileoverview Centralized configuration for educational quick links, government portals,
 * and school resources. Optimized for performance, SEO, and maintainability.
 * 
 * @version 2.0.0
 * @author Surjomukhi Kindergarten Development Team
 * @since 2024
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Supported categories for quick links organization
 */
export type CategoryType = 'government' | 'education' | 'resources';

/**
 * Available icon types for quick links
 */
export type IconType = 
  | 'government' 
  | 'education' 
  | 'curriculum' 
  | 'results' 
  | 'digital' 
  | 'library' 
  | 'student' 
  | 'parent';

/**
 * Quick link item configuration
 * 
 * @interface QuickLink
 */
export interface QuickLink {
  /** Unique identifier for the quick link */
  readonly id: string;
  
  /** Display title for the link */
  readonly title: string;
  
  /** SEO-optimized description */
  readonly description: string;
  
  /** Target URL (internal or external) */
  readonly url: string;
  
  /** Icon type for visual representation */
  readonly icon: IconType;
  
  /** Category for grouping and styling */
  readonly category: CategoryType;
  
  /** Whether the link opens externally */
  readonly external?: boolean;
  
  /** High priority for SEO and performance optimization */
  readonly priority?: boolean;
  
  /** SEO keywords for search optimization */
  readonly keywords?: readonly string[];
  
  /** Accessibility label for screen readers */
  readonly ariaLabel?: string;
}

/**
 * Color scheme configuration for category-based styling
 * 
 * @interface ColorScheme
 */
export interface ColorScheme {
  /** Primary text color */
  readonly primary: string;
  
  /** Hover background color */
  readonly hover: string;
  
  /** Border color */
  readonly border: string;
  
  /** Text color for content */
  readonly text: string;
  
  /** Background color */
  readonly background: string;
  
  /** Accent color for highlights */
  readonly accent: string;
}

/**
 * Animation configuration for smooth transitions
 * 
 * @interface AnimationVariant
 */
export interface AnimationVariant {
  readonly hidden?: Record<string, any>;
  readonly visible?: Record<string, any>;
  readonly hover?: Record<string, any>;
  readonly transition?: Record<string, any>;
}

/**
 * Category metadata for enhanced SEO and accessibility
 * 
 * @interface CategoryMetadata
 */
export interface CategoryMetadata {
  /** Display title for the category */
  readonly title: string;
  
  /** SEO description for the category */
  readonly description: string;
  
  /** Keywords for search optimization */
  readonly keywords: readonly string[];
  
  /** Icon for category representation */
  readonly icon?: string;
}

// ============================================================================
// QUICK LINKS DATA
// ============================================================================
/**
 * Comprehensive quick links data for educational resources and government portals
 * 
 * Organized by priority and category for optimal user experience and SEO
 */
export const QUICK_LINKS_DATA: readonly QuickLink[] = [
  // ========================================================================
  // GOVERNMENT PORTALS - High Priority
  // ========================================================================
  {
    id: 'ministry-education-bd',
    title: 'Ministry of Education',
    description: 'Official Ministry of Education Bangladesh - Educational policies, circulars, and government initiatives for quality education development',
    url: 'https://moedu.gov.bd',
    icon: 'government',
    category: 'government',
    external: true,
    priority: true,
    keywords: ['ministry', 'education', 'bangladesh', 'government', 'policy', 'circular', 'initiative'],
    ariaLabel: 'Visit Ministry of Education Bangladesh official website'
  },
  {
    id: 'directorate-secondary-education',
    title: 'Directorate of Secondary Education',
    description: 'Secondary and Higher Secondary Education Board Bangladesh - Academic curriculum, examination guidelines, and educational standards',
    url: 'https://dshe.gov.bd',
    icon: 'education',
    category: 'government',
    external: true,
    priority: true,
    keywords: ['secondary', 'education', 'board', 'examination', 'curriculum', 'academic', 'standards'],
    ariaLabel: 'Access Directorate of Secondary Education Bangladesh'
  },
  {
    id: 'digital-bangladesh-initiative',
    title: 'Digital Bangladesh',
    description: 'Government digital education initiative - E-learning resources, digital transformation, and technology integration in education',
    url: 'https://digitalbangladesh.gov.bd',
    icon: 'digital',
    category: 'government',
    external: true,
    keywords: ['digital', 'bangladesh', 'e-learning', 'technology', 'education', 'transformation', 'innovation'],
    ariaLabel: 'Explore Digital Bangladesh education initiatives'
  },

  // ========================================================================
  // EDUCATIONAL RESOURCES - Academic Excellence
  // ========================================================================
  {
    id: 'national-curriculum-board',
    title: 'National Curriculum Board',
    description: 'National Curriculum and Textbook Board (NCTB) - Official curriculum development, textbook resources, and educational content standards',
    url: 'https://nctb.gov.bd',
    icon: 'curriculum',
    category: 'education',
    external: true,
    priority: true,
    keywords: ['curriculum', 'textbook', 'nctb', 'syllabus', 'education', 'development', 'content'],
    ariaLabel: 'Access National Curriculum and Textbook Board resources'
  },
  {
    id: 'education-board-results',
    title: 'Education Board Results',
    description: 'Official examination results portal - Check SSC, HSC, and other board examination results with secure access and verification',
    url: 'https://eboardresults.com',
    icon: 'results',
    category: 'education',
    external: true,
    keywords: ['results', 'ssc', 'hsc', 'examination', 'board', 'marks', 'grades', 'verification'],
    ariaLabel: 'Check education board examination results'
  },

  // ========================================================================
  // SCHOOL RESOURCES - Student & Parent Services
  // ========================================================================
  {
    id: 'school-digital-library',
    title: 'Digital Library',
    description: 'Comprehensive digital library access - Educational e-books, research materials, academic resources, and interactive learning content',
    url: '/resources/library',
    icon: 'library',
    category: 'resources',
    external: false,
    priority: true,
    keywords: ['library', 'books', 'resources', 'digital', 'research', 'e-books', 'materials', 'learning'],
    ariaLabel: 'Access school digital library resources'
  },
  {
    id: 'student-information-portal',
    title: 'Student Portal',
    description: 'Secure student information system - Academic records, assignment tracking, grade reports, and educational communications platform',
    url: '/student/portal',
    icon: 'student',
    category: 'resources',
    external: false,
    priority: true,
    keywords: ['student', 'portal', 'grades', 'assignments', 'academic', 'records', 'communications', 'tracking'],
    ariaLabel: 'Access student information portal'
  },
  {
    id: 'parent-engagement-portal',
    title: 'Parent Portal',
    description: 'Parent engagement platform - Monitor child academic progress, attendance tracking, school activities, and direct teacher communication',
    url: '/parent/portal',
    icon: 'parent',
    category: 'resources',
    external: false,
    priority: true,
    keywords: ['parent', 'portal', 'progress', 'attendance', 'communication', 'teachers', 'activities', 'monitoring'],
    ariaLabel: 'Access parent engagement portal'
  }
] as const;

// ============================================================================
// STYLING & THEMING CONFIGURATION
// ============================================================================

/**
 * Category-based color schemes for consistent visual identity
 * 
 * Optimized for accessibility (WCAG 2.1 AA compliance) and brand consistency
 */
export const COLOR_SCHEMES: Record<CategoryType, ColorScheme> = {
  government: {
    primary: 'text-blue-600',
    hover: 'bg-blue-50',
    border: 'blue-200',
    text: 'text-blue-700',
    background: 'bg-blue-50/50',
    accent: 'bg-blue-100'
  },
  education: {
    primary: 'text-emerald-600',
    hover: 'bg-emerald-50',
    border: 'emerald-200',
    text: 'text-emerald-700',
    background: 'bg-emerald-50/50',
    accent: 'bg-emerald-100'
  },
  resources: {
    primary: 'text-purple-600',
    hover: 'bg-purple-50',
    border: 'purple-200',
    text: 'text-purple-700',
    background: 'bg-purple-50/50',
    accent: 'bg-purple-100'
  }
} as const;

// ============================================================================
// ANIMATION & INTERACTION CONFIGURATION
// ============================================================================

/**
 * Performance-optimized animation variants for smooth user interactions
 * 
 * Uses hardware acceleration and optimized easing curves for 60fps animations
 */
export const ANIMATION_VARIANTS: Record<string, AnimationVariant> = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  item: {
    hidden: { 
      opacity: 0, 
      y: 24,
      scale: 0.96
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  card: {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      rotateX: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
} as const;

// ============================================================================
// CATEGORY METADATA & SEO CONFIGURATION
// ============================================================================

/**
 * Enhanced category metadata for improved SEO and user experience
 * 
 * Includes structured data for search engines and accessibility features
 */
export const CATEGORY_METADATA: Record<CategoryType, CategoryMetadata> = {
  government: {
    title: 'Government Educational Portals',
    description: 'Official government websites and educational authorities providing policies, guidelines, and academic standards in Bangladesh',
    keywords: ['government', 'official', 'ministry', 'education', 'bangladesh', 'authority', 'policy', 'academic'],
    icon: '🏛️'
  },
  education: {
    title: 'Academic Resources & Tools',
    description: 'Comprehensive educational resources including curriculum materials, examination information, and academic development tools',
    keywords: ['education', 'academic', 'curriculum', 'examination', 'resources', 'learning', 'development', 'tools'],
    icon: '📚'
  },
  resources: {
    title: 'School Services & Portals',
    description: 'Student and parent engagement platforms, digital library access, and comprehensive school service resources',
    keywords: ['school', 'services', 'student', 'parent', 'portal', 'library', 'resources', 'engagement'],
    icon: '🎓'
  }
} as const;

/**
 * Global site configuration for SEO optimization and branding
 * 
 * Centralized configuration for consistent metadata across the application
 */
export const SITE_CONFIG = {
  name: 'Surjomukhi Kindergarten',
  tagline: 'Excellence in Early Childhood Education',
  description: 'Premier early childhood education institution providing quality education, holistic child development programs, and innovative learning experiences in Bangladesh.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://surjamukhikindergarten.com',
  locale: 'en_US',
  type: 'website',
  
  // SEO Keywords - Optimized for local and educational search
  keywords: [
    'kindergarten bangladesh',
    'early childhood education',
    'quality education',
    'child development',
    'innovative learning',
    'academic excellence',
    'educational institution',
    'surjomukhi kindergarten',
    'preschool education',
    'holistic development'
  ],
  
  // Social Media & Branding
  social: {
    twitter: '@SurjomukhiKG',
    facebook: 'SurjomukhiKindergarten',
    linkedin: 'surjomukhi-kindergarten'
  },
  
  // Contact Information
  contact: {
    email: 'info@surjamukhikindergarten.com',
    phone: '+880-1234-567890',
    address: 'Dhaka, Bangladesh'
  }
} as const;

// ============================================================================
// UTILITY FUNCTIONS & HELPERS
// ============================================================================

/**
 * Get quick links filtered by category
 * 
 * @param category - The category to filter by
 * @returns Array of quick links for the specified category
 */
export const getQuickLinksByCategory = (category: CategoryType): readonly QuickLink[] => {
  return QUICK_LINKS_DATA.filter(link => link.category === category);
};

/**
 * Get high priority quick links for above-the-fold content
 * 
 * @returns Array of priority quick links
 */
export const getPriorityQuickLinks = (): readonly QuickLink[] => {
  return QUICK_LINKS_DATA.filter(link => link.priority === true);
};

/**
 * Get external links for proper handling (security, performance)
 * 
 * @returns Array of external quick links
 */
export const getExternalQuickLinks = (): readonly QuickLink[] => {
  return QUICK_LINKS_DATA.filter(link => link.external === true);
};

/**
 * Generate structured data for SEO
 * 
 * @param link - Quick link to generate structured data for
 * @returns JSON-LD structured data object
 */
export const generateStructuredData = (link: QuickLink) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: link.title,
  description: link.description,
  url: link.external ? link.url : `${SITE_CONFIG.url}${link.url}`,
  keywords: link.keywords?.join(', '),
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url
  }
});
