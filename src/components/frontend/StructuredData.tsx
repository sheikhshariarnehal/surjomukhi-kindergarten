import React from 'react';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'educationalOrganization';
  data?: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data = {} }) => {
  const getStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com';
    
    switch (type) {
      case 'organization':
      case 'educationalOrganization':
        return {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "@id": `${baseUrl}/#organization`,
          "name": "Surjamukhi Kindergarten",
          "alternateName": "Surjamukhi KG",
          "description": "A premier kindergarten providing quality early childhood education with experienced teachers and modern facilities for holistic child development.",
          "url": baseUrl,
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
            "streetAddress": data.address?.street || "123 Education Street",
            "addressLocality": data.address?.city || "Dhaka",
            "addressRegion": data.address?.region || "Dhaka Division",
            "postalCode": data.address?.postalCode || "1000",
            "addressCountry": "BD"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": data.phone || "+880-1234-567890",
            "contactType": "customer service",
            "availableLanguage": ["Bengali", "English"]
          },
          "sameAs": [
            data.facebook || "https://facebook.com/surjomukhikindergarten",
            data.youtube || "https://youtube.com/@surjomukhikindergarten"
          ],
          "foundingDate": data.foundingDate || "2010",
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
