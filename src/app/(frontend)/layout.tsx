import React from 'react';
import ProfessionalNavbar from '@/components/frontend/ProfessionalNavbar';
import Footer from '@/components/frontend/Footer';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProfessionalNavbar />
      <main className="flex-1" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
