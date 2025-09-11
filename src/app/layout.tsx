import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "School Website - Quality Education for All",
    template: "%s | School Website"
  },
  description: "Providing quality education and nurturing young minds for a brighter future. Our commitment to excellence in education has been our hallmark for decades.",
  keywords: ["school", "education", "students", "teachers", "learning", "academic"],
  authors: [{ name: "School Website" }],
  creator: "School Website",
  publisher: "School Website",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: "School Website",
    title: "School Website - Quality Education for All",
    description: "Providing quality education and nurturing young minds for a brighter future.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "School Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School Website - Quality Education for All",
    description: "Providing quality education and nurturing young minds for a brighter future.",
    images: ["/og-image.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "School Website",
    "description": "Providing quality education and nurturing young minds for a brighter future.",
    "url": process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    "logo": `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/logo.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Education Street",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345",
      "addressCountry": "BD"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+880-1234-567890",
      "contactType": "customer service",
      "email": "info@school.edu.bd"
    },
    "sameAs": [
      "https://facebook.com/schoolwebsite",
      "https://twitter.com/schoolwebsite"
    ]
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
