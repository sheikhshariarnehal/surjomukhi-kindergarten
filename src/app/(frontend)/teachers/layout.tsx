import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Teachers - Surjomukhi Kindergarten',
  description: 'Meet our dedicated and experienced faculty members who are committed to providing quality education and nurturing young minds at Surjomukhi Kindergarten.',
  keywords: [
    'teachers',
    'faculty',
    'education',
    'staff',
    'qualified teachers',
    'experienced educators',
    'Surjomukhi Kindergarten',
    'kindergarten teachers',
    'early childhood educators'
  ],
  openGraph: {
    title: 'Our Teachers - Surjomukhi Kindergarten',
    description: 'Meet our dedicated and experienced faculty members who are committed to providing quality education and nurturing young minds.',
    type: 'website',
    images: [
      {
        url: '/og-teachers.jpg',
        width: 1200,
        height: 630,
        alt: 'Our Teachers - Surjomukhi Kindergarten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Teachers - Surjomukhi Kindergarten',
    description: 'Meet our dedicated and experienced faculty members who are committed to providing quality education.',
    images: ['/og-teachers.jpg'],
  },
};

export default function TeachersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Surjomukhi Kindergarten',
            description: 'Quality early childhood education with experienced and dedicated teachers',
            url: 'https://surjomukhi-kindergarten.com/teachers',
            employee: [
              {
                '@type': 'Person',
                jobTitle: 'Head Teacher',
                description: 'Experienced educators dedicated to early childhood development'
              }
            ],
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'BD'
            }
          })
        }}
      />
      {children}
    </>
  );
}
