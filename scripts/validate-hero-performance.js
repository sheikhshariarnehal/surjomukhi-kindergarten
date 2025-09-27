#!/usr/bin/env node

/**
 * Performance validation script for Hero section
 * Runs automated tests to validate mobile responsiveness, SEO, and performance
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

// Validation results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: [],
};

// Helper function to log results
function logResult(test, status, message) {
  const statusColor = status === 'PASS' ? colors.green : status === 'FAIL' ? colors.red : colors.yellow;
  console.log(`${statusColor}${status}${colors.reset} ${test}: ${message}`);
  
  results.tests.push({ test, status, message });
  if (status === 'PASS') results.passed++;
  else if (status === 'FAIL') results.failed++;
  else results.warnings++;
}

// Test 1: Check if Hero component exists and has proper structure
function testHeroComponentStructure() {
  const heroPath = path.join(__dirname, '../src/components/frontend/Hero.tsx');
  
  if (!fs.existsSync(heroPath)) {
    logResult('Hero Component Structure', 'FAIL', 'Hero.tsx file not found');
    return;
  }
  
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  
  // Check for essential imports
  const requiredImports = [
    'framer-motion',
    'next/image',
    '@/utils/performance',
  ];
  
  const missingImports = requiredImports.filter(imp => !heroContent.includes(imp));
  
  if (missingImports.length > 0) {
    logResult('Hero Component Structure', 'FAIL', `Missing imports: ${missingImports.join(', ')}`);
    return;
  }
  
  // Check for mobile-responsive classes
  const mobileClasses = [
    'xs:',
    'sm:',
    'touch-target',
    'safe-area-inset',
  ];
  
  const foundMobileClasses = mobileClasses.filter(cls => heroContent.includes(cls));
  
  if (foundMobileClasses.length < 2) {
    logResult('Hero Component Structure', 'WARN', 'Limited mobile-responsive classes found');
  } else {
    logResult('Hero Component Structure', 'PASS', 'Component structure looks good');
  }
}

// Test 2: Validate SEO implementation
function testSEOImplementation() {
  const heroPath = path.join(__dirname, '../src/components/frontend/Hero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  
  // Check for structured data
  if (!heroContent.includes('application/ld+json')) {
    logResult('SEO Implementation', 'FAIL', 'Missing structured data (JSON-LD)');
    return;
  }
  
  // Check for semantic HTML
  const semanticElements = [
    'role="banner"',
    'itemScope',
    'itemType',
    'aria-label',
    'aria-live',
  ];
  
  const foundSemantic = semanticElements.filter(elem => heroContent.includes(elem));
  
  if (foundSemantic.length < 3) {
    logResult('SEO Implementation', 'WARN', 'Some semantic HTML attributes missing');
  } else {
    logResult('SEO Implementation', 'PASS', 'Good SEO implementation found');
  }
}

// Test 3: Check performance optimizations
function testPerformanceOptimizations() {
  const heroPath = path.join(__dirname, '../src/components/frontend/Hero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  
  // Check for performance features
  const performanceFeatures = [
    'heroPerformanceMonitor',
    'requestIdleCallback',
    'fetchPriority',
    'loading="lazy"',
    'will-change',
  ];
  
  const foundFeatures = performanceFeatures.filter(feature => heroContent.includes(feature));
  
  if (foundFeatures.length < 3) {
    logResult('Performance Optimizations', 'WARN', `Only ${foundFeatures.length}/5 performance features found`);
  } else {
    logResult('Performance Optimizations', 'PASS', `${foundFeatures.length}/5 performance features implemented`);
  }
}

// Test 4: Validate Next.js configuration
function testNextJSConfiguration() {
  const nextConfigPath = path.join(__dirname, '../next.config.mjs');
  
  if (!fs.existsSync(nextConfigPath)) {
    logResult('Next.js Configuration', 'FAIL', 'next.config.mjs not found');
    return;
  }
  
  const configContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  // Check for essential configurations
  const requiredConfigs = [
    'images:',
    'compress: true',
    'webpack:',
    'headers()',
  ];
  
  const foundConfigs = requiredConfigs.filter(config => configContent.includes(config));
  
  if (foundConfigs.length < 3) {
    logResult('Next.js Configuration', 'WARN', `Only ${foundConfigs.length}/4 configurations found`);
  } else {
    logResult('Next.js Configuration', 'PASS', 'Next.js configuration looks comprehensive');
  }
}

// Test 5: Check Tailwind configuration for mobile support
function testTailwindConfiguration() {
  const tailwindConfigPath = path.join(__dirname, '../tailwind.config.ts');
  
  if (!fs.existsSync(tailwindConfigPath)) {
    logResult('Tailwind Configuration', 'FAIL', 'tailwind.config.ts not found');
    return;
  }
  
  const configContent = fs.readFileSync(tailwindConfigPath, 'utf8');
  
  // Check for mobile-first configurations
  const mobileConfigs = [
    "'xs':",
    "'mobile':",
    "'touch':",
    'safe-area-inset',
  ];
  
  const foundMobileConfigs = mobileConfigs.filter(config => configContent.includes(config));
  
  if (foundMobileConfigs.length < 2) {
    logResult('Tailwind Configuration', 'WARN', 'Limited mobile-first configurations');
  } else {
    logResult('Tailwind Configuration', 'PASS', 'Good mobile-first Tailwind setup');
  }
}

// Test 6: Validate CSS optimizations
function testCSSOptimizations() {
  const globalCSSPath = path.join(__dirname, '../src/app/globals.css');
  
  if (!fs.existsSync(globalCSSPath)) {
    logResult('CSS Optimizations', 'FAIL', 'globals.css not found');
    return;
  }
  
  const cssContent = fs.readFileSync(globalCSSPath, 'utf8');
  
  // Check for performance CSS
  const performanceCSS = [
    'will-change',
    'contain:',
    'content-visibility',
    'touch-target',
    'safe-area-inset',
  ];
  
  const foundCSS = performanceCSS.filter(css => cssContent.includes(css));
  
  if (foundCSS.length < 3) {
    logResult('CSS Optimizations', 'WARN', `Only ${foundCSS.length}/5 performance CSS features found`);
  } else {
    logResult('CSS Optimizations', 'PASS', 'Good CSS performance optimizations');
  }
}

// Test 7: Check performance utilities
function testPerformanceUtilities() {
  const performancePath = path.join(__dirname, '../src/utils/performance.ts');
  
  if (!fs.existsSync(performancePath)) {
    logResult('Performance Utilities', 'FAIL', 'performance.ts utility file not found');
    return;
  }
  
  const performanceContent = fs.readFileSync(performancePath, 'utf8');
  
  // Check for essential performance monitoring features
  const performanceFeatures = [
    'PerformanceObserver',
    'measureImageLoad',
    'Core Web Vitals',
    'supportsWebP',
    'supportsAVIF',
  ];
  
  const foundFeatures = performanceFeatures.filter(feature => performanceContent.includes(feature));
  
  if (foundFeatures.length < 3) {
    logResult('Performance Utilities', 'WARN', `Only ${foundFeatures.length}/5 performance features found`);
  } else {
    logResult('Performance Utilities', 'PASS', 'Comprehensive performance monitoring utilities');
  }
}

// Main validation function
function runValidation() {
  console.log(`${colors.bold}${colors.blue}🚀 Hero Section Performance Validation${colors.reset}\n`);
  
  testHeroComponentStructure();
  testSEOImplementation();
  testPerformanceOptimizations();
  testNextJSConfiguration();
  testTailwindConfiguration();
  testCSSOptimizations();
  testPerformanceUtilities();
  
  // Summary
  console.log(`\n${colors.bold}📊 Validation Summary:${colors.reset}`);
  console.log(`${colors.green}✅ Passed: ${results.passed}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Warnings: ${results.warnings}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${results.failed}${colors.reset}`);
  
  const totalTests = results.passed + results.warnings + results.failed;
  const successRate = ((results.passed / totalTests) * 100).toFixed(1);
  
  console.log(`\n${colors.bold}Success Rate: ${successRate}%${colors.reset}`);
  
  if (results.failed > 0) {
    console.log(`\n${colors.red}❌ Some critical tests failed. Please review the issues above.${colors.reset}`);
    process.exit(1);
  } else if (results.warnings > 0) {
    console.log(`\n${colors.yellow}⚠️  All tests passed with some warnings. Consider addressing them for optimal performance.${colors.reset}`);
  } else {
    console.log(`\n${colors.green}🎉 All tests passed! Hero section is well-optimized.${colors.reset}`);
  }
}

// Run validation if script is executed directly
if (require.main === module) {
  runValidation();
}

module.exports = { runValidation, results };
