'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Upload, X, File, Image } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export interface UploadWidgetProps {
  onUpload: (url: string) => void;
  onError?: (error: string) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  bucket?: string;
  folder?: string;
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
  currentFile?: string;
  label?: string;
  helperText?: string;
}

export function UploadWidget({
  onUpload,
  onError,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    'application/pdf': ['.pdf'],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  bucket = 'uploads',
  folder = '',
  className,
  multiple = false,
  disabled = false,
  currentFile,
  label,
  helperText,
}: UploadWidgetProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = async (file: File): Promise<string> => {
    try {
      // Use the upload API endpoint
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);
      if (folder) {
        formData.append('folder', folder);
      }

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
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || acceptedFiles.length === 0) return;

      setUploading(true);
      setUploadProgress(0);

      try {
        if (multiple) {
          const uploadPromises = acceptedFiles.map((file, index) => {
            return uploadFile(file).then((url) => {
              setUploadProgress(((index + 1) / acceptedFiles.length) * 100);
              return url;
            });
          });

          const urls = await Promise.all(uploadPromises);
          urls.forEach((url) => onUpload(url));
        } else {
          const file = acceptedFiles[0];
          const url = await uploadFile(file);
          setUploadProgress(100);
          onUpload(url);
        }
      } catch (error) {
        console.error('Upload error:', error);
        onError?.(error instanceof Error ? error.message : 'Upload failed');
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [onUpload, onError, multiple, disabled, bucket, folder]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled: disabled || uploading,
  });

  const removeCurrentFile = () => {
    onUpload('');
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext || '')) {
      return <Image className="h-5 w-5" />;
    }
    return <File className="h-5 w-5" />;
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {currentFile ? (
        <div className="relative">
          <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md bg-gray-50">
            <div className="flex items-center space-x-3">
              {getFileIcon(currentFile)}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Current file
                </p>
                <p className="text-xs text-gray-500">
                  {currentFile.split('/').pop()}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeCurrentFile}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors',
            isDragActive && 'border-blue-400 bg-blue-50',
            disabled && 'cursor-not-allowed opacity-50',
            uploading && 'pointer-events-none'
          )}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin mx-auto h-8 w-8 text-blue-600">
                <Upload className="h-8 w-8" />
              </div>
              <p className="text-sm text-gray-600">Uploading...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? 'Drop the files here...'
                    : 'Drag & drop files here, or click to select'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Max size: {Math.round(maxSize / 1024 / 1024)}MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {fileRejections.length > 0 && (
        <div className="mt-2">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-sm text-red-600">
              {file.name}: {errors.map((e) => e.message).join(', ')}
            </div>
          ))}
        </div>
      )}

      {helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

export default UploadWidget;
