'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Upload, X, Image as ImageIcon, Star, StarOff } from 'lucide-react';
import { supabaseAdmin } from '@/lib/db';

export interface UploadedImage {
  id: string;
  url: string;
  caption?: string;
  is_primary?: boolean;
  file?: File;
}

export interface MultipleImageUploadProps {
  onImagesChange: (images: UploadedImage[]) => void;
  onError?: (error: string) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxImages?: number;
  bucket?: string;
  folder?: string;
  className?: string;
  disabled?: boolean;
  currentImages?: UploadedImage[];
  label?: string;
  helperText?: string;
}

export function MultipleImageUpload({
  onImagesChange,
  onError,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  maxImages = 10,
  bucket = 'uploads',
  folder = 'events',
  className,
  disabled = false,
  currentImages = [],
  label,
  helperText,
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>(currentImages);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [bulkUrlInput, setBulkUrlInput] = useState('');

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      throw new Error(error.message);
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || uploading) return;

      // Check if adding these files would exceed the limit
      if (images.length + acceptedFiles.length > maxImages) {
        onError?.(`Maximum ${maxImages} images allowed`);
        return;
      }

      try {
        setUploading(true);

        const uploadPromises = acceptedFiles.map(async (file) => {
          const url = await uploadFile(file);
          return {
            id: `temp-${Date.now()}-${Math.random()}`,
            url,
            caption: '',
            is_primary: images.length === 0, // First image is primary by default
            file,
          };
        });

        const uploadedImages = await Promise.all(uploadPromises);
        const newImages = [...images, ...uploadedImages];
        
        setImages(newImages);
        onImagesChange(newImages);
      } catch (error) {
        console.error('Upload error:', error);
        onError?.(error instanceof Error ? error.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [images, onImagesChange, onError, disabled, uploading, maxImages, bucket, folder]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: true,
    disabled: disabled || uploading || images.length >= maxImages,
  });

  const removeImage = (imageId: string) => {
    const newImages = images.filter(img => img.id !== imageId);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const updateImageCaption = (imageId: string, caption: string) => {
    const newImages = images.map(img => 
      img.id === imageId ? { ...img, caption } : img
    );
    setImages(newImages);
    onImagesChange(newImages);
  };

  const setPrimaryImage = (imageId: string) => {
    const newImages = images.map(img => ({
      ...img,
      is_primary: img.id === imageId
    }));
    setImages(newImages);
    onImagesChange(newImages);
  };

  const addImageFromUrl = (url: string, caption?: string) => {
    if (!url.trim()) return;

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      onError?.('Please enter a valid URL');
      return;
    }

    if (images.length >= maxImages) {
      onError?.(`Maximum ${maxImages} images allowed`);
      return;
    }

    const newImage: UploadedImage = {
      id: `url-${Date.now()}-${Math.random()}`,
      url: url.trim(),
      caption: caption || '',
      is_primary: images.length === 0, // First image is primary by default
    };

    const newImages = [...images, newImage];
    setImages(newImages);
    onImagesChange(newImages);
  };

  const addMultipleUrlsFromText = (urlsText: string) => {
    const urls = urlsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (urls.length === 0) {
      onError?.('Please enter at least one URL');
      return;
    }

    if (images.length + urls.length > maxImages) {
      onError?.(`Adding ${urls.length} images would exceed the maximum of ${maxImages} images`);
      return;
    }

    const validUrls: string[] = [];
    const invalidUrls: string[] = [];

    urls.forEach(url => {
      try {
        new URL(url);
        validUrls.push(url);
      } catch {
        invalidUrls.push(url);
      }
    });

    if (invalidUrls.length > 0) {
      onError?.(`Invalid URLs found: ${invalidUrls.join(', ')}`);
      return;
    }

    const newImages = validUrls.map((url, index) => ({
      id: `bulk-url-${Date.now()}-${index}`,
      url,
      caption: '',
      is_primary: images.length === 0 && index === 0, // First image is primary if no existing images
    }));

    const allImages = [...images, ...newImages];
    setImages(allImages);
    onImagesChange(allImages);
    setBulkUrlInput('');
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400',
            disabled || uploading ? 'opacity-50 cursor-not-allowed' : '',
            'mb-4'
          )}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin mx-auto h-8 w-8 text-blue-600">
                <Upload className="h-8 w-8" />
              </div>
              <p className="text-sm text-gray-600">Uploading images...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? 'Drop the images here...'
                    : `Drag & drop images here, or click to select (${images.length}/${maxImages})`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Max size: {Math.round(maxSize / 1024 / 1024)}MB per image
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600 font-medium">Some files were rejected:</p>
          <ul className="text-xs text-red-500 mt-1">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name}: {errors.map(e => e.message).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* URL Input Options */}
      {images.length < maxImages && (
        <div className="mb-4 space-y-4">
          <div className="flex items-center justify-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">Or add images from URLs</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowUrlInput(!showUrlInput)}
              disabled={disabled}
            >
              {showUrlInput ? 'Hide' : 'Add'} Single URL
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setBulkUrlInput(bulkUrlInput ? '' : 'https://example.com/image1.jpg\nhttps://example.com/image2.jpg')}
              disabled={disabled}
            >
              {bulkUrlInput ? 'Hide' : 'Add'} Multiple URLs
            </Button>
          </div>

          {/* Single URL Input */}
          {showUrlInput && (
            <div className="p-4 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Add Single Image URL</h4>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={disabled}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    addImageFromUrl(urlInput);
                    setUrlInput('');
                  }}
                  disabled={disabled || !urlInput.trim()}
                >
                  Add
                </Button>
              </div>
            </div>
          )}

          {/* Bulk URL Input */}
          {bulkUrlInput !== '' && (
            <div className="p-4 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Add Multiple Image URLs</h4>
              <p className="text-xs text-gray-500 mb-2">Enter one URL per line</p>
              <textarea
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                value={bulkUrlInput}
                onChange={(e) => setBulkUrlInput(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={disabled}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => addMultipleUrlsFromText(bulkUrlInput)}
                  disabled={disabled || !bulkUrlInput.trim()}
                >
                  Add All URLs
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBulkUrlInput('')}
                  disabled={disabled}
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image.url}
                  alt={image.caption || 'Event image'}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Controls */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPrimaryImage(image.id)}
                    className={cn(
                      'bg-white text-gray-700 hover:bg-gray-50',
                      image.is_primary && 'bg-yellow-100 text-yellow-700'
                    )}
                  >
                    {image.is_primary ? (
                      <Star className="h-4 w-4 fill-current" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeImage(image.id)}
                    className="bg-white text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Primary Badge */}
              {image.is_primary && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  Primary
                </div>
              )}

              {/* Caption Input */}
              <input
                type="text"
                placeholder="Add caption..."
                value={image.caption || ''}
                onChange={(e) => updateImageCaption(image.id, e.target.value)}
                className="mt-2 w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      )}

      {helperText && !uploading && (
        <p className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
