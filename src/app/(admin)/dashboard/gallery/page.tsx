'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { Search, Trash2, Image as ImageIcon, Calendar, Newspaper, Camera, RefreshCw, X, ZoomIn, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  image_url: string;
  album: string;
  source: 'gallery' | 'event' | 'event_image' | 'news';
  created_at: string;
}

type SourceFilter = 'all' | 'gallery' | 'event' | 'news';

const sourceConfig = {
  gallery: { label: 'Gallery', icon: Camera, gradient: 'from-emerald-500 to-teal-500', badge: 'bg-emerald-100 text-emerald-700' },
  event: { label: 'Event', icon: Calendar, gradient: 'from-violet-500 to-purple-500', badge: 'bg-violet-100 text-violet-700' },
  event_image: { label: 'Event', icon: Calendar, gradient: 'from-violet-500 to-purple-500', badge: 'bg-violet-100 text-violet-700' },
  news: { label: 'News', icon: Newspaper, gradient: 'from-blue-500 to-cyan-500', badge: 'bg-blue-100 text-blue-700' },
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const fetchGalleryItems = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: '100',
        ...(searchTerm && { search: searchTerm }),
        ...(sourceFilter !== 'all' && { source: sourceFilter }),
      });
      const response = await fetch(`/api/gallery?${params}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setItems(data.images || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, sourceFilter]);

  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  const stats = useMemo(() => ({
    gallery: items.filter(item => item.source === 'gallery').length,
    events: items.filter(item => item.source === 'event' || item.source === 'event_image').length,
    news: items.filter(item => item.source === 'news').length,
    total: items.length,
  }), [items]);

  const handleUpload = async (urls: string[]) => {
    try {
      setUploading(true);
      // Upload all images to gallery
      for (const url of urls) {
        const response = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'Gallery Image', image_url: url, album: 'Gallery' }),
        });
        if (!response.ok) throw new Error('Failed');
      }
      await fetchGalleryItems();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (item.source !== 'gallery') {
      alert('Please delete from the ' + (item.source === 'event' || item.source === 'event_image' ? 'Events' : 'News') + ' section.');
      return;
    }
    if (!confirm('Delete "' + item.title + '"?')) return;
    try {
      const response = await fetch('/api/gallery/' + item.id, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed');
      await fetchGalleryItems();
      setSelectedImage(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Media Gallery</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and organize all your images in one place</p>
          </div>
          
          {/* Image Uploader */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <ImageUploader
              onUpload={handleUpload}
              maxSize={10 * 1024 * 1024}
              bucket="uploads"
              folder="gallery"
              disabled={uploading}
              multiple={true}
              maxFiles={20}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { key: 'gallery', value: stats.gallery, label: 'Gallery', icon: Camera, gradient: 'from-emerald-500 to-teal-500' },
          { key: 'events', value: stats.events, label: 'Events', icon: Calendar, gradient: 'from-violet-500 to-purple-500' },
          { key: 'news', value: stats.news, label: 'News', icon: Newspaper, gradient: 'from-blue-500 to-cyan-500' },
          { key: 'total', value: stats.total, label: 'Total', icon: ImageIcon, gradient: 'from-amber-500 to-orange-500' },
        ].map((stat) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
            {[
              { value: 'all', label: 'All' },
              { value: 'gallery', label: 'Gallery' },
              { value: 'event', label: 'Events' },
              { value: 'news', label: 'News' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSourceFilter(filter.value as SourceFilter)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  sourceFilter === filter.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <button
            onClick={fetchGalleryItems}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100"
        >
          <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <ImageIcon className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No images found</h3>
          <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
            {searchTerm || sourceFilter !== 'all' ? 'Try adjusting your search or filter.' : 'Upload images using the uploader above or add events with photos.'}
          </p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {items.map((item, index) => {
            const config = sourceConfig[item.source];
            const Icon = config.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <Image src={item.image_url} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute top-2 left-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm ${config.badge} bg-opacity-90`}>
                    <Icon className="w-3 h-3" />
                    {config.label}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg">
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    {item.source === 'gallery' && (
                      <button
                        onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleDelete(item); }}
                        className="w-10 h-10 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium truncate">{item.title}</p>
                  <p className="text-white/70 text-xs">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image src={selectedImage.image_url} alt={selectedImage.title} width={1200} height={800} className="max-w-full max-h-[75vh] object-contain rounded-lg" />
              </div>
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{selectedImage.title}</h3>
                    {selectedImage.caption && <p className="text-white/70 text-sm mt-1">{selectedImage.caption}</p>}
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${sourceConfig[selectedImage.source].badge}`}>
                        {React.createElement(sourceConfig[selectedImage.source].icon, { className: 'w-3 h-3' })}
                        {sourceConfig[selectedImage.source].label}
                      </span>
                      <span className="text-white/60 text-sm">
                        {new Date(selectedImage.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={selectedImage.image_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </a>
                    {selectedImage.source === 'gallery' && (
                      <button onClick={() => handleDelete(selectedImage)} className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white text-sm font-medium transition-colors">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
