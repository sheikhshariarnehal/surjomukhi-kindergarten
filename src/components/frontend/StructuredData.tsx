import React from 'react';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'educationalOrganization';
  data?: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data = {} }) => {
  const getStructuredData = () => {
    const envUrl = process.env.NEXT_PUBLIC_APP_URL;
    const baseUrl = (envUrl && !envUrl.includes('localhost')) ? envUrl : 'https://www.surjamukhikindergarten.com';
    
    switch (type) {
      case 'organization':
      case 'educationalOrganization':
        return {
          "@context": "https://schema.org",
          "@type": ["EducationalOrganization", "School"],
          "@id": `${baseUrl}/#organization`,
          "name": "Surjamukhi Kindergarten",
          "alternateName": "Surjamukhi KG",
          "description": "Established in 2004, Surjamukhi Kindergarten is a premier Bangla medium school in Nawabganj, Dhaka, providing quality education from Nursery to Grade 5.",
          "url": baseUrl,
          "telephone": "+8801954113374",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.webp`,
            "width": 512,
            "height": 512
          },
          "image": [
            {
              "@type": "ImageObject",
              "url": `${baseUrl}/og-home.jpg`,
              "width": 1200,
              "height": 630,
              "caption": "Surjomukhi Kindergarten Campus"
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Salauddin Complex, Aona Bazar",
            "addressLocality": "Nawabganj",
            "addressRegion": "Dhaka",
            "postalCode": "1320",
            "addressCountry": "BD"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "23.666", // Approximate latitude for Nawabganj
            "longitude": "90.166" // Approximate longitude for Nawabganj
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+8801954113374",
            "contactType": "customer service",
            "email": "info.surjamukhikindergarten@gmail.com",
            "availableLanguage": ["Bengali", "English"]
          },
          "sameAs": [
            "https://facebook.com/surjomukhikg",
            "https://youtube.com/surjomukhikg",
            "https://instagram.com/surjomukhikg"
          ],
          "foundingDate": "2004",
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": data.employeeCount || 40
          },
          "educationalCredentialAwarded": "Early Childhood Education Certificate",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Educational Programs",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Course",
                  "name": "Nursery Program",
                  "description": "Foundation program for children aged 3-4 years"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Course",
                  "name": "Kindergarten Program",
                  "description": "Comprehensive program for children aged 4-6 years"
                }
              }
            ]
          },
          ...data
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "url": baseUrl,
          "name": "Surjomukhi Kindergarten",
          "description": "Official website of Surjomukhi Kindergarten - Excellence in Early Childhood Education",
          "publisher": {
            "@id": `${baseUrl}/#organization`
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          ],
          "inLanguage": "en-US",
          ...data
        };

      default:
        return {};
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData || Object.keys(structuredData).length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export default StructuredData;
