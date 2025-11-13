-- Migration: Update uploads bucket to support PDFs and documents
-- Date: 2025-11-13
-- Description: Allow PDF, DOC, and DOCX file uploads in the uploads bucket

-- Update the uploads bucket to allow PDF and document mime types
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'image/jpeg',
  'image/png', 
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]::text[]
WHERE name = 'uploads';

-- Verify the update
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  updated_at
FROM storage.buckets 
WHERE name = 'uploads';
