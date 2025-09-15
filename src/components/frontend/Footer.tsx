'use client';

import React, { useMemo, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import type { FooterProps, FooterNavItem, SocialLink, ContactInfo } from '@/types/footer';
import styles from './Footer.module.css';

const BackToTop = dynamic(() => import('./BackToTop'), { loading: () => null, ssr: false });

const SCHOOL_INFO = {
  name: 'Surjomukhi Kindergarten',
  tagline: 'Excellence in Early Childhood Education',
  description: 'Providing quality education and nurturing young minds for a brighter future. Our commitment to excellence in education has been our hallmark for decades.',
  address: 'Dhaka, Bangladesh',
  phone: '+880 1234-567890',
  email: 'info@surjomukhikg.edu.bd',
  officeHours: 'Sunday - Thursday: 8:00 AM - 4:00 PM',
  website: 'https://www.surjomukhikg.edu.bd'
} as const;

const FacebookIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
));
FacebookIcon.displayName = 'FacebookIcon';

const YouTubeIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
  </svg>
));
YouTubeIcon.displayName = 'YouTubeIcon';

const InstagramIconAlt = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"/>
  </svg>
));
InstagramIconAlt.displayName = 'InstagramIconAlt';

const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', href: 'https://facebook.com/surjomukhikg', icon: <FacebookIcon />, ariaLabel: 'Follow us on Facebook' },
  { name: 'YouTube', href: 'https://youtube.com/surjomukhikg', icon: <YouTubeIcon />, ariaLabel: 'Subscribe to our YouTube channel' },
  { name: 'Instagram', href: 'https://instagram.com/surjomukhikg', icon: <InstagramIconAlt />, ariaLabel: 'Follow us on Instagram' }
] as const;

const ContactItem = memo<{ contact: ContactInfo }>(({ contact }) => (
  <div className={`${styles.contactItem} flex items-start space-x-3 text-sm`}>
    <div className={`${styles.contactIcon} text-blue-400 mt-0.5 flex-shrink-0`}>
      {contact.icon}
    </div>
    {contact.href ? (
      <a href={contact.href} className="text-slate-300 hover:text-white transition-colors duration-200" aria-label={contact.ariaLabel}>
        {contact.text}
      </a>
    ) : (
      <span className="text-slate-300">{contact.text}</span>
    )}
  </div>
));
ContactItem.displayName = 'ContactItem';

const NavLink = memo<{ link: FooterNavItem; translate: (key: string) => string }>(({ link, translate }) => (
  <li>
    <Link
      href={link.href}
      className={`${styles.navLink} text-slate-300 hover:text-white transition-colors duration-200 flex items-center group`}
      {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <span>{translate(link.labelKey)}</span>
      {link.external && <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
    </Link>
  </li>
));
NavLink.displayName = 'NavLink';

const Footer: React.FC<FooterProps> = ({
  className = '',
  showBackToTop = true,
  customNavigation,
  customSocialLinks,
  customContactInfo
}) => {
  const { t } = useTranslation();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const navigationData = useMemo(() => ({
    quickLinks: [
      { labelKey: 'navigation.aboutUs', href: '/about' },
      { labelKey: 'navigation.admission', href: '/admission' },
      { labelKey: 'navigation.teachers', href: '/teachers' },
      { labelKey: 'navigation.gallery', href: '/gallery' },
      { labelKey: 'navigation.contact', href: '/contact' },
    ] as FooterNavItem[],
    studentLinks: [
      { labelKey: 'navigation.notices', href: '/notices' },
      { labelKey: 'navigation.newsEvents', href: '/events' },
      { labelKey: 'navigation.downloads', href: '/downloads' },
      { labelKey: 'navigation.verifyCertificate', href: '/student/verify-certificate' },
    ] as FooterNavItem[],
    legalLinks: [
      { labelKey: 'footer.privacyPolicy', href: '/privacy-policy' },
      { labelKey: 'footer.termsOfService', href: '/terms-of-service' },
      { labelKey: 'navigation.contact', href: '/contact' },
    ] as FooterNavItem[]
  }), []);

  const contactInfo: ContactInfo[] = useMemo(() => customContactInfo || [
    { icon: <MapPin className="w-4 h-4" />, text: SCHOOL_INFO.address, type: 'address', ariaLabel: 'School address' },
    { icon: <Phone className="w-4 h-4" />, text: SCHOOL_INFO.phone, href: `tel:${SCHOOL_INFO.phone}`, type: 'phone', ariaLabel: 'Call us' },
    { icon: <Mail className="w-4 h-4" />, text: SCHOOL_INFO.email, href: `mailto:${SCHOOL_INFO.email}`, type: 'email', ariaLabel: 'Email us' },
    { icon: <Clock className="w-4 h-4" />, text: SCHOOL_INFO.officeHours, type: 'hours', ariaLabel: 'Office hours' }
  ], [customContactInfo]);

  const socialLinks = useMemo(() => customSocialLinks || SOCIAL_LINKS, [customSocialLinks]);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WPFooter",
    "copyrightYear": currentYear,
    "copyrightHolder": { "@type": "EducationalOrganization", "name": SCHOOL_INFO.name, "url": SCHOOL_INFO.website }
  }), [currentYear]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <footer className={`${styles.footer} text-white ${className}`} role="contentinfo">
        <div className={`${styles.footerContainer} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <Image src="/logo.webp" alt={`${SCHOOL_INFO.name} Logo`} width={48} height={48} className="h-12 w-auto" priority={false} />
                  <div className="ml-3">
                    <h2 className="text-xl font-bold text-white">{t('common.schoolName', SCHOOL_INFO.name)}</h2>
                    <p className="text-sm text-slate-400">{t('common.tagline', SCHOOL_INFO.tagline)}</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 max-w-md leading-relaxed">{t('footer.description', SCHOOL_INFO.description)}</p>

                <div className="space-y-3">
                  {contactInfo.map((contact, idx) => <ContactItem key={idx} contact={contact} />)}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.quickLinks', 'Quick Links')}</h3>
                <ul className="space-y-3">{(customNavigation?.main || navigationData.quickLinks).map(link => <NavLink key={link.href} link={link} translate={t} />)}</ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.studentResources', 'Student Resources')}</h3>
                <ul className="space-y-3">{(customNavigation?.resources || navigationData.studentLinks).map(link => <NavLink key={link.href} link={link} translate={t} />)}</ul>
              </div>
            </div>
          </div>

          <div className="py-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Single-line, clean, professional copyright - no bold text */}
              <div className="text-sm text-slate-400 text-center md:text-left">
                <p className="text-slate-300">
                  © {currentYear} {SCHOOL_INFO.name} • All rights reserved
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <nav className="flex items-center space-x-4 text-sm" aria-label="Legal navigation">
                  {navigationData.legalLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-slate-400 hover:text-white transition-colors duration-200">
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </nav>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-400 hidden sm:block">{t('footer.followUs', 'Follow us:')}</span>
                  <nav className="flex space-x-3" aria-label="Social media links">
                    {socialLinks.map(social => (
                      <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                         className={`${styles.socialLink} text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-all duration-200`}
                         aria-label={social.ariaLabel || `Follow us on ${social.name}`}>
                        {social.icon}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showBackToTop && <BackToTop showProgress />}
    </>
  );
};

Footer.displayName = 'Footer';

export default memo(Footer);