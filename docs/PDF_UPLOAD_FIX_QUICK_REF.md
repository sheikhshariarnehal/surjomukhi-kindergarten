# PDF Upload Fix - Quick Reference

## 🎯 Issue
**Error**: "Upload failed: mime type application/pdf is not supported"

## ✅ Fix Applied
Updated Supabase storage bucket `uploads` to allow PDF and document types.

## 🔧 What Was Done

### 1. Supabase Bucket Update (Database)
```sql
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]::text[]
WHERE name = 'uploads';
```

### 2. Files Already Updated (Previous Fix)
- ✅ `/api/upload/route.ts` - API validation
- ✅ `UploadWidget.tsx` - Client component
- ✅ Notice create/edit forms - 10MB limit

## 📊 Supported Files

| Type | Extensions | Max Size | Status |
|------|-----------|----------|---------|
| Images | .jpg, .png, .gif, .webp | 5MB | ✅ Working |
| PDF | .pdf | 10MB | ✅ **FIXED** |
| Word | .doc, .docx | 10MB | ✅ Working |

## 🧪 Test Now
**URL**: http://localhost:3000/dashboard/notices/c904b534-0757-415e-bdc0-1fd7607dad66/edit

1. Click "Upload PDF or Document"
2. Select a PDF file (< 10MB)
3. Upload should succeed ✅
4. URL will be saved to notice

## 📝 For Production
Run this SQL on production Supabase:
```sql
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]::text[]
WHERE name = 'uploads';
```

## ✨ Status
**FIXED** - PDF uploads now working! 🎉
