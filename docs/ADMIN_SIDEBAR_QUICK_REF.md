# Admin Sidebar Quick Reference

## 🚀 Quick Start

The admin sidebar is located at: `src/components/admin/Sidebar.tsx`

## 📋 Component Usage

```tsx
import Sidebar from '@/components/admin/Sidebar';

<Sidebar
  collapsed={false}
  onToggle={() => setCollapsed(!collapsed)}
  userRole="admin"
/>
```

## 🎨 Visual Features

### Desktop View
- **Expanded**: 288px (72px × 4) wide
- **Collapsed**: 80px (20px × 4) wide
- **Toggle**: External button on the right edge

### Mobile View
- **Width**: 288px (280px max-width)
- **Behavior**: Slide overlay from left
- **Backdrop**: Blur effect with 60% opacity

## 🔐 Role System

| Role | Access Level | Badge Color | Icon |
|------|--------------|-------------|------|
| **Superadmin** | Full access | Purple/Pink gradient | Shield |
| **Admin** | Most features | Blue/Cyan gradient | Database |
| **Editor** | Content only | Green/Emerald gradient | Layers |

## 📑 Navigation Sections

### 1. Overview
- Dashboard

### 2. Content Management
- Notices
- News  
- Events

### 3. Academic
- Teachers
- Students
- Admissions (with "New" badge)

### 4. Media & Resources
- Gallery
- Downloads

### 5. Administration
- Users (Superadmin only)
- Settings (Admin+)

## 🎯 Key Features

### ✅ Active State
- Blue gradient background
- White indicator line on left
- White icon and text
- Elevated shadow

### 🎨 Hover Effect
- Translates 4px to the right
- Icon scales to 110%
- Background color changes
- Smooth transitions

### 💬 Tooltips (Collapsed)
- Appears on hover
- Shows item label
- Shows badges if present
- Positioned to the right

### 🔄 Animations
- **Width transition**: 300ms
- **Hover effects**: 200ms
- **Status dot**: Infinite pulse
- **Bars**: Staggered opacity

## 🎨 Customization

### Add New Menu Item

```tsx
// In menuSections array, add to appropriate section:
{
  label: 'My Feature',
  href: '/dashboard/my-feature',
  icon: <Icon className="h-5 w-5" />,
  section: 'content',
  badge: 'Beta',           // Optional
  requiredRole: 'admin',   // Optional
}
```

### Change Colors

```tsx
// Active state gradient
className="bg-gradient-to-r from-blue-600 to-blue-500"

// Hover background
className="hover:bg-slate-800/60"

// Border color
className="border-slate-700/50"
```

### Adjust Sizing

```tsx
// Collapsed width
collapsed ? 'w-20' : 'w-72'

// Icon size
<Icon className="h-5 w-5" />

// Padding
className="px-3 py-2.5"
```

## 📱 Responsive Classes

```tsx
// Desktop only
className="hidden lg:flex"

// Mobile only
className="lg:hidden"

// Desktop: sticky, Mobile: fixed
className="hidden lg:flex lg:sticky"
```

## 🎭 Component States

### Collapsed State
```tsx
collapsed={true}
// Shows: Icons only + tooltips on hover
// Width: 80px
```

### Expanded State
```tsx
collapsed={false}
// Shows: Icons + labels + sections + badges
// Width: 288px
```

## 🔧 Props Reference

```typescript
interface SidebarProps {
  collapsed?: boolean;          // Default: false
  onToggle?: () => void;        // Toggle callback
  userRole?: 'superadmin' | 'admin' | 'editor';  // Default: 'admin'
}
```

## 🎯 Common Tasks

### Toggle Sidebar
```tsx
const [collapsed, setCollapsed] = useState(false);

<Sidebar
  collapsed={collapsed}
  onToggle={() => setCollapsed(!collapsed)}
/>
```

### Filter by Role
```tsx
// Automatic - just pass the role
<Sidebar userRole={currentUser.role} />
```

### Add Section
```tsx
// Add to menuSections array
{
  title: 'New Section',
  items: [
    {
      label: 'Item',
      href: '/dashboard/item',
      icon: <Icon className="h-5 w-5" />,
      section: 'new',
    },
  ],
}
```

## 🐛 Troubleshooting

### Sidebar not showing
- Check z-index (should be 40+ for desktop, 50 for mobile)
- Verify parent container has proper height
- Check if hidden by CSS

### Toggle not working
- Ensure `onToggle` callback is provided
- Check state management in parent
- Verify button is not disabled

### Items not filtering
- Check `userRole` prop is passed correctly
- Verify `requiredRole` on menu items
- Check role hierarchy logic

### Mobile overlay issues
- Verify overlay z-index (should be 40)
- Check if `onClick` handler is attached
- Ensure backdrop blur is supported

## 📊 Performance Tips

1. **Use CSS transitions** instead of JS animations
2. **Enable GPU acceleration** with transform properties
3. **Lazy load icons** if adding many more
4. **Memoize** filtered sections if list is large
5. **Optimize images** if adding logo

## 🎨 Styling Classes

### Custom Scrollbar
```css
.scrollbar-thin
.scrollbar-thumb-slate-700
.scrollbar-track-transparent
```

### Shadow Effects
```css
.shadow-2xl          /* Sidebar container */
.shadow-lg           /* Active items */
.shadow-blue-500/30  /* Active item glow */
```

### Gradients
```css
.bg-gradient-to-br   /* Main background */
.bg-gradient-to-r    /* Role badges & active states */
```

## 🔗 Related Files

- Layout: `src/app/(admin)/layout.tsx`
- Topbar: `src/components/admin/Topbar.tsx`
- Styles: `src/app/globals.css`
- Utils: `src/lib/utils.ts` (cn function)

## 📚 Documentation

- Full docs: `docs/ADMIN_SIDEBAR_OPTIMIZATION.md`
- Comparison: `docs/ADMIN_SIDEBAR_BEFORE_AFTER.md`
- Component index: `src/components/admin/index.ts`

## ✅ Testing Checklist

- [ ] Desktop expanded state
- [ ] Desktop collapsed state
- [ ] Toggle button works
- [ ] Mobile slide-in
- [ ] Mobile overlay closes
- [ ] Active state highlights
- [ ] Hover effects work
- [ ] Tooltips appear (collapsed)
- [ ] Role filtering works
- [ ] Badges display correctly
- [ ] Keyboard navigation
- [ ] Screen reader announces items
- [ ] Touch targets (min 44×44px)

## 🎓 Best Practices

1. ✅ Keep section headers concise (1-3 words)
2. ✅ Use consistent icon sizes (h-5 w-5)
3. ✅ Limit badges to important items only
4. ✅ Test on real devices, not just browser
5. ✅ Maintain color contrast for accessibility
6. ✅ Keep menu items under 15 total
7. ✅ Group related items in sections
8. ✅ Use semantic naming for sections

---

**Quick Access**: `http://localhost:3004/dashboard`
**Version**: 2.0
**Last Updated**: November 14, 2025
