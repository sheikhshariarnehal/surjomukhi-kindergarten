'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  description?: string;
}

interface StatsCounterProps {
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const useCountUp = (end: number, duration: number = 1800) => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
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

const StatItemBlock: React.FC<{ stat: StatItem; delay: number }> = ({ stat, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { count, startAnimation } = useCountUp(stat.value, 1600);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(startAnimation, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, startAnimation, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ 
        duration: 0.4, 
        delay: delay / 1000,
        ease: [0.25, 1, 0.5, 1]
      }}
      className="text-center px-4 sm:px-6 py-4 sm:py-2"
    >
      <div 
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight tabular-nums mb-1.5 sm:mb-2"
        itemProp="value"
        aria-label={`${stat.value}${stat.suffix || ''} ${stat.label}`}
      >
        <span>{isInView ? count : 0}</span>
        {stat.suffix && (
          <span className="text-blue-600 font-bold ml-0.5">{stat.suffix}</span>
        )}
      </div>
      
      <div 
        className="text-sm sm:text-base font-semibold text-gray-600 tracking-tight"
        itemProp="name"
      >
        {stat.label}
      </div>
      
      {stat.description && (
        <p className="sr-only" itemProp="description">
          {stat.description}
        </p>
      )}
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

  const defaultStats: StatItem[] = [
    {
      id: 'students',
      label: t('stats.students'),
      value: 450,
      suffix: '+',
      description: 'Active students enrolled in our kindergarten',
    },
    {
      id: 'teachers',
      label: t('stats.teachers'),
      value: 25,
      suffix: '+',
      description: 'Qualified and experienced educators',
    },
    {
      id: 'experience',
      label: t('stats.experience'),
      value: 20,
      suffix: '+',
      description: 'Years of educational excellence since 2004',
    },
    {
      id: 'classes',
      label: t('stats.classes'),
      value: 12,
      description: 'Well-structured classroom environments from Nursery to Grade 5',
    }
  ];

  const displayStats = stats || defaultStats;

  return (
    <section 
      className={`py-16 sm:py-20 lg:py-24 bg-white border-y border-gray-100 ${className}`}
      aria-labelledby="stats-heading"
      itemScope
      itemType="https://schema.org/EducationalOrganization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            id="stats-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight"
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

        {/* Distilled Stats Bar with Dividers */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-10 lg:gap-y-0 lg:divide-x lg:divide-gray-200/80"
          role="list"
          aria-label="Kindergarten statistics"
        >
          {displayStats.map((stat, index) => (
            <div key={stat.id} role="listitem">
              <StatItemBlock
                stat={stat}
                delay={index * 100}
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
      </div>
    </section>
  );
};

export default StatsCounter;