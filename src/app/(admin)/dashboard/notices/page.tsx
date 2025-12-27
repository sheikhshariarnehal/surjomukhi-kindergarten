'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Table, { TableColumn, commonActions } from '@/components/admin/Table';
import { Card } from '@/components/ui/Card';
import { Plus, Search, FileText, Calendar } from 'lucide-react';
import { Notice } from '@/types/notice';
// import { format } from 'date-fns';

interface NoticesPageData {
  notices: Notice[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function NoticesPage() {
  const [data, setData] = useState<NoticesPageData>({
    notices: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/notices?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notices');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleView = (notice: Notice) => {
    router.push(`/dashboard/notices/${notice.id}`);
  };

  const handleEdit = (notice: Notice) => {
    router.push(`/dashboard/notices/${notice.id}/edit`);
  };

  const handleDelete = async (notice: Notice) => {
    if (!confirm(`Are you sure you want to delete "${notice.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/notices/${notice.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete notice');
      }

      // Refresh the list
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('Failed to delete notice. Please try again.');
    }
  };

  const columns: TableColumn<Notice>[] = [
    {
      key: 'title',
      label: 'Title',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">ID: {row.id.slice(0, 8)}...</div>
          </div>
        </div>
      ),
    },
    {
      key: 'publish_date',
      label: 'Published',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-900">
            {new Date(value).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      key: 'file_url',
      label: 'Attachment',
      render: (value) => (
        value ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            PDF
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            None
          </span>
        )
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (value) => (
        <span className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = [
    commonActions.view(handleView),
    commonActions.edit(handleEdit),
    commonActions.delete(handleDelete),
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notices</h1>
          <p className="text-gray-600 mt-1">
            Manage school notices and announcements
          </p>
        </div>
        <Link href="/dashboard/notices/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Notice
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/notices/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Notice
              </Button>
            </Link>
            <Button variant="outline" onClick={fetchNotices}>
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Notices Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              All Notices ({data.pagination.total})
            </h2>
          </div>

          <Table
            data={data.notices}
            columns={columns}
            actions={actions}
            loading={loading}
            emptyMessage="No notices found. Create your first notice to get started."
          />

          {/* Pagination */}
          {data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, data.pagination.total)} of {data.pagination.total} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {data.pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === data.pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
