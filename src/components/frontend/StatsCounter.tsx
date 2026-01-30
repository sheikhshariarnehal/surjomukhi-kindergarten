'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description?: string;
}

interface StatsCounterProps {
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth easing function for better performance
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(end * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isActive]);

  const startAnimation = () => setIsActive(true);

  return { count, startAnimation };
};

const StatCard: React.FC<{ stat: StatItem; delay: number }> = ({ stat, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { count, startAnimation } = useCountUp(stat.value, 1800);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(startAnimation, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, startAnimation, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ 
        duration: 0.5, 
        delay: delay / 1000,
        type: "spring",
        stiffness: 100
      }}
      className="group"
    >
      <article 
        className="relative bg-white rounded-2xl shadow-sm p-6 sm:p-8 hover:shadow-xl active:shadow-lg transition-all duration-300 hover:-translate-y-2 active:-translate-y-1 border border-gray-100/80 h-full text-center overflow-hidden touch-manipulation select-none"
        itemScope
        itemType="https://schema.org/QuantitativeValue"
        style={{
          // Professional glass morphism effect
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.9) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Subtle gradient overlay on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          aria-hidden="true"
        />
        
        {/* Clean, minimal icon container */}
        <div className={`relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${stat.bgColor} mb-5 group-hover:scale-105 transition-all duration-300 mx-auto`}>
          <div className={`${stat.color}`} aria-hidden="true">
            {stat.icon}
          </div>
        </div>
        
        {/* Centered Number with professional typography */}
        <div 
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 ${stat.color} tabular-nums tracking-tight`}
          itemProp="value"
          aria-label={`${stat.value}${stat.suffix || ''} ${stat.label}`}
          style={{
            letterSpacing: '-0.02em',
            fontWeight: 700,
          }}
        >
          {isInView ? count : 0}{stat.suffix || ''}
        </div>
        
        {/* Centered Title with better typography */}
        <h3 
          className="text-gray-700 font-semibold text-sm sm:text-base lg:text-lg leading-tight tracking-wide"
          itemProp="name"
          style={{
            letterSpacing: '0.02em',
          }}
        >
          {stat.label}
        </h3>
        
        {stat.description && (
          <p className="sr-only" itemProp="description">
            {stat.description}
          </p>
        )}
      </article>
    </motion.div>
  );
};

const StatsCounter: React.FC<StatsCounterProps> = ({
  stats,
  title,
  subtitle,
  className = ""
}) => {
  const { t } = useTranslation();

  const displayTitle = title || t('stats.title');
  const displaySubtitle = subtitle || t('stats.subtitle');

  const defaultStatsWithTranslations: StatItem[] = [
    {
      id: 'students',
      label: t('stats.students'),
      value: 450,
      suffix: '+',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Active students enrolled in our kindergarten',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      id: 'teachers',
      label: t('stats.teachers'),
      value: 25,
      suffix: '+',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Qualified and experienced educators',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      id: 'experience',
      label: t('stats.experience'),
      value: 15,
      suffix: '+',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      description: 'Years of educational excellence',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'classes',
      label: t('stats.classes'),
      value: 12,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Well-structured classroom environments',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    }
  ];

  const displayStats = stats || defaultStatsWithTranslations;
  return (
    <section 
      className={`py-14 sm:py-20 lg:py-24 ${className}`}
      style={{ 
        background: 'linear-gradient(180deg, #FAFCFD 0%, #F0F7FF 50%, #FAFCFD 100%)',
      }}
      aria-labelledby="stats-heading"
      itemScope
      itemType="https://schema.org/EducationalOrganization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SEO optimized header with enhanced visual hierarchy */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="relative inline-block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl shadow-blue-500/25 transform hover:scale-105 transition-transform duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            {/* Decorative glow effect */}
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-blue-500/20 rounded-2xl sm:rounded-3xl blur-xl -z-10" />
          </div>
          
          <h2
            id="stats-heading"
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight"
            itemProp="name"
            style={{
              letterSpacing: '-0.02em',
            }}
          >
            {displayTitle}
          </h2>

          <p
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            itemProp="description"
          >
            {displaySubtitle}
          </p>
        </motion.header>

        {/* Stats Grid with enhanced spacing and visual rhythm */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          role="list"
          aria-label="Kindergarten statistics"
        >
          {displayStats.map((stat, index) => (
            <div key={stat.id} role="listitem">
              <StatCard
                stat={stat}
                delay={index * 150}
              />
            </div>
          ))}
        </div>

        {/* SEO-friendly structured data script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Surjomukhi Kindergarten",
              "description": "A thriving kindergarten community providing quality early childhood education",
              "numberOfStudents": displayStats.find(s => s.id === 'students')?.value || 0,
              "faculty": displayStats.find(s => s.id === 'teachers')?.value || 0,
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BD"
              }
            })
          }}
        />

        {/* Bottom decoration with accessibility improvements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-10 sm:mt-12"
          aria-hidden="true"
        >
          <div className="flex space-x-2" role="presentation">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsCounter;