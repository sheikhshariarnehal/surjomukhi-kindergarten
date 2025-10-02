# Mobile Header Testing Guide

## Quick Test Commands

### Start Development Server
```powershell
npm run dev
```

### View on Local Network (Mobile Testing)
```powershell
# Find your local IP
ipconfig

# Access from mobile device
# http://YOUR-LOCAL-IP:3000
```

## Browser DevTools Testing

### Chrome DevTools
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test these viewports:

```
Mobile Devices:
- iPhone SE (375 x 667)
- iPhone 12 Pro (390 x 844)
- iPhone 14 Pro Max (430 x 932)
- Pixel 5 (393 x 851)
- Galaxy S20 Ultra (412 x 915)
- Galaxy Fold (280 x 653)

Tablets:
- iPad Mini (768 x 1024)
- iPad Air (820 x 1180)
- iPad Pro (1024 x 1366)

Desktop:
- 1280 x 720
- 1920 x 1080
```

## Test Scenarios

### 1. Top Utility Bar

#### Extra Small Mobile (320-474px)
```
✓ Phone number visible and clickable
✓ Language switcher visible (scaled to 75%)
✓ Social icons hidden
✓ Email hidden
✓ Office hours hidden
✓ No horizontal scroll
✓ All touch targets 36x36px minimum
```

#### Small Mobile (475-639px)
```
✓ Phone number visible
✓ Language switcher visible (scaled to 90%)
✓ Social icons visible (4 icons)
✓ Email still hidden
✓ Office hours hidden
✓ All touch targets 44x44px
```

#### Large Mobile (640-767px)
```
✓ Phone number visible
✓ Email visible
✓ Language switcher at 100%
✓ Social icons visible
✓ Office hours hidden
✓ Text not truncated awkwardly
```

#### Desktop (1024px+)
```
✓ All contact info visible
✓ Office hours visible
✓ All elements properly spaced
✓ Hover states work
```

### 2. Main Navigation Bar

#### Logo & Branding
```
Mobile (320-474px):
✓ Logo is 32x32px
✓ School name is readable
✓ Tagline is hidden
✓ No text wrapping

Small Mobile (475px+):
✓ Logo is 36x36px
✓ Tagline appears
✓ Text truncates if too long

Desktop (1024px+):
✓ Logo is 40x40px
✓ Full branding visible
✓ Hover effects work
```

#### Action Buttons
```
Mobile:
✓ Search icon is 16x16px
✓ Menu icon is 20x20px
✓ Touch targets are 40x40px minimum
✓ Active states provide feedback

xs+ (475px):
✓ Icons scale to 20x20px (search), 24x24px (menu)
✓ Touch targets are 44x44px
✓ Proper spacing maintained
```

### 3. Mobile Menu

#### Opening/Closing
```
✓ Menu slides in smoothly (300ms)
✓ Body scroll is locked when open
✓ Close button (X) works
✓ Clicking outside closes menu
✓ ESC key closes menu
✓ Background overlay appears
```

#### Menu Items
```
✓ All items are readable
✓ Touch targets are 44x48px
✓ Active state highlighted
✓ Text truncates not wraps
✓ Smooth scroll if content overflows
```

#### Submenu Behavior
```
✓ Chevron indicates expandable items
✓ Submenu slides down (300ms)
✓ Nested items properly indented
✓ Multiple levels work correctly
✓ Active chevron rotates 180°
```

#### Sticky CTA
```
✓ "Apply Now" button stays at bottom
✓ Button is always visible
✓ Touch target is 48-52px height
✓ Gradient animation works
```

### 4. Search Functionality

#### Mobile (< 1024px)
```
✓ Opens full-screen modal
✓ Background is blurred
✓ Input is focused automatically
✓ Close button works
✓ Clicking outside closes
✓ ESC key closes
✓ Input is large and touch-friendly
```

#### Desktop (1024px+)
```
✓ Opens inline search
✓ Proper width (256px)
✓ Doesn't block other elements
✓ Close button works
✓ Maintains focus properly
```

### 5. Touch Interactions

#### Tap Targets
```
Test each element:
✓ Phone link
✓ Email link
✓ Social icons
✓ Language switcher
✓ Search button
✓ Menu button
✓ Logo
✓ Menu items
✓ Submenu toggles
✓ CTA button

Minimum sizes:
✓ 40x40px on mobile
✓ 44x44px on xs+
```

#### Visual Feedback
```
On tap/touch:
✓ Color changes immediately
✓ Scale animation (if applicable)
✓ Background color changes
✓ No delay (< 100ms response)
```

### 6. Accessibility

#### Keyboard Navigation
```
✓ Tab through all interactive elements
✓ Skip links work
✓ Focus visible on all elements
✓ ESC closes menus
✓ Enter activates buttons/links
✓ Arrow keys work in menus (if implemented)
```

#### Screen Reader
```
✓ All images have alt text
✓ Buttons have aria-labels
✓ Menu states announced
✓ Links are descriptive
✓ Landmarks used properly
```

#### ARIA
```
✓ aria-expanded on dropdowns
✓ aria-label on icon buttons
✓ aria-controls linking menus
✓ aria-haspopup where needed
✓ role="menu" on menus
✓ role="menuitem" on items
```

### 7. Performance

#### Loading
```
✓ First Paint < 1.5s (mobile)
✓ Time to Interactive < 2.5s
✓ No layout shift
✓ Images load progressively
```

#### Animations
```
✓ 60fps on all animations
✓ No janky scrolling
✓ Touch response < 100ms
✓ Smooth transitions
```

#### Network
```
Test on throttled connection:
✓ Fast 3G (750ms RTT)
✓ Slow 3G (2000ms RTT)
✓ Offline (shows error)
```

### 8. Browser Compatibility

#### iOS Safari
```
✓ Touch events work
✓ No zoom on input focus
✓ Scroll behavior correct
✓ Safe area respected
✓ Status bar doesn't overlap
```

#### Chrome Mobile (Android)
```
✓ Touch events work
✓ Ripple effects (native)
✓ Scroll smooth
✓ No address bar issues
```

#### Samsung Internet
```
✓ All features work
✓ Layout correct
✓ Fonts render properly
```

#### Firefox Mobile
```
✓ All interactions work
✓ No layout bugs
✓ Performance good
```

### 9. Orientation Changes

#### Portrait to Landscape
```
✓ Layout adapts immediately
✓ No content cutoff
✓ Menu closes gracefully
✓ No horizontal scroll
```

#### Landscape to Portrait
```
✓ Elements reflow correctly
✓ Touch targets maintain size
✓ Content remains accessible
```

### 10. Edge Cases

#### Very Long Text
```
✓ School name truncates
✓ Menu items truncate
✓ Email truncates with ellipsis
✓ No text overflow
```

#### Very Small Screens (< 320px)
```
✓ Still functional
✓ No broken layout
✓ All features accessible
```

#### Very Large Screens (> 2560px)
```
✓ Content centered
✓ Max-width applied
✓ No stretched elements
```

## Automated Testing

### Visual Regression
```powershell
# If using visual testing tool
npm run test:visual
```

### Lighthouse Audit
```
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select:
   - Mobile device
   - Performance
   - Accessibility
   - Best Practices
4. Run audit
5. Check scores:
   ✓ Performance: 90+
   ✓ Accessibility: 95+
   ✓ Best Practices: 100
```

### Accessibility Testing
```powershell
# Using axe DevTools
npm run test:a11y

# Manual check with screen reader
# Windows: NVDA or JAWS
# Mac: VoiceOver
# Mobile: TalkBack (Android) or VoiceOver (iOS)
```

## Real Device Testing

### iOS Devices
```
1. Connect to same Wi-Fi as dev machine
2. Open Safari
3. Navigate to http://YOUR-IP:3000
4. Test all interactions
5. Check Safari Web Inspector for errors
```

### Android Devices
```
1. Connect to same Wi-Fi
2. Open Chrome
3. Navigate to http://YOUR-IP:3000
4. Test all interactions
5. Use Chrome DevTools Remote Debugging
```

## Common Issues to Check

### ❌ Horizontal Scroll
```
Check for:
- Elements wider than viewport
- Missing overflow-x-hidden
- Incorrect width calculations
```

### ❌ Text Wrapping
```
Check for:
- Missing truncate classes
- Incorrect flex settings
- Missing min-w-0 on flex containers
```

### ❌ Touch Target Too Small
```
Check for:
- Elements < 40x40px
- Missing min-w/min-h
- Padding too small
```

### ❌ Menu Not Scrolling
```
Check for:
- Missing overflow-y-auto
- Incorrect height calculation
- Body scroll not locked
```

### ❌ Animation Lag
```
Check for:
- Using non-composite properties
- Too many simultaneous animations
- Missing will-change hints
- Heavy JavaScript during animation
```

## Testing Checklist Export

```
[ ] All breakpoints tested
[ ] Touch targets verified
[ ] Keyboard navigation works
[ ] Screen reader accessible
[ ] No horizontal scroll
[ ] Text truncates properly
[ ] Menu scrolls smoothly
[ ] Search modal works
[ ] All links functional
[ ] Performance acceptable
[ ] iOS Safari tested
[ ] Chrome Mobile tested
[ ] Tablet sizes tested
[ ] Orientation changes handled
[ ] Lighthouse scores good
```

## Report Template

```markdown
# Mobile Header Test Report

**Date:** [Date]
**Tested By:** [Name]
**Device:** [Device Name/Browser]
**Screen Size:** [Width x Height]

## Results

### Functionality
- Top Bar: ✓ Pass / ✗ Fail
- Navigation: ✓ Pass / ✗ Fail
- Mobile Menu: ✓ Pass / ✗ Fail
- Search: ✓ Pass / ✗ Fail

### Performance
- Load Time: [X]s
- FPS: [X]fps
- Touch Response: [X]ms

### Issues Found
1. [Issue description]
   - Severity: High/Medium/Low
   - Steps to reproduce:
   - Expected:
   - Actual:

### Screenshots
[Attach screenshots]

### Notes
[Additional observations]
```

## Quick Fixes

### If horizontal scroll appears:
```css
body {
  overflow-x: hidden;
}
```

### If touch targets too small:
```css
.button {
  min-width: 44px;
  min-height: 44px;
}
```

### If text overflows:
```css
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### If menu doesn't scroll:
```css
.menu {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overscroll-behavior: contain;
}
```
