/**
 * Quick Links Constants
 * Centralized configuration for all quick links and educational resources
 * 
 * @description This file contains all the quick links data, categories, and configurations
 * used throughout the application. It's designed to be easily maintainable and SEO-friendly.
 */

// Types
export interface QuickLink {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly icon: IconType;
  readonly category: CategoryType;
  readonly external?: boolean;
  readonly priority?: boolean; // For SEO and loading priority
  readonly keywords?: readonly string[]; // For SEO
}

export type CategoryType = 'government' | 'education' | 'resources';
export type IconType = 'government' | 'education' | 'curriculum' | 'results' | 'digital' | 'library' | 'student' | 'parent';

export interface ColorScheme {
  readonly primary: string;
  readonly hover: string;
  readonly border: string;
  readonly text: string;
  readonly background: string;
  readonly accent: string;
}

// Quick Links Data - Comprehensive and SEO-optimized
export const QUICK_LINKS_DATA: readonly QuickLink[] = [
  // Government Portals
  {
    id: 'moe-bd',
    title: 'Ministry of Education',
    description: 'Official website of the Ministry of Education, Bangladesh - Access policies, circulars, and educational guidelines',
    url: 'https://moedu.gov.bd',
    icon: 'government',
    category: 'government',
    external: true,
    priority: true,
    keywords: ['ministry', 'education', 'bangladesh', 'government', 'policy', 'circular', 'guidelines']
  },
  {
    id: 'dshe-bd',
    title: 'Directorate of Secondary Education',
    description: 'Secondary and Higher Secondary Education Board - Curriculum, examinations, and academic standards',
    url: 'https://dshe.gov.bd',
    icon: 'education',
    category: 'government',
    external: true,
    priority: true,
    keywords: ['secondary', 'education', 'board', 'examination', 'curriculum', 'academic', 'standards']
  },
  {
    id: 'digital-bangladesh',
    title: 'Digital Bangladesh',
    description: 'Government\'s digital initiative for education - E-learning resources and digital transformation',
    url: 'https://digitalbangladesh.gov.bd',
    icon: 'digital',
    category: 'government',
    external: true,
    keywords: ['digital', 'bangladesh', 'e-learning', 'technology', 'education', 'transformation']
  },

  // Educational Resources
  {
    id: 'nctb-bd',
    title: 'National Curriculum Board',
    description: 'National Curriculum and Textbook Board (NCTB) - Official textbooks and curriculum development',
    url: 'https://nctb.gov.bd',
    icon: 'curriculum',
    category: 'education',
    external: true,
    priority: true,
    keywords: ['curriculum', 'textbook', 'nctb', 'syllabus', 'education', 'development']
  },
  {
    id: 'board-results',
    title: 'Education Board Results',
    description: 'Check SSC, HSC and other board examination results - Official result portal for all education boards',
    url: 'https://eboardresults.com',
    icon: 'results',
    category: 'education',
    external: true,
    keywords: ['results', 'ssc', 'hsc', 'examination', 'board', 'marks', 'grades']
  },

  // School Resources
  {
    id: 'online-library',
    title: 'Online Library',
    description: 'Access our comprehensive digital library with educational resources, e-books, and research materials',
    url: '/resources/library',
    icon: 'library',
    category: 'resources',
    external: false,
    priority: true,
    keywords: ['library', 'books', 'resources', 'digital', 'research', 'e-books', 'materials']
  },
  {
    id: 'student-portal',
    title: 'Student Portal',
    description: 'Student information system for academic records, assignments, grades, and school communications',
    url: '/student/portal',
    icon: 'student',
    category: 'resources',
    external: false,
    priority: true,
    keywords: ['student', 'portal', 'grades', 'assignments', 'academic', 'records', 'communications']
  },
  {
    id: 'parent-portal',
    title: 'Parent Portal',
    description: 'Track your child\'s academic progress, attendance, school activities, and communicate with teachers',
    url: '/parent/portal',
    icon: 'parent',
    category: 'resources',
    external: false,
    priority: true,
    keywords: ['parent', 'portal', 'progress', 'attendance', 'communication', 'teachers', 'activities']
  }
] as const;

// Color schemes for different categories
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

// Animation variants for better performance
export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  card: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }
} as const;

// Category metadata for enhanced SEO and accessibility
export const CATEGORY_METADATA = {
  government: {
    title: 'Government Portals',
    description: 'Official government websites and educational authorities in Bangladesh',
    keywords: ['government', 'official', 'ministry', 'education', 'bangladesh', 'authority']
  },
  education: {
    title: 'Educational Resources',
    description: 'Academic resources, curriculum, examination information, and educational tools',
    keywords: ['education', 'academic', 'curriculum', 'examination', 'resources', 'learning']
  },
  resources: {
    title: 'School Services',
    description: 'Student and parent portals, library access, and comprehensive school resources',
    keywords: ['school', 'services', 'student', 'parent', 'portal', 'library', 'resources']
  }
} as const;

// SEO-friendly site configuration
export const SITE_CONFIG = {
  name: 'Surjomukhi Kindergarten',
  description: 'Premier early childhood education institution providing quality education and holistic child development programs in Bangladesh.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://surjamukhikindergarten.com',
  keywords: [
    'kindergarten', 'early childhood education', 'bangladesh', 'school', 'education',
    'child development', 'learning', 'teaching', 'academic excellence'
  ]
} as const;
