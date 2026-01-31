'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, Filter, Grid, LayoutGrid, X, ChevronLeft, ChevronRight, Camera, Calendar, Loader2, Heart, Download, Share2, ImageIcon } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
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
      document.body.style.overflow = 'hidden';
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
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Camera className="h-10 w-10 text-primary-600" />
            </div>
            <Loader2 className="h-8 w-8 animate-spin text-primary-600 absolute -bottom-2 -right-2" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Gallery</h2>
          <p className="text-gray-600">গ্যালারি লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error && images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Gallery</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
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
    "name": "Surjomukhi Kindergarten Gallery | সূর্যমুখী কিন্ডারগার্টেন গ্যালারি",
    "description": "Photo gallery showcasing school activities, events, and memorable moments at Surjomukhi Kindergarten. সূর্যমুখী কিন্ডারগার্টেনের স্মরণীয় মুহূর্ত।",
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white overflow-hidden select-none">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 min-h-[400px] sm:min-h-[450px]">
            <div className="text-center select-none">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-xl"
              >
                <Camera className="h-10 w-10 drop-shadow-lg" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg"
              >
                Photo Gallery
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl lg:text-2xl font-semibold text-white/95 mb-2 drop-shadow-md"
              >
                ফটো গ্যালারি
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 drop-shadow-md px-4"
              >
                Capturing precious moments of joy, learning, and growth at our school
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 min-w-[120px] sm:min-w-[140px]">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{images.length}</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Photos | ছবি</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 min-w-[120px] sm:min-w-[140px]">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{albums.length}</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Albums | অ্যালবাম</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="sticky top-0 z-30 bg-white/98 backdrop-blur-lg shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
            <div className="flex flex-col gap-3">
              {/* Top Row: Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {/* Search */}
                <div className="relative flex-1 sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search photos... | ছবি খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {/* Album Filter */}
                  <div className="relative flex-1 sm:flex-none min-w-[140px]">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                    <select
                      value={selectedAlbum}
                      onChange={(e) => handleAlbumChange(e.target.value)}
                      className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer transition-all"
                    >
                      <option value="">All Albums | সব অ্যালবাম</option>
                      {albums.map(album => (
                        <option key={album} value={album}>{album}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-0.5 shadow-sm">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-white text-blue-600 shadow' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title="Grid View"
                      aria-label="Grid View"
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('masonry')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'masonry' 
                          ? 'bg-white text-blue-600 shadow' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title="Masonry View"
                      aria-label="Masonry View"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {images.length === 0 && !loading ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Camera className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Photos Found</h3>
                <p className="text-gray-600 mb-2">কোন ছবি পাওয়া যায়নি</p>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  {searchTerm || selectedAlbum
                    ? "Try adjusting your search criteria or filters."
                    : "No photos are currently available in the gallery."}
                </p>
                {(searchTerm || selectedAlbum) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedAlbum('');
                    }}
                    className="mt-6 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={
                    viewMode === 'grid'
                      ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
                      : "columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 lg:gap-6 space-y-3 sm:space-y-4 lg:space-y-6"
                  }
                >
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      variants={itemVariants}
                      className={`group cursor-pointer w-full ${viewMode === 'masonry' ? 'break-inside-avoid mb-3 sm:mb-4 lg:mb-6' : ''}`}
                      onClick={() => openLightbox(image, index)}
                    >
                      <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
                        <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'aspect-auto'}`}>
                          <Image
                            src={image.image_url}
                            alt={image.title}
                            fill={viewMode === 'grid'}
                            width={viewMode === 'masonry' ? 400 : undefined}
                            height={viewMode === 'masonry' ? 300 : undefined}
                            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                              viewMode === 'grid' ? 'w-full h-full' : 'w-full h-auto'
                            }`}
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="font-semibold text-white text-xs sm:text-sm lg:text-base truncate">{image.title}</h3>
                                {image.caption && (
                                  <p className="text-gray-200 text-[10px] sm:text-xs lg:text-sm truncate mt-1">{image.caption}</p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-[10px] sm:text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 sm:py-1 rounded-full text-white">
                                    {image.album}
                                  </span>
                                  <span className="text-[10px] sm:text-xs text-gray-300 flex items-center">
                                    <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                                    {new Date(image.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quick View Icon */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                              <Camera className="h-4 w-4 text-primary-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-10 sm:mt-14 lg:mt-20 pb-6">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="inline-flex items-center bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium min-h-[44px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 animate-spin mr-2" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                          Load More Photos
                        </>
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
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close image viewer"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Image */}
              <div className="relative max-w-5xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  key={selectedImage.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={selectedImage.image_url}
                    alt={selectedImage.title}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg"
                    priority
                  />

                  {/* Image Details */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 rounded-b-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                    {selectedImage.caption && (
                      <p className="text-gray-200 text-sm sm:text-base mb-4 line-clamp-2">{selectedImage.caption}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
                          {selectedImage.album}
                        </span>
                        <span className="text-gray-300 text-sm flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(selectedImage.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors" title="Like">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors" title="Share">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
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
