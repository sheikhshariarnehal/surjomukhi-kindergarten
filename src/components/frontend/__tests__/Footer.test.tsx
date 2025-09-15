import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/image', () => {
  return ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  );
});

// Mock child components
jest.mock('../NewsletterSignup', () => {
  return function MockNewsletterSignup({ onSubmit, isLoading }: any) {
    return (
      <div data-testid="newsletter-signup">
        <button
          onClick={() => onSubmit({ email: 'test@example.com' })}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Subscribe'}
        </button>
      </div>
    );
  };
});

jest.mock('../BackToTop', () => {
  return function MockBackToTop({ showProgress }: any) {
    return (
      <button data-testid="back-to-top" data-show-progress={showProgress}>
        Back to Top
      </button>
    );
  };
});

const renderWithLanguageProvider = (component: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo for BackToTop component
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true
    });
  });

  it('renders footer with all sections', () => {
    renderWithLanguageProvider(<Footer />);
    
    // Check if main footer elements are present
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Surjomukhi Kindergarten')).toBeInTheDocument();
    expect(screen.getByText('Excellence in Early Childhood Education')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    renderWithLanguageProvider(<Footer />);
    
    // Check for contact information
    expect(screen.getByText('Dhaka, Bangladesh')).toBeInTheDocument();
    expect(screen.getByText('+880 1234-567890')).toBeInTheDocument();
    expect(screen.getByText('info@surjomukhikg.edu.bd')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithLanguageProvider(<Footer />);
    
    // Check for navigation sections
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Student Resources')).toBeInTheDocument();
    
    // Check for specific links
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('displays social media links', () => {
    renderWithLanguageProvider(<Footer />);
    
    // Check for social media links
    const facebookLink = screen.getByLabelText('Follow us on Facebook');
    const youtubeLink = screen.getByLabelText('Subscribe to our YouTube channel');
    const instagramLink = screen.getByLabelText('Follow us on Instagram');
    
    expect(facebookLink).toBeInTheDocument();
    expect(youtubeLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/surjomukhikg');
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/surjomukhikg');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/surjomukhikg');
  });

  it('shows newsletter signup by default', () => {
    renderWithLanguageProvider(<Footer />);
    
    expect(screen.getByTestId('newsletter-signup')).toBeInTheDocument();
  });

  it('hides newsletter when showNewsletter is false', () => {
    renderWithLanguageProvider(<Footer showNewsletter={false} />);
    
    expect(screen.queryByTestId('newsletter-signup')).not.toBeInTheDocument();
  });

  it('shows back to top button by default', () => {
    renderWithLanguageProvider(<Footer />);
    
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });

  it('hides back to top when showBackToTop is false', () => {
    renderWithLanguageProvider(<Footer showBackToTop={false} />);
    
    expect(screen.queryByTestId('back-to-top')).not.toBeInTheDocument();
  });

  it('handles newsletter submission', async () => {
    renderWithLanguageProvider(<Footer />);
    
    const subscribeButton = screen.getByText('Subscribe');
    fireEvent.click(subscribeButton);
    
    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('displays copyright information', () => {
    renderWithLanguageProvider(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithLanguageProvider(
      <Footer className="custom-footer-class" />
    );
    
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('custom-footer-class');
  });

  it('renders with custom social links', () => {
    const customSocialLinks = [
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/test',
        icon: <span>LinkedIn Icon</span>,
        ariaLabel: 'Follow us on LinkedIn'
      }
    ];
    
    renderWithLanguageProvider(
      <Footer customSocialLinks={customSocialLinks} />
    );
    
    expect(screen.getByLabelText('Follow us on LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn Icon')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithLanguageProvider(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Check for proper ARIA labels on social links
    const socialLinks = screen.getAllByRole('link');
    const socialMediaLinks = socialLinks.filter(link => 
      link.getAttribute('aria-label')?.includes('Follow us') ||
      link.getAttribute('aria-label')?.includes('Subscribe to')
    );
    
    expect(socialMediaLinks.length).toBeGreaterThan(0);
  });

  it('includes structured data script', () => {
    const { container } = renderWithLanguageProvider(<Footer />);
    
    const structuredDataScript = container.querySelector('script[type="application/ld+json"]');
    expect(structuredDataScript).toBeInTheDocument();
    
    const structuredData = JSON.parse(structuredDataScript?.textContent || '{}');
    expect(structuredData['@context']).toBe('https://schema.org');
    expect(structuredData['@type']).toBe('WPFooter');
  });
});
