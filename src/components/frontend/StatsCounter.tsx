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
        className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full text-center"
        itemScope
        itemType="https://schema.org/QuantitativeValue"
      >
        {/* Centered Icon */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${stat.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
          <div className={stat.color} aria-hidden="true">
            {stat.icon}
          </div>
        </div>
        
        {/* Centered Number */}
        <div 
          className={`text-3xl sm:text-4xl font-bold mb-2 ${stat.color} tabular-nums`}
          itemProp="value"
          aria-label={`${stat.value}${stat.suffix || ''} ${stat.label}`}
        >
          {isInView ? count : 0}{stat.suffix || ''}
        </div>
        
        {/* Centered Title */}
        <h3 
          className="text-gray-700 font-semibold text-sm sm:text-base leading-tight"
          itemProp="name"
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
      bgColor: 'bg-blue-100',
      description: 'Active students enrolled in our kindergarten',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'teachers',
      label: t('stats.teachers'),
      value: 25,
      suffix: '+',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      description: 'Qualified and experienced educators',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'experience',
      label: t('stats.experience'),
      value: 15,
      suffix: '+',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Years of educational excellence',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'classes',
      label: t('stats.classes'),
      value: 12,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Well-structured classroom environments',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    }
  ];

  const displayStats = stats || defaultStatsWithTranslations;
  return (
    <section 
      className={`py-12 sm:py-16 ${className}`}
      style={{ backgroundColor: '#FAFCFD' }}
      aria-labelledby="stats-heading"
      itemScope
      itemType="https://schema.org/EducationalOrganization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SEO optimized header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          
          <h2
            id="stats-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight"
            itemProp="name"
          >
            {displayTitle}
          </h2>

          <p
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            itemProp="description"
          >
            {displaySubtitle}
          </p>
        </motion.header>

        {/* Stats Grid with proper semantic markup */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
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