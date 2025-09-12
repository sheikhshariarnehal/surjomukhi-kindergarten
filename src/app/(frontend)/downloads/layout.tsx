import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Downloads - Forms, Documents & Resources',
  description: 'Download important school documents, forms, applications, syllabus, policies, and educational resources for students and parents at Surjomukhi Kindergarten.',
  keywords: ['school downloads', 'school forms', 'admission forms', 'syllabus download', 'school documents', 'educational resources', 'school policies'],
  openGraph: {
    title: 'Downloads - Forms, Documents & Resources',
    description: 'Download important school documents, forms, applications, syllabus, policies, and educational resources for students and parents.',
    type: 'website',
    images: [
      {
        url: '/images/downloads-og.jpg',
        width: 1200,
        height: 630,
        alt: 'School Downloads',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Downloads - Forms, Documents & Resources',
    description: 'Download important school documents, forms, applications, syllabus, policies, and educational resources.',
    images: ['/images/downloads-og.jpg'],
  },
};

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
