'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { 
  Upload, X, Star, StarOff, Image as ImageIcon, 
  CheckCircle, AlertCircle, Loader2, ZapIcon, 
  FileImage, Trash2, Eye, Settings2
} from 'lucide-react';

// Image optimization settings
interface OptimizationSettings {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'webp' | 'jpeg';
}

const DEFAULT_OPTIMIZATION: OptimizationSettings = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.85,
  format: 'webp',
};

const SEO_OPTIMIZATION: OptimizationSettings = {
  maxWidth: 1200,
  maxHeight: 800,
  quality: 0.80,
  format: 'webp',
};

export interface OptimizedImage {
  id: string;
  url: string;
  caption?: string;
  alt?: string;
  is_primary?: boolean;
  originalSize?: number;
  optimizedSize?: number;
  width?: number;
  height?: number;
}

export interface OptimizedImageUploadProps {
  onImagesChange: (images: OptimizedImage[]) => void;
  onError?: (error: string) => void;
  maxImages?: number;
  bucket?: string;
  folder?: string;
  className?: string;
  disabled?: boolean;
  currentImages?: OptimizedImage[];
  label?: string;
  helperText?: string;
  optimizationMode?: 'default' | 'seo' | 'custom';
  customOptimization?: Partial<OptimizationSettings>;
}

interface UploadingImage {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'optimizing' | 'uploading' | 'done' | 'error';
  error?: string;
  originalSize: number;
  optimizedSize?: number;
}

export function OptimizedImageUpload({
  onImagesChange,
  onError,
  maxImages = 10,
  bucket = 'uploads',
  folder = 'events',
  className,
  disabled = false,
  currentImages = [],
  label,
  helperText,
  optimizationMode = 'seo',
  customOptimization,
}: OptimizedImageUploadProps) {
  const [images, setImages] = useState<OptimizedImage[]>(currentImages);
  const [uploading, setUploading] = useState<UploadingImage[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<OptimizationSettings>(() => {
    if (customOptimization) return { ...DEFAULT_OPTIMIZATION, ...customOptimization };
    return optimizationMode === 'seo' ? SEO_OPTIMIZATION : DEFAULT_OPTIMIZATION;
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate optimization settings based on mode
  const getOptimizationSettings = (): OptimizationSettings => {
    if (customOptimization) return { ...DEFAULT_OPTIMIZATION, ...customOptimization };
    return optimizationMode === 'seo' ? SEO_OPTIMIZATION : DEFAULT_OPTIMIZATION;
  };

  // Optimize image using canvas
  const optimizeImage = useCallback(async (
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<{ blob: Blob; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        onProgress?.(20);
        
        const optimization = getOptimizationSettings();
        let { width, height } = img;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > optimization.maxWidth || height > optimization.maxHeight) {
          const widthRatio = optimization.maxWidth / width;
          const heightRatio = optimization.maxHeight / height;
          const ratio = Math.min(widthRatio, heightRatio);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        
        onProgress?.(40);
        
        // Create canvas and draw optimized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to create canvas context'));
          return;
        }
        
        // Apply smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        onProgress?.(60);
        
        // Convert to optimized format
        const mimeType = optimization.format === 'webp' ? 'image/webp' : 'image/jpeg';
        
        canvas.toBlob(
          (blob) => {
            onProgress?.(80);
            if (blob) {
              resolve({ blob, width, height });
            } else {
              reject(new Error('Failed to convert image'));
            }
          },
          mimeType,
          optimization.quality
        );
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    });
  }, [settings]);

  // Upload optimized file to API
  const uploadFile = useCallback(async (
    blob: Blob,
    originalFileName: string,
    onProgress?: (progress: number) => void
  ): Promise<string> => {
    const optimization = getOptimizationSettings();
    const ext = optimization.format === 'webp' ? 'webp' : 'jpg';
    const fileName = originalFileName.replace(/\.[^.]+$/, `.${ext}`);
    const file = new File([blob], fileName, { type: blob.type });
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);
    if (folder) {
      formData.append('folder', folder);
    }
    
    onProgress?.(90);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }
    
    const result = await response.json();
    onProgress?.(100);
    return result.url;
  }, [bucket, folder]);

  // Handle file drop/selection
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (disabled) return;
    
    const availableSlots = maxImages - images.length;
    if (availableSlots <= 0) {
      onError?.(`Maximum ${maxImages} images allowed`);
      return;
    }
    
    const filesToProcess = acceptedFiles.slice(0, availableSlots);
    
    // Create upload tracking entries
    const newUploading: UploadingImage[] = filesToProcess.map(file => ({
      id: `uploading-${Date.now()}-${Math.random().toString(36).substring(2)}`,
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'optimizing' as const,
      originalSize: file.size,
    }));
    
    setUploading(prev => [...prev, ...newUploading]);
    
    // Process each file
    for (const uploadingItem of newUploading) {
      try {
        // Update status to optimizing
        setUploading(prev => 
          prev.map(u => u.id === uploadingItem.id 
            ? { ...u, status: 'optimizing' as const, progress: 10 } 
            : u
          )
        );
        
        // Optimize image
        const { blob, width, height } = await optimizeImage(
          uploadingItem.file,
          (progress) => {
            setUploading(prev => 
              prev.map(u => u.id === uploadingItem.id 
                ? { ...u, progress: Math.min(progress, 79) } 
                : u
              )
            );
          }
        );
        
        // Update to uploading status
        setUploading(prev => 
          prev.map(u => u.id === uploadingItem.id 
            ? { ...u, status: 'uploading' as const, optimizedSize: blob.size, progress: 80 } 
            : u
          )
        );
        
        // Upload file
        const url = await uploadFile(
          blob,
          uploadingItem.file.name,
          (progress) => {
            setUploading(prev => 
              prev.map(u => u.id === uploadingItem.id 
                ? { ...u, progress: 80 + (progress - 80) * 0.2 } 
                : u
              )
            );
          }
        );
        
        // Mark as done
        setUploading(prev => 
          prev.map(u => u.id === uploadingItem.id 
            ? { ...u, status: 'done' as const, progress: 100 } 
            : u
          )
        );
        
        // Add to images
        const newImage: OptimizedImage = {
          id: `img-${Date.now()}-${Math.random().toString(36).substring(2)}`,
          url,
          caption: '',
          alt: uploadingItem.file.name.replace(/\.[^.]+$/, ''),
          is_primary: images.length === 0,
          originalSize: uploadingItem.file.size,
          optimizedSize: blob.size,
          width,
          height,
        };
        
        setImages(prev => {
          const updated = [...prev, newImage];
          onImagesChange(updated);
          return updated;
        });
        
        // Remove from uploading after a short delay
        setTimeout(() => {
          URL.revokeObjectURL(uploadingItem.preview);
          setUploading(prev => prev.filter(u => u.id !== uploadingItem.id));
        }, 1000);
        
      } catch (error) {
        console.error('Upload error:', error);
        setUploading(prev => 
          prev.map(u => u.id === uploadingItem.id 
            ? { ...u, status: 'error' as const, error: error instanceof Error ? error.message : 'Upload failed' } 
            : u
          )
        );
        onError?.(error instanceof Error ? error.message : 'Upload failed');
      }
    }
  }, [disabled, images.length, maxImages, onError, optimizeImage, uploadFile, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif'],
    },
    maxSize: 15 * 1024 * 1024, // 15MB before optimization
    multiple: true,
    disabled: disabled || images.length >= maxImages,
  });

  const removeImage = (imageId: string) => {
    const newImages = images.filter(img => img.id !== imageId);
    // If we removed the primary, make the first one primary
    if (newImages.length > 0 && !newImages.some(img => img.is_primary)) {
      newImages[0].is_primary = true;
    }
    setImages(newImages);
    onImagesChange(newImages);
  };

  const removeUploading = (uploadId: string) => {
    setUploading(prev => {
      const item = prev.find(u => u.id === uploadId);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter(u => u.id !== uploadId);
    });
  };

  const updateImageCaption = (imageId: string, caption: string) => {
    const newImages = images.map(img => 
      img.id === imageId ? { ...img, caption } : img
    );
    setImages(newImages);
    onImagesChange(newImages);
  };

  const updateImageAlt = (imageId: string, alt: string) => {
    const newImages = images.map(img => 
      img.id === imageId ? { ...img, alt } : img
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

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const calculateSavings = (original: number, optimized: number) => {
    const saved = original - optimized;
    const percentage = ((saved / original) * 100).toFixed(0);
    return { saved, percentage };
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      {label && (
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-800">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <Settings2 className="h-3.5 w-3.5" />
            Optimization
          </button>
        </div>
      )}

      {/* Optimization Info Banner */}
      <div className="mb-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <ZapIcon className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-emerald-800">
              Auto-optimization for Performance & SEO
            </p>
            <p className="text-xs text-emerald-600 mt-0.5">
              Images are automatically compressed to WebP format ({settings.maxWidth}×{settings.maxHeight}px, {Math.round(settings.quality * 100)}% quality)
            </p>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h4 className="text-sm font-medium text-gray-800 mb-3">Optimization Settings</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Max Width</label>
              <input
                type="number"
                value={settings.maxWidth}
                onChange={(e) => setSettings(s => ({ ...s, maxWidth: parseInt(e.target.value) || 1200 }))}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Max Height</label>
              <input
                type="number"
                value={settings.maxHeight}
                onChange={(e) => setSettings(s => ({ ...s, maxHeight: parseInt(e.target.value) || 800 }))}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Quality (%)</label>
              <input
                type="number"
                min="50"
                max="100"
                value={Math.round(settings.quality * 100)}
                onChange={(e) => setSettings(s => ({ ...s, quality: (parseInt(e.target.value) || 80) / 100 }))}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Format</label>
              <select
                value={settings.format}
                onChange={(e) => setSettings(s => ({ ...s, format: e.target.value as 'webp' | 'jpeg' }))}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="webp">WebP (Best)</option>
                <option value="jpeg">JPEG</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Drop Zone */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={cn(
            'relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200',
            isDragActive
              ? 'border-emerald-400 bg-emerald-50 scale-[1.01]'
              : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          )}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-3">
            <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
              <Upload className={cn(
                "h-7 w-7 text-emerald-600 transition-transform",
                isDragActive && "scale-110"
              )} />
            </div>
            
            <div>
              <p className="text-base font-medium text-gray-700">
                {isDragActive ? 'Drop images here...' : 'Drag & drop images'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or <span className="text-emerald-600 font-medium">browse files</span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
              <span className="px-2 py-1 bg-gray-100 rounded-full">PNG</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full">JPG</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full">WebP</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full">GIF</span>
            </div>
            
            <p className="text-xs text-gray-400">
              Up to 15MB per image • Max {maxImages} images • {images.length}/{maxImages} uploaded
            </p>
          </div>
        </div>
      )}

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-700">Some files were rejected:</p>
              <ul className="text-xs text-red-600 mt-1 list-disc list-inside">
                {fileRejections.map(({ file, errors }) => (
                  <li key={file.name}>
                    {file.name}: {errors.map(e => e.message).join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Uploading Progress */}
      {uploading.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploading.map((item) => (
            <div 
              key={item.id} 
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border transition-all",
                item.status === 'error' 
                  ? 'bg-red-50 border-red-200' 
                  : item.status === 'done'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              )}
            >
              {/* Preview */}
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={item.preview}
                  alt="Preview"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {item.file.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  {item.status === 'optimizing' && (
                    <span className="text-xs text-blue-600 flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Optimizing...
                    </span>
                  )}
                  {item.status === 'uploading' && (
                    <span className="text-xs text-emerald-600 flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Uploading...
                    </span>
                  )}
                  {item.status === 'done' && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </span>
                  )}
                  {item.status === 'error' && (
                    <span className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {item.error}
                    </span>
                  )}
                  
                  {item.optimizedSize && (
                    <span className="text-xs text-gray-500">
                      {formatBytes(item.originalSize)} → {formatBytes(item.optimizedSize)}
                      <span className="text-emerald-600 ml-1">
                        (-{calculateSavings(item.originalSize, item.optimizedSize).percentage}%)
                      </span>
                    </span>
                  )}
                </div>
                
                {/* Progress Bar */}
                {(item.status === 'optimizing' || item.status === 'uploading') && (
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
              
              {/* Remove Button */}
              {(item.status === 'error' || item.status === 'done') && (
                <button
                  type="button"
                  onClick={() => removeUploading(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-800">
              Uploaded Images ({images.length}/{maxImages})
            </h4>
            {images.length > 0 && (
              <p className="text-xs text-gray-500">
                Click ⭐ to set cover image
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div 
                key={image.id} 
                className={cn(
                  "group relative bg-white rounded-xl border-2 overflow-hidden transition-all hover:shadow-lg",
                  image.is_primary ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-gray-200'
                )}
              >
                {/* Image */}
                <div className="aspect-video relative bg-gray-100">
                  <Image
                    src={image.url}
                    alt={image.alt || image.caption || 'Event image'}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Primary Badge */}
                  {image.is_primary && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="h-3 w-3 fill-current" />
                      Cover
                    </div>
                  )}
                  
                  {/* Optimization Badge */}
                  {image.originalSize && image.optimizedSize && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500/90 text-white text-xs rounded-full shadow-sm">
                      -{calculateSavings(image.originalSize, image.optimizedSize).percentage}% optimized
                    </div>
                  )}
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => setPrimaryImage(image.id)}
                      className={cn(
                        "p-2 rounded-full transition-all",
                        image.is_primary 
                          ? "bg-yellow-500 text-white" 
                          : "bg-white text-gray-700 hover:bg-yellow-50"
                      )}
                      title="Set as cover image"
                    >
                      {image.is_primary ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => window.open(image.url, '_blank')}
                      className="p-2 bg-white text-gray-700 rounded-full hover:bg-blue-50 transition-all"
                      title="Preview full size"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-all"
                      title="Remove image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Info & Inputs */}
                <div className="p-3 space-y-2">
                  {/* File Info */}
                  {(image.width || image.optimizedSize) && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FileImage className="h-3.5 w-3.5" />
                      {image.width && image.height && (
                        <span>{image.width}×{image.height}px</span>
                      )}
                      {image.optimizedSize && (
                        <span>• {formatBytes(image.optimizedSize)}</span>
                      )}
                    </div>
                  )}
                  
                  {/* Alt Text Input - Important for SEO */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                      Alt Text <span className="text-emerald-600">(SEO)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Describe the image..."
                      value={image.alt || ''}
                      onChange={(e) => updateImageAlt(image.id, e.target.value)}
                      className="mt-1 w-full text-sm px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Caption Input */}
                  <div>
                    <label className="text-xs font-medium text-gray-600">Caption</label>
                    <input
                      type="text"
                      placeholder="Add a caption..."
                      value={image.caption || ''}
                      onChange={(e) => updateImageCaption(image.id, e.target.value)}
                      className="mt-1 w-full text-sm px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Helper Text */}
      {helperText && (
        <p className="mt-3 text-sm text-gray-500 flex items-center gap-1.5">
          <ImageIcon className="h-4 w-4" />
          {helperText}
        </p>
      )}
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

export default OptimizedImageUpload;
