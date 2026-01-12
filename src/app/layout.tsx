import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2563eb',
};

export const metadata: Metadata = {
  title: {
    default: "Surjomukhi Kindergarten - Excellence in Early Childhood Education",
    template: "%s | Surjomukhi Kindergarten"
  },
  description: "Surjomukhi Kindergarten provides exceptional early childhood education with experienced teachers, modern facilities, and comprehensive development programs. Join Bangladesh's leading kindergarten for your child's bright future.",
  keywords: [
    "Surjomukhi Kindergarten",
    "kindergarten Bangladesh",
    "early childhood education",
    "preschool",
    "nursery school",
    "child development",
    "quality education",
    "experienced teachers",
    "modern facilities",
    "holistic development",
    "play-based learning",
    "academic excellence",
    "safe learning environment",
    "qualified faculty",
    "educational programs"
  ],
  authors: [{ name: "Surjomukhi Kindergarten" }],
  creator: "Surjomukhi Kindergarten",
  publisher: "Surjomukhi Kindergarten",
  category: "Education",
  classification: "Early Childhood Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com'),
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Surjomukhi KG',
    startupImage: [
      {
        url: '/apple-touch-startup-image-768x1004.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.surjamukhikindergarten.com',
    siteName: "Surjamukhi Kindergarten",
    title: "Surjamukhi Kindergarten - Excellence in Early Childhood Education",
    description: "Premier early childhood education institution providing quality education and holistic child development programs in Bangladesh. Experienced teachers, modern facilities, and comprehensive development programs for your child's bright future.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Surjamukhi Kindergarten - Excellence in Early Childhood Education",
        type: "image/jpeg",
      },
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "Surjamukhi Kindergarten Logo",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SurjamukhiKG",
    creator: "@SurjamukhiKG",
    title: "Surjamukhi Kindergarten - Excellence in Early Childhood Education",
    description: "Premier early childhood education with experienced teachers, modern facilities, and comprehensive development programs for your child's bright future.",
    images: ["/og-home.jpg"],
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
  verification: {
    google: "v_20p_W292dUZ7Ee670yu6okOI0AUeEOL8oaYQVFUAI",
    yandex: 'your-yandex-verification-code', // Replace with actual verification code
    yahoo: 'your-yahoo-verification-code', // Replace with actual verification code
  },
  other: {
    'theme-color': '#2563eb',
    'color-scheme': 'light',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Surjomukhi KG',
    'application-name': 'Surjomukhi Kindergarten',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-TileImage': '/mstile-144x144.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${baseUrl}/#organization`,
    "name": "Surjomukhi Kindergarten",
    "alternateName": "Surjomukhi KG",
    "description": "Premier early childhood education institution providing quality education and holistic child development programs in Bangladesh.",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.webp`,
    "image": `${baseUrl}/og-home.jpg`,
    "foundingDate": "2004",
    "numberOfStudents": "55+",
    "educationalCredentialAwarded": "Early Childhood Education Certificate",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Salauddin Complex, Aona Bazar",
      "addressLocality": "Nawabganj",
      "addressRegion": "Dhaka",
      "postalCode": "1320",
      "addressCountry": "BD"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "01954113374",
        "contactType": "customer service",
        "email": "info.surjamukhikindergarten@gmail.com",
        "availableLanguage": ["English", "Bengali"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "01954113374",
        "contactType": "admissions",
        "email": "info.surjamukhikindergarten@gmail.com"
      }
    ],
    "sameAs": [
      "https://facebook.com/surjomukhikg", // Replace with actual social media
      "https://youtube.com/surjomukhikg",
      "https://instagram.com/surjomukhikg"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Educational Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Early Childhood Education Program",
            "description": "Comprehensive early childhood education program for children aged 3-6 years"
          }
        }
      ]
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Surjomukhi KG" />
        <meta name="application-name" content="Surjomukhi Kindergarten" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2563eb" />
        {/* Preload critical hero image for instant display */}
        <link
          rel="preload"
          as="image"
          href="/hero/school-tour.webp"
          fetchPriority="high"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-23C8S27HQF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-23C8S27HQF');
          `}
        </Script>
      </body>
    </html>
  );
}
