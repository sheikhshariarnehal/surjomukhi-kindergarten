'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Edit, Trash2, FileText, Calendar, Download, ExternalLink } from 'lucide-react';
import { Notice } from '@/types/notice';

export default function ViewNoticePage() {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const noticeId = params.id as string;

  const fetchNotice = useCallback(async () => {
    try {
      const response = await fetch(`/api/notices/${noticeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notice');
      }

      const result = await response.json();
      setNotice(result.notice);
    } catch (error) {
      console.error('Error fetching notice:', error);
      alert('Failed to load notice. Please try again.');
      router.push('/dashboard/notices');
    } finally {
      setLoading(false);
    }
  }, [noticeId, router]);

  useEffect(() => {
    if (noticeId) {
      fetchNotice();
    }
  }, [noticeId, fetchNotice]);

  const handleEdit = () => {
    router.push(`/dashboard/notices/${noticeId}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${notice?.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/notices/${noticeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete notice');
      }

      router.push('/dashboard/notices');
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('Failed to delete notice. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">View Notice</h1>
            <p className="text-gray-600 mt-1">
              Notice details and content
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Notice Content</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {notice.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Published: {new Date(notice.publish_date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span>ID: {notice.id.slice(0, 8)}...</span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {notice.content}
                </div>
              </div>
            </div>
          </Card>

          {/* Attachment */}
          {notice.file_url && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Attachment
              </h2>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {notice.file_url.split('/').pop()}
                    </p>
                    <p className="text-sm text-gray-500">PDF Document</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(notice.file_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!notice.file_url) return;
                      const link = document.createElement('a');
                      link.href = notice.file_url;
                      link.download = notice.file_url.split('/').pop() || 'document.pdf';
                      link.click();
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notice Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <p className="text-sm text-gray-900 mt-1">{notice.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Slug</label>
                <p className="text-sm text-gray-500 mt-1 font-mono">{notice.slug}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Publish Date</label>
                <p className="text-sm text-gray-900 mt-1">
                  {new Date(notice.publish_date).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Created</label>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(notice.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last Updated</label>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(notice.updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Actions
            </h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Notice
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`/notices/${notice.slug}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Website
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Notice
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
