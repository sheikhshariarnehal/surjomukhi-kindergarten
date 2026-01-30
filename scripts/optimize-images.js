/**
 * Image Optimization Script
 * Compresses hero images to reduce LCP and improve performance
 * Run with: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const HERO_DIR = path.join(__dirname, '..', 'public', 'hero');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'hero', 'optimized');

// Configuration for image optimization
const CONFIG = {
  webp: {
    quality: 70, // Reduced from ~85 for smaller file size
    effort: 6,   // Higher effort = better compression
  },
  resize: {
    width: 1920,  // Max width for hero images
    height: 1080, // Max height
    fit: 'cover',
    withoutEnlargement: true,
  }
};

async function optimizeImages() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(HERO_DIR).filter(f => f.endsWith('.webp') && !f.includes('optimized'));

  console.log('🖼️  Starting image optimization...\n');

  for (const file of files) {
    const inputPath = path.join(HERO_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);
    
    try {
      const inputStats = fs.statSync(inputPath);
      const inputSize = (inputStats.size / 1024).toFixed(1);

      await sharp(inputPath)
        .resize(CONFIG.resize)
        .webp(CONFIG.webp)
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const outputSize = (outputStats.size / 1024).toFixed(1);
      const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   Before: ${inputSize} KB → After: ${outputSize} KB (${savings}% smaller)\n`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error.message);
    }
  }

  console.log('\n🎉 Optimization complete!');
  console.log('📁 Optimized images saved to:', OUTPUT_DIR);
  console.log('\nTo use optimized images, copy them to replace the originals:');
  console.log(`   copy "${OUTPUT_DIR}\\*" "${HERO_DIR}\\"`);
}

optimizeImages().catch(console.error);
