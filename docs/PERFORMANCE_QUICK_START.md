# 🚀 Performance Optimization - Quick Start Guide

## Immediate Actions (Do this now)

### 1. Install Dependencies (if needed)
```bash
npm install --save-dev @next/bundle-analyzer
```

### 2. Build and Test
```bash
# Create production build
npm run build

# Check bundle sizes
npm run build 2>&1 | findstr /C:"Route (app)" /C:"First Load JS"

# Start production server locally
npm start
```

### 3. Run Performance Tests
```bash
# Open in browser
http://localhost:3000

# Run Lighthouse
# Press F12 > Lighthouse tab > Generate Report
```

---

## What Changed? 

### ✅ Files Modified
1. **`src/app/layout.tsx`**
   - Added font-display: swap
   - Added resource hints (dns-prefetch, preconnect)
   - Inlined critical CSS

2. **`next.config.ts`**
   - Enhanced webpack splitting
   - Optimized chunks for better caching

3. **`src/utils/lightAnimation.ts`** (NEW)
   - Lightweight animation utilities
   - Alternative to Framer Motion for simple animations

4. **`src/app/critical.css`** (NEW)
   - Critical above-the-fold styles
   - Inlined in head for instant render

---

## Expected Results

### Before Optimization
- Performance Score: **72/100**
- FCP: ~1.8s
- LCP: ~2.5s
- Bundle: ~250KB

### After Optimization
- Performance Score: **90+/100** ⬆️
- FCP: ~1.0s ⬆️
- LCP: ~1.5s ⬆️
- Bundle: ~160KB ⬇️

---

## How to Use New Light Animations

### Instead of Framer Motion (for simple effects):

```typescript
// OLD (Heavy - 100KB)
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Content
</motion.div>

// NEW (Light - 2KB)
import { useFadeIn, useIntersectionObserver } from '@/utils/lightAnimation';

function Component() {
  const fadeProps = useFadeIn(200);
  return <div {...fadeProps}>Content</div>;
}

// For scroll animations
function ScrollComponent() {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <div 
      ref={ref}
      className={`transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      Content
    </div>
  );
}
```

---

## Verification Steps

### 1. Check Bundle Sizes
```bash
npm run build
```

Look for:
- ✅ First Load JS should be < 200KB
- ✅ Shared chunks created (framework, framer-motion, lib)

### 2. Run Lighthouse
1. Open Chrome DevTools (F12)
2. Navigate to Lighthouse tab
3. Select "Performance" only
4. Click "Generate report"
5. **Target: 90+ score**

### 3. Test on Mobile
1. Chrome DevTools > Toggle device toolbar
2. Select "Moto G Power"
3. Set throttling to "Slow 3G"
4. Run Lighthouse again
5. **Target: 85+ score**

---

## Troubleshooting

### Issue: Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Issue: TypeScript errors
```bash
# Type check
npm run type-check
```

### Issue: Performance not improved
1. Test in incognito mode
2. Clear browser cache
3. Ensure production build (`npm run build && npm start`)
4. Check network throttling is off for baseline

---

## Next Steps

### Optional Enhancements

#### 1. Replace heavy Framer Motion usage
Find all uses:
```bash
npx grep-search "from 'framer-motion'" --extension tsx
```

Consider replacing with light animations where appropriate.

#### 2. Add Service Worker
```bash
# Install Workbox
npm install --save-dev workbox-webpack-plugin

# Configure in next.config.ts
```

#### 3. Optimize Images
```bash
# Convert all images to WebP
npm install --save-dev sharp
node scripts/convert-images-to-webp.js
```

---

## Monitoring Performance

### Production Monitoring
1. **Vercel Analytics**: Already active ✅
2. **Check Real User Metrics**: Vercel Dashboard > Analytics
3. **Core Web Vitals**: Check daily for regressions

### Local Testing
```bash
# Run Lighthouse CI
npx lighthouse http://localhost:3000 \
  --only-categories=performance \
  --view

# Analyze bundle
npm run build
npx @next/bundle-analyzer
```

---

## Questions?

Refer to:
- 📄 **Full report**: `docs/PERFORMANCE_OPTIMIZATION.md`
- 📊 **Lighthouse report**: Check browser DevTools
- 📦 **Bundle analysis**: Run `npm run build`

---

**Remember:** Always test in production mode!  
Development mode is slower due to extra debugging tools.

```bash
# Production test
npm run build
npm start
```
