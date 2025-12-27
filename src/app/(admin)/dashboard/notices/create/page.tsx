'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNoticeSchema } from '@/lib/validators';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import UploadWidget from '@/components/admin/UploadWidget';
import { ArrowLeft, Save, FileText } from 'lucide-react';
import { z } from 'zod';

type CreateNoticeFormData = z.infer<typeof createNoticeSchema>;

export default function CreateNoticePage() {
  const [fileUrl, setFileUrl] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateNoticeFormData>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: {
      publish_date: new Date().toISOString().slice(0, 16), // Format for datetime-local input
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    setValue('slug', slug);
  };

  const handleFileUpload = (url: string) => {
    setFileUrl(url);
    setValue('file_url', url);
  };

  const onSubmit = async (data: CreateNoticeFormData) => {
    try {
      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          file_url: fileUrl || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create notice');
      }

      router.push('/dashboard/notices');
    } catch (error) {
      console.error('Error creating notice:', error);
      alert(`Failed to create notice: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Notice</h1>
          <p className="text-gray-600 mt-1">
            Add a new notice or announcement for the school
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Notice Details</h2>
              </div>

              <div className="space-y-6">
                <Input
                  {...register('title')}
                  label="Title"
                  placeholder="Enter notice title"
                  error={errors.title?.message}
                  onChange={(e) => {
                    register('title').onChange(e);
                    handleTitleChange(e);
                  }}
                  required
                />

                <Input
                  {...register('slug')}
                  label="Slug"
                  placeholder="notice-slug"
                  helperText="URL-friendly version of the title"
                  error={errors.slug?.message}
                  required
                />

                <Textarea
                  {...register('content')}
                  label="Content"
                  placeholder="Enter the notice content..."
                  rows={8}
                  error={errors.content?.message}
                  required
                />
              </div>
            </Card>

            {/* File Upload */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Attachment (Optional)
              </h2>
              <UploadWidget
                onUpload={handleFileUpload}
                accept={{
                  'application/pdf': ['.pdf'],
                  'application/msword': ['.doc'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                }}
                maxSize={10 * 1024 * 1024}
                bucket="uploads"
                folder="notices"
                currentFile={fileUrl}
                label="Upload PDF or Document"
                helperText="Supported formats: PDF, DOC, DOCX (Max 10MB)"
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Publishing
              </h2>
              <div className="space-y-4">
                <Input
                  {...register('publish_date')}
                  type="datetime-local"
                  label="Publish Date"
                  error={errors.publish_date?.message}
                />

                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Publish Notice
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Preview
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title:</label>
                  <p className="text-sm text-gray-900 mt-1">
                    {watch('title') || 'Enter a title...'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Slug:</label>
                  <p className="text-sm text-gray-500 mt-1">
                    {watch('slug') || 'auto-generated-slug'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Publish Date:</label>
                  <p className="text-sm text-gray-500 mt-1">
                    {watch('publish_date') ?
                      (() => {
                        try {
                          const publishDate = watch('publish_date');
                          if (!publishDate) return 'Now';
                          const date = new Date(publishDate);
                          return date.toLocaleString();
                        } catch {
                          return 'Invalid date';
                        }
                      })() :
                      'Now'
                    }
                  </p>
                </div>
                {fileUrl && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Attachment:</label>
                    <p className="text-sm text-green-600 mt-1">✓ File uploaded</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
