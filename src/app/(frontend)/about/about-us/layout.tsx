import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com';

export const metadata: Metadata = {
  title: 'About Us - Surjomukhi Kindergarten | Quality Primary Education in Dhaka Since 2004',
  description: 'Learn about Surjomukhi Kindergarten, a premier Bangla-medium primary school established in 2004 in Nawabganj, Dhaka. Offering quality education from Play Group to Grade 5 with modern facilities, experienced teachers, and value-based learning. 55+ students, safe environment.',
  keywords: [
    'Surjomukhi Kindergarten',
    'সূর্যমুখী কিন্ডারগার্টেন',
    'about us kindergarten',
    'primary school Dhaka',
    'Bangla medium school',
    'kindergarten Nawabganj',
    'quality education Bangladesh',
    'private school Dhaka',
    'early childhood education',
    'preschool Bangladesh',
    'Play Group to Grade 5',
    'value-based education',
    'creative education Bangladesh',
    'ethical education school',
    'holistic child development',
    'best kindergarten Dhaka',
    'affordable school Bangladesh',
  ],
  openGraph: {
    title: 'About Us - Surjomukhi Kindergarten | Quality Education Since 2004',
    description: 'Premier Bangla-medium primary education institution in Nawabganj, Dhaka. Established in 2004, we offer creative, value-based education from Play Group to Grade 5 with modern facilities and experienced teachers.',
    url: `${BASE_URL}/about/about-us`,
    siteName: 'Surjomukhi Kindergarten',
    images: [
      {
        url: `${BASE_URL}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: 'About Surjomukhi Kindergarten - Quality Education Since 2004',
      },
      {
        url: `${BASE_URL}/logo.webp`,
        width: 512,
        height: 512,
        alt: 'Surjomukhi Kindergarten Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Surjomukhi Kindergarten',
    description: 'Premier Bangla-medium primary education institution in Dhaka since 2004. Quality education from Play Group to Grade 5.',
    images: [`${BASE_URL}/og-about.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/about/about-us`,
    languages: {
      'en-US': `${BASE_URL}/about/about-us`,
      'bn-BD': `${BASE_URL}/about/about-us`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD Structured Data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${BASE_URL}/about/about-us#organization`,
  name: 'Surjomukhi Kindergarten',
  alternateName: 'সূর্যমুখী কিন্ডারগার্টেন',
  description: 'Non-government Bangla-medium primary institution established in 2004, providing quality education from Play Group to Grade 5 with focus on creative, ethical, and holistic development.',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.webp`,
    width: 512,
    height: 512,
  },
  image: `${BASE_URL}/og-about.jpg`,
  foundingDate: '2004-01-01',
  founder: {
    '@type': 'Person',
    name: 'Belal Imran Mahmud',
    alternateName: 'বে\'লাল ইমরান মাহমুদ',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Salauddin Complex, Aona Bazar',
    addressLocality: 'Nawabganj',
    addressRegion: 'Dhaka',
    postalCode: '1320',
    addressCountry: 'BD',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.7461,
    longitude: 90.2792,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+880-1954113374',
    contactType: 'customer service',
    email: 'info.surjamukhikindergarten@gmail.com',
    availableLanguage: ['Bengali', 'English'],
  },
  telephone: '+880-1954113374',
  email: 'info.surjamukhikindergarten@gmail.com',
  numberOfStudents: 55,
  educationalLevel: 'Primary Education',
  teaches: ['Play Group', 'Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Educational Programs',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'EducationalOccupationalProgram',
          name: 'Primary Education (Play Group to Grade 5)',
          educationalLevel: 'Primary',
        },
      },
    ],
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Playground', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Library', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Modern Classrooms', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Safe Environment', value: true },
  ],
  sameAs: [BASE_URL],
};

// Breadcrumb structured data
const breadcrumbData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: `${BASE_URL}/about`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'About Us',
      item: `${BASE_URL}/about/about-us`,
    },
  ],
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      {children}
    </>
  );
}
