import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  manifest: '/manifest.json',
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
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: "Surjomukhi Kindergarten",
    title: "Surjomukhi Kindergarten - Excellence in Early Childhood Education",
    description: "Premier early childhood education institution providing quality education and holistic child development programs in Bangladesh.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Surjomukhi Kindergarten - Excellence in Early Childhood Education",
        type: "image/jpeg",
      },
      {
        url: "/og-logo.png",
        width: 800,
        height: 800,
        alt: "Surjomukhi Kindergarten Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SurjomukhiKG",
    creator: "@SurjomukhiKG",
    title: "Surjomukhi Kindergarten - Excellence in Early Childhood Education",
    description: "Premier early childhood education with experienced teachers, modern facilities, and comprehensive development programs.",
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
    google: 'your-google-verification-code', // Replace with actual verification code
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
    "name": "Surjomukhi Kindergarten",
    "alternateName": "Surjomukhi KG",
    "description": "Premier early childhood education institution providing quality education and holistic child development programs in Bangladesh.",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/og-home.jpg`,
    "foundingDate": "YYYY", // Replace with actual founding year
    "numberOfStudents": "XXX", // Replace with actual number
    "educationalCredentialAwarded": "Early Childhood Education Certificate",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Address", // Replace with actual address
      "addressLocality": "Your City", // Replace with actual city
      "addressRegion": "Your Division", // Replace with actual division
      "postalCode": "XXXX", // Replace with actual postal code
      "addressCountry": "BD"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+880-XXX-XXXXXXX", // Replace with actual phone
        "contactType": "customer service",
        "email": "info@surjomukhikg.edu.bd", // Replace with actual email
        "availableLanguage": ["English", "Bengali"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+880-XXX-XXXXXXX", // Replace with actual phone
        "contactType": "admissions",
        "email": "admission@surjomukhikg.edu.bd" // Replace with actual email
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
      </body>
    </html>
  );
}
