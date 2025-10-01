# Hero Section Bilingual Implementation Guide

## 🌐 Overview

This guide documents the complete bilingual (English/Bangla) implementation for the Hero section, ensuring seamless language switching and proper content display in both languages.

**Languages Supported:**
- 🇬🇧 English (en)
- 🇧🇩 Bangla/Bengali (bn)

---

## 📋 Translation Structure

### Translation Files

**Location:**
- English: `src/locales/en.json`
- Bangla: `src/locales/bn.json`

### Hero Translation Keys

#### Main Slide (Slide 1)

```json
{
  "hero": {
    "title": "Welcome to Surjomukhi Kindergarten",
    "subtitle": "Excellence in Early Childhood Education",
    "description": "Nurturing young minds with quality education...",
    "enrollNow": "Enroll Now",
    "learnMore": "Learn More",
    "slide1": {
      "imageAlt": "Surjomukhi Kindergarten campus - Modern educational facility",
      "primaryAriaLabel": "Start enrollment process for Surjomukhi Kindergarten",
      "secondaryAriaLabel": "Learn more about Surjomukhi Kindergarten programs"
    }
  }
}
```

**Bangla Translation:**
```json
{
  "hero": {
    "title": "সূর্যমুখী কিন্ডারগার্টেনে স্বাগতম",
    "subtitle": "প্রাথমিক শিক্ষায় উৎকর্ষতা",
    "description": "মানসম্পন্ন শিক্ষা, অভিজ্ঞ শিক্ষক এবং নিরাপদ শিক্ষার পরিবেশের মাধ্যমে...",
    "enrollNow": "এখনই ভর্তি হন",
    "learnMore": "আরও জানুন",
    "slide1": {
      "imageAlt": "সূর্যমুখী কিন্ডারগার্টেন ক্যাম্পাস - আধুনিক শিক্ষা সুবিধা",
      "primaryAriaLabel": "সূর্যমুখী কিন্ডারগার্টেনে ভর্তি প্রক্রিয়া শুরু করুন",
      "secondaryAriaLabel": "সূর্যমুখী কিন্ডারগার্টেন প্রোগ্রাম সম্পর্কে আরও জানুন"
    }
  }
}
```

#### Facilities Slide (Slide 2)

```json
{
  "hero": {
    "slide2": {
      "title": "Safe Learning Environment",
      "subtitle": "Modern Kindergarten Facilities",
      "description": "Our campus provides a safe, nurturing environment...",
      "primaryCta": "Explore Facilities",
      "secondaryCta": "Virtual Tour",
      "imageAlt": "Safe learning environment at Surjomukhi Kindergarten",
      "primaryAriaLabel": "Take a virtual tour of our kindergarten facilities",
      "secondaryAriaLabel": "View our photo gallery and virtual campus tour"
    }
  }
}
```

**Bangla Translation:**
```json
{
  "hero": {
    "slide2": {
      "title": "নিরাপদ শিক্ষার পরিবেশ",
      "subtitle": "আধুনিক কিন্ডারগার্টেন সুবিধা",
      "description": "আমাদের ক্যাম্পাস প্রাথমিক শৈশব বিকাশের জন্য...",
      "primaryCta": "সুবিধা অন্বেষণ করুন",
      "secondaryCta": "ভার্চুয়াল ট্যুর",
      "imageAlt": "সূর্যমুখী কিন্ডারগার্টেনে নিরাপদ শিক্ষার পরিবেশ",
      "primaryAriaLabel": "আমাদের কিন্ডারগার্টেন সুবিধার ভার্চুয়াল ট্যুর নিন",
      "secondaryAriaLabel": "আমাদের ফটো গ্যালারি এবং ভার্চুয়াল ক্যাম্পাস ট্যুর দেখুন"
    }
  }
}
```

#### Development Slide (Slide 3)

```json
{
  "hero": {
    "slide3": {
      "title": "Holistic Development",
      "subtitle": "Beyond Academics",
      "description": "We focus on the overall development of children...",
      "primaryCta": "View Activities",
      "imageAlt": "Children engaged in holistic learning activities",
      "primaryAriaLabel": "Explore our educational activities and curriculum",
      "secondaryAriaLabel": "Contact Surjomukhi Kindergarten for inquiries"
    }
  }
}
```

**Bangla Translation:**
```json
{
  "hero": {
    "slide3": {
      "title": "সামগ্রিক উন্নয়ন",
      "subtitle": "একাডেমিক্সের বাইরে",
      "description": "আমরা খেলা-ভিত্তিক শিক্ষা, শিল্পকলা এবং সৃজনশীল কার্যক্রমের মাধ্যমে...",
      "primaryCta": "কার্যক্রম দেখুন",
      "imageAlt": "সূর্যমুখী কিন্ডারগার্টেনে সামগ্রিক শিক্ষা কার্যক্রমে নিয়োজিত শিশুরা",
      "primaryAriaLabel": "আমাদের শিক্ষামূলক কার্যক্রম এবং পাঠ্যক্রম অন্বেষণ করুন",
      "secondaryAriaLabel": "অনুসন্ধানের জন্য সূর্যমুখী কিন্ডারগার্টেনের সাথে যোগাযোগ করুন"
    }
  }
}
```

#### Institutional Information

```json
{
  "hero": {
    "institutional": {
      "eiin": "EIIN",
      "institutionCode": "Institution Code",
      "centerCode": "Center Code",
      "estdYear": "Estd Year",
      "eiinDesc": "Educational Institution Identification Number",
      "institutionCodeDesc": "Official Institution Code",
      "centerCodeDesc": "Center Identification Code",
      "estdYearDesc": "Year of Establishment",
      "ariaLabel": "Institution information"
    }
  }
}
```

**Bangla Translation:**
```json
{
  "hero": {
    "institutional": {
      "eiin": "ইআইআইএন",
      "institutionCode": "প্রতিষ্ঠান কোড",
      "centerCode": "কেন্দ্র কোড",
      "estdYear": "প্রতিষ্ঠা বছর",
      "eiinDesc": "শিক্ষা প্রতিষ্ঠান সনাক্তকরণ নম্বর",
      "institutionCodeDesc": "অফিসিয়াল প্রতিষ্ঠান কোড",
      "centerCodeDesc": "কেন্দ্র সনাক্তকরণ কোড",
      "estdYearDesc": "প্রতিষ্ঠার বছর",
      "ariaLabel": "প্রতিষ্ঠানের তথ্য"
    }
  }
}
```

#### Loading State

```json
{
  "hero": {
    "loading": {
      "text": "Loading...",
      "ariaLabel": "Hero section loading"
    }
  }
}
```

**Bangla Translation:**
```json
{
  "hero": {
    "loading": {
      "text": "লোড হচ্ছে...",
      "ariaLabel": "হিরো বিভাগ লোড হচ্ছে"
    }
  }
}
```

---

## 💻 Implementation

### Using Translation Hook

```typescript
import { useTranslation } from '@/contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t, language } = useTranslation();

  return (
    <h1>{t('hero.title', 'Welcome to Surjomukhi Kindergarten')}</h1>
  );
};
```

### Translation Function

The `t()` function accepts:
1. **Key:** Translation key (e.g., 'hero.title')
2. **Fallback:** Default value if translation not found

```typescript
// Basic usage
t('hero.title')

// With fallback
t('hero.title', 'Welcome to Surjomukhi Kindergarten')

// Nested keys
t('hero.slide2.title')
t('hero.institutional.eiin')
```

### Slide Data Structure

```typescript
const heroSlides: HeroSlide[] = [
  {
    id: 1,
    titleKey: "hero.title",           // Translation key
    subtitleKey: "hero.subtitle",     // Translation key
    descriptionKey: "hero.description", // Translation key
    image: "/hero/school-tour.webp",
    imageAlt: "Surjomukhi Kindergarten campus",
    imageAltKey: "hero.slide1.imageAlt", // Optional translation key
    cta: {
      primary: {
        textKey: "hero.enrollNow",
        href: "/admission",
        ariaLabelKey: "hero.slide1.primaryAriaLabel"
      },
      secondary: {
        textKey: "hero.learnMore",
        href: "/about",
        ariaLabelKey: "hero.slide1.secondaryAriaLabel"
      }
    }
  }
];
```

### Rendering Translated Content

```typescript
// Subtitle
<p>{t(currentSlideData.subtitleKey, currentSlideData.subtitleKey)}</p>

// Title
<h1>{t(currentSlideData.titleKey, currentSlideData.titleKey)}</h1>

// Description
<p>{t(currentSlideData.descriptionKey, currentSlideData.descriptionKey)}</p>

// CTA Button
<Button>
  {t(currentSlideData.cta.primary.textKey, currentSlideData.cta.primary.textKey)}
</Button>

// Aria Label
<a aria-label={t(currentSlideData.cta.primary.ariaLabelKey, '')}>
```

---

## 🎨 Language-Specific Styling

### Font Configuration

**English Font:**
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, sans-serif;
```

**Bangla Font (Recommended):**
```css
font-family: 'Noto Sans Bengali', 'Inter', system-ui, sans-serif;
```

### Typography Adjustments

```typescript
// Adjust line-height for Bangla
const lineHeight = language === 'bn' ? '1.7' : '1.6';

// Adjust letter-spacing for Bangla
const letterSpacing = language === 'bn' ? '0.01em' : '0';

// Apply to component
<p style={{ lineHeight, letterSpacing }}>
  {t('hero.description')}
</p>
```

### Text Direction

Both English and Bangla use LTR (Left-to-Right):
```html
<div dir="ltr" lang={language}>
  {/* Content */}
</div>
```

---

## 🔍 SEO Implementation

### Language Meta Tags

```html
<!-- Current language -->
<html lang={language === 'en' ? 'en-US' : 'bn-BD'}>

<!-- Alternate languages -->
<link rel="alternate" hreflang="en-US" href="https://surjomukhikindergarten.com/en" />
<link rel="alternate" hreflang="bn-BD" href="https://surjomukhikindergarten.com/bn" />
<link rel="alternate" hreflang="x-default" href="https://surjomukhikindergarten.com" />
```

### Open Graph Tags

```html
<!-- English -->
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="bn_BD" />

<!-- Bangla -->
<meta property="og:locale" content="bn_BD" />
<meta property="og:locale:alternate" content="en_US" />
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Surjomukhi Kindergarten",
  "alternateName": "সূর্যমুখী কিন্ডারগার্টেন",
  "inLanguage": ["en-US", "bn-BD"]
}
```

---

## 🧪 Testing Bilingual Support

### Functional Testing

- [ ] **Language Switcher**
  - Switch from English to Bangla
  - Switch from Bangla to English
  - Verify all hero content changes
  - Check localStorage persistence

- [ ] **Translation Keys**
  - Verify all slides display correctly in English
  - Verify all slides display correctly in Bangla
  - Check CTA buttons translate properly
  - Verify institutional information translates

- [ ] **Fallback Behavior**
  - Test with missing translation keys
  - Verify fallback to English
  - Check console for warnings

### Visual Testing

- [ ] **Typography**
  - Check Bangla character rendering
  - Verify font weights display correctly
  - Test line-height and spacing
  - Check text overflow on long translations

- [ ] **Layout**
  - Verify content fits in containers
  - Check responsive behavior
  - Test with longest translations
  - Verify button text doesn't wrap awkwardly

- [ ] **Alignment**
  - Check text alignment (center)
  - Verify button alignment
  - Test on all breakpoints

### Accessibility Testing

- [ ] **Screen Readers**
  - Test with NVDA (English)
  - Test with NVDA (Bangla)
  - Verify aria-labels translate
  - Check language announcements

- [ ] **Keyboard Navigation**
  - Test in English mode
  - Test in Bangla mode
  - Verify focus indicators
  - Check tab order

---

## 📝 Translation Guidelines

### Best Practices

1. **Keep Keys Consistent**
   ```json
   // Good
   "hero.slide1.title"
   "hero.slide2.title"
   "hero.slide3.title"
   
   // Bad
   "heroSlide1Title"
   "slide_2_title"
   "thirdSlideTitle"
   ```

2. **Use Descriptive Keys**
   ```json
   // Good
   "hero.enrollNow"
   "hero.learnMore"
   
   // Bad
   "hero.button1"
   "hero.cta2"
   ```

3. **Provide Context**
   ```json
   // Good - Clear context
   "hero.slide2.primaryCta": "Explore Facilities"
   
   // Bad - Ambiguous
   "hero.button": "Click Here"
   ```

4. **Handle Plurals**
   ```json
   "hero.studentCount": {
     "one": "{{count}} student",
     "other": "{{count}} students"
   }
   ```

### Translation Quality

**English:**
- Use clear, concise language
- Avoid jargon and complex terms
- Write for 8th-grade reading level
- Use active voice

**Bangla:**
- Use standard Bengali script
- Avoid overly formal language
- Ensure cultural appropriateness
- Test with native speakers

### Character Limits

| Element | English | Bangla | Notes |
|---------|---------|--------|-------|
| Subtitle | 50 chars | 60 chars | Bangla often longer |
| Title | 60 chars | 70 chars | Keep concise |
| Description | 200 chars | 240 chars | 2-3 sentences |
| Button | 15 chars | 20 chars | Short and clear |

---

## 🚀 Adding New Translations

### Step 1: Add to English

```json
// src/locales/en.json
{
  "hero": {
    "newKey": "New English Text"
  }
}
```

### Step 2: Add to Bangla

```json
// src/locales/bn.json
{
  "hero": {
    "newKey": "নতুন বাংলা টেক্সট"
  }
}
```

### Step 3: Use in Component

```typescript
<p>{t('hero.newKey', 'New English Text')}</p>
```

### Step 4: Test

1. Switch to English → Verify text displays
2. Switch to Bangla → Verify translation displays
3. Check console for warnings
4. Test on all breakpoints

---

## 🔧 Troubleshooting

### Translation Not Showing

**Problem:** Text shows translation key instead of translated text

**Solutions:**
1. Check translation key exists in both `en.json` and `bn.json`
2. Verify key path is correct (e.g., `hero.slide2.title`)
3. Check for typos in translation key
4. Ensure JSON is valid (no trailing commas)

### Bangla Characters Not Rendering

**Problem:** Bangla text shows as boxes or question marks

**Solutions:**
1. Add Noto Sans Bengali font
2. Verify font-family includes Bengali font
3. Check character encoding (UTF-8)
4. Test with different browsers

### Layout Breaking with Long Text

**Problem:** Long translations break layout

**Solutions:**
1. Use `max-w-*` classes to limit width
2. Add `overflow-hidden` and `text-ellipsis`
3. Adjust font size for longer text
4. Test with longest translations

### Language Not Persisting

**Problem:** Language resets on page reload

**Solutions:**
1. Check localStorage is enabled
2. Verify LanguageContext saves preference
3. Check browser console for errors
4. Test in incognito mode

---

## 📚 Resources

### Tools
- **Google Translate:** https://translate.google.com/
- **Bangla Keyboard:** https://www.google.com/inputtools/try/
- **Unicode Converter:** https://www.branah.com/unicode-converter

### Fonts
- **Noto Sans Bengali:** https://fonts.google.com/noto/specimen/Noto+Sans+Bengali
- **Inter:** https://fonts.google.com/specimen/Inter

### Testing
- **NVDA Screen Reader:** https://www.nvaccess.org/
- **Language Testing:** Test with native speakers
- **Browser Testing:** Chrome, Firefox, Safari, Edge

---

**Last Updated:** 2025-10-01  
**Version:** 2.0  
**Status:** ✅ Production Ready

