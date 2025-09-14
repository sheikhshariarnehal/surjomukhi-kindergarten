# Vercel Deployment Checklist

## Pre-Deployment Checklist

- [x] ✅ **Project Structure**: Next.js 15 project with proper structure
- [x] ✅ **Dependencies**: All dependencies are compatible with Vercel
- [x] ✅ **Build Test**: Project builds successfully (`npm run build`)
- [x] ✅ **Configuration Files**: 
  - `vercel.json` created with proper configuration
  - `next.config.ts` optimized for Vercel
  - `.env.example` created with all required variables
- [x] ✅ **Removed Incompatible Files**: 
  - Custom `server.js` removed (Vercel doesn't support custom servers)
  - cPanel deployment scripts removed

## Environment Variables Required

Make sure to set these in your Vercel project settings:

### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### App Configuration
- `NEXT_PUBLIC_APP_URL` (set to your Vercel deployment URL)
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_DESCRIPTION`

### Admin Configuration
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` (use a secure password for production)

### Security
- `JWT_SECRET` (generate a secure random string for production)

### Environment
- `NODE_ENV=production`

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Post-Deployment Setup**
   - Visit `https://your-app.vercel.app/api/setup` to initialize database
   - Visit `https://your-app.vercel.app/api/setup-storage` to create storage buckets
   - Test admin login at `https://your-app.vercel.app/dashboard`

## Important Notes

- ⚠️ **Custom Server**: Removed `server.js` as Vercel doesn't support custom servers
- ⚠️ **Environment Variables**: Make sure to update `NEXT_PUBLIC_APP_URL` to your actual Vercel URL
- ⚠️ **Security**: Change default admin password and generate a secure JWT secret
- ⚠️ **Database**: Run setup endpoints after first deployment to initialize database

## Troubleshooting

### Build Warnings
- Metadata viewport warnings are not critical and won't prevent deployment
- Missing `settingsSchema` warnings are handled gracefully in the code

### Common Issues
1. **Environment Variables**: Double-check all environment variables are set correctly
2. **Supabase Connection**: Ensure Supabase URL and keys are correct
3. **Database Setup**: Run `/api/setup` and `/api/setup-storage` after deployment

## Performance Optimizations

The project includes several optimizations for Vercel:
- Image optimization with Next.js Image component
- Static generation where possible
- API route optimization
- Proper caching headers
- Compressed assets

## Monitoring

After deployment, monitor:
- Build logs in Vercel dashboard
- Function execution times
- Error rates in Vercel analytics
- Database performance in Supabase dashboard
