'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateEventSchema } from '@/lib/validators';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { OptimizedImageUpload, OptimizedImage } from '@/components/admin/OptimizedImageUpload';
import { 
  ArrowLeft, Save, Calendar, FileText, Clock, 
  MapPin, Tag, Globe, Star, Sparkles, CheckCircle, ImageIcon, ZapIcon
} from 'lucide-react';
import { z } from 'zod';
import { Event } from '@/types/event';

type UpdateEventFormData = z.infer<typeof updateEventSchema>;

const EVENT_CATEGORIES = [
  { value: 'academic', label: 'Academic', labelBn: 'একাডেমিক', icon: '📚' },
  { value: 'sports', label: 'Sports', labelBn: 'ক্রীড়া', icon: '⚽' },
  { value: 'cultural', label: 'Cultural', labelBn: 'সাংস্কৃতিক', icon: '🎭' },
  { value: 'social', label: 'Social', labelBn: 'সামাজিক', icon: '🤝' },
  { value: 'competition', label: 'Competition', labelBn: 'প্রতিযোগিতা', icon: '🏆' },
  { value: 'meeting', label: 'Meeting', labelBn: 'সভা', icon: '👥' },
  { value: 'ceremony', label: 'Ceremony', labelBn: 'অনুষ্ঠান', icon: '🎉' },
  { value: 'general', label: 'General', labelBn: 'সাধারণ', icon: '📌' },
];

const COMMON_TAGS = [
  'family-event', 'outdoor', 'indoor', 'competition', 'celebration',
  'education', 'fun', 'creative', 'interactive', 'annual'
];

export default function EditEventPage() {
  const [loading, setLoading] = useState(true);
  const [eventImages, setEventImages] = useState<OptimizedImage[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'bilingual' | 'location' | 'seo'>('basic');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<UpdateEventFormData>({
    resolver: zodResolver(updateEventSchema) as any, // Type assertion for resolver compatibility
  });

  const watchedCategory = watch('category') as string | undefined;
  const watchedFeatured = watch('featured') as boolean | undefined;

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    setValue('tags', newTags);
  };

  const handleAddCustomTag = () => {
    if (customTag && !selectedTags.includes(customTag)) {
      const newTags = [...selectedTags, customTag.toLowerCase().replace(/\s+/g, '-')];
      setSelectedTags(newTags);
      setValue('tags', newTags);
      setCustomTag('');
    }
  };

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${eventId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }

      const eventData = await response.json();
      setEvent(eventData);

      // Set tags from event data
      if (eventData.tags && Array.isArray(eventData.tags)) {
        setSelectedTags(eventData.tags);
      }

      // Convert existing images to OptimizedImage format
      if (eventData.images && eventData.images.length > 0) {
        const existingImages: OptimizedImage[] = eventData.images.map((img: { id: string; url: string; caption?: string; alt?: string; is_primary?: boolean }) => ({
          id: img.id,
          url: img.url,
          caption: img.caption || '',
          alt: img.alt || '',
          is_primary: img.is_primary || false,
        }));
        setEventImages(existingImages);
      } else if (eventData.image_url) {
        // If no images array but has image_url, create a single image entry
        setEventImages([{
          id: 'existing-primary',
          url: eventData.image_url,
          caption: '',
          alt: eventData.title || '',
          is_primary: true,
        }]);
      }

      // Reset form with all event data including new fields
      reset({
        title: eventData.title,
        title_bn: eventData.title_bn || '',
        description: eventData.description,
        description_bn: eventData.description_bn || '',
        start_date: eventData.start_date ?
          new Date(eventData.start_date).toISOString().slice(0, 16) :
          undefined,
        end_date: eventData.end_date ?
          new Date(eventData.end_date).toISOString().slice(0, 16) :
          undefined,
        image_url: eventData.image_url || '',
        location: eventData.location || '',
        venue: eventData.venue || '',
        venue_bn: eventData.venue_bn || '',
        organizer: eventData.organizer || '',
        organizer_bn: eventData.organizer_bn || '',
        category: eventData.category || 'general',
        status: eventData.status || 'upcoming',
        featured: eventData.featured || false,
        tags: eventData.tags || [],
        contact_email: eventData.contact_email || '',
        contact_phone: eventData.contact_phone || '',
        registration_url: eventData.registration_url || '',
        max_attendees: eventData.max_attendees || undefined,
        meta_title: eventData.meta_title || '',
        meta_description: eventData.meta_description || '',
        keywords: eventData.keywords || '',
      });
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Failed to load event. Please try again.');
      router.push('/dashboard/events');
    } finally {
      setLoading(false);
    }
  }, [eventId, reset, router]);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId, fetchEvent]);

  const handleImagesChange = (images: OptimizedImage[]) => {
    setEventImages(images);
    // Set primary image URL for form
    const primaryImage = images.find(img => img.is_primary) || images[0];
    if (primaryImage) {
      setValue('image_url', primaryImage.url);
    }
  };

  const onSubmit = async (data: UpdateEventFormData) => {
    try {
      // Generate slug from title if title is being updated
      const slug = data.title ? generateSlug(data.title) : undefined;
      
      // Get primary image URL
      const primaryImage = eventImages.find(img => img.is_primary) || eventImages[0];
      
      const payload = {
        ...data,
        ...(slug && { slug }),
        tags: selectedTags,
        image_url: primaryImage?.url || undefined,
      };
      
      // Update the event
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update event');
      }

      // Update images if there are changes
      if (eventImages.length > 0) {
        // First, delete all existing images
        await fetch(`/api/events/${eventId}/images`, {
          method: 'DELETE',
        });

        // Then add the new images
        const imageData = eventImages.map(img => ({
          url: img.url,
          caption: img.caption,
          is_primary: img.is_primary,
        }));

        const imagesResponse = await fetch(`/api/events/${eventId}/images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ images: imageData }),
        });

        if (!imagesResponse.ok) {
          console.warn('Failed to update images, but event was updated');
        }
      }

      setShowSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/events');
      }, 1500);
    } catch (error) {
      console.error('Error updating event:', error);
      alert(`Failed to update event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
        <p className="text-gray-600 mt-2">The event you&apos;re looking for doesn&apos;t exist.</p>
        <Button onClick={() => router.push('/dashboard/events')} className="mt-4">
          Back to Events
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Event updated successfully!</p>
                  <p className="text-xs text-green-600">Redirecting to events list...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
          
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Edit Event</h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Update bilingual content and SEO settings</p>
                </div>
              </div>
              {watchedFeatured && (
                <span className="flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  <Star className="h-4 w-4 mr-1.5 fill-yellow-500" />
                  Featured Event
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-1.5 sm:p-2 mb-4 sm:mb-6 overflow-x-auto">
          <nav className="flex gap-1.5 sm:gap-2 min-w-max sm:min-w-0">
            {[
              { id: 'basic', label: 'Basic Info', icon: FileText },
              { id: 'bilingual', label: 'বাংলা Content', icon: Globe },
              { id: 'location', label: 'Location & Contact', icon: MapPin },
              { id: 'seo', label: 'SEO Settings', icon: Sparkles },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <>
                  <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Event Information</h2>
                    </div>

                    <div className="space-y-6">
                      <Input
                        {...register('title')}
                        label="Event Title (English)"
                        placeholder="Enter event title"
                        error={errors.title?.message}
                      />

                      <Textarea
                        {...register('description')}
                        label="Event Description (English)"
                        placeholder="Enter the event description..."
                        rows={6}
                        error={errors.description?.message}
                      />
                    </div>
                  </Card>

                  {/* Category & Tags */}
                  <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Tag className="h-5 w-5 text-purple-600" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Category & Tags</h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Event Category</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {EVENT_CATEGORIES.map((cat) => (
                            <label
                              key={cat.value}
                              className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                watchedCategory === cat.value
                                  ? 'border-primary-500 bg-primary-50 shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                {...register('category')}
                                value={cat.value}
                                className="sr-only"
                              />
                              <span className="text-2xl mb-2">{cat.icon}</span>
                              <span className="text-sm font-medium text-gray-900">{cat.label}</span>
                              <span className="text-xs text-gray-500">{cat.labelBn}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {COMMON_TAGS.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleTagToggle(tag)}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                selectedTags.includes(tag)
                                  ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={customTag}
                            onChange={(e) => setCustomTag(e.target.value)}
                            placeholder="Add custom tag..."
                            className="flex-1"
                          />
                          <Button type="button" variant="outline" onClick={handleAddCustomTag}>
                            Add
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className="flex items-center space-x-3">
                          <Star className={`h-6 w-6 ${watchedFeatured ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-400'}`} />
                          <div>
                            <p className="font-medium text-gray-900">Featured Event</p>
                            <p className="text-sm text-gray-600">Display prominently on homepage</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" {...register('featured')} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                        </label>
                      </div>
                    </div>
                  </Card>

                  {/* Image Upload Card - Optimized for SEO & Performance */}
                  <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">Event Images</h2>
                          <p className="text-sm text-gray-500">Auto-optimized for web performance</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                        <ZapIcon className="h-3.5 w-3.5" />
                        SEO Optimized
                      </div>
                    </div>

                    {/* Error Display */}
                    {uploadError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                        {uploadError}
                      </div>
                    )}

                    {/* Optimized Image Upload Component */}
                    <OptimizedImageUpload
                      onImagesChange={handleImagesChange}
                      onError={(error) => setUploadError(error)}
                      maxImages={10}
                      bucket="uploads"
                      folder="events"
                      currentImages={eventImages}
                      label="Upload Event Images"
                      helperText="The primary image will be used as the event cover and in search results"
                      optimizationMode="seo"
                    />
                  </Card>
                </>
              )}

              {/* Bilingual Tab */}
              {activeTab === 'bilingual' && (
                <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">বাংলা Content</h2>
                  </div>

                  <div className="space-y-6">
                    <Input
                      {...register('title_bn')}
                      label="Event Title (বাংলা)"
                      placeholder="অনুষ্ঠানের শিরোনাম"
                      dir="auto"
                    />

                    <Textarea
                      {...register('description_bn')}
                      label="Event Description (বাংলা)"
                      placeholder="অনুষ্ঠান সম্পর্কে বিস্তারিত বিবরণ..."
                      rows={8}
                      dir="auto"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        {...register('organizer_bn')}
                        label="Organizer (বাংলা)"
                        placeholder="আয়োজক সংস্থা"
                        dir="auto"
                      />
                      <Input
                        {...register('venue_bn')}
                        label="Venue (বাংলা)"
                        placeholder="অনুষ্ঠানস্থল"
                        dir="auto"
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* Location & Contact Tab */}
              {activeTab === 'location' && (
                <>
                  <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-orange-600" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Location Details</h2>
                    </div>

                    <div className="space-y-4">
                      <Input {...register('location')} label="Location Address" placeholder="Full address" />
                      <Input {...register('venue')} label="Venue Name" placeholder="e.g., School Auditorium" />
                      <Input {...register('organizer')} label="Organizer" placeholder="e.g., Surjomukhi Kindergarten" />
                    </div>
                  </Card>

                  <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Contact & Registration</h2>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input {...register('contact_email')} label="Contact Email" type="email" placeholder="event@school.edu" />
                        <Input {...register('contact_phone')} label="Contact Phone" placeholder="+880 1234-567890" />
                      </div>
                      <Input {...register('registration_url')} label="Registration URL" placeholder="https://..." />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input {...register('max_attendees', { valueAsNumber: true })} label="Max Attendees" type="number" placeholder="100" />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Event Status</label>
                          <select {...register('status')} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="postponed">Postponed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">SEO Settings</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Input {...register('meta_title')} label="Meta Title" placeholder="SEO-optimized title" maxLength={60} />
                      <p className="mt-1 text-xs text-gray-500">{(watch('meta_title')?.length || 0)}/60 characters</p>
                    </div>

                    <div>
                      <Textarea {...register('meta_description')} label="Meta Description" placeholder="Brief description for search engines" rows={3} maxLength={160} />
                      <p className="mt-1 text-xs text-gray-500">{(watch('meta_description')?.length || 0)}/160 characters</p>
                    </div>

                    <Input {...register('keywords')} label="Keywords" placeholder="school event, kindergarten (comma-separated)" />

                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <p className="text-xs text-gray-500 mb-2">Search Result Preview:</p>
                      <p className="text-blue-700 text-lg font-medium truncate">{watch('meta_title') || watch('title') || 'Event Title'}</p>
                      <p className="text-green-700 text-sm">surjomukhikindergarten.edu/events/{generateSlug(watch('title') || 'event')}</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{watch('meta_description') || watch('description')?.slice(0, 160) || 'Description...'}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Date & Time */}
              <Card className="p-4 sm:p-6 bg-white shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Date & Time</h2>
                </div>

                <div className="space-y-4">
                  <Input {...register('start_date')} type="datetime-local" label="Start Date & Time" error={errors.start_date?.message} />
                  <Input {...register('end_date')} type="datetime-local" label="End Date & Time" error={errors.end_date?.message} />
                </div>
              </Card>

              {/* Actions */}
              <Card className="p-4 sm:p-6 bg-white shadow-sm border border-gray-200 lg:sticky lg:top-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-3">
                  <Button type="submit" loading={isSubmitting} disabled={isSubmitting} className="w-full justify-center">
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Updating...' : 'Update Event'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting} className="w-full justify-center">
                    Cancel
                  </Button>
                </div>
              </Card>

              {/* Event Info */}
              <Card className="p-4 sm:p-6 bg-white shadow-sm border border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Event Info</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Created:</span>
                    <p className="text-gray-500 mt-1">{new Date(event.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Updated:</span>
                    <p className="text-gray-500 mt-1">{new Date(event.updated_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">ID:</span>
                    <p className="text-gray-500 mt-1 font-mono text-xs">{event.id}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </form>
    </div>
  );
}
