'use client';

import React from 'react';
import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  canonical
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com';
  const siteName = 'Surjamukhi Kindergarten';
  
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Excellence in Early Childhood Education`;
  const fullDescription = description || 'Premier early childhood education institution providing quality education and holistic child development programs in Bangladesh.';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image ? `${baseUrl}${image}` : `${baseUrl}/og-home.jpg`;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : fullUrl;

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SurjamukhiKG" />
      <meta name="twitter:creator" content="@SurjamukhiKG" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content="Surjamukhi KG" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="BD" />
      <meta name="geo.country" content="Bangladesh" />
      
      {/* Language and Content Meta Tags */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
    </Head>
  );
};

export default SEOHead;
