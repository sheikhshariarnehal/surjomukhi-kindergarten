# Hero Section Testing Guide

## 🧪 Quick Testing Checklist

### Visual Testing
- [ ] Slide indicators are visible and properly positioned
- [ ] Progress bar animates smoothly on active indicator
- [ ] Images load with smooth transitions
- [ ] Overlay gradient looks professional
- [ ] Text is readable on all slides
- [ ] Buttons have proper hover/active states
- [ ] Institutional footer displays correctly

### Functional Testing
- [ ] Auto-play works (5 seconds per slide)
- [ ] Click on indicators changes slides
- [ ] Swipe left/right on mobile works
- [ ] Keyboard arrows navigate slides
- [ ] Spacebar pauses/resumes auto-play
- [ ] Auto-play resumes after user interaction
- [ ] All CTA buttons are clickable

### Performance Testing
- [ ] First slide loads quickly (< 2s)
- [ ] No layout shifts during load
- [ ] Smooth transitions between slides
- [ ] No janky animations
- [ ] GPU acceleration working
- [ ] Images preload correctly

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announces slides
- [ ] Focus indicators are visible
- [ ] ARIA labels are present
- [ ] Reduced motion is respected
- [ ] Touch targets are 44x44px minimum

## 🔍 Detailed Testing Procedures

### 1. Network Speed Testing

#### Test Adaptive Image Quality

**4G/5G Network:**
```bash
# Open Chrome DevTools
# Network tab → Throttling → Fast 4G
# Reload page
# Check: Image quality should be 85
```

**3G Network:**
```bash
# Network tab → Throttling → Slow 3G
# Reload page
# Check: Image quality should be 75
# Verify: Faster loading than before
```

**2G Network:**
```bash
# Network tab → Throttling → Slow 2G
# Reload page
# Check: Image quality should be 60
# Verify: Significantly faster loading
```

**Expected Results:**
- ✅ Images load faster on slower connections
- ✅ Quality adjusts automatically
- ✅ No errors in console
- ✅ Smooth user experience

### 2. Performance Monitoring

#### Chrome DevTools Performance Tab

```bash
1. Open DevTools → Performance tab
2. Click Record
3. Wait for hero to load and auto-play through 2 slides
4. Stop recording
5. Check for:
   - Long tasks (should be < 50ms)
   - Layout shifts (should be minimal)
   - Paint operations (should be optimized)
   - GPU usage (should show GPU acceleration)
```

**Expected Metrics:**
- LCP: < 2.5s ✅
- FID: < 100ms ✅
- CLS: < 0.1 ✅
- No long tasks > 50ms ✅

#### Lighthouse Audit

```bash
1. Open DevTools → Lighthouse tab
2. Select "Desktop" or "Mobile"
3. Check "Performance" category
4. Click "Generate report"
```

**Expected Scores:**
- Performance: > 90 ✅
- Accessibility: 100 ✅
- Best Practices: > 95 ✅
- SEO: 100 ✅

### 3. Visual Regression Testing

#### Slide Indicators

**Test 1: Visibility**
```
1. Load page
2. Scroll to hero section
3. Check: Indicators visible at bottom
4. Check: Active indicator is white and larger
5. Check: Inactive indicators are semi-transparent
```

**Test 2: Progress Bar**
```
1. Watch active indicator
2. Check: Progress bar fills from left to right
3. Check: Takes exactly 5 seconds
4. Check: Resets when slide changes
5. Check: Smooth linear animation
```

**Test 3: Interaction**
```
1. Click on second indicator
2. Check: Slide changes immediately
3. Check: Progress bar starts on new slide
4. Check: Auto-play pauses briefly
5. Check: Auto-play resumes after 8 seconds
```

#### Overlay Gradient

**Visual Check:**
```
1. Load page
2. Check: Gradient is lighter at top
3. Check: Gradient is darker at bottom
4. Check: Text is readable throughout
5. Check: Smooth transition between shades
```

### 4. Mobile Testing

#### Touch Gestures

**Swipe Test:**
```
1. Open on mobile device
2. Swipe left on hero
3. Check: Moves to next slide
4. Swipe right
5. Check: Moves to previous slide
6. Check: Smooth animations
7. Check: No accidental scrolling
```

**Touch Targets:**
```
1. Try tapping indicators
2. Check: Easy to tap (44x44px minimum)
3. Check: Visual feedback on tap
4. Check: Slide changes correctly
```

#### Viewport Height

**iOS Safari Test:**
```
1. Open on iPhone
2. Check: Hero fills viewport correctly
3. Scroll down and back up
4. Check: No content cutoff
5. Check: Respects notch area
6. Check: Respects home indicator
```

### 5. Accessibility Testing

#### Keyboard Navigation

**Test Procedure:**
```
1. Load page
2. Press Tab until hero is focused
3. Press Right Arrow
   → Check: Moves to next slide
4. Press Left Arrow
   → Check: Moves to previous slide
5. Press Spacebar
   → Check: Pauses auto-play
6. Press Spacebar again
   → Check: Resumes auto-play
```

#### Screen Reader Testing

**NVDA/JAWS Test:**
```
1. Enable screen reader
2. Navigate to hero section
3. Check: Announces "Hero slideshow"
4. Check: Announces current slide number
5. Check: Announces slide content
6. Tab to indicators
7. Check: Announces "Go to slide X of Y"
```

#### Reduced Motion

**Test Procedure:**
```
1. Enable reduced motion in OS settings
   - Windows: Settings → Ease of Access → Display → Show animations
   - Mac: System Preferences → Accessibility → Display → Reduce motion
2. Reload page
3. Check: Simpler animations (fade only)
4. Check: Shorter duration (0.3s vs 0.6s)
5. Check: No progress bar animation
```

### 6. SEO Testing

#### Structured Data

**Google Rich Results Test:**
```
1. Go to: https://search.google.com/test/rich-results
2. Enter your page URL
3. Check: No errors
4. Check: EducationalOrganization detected
5. Check: Logo and image present
6. Check: All required fields populated
```

**Schema Validator:**
```
1. Go to: https://validator.schema.org/
2. Paste structured data JSON
3. Check: No errors or warnings
4. Check: All properties valid
```

#### Meta Tags

**Check in DevTools:**
```html
<!-- Should be present in <head> -->
<meta property="og:image" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```

### 7. Cross-Browser Testing

#### Desktop Browsers

**Chrome (Latest):**
- [ ] All features work
- [ ] Smooth animations
- [ ] No console errors
- [ ] Performance is good

**Firefox (Latest):**
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors
- [ ] Backdrop-blur works

**Safari (Latest):**
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors
- [ ] WebP images load

**Edge (Latest):**
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors
- [ ] Performance good

#### Mobile Browsers

**iOS Safari:**
- [ ] Touch gestures work
- [ ] Viewport height correct
- [ ] Safe areas respected
- [ ] No layout issues

**Android Chrome:**
- [ ] Touch gestures work
- [ ] Viewport height correct
- [ ] Performance good
- [ ] No layout issues

## 🐛 Common Issues & Solutions

### Issue: Progress bar not visible
**Solution:** Check if auto-play is enabled and reduced motion is off

### Issue: Images loading slowly
**Solution:** Check network throttling in DevTools, verify adaptive quality is working

### Issue: Indicators not clickable
**Solution:** Check z-index, verify goToSlide function is called

### Issue: Layout shift on load
**Solution:** Verify blur placeholder is present, check image dimensions

### Issue: Janky animations
**Solution:** Check GPU acceleration, verify transform-gpu class is applied

### Issue: Touch gestures not working
**Solution:** Check touch event handlers, verify preventDefault is called correctly

## 📊 Performance Benchmarks

### Target Metrics
```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay):        < 100ms
CLS (Cumulative Layout Shift):  < 0.1
TTI (Time to Interactive):      < 3.5s
Speed Index:                    < 3.0s
```

### Image Loading
```
First Image (4G):  < 1.5s
First Image (3G):  < 2.5s
First Image (2G):  < 4.0s
Subsequent Images: Lazy loaded
```

### Animation Performance
```
Frame Rate:        60 FPS
Animation Duration: 0.6s (0.3s reduced motion)
Transition Delay:  0ms
GPU Acceleration:  Active during load
```

## ✅ Final Checklist

### Before Deployment
- [ ] All tests pass
- [ ] No console errors
- [ ] Performance metrics meet targets
- [ ] Accessibility score is 100
- [ ] SEO structured data validates
- [ ] Cross-browser testing complete
- [ ] Mobile testing complete
- [ ] Documentation updated

### After Deployment
- [ ] Monitor Core Web Vitals
- [ ] Check real user metrics
- [ ] Verify analytics tracking
- [ ] Monitor error logs
- [ ] Gather user feedback
- [ ] A/B test if needed

## 🎯 Success Criteria

### Performance
- ✅ LCP < 2.5s on 4G
- ✅ FID < 100ms
- ✅ CLS < 0.1
- ✅ Lighthouse score > 90

### Functionality
- ✅ All interactions work
- ✅ Auto-play functions correctly
- ✅ Indicators are clickable
- ✅ Touch gestures work on mobile

### Accessibility
- ✅ Keyboard navigation works
- ✅ Screen reader compatible
- ✅ WCAG 2.1 AA compliant
- ✅ Reduced motion supported

### SEO
- ✅ Structured data validates
- ✅ Meta tags present
- ✅ Images have alt text
- ✅ Semantic HTML used

## 📝 Test Report Template

```markdown
# Hero Section Test Report

**Date:** [Date]
**Tester:** [Name]
**Environment:** [Browser/Device]

## Test Results

### Performance
- LCP: [X]s
- FID: [X]ms
- CLS: [X]
- Lighthouse: [X]/100

### Functionality
- [ ] Auto-play: Pass/Fail
- [ ] Indicators: Pass/Fail
- [ ] Touch gestures: Pass/Fail
- [ ] Keyboard nav: Pass/Fail

### Accessibility
- [ ] Screen reader: Pass/Fail
- [ ] Keyboard only: Pass/Fail
- [ ] Reduced motion: Pass/Fail
- [ ] Focus indicators: Pass/Fail

### Issues Found
1. [Issue description]
2. [Issue description]

### Recommendations
1. [Recommendation]
2. [Recommendation]
```

## 🚀 Automated Testing

### Jest Tests
```bash
npm test Hero.test.tsx
```

### E2E Tests (Playwright/Cypress)
```bash
npm run test:e2e
```

### Visual Regression (Percy/Chromatic)
```bash
npm run test:visual
```

## 📚 Additional Resources

- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org Validator](https://validator.schema.org/)

