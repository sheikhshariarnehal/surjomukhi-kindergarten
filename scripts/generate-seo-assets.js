const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SEO image sizes needed
const seoImages = [
  { width: 1200, height: 630, name: 'og-home.jpg', format: 'jpeg' },
  { width: 800, height: 800, name: 'og-logo.png', format: 'png' },
  { width: 1200, height: 630, name: 'twitter-card.jpg', format: 'jpeg' },
];

async function generateSEOAssets() {
  const logoPath = path.join(__dirname, '../public/logo.webp');
  const publicDir = path.join(__dirname, '../public');

  if (!fs.existsSync(logoPath)) {
    console.error('Logo file not found at:', logoPath);
    return;
  }

  try {
    console.log('Generating SEO assets from logo.webp...');

    // Generate og-home.jpg (1200x630) - Logo centered on branded background
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 3,
        background: { r: 37, g: 99, b: 235 } // Blue brand color
      }
    })
    .composite([
      {
        input: await sharp(logoPath)
          .resize(300, 300, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
          .png()
          .toBuffer(),
        top: 165, // Center vertically (630-300)/2
        left: 450, // Center horizontally (1200-300)/2
      },
      {
        input: Buffer.from(`
          <svg width="1200" height="630">
            <text x="600" y="500" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">
              Surjamukhi Kindergarten
            </text>
            <text x="600" y="550" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">
              Excellence in Early Childhood Education
            </text>
          </svg>
        `),
        top: 0,
        left: 0,
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'og-home.jpg'));

    console.log('Generated og-home.jpg');

    // Generate og-logo.png (800x800) - Logo on white background
    await sharp({
      create: {
        width: 800,
        height: 800,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([
      {
        input: await sharp(logoPath)
          .resize(600, 600, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
          .png()
          .toBuffer(),
        top: 100, // Center vertically
        left: 100, // Center horizontally
      }
    ])
    .png()
    .toFile(path.join(publicDir, 'og-logo.png'));

    console.log('Generated og-logo.png');

    // Generate twitter-card.jpg (same as og-home but optimized for Twitter)
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 3,
        background: { r: 37, g: 99, b: 235 }
      }
    })
    .composite([
      {
        input: await sharp(logoPath)
          .resize(280, 280, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
          .png()
          .toBuffer(),
        top: 175,
        left: 460,
      }
    ])
    .jpeg({ quality: 85 })
    .toFile(path.join(publicDir, 'twitter-card.jpg'));

    console.log('Generated twitter-card.jpg');

    console.log('All SEO assets generated successfully!');
  } catch (error) {
    console.error('Error generating SEO assets:', error);
  }
}

// Run if called directly
if (require.main === module) {
  generateSEOAssets();
}

module.exports = generateSEOAssets;
