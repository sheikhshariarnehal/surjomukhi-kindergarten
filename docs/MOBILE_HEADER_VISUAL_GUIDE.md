# Mobile Header - Visual Breakpoint Guide

## Screen Size Behavior

```
┌─────────────────────────────────────────────────────────────┐
│                    MOBILE BREAKPOINTS                         │
└─────────────────────────────────────────────────────────────┘

📱 320px - 474px (Extra Small Mobile)
┌──────────────────────────────────┐
│ 🔵 [Logo] School Name           │ No tagline
│                       🔍 ☰      │ Smaller icons
├──────────────────────────────────┤
│ 📞 Phone    🌐EN           (Hide social) │
└──────────────────────────────────┘
- Minimal padding (px-2)
- Smallest font sizes
- Language switcher scaled to 75%
- Social icons hidden
- 36px minimum touch targets


📱 475px - 639px (Small Mobile - xs)
┌─────────────────────────────────────┐
│ 🔵 [Logo] School Name              │
│           Tagline                   │ Tagline appears
│                       🔍 ☰         │
├─────────────────────────────────────┤
│ 📞 Phone    🌐EN  📘 🐦 💼 📺    │ Social icons appear
└─────────────────────────────────────┘
- Medium padding (px-3)
- Medium font sizes
- Language switcher scaled to 90%
- Social icons visible
- 44px touch targets


📱 640px - 767px (Large Mobile - sm)
┌──────────────────────────────────────┐
│ 🔵 [Logo] School Name                │
│           Excellence in Education    │
│                          🔍 ☰        │
├──────────────────────────────────────┤
│ 📞 Phone  ✉️ Email  🌐EN 📘🐦💼📺  │ Email appears
└──────────────────────────────────────┘
- Standard padding (px-4)
- Standard font sizes
- All top bar items visible
- Email link shows


💻 768px - 1023px (Tablet - md)
┌───────────────────────────────────────────┐
│ 🔵 [Logo] Surjamukhi Kindergarten        │
│           Excellence in Education         │
│                              🔍 ☰         │
├───────────────────────────────────────────┤
│ 📞 +880... ✉️ info@...  🌐EN 📘🐦💼📺   │
└───────────────────────────────────────────┘
- Full email visible
- Larger logo
- More spacing


🖥️ 1024px+ (Desktop - lg)
┌────────────────────────────────────────────────────────────┐
│ 🔵 [Logo] Surjamukhi Kindergarten                          │
│           Excellence in Early Childhood Education          │
│                      About Academic Admission... 🔍 [Apply]│
├────────────────────────────────────────────────────────────┤
│ 📞 +880... ✉️ info@... 🕐 8AM-4PM  🌐EN 📘🐦💼📺         │
└────────────────────────────────────────────────────────────┘
- Desktop navigation menu
- Office hours visible
- Admission CTA button
- Horizontal menu items
```

## Component Sizing

### Logo Sizes
```
Mobile:  32x32px (8 x 8)
xs:      36x36px (9 x 9)
lg:      40x40px (10 x 10)
```

### School Name Font
```
Mobile:  text-xs   (0.75rem / 12px)
xs:      text-sm   (0.875rem / 14px)
sm:      text-lg   (1.125rem / 18px)
lg:      text-xl   (1.25rem / 20px)
```

### Touch Target Sizes
```
Mobile:  40x40px minimum
xs+:     44x44px standard
Desktop: Hover states active
```

## Mobile Menu States

### Closed State
```
┌────────────────────────┐
│ [Logo] School Name   ☰ │
└────────────────────────┘
```

### Open State
```
┌────────────────────────┐
│ [Logo] School Name   ✕ │
├────────────────────────┤
│ ▼ About                │
│   • About Us           │
│   • Founders           │
│ ▼ Academic             │
│   • Classes            │
│     ▼ Play Group       │
│       ◦ Nursery        │
│ • Admission            │
│ • Student              │
│ • Others               │
│ • Contact              │
├────────────────────────┤
│   [Apply Now]          │ Sticky CTA
└────────────────────────┘
```

## Search Modal

### Mobile
```
┌─────────────────────────────┐
│                             │
│  ┌───────────────────────┐  │
│  │ 🔍 [Search......] ✕  │  │ Full screen overlay
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### Desktop
```
┌────────────────────────────────┐
│ [Logo] School    [🔍 Search] ✕ │ Inline search
└────────────────────────────────┘
```

## Top Bar Components

### Visibility Matrix
```
Component       | 320px | 475px | 640px | 768px | 1024px
─────────────────────────────────────────────────────────
Phone           |   ✓   |   ✓   |   ✓   |   ✓   |   ✓
Email           |   ✗   |   ✗   |   ✓   |   ✓   |   ✓
Office Hours    |   ✗   |   ✗   |   ✗   |   ✗   |   ✓
Lang Switcher   | 75%   | 90%   | 100%  | 100%  | 100%
Social Icons    |   ✗   |   ✓   |   ✓   |   ✓   |   ✓
```

## Animation Timing

```
Menu Toggle:     300ms ease-in-out
Submenu Expand:  300ms ease-in-out
Button Hover:    200ms ease
Icon Scale:      200ms ease
Background:      300ms ease
```

## Z-Index Hierarchy

```
Search Modal:     z-40
Nav Bar:          z-50
Dropdowns:        z-50 (within nav context)
Mobile Menu:      Part of nav (z-50)
```

## Spacing System

### Horizontal Padding
```
Mobile:  px-2  (0.5rem / 8px)
xs:      px-3  (0.75rem / 12px)
sm:      px-4  (1rem / 16px)
lg:      px-6  (1.5rem / 24px)
```

### Vertical Padding (Buttons)
```
Mobile:  py-2.5  (0.625rem / 10px)
xs:      py-3    (0.75rem / 12px)
Desktop: py-2.5  (0.625rem / 10px)
```

### Spacing Between Elements
```
Mobile:  space-x-1  (0.25rem / 4px)
xs:      space-x-2  (0.5rem / 8px)
lg:      space-x-4  (1rem / 16px)
```

## Color Palette

### Interactive States
```
Default:    text-gray-700
Hover:      text-blue-600, bg-blue-50
Active:     text-blue-700, bg-blue-100
Focus:      ring-2 ring-blue-500/30
```

### Top Bar
```
Background:  from-blue-800 via-blue-900 to-blue-800
Text:        text-blue-100
Hover:       text-white
Border:      border-blue-700
```

## Performance Targets

```
Metric                  | Mobile | Desktop
─────────────────────────────────────────
First Paint             | < 1.5s | < 1s
Time to Interactive     | < 2.5s | < 2s
Touch Response          | < 100ms | -
Animation Frame Rate    | 60fps  | 60fps
```

## Testing Viewport Sizes

```
Device          | Width  | Height | Test Priority
──────────────────────────────────────────────────
iPhone SE       | 375px  | 667px  | HIGH
iPhone 12/13    | 390px  | 844px  | HIGH
iPhone 14 Pro   | 393px  | 852px  | HIGH
Galaxy S20      | 360px  | 800px  | HIGH
Pixel 5         | 393px  | 851px  | MEDIUM
iPad Mini       | 768px  | 1024px | MEDIUM
iPad Air        | 820px  | 1180px | MEDIUM
iPad Pro 11"    | 834px  | 1194px | LOW
Desktop         | 1280px | 720px  | HIGH
```

## Quick CSS Classes Reference

### Responsive Display
```css
hidden              /* Hide on all */
xs:flex            /* Show from 475px */
sm:flex            /* Show from 640px */
lg:hidden          /* Hide from 1024px */
```

### Responsive Sizing
```css
w-8 xs:w-9 lg:w-10             /* Logo width */
text-xs xs:text-sm lg:text-xl  /* Font size */
px-2 xs:px-3 sm:px-4 lg:px-6   /* Horizontal padding */
```

### Touch Optimization
```css
touch-manipulation              /* Better touch response */
min-w-[40px] min-h-[40px]      /* Minimum touch target */
active:scale-95                 /* Touch feedback */
```

### Text Handling
```css
truncate                        /* Ellipsis overflow */
whitespace-nowrap              /* No wrapping */
line-clamp-1                   /* Single line clamp */
```

## Implementation Checklist

Navigation Bar:
- [✓] Responsive logo sizing
- [✓] Truncating school name
- [✓] Conditional tagline display
- [✓] Touch-optimized buttons
- [✓] Proper spacing at all breakpoints

Top Utility Bar:
- [✓] Responsive contact info
- [✓] Conditional email display
- [✓] Social icon visibility
- [✓] Language switcher scaling
- [✓] Touch target optimization

Mobile Menu:
- [✓] Dynamic height calculation
- [✓] Smooth scroll behavior
- [✓] Body scroll prevention
- [✓] Sticky CTA button
- [✓] Responsive text sizing

Search:
- [✓] Full-screen mobile modal
- [✓] Inline desktop search
- [✓] Touch-friendly inputs
- [✓] Keyboard support
- [✓] Accessibility labels

Accessibility:
- [✓] ARIA labels
- [✓] Keyboard navigation
- [✓] Screen reader support
- [✓] Focus management
- [✓] Touch target sizes

Performance:
- [✓] CSS optimization
- [✓] Animation efficiency
- [✓] Scroll performance
- [✓] Touch responsiveness
- [✓] Bundle size optimization
```
