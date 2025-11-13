# Notice Card Mobile - Quick Fix Reference

## 🐛 Problem
Bottom section not responsive on mobile - buttons wrapping awkwardly

## ✅ Solution

### Layout Change
```diff
- <div className="flex flex-wrap items-center justify-between gap-2">
+ <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
```

### Main Button
```diff
- <Link className="inline-flex items-center gap-1.5 px-4 py-2 ...">
+ <Link className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 ... w-full sm:w-auto">
```

### Secondary Actions Container
```diff
- <div className="flex items-center gap-2 ml-auto">
+ <div className="flex items-center gap-2 justify-between sm:justify-end">
```

### Download Button
```diff
- <a className="inline-flex items-center gap-1.5 px-3 py-2 ...">
+ <a className="inline-flex items-center gap-1.5 px-3 py-2 ... flex-1 sm:flex-initial justify-center">
   <svg>...</svg>
   <span className="hidden sm:inline">{t.download}</span>
+  <span className="sm:hidden">File</span>
 </a>
```

### Icon Buttons
```diff
- <button className="... w-9 h-9">
+ <button className="... w-10 h-10">
```

## 📱 Visual Layout

### Mobile (< 640px)
```
┌───────────────────────────────┐
│ [Read Full Notice - Full W]  │ ← Full width primary CTA
├───────────────────────────────┤
│ [File]    [Share]    [Print]  │ ← Evenly distributed
└───────────────────────────────┘
```

### Desktop (≥ 640px)
```
┌─────────────────────────────────────────┐
│ [Read Full Notice]  [Download][📤][🖨️] │ ← Single row
└─────────────────────────────────────────┘
```

## 🎯 Key Improvements

1. **Stacking on Mobile** - `flex-col` prevents awkward wrapping
2. **Full-width CTA** - `w-full sm:w-auto` makes primary action prominent
3. **Better Distribution** - `justify-between sm:justify-end` spreads buttons
4. **Bigger Touch Targets** - `w-10 h-10` (40px) follows mobile guidelines
5. **Mobile-friendly Text** - Shows "File" instead of "Download" on small screens

## ⚡ Quick Test
1. Open `/notices` page
2. Resize browser to mobile width (< 640px)
3. Check bottom of notice cards
4. ✅ Should see full-width blue button on top
5. ✅ Should see evenly spaced action buttons below

---

**File:** `src/app/(frontend)/notices/page.tsx`  
**Status:** ✅ Fixed
