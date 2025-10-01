# Hero Section Quick Start Guide

## 🚀 Getting Started

This guide helps you quickly understand and work with the optimized Hero section component.

---

## 📁 File Structure

```
src/
├── components/
│   └── frontend/
│       └── Hero.tsx              # Main Hero component
├── locales/
│   ├── en.json                   # English translations
│   └── bn.json                   # Bangla translations
├── contexts/
│   └── LanguageContext.tsx       # Translation system
└── utils/
    └── performance.ts            # Performance monitoring

docs/
├── HERO_COMPLETE_SUMMARY.md      # Complete overview
├── HERO_PHASE2_OPTIMIZATIONS.md  # Phase 2 details
├── HERO_TYPOGRAPHY_GUIDE.md      # Typography specs
├── HERO_BILINGUAL_GUIDE.md       # Translation guide
├── HERO_PHASE2_TESTING_CHECKLIST.md # Testing checklist
└── HERO_QUICK_START.md           # This file
```

---

## 🎯 Key Features

### 1. Professional Typography
- Responsive font sizing across all breakpoints
- Optimal line-height and letter-spacing
- WCAG AA compliant contrast ratios
- Bilingual font support (English/Bangla)

### 2. Smooth Animations
- 60 FPS performance
- Stagger effects for content reveal
- Micro-interactions on hover/tap
- Reduced motion support

### 3. Bilingual Support
- Full English and Bangla translations
- Instant language switching
- SEO-friendly implementation
- Proper Unicode rendering

### 4. SEO Optimized
- Schema.org structured data
- Semantic HTML5
- Optimized image alt text
- Ready for Open Graph and Twitter Cards

### 5. Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Touch gesture support

---

## 🔧 Basic Usage

### Import and Use

```typescript
import Hero from '@/components/frontend/Hero';

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Other components */}
    </main>
  );
}
```

That's it! The Hero component is fully self-contained and ready to use.

---

## 🌐 Adding/Editing Translations

### Step 1: Add English Translation

Edit `src/locales/en.json`:

```json
{
  "hero": {
    "newKey": "Your English Text Here"
  }
}
```

### Step 2: Add Bangla Translation

Edit `src/locales/bn.json`:

```json
{
  "hero": {
    "newKey": "আপনার বাংলা টেক্সট এখানে"
  }
}
```

### Step 3: Use in Component

```typescript
const { t } = useTranslation();

<p>{t('hero.newKey', 'Fallback text')}</p>
```

---

## 🎨 Customizing Slides

### Edit Slide Content

In `src/components/frontend/Hero.tsx`, find the `heroSlides` array:

```typescript
const heroSlides: HeroSlide[] = [
  {
    id: 1,
    titleKey: "hero.title",           // Translation key
    subtitleKey: "hero.subtitle",     // Translation key
    descriptionKey: "hero.description", // Translation key
    image: "/hero/school-tour.webp",  // Image path
    imageAlt: "Alt text",             // Fallback alt text
    imageAltKey: "hero.slide1.imageAlt", // Translation key for alt
    cta: {
      primary: {
        textKey: "hero.enrollNow",    // Button text key
        href: "/admission",           // Button link
        ariaLabelKey: "hero.slide1.primaryAriaLabel" // Aria label key
      },
      secondary: {
        textKey: "hero.learnMore",
        href: "/about",
        ariaLabelKey: "hero.slide1.secondaryAriaLabel"
      }
    }
  },
  // Add more slides...
];
```

### Add New Slide

1. Add translations to `en.json` and `bn.json`
2. Add slide object to `heroSlides` array
3. Add image to `/public/hero/` directory

---

## ⚙️ Configuration

### Auto-Play Settings

In `src/components/frontend/Hero.tsx`, find `HERO_CONSTANTS`:

```typescript
const HERO_CONSTANTS = {
  AUTO_PLAY_DURATION: 5000,        // 5 seconds per slide
  AUTO_PLAY_RESUME_DELAY: 8000,    // Resume after 8s of interaction
  MIN_SWIPE_DISTANCE: 50,          // Minimum swipe distance (px)
  SWIPE_RESUME_DELAY: 6000,        // Resume after swipe
  IMAGE_QUALITY: {
    SLOW_2G: 60,                   // Image quality for slow connections
    THREE_G: 75,                   // Image quality for 3G
    FOUR_G_PLUS: 85                // Image quality for 4G+
  }
} as const;
```

### Adjust Timing

```typescript
// Change auto-play duration to 7 seconds
AUTO_PLAY_DURATION: 7000,

// Change resume delay to 10 seconds
AUTO_PLAY_RESUME_DELAY: 10000,
```

---

## 🎭 Animation Customization

### Stagger Delays

In the content rendering section, adjust delays:

```typescript
// Subtitle
transition={{ delay: 0.1 }}  // Change this value

// Title
transition={{ delay: 0.2 }}  // Change this value

// Description
transition={{ delay: 0.35 }} // Change this value

// CTA Buttons
transition={{ delay: 0.5 }}  // Change this value
```

### Animation Duration

```typescript
// Faster animations
transition={{ duration: 0.3 }}

// Slower animations
transition={{ duration: 0.7 }}
```

---

## 🖼️ Image Optimization

### Image Requirements

- **Format:** WebP (recommended) or JPG
- **Size:** 1920x1080px (Full HD) minimum
- **Aspect Ratio:** 16:9
- **File Size:** < 500KB (optimized)
- **Location:** `/public/hero/`

### Adding New Images

1. Optimize image (use tools like Squoosh or TinyPNG)
2. Convert to WebP format
3. Place in `/public/hero/` directory
4. Update slide configuration with new path

### Image Naming Convention

```
school-tour.webp
school-playground.webp
school-classroom.webp
```

---

## 🧪 Testing

### Quick Test Checklist

**Visual:**
- [ ] Check on mobile (320px width)
- [ ] Check on tablet (768px width)
- [ ] Check on desktop (1920px width)
- [ ] Verify all text is readable
- [ ] Check image quality

**Functional:**
- [ ] Test language switcher
- [ ] Test slide navigation (arrows, indicators)
- [ ] Test auto-play pause/resume
- [ ] Test touch gestures (mobile)
- [ ] Test keyboard navigation

**Performance:**
- [ ] Run Lighthouse audit (target: >90)
- [ ] Check animation smoothness
- [ ] Test on slow connection

### Running Tests

```bash
# Type check
npm run type-check

# Build
npm run build

# Run development server
npm run dev
```

---

## 🐛 Troubleshooting

### Translation Not Showing

**Problem:** Text shows key instead of translation

**Solution:**
1. Check key exists in both `en.json` and `bn.json`
2. Verify key path is correct
3. Check for typos
4. Ensure JSON is valid

### Bangla Text Not Rendering

**Problem:** Bangla shows as boxes

**Solution:**
1. Add Noto Sans Bengali font
2. Check font-family includes Bengali font
3. Verify UTF-8 encoding

### Animation Stuttering

**Problem:** Animations are not smooth

**Solution:**
1. Check browser DevTools Performance tab
2. Verify GPU acceleration is active
3. Reduce animation complexity
4. Check for memory leaks

### Images Not Loading

**Problem:** Images don't display

**Solution:**
1. Verify image path is correct
2. Check image exists in `/public/hero/`
3. Verify image format (WebP supported)
4. Check browser console for errors

---

## 📚 Documentation Reference

### Complete Guides

1. **HERO_COMPLETE_SUMMARY.md**
   - Overview of all optimizations
   - Performance metrics
   - Feature list

2. **HERO_PHASE2_OPTIMIZATIONS.md**
   - Detailed Phase 2 changes
   - Implementation details
   - Testing procedures

3. **HERO_TYPOGRAPHY_GUIDE.md**
   - Typography specifications
   - Responsive sizing
   - Best practices

4. **HERO_BILINGUAL_GUIDE.md**
   - Translation structure
   - Implementation guide
   - Troubleshooting

5. **HERO_PHASE2_TESTING_CHECKLIST.md**
   - Comprehensive testing checklist
   - All test categories
   - Pass/fail criteria

---

## 🎓 Best Practices

### Do's ✅

- **Do** use translation keys for all text
- **Do** optimize images before adding
- **Do** test on real devices
- **Do** check accessibility
- **Do** monitor performance metrics
- **Do** follow naming conventions
- **Do** document changes

### Don'ts ❌

- **Don't** hardcode text in components
- **Don't** use unoptimized images
- **Don't** skip accessibility testing
- **Don't** ignore console warnings
- **Don't** modify core animation logic without testing
- **Don't** remove TypeScript types
- **Don't** skip documentation

---

## 🔗 Quick Links

### Tools
- [Google Fonts](https://fonts.google.com/)
- [WebP Converter](https://squoosh.app/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Resources
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org](https://schema.org/)

---

## 💡 Tips

### Performance
- Use WebP images for better compression
- Enable lazy loading for non-critical images
- Monitor Core Web Vitals in production
- Use Chrome DevTools Performance tab

### Accessibility
- Always provide alt text for images
- Test with keyboard navigation
- Use semantic HTML
- Verify contrast ratios

### Translations
- Keep translations concise
- Test with longest translations
- Use native speakers for review
- Maintain consistent terminology

### Development
- Use TypeScript strict mode
- Follow React best practices
- Write meaningful comments
- Test on multiple browsers

---

## 🆘 Getting Help

### Issues?

1. Check this guide first
2. Review relevant documentation
3. Check browser console for errors
4. Test in different browsers
5. Verify all dependencies are installed

### Need More Help?

- Review complete documentation in `/docs`
- Check component source code comments
- Test with simplified version
- Consult team members

---

## ✅ Quick Checklist

Before deploying:

- [ ] All translations added
- [ ] Images optimized
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] Lighthouse score >90
- [ ] No console errors
- [ ] Accessibility verified
- [ ] Performance metrics good
- [ ] Documentation updated

---

**Last Updated:** 2025-10-01  
**Version:** 2.0  
**Status:** ✅ Production Ready

**Happy Coding! 🚀**

