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
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Footer.module.css';

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
    { titleEn: 'Admissions Hub', titleBn: 'ভর্তি কার্যক্রম', href: '/admission' },
    { titleEn: 'Our Faculty', titleBn: 'শিক্ষকমণ্ডলী', href: '/teachers' },
    { titleEn: 'Photo Gallery', titleBn: 'ফটো গ্যালারি', href: '/gallery' },
    { titleEn: 'Campus News', titleBn: 'ক্যাম্পাস সংবাদ', href: '/news' },
    { titleEn: 'Contact Us', titleBn: 'যোগাযোগ ও হেল্পডেস্ক', href: '/contact' },
  ], []);

  const resourceLinks = useMemo(() => [
    { titleEn: 'Notice Board', titleBn: 'নোটিশ বোর্ড', href: '/notices' },
    { titleEn: 'Academic Calendar', titleBn: 'একাডেমিক ক্যালেন্ডার', href: '/academic/calendar' },
    { titleEn: 'Syllabus & Routine', titleBn: 'সিলেবাস ও রুটিন', href: '/academic/syllabus' },
    { titleEn: 'Downloads & Forms', titleBn: 'ডাউনলোড ও ফর্ম', href: '/downloads' },
    { titleEn: 'Student Code of Conduct', titleBn: 'শৃঙ্খলা ও আচরণবিধি', href: '/student/rules' },
    { titleEn: 'Certificate Verification', titleBn: 'সার্টিফিকেট যাচাইকরণ', href: '/student/verify-certificate' },
  ], []);

  const socialLinks = useMemo(() => [
    { name: 'Facebook', href: 'https://facebook.com/surjomukhikg', icon: <FacebookIcon />, ariaLabel: isBn ? 'ফেসবুকে অনুসরণ করুন' : 'Follow us on Facebook' },
    { name: 'YouTube', href: 'https://youtube.com/surjomukhikg', icon: <YouTubeIcon />, ariaLabel: isBn ? 'ইউটিউবে সাবস্ক্রাইব করুন' : 'Subscribe to YouTube' },
    { name: 'Instagram', href: 'https://instagram.com/surjomukhikg', icon: <InstagramIconAlt />, ariaLabel: isBn ? 'ইনস্টাগ্রামে দেখুন' : 'Follow on Instagram' },
  ], [isBn]);

  const legalLinks = useMemo(() => [
    { titleEn: 'Privacy Policy', titleBn: 'গোপনীয়তা নীতি', href: '/privacy-policy' },
    { titleEn: 'Terms of Service', titleBn: 'সেবার শর্তাবলী', href: '/terms-of-service' },
    { titleEn: 'Academic Rules', titleBn: 'একাডেমিক নিয়মাবলী', href: '/academic/rules' },
  ], []);

  return (
    <>
      <footer className={`${styles.footer} bg-slate-950 text-slate-200 border-t border-slate-800/80 relative z-20 ${className}`} role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-12">
          {/* Main 4-Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/90">
            {/* Column 1: School Brand & Mission (4 cols on lg) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <Link href="/" className="inline-flex items-center gap-3 group mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white p-1 shadow-md border border-slate-700/60 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Image
                      src="/logo.webp"
                      alt="Surjomukhi Kindergarten Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {isBn ? 'সূর্যমুখী কিন্ডারগার্টেন' : 'Surjomukhi Kindergarten'}
                    </h2>
                    <p className="text-xs text-blue-400 font-medium tracking-wide">
                      {isBn ? '২০০৪ সাল থেকে প্রাথমিক শিক্ষায় উৎকর্ষতা' : 'Excellence in Primary Education Since 2004'}
                    </p>
                  </div>
                </Link>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {isBn
                    ? 'নবাবগঞ্জ, ঢাকায় প্লে গ্রুপ হতে ৫ম শ্রেণি পর্যন্ত মানসম্মত বাংলা মাধ্যম শিক্ষা, নৈতিক মূল্যবোধ ও শিশুবান্ধব আনন্দময় পরিবেশ নিশ্চিতকরণে আমরা প্রতিশ্রুতিবদ্ধ।'
                    : 'Premier Bangla medium primary educational institution from Nursery to Grade 5, nurturing bright minds with care, discipline, and creativity in Nawabganj, Dhaka.'}
                </p>

                {/* Institutional Identification Badges */}
                <div className="flex flex-wrap gap-2 text-[11px] font-medium text-slate-300">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                    {isBn ? 'ইআইআইএন: ০৬৩১০১৬০৫০৮' : 'EIIN: 06310160508'}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                    {isBn ? 'প্রতিষ্ঠান কোড: ৪২৪৫২৮' : 'Code: 424528'}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 border border-blue-900/60">
                    {isBn ? 'স্থাপিত: ২০০৪' : 'Estd: 2004'}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links (2.5 cols on lg) */}
            <div className="lg:col-span-2 sm:pl-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {isBn ? 'দ্রুত লিংক' : 'Quick Links'}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors flex items-center group gap-1.5"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                      <span>{isBn ? link.titleBn : link.titleEn}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Student & Parent Resources (2.5 cols on lg) */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {isBn ? 'শিক্ষার্থী ও অভিভাবক সম্পদ' : 'Academic Resources'}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center group gap-1.5"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                      <span>{isBn ? link.titleBn : link.titleEn}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Direct Hotline (3 cols on lg) */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {isBn ? 'যোগাযোগ ও তথ্যসেবা' : 'Campus & Hotline'}
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">
                    {isBn
                      ? 'সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ, ঢাকা-১৩২০'
                      : 'Salauddin Complex, Aona Bazar, Nawabganj, Dhaka-1320'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <a
                    href="tel:+8801954113374"
                    className="hover:text-emerald-300 font-semibold transition-colors"
                  >
                    {isBn ? '+৮৮০ ১৯৫৪-১১৩৩৭৪' : '+880 1954-113374'}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <a
                    href="mailto:info.surjamukhikindergarten@gmail.com"
                    className="hover:text-amber-300 truncate transition-colors text-xs"
                  >
                    info.surjamukhikindergarten@gmail.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs leading-snug">
                    {isBn
                      ? 'শনিবার – বৃহস্পতিবার: সকাল ৮:০০ – বিকাল ৪:০০ (শুক্রবার বন্ধ)'
                      : 'Saturday – Thursday: 8:00 AM – 4:00 PM (Friday Closed)'}
                  </span>
                </div>

                {/* Direct Online Admission CTA Button */}
                <div className="pt-2">
                  <Link
                    href="/admission/apply-online"
                    className="inline-flex items-center justify-center w-full gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-all shadow-xs"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>{isBn ? 'অনলাইনে ভর্তি আবেদন' : 'Apply for Admission'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Footer: Copyright, Legal Links, Social Connect */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            {/* Copyright Note */}
            <div className="text-center md:text-left">
              <p>
                {isBn
                  ? '© ২০২৬ সূর্যমুখী কিন্ডারগার্টেন • সর্বস্বত্ব সংরক্ষিত'
                  : '© 2026 Surjomukhi Kindergarten • All rights reserved'}
              </p>
            </div>

            {/* Legal / Policy Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
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

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                {isBn ? 'সামাজিক মাধ্যম:' : 'Connect:'}
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all"
                    aria-label={social.ariaLabel}
                  >
                    {social.icon}
                  </a>
                ))}
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