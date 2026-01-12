import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission 2024 - Surjomukhi Kindergarten | Apply Online for Play to Class 5',
  description: 'Apply for admission to Surjomukhi Kindergarten 2024. Quality Bangla medium education for ages 5-11. Online application, transparent fee structure (৳300-500/month), experienced faculty. Admission open for Play, Nursery, Class 1-5. Apply now!',
  keywords: [
    'admission 2024',
    'kindergarten admission Bangladesh',
    'school admission Dhaka',
    'Surjomukhi Kindergarten admission',
    'online school admission',
    'apply online kindergarten',
    'school enrollment 2024',
    'primary education admission',
    'Bangla medium school admission',
    'kindergarten enrollment Bangladesh',
    'admission requirements',
    'school admission fees',
    'affordable school admission',
    'Play class admission',
    'Nursery admission',
    'Class 1 admission',
    'best kindergarten Bangladesh',
    'quality education Bangladesh',
  ],
  openGraph: {
    title: 'Admission 2024 - Surjomukhi Kindergarten | Apply Online',
    description: 'Apply for admission to Surjomukhi Kindergarten 2024. Quality Bangla medium education for ages 5-11. Affordable fees starting from ৳300/month. Online application available. Admission open now!',
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/admission`,
    siteName: 'Surjomukhi Kindergarten',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/og-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Surjomukhi Kindergarten - Admission 2024 - Apply Online for Quality Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admission 2024 - Surjomukhi Kindergarten',
    description: 'Apply for admission to Surjomukhi Kindergarten 2024. Quality Bangla medium education for ages 5-11. Affordable fees. Apply online now!',
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/twitter-card.jpg`],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/admission`,
    languages: {
      'en-US': `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/admission`,
      'bn-BD': `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/admission`,
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

export default function AdmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data for Educational Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Surjomukhi Kindergarten',
            description: 'A private primary educational institution providing quality Bangla medium education from nursery to Grade 5 with focus on creative, ethical, and holistic development.',
            url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/admission`,
            logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/logo.webp`,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'BD',
              addressLocality: 'Bangladesh',
            },
            offers: {
              '@type': 'Offer',
              category: 'Education',
              name: 'Primary Education Admission',
              description: 'Admission to Surjomukhi Kindergarten for Play, Nursery, and Classes One through Five',
              priceSpecification: [
                {
                  '@type': 'PriceSpecification',
                  name: 'Play Class',
                  price: '300',
                  priceCurrency: 'BDT',
                  description: 'Monthly fee for Play class',
                },
                {
                  '@type': 'PriceSpecification',
                  name: 'Nursery Class',
                  price: '300',
                  priceCurrency: 'BDT',
                  description: 'Monthly fee for Nursery class',
                },
                {
                  '@type': 'PriceSpecification',
                  name: 'Class One',
                  price: '400',
                  priceCurrency: 'BDT',
                  description: 'Monthly fee for Class One',
                },
                {
                  '@type': 'PriceSpecification',
                  name: 'Class Two',
                  price: '400',
                  priceCurrency: 'BDT',
                  description: 'Monthly fee for Class Two',
                },
                {
                  '@type': 'PriceSpecification',
                  name: 'Class Three',
                  price: '450',
                  priceCurrency: 'BDT',
                  description: 'Monthly fee for Class Three',
                },
                {
                  '@type': 'PriceSpecification',
                  name: 'Class Four',
                  price: '450',
                  priceCurrency: 'BDT',
                  description: 'Monthly fee for Class Four',
                },
                {
                  '@type': 'PriceSpecification',
                  name: 'Class Five',
                  price: '500',
                  priceCurrency: 'BDT',
                  description: 'Monthly fee for Class Five',
                },
              ],
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Educational Programs',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Course',
                    name: 'Play Class',
                    description: 'Early childhood education for 5-year-old children',
                    provider: {
                      '@type': 'EducationalOrganization',
                      name: 'Surjomukhi Kindergarten',
                    },
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Course',
                    name: 'Nursery Class',
                    description: 'Foundation education for 6-year-old children',
                    provider: {
                      '@type': 'EducationalOrganization',
                      name: 'Surjomukhi Kindergarten',
                    },
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Course',
                    name: 'Primary Education (Class One to Five)',
                    description: 'Comprehensive primary education following national curriculum',
                    provider: {
                      '@type': 'EducationalOrganization',
                      name: 'Surjomukhi Kindergarten',
                    },
                  },
                },
              ],
            },
          }),
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Admission',
                item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'}/admission`,
              },
            ],
          }),
        }}
      />
      
      {children}
    </>
  );
}

