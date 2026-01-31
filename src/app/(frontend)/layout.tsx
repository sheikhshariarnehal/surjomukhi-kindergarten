import React from 'react';
import ProfessionalNavbar from '@/components/frontend/ProfessionalNavbar';
import Footer from '@/components/frontend/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProfessionalNavbar />
      <main className="flex-1" role="main">
        <Breadcrumbs className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-6 py-4" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
