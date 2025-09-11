'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateNoticeSchema } from '@/lib/validators';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import UploadWidget from '@/components/admin/UploadWidget';
import { ArrowLeft, Save, FileText } from 'lucide-react';
import { Notice } from '@/types/notice';
import { z } from 'zod';

type UpdateNoticeFormData = z.infer<typeof updateNoticeSchema>;

export default function EditNoticePage() {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const router = useRouter();
  const params = useParams();
  const noticeId = params.id as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<UpdateNoticeFormData>({
    resolver: zodResolver(updateNoticeSchema),
  });

  useEffect(() => {
    if (noticeId) {
      fetchNotice();
    }
  }, [noticeId]);

  const fetchNotice = async () => {
    try {
      const response = await fetch(`/api/notices/${noticeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notice');
      }

      const result = await response.json();
      const noticeData = result.notice;
      setNotice(noticeData);
      setFileUrl(noticeData.file_url || '');

      // Reset form with notice data
      reset({
        title: noticeData.title,
        slug: noticeData.slug,
        content: noticeData.content,
        publish_date: noticeData.publish_date ? 
          new Date(noticeData.publish_date).toISOString().slice(0, 16) : 
          undefined,
        file_url: noticeData.file_url || '',
      });
    } catch (error) {
      console.error('Error fetching notice:', error);
      alert('Failed to load notice. Please try again.');
      router.push('/dashboard/notices');
    } finally {
      setLoading(false);
    }
  };

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

  const onSubmit = async (data: UpdateNoticeFormData) => {
    try {
      const response = await fetch(`/api/notices/${noticeId}`, {
        method: 'PUT',
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
        throw new Error(error.error || 'Failed to update notice');
      }

      router.push('/dashboard/notices');
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Failed to update notice. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Notice not found.</p>
        <Button onClick={() => router.push('/dashboard/notices')} className="mt-4">
          Back to Notices
        </Button>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Notice</h1>
          <p className="text-gray-600 mt-1">
            Update notice: {notice.title}
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
                />

                <Input
                  {...register('slug')}
                  label="Slug"
                  placeholder="notice-slug"
                  helperText="URL-friendly version of the title"
                  error={errors.slug?.message}
                />

                <Textarea
                  {...register('content')}
                  label="Content"
                  placeholder="Enter the notice content..."
                  rows={8}
                  error={errors.content?.message}
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
                bucket="uploads"
                folder="notices"
                currentFile={fileUrl}
                label="Upload PDF or Document"
                helperText="Supported formats: PDF, DOC, DOCX (Max 5MB)"
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
                    disabled={isSubmitting || uploading}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Update Notice
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Notice Info
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <p className="text-gray-500 mt-1">
                    {new Date(notice.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Last Updated:</span>
                  <p className="text-gray-500 mt-1">
                    {new Date(notice.updated_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">ID:</span>
                  <p className="text-gray-500 mt-1 font-mono text-xs">
                    {notice.id}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
