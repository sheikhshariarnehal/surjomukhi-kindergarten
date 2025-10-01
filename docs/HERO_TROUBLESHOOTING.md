# Hero Section Troubleshooting Guide

## 🔧 Issue: Showing Translation Keys Instead of Text

If you see text like "hero.slide1.title" instead of "Surjomukhi Kindergarten", follow these steps:

---

## ✅ Quick Fix (Most Common)

### Solution 1: Hard Refresh Browser

**Windows/Linux:**
- Press `Ctrl + Shift + R` or `Ctrl + F5`

**Mac:**
- Press `Cmd + Shift + R`

**Why this works:** Browser is caching old translation files. Hard refresh clears the cache.

---

### Solution 2: Clear Browser Cache

1. Open browser DevTools (F12)
2. Right-click on the refresh button
3. Select "Empty Cache and Hard Reload"

---

### Solution 3: Restart Dev Server

```bash
# Stop the server (Ctrl + C)
# Then restart:
npm run dev
```

After restart:
1. Wait for "Ready in X.Xs" message
2. Hard refresh browser (Ctrl + Shift + R)

---

## 🔍 Verify Translations Are Loaded

### Check 1: Verify Translation Files

**English translations** (`src/locales/en.json`):
```json
"hero": {
  "slide1": {
    "title": "Surjomukhi Kindergarten",
    "subtitle": "Education is the Backbone of the Nation",
    "description": "Quality Bangla medium education..."
  }
}
```

**Bangla translations** (`src/locales/bn.json`):
```json
"hero": {
  "slide1": {
    "title": "সূর্যমুখী কিন্ডারগার্টেন",
    "subtitle": "শিক্ষাই জাতির মেরুদণ্ড",
    "description": "২০০৪ সাল থেকে নার্সারি থেকে..."
  }
}
```

### Check 2: Verify Translation Keys Match

**In Hero.tsx:**
```typescript
titleKey: "hero.slide1.title"
subtitleKey: "hero.slide1.subtitle"
descriptionKey: "hero.slide1.description"
```

**In en.json/bn.json:**
```json
"hero": {
  "slide1": {
    "title": "...",
    "subtitle": "...",
    "description": "..."
  }
}
```

✅ Keys match perfectly!

---

## 🐛 Advanced Troubleshooting

### Issue: Still Showing Keys After Hard Refresh

**Step 1: Check Browser Console**
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors related to translations or locale files

**Step 2: Check Network Tab**
1. Open DevTools (F12)
2. Go to Network tab
3. Hard refresh (Ctrl + Shift + R)
4. Look for requests to locale files
5. Check if they return 200 status

**Step 3: Verify Language Context**

Check if `useTranslation()` hook is working:

```typescript
// In Hero.tsx
const { t, language } = useTranslation();
console.log('Current language:', language);
console.log('Translation test:', t('hero.slide1.title'));
```

Expected output:
- English: "Surjomukhi Kindergarten"
- Bangla: "সূর্যমুখী কিন্ডারগার্টেন"

---

## 🔄 Complete Reset Procedure

If nothing else works, try this complete reset:

### Step 1: Stop Dev Server
```bash
Ctrl + C
```

### Step 2: Clear Next.js Cache
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next

# Or manually delete the .next folder
```

### Step 3: Clear Browser Data
1. Open browser settings
2. Clear browsing data
3. Select "Cached images and files"
4. Clear data

### Step 4: Restart Everything
```bash
npm run dev
```

### Step 5: Open in Incognito/Private Window
- Chrome: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`
- Edge: `Ctrl + Shift + N`

This ensures no cache interference.

---

## ✅ Expected Results

### Slide 1 (English)
- **Title:** "Surjomukhi Kindergarten"
- **Subtitle:** "Education is the Backbone of the Nation"
- **Description:** "Quality Bangla medium education from Nursery to Grade 5 since 2004..."
- **Primary CTA:** "Apply for Admission"
- **Secondary CTA:** "Learn More"

### Slide 1 (Bangla)
- **Title:** "সূর্যমুখী কিন্ডারগার্টেন"
- **Subtitle:** "শিক্ষাই জাতির মেরুদণ্ড"
- **Description:** "২০০৪ সাল থেকে নার্সারি থেকে পঞ্চম শ্রেণী পর্যন্ত..."
- **Primary CTA:** "ভর্তির জন্য আবেদন করুন"
- **Secondary CTA:** "আরও জানুন"

---

## 🔍 Check Translation Function

### Verify `t()` Function is Working

Add temporary debug code in Hero.tsx:

```typescript
// After const { t, language } = useTranslation();
useEffect(() => {
  console.log('=== Translation Debug ===');
  console.log('Language:', language);
  console.log('Slide 1 Title:', t('hero.slide1.title'));
  console.log('Slide 1 Subtitle:', t('hero.slide1.subtitle'));
  console.log('Slide 1 Description:', t('hero.slide1.description'));
}, [language, t]);
```

**Expected Console Output (English):**
```
=== Translation Debug ===
Language: en
Slide 1 Title: Surjomukhi Kindergarten
Slide 1 Subtitle: Education is the Backbone of the Nation
Slide 1 Description: Quality Bangla medium education from Nursery to Grade 5 since 2004...
```

**Expected Console Output (Bangla):**
```
=== Translation Debug ===
Language: bn
Slide 1 Title: সূর্যমুখী কিন্ডারগার্টেন
Slide 1 Subtitle: শিক্ষাই জাতির মেরুদণ্ড
Slide 1 Description: ২০০৪ সাল থেকে নার্সারি থেকে পঞ্চম শ্রেণী পর্যন্ত...
```

---

## 🌐 Language Switching

### How to Switch Language

1. Look for language switcher in header (usually "EN" / "বাং" buttons)
2. Click to switch between English and Bangla
3. Hero section should update immediately

### If Language Switching Doesn't Work

**Check LanguageContext:**

```typescript
// src/contexts/LanguageContext.tsx should exist
// and be properly imported in layout
```

**Verify Provider Wraps App:**

```typescript
// In layout.tsx or _app.tsx
<LanguageProvider>
  {children}
</LanguageProvider>
```

---

## 📝 Common Issues & Solutions

### Issue 1: Keys Show on First Load, Then Disappear
**Cause:** Translations loading asynchronously  
**Solution:** This is normal, should resolve in <1 second

### Issue 2: Only English Works, Bangla Shows Keys
**Cause:** Bangla translation file not loaded  
**Solution:** Check `src/locales/bn.json` exists and is valid JSON

### Issue 3: Some Slides Work, Others Don't
**Cause:** Missing translation keys for specific slides  
**Solution:** Verify all slides have complete translations in both en.json and bn.json

### Issue 4: Buttons Show Keys, Text Works
**Cause:** CTA translation keys missing  
**Solution:** Check `hero.slide1.primaryCta` and `hero.slide1.secondaryCta` exist

---

## 🧪 Test Checklist

After fixing, verify:

- [ ] Slide 1 title shows "Surjomukhi Kindergarten" (not "hero.slide1.title")
- [ ] Slide 1 subtitle shows "Education is the Backbone of the Nation"
- [ ] Slide 1 description shows full text about Bangla medium education
- [ ] Primary button shows "Apply for Admission" (not "hero.slide1.primaryCta")
- [ ] Secondary button shows "Learn More"
- [ ] Slide 2 shows "Bangla Medium Excellence"
- [ ] Slide 3 shows "Holistic Development"
- [ ] Language switcher changes all text to Bangla
- [ ] Bangla text displays correctly (no boxes or question marks)
- [ ] All 3 slides work in both languages

---

## 🆘 Still Not Working?

### Last Resort: Manual Verification

1. **Check file exists:**
   ```bash
   ls src/locales/en.json
   ls src/locales/bn.json
   ```

2. **Validate JSON:**
   - Copy content of en.json
   - Paste into https://jsonlint.com/
   - Check for syntax errors
   - Repeat for bn.json

3. **Check file encoding:**
   - Files should be UTF-8 encoded
   - Especially important for Bangla characters

4. **Restart VS Code:**
   - Sometimes IDE needs restart to pick up changes
   - Close VS Code
   - Reopen project
   - Restart dev server

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Hero section shows "Surjomukhi Kindergarten" as title
2. ✅ Subtitle shows "Education is the Backbone of the Nation"
3. ✅ Description mentions "Bangla medium education from Nursery to Grade 5 since 2004"
4. ✅ Buttons show "Apply for Admission" and "Learn More"
5. ✅ Language switcher changes everything to Bangla
6. ✅ Bangla text displays properly: "সূর্যমুখী কিন্ডারগার্টেন"
7. ✅ All 3 slides work correctly
8. ✅ No console errors

---

## 📞 Need More Help?

If you've tried everything and it still doesn't work:

1. Check browser console for errors (F12 → Console)
2. Check network tab for failed requests (F12 → Network)
3. Verify all files are saved
4. Try a different browser
5. Check if other translations on the site work (footer, header, etc.)

---

**Last Updated:** 2025-10-01  
**Status:** Comprehensive troubleshooting guide

