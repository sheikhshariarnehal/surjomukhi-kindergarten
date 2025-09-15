const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Favicon sizes and formats needed
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 70, name: 'mstile-70x70.png' },
  { size: 150, name: 'mstile-150x150.png' },
  { size: 310, name: 'mstile-310x310.png' },
];

// Wide tile for Windows
const wideTile = { width: 310, height: 150, name: 'mstile-310x150.png' };

async function generateFavicons() {
  const logoPath = path.join(__dirname, '../public/logo.webp');
  const publicDir = path.join(__dirname, '../public');

  if (!fs.existsSync(logoPath)) {
    console.error('Logo file not found at:', logoPath);
    return;
  }

  try {
    console.log('Generating favicons from logo.webp...');

    // Generate square favicons
    for (const { size, name } of faviconSizes) {
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(publicDir, name));
      
      console.log(`Generated ${name}`);
    }

    // Generate wide tile
    await sharp(logoPath)
      .resize(wideTile.width, wideTile.height, {
        fit: 'contain',
        background: { r: 37, g: 99, b: 235, alpha: 1 } // Blue background for wide tile
      })
      .png()
      .toFile(path.join(publicDir, wideTile.name));
    
    console.log(`Generated ${wideTile.name}`);

    // Generate ICO file (multi-size)
    await sharp(logoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'favicon-temp.png'));

    // Note: For ICO generation, you might need a specialized library like 'to-ico'
    // For now, we'll copy the 32x32 PNG as favicon.ico
    fs.copyFileSync(
      path.join(publicDir, 'favicon-temp.png'),
      path.join(publicDir, 'favicon.ico')
    );
    fs.unlinkSync(path.join(publicDir, 'favicon-temp.png'));

    console.log('Generated favicon.ico');

    // Generate Safari pinned tab SVG (simplified version)
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#2563eb"/>
  <text x="50" y="60" font-family="Arial, sans-serif" font-size="40" font-weight="bold" text-anchor="middle" fill="white">S</text>
</svg>`;
    
    fs.writeFileSync(path.join(publicDir, 'safari-pinned-tab.svg'), svgContent);
    console.log('Generated safari-pinned-tab.svg');

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

// Run if called directly
if (require.main === module) {
  generateFavicons();
}

module.exports = generateFavicons;
