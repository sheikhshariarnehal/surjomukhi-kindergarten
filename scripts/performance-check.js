/**
 * Performance Comparison Script
 * 
 * This script helps measure and compare performance improvements
 * Run: node scripts/performance-check.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 Performance Optimization Check\n');
console.log('='.repeat(50));

// Check if build directory exists
const buildDir = path.join(__dirname, '../.next');
if (!fs.existsSync(buildDir)) {
  console.log('\n❌ Build directory not found.');
  console.log('📦 Running build first...\n');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

console.log('\n✅ Optimizations Applied:\n');

const checks = [
  {
    name: 'Font Display Swap',
    file: 'src/app/layout.tsx',
    pattern: /display:\s*["']swap["']/,
    description: 'Prevents invisible text during font load'
  },
  {
    name: 'Resource Hints',
    file: 'src/app/layout.tsx',
    pattern: /rel=["']dns-prefetch["']/,
    description: 'DNS prefetch for faster external resources'
  },
  {
    name: 'Critical CSS',
    file: 'src/app/layout.tsx',
    pattern: /dangerouslySetInnerHTML.*box-sizing/s,
    description: 'Inlined critical CSS for faster FCP'
  },
  {
    name: 'Webpack Splitting',
    file: 'next.config.ts',
    pattern: /splitChunks.*chunks.*all/s,
    description: 'Advanced code splitting for smaller bundles'
  },
  {
    name: 'Light Animation Utils',
    file: 'src/utils/lightAnimation.ts',
    pattern: /export function useFadeIn/,
    description: 'Lightweight animation alternative'
  }
];

let passedChecks = 0;
checks.forEach(check => {
  try {
    const filePath = path.join(__dirname, '..', check.file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (check.pattern.test(content)) {
      console.log(`✅ ${check.name}`);
      console.log(`   ${check.description}\n`);
      passedChecks++;
    } else {
      console.log(`❌ ${check.name} - NOT FOUND`);
      console.log(`   File: ${check.file}\n`);
    }
  } catch (error) {
    console.log(`⚠️  ${check.name} - FILE NOT FOUND`);
    console.log(`   ${check.file}\n`);
  }
});

console.log('='.repeat(50));
console.log(`\n📊 Result: ${passedChecks}/${checks.length} optimizations applied\n`);

if (passedChecks === checks.length) {
  console.log('🎉 All optimizations successfully applied!\n');
  console.log('Next steps:');
  console.log('1. Run: npm run build');
  console.log('2. Run: npm start');
  console.log('3. Open: http://localhost:3000');
  console.log('4. Test: Chrome DevTools > Lighthouse\n');
} else {
  console.log('⚠️  Some optimizations are missing.');
  console.log('   Review the files above and apply missing changes.\n');
}

// Check bundle sizes if build exists
console.log('='.repeat(50));
console.log('\n📦 Bundle Size Analysis\n');

try {
  const buildManifest = path.join(buildDir, 'build-manifest.json');
  if (fs.existsSync(buildManifest)) {
    const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
    
    console.log('Static Files:');
    const pages = manifest.pages || {};
    Object.keys(pages).slice(0, 5).forEach(page => {
      const files = pages[page];
      const jsFiles = files.filter(f => f.endsWith('.js'));
      console.log(`  ${page}:`);
      jsFiles.forEach(file => {
        const filePath = path.join(buildDir, file);
        if (fs.existsSync(filePath)) {
          const size = fs.statSync(filePath).size;
          const sizeKB = (size / 1024).toFixed(2);
          console.log(`    - ${path.basename(file)}: ${sizeKB} KB`);
        }
      });
    });
    console.log('\n');
  } else {
    console.log('⚠️  Build manifest not found. Run npm run build first.\n');
  }
} catch (error) {
  console.log('⚠️  Could not analyze bundle sizes.\n');
}

console.log('='.repeat(50));
console.log('\n📈 Performance Targets\n');

const targets = [
  { metric: 'Performance Score', current: '72', target: '90+', status: '🎯' },
  { metric: 'FCP', current: '~1.8s', target: '<1.2s', status: '🎯' },
  { metric: 'LCP', current: '~2.5s', target: '<2.0s', status: '🎯' },
  { metric: 'TBT', current: '~400ms', target: '<200ms', status: '🎯' },
  { metric: 'Bundle Size', current: '~250KB', target: '<180KB', status: '🎯' }
];

console.log('Metric              Current    Target     Status');
console.log('-'.repeat(50));
targets.forEach(({ metric, current, target, status }) => {
  console.log(`${metric.padEnd(18)} ${current.padEnd(10)} ${target.padEnd(10)} ${status}`);
});

console.log('\n' + '='.repeat(50));
console.log('\n📚 Documentation:\n');
console.log('  Full Report: docs/PERFORMANCE_OPTIMIZATION.md');
console.log('  Quick Start: docs/PERFORMANCE_QUICK_START.md\n');

console.log('='.repeat(50) + '\n');
