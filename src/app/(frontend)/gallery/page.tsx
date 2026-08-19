'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  Grid, 
  LayoutGrid, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Calendar, 
  Loader2, 
  Heart, 
  Share2, 
  ImageIcon,
  Sparkles,
  Maximize2
} from 'lucide-react';
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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Surjomukhi Kindergarten Photo Gallery",
    "description": "Visual highlights of school activities, celebrations, sports events, and daily classroom joy at Surjomukhi Kindergarten.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://www.surjamukhikindergarten.com"}/gallery`,
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Surjomukhi Kindergarten"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              Campus Photo Archive
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Photo Gallery & Campus Moments
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Capturing cherished moments of curiosity, creative expression, festive celebrations, and sportsmanship across Surjomukhi Kindergarten.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-3xl mx-auto text-center">
              <div className="p-2 sm:p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">{images.length}</div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">Verified Photos</div>
              </div>
              <div className="p-2 sm:p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">{albums.length || 4}</div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">Event Albums</div>
              </div>
              <div className="p-2 sm:p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">HD</div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">High Resolution</div>
              </div>
              <div className="p-2 sm:p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">2024–25</div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">Current Session</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and View Controls */}
        <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search & Album Filter */}
              <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search photos by title or event..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                <div className="relative min-w-[140px]">
                  <select
                    value={selectedAlbum}
                    onChange={(e) => handleAlbumChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer"
                  >
                    <option value="">All Albums</option>
                    {albums.map(album => (
                      <option key={album} value={album}>{album}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-xs' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid Layout"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'masonry' 
                      ? 'bg-white text-blue-600 shadow-xs' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Masonry Layout"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-10 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading && page === 1 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Loading photo archive...
                </p>
              </div>
            ) : error && images.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/80">
                <ImageIcon className="w-10 h-10 text-rose-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">Unable to Load Gallery</h3>
                <p className="text-xs text-slate-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
                >
                  Retry
                </button>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
                <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No Photos Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  No images match your search term or album filter.
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedAlbum(''); }}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                      : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
                  }
                >
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      className={`group relative rounded-2xl overflow-hidden bg-slate-900 cursor-pointer border border-slate-200/60 shadow-xs hover:shadow-lg transition-all duration-300 ${
                        viewMode === 'masonry' ? 'break-inside-avoid' : ''
                      }`}
                      onClick={() => openLightbox(image, index)}
                    >
                      <div className={`relative ${viewMode === 'grid' ? 'aspect-4/3' : 'aspect-auto'}`}>
                        <Image
                          src={image.image_url}
                          alt={image.title || 'Campus photo'}
                          fill={viewMode === 'grid'}
                          width={viewMode === 'masonry' ? 500 : undefined}
                          height={viewMode === 'masonry' ? 380 : undefined}
                          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                            viewMode === 'grid' ? 'w-full h-full' : 'w-full h-auto'
                          }`}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

                        {/* Dark Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full inline-block mb-1.5">
                              {image.album || 'Campus Life'}
                            </span>
                            <h4 className="text-sm font-bold text-white truncate">
                              {image.title}
                            </h4>
                            {image.caption && (
                              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                                {image.caption}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Quick View Icon */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-xs text-slate-900">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-colors shadow-xs disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                          Loading more photos...
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4 text-blue-400" />
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
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Counter */}
              <div className="absolute top-5 left-5 z-30 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Lightbox Content Container */}
              <div 
                className="relative max-w-5xl max-h-[85vh] flex flex-col items-center" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative max-w-full max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={selectedImage.image_url}
                    alt={selectedImage.title}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
                    priority
                  />
                </div>

                <div className="mt-4 text-center text-white max-w-xl">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-400/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                    {selectedImage.album}
                  </span>
                  <h3 className="text-lg font-bold">{selectedImage.title}</h3>
                  {selectedImage.caption && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {selectedImage.caption}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
