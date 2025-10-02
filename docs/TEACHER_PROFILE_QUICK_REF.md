# Teacher Profile CV Style - Quick Reference Card

## 🎨 Design System

### Section Icons & Colors
```
📚 SUBJECTS TAUGHT           → Blue → Indigo
👤 PROFESSIONAL SUMMARY      → Slate
🎓 EDUCATION & QUALIFICATIONS → Purple  
🏆 CERTIFICATIONS & TRAINING → Emerald
⭐ ACHIEVEMENTS & RECOGNITION → Amber → Yellow
📖 TEACHING PHILOSOPHY       → Indigo
```

### Typography Scale
```
Headers:  16-18px | Bold | Uppercase
Body:     14-16px | Regular | Normal case
Muted:    12-14px | Regular | Gray-500
```

### Spacing System
```
Container:  24px (mobile) → 32px (tablet) → 40px (desktop)
Sections:   32px gap
Content:    12-16px spacing
Lists:      12px between items
```

### Color Palette
```
Primary Text:    Gray-900 (#111827)
Secondary Text:  Gray-800 (#1f2937)
Muted Text:      Gray-500 (#6b7280)
Borders:         Gray-200 (#e5e7eb)
Background:      White (#ffffff)
```

## 🏗️ Component Structure

```tsx
<ContentSection
  title="SECTION NAME"
  icon={<Icon className="h-4 w-4" />}
  iconColor="from-[color]-500 to-[color]-600"
>
  {/* Section content */}
</ContentSection>
```

## 📱 Responsive Breakpoints

| Device  | Width      | Padding | Icon |
|---------|------------|---------|------|
| Mobile  | < 640px    | 24px    | 40px |
| Tablet  | 640-1024px | 32px    | 40px |
| Desktop | > 1024px   | 40px    | 40px |

## 🎭 Interactive States

### Hover Effects
- Subject badges: bg-blue-50 → bg-blue-100 + shadow
- List bullets: scale(1) → scale(1.25)
- Award icons: rotate(0deg) → rotate(12deg)
- Icon containers: shadow-md → shadow-lg

### Transitions
- Duration: 200ms
- Timing: ease-in-out / ease-out

## 📐 Layout Pattern

```
┌─────────────────────────────────────┐
│ [ICON] SECTION TITLE                │
│ ════════════════════════             │
│                                     │
│ Content with proper spacing         │
│ and clean typography                │
│                                     │
└─────────────────────────────────────┘
     ↓ 32px gap
┌─────────────────────────────────────┐
│ [ICON] NEXT SECTION                 │
│ ════════════════════════             │
│ ...                                 │
```

## 🔧 Common Patterns

### Pills/Badges
```tsx
<span className="px-4 py-2 bg-[color]-50 border border-[color]-200 
      text-[color]-900 rounded-lg text-sm font-semibold 
      hover:bg-[color]-100 hover:shadow-sm transition-all">
  {text}
</span>
```

### List Items
```tsx
<li className="flex items-start group">
  <div className="w-2 h-2 rounded-full bg-[color]-500 mt-2 mr-4 
       group-hover:scale-125 transition-transform" />
  <span className="text-gray-800 text-sm">{text}</span>
</li>
```

### Quote Block
```tsx
<div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 
     to-purple-50 border-l-4 border-indigo-500 p-5 rounded-r-xl">
  <div className="absolute top-2 left-2 text-6xl opacity-50">"</div>
  <blockquote className="text-base italic relative z-10 pt-4">
    {text}
  </blockquote>
  <div className="absolute bottom-2 right-4 text-6xl opacity-50">"</div>
</div>
```

## ✅ Testing Checklist

- [ ] All sections render correctly
- [ ] Hover effects work smoothly
- [ ] Responsive on all devices
- [ ] Text is readable
- [ ] Colors have good contrast
- [ ] Animations are smooth
- [ ] Print-friendly layout
- [ ] Accessibility compliant

## 🌐 URLs

**Development**: http://localhost:3002/teachers/[slug]
**Production**: TBD

## 📚 Documentation

1. `TEACHER_PROFILE_CV_REDESIGN.md` - Full implementation guide
2. `TEACHER_PROFILE_VISUAL_GUIDE.md` - Visual design reference
3. `TEACHER_PROFILE_BEFORE_AFTER.md` - Comparison document
4. `TEACHER_PROFILE_IMPLEMENTATION_SUMMARY.md` - Summary

## 🎯 Key Features

✅ Unified single-card CV layout
✅ Color-coded sections with gradients
✅ Professional typography
✅ Smooth hover animations
✅ Fully responsive design
✅ Print-friendly output
✅ Accessible by default
✅ Educational aesthetic

---

**Version**: 1.0
**Last Updated**: October 2, 2025
**Status**: ✅ Production Ready
