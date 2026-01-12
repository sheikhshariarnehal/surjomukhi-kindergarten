'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, Filter, Grid, List, X, ChevronLeft, ChevronRight, Eye, Calendar, Loader2 } from 'lucide-react';
import { GalleryImage } from '@/types/gallery';

interface GalleryResponse {
  images: GalleryImage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: '12',
          ...(searchTerm && { search: searchTerm }),
          ...(selectedAlbum && { album: selectedAlbum }),
        });

        const response = await fetch(`/api/gallery?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }

        const data: GalleryResponse = await response.json();
        
        if (page === 1) {
          setImages(data.images || []);
        } else {
          setImages(prev => [...prev, ...(data.images || [])]);
        }
        
        setHasMore(page < (data.pagination?.totalPages || 1));
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError('Failed to load gallery images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, searchTerm, selectedAlbum]);

  // Reset page when search or filter changes
  useEffect(() => {
    setPage(1);
    setImages([]);
  }, [searchTerm, selectedAlbum]);

  // Get unique albums for filter
  const albums = Array.from(new Set(
    images
      .map(image => image.album)
      .filter(Boolean)
  )).sort();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleAlbumChange = (album: string) => {
    setSelectedAlbum(album);
  };

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentImageIndex - 1 + images.length) % images.length
      : (currentImageIndex + 1) % images.length;

    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [currentImageIndex, images]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, closeLightbox, navigateLightbox]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading our beautiful gallery...</p>
        </div>
      </div>
    );
  }

  if (error && images.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Gallery</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Surjomukhi Kindergarten Gallery",
    "description": "Photo gallery showcasing school activities, events, and memorable moments at Surjomukhi Kindergarten",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://www.surjamukhikindergarten.com"}/gallery`,
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Surjomukhi Kindergarten"
    },
    "image": images.slice(0, 5).map(image => ({
      "@type": "ImageObject",
      "url": image.image_url,
      "name": image.title,
      "description": image.caption
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Eye className="h-10 w-10" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              School Gallery
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Explore moments of joy, learning, and growth at Surjomukhi Kindergarten through our photo gallery
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">{images.length}</div>
                <div className="text-blue-200">Photos</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{albums.length}</div>
                <div className="text-blue-200">Albums</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Album Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedAlbum}
                onChange={(e) => handleAlbumChange(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
              >
                <option value="">All Albums</option>
                {albums.map(album => (
                  <option key={album} value={album}>{album}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'masonry' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-medium">{images.length}</span> photo{images.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length === 0 && !loading ? (
            <div className="text-center py-16">
              <Eye className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Photos Found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedAlbum
                  ? "Try adjusting your search criteria or filters."
                  : "No photos are currently available in the gallery."}
              </p>
            </div>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={
                  viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
                }
              >
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    variants={itemVariants}
                    className={`group cursor-pointer ${viewMode === 'masonry' ? 'break-inside-avoid' : ''}`}
                    onClick={() => openLightbox(image, index)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'aspect-auto'}`}>
                        <Image
                          src={image.image_url}
                          alt={image.title}
                          fill={viewMode === 'grid'}
                          width={viewMode === 'masonry' ? 400 : undefined}
                          height={viewMode === 'masonry' ? 300 : undefined}
                          className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
                            viewMode === 'grid' ? 'w-full h-full' : 'w-full h-auto'
                          }`}
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                            <Eye className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm font-medium">View Photo</p>
                          </div>
                        </div>
                      </div>

                      {/* Image Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold text-sm truncate">{image.title}</h3>
                        {image.caption && (
                          <p className="text-xs text-gray-200 truncate mt-1">{image.caption}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs bg-white/20 px-2 py-1 rounded">{image.album}</span>
                          <span className="text-xs flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(image.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Loading...
                      </>
                    ) : (
                      'Load More Photos'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close image viewer"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative"
              >
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />

                {/* Image Details */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
                  <h2 className="text-xl font-bold mb-2">{selectedImage.title}</h2>
                  {selectedImage.caption && (
                    <p className="text-gray-200 mb-3">{selectedImage.caption}</p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">{selectedImage.album}</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(selectedImage.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}
