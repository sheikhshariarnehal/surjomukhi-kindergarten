/**
 * Image Optimization Script for Hero Images
 * 
 * This script compresses hero images to reduce file sizes
 * Run with: node scripts/optimize-hero-images.js
 * 
 * Prerequisites: npm install sharp
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const HERO_DIR = path.join(__dirname, '../public/hero');
const OUTPUT_DIR = path.join(__dirname, '../public/hero/optimized');

// Quality settings optimized for web performance
const QUALITY_SETTINGS = {
  webp: 70,  // Good balance of quality and size
  avif: 60,  // AVIF has better compression, can use lower quality
};

const TARGET_WIDTH = 1920; // Max width for hero images

async function optimizeImages() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(HERO_DIR).filter(f => 
    f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')
  );

  console.log(`Found ${files.length} images to optimize...`);

  for (const file of files) {
    const inputPath = path.join(HERO_DIR, file);
    const baseName = path.parse(file).name;

    try {
      const stats = fs.statSync(inputPath);
      const originalSizeKB = (stats.size / 1024).toFixed(2);

      // Optimize to WebP
      const webpOutput = path.join(OUTPUT_DIR, `${baseName}.webp`);
      await sharp(inputPath)
        .resize(TARGET_WIDTH, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY_SETTINGS.webp })
        .toFile(webpOutput);

      const webpStats = fs.statSync(webpOutput);
      const webpSizeKB = (webpStats.size / 1024).toFixed(2);
      const webpSavings = ((1 - webpStats.size / stats.size) * 100).toFixed(1);

      // Optimize to AVIF
      const avifOutput = path.join(OUTPUT_DIR, `${baseName}.avif`);
      await sharp(inputPath)
        .resize(TARGET_WIDTH, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .avif({ quality: QUALITY_SETTINGS.avif })
        .toFile(avifOutput);

      const avifStats = fs.statSync(avifOutput);
      const avifSizeKB = (avifStats.size / 1024).toFixed(2);
      const avifSavings = ((1 - avifStats.size / stats.size) * 100).toFixed(1);

      console.log(`✓ ${file}:`);
      console.log(`  Original: ${originalSizeKB} KB`);
      console.log(`  WebP:     ${webpSizeKB} KB (${webpSavings}% smaller)`);
      console.log(`  AVIF:     ${avifSizeKB} KB (${avifSavings}% smaller)`);
      console.log('');
    } catch (error) {
      console.error(`✗ Error optimizing ${file}:`, error.message);
    }
  }

  console.log('\nOptimization complete!');
  console.log(`Optimized images saved to: ${OUTPUT_DIR}`);
  console.log('\nTo use optimized images:');
  console.log('1. Review the optimized images in /public/hero/optimized');
  console.log('2. If quality is acceptable, copy them to /public/hero');
  console.log('3. Rebuild and redeploy your application');
}

optimizeImages().catch(console.error);
