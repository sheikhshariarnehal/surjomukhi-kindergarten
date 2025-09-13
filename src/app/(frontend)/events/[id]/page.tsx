'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Event } from '@/types';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Share2,
  Printer,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Eye,
  Star
} from 'lucide-react';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(`/api/events/${params.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else if (response.status === 404) {
          setNotFound(true);
        } else {
          throw new Error('Failed to fetch event');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatEventDate = (startDate: string, endDate?: string) => {
    if (!startDate) return 'Date not available';

    try {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : null;

      if (end && start.toDateString() !== end.toDateString()) {
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }

      return start.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getEventStatus = (startDate: string, endDate?: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;

    if (now < start) {
      return { status: 'upcoming', color: 'bg-blue-100 text-blue-800' };
    } else if (now >= start && now <= end) {
      return { status: 'ongoing', color: 'bg-green-100 text-green-800' };
    } else {
      return { status: 'completed', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const handleShare = async (platform?: string) => {
    if (!event) return;

    const url = window.location.href;
    const title = event.title;
    const text = event.description?.substring(0, 100) + '...';

    if (platform) {
      let shareUrl = '';
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
          break;
        case 'copy':
          navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
          setShareMenuOpen(false);
          return;
      }
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShareMenuOpen(false);
      }
    } else if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setShareMenuOpen(!shareMenuOpen);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
  };

  const nextImage = () => {
    if (event?.images) {
      setSelectedImageIndex((prev) => (prev + 1) % event.images!.length);
    }
  };

  const prevImage = () => {
    if (event?.images) {
      setSelectedImageIndex((prev) => (prev - 1 + event.images!.length) % event.images!.length);
    }
  };

  const handleDownloadImage = () => {
    if (event?.images && event.images[selectedImageIndex]) {
      const link = document.createElement('a');
      link.href = event.images[selectedImageIndex].url;
      link.download = `${event.title}-image-${selectedImageIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/events"
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const eventStatus = getEventStatus(event.start_date, event.end_date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <section className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/events" className="text-gray-500 hover:text-emerald-600 transition-colors">
                Events
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium truncate max-w-xs">
                {event?.title || 'Event Details'}
              </span>
            </nav>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => router.back()}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/50">
                {/* Hero Image Section */}
                {(() => {
                  const primaryImage = event?.images?.find(img => img.is_primary)?.url ||
                                      event?.images?.[0]?.url ||
                                      event?.image_url;

                  if (!primaryImage) return null;

                  return (
                    <div className="relative aspect-video group cursor-pointer" onClick={() => handleImageClick(0)}>
                      <Image
                        src={primaryImage}
                        alt={event?.title || 'Event image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Image count overlay */}
                      {event?.images && event.images.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>{event.images.length} Photos</span>
                        </div>
                      )}

                      {/* View Gallery Button */}
                      {event?.images && event.images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-medium shadow-lg hover:bg-white transition-colors">
                            View Gallery
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
                {/* Event Header */}
                <div className="p-6 lg:p-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Event
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${eventStatus.color}`}>
                      {eventStatus.status.charAt(0).toUpperCase() + eventStatus.status.slice(1)}
                    </span>
                    {event?.category && (
                      <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {event.category}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {event?.title}
                  </h1>

                  {/* Event Meta Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-700">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                          <Calendar className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Date</p>
                          <p className="text-sm text-gray-600">{formatEventDate(event?.start_date || '', event?.end_date)}</p>
                        </div>
                      </div>

                      {event?.start_time && (
                        <div className="flex items-center text-gray-700">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <Clock className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Time</p>
                            <p className="text-sm text-gray-600">{event.start_time}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {event?.location && (
                        <div className="flex items-center text-gray-700">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                            <MapPin className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Location</p>
                            <p className="text-sm text-gray-600">{event.location}</p>
                          </div>
                        </div>
                      )}

                      {event?.organizer && (
                        <div className="flex items-center text-gray-700">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                            <User className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Organizer</p>
                            <p className="text-sm text-gray-600">{event.organizer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-gray-200">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        isLiked
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? 'Liked' : 'Like'}
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => handleShare()}
                        className="flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium hover:bg-emerald-200 transition-all duration-200"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </button>

                      {shareMenuOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-48">
                          <button onClick={() => handleShare('facebook')} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center">
                            <span className="w-4 h-4 mr-3 bg-blue-600 rounded"></span>
                            Facebook
                          </button>
                          <button onClick={() => handleShare('twitter')} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center">
                            <span className="w-4 h-4 mr-3 bg-sky-500 rounded"></span>
                            Twitter
                          </button>
                          <button onClick={() => handleShare('linkedin')} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center">
                            <span className="w-4 h-4 mr-3 bg-blue-700 rounded"></span>
                            LinkedIn
                          </button>
                          <button onClick={() => handleShare('whatsapp')} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center">
                            <span className="w-4 h-4 mr-3 bg-green-500 rounded"></span>
                            WhatsApp
                          </button>
                          <button onClick={() => handleShare('copy')} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center">
                            <span className="w-4 h-4 mr-3 bg-gray-500 rounded"></span>
                            Copy Link
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handlePrint}
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </button>
                  </div>

                  {/* Event Description */}
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                    {event?.description ? (
                      event.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        No description available for this event.
                      </p>
                    )}
                  </div>

                  {/* Image Gallery */}
                  {event?.images && event.images.length > 1 && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Event Gallery
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {event.images.map((image, index) => (
                          <motion.div
                            key={image.id || index}
                            className="relative group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => handleImageClick(index)}
                          >
                            <div className="aspect-square relative overflow-hidden rounded-xl bg-gray-100">
                              <Image
                                src={image.url}
                                alt={image.caption || `Event photo ${index + 1}`}
                                fill
                                className="object-cover group-hover:brightness-110 transition-all duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                              {image.is_primary && (
                                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </div>
                              )}
                            </div>
                            {image.caption && (
                              <p className="mt-2 text-sm text-gray-600 text-center font-medium">
                                {image.caption}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Event Quick Info */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${eventStatus.color}`}>
                        {eventStatus.status.charAt(0).toUpperCase() + eventStatus.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Published</span>
                      <span className="text-sm text-gray-900">{formatDate(event?.created_at || '')}</span>
                    </div>
                    {event?.updated_at !== event?.created_at && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Updated</span>
                        <span className="text-sm text-gray-900">{formatDate(event?.updated_at || '')}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">Event ID</span>
                      <span className="text-xs text-gray-500 font-mono">{event?.id.slice(-8)}</span>
                    </div>
                  </div>
                </div>

                {/* Related Actions */}
                <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl shadow-lg border border-emerald-200/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <Link
                      href="/events"
                      className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Events
                    </Link>
                    <button
                      onClick={() => handleShare()}
                      className="w-full flex items-center justify-center px-4 py-3 bg-white text-emerald-600 border border-emerald-200 rounded-xl font-medium hover:bg-emerald-50 transition-colors"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Event
                    </button>
                    <button
                      onClick={handlePrint}
                      className="w-full flex items-center justify-center px-4 py-3 bg-white text-gray-600 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Details
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Have questions about this event? Contact our team for more information.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Email:</span>
                      <span className="ml-2">info@surjomukhi.edu</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Phone:</span>
                      <span className="ml-2">+880 123 456 789</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && event?.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation Buttons */}
              {event.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image */}
              <div className="relative aspect-video max-h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src={event.images[selectedImageIndex].url}
                  alt={event.images[selectedImageIndex].caption || `Event photo ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <div className="flex items-center justify-between text-white">
                  <div>
                    {event.images[selectedImageIndex].caption && (
                      <p className="text-lg font-medium mb-1">
                        {event.images[selectedImageIndex].caption}
                      </p>
                    )}
                    <p className="text-sm text-gray-300">
                      {selectedImageIndex + 1} of {event.images.length}
                      {event.images[selectedImageIndex].is_primary && ' • Featured Image'}
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadImage}
                    className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {event.images.length > 1 && (
                <div className="absolute -bottom-20 left-0 right-0 flex justify-center space-x-2 overflow-x-auto py-2">
                  {event.images.map((image, index) => (
                    <button
                      key={image.id || index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                        index === selectedImageIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close share menu */}
      {shareMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShareMenuOpen(false)}
        />
      )}
    </div>
  );
}
