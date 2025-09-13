#!/bin/bash

# cPanel Deployment Script for Surjomukhi Kindergarten Website
# This script helps deploy the Next.js application to cPanel hosting

echo "🚀 Starting cPanel deployment process..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Step 2: Build the application
echo "🔨 Building the application..."
npm run build

# Step 3: Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deployment-package

# Copy necessary files for cPanel
cp -r .next deployment-package/
cp -r public deployment-package/
cp package.json deployment-package/
cp package-lock.json deployment-package/
cp next.config.ts deployment-package/
cp -r src deployment-package/

# Copy environment file template
cp .env.production deployment-package/.env.local.template

# Create cPanel-specific files
cat > deployment-package/.htaccess << 'EOF'
# Next.js cPanel Configuration
RewriteEngine On

# Handle Next.js static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.js [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>

# Compress files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
EOF

# Create server.js for cPanel Node.js hosting
cat > deployment-package/server.js << 'EOF'
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
EOF

# Create deployment instructions
cat > deployment-package/DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# cPanel Deployment Instructions for Surjomukhi Kindergarten

## Prerequisites
1. cPanel hosting with Node.js support (version 18 or higher)
2. Access to cPanel File Manager or FTP
3. Database access (Supabase account)

## Deployment Steps

### 1. Upload Files
1. Upload all files from this deployment-package to your cPanel public_html directory
2. If using a subdomain, upload to the subdomain's directory

### 2. Configure Environment Variables
1. Rename `.env.local.template` to `.env.local`
2. Update all environment variables with your actual values:
   - Supabase URL and keys
   - Your domain name
   - SMTP settings (if using email features)
   - Analytics IDs (optional)

### 3. Set up Node.js Application in cPanel
1. Go to cPanel → Node.js Apps
2. Click "Create App"
3. Set Node.js version to 18 or higher
4. Set Application Root to your domain directory
5. Set Application URL to your domain
6. Set Startup File to `server.js`
7. Click "Create"

### 4. Install Dependencies
1. In cPanel Node.js Apps, click "Run NPM Install"
2. Wait for installation to complete

### 5. Configure Database
1. Ensure your Supabase database is properly configured
2. Run any necessary database migrations
3. Verify database connection in .env.local

### 6. Start the Application
1. In cPanel Node.js Apps, click "Start App"
2. Your website should now be live!

## Post-Deployment Checklist
- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Images are displaying
- [ ] Forms are working
- [ ] Database connections are working
- [ ] SSL certificate is installed
- [ ] Domain is pointing correctly

## Troubleshooting
- Check cPanel Error Logs if the site doesn't load
- Verify all environment variables are set correctly
- Ensure Node.js version is compatible
- Check file permissions (755 for directories, 644 for files)

## Support
For technical support, contact your hosting provider or refer to the project documentation.
EOF

echo "✅ Deployment package created successfully!"
echo "📁 Files are ready in the 'deployment-package' directory"
echo "📖 Please read DEPLOYMENT_INSTRUCTIONS.md for detailed deployment steps"

# Create a zip file for easy upload
if command -v zip &> /dev/null; then
    echo "📦 Creating zip file for easy upload..."
    cd deployment-package
    zip -r ../surjomukhi-kindergarten-cpanel.zip .
    cd ..
    echo "✅ Zip file created: surjomukhi-kindergarten-cpanel.zip"
fi

echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Upload the deployment-package contents to your cPanel"
echo "2. Follow the instructions in DEPLOYMENT_INSTRUCTIONS.md"
echo "3. Configure your environment variables"
echo "4. Set up the Node.js application in cPanel"
echo ""
echo "Good luck with your deployment! 🚀"
