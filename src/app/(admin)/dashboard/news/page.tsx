'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/admin/Table';
import { Search, Plus, Edit, Trash2, Eye, Newspaper, Image } from 'lucide-react';
import { News } from '@/types/news';

interface NewsResponse {
  news: News[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, [currentPage, searchTerm]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/news?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data: NewsResponse = await response.json();
      setNews(data.news);
      setTotalPages(data.pagination.totalPages);
      setTotalCount(data.pagination.total);
    } catch (error) {
      console.error('Error fetching news:', error);
      alert('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDelete = async (newsItem: News) => {
    if (!newsItem?.id || !newsItem?.title) {
      alert('Invalid news data');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${newsItem.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/news/${newsItem.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete news');
      }

      await fetchNews();
      alert('News deleted successfully');
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Failed to delete news. Please try again.');
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (newsItem: News) => (
        <div className="flex items-center justify-center">
          {newsItem?.image_url ? (
            <img
              src={newsItem.image_url}
              alt={newsItem?.title || 'News'}
              className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Image className="h-6 w-6 text-white" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      render: (newsItem: News) => (
        <div>
          <div className="font-semibold text-gray-900 line-clamp-2">{newsItem?.title || 'Untitled'}</div>
          {newsItem?.excerpt && (
            <div className="text-sm text-gray-500 line-clamp-1 mt-1">{newsItem.excerpt}</div>
          )}
        </div>
      ),
    },
    {
      key: 'publish_date',
      label: 'Published',
      render: (newsItem: News) => (
        <div className="text-sm text-gray-600">
          {newsItem.publish_date ? new Date(newsItem.publish_date).toLocaleDateString() : 'Draft'}
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (newsItem: News) => (
        <div className="text-sm text-gray-500">
          {new Date(newsItem.created_at).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (newsItem: News) => (
        <div className="flex items-center space-x-2">
          {newsItem?.id ? (
            <>
              <Link href={`/dashboard/news/${newsItem.id}`}>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/dashboard/news/${newsItem.id}/edit`}>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(newsItem)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <span className="text-gray-400 text-sm">No actions</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News</h1>
          <p className="text-gray-600 mt-1">
            Manage school news and announcements
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/dashboard/news/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add News
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Newspaper className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total News</p>
              <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {news.filter(item => item.publish_date).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Search className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Search Results</p>
              <p className="text-2xl font-bold text-gray-900">{news.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search news by title or content..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/news/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New News
              </Button>
            </Link>
            <Button variant="outline" onClick={fetchNews}>
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* News Table */}
      <Card>
        <Table
          data={news}
          columns={columns}
          loading={loading}
          emptyMessage="No news found"
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
          }}
        />
      </Card>
    </div>
  );
}
