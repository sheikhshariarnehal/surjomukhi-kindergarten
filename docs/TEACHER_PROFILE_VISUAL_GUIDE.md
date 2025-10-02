# Teacher Profile CV Style - Quick Reference

## Visual Design Guide

### Section Header Pattern
```
┌──────────────────────────────────────────┐
│ [🔷]  SECTION TITLE                      │
│ ═══════════════════════════════════════  │
│                                          │
│ Content goes here...                     │
└──────────────────────────────────────────┘
```

### Icon Colors & Meanings

| Section | Icon | Color | Purpose |
|---------|------|-------|---------|
| Subjects Taught | 📚 | Blue → Indigo | Academic subjects |
| Professional Summary | 👤 | Slate | Personal bio |
| Education & Qualifications | 🎓 | Purple | Academic credentials |
| Certifications & Training | 🏆 | Emerald | Professional development |
| Achievements & Recognition | ⭐ | Amber/Yellow | Awards & honors |
| Teaching Philosophy | 📖 | Indigo | Educational approach |

### Spacing System

```
Container:
├─ Padding: 24px (mobile) → 32px (tablet) → 40px (desktop)
└─ Gap between sections: 32px

Section:
├─ Header bottom border: 2px
├─ Icon container: 40x40px
├─ Title font: 16-18px, bold, uppercase
└─ Content padding left: 0-8px (responsive)

Content:
├─ Text size: 14-16px
├─ Line height: relaxed (1.625)
├─ Item spacing: 12px
└─ Paragraph spacing: 16px
```

### Interactive Elements

#### Subject Pills
```css
- Background: Blue-50
- Border: Blue-200
- Text: Blue-900
- Padding: 16px 16px
- Border radius: 8px
- Font: 14px, semibold
- Hover: Blue-100 + shadow
```

#### List Items
```css
- Bullet: Colored dot/icon
- Text: Gray-800, 14px
- Spacing: 12px between items
- Hover: Scale/rotate animation
```

#### Teaching Philosophy
```css
- Background: Blue-50 → Indigo-50 → Purple-50 gradient
- Border left: 4px Indigo-500
- Padding: 20px
- Border radius: 0 12px 12px 0
- Quote marks: 60px, Indigo-200, opacity 50%
- Text: 16px, italic
```

## Component Props

### ContentSection
```typescript
<ContentSection
  title="SECTION NAME"              // Uppercase, bold
  icon={<Icon className="h-4 w-4" />}  // Lucide icon
  iconColor="from-blue-500 to-indigo-600"  // Gradient
>
  {/* Content */}
</ContentSection>
```

## Responsive Breakpoints

| Screen | Size | Padding | Icon | Title |
|--------|------|---------|------|-------|
| Mobile | < 640px | 24px | 40px | 16px |
| Tablet | 640-1024px | 32px | 40px | 18px |
| Desktop | > 1024px | 40px | 40px | 18px |

## Color Palette

### Primary Colors
- Blue-500: `#3b82f6`
- Indigo-500: `#6366f1`
- Purple-500: `#a855f7`
- Emerald-500: `#10b981`
- Amber-500: `#f59e0b`
- Slate-500: `#64748b`

### Background Colors
- White: `#ffffff`
- Gray-50: `#f9fafb`
- Gray-100: `#f3f4f6`

### Text Colors
- Gray-900: `#111827` (Primary)
- Gray-800: `#1f2937` (Secondary)
- Gray-700: `#374151` (Tertiary)
- Gray-500: `#6b7280` (Muted)

## Animation Effects

### Icon Hover
```css
- Shadow: sm → lg
- Duration: 300ms
- Timing: ease-out
```

### List Item Hover
```css
- Bullet scale: 1 → 1.25
- Award icon rotate: 0deg → 12deg
- Duration: 200ms
- Timing: ease-in-out
```

### Badge Hover
```css
- Background: Blue-50 → Blue-100
- Shadow: none → sm
- Duration: 200ms
- Timing: ease-all
```

## Print Styles (Future)
```css
@media print {
  - Remove shadows
  - Flatten colors
  - Optimize spacing
  - Single column layout
  - Remove interactive states
}
```

## Accessibility

### Contrast Ratios
- Titles: 9:1 (Gray-900 on White)
- Body text: 7:1 (Gray-800 on White)
- Muted text: 4.5:1 (Gray-500 on White)

### Icon Labels
- All icons have `aria-hidden="true"`
- Text labels accompany all icons
- Semantic HTML structure

### Keyboard Navigation
- All interactive elements focusable
- Clear focus indicators
- Logical tab order

## Implementation Notes

1. **Conditional Rendering**: Each section checks if data exists before rendering
2. **Dynamic Spacing**: Top padding applied based on previous section existence
3. **Flexible Layout**: Works with any combination of sections
4. **Performance**: Motion animations use hardware acceleration
5. **Maintenance**: Component-based architecture for easy updates

## Common Patterns

### Adding a New Section
```tsx
<div className={previousSection ? 'pt-6' : ''}>
  {data && data.length > 0 && (
    <ContentSection
      title="NEW SECTION NAME"
      icon={<Icon className="h-4 w-4" />}
      iconColor="from-color-500 to-color-600"
    >
      {/* Content */}
    </ContentSection>
  )}
</div>
```

### List with Bullets
```tsx
<ul className="space-y-3" role="list">
  {items.map((item, index) => (
    <li key={index} className="flex items-start group">
      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-color-500 mt-2 mr-4 group-hover:scale-125 transition-transform"></div>
      <span className="text-gray-800 text-sm leading-relaxed">
        {item}
      </span>
    </li>
  ))}
</ul>
```

### Pills/Badges
```tsx
<div className="flex flex-wrap gap-2">
  {items.map((item, index) => (
    <span
      key={index}
      className="inline-flex items-center px-4 py-2 bg-color-50 border border-color-200 text-color-900 rounded-lg text-sm font-semibold hover:bg-color-100 hover:shadow-sm transition-all duration-200"
    >
      {item}
    </span>
  ))}
</div>
```
