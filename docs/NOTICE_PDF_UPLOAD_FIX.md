# Notice PDF Upload Fix - Implementation Summary

## 🐛 Issue

**Error**: "Invalid file type. Only images are allowed."
**Location**: `http://localhost:3000/dashboard/notices/[id]/edit`
**Problem**: Upload API was configured to only accept image files, preventing PDF uploads for notices.

## ✅ Solution Applied

### 1. Updated Upload API (`/api/upload/route.ts`)

#### File Type Validation
**Before:**
```typescript
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
```

**After:**
```typescript
const allowedTypes = [
  'image/jpeg', 
  'image/png', 
  'image/gif', 
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
```

#### File Size Limits
**Before:**
- All files: 5MB max

**After:**
- Images: 5MB max
- Documents (PDF, DOC, DOCX): 10MB max

```typescript
const isDocument = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
const maxSize = isDocument ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
```

#### Supabase Bucket Configuration
```typescript
allowedMimeTypes: [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]
```

### 2. Updated UploadWidget Component

#### Default Max Size
**Before:**
```typescript
maxSize = 5 * 1024 * 1024, // 5MB
```

**After:**
```typescript
maxSize = 10 * 1024 * 1024, // 10MB default (for PDFs)
```

### 3. Updated Notice Forms

#### Create Notice Page (`/dashboard/notices/create/page.tsx`)
```typescript
<UploadWidget
  maxSize={10 * 1024 * 1024}  // Added explicit 10MB limit
  helperText="Supported formats: PDF, DOC, DOCX (Max 10MB)"
/>
```

#### Edit Notice Page (`/dashboard/notices/[id]/edit/page.tsx`)
```typescript
<UploadWidget
  maxSize={10 * 1024 * 1024}  // Added explicit 10MB limit
  helperText="Supported formats: PDF, DOC, DOCX (Max 10MB)"
/>
```

## 📋 Supported File Types

### Images
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ GIF (.gif)
- ✅ WebP (.webp)
- **Max Size**: 5MB

### Documents
- ✅ PDF (.pdf)
- ✅ DOC (.doc)
- ✅ DOCX (.docx)
- **Max Size**: 10MB

## 🔧 Technical Details

### Upload Flow
1. User selects file in UploadWidget
2. File validated client-side (file type, size)
3. File sent to `/api/upload` endpoint
4. Server validates file type and size
5. Supabase Storage bucket verified/created
6. File uploaded to `uploads/notices/` folder
7. Public URL returned to form
8. URL saved to `notices.file_url` in database

### Storage Structure
```
Supabase Storage
└── uploads (bucket)
    └── notices/ (folder)
        ├── 1234567890-abc123.pdf
        ├── 1234567891-def456.pdf
        └── 1234567892-ghi789.docx
```

### Security Features
- ✅ Authentication required (admin only)
- ✅ File type validation (whitelist)
- ✅ File size limits enforced
- ✅ Unique filenames (timestamp + random string)
- ✅ Public bucket with controlled access
- ✅ MIME type verification

## 🎯 What Was Fixed

1. **PDF Upload Support**: PDFs can now be uploaded for notices
2. **DOC/DOCX Support**: Word documents also supported
3. **Increased Size Limit**: Documents can be up to 10MB (vs 5MB for images)
4. **Better Error Messages**: Clear messages for file type and size errors
5. **Bucket Configuration**: Supabase bucket properly configured for documents
6. **Consistent UI**: Both create and edit pages updated

## 🧪 Testing

### Test Cases
1. ✅ Upload PDF < 10MB → Success
2. ✅ Upload DOC/DOCX < 10MB → Success
3. ✅ Upload image < 5MB → Success
4. ✅ Upload PDF > 10MB → Error: "File too large"
5. ✅ Upload invalid type (.exe, .zip) → Error: "Invalid file type"
6. ✅ Edit existing notice with PDF → PDF displays correctly
7. ✅ Create new notice with PDF → PDF uploads and saves

### Test URLs
- Create: `http://localhost:3000/dashboard/notices/create`
- Edit: `http://localhost:3000/dashboard/notices/[id]/edit`
- View: `http://localhost:3000/notices/[id]`

## 📊 File Type Detection

### Content-Type Headers
```
PDF:   application/pdf
DOC:   application/msword
DOCX:  application/vnd.openxmlformats-officedocument.wordprocessingml.document
JPEG:  image/jpeg
PNG:   image/png
GIF:   image/gif
WebP:  image/webp
```

## 🚀 Deployment Notes

### Environment Variables
No changes required to environment variables.

### Supabase Storage
- Bucket: `uploads` (auto-created if not exists)
- Public: `true`
- File Size Limit: `10485760` bytes (10MB)

### Production Checklist
- [ ] Test PDF upload in staging
- [ ] Verify Supabase bucket exists in production
- [ ] Test file size limits (5MB images, 10MB documents)
- [ ] Verify public URLs are accessible
- [ ] Test download functionality on frontend
- [ ] Monitor Supabase storage usage

## 💡 Usage Example

### Creating Notice with PDF
```typescript
// 1. User fills out form
const notice = {
  title: "Important School Update",
  content: "Please see attached document...",
  publish_date: "2025-11-13",
  file_url: "" // Will be set by upload
};

// 2. User uploads PDF
// UploadWidget handles the upload

// 3. onUpload callback receives URL
const handleFileUpload = (url: string) => {
  setFileUrl(url);
  setValue('file_url', url);
};

// 4. Form submission includes file_url
const response = await fetch('/api/notices', {
  method: 'POST',
  body: JSON.stringify({
    ...notice,
    file_url: fileUrl
  })
});
```

## 🔍 Troubleshooting

### Issue: "Upload failed"
**Solution**: Check browser console for specific error. Verify:
- File type is in allowed list
- File size is within limits
- User is authenticated
- Supabase bucket exists

### Issue: "Invalid file type"
**Solution**: Ensure file has correct MIME type:
- PDFs should be `application/pdf`
- Not all PDF viewers set correct MIME type
- Try opening PDF in browser first to verify

### Issue: File uploads but URL not saved
**Solution**: 
- Check `onUpload` callback is working
- Verify `setValue('file_url', url)` is called
- Check form validation for file_url field

## 📚 Related Files

### Modified Files
1. `src/app/api/upload/route.ts` - Upload API endpoint
2. `src/components/admin/UploadWidget.tsx` - Upload component
3. `src/app/(admin)/dashboard/notices/create/page.tsx` - Create form
4. `src/app/(admin)/dashboard/notices/[id]/edit/page.tsx` - Edit form

### Related Database
- Table: `notices`
- Column: `file_url` (text, nullable)
- Storage: Supabase Storage bucket `uploads`

## ✨ Summary

The PDF upload issue for notices has been **completely resolved**. Users can now:
- ✅ Upload PDFs up to 10MB
- ✅ Upload DOC/DOCX documents up to 10MB
- ✅ Continue uploading images up to 5MB
- ✅ Edit existing notices and change attachments
- ✅ View clear error messages for invalid files

All changes are backward compatible and existing notices with attachments will continue to work without modification.
