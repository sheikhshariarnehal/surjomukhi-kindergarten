'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Settings2, 
  Check, 
  AlertCircle,
  Loader2,
  Trash2,
  ChevronDown,
  Sparkles,
  FileImage,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Image optimization settings
interface OptimizationSettings {
  quality: number; // 0-100
  maxWidth: number;
  maxHeight: number;
  format: 'original' | 'webp' | 'jpeg';
  enabled: boolean;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'optimizing' | 'uploading' | 'success' | 'error';
  progress: number;
  url?: string;
  error?: string;
  originalSize: number;
  optimizedSize?: number;
}

export interface ImageUploaderProps {
  onUpload: (urls: string[]) => void;
  onError?: (error: string) => void;
  maxSize?: number;
  bucket?: string;
  folder?: string;
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxFiles?: number;
}

const defaultOptimization: OptimizationSettings = {
  quality: 80,
  maxWidth: 1920,
  maxHeight: 1080,
  format: 'webp',
  enabled: true,
};

// Client-side image optimization using Canvas API
async function optimizeImage(
  file: File, 
  settings: OptimizationSettings
): Promise<{ blob: Blob; originalSize: number; optimizedSize: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let { width, height } = img;
      
      // Calculate new dimensions maintaining aspect ratio
      if (width > settings.maxWidth || height > settings.maxHeight) {
        const ratio = Math.min(settings.maxWidth / width, settings.maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw image with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      let mimeType = file.type;
      if (settings.format === 'webp') mimeType = 'image/webp';
      else if (settings.format === 'jpeg') mimeType = 'image/jpeg';

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({
              blob,
              originalSize: file.size,
              optimizedSize: blob.size,
            });
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        mimeType,
        settings.quality / 100
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function ImageUploader({
  onUpload,
  onError,
  maxSize = 10 * 1024 * 1024,
  bucket = 'uploads',
  folder = '',
  className,
  multiple = true,
  disabled = false,
  maxFiles = 20,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [settings, setSettings] = useState<OptimizationSettings>(defaultOptimization);
  const [showSettings, setShowSettings] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close settings when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const uploadFile = async (file: UploadedFile, optimizedBlob?: Blob): Promise<string> => {
    const formData = new FormData();
    
    if (optimizedBlob) {
      // Get proper extension for optimized file
      let ext = 'webp';
      if (settings.format === 'jpeg') ext = 'jpg';
      else if (settings.format === 'original') ext = file.file.name.split('.').pop() || 'jpg';
      
      const fileName = file.file.name.replace(/\.[^/.]+$/, '') + '.' + ext;
      formData.append('file', optimizedBlob, fileName);
    } else {
      formData.append('file', file.file);
    }
    
    formData.append('bucket', bucket);
    if (folder) formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const result = await response.json();
    return result.url;
  };

  const processFiles = async () => {
    if (files.length === 0 || isUploading) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (file.status === 'success') {
        if (file.url) uploadedUrls.push(file.url);
        continue;
      }

      try {
        // Update status to optimizing
        if (settings.enabled) {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'optimizing' as const, progress: 0 } : f
          ));

          // Optimize image
          const { blob, optimizedSize } = await optimizeImage(file.file, settings);
          
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, optimizedSize, status: 'uploading' as const, progress: 30 } : f
          ));

          // Upload optimized image
          const url = await uploadFile(file, blob);
          
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'success' as const, progress: 100, url } : f
          ));
          
          uploadedUrls.push(url);
        } else {
          // Upload original
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'uploading' as const, progress: 30 } : f
          ));

          const url = await uploadFile(file);
          
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'success' as const, progress: 100, url } : f
          ));
          
          uploadedUrls.push(url);
        }
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { 
            ...f, 
            status: 'error' as const, 
            error: error instanceof Error ? error.message : 'Upload failed' 
          } : f
        ));
        onError?.(error instanceof Error ? error.message : 'Upload failed');
      }
    }

    if (uploadedUrls.length > 0) {
      onUpload(uploadedUrls);
    }

    setIsUploading(false);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled) return;

      const newFiles: UploadedFile[] = acceptedFiles.slice(0, maxFiles - files.length).map(file => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
        status: 'pending' as const,
        progress: 0,
        originalSize: file.size,
      }));

      setFiles(prev => [...prev, ...newFiles]);
    },
    [disabled, files.length, maxFiles]
  );

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    maxSize,
    multiple,
    disabled: disabled || isUploading,
    maxFiles: maxFiles - files.length,
  });

  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalOptimizedSize = files.reduce((acc, f) => acc + (f.optimizedSize || f.originalSize), 0);
  const savedBytes = totalOriginalSize - totalOptimizedSize;
  const savedPercent = totalOriginalSize > 0 ? Math.round((savedBytes / totalOriginalSize) * 100) : 0;

  const pendingCount = files.filter(f => f.status === 'pending').length;
  const successCount = files.filter(f => f.status === 'success').length;

  return (
    <div className={cn('w-full', className)}>
      {/* Header with Settings */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Upload Images</h3>
            <p className="text-xs text-gray-500">
              {multiple ? `Up to ${maxFiles} images` : 'Single image'} • Max {formatFileSize(maxSize)}
            </p>
          </div>
        </div>

        {/* Optimization Toggle & Settings */}
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
              settings.enabled 
                ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            )}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Optimize</span>
            {settings.enabled && <Check className="w-3.5 h-3.5" />}
            <ChevronDown className={cn('w-4 h-4 transition-transform', showSettings && 'rotate-180')} />
          </button>

          {/* Settings Dropdown */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-900">Image Optimization</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enabled}
                      onChange={(e) => setSettings(s => ({ ...s, enabled: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className={cn('space-y-4 transition-opacity', !settings.enabled && 'opacity-50 pointer-events-none')}>
                  {/* Quality */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-700">Quality</label>
                      <span className="text-xs text-gray-500">{settings.quality}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={settings.quality}
                      onChange={(e) => setSettings(s => ({ ...s, quality: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>Smaller file</span>
                      <span>Better quality</span>
                    </div>
                  </div>

                  {/* Max Dimensions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">Max Width</label>
                      <select
                        value={settings.maxWidth}
                        onChange={(e) => setSettings(s => ({ ...s, maxWidth: parseInt(e.target.value) }))}
                        className="w-full px-2.5 py-1.5 text-sm bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value={800}>800px</option>
                        <option value={1280}>1280px</option>
                        <option value={1920}>1920px</option>
                        <option value={2560}>2560px</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">Max Height</label>
                      <select
                        value={settings.maxHeight}
                        onChange={(e) => setSettings(s => ({ ...s, maxHeight: parseInt(e.target.value) }))}
                        className="w-full px-2.5 py-1.5 text-sm bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value={600}>600px</option>
                        <option value={720}>720px</option>
                        <option value={1080}>1080px</option>
                        <option value={1440}>1440px</option>
                      </select>
                    </div>
                  </div>

                  {/* Format */}
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-2 block">Output Format</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'webp', label: 'WebP', desc: 'Best' },
                        { value: 'jpeg', label: 'JPEG', desc: 'Compatible' },
                        { value: 'original', label: 'Original', desc: 'Keep' },
                      ].map((fmt) => (
                        <button
                          key={fmt.value}
                          onClick={() => setSettings(s => ({ ...s, format: fmt.value as OptimizationSettings['format'] }))}
                          className={cn(
                            'px-3 py-2 rounded-lg text-xs font-medium transition-all text-center',
                            settings.format === fmt.value
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                          )}
                        >
                          <div>{fmt.label}</div>
                          <div className={cn('text-[10px] mt-0.5', settings.format === fmt.value ? 'text-blue-100' : 'text-gray-400')}>
                            {fmt.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
                    <Zap className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-700">
                      WebP provides better compression with same quality. Optimized images load faster and improve SEO.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200',
          isDragActive 
            ? 'border-blue-400 bg-blue-50/50' 
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50',
          (disabled || isUploading) && 'cursor-not-allowed opacity-50',
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center">
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all',
            isDragActive 
              ? 'bg-blue-100 scale-110' 
              : 'bg-gray-100'
          )}>
            <FileImage className={cn('w-8 h-8 transition-colors', isDragActive ? 'text-blue-500' : 'text-gray-400')} />
          </div>
          
          <p className="text-sm font-medium text-gray-700 mb-1">
            {isDragActive ? 'Drop images here...' : 'Drag & drop images here'}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            or click to browse from your device
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
            <span className="px-2 py-1 bg-gray-100 rounded-md">PNG</span>
            <span className="px-2 py-1 bg-gray-100 rounded-md">JPG</span>
            <span className="px-2 py-1 bg-gray-100 rounded-md">WebP</span>
            <span className="px-2 py-1 bg-gray-100 rounded-md">GIF</span>
          </div>
        </div>
      </div>

      {/* File Preview Grid */}
      <AnimatePresence mode="popLayout">
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{files.length} {files.length === 1 ? 'image' : 'images'}</span>
                {settings.enabled && savedBytes > 0 && (
                  <span className="flex items-center gap-1 text-green-600">
                    <Sparkles className="w-3 h-3" />
                    Saved {formatFileSize(savedBytes)} ({savedPercent}%)
                  </span>
                )}
              </div>
              <button
                onClick={clearAll}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear all
              </button>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Status Overlay */}
                    {file.status !== 'pending' && file.status !== 'success' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        {file.status === 'optimizing' && (
                          <div className="text-center">
                            <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-1" />
                            <span className="text-xs text-white">Optimizing...</span>
                          </div>
                        )}
                        {file.status === 'uploading' && (
                          <div className="text-center">
                            <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-1" />
                            <span className="text-xs text-white">Uploading...</span>
                          </div>
                        )}
                        {file.status === 'error' && (
                          <div className="text-center px-2">
                            <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-1" />
                            <span className="text-xs text-red-200 line-clamp-2">{file.error}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Success Badge */}
                    {file.status === 'success' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Remove Button */}
                    {file.status === 'pending' && (
                      <button
                        onClick={() => removeFile(file.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="mt-1.5 px-0.5">
                    <p className="text-xs font-medium text-gray-700 truncate">{file.file.name}</p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <span>{formatFileSize(file.originalSize)}</span>
                      {file.optimizedSize && file.optimizedSize < file.originalSize && (
                        <>
                          <span>→</span>
                          <span className="text-green-600">{formatFileSize(file.optimizedSize)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Upload Button */}
            {pendingCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex justify-end"
              >
                <button
                  onClick={processFiles}
                  disabled={isUploading}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all',
                    isUploading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5'
                  )}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload {pendingCount} {pendingCount === 1 ? 'Image' : 'Images'}</span>
                      {settings.enabled && (
                        <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                          Optimized
                        </span>
                      )}
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* Success Message */}
            {successCount > 0 && pendingCount === 0 && !isUploading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      {successCount} {successCount === 1 ? 'image' : 'images'} uploaded successfully
                    </p>
                    {settings.enabled && savedBytes > 0 && (
                      <p className="text-xs text-green-600">
                        Total saved: {formatFileSize(savedBytes)} ({savedPercent}% smaller)
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                >
                  Clear
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ImageUploader;
