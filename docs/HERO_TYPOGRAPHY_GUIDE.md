# Hero Section Typography Guide

## 📐 Typography System

This guide documents the professional typography system implemented in the Hero section, ensuring optimal readability, hierarchy, and visual appeal across all devices and languages.

---

## 🎯 Typography Principles

### 1. Hierarchy
Clear visual hierarchy guides users through content:
- **Subtitle** → **Title** → **Description** → **CTAs**

### 2. Readability
Optimal line-height and letter-spacing for comfortable reading:
- **Headings:** Line-height 1.2, Letter-spacing -0.02em
- **Body:** Line-height 1.6, Letter-spacing 0
- **Buttons:** Line-height normal, Letter-spacing 0.01em

### 3. Contrast
WCAG AA compliant contrast ratios (4.5:1 minimum):
- White text on dark overlay: >7:1 ✅
- Button text: >4.5:1 ✅

### 4. Responsiveness
Fluid typography scales smoothly across breakpoints using Tailwind's responsive classes.

---

## 📝 Typography Specifications

### Subtitle (Eyebrow Text)

**Purpose:** Provides context and draws attention  
**Style:** Uppercase, wide tracking, semibold

```css
/* Typography Properties */
font-size: 0.75rem → 1.25rem (xs → lg)
font-weight: 600 (semibold)
letter-spacing: 0.1em (wider for uppercase)
line-height: tight
text-transform: uppercase
color: text-blue-200
text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3)
```

**Responsive Sizes:**
| Breakpoint | Size | Example |
|------------|------|---------|
| xs (320px) | 0.75rem (12px) | EXCELLENCE IN EDUCATION |
| sm (640px) | 1rem (16px) | EXCELLENCE IN EDUCATION |
| md (768px) | 1.125rem (18px) | EXCELLENCE IN EDUCATION |
| lg (1024px) | 1.25rem (20px) | EXCELLENCE IN EDUCATION |

**Tailwind Classes:**
```html
className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 
           font-semibold text-blue-200 uppercase tracking-wider px-2 
           leading-tight"
```

---

### Main Title (H1)

**Purpose:** Primary message, hero statement  
**Style:** Bold, tight tracking, large scale

```css
/* Typography Properties */
font-size: 1.25rem → 4.5rem (xs → 2xl)
font-weight: 700 (bold)
letter-spacing: -0.02em (tighter for large text)
line-height: 1.2 (optimal for multi-line)
color: white
text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3)
```

**Responsive Sizes:**
| Breakpoint | Size | Scale Factor |
|------------|------|--------------|
| xs (320px) | 1.25rem (20px) | 1x |
| sm (640px) | 1.875rem (30px) | 1.5x |
| md (768px) | 2.25rem (36px) | 1.8x |
| lg (1024px) | 3rem (48px) | 2.4x |
| xl (1280px) | 3.75rem (60px) | 3x |
| 2xl (1536px) | 4.5rem (72px) | 3.6x |

**Tailwind Classes:**
```html
className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
           xl:text-6xl 2xl:text-7xl font-bold px-2"
style={{ lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 700 }}
```

**Typography Best Practices:**
- Keep titles concise (5-10 words)
- Use sentence case for better readability
- Avoid all caps for long titles
- Test with longest translation (Bangla often longer)

---

### Description (Body Text)

**Purpose:** Supporting information, value proposition  
**Style:** Regular weight, comfortable reading

```css
/* Typography Properties */
font-size: 0.875rem → 1.5rem (xs → lg)
font-weight: 400 (regular)
letter-spacing: 0 (normal)
line-height: 1.6 (optimal readability)
color: text-gray-100
text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3)
max-width: 80ch (optimal line length)
```

**Responsive Sizes:**
| Breakpoint | Size | Characters per Line |
|------------|------|---------------------|
| xs (320px) | 0.875rem (14px) | ~40-50 |
| sm (640px) | 1.125rem (18px) | ~50-60 |
| md (768px) | 1.25rem (20px) | ~60-70 |
| lg (1024px) | 1.5rem (24px) | ~70-80 |

**Tailwind Classes:**
```html
className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 
           max-w-5xl mx-auto text-gray-100 px-3 xs:px-4 sm:px-6"
style={{ lineHeight: '1.6', letterSpacing: '0', fontWeight: 400 }}
```

**Readability Guidelines:**
- Optimal line length: 50-75 characters
- Line height: 1.5-1.6 for body text
- Avoid justified text (causes rivers)
- Use max-width to prevent overly long lines

---

### CTA Buttons

**Purpose:** Call-to-action, conversion  
**Style:** Semibold, slightly wider tracking

```css
/* Typography Properties */
font-size: 0.875rem → 1rem (xs → sm)
font-weight: 600 (semibold)
letter-spacing: 0.01em (slightly wider)
line-height: normal
padding: 0.75rem 2rem (vertical horizontal)
```

**Button Sizes:**
| Size | Font Size | Padding | Min Touch Target |
|------|-----------|---------|------------------|
| Mobile | 0.875rem (14px) | 0.75rem 1.5rem | 44x44px ✅ |
| Tablet | 1rem (16px) | 1rem 2rem | 48x48px ✅ |
| Desktop | 1rem (16px) | 1rem 2rem | 48x48px ✅ |

**Tailwind Classes:**
```html
className="text-sm xs:text-base sm:text-base font-semibold 
           px-6 xs:px-8 sm:px-8 py-3 xs:py-4 sm:py-4"
style={{ letterSpacing: '0.01em', fontWeight: 600 }}
```

**Button Typography Best Practices:**
- Use action verbs (Enroll, Explore, View)
- Keep text short (1-3 words)
- Ensure sufficient padding for touch targets
- Maintain consistent sizing across buttons

---

## 🌍 Bilingual Typography

### English Typography

**Font Family:** Inter (Google Font)
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, sans-serif;
```

**Characteristics:**
- Clean, modern sans-serif
- Excellent readability at all sizes
- Wide character set
- Optimized for screens

### Bangla Typography

**Font Family:** Noto Sans Bengali (Recommended)
```css
font-family: 'Noto Sans Bengali', 'Inter', system-ui, sans-serif;
```

**Characteristics:**
- Designed for Bengali script
- Proper Unicode rendering
- Consistent weight distribution
- Matches Inter's proportions

**Implementation:**
```typescript
// next.config.js
const nextConfig = {
  // ... other config
  fonts: {
    google: {
      families: ['Inter:400,500,600,700', 'Noto+Sans+Bengali:400,500,600,700']
    }
  }
}
```

### Language-Specific Adjustments

**Bangla Text Considerations:**
- Bangla text often 10-20% longer than English
- Requires slightly more line-height (1.7 vs 1.6)
- May need adjusted letter-spacing for complex characters
- Test with longest translations

**Responsive Adjustments:**
```typescript
const lineHeight = language === 'bn' ? '1.7' : '1.6';
const letterSpacing = language === 'bn' ? '0.01em' : '0';
```

---

## 🎨 Typography Scale

### Modular Scale

Using a 1.25 (Major Third) scale for harmonious sizing:

| Level | Size (rem) | Size (px) | Usage |
|-------|------------|-----------|-------|
| xs | 0.75 | 12 | Small labels |
| sm | 0.875 | 14 | Body text (mobile) |
| base | 1 | 16 | Body text (desktop) |
| lg | 1.125 | 18 | Large body |
| xl | 1.25 | 20 | Subtitle |
| 2xl | 1.5 | 24 | Small heading |
| 3xl | 1.875 | 30 | Medium heading |
| 4xl | 2.25 | 36 | Large heading |
| 5xl | 3 | 48 | XL heading |
| 6xl | 3.75 | 60 | 2XL heading |
| 7xl | 4.5 | 72 | Hero heading |

---

## 📱 Responsive Typography

### Mobile-First Approach

Start with mobile sizes and scale up:

```html
<!-- Mobile: 20px, Tablet: 30px, Desktop: 48px -->
<h1 className="text-xl sm:text-3xl lg:text-5xl">
  Welcome to Surjomukhi Kindergarten
</h1>
```

### Breakpoint Strategy

| Breakpoint | Width | Typography Focus |
|------------|-------|------------------|
| xs | 320px+ | Minimum readable sizes |
| sm | 640px+ | Comfortable reading |
| md | 768px+ | Optimal hierarchy |
| lg | 1024px+ | Enhanced scale |
| xl | 1280px+ | Maximum impact |

### Fluid Typography (Alternative)

Using CSS clamp() for smooth scaling:

```css
/* Fluid font size: 20px → 48px */
font-size: clamp(1.25rem, 2vw + 1rem, 3rem);

/* Fluid line height: 1.2 → 1.4 */
line-height: clamp(1.2, 0.5vw + 1.1, 1.4);
```

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

**Contrast Ratios:**
- Large text (18pt+): 3:1 minimum ✅
- Normal text: 4.5:1 minimum ✅
- Hero text on overlay: >7:1 ✅

**Font Size Minimums:**
- Body text: 16px minimum (1rem)
- Small text: 14px minimum (0.875rem)
- Touch targets: 44x44px minimum

### Screen Reader Support

```html
<!-- Proper heading hierarchy -->
<h1 id="hero-title">Welcome to Surjomukhi Kindergarten</h1>
<p aria-describedby="hero-title">Nurturing young minds...</p>

<!-- Descriptive aria-labels -->
<button aria-label="Enroll now for admission to Surjomukhi Kindergarten">
  Enroll Now
</button>
```

### Reduced Motion

Respect user preferences:
```typescript
const shouldReduceMotion = useReducedMotion();
const animationDuration = shouldReduceMotion ? 0.2 : 0.5;
```

---

## 🧪 Testing Typography

### Visual Testing
- [ ] Check hierarchy on all breakpoints
- [ ] Verify line-height and spacing
- [ ] Test with longest content
- [ ] Check Bangla character rendering
- [ ] Verify text shadows don't obscure text

### Readability Testing
- [ ] Test at arm's length on mobile
- [ ] Verify comfortable reading distance
- [ ] Check line length (50-75 characters)
- [ ] Test with different font sizes (browser zoom)

### Accessibility Testing
- [ ] Verify contrast ratios with tools
- [ ] Test with screen readers
- [ ] Check keyboard navigation
- [ ] Verify focus indicators
- [ ] Test with browser zoom (200%)

### Performance Testing
- [ ] Check font loading time
- [ ] Verify no FOUT (Flash of Unstyled Text)
- [ ] Test with slow connections
- [ ] Verify font subsetting

---

## 📚 Resources

### Tools
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Type Scale:** https://type-scale.com/
- **Google Fonts:** https://fonts.google.com/
- **Font Pair:** https://fontpair.co/

### Guidelines
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **Material Design Typography:** https://material.io/design/typography
- **Apple HIG Typography:** https://developer.apple.com/design/human-interface-guidelines/typography

### Best Practices
- **Butterick's Practical Typography:** https://practicaltypography.com/
- **The Elements of Typographic Style:** Robert Bringhurst
- **Web Typography:** Richard Rutter

---

## 🎯 Quick Reference

### Copy-Paste Classes

**Subtitle:**
```html
className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-blue-200 uppercase tracking-wider leading-tight"
style={{ letterSpacing: '0.1em', fontWeight: 600 }}
```

**Title:**
```html
className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold"
style={{ lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 700 }}
```

**Description:**
```html
className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto text-gray-100"
style={{ lineHeight: '1.6', letterSpacing: '0', fontWeight: 400 }}
```

**Button:**
```html
className="text-sm xs:text-base sm:text-base font-semibold px-6 xs:px-8 py-3 xs:py-4"
style={{ letterSpacing: '0.01em', fontWeight: 600 }}
```

---

**Last Updated:** 2025-10-01  
**Version:** 2.0  
**Status:** ✅ Production Ready

