import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Notices - Latest Announcements',
  description: 'Stay updated with the latest school notices, announcements, and important information. Find academic notices, general announcements, and event updates.',
  keywords: ['school notices', 'announcements', 'school news', 'academic notices', 'school updates', 'important information'],
  openGraph: {
    title: 'School Notices - Latest Announcements',
    description: 'Stay updated with the latest school notices, announcements, and important information.',
    type: 'website',
  },
};

export default function NoticesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
