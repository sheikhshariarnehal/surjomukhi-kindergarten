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
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BackToTop = dynamic(() => import('./BackToTop'), { loading: () => null, ssr: false });

const FacebookIcon = memo(() => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
));
FacebookIcon.displayName = 'FacebookIcon';

const YouTubeIcon = memo(() => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
  </svg>
));
YouTubeIcon.displayName = 'YouTubeIcon';

const InstagramIconAlt = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"/>
  </svg>
));
InstagramIconAlt.displayName = 'InstagramIconAlt';

const Footer: React.FC<{ className?: string; showBackToTop?: boolean }> = ({
  className = '',
  showBackToTop = true
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const quickLinks = useMemo(() => [
    { titleEn: 'About Us', titleBn: 'আমাদের সম্পর্কে', href: '/about' },
    { titleEn: 'Admissions', titleBn: 'ভর্তি কার্যক্রম', href: '/admission' },
    { titleEn: 'Our Faculty', titleBn: 'শিক্ষকমণ্ডলী', href: '/teachers' },
    { titleEn: 'Photo Gallery', titleBn: 'ফটো গ্যালারি', href: '/gallery' },
    { titleEn: 'Campus News', titleBn: 'ক্যাম্পাস সংবাদ', href: '/news' },
    { titleEn: 'Contact Us', titleBn: 'যোগাযোগ', href: '/contact' },
  ], []);

  const resourceLinks = useMemo(() => [
    { titleEn: 'Notice Board', titleBn: 'নোটিশ বোর্ড', href: '/notices' },
    { titleEn: 'Academic Calendar', titleBn: 'একাডেমিক ক্যালেন্ডার', href: '/academic/calendar' },
    { titleEn: 'Syllabus & Routine', titleBn: 'সিলেবাস ও রুটিন', href: '/academic/syllabus' },
    { titleEn: 'Downloads & Forms', titleBn: 'ডাউনলোড ও ফর্ম', href: '/downloads' },
    { titleEn: 'Student Conduct', titleBn: 'শৃঙ্খলা ও আচরণবিধি', href: '/student/rules' },
    { titleEn: 'Certificate Verification', titleBn: 'সার্টিফিকেট যাচাই', href: '/student/verify-certificate' },
  ], []);

  const socialLinks = useMemo(() => [
    { name: 'Facebook', href: 'https://facebook.com/surjomukhikg', icon: <FacebookIcon />, ariaLabel: isBn ? 'ফেসবুকে অনুসরণ করুন' : 'Follow on Facebook' },
    { name: 'YouTube', href: 'https://youtube.com/surjomukhikg', icon: <YouTubeIcon />, ariaLabel: isBn ? 'ইউটিউবে দেখুন' : 'Follow on YouTube' },
    { name: 'Instagram', href: 'https://instagram.com/surjomukhikg', icon: <InstagramIconAlt />, ariaLabel: isBn ? 'ইনস্টাগ্রামে দেখুন' : 'Follow on Instagram' },
  ], [isBn]);

  const legalLinks = useMemo(() => [
    { titleEn: 'Privacy Policy', titleBn: 'গোপনীয়তা নীতি', href: '/privacy-policy' },
    { titleEn: 'Terms of Service', titleBn: 'সেবার শর্তাবলী', href: '/terms-of-service' },
    { titleEn: 'Academic Rules', titleBn: 'একাডেমিক নিয়মাবলী', href: '/academic/rules' },
  ], []);

  return (
    <>
      <footer className={`bg-slate-950 text-slate-300 border-t border-slate-850 relative z-20 ${className}`} role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          {/* Main 4-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800/70">
            
            {/* 1. School Identity & Accreditation (4 columns on lg) */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-700/50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src="/logo.webp"
                    alt="Surjomukhi Kindergarten Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {isBn ? 'সূর্যমুখী কিন্ডারগার্টেন' : 'Surjomukhi Kindergarten'}
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {isBn ? '২০০৪ সাল থেকে প্রাথমিক শিক্ষায় উৎকর্ষতা' : 'Excellence in Primary Education Since 2004'}
                  </p>
                </div>
              </Link>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {isBn
                  ? 'প্লে গ্রুপ হতে ৫ম শ্রেণি পর্যন্ত মানসম্মত বাংলা মাধ্যম শিক্ষা, নৈতিক মূল্যবোধ ও আনন্দময় পরিবেশে ভবিষ্যৎ প্রজন্ম গঠনের বিশ্বস্ত প্রতিষ্ঠান।'
                  : 'Premier Bangla medium primary educational institution from Nursery to Grade 5, nurturing young minds with care, discipline, and creativity in Nawabganj, Dhaka.'}
              </p>

              {/* Minimalist Institutional Meta String */}
              <div className="text-[11px] text-slate-500 font-medium tracking-wide flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
                <span>{isBn ? 'ইআইআইএন: ০৬৩১০১৬০৫০৮' : 'EIIN: 06310160508'}</span>
                <span className="text-slate-700">•</span>
                <span>{isBn ? 'কোড: ৪২৪৫২৮' : 'Code: 424528'}</span>
                <span className="text-slate-700">•</span>
                <span>{isBn ? 'স্থাপিত: ২০০৪' : 'Estd: 2004'}</span>
              </div>
            </div>

            {/* 2. Quick Links (2.5 columns on lg) */}
            <div className="lg:col-span-2 sm:pl-2">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
                {isBn ? 'দ্রুত লিংক' : 'Quick Links'}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-150 block py-0.5"
                    >
                      {isBn ? link.titleBn : link.titleEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Academic Resources (2.5 columns on lg) */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
                {isBn ? 'শিক্ষার্থী সম্পদ' : 'Student Resources'}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-150 block py-0.5"
                    >
                      {isBn ? link.titleBn : link.titleEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Campus Contact & Office Hours (3 columns on lg) */}
            <div className="lg:col-span-3 space-y-3 text-xs text-slate-400">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
                {isBn ? 'যোগাযোগ ও তথ্য' : 'Campus Information'}
              </h3>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  {isBn
                    ? 'সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ, ঢাকা-১৩২০'
                    : 'Salauddin Complex, Aona Bazar, Nawabganj, Dhaka-1320'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <a
                  href="tel:+8801954113374"
                  className="hover:text-white transition-colors font-medium"
                >
                  {isBn ? '+৮৮০ ১৯৫৪-১১৩৩৭৪' : '+880 1954-113374'}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <a
                  href="mailto:info.surjamukhikindergarten@gmail.com"
                  className="hover:text-white transition-colors truncate"
                >
                  info.surjamukhikindergarten@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-0.5">
                <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed text-[11px] text-slate-400">
                  {isBn
                    ? 'শনিবার – বৃহস্পতিবার: সকাল ৮:০০ – বিকাল ৪:০০'
                    : 'Saturday – Thursday: 8:00 AM – 4:00 PM'}
                </span>
              </div>

              {/* Distilled, quiet admission pathway */}
              <div className="pt-2">
                <Link
                  href="/admission/apply-online"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <span>{isBn ? 'অনলাইনে ভর্তি আবেদন করুন' : 'Apply Online for Admission'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sub-Footer: Clean, balanced single line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            {/* Copyright */}
            <p className="text-slate-400 text-center sm:text-left">
              {isBn
                ? '© ২০২৬ সূর্যমুখী কিন্ডারগার্টেন • সর্বস্বত্ব সংরক্ষিত'
                : '© 2026 Surjomukhi Kindergarten • All rights reserved'}
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400 text-[11px]">
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-slate-200 transition-colors"
                >
                  {isBn ? item.titleBn : item.titleEn}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 text-slate-400">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:text-white hover:bg-slate-800/80 transition-colors"
                  aria-label={social.ariaLabel}
                >
                  {social.icon}
                </a>
              ))}
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