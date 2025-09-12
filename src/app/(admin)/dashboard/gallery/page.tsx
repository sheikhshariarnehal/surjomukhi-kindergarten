'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { UploadWidget } from '@/components/admin/UploadWidget';
import { Search, Plus, Trash2, Image, Video, Upload, Grid, List } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  file_url: string;
  file_type: 'image' | 'video';
  created_at: string;
  updated_at: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchGalleryItems();
  }, [searchTerm]);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/gallery?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch gallery items');
      }

      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      alert('Failed to load gallery items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleUpload = async (url: string) => {
    try {
      setUploading(true);
      
      // Determine file type from URL
      const fileType = url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'image' : 'video';
      
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Gallery ${fileType}`,
          file_url: url,
          file_type: fileType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to gallery');
      }

      await fetchGalleryItems();
      alert('File added to gallery successfully!');
    } catch (error) {
      console.error('Error adding to gallery:', error);
      alert('Failed to add file to gallery. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${item.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete gallery item');
      }

      await fetchGalleryItems();
      alert('Gallery item deleted successfully');
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert('Failed to delete gallery item. Please try again.');
    }
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="aspect-square relative">
            {item.file_type === 'image' ? (
              <img
                src={item.file_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={item.file_url}
                className="w-full h-full object-cover"
                controls
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
            {item.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
              <div className="flex items-center space-x-1">
                {item.file_type === 'image' ? (
                  <Image className="h-4 w-4 text-blue-500" />
                ) : (
                  <Video className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <Card>
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex items-center space-x-4">
            <div className="flex-shrink-0">
              {item.file_type === 'image' ? (
                <img
                  src={item.file_url}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Video className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-gray-500 truncate">{item.description}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                item.file_type === 'image' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.file_type === 'image' ? (
                  <Image className="h-3 w-3 mr-1" />
                ) : (
                  <Video className="h-3 w-3 mr-1" />
                )}
                {item.file_type}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(item)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600 mt-1">
            Manage school photos and videos
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Image className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Images</p>
              <p className="text-2xl font-bold text-gray-900">
                {items.filter(item => item.file_type === 'image').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Video className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Videos</p>
              <p className="text-2xl font-bold text-gray-900">
                {items.filter(item => item.file_type === 'video').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Upload className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{items.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Upload and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search gallery items..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex items-center space-x-4">
            <UploadWidget
              onUpload={handleUpload}
              accept="image/*,video/*"
              maxSize={50 * 1024 * 1024} // 50MB
              bucket="uploads"
              folder="gallery"
              disabled={uploading}
            />
            <Button variant="outline" onClick={fetchGalleryItems}>
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Gallery Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center">
          <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No gallery items</h3>
          <p className="text-gray-500 mb-4">Upload your first image or video to get started.</p>
          <UploadWidget
            onUpload={handleUpload}
            accept="image/*,video/*"
            maxSize={50 * 1024 * 1024}
            bucket="uploads"
            folder="gallery"
            disabled={uploading}
          />
        </Card>
      ) : (
        viewMode === 'grid' ? renderGridView() : renderListView()
      )}
    </div>
  );
}
