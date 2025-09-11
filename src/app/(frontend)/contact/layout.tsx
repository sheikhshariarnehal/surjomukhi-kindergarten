import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Contact our school for admissions inquiries, general information, or any questions. Find our address, phone numbers, email, and office hours.',
  keywords: ['contact school', 'school address', 'phone number', 'email', 'admissions inquiry', 'school location'],
  openGraph: {
    title: 'Contact Us - Get in Touch',
    description: 'Contact our school for admissions inquiries, general information, or any questions. Find our address, phone numbers, email, and office hours.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
