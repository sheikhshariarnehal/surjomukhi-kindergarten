# Notices Page - UI Quick Guide

## 🎨 Visual Design Overview

### Hero Section
```
┌─────────────────────────────────────────────────────────┐
│  🔵 [Pattern Overlay Background - Gradient Primary]     │
│                                                          │
│              ┌──────────┐                               │
│              │  🔔 Icon │  ← Glassmorphism Badge       │
│              └──────────┘                               │
│                                                          │
│            SCHOOL NOTICES                               │
│         Stay informed with the latest...                │
│                                                          │
│     ┌──────────┐  ┌──────────┐                        │
│     │    7     │  │    7     │  ← Statistics Cards     │
│     │  Total   │  │ Showing  │                         │
│     └──────────┘  └──────────┘                        │
│                                                          │
│  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿  ← Wave Divider         │
└─────────────────────────────────────────────────────────┘
```

### Search Card
```
┌─────────────────────────────────────────────────────────┐
│  Shadow-XL White Card                                   │
│                                                          │
│  ┌────┐  7 Notices                    ┌───────────────┐│
│  │ 📄 │  Available to view            │ 🔍 Search...  ││
│  └────┘                                └───────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Notice Card
```
┌─────────────────────────────────────────────────────────┐
│  White Card with Shadow-LG (hover: Shadow-2XL)          │
│                                                          │
│  ┌──────┐                                               │
│  │ 📄 🔵│  Notice Title Here          📅 Jan 15, 2025  │
│  └──────┘  Lorem ipsum dolor sit amet...                │
│                                                          │
│  Content preview text goes here and gets               │
│  truncated at 280 characters with ellipsis...          │
│                                                          │
│  ┌─────────────────────────────────────────┐           │
│  │ 📎 Download Attachment            ↗     │ (if file)│
│  └─────────────────────────────────────────┘           │
│                                                          │
│  ┌──────────────────┐  ┌────┐  ┌────┐                │
│  │ Read Full Notice │  │ 🔗 │  │ 🖨️ │                │
│  └──────────────────┘  └────┘  └────┘                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Detail Page Header
```
┌─────────────────────────────────────────────────────────┐
│  Gradient Header with Pattern                           │
│                                                          │
│    ┌──────┐                                             │
│    │ 📄🔵│  ← Icon Badge                                │
│    └──────┘                                             │
│                                                          │
│    NOTICE TITLE HERE                                    │
│                                                          │
│    ┌──────────────┐  ┌────────────┐                   │
│    │ 📅 Jan 15    │  │ 🔄 Updated │                   │
│    └──────────────┘  └────────────┘                   │
│                                                          │
│    ┌──────┐  ┌──────┐                                 │
│    │ 🔗 Share│  │ 🖨️ Print│                          │
│    └──────┘  └──────┘                                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📐 Spacing System

```
Padding Scale:
p-2  = 0.5rem (8px)
p-3  = 0.75rem (12px)
p-4  = 1rem (16px)
p-6  = 1.5rem (24px)
p-8  = 2rem (32px)
p-10 = 2.5rem (40px)

Gap Scale:
gap-2 = 0.5rem (8px)
gap-3 = 0.75rem (12px)
gap-4 = 1rem (16px)
gap-6 = 1.5rem (24px)

Rounded Corners:
rounded-lg  = 0.5rem (8px)
rounded-xl  = 0.75rem (12px)
rounded-2xl = 1rem (16px)
```

---

## 🎨 Color Usage

### Backgrounds
```
Hero: bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800
Cards: bg-white
Page: bg-gradient-to-b from-gray-50 to-white
Hover: hover:bg-gray-50, hover:bg-gray-100
File Badge: bg-gradient-to-br from-blue-50 to-indigo-50
```

### Text
```
Heading: text-gray-900
Body: text-gray-700
Secondary: text-gray-600
Meta: text-gray-500
White Text: text-white, text-white/90
```

### Borders
```
Light: border-gray-100
Medium: border-gray-200
Accent: border-blue-200
Width: border, border-2
```

---

## 📱 Responsive Behavior

### Mobile (< 640px)
```
┌──────────────────┐
│   Full Width     │
│                  │
│   ┌────────────┐ │
│   │ Hero       │ │
│   │ (Compact)  │ │
│   └────────────┘ │
│                  │
│   ┌────────────┐ │
│   │ Search     │ │
│   │ (Full)     │ │
│   └────────────┘ │
│                  │
│   ┌────────────┐ │
│   │ Notice 1   │ │
│   └────────────┘ │
│   ┌────────────┐ │
│   │ Notice 2   │ │
│   └────────────┘ │
└──────────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────────┐
│    Flexible Layout       │
│                          │
│  ┌──────────────────┐   │
│  │ Hero (Medium)    │   │
│  └──────────────────┘   │
│                          │
│  ┌──────────────────┐   │
│  │ Search Bar       │   │
│  └──────────────────┘   │
│                          │
│  ┌──────────────────┐   │
│  │ Notice Card 1    │   │
│  │ (Full Width)     │   │
│  └──────────────────┘   │
└──────────────────────────┘
```

### Desktop (> 1024px)
```
┌────────────────────────────────────────┐
│          Max Width Container           │
│                                        │
│   ┌────────────────────────────────┐  │
│   │ Hero (Full Width, Tall)        │  │
│   └────────────────────────────────┘  │
│                                        │
│   ┌────────────────────────────────┐  │
│   │ Search Bar (Centered)          │  │
│   └────────────────────────────────┘  │
│                                        │
│   ┌────────────────────────────────┐  │
│   │ Notice Card 1 (Expanded)       │  │
│   │ All features visible           │  │
│   └────────────────────────────────┘  │
└────────────────────────────────────────┘
```

---

## 🎭 Interactive States

### Buttons
```
Default:    bg-primary-600 text-white
Hover:      bg-primary-700
Focus:      ring-2 ring-primary-500
Active:     bg-primary-800
Disabled:   bg-gray-300 text-gray-500

Secondary:
Default:    bg-gray-50 text-gray-700
Hover:      bg-gray-100
```

### Input Fields
```
Default:    bg-gray-50 border-gray-200
Focus:      bg-white ring-2 ring-primary-500
Filled:     bg-white border-gray-300
Error:      border-red-300 ring-2 ring-red-200
```

### Cards
```
Default:    shadow-lg
Hover:      shadow-xl transform
Active:     shadow-2xl
Loading:    animate-pulse
```

---

## 🔤 Typography Scale

```
Hero Title:      text-4xl → text-5xl → text-6xl
Page Title:      text-3xl → text-4xl
Card Title:      text-xl → text-2xl
Body Large:      text-base → text-lg
Body:            text-sm → text-base
Small:           text-xs → text-sm

Font Weights:
Light:           font-light (300)
Regular:         font-normal (400)
Medium:          font-medium (500)
Semibold:        font-semibold (600)
Bold:            font-bold (700)
```

---

## ⚡ Animations

```
Page Load:       fade-in + slide-up (0.6s)
Cards:           staggered fade-in (0.05s delay each)
Hover:           transform + shadow (0.3s)
Search Clear:    fade-in (0.2s)
Buttons:         all (0.2s)
```

---

## 📊 Component Checklist

### Main Page (/notices)
- ✅ Hero section with gradient
- ✅ Pattern overlay background
- ✅ Icon badge with bell
- ✅ Statistics cards
- ✅ Wave divider
- ✅ Search card with icon
- ✅ Clear search button
- ✅ Notice cards with icons
- ✅ File attachment badges
- ✅ Action buttons
- ✅ Hover effects
- ✅ Responsive layout

### Detail Page (/notices/[id])
- ✅ Breadcrumb with icons
- ✅ Gradient header
- ✅ Pattern overlay
- ✅ Icon badge
- ✅ Meta information cards
- ✅ Action buttons in header
- ✅ Enhanced content typography
- ✅ Premium file card
- ✅ Footer with back link
- ✅ Responsive layout

---

## 🎯 Quick Tips

1. **Colors**: Use primary for CTAs, gray for secondary
2. **Spacing**: Consistent padding (p-6, p-8)
3. **Shadows**: Layer depth with shadow-lg/xl/2xl
4. **Rounded**: Use rounded-xl/2xl for modern feel
5. **Icons**: Include icons for better UX
6. **Animations**: Keep smooth (0.2s - 0.6s)
7. **Responsive**: Test on all breakpoints
8. **Contrast**: Ensure text readability

---

## ✅ Device Testing

```
✅ iPhone SE (375px)
✅ iPhone 12 Pro (390px)
✅ iPhone 14 Pro Max (430px)
✅ iPad Mini (768px)
✅ iPad Pro (1024px)
✅ Laptop (1366px)
✅ Desktop (1920px)
✅ 4K Display (3840px)
```

---

**Version**: 2.0  
**Status**: Production Ready  
**Last Updated**: November 13, 2025
