'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { UploadWidget } from '@/components/admin/UploadWidget';
import { Search, Plus, Trash2, Download, Upload, FileText, Edit, Eye } from 'lucide-react';
import { Download as DownloadType } from '@/types/gallery';

interface DownloadsResponse {
  downloads: DownloadType[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function DownloadsAdminPage() {
  const [downloads, setDownloads] = useState<DownloadType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    category: '',
    file_url: '',
  });

  const categories = [
    'forms',
    'syllabus',
    'notices',
    'results',
    'policies',
    'resources',
  ];

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: '50',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
      });

      const response = await fetch(`/api/downloads?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch downloads');
      }

      const data: DownloadsResponse = await response.json();
      setDownloads(data.downloads || []);
    } catch (error) {
      console.error('Error fetching downloads:', error);
      alert('Failed to load downloads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, [searchTerm, selectedCategory]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFileUpload = (url: string) => {
    setUploadData(prev => ({ ...prev, file_url: url }));
  };

  const handleCreateDownload = async () => {
    if (!uploadData.title || !uploadData.category || !uploadData.file_url) {
      alert('Please fill in all required fields and upload a file.');
      return;
    }

    try {
      const response = await fetch('/api/downloads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });

      if (!response.ok) {
        throw new Error('Failed to create download');
      }

      setShowUploadModal(false);
      setUploadData({ title: '', category: '', file_url: '' });
      fetchDownloads();
      alert('Download created successfully!');
    } catch (error) {
      console.error('Error creating download:', error);
      alert('Failed to create download. Please try again.');
    }
  };

  const handleDeleteDownload = async (id: string) => {
    if (!confirm('Are you sure you want to delete this download?')) {
      return;
    }

    try {
      const response = await fetch(`/api/downloads/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete download');
      }

      fetchDownloads();
      alert('Download deleted successfully!');
    } catch (error) {
      console.error('Error deleting download:', error);
      alert('Failed to delete download. Please try again.');
    }
  };

  const handleDownloadFile = (download: DownloadType) => {
    const link = document.createElement('a');
    link.href = download.file_url;
    link.download = download.title;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Downloads</h1>
          <p className="text-gray-600 mt-1">
            Manage downloadable files and documents
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => setShowUploadModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Download
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search downloads..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Downloads List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {downloads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No downloads found</p>
                    {searchTerm || selectedCategory ? (
                      <p className="text-sm mt-1">Try adjusting your search criteria</p>
                    ) : (
                      <p className="text-sm mt-1">Get started by adding your first download</p>
                    )}
                  </td>
                </tr>
              ) : (
                downloads.map((download) => (
                  <tr key={download.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {download.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {download.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(download.uploaded_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadFile(download)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDownload(download.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Add New Download</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <Input
                  value={uploadData.title}
                  onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter file title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File *
                </label>
                <UploadWidget
                  onUpload={handleFileUpload}
                  accept={{
                    'application/pdf': ['.pdf'],
                    'application/msword': ['.doc'],
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                    'application/vnd.ms-excel': ['.xls'],
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
                  }}
                  folder="downloads"
                />
                {uploadData.file_url && (
                  <p className="text-sm text-green-600 mt-2">File uploaded successfully!</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadData({ title: '', category: '', file_url: '' });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateDownload}>
                Create Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
