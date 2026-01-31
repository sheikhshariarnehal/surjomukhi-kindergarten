'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEventSchema } from '@/lib/validators';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { OptimizedImageUpload, OptimizedImage } from '@/components/admin/OptimizedImageUpload';
import { 
  ArrowLeft, Save, Calendar, ImageIcon, FileText, Clock, 
  MapPin, Tag, Globe, Star, Mail, Sparkles, ZapIcon
} from 'lucide-react';
import { z } from 'zod';

type CreateEventFormData = z.infer<typeof createEventSchema>;

const EVENT_CATEGORIES = [
  { value: 'academic', label: 'Academic', labelBn: 'একাডেমিক', icon: '📚', color: 'bg-blue-100 text-blue-700' },
  { value: 'sports', label: 'Sports', labelBn: 'ক্রীড়া', icon: '⚽', color: 'bg-green-100 text-green-700' },
  { value: 'cultural', label: 'Cultural', labelBn: 'সাংস্কৃতিক', icon: '🎭', color: 'bg-purple-100 text-purple-700' },
  { value: 'social', label: 'Social', labelBn: 'সামাজিক', icon: '🤝', color: 'bg-pink-100 text-pink-700' },
  { value: 'competition', label: 'Competition', labelBn: 'প্রতিযোগিতা', icon: '🏆', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'meeting', label: 'Meeting', labelBn: 'সভা', icon: '👥', color: 'bg-gray-100 text-gray-700' },
  { value: 'ceremony', label: 'Ceremony', labelBn: 'অনুষ্ঠান', icon: '🎉', color: 'bg-orange-100 text-orange-700' },
  { value: 'general', label: 'General', labelBn: 'সাধারণ', icon: '📌', color: 'bg-slate-100 text-slate-700' },
];

const COMMON_TAGS = [
  'family-event', 'outdoor', 'indoor', 'competition', 'celebration',
  'education', 'fun', 'creative', 'interactive', 'annual'
];

export default function CreateEventPage() {
  const [eventImages, setEventImages] = useState<OptimizedImage[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'bilingual' | 'location' | 'seo'>('basic');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema) as any, // Type assertion for resolver compatibility
    defaultValues: {
      start_date: new Date().toISOString().slice(0, 16),
      category: 'general',
      status: 'upcoming',
      featured: false,
      organizer: 'Surjomukhi Kindergarten',
      organizer_bn: 'সূর্যমুখী কিন্ডারগার্টেন',
      tags: [],
    } as Partial<CreateEventFormData>,
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

  const handleImagesChange = (images: OptimizedImage[]) => {
    setEventImages(images);
    // Set primary image URL for form
    const primaryImage = images.find(img => img.is_primary) || images[0];
    if (primaryImage) {
      setValue('image_url', primaryImage.url);
    }
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

  const onSubmit = async (data: CreateEventFormData) => {
    try {
      // Generate slug from title
      const slug = generateSlug(data.title);
      
      // Get primary image URL
      const primaryImage = eventImages.find(img => img.is_primary) || eventImages[0];
      
      const payload = {
        ...data,
        slug,
        image_url: primaryImage?.url || undefined,
      };

      console.log('Submitting event data:', payload);
      
      // Create the event first
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('API Error Response:', JSON.stringify(error, null, 2));
        if (error.details) {
          console.error('Validation Errors:', error.details);
        }
        throw new Error(error.error || 'Failed to create event');
      }

      const result = await response.json();
      const eventId = result.event?.id;

      // If we have multiple images, upload them
      if (eventId && eventImages.length > 0) {
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
          console.warn('Failed to upload additional images, but event was created');
        }
      }

      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/events');
      }, 1500);
    } catch (error) {
      console.error('Error creating event:', error);
      alert(`Failed to create event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Event created successfully!</p>
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
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Create New Event</h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Add bilingual event with SEO optimization</p>
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
              {/* Event Details Card */}
              <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Event Information
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <Input
                      {...register('title')}
                      label="Event Title"
                      placeholder="e.g., Annual Sports Day 2025"
                      error={errors.title?.message}
                      required
                      className="text-base"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">Choose a clear, descriptive title for your event</p>
                  </div>

                  <div className="relative">
                    <Textarea
                      {...register('description')}
                      label="Event Description (English)"
                      placeholder="Describe the event in detail. Include what participants can expect, activities planned, and any special instructions..."
                      rows={6}
                      error={errors.description?.message}
                      required
                      className="text-base"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">Provide a comprehensive description of the event</p>
                  </div>
                </div>
              </Card>

              {/* Category & Tags Card */}
              <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
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
              <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Event Images
                      </h2>
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
                <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">বাংলা Content (Bengali)</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-emerald-800">
                        <strong>Tip:</strong> Add Bengali translations to make your event accessible to all visitors. This helps with local SEO and improves user experience.
                      </p>
                    </div>

                    <div className="relative">
                      <Input
                        {...register('title_bn')}
                        label="Event Title (বাংলা)"
                        placeholder="যেমন: বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৫"
                        error={errors.title_bn?.message}
                        className="text-base"
                        dir="auto"
                      />
                    </div>

                    <div className="relative">
                      <Textarea
                        {...register('description_bn')}
                        label="Event Description (বাংলা)"
                        placeholder="অনুষ্ঠান সম্পর্কে বিস্তারিত বিবরণ লিখুন..."
                        rows={8}
                        error={errors.description_bn?.message}
                        className="text-base"
                        dir="auto"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        {...register('organizer_bn')}
                        label="Organizer (বাংলা)"
                        placeholder="আয়োজক সংস্থা"
                        className="text-base"
                        dir="auto"
                      />
                      <Input
                        {...register('venue_bn')}
                        label="Venue (বাংলা)"
                        placeholder="অনুষ্ঠানস্থল"
                        className="text-base"
                        dir="auto"
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* Location & Contact Tab */}
              {activeTab === 'location' && (
                <>
                <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-orange-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Location Details</h2>
                  </div>

                  <div className="space-y-6">
                    <Input
                      {...register('location')}
                      label="Location Address"
                      placeholder="e.g., Surjomukhi Kindergarten Campus, Main Building"
                      className="text-base"
                    />
                    <Input
                      {...register('venue')}
                      label="Venue Name"
                      placeholder="e.g., School Auditorium, Sports Ground"
                      className="text-base"
                    />
                    <Input
                      {...register('organizer')}
                      label="Organizer"
                      placeholder="e.g., Surjomukhi Kindergarten"
                      className="text-base"
                    />
                  </div>
                </Card>

                <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-pink-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-pink-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Contact Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        {...register('contact_email')}
                        label="Contact Email"
                        type="email"
                        placeholder="event@school.edu"
                        className="text-base"
                      />
                      <Input
                        {...register('contact_phone')}
                        label="Contact Phone"
                        placeholder="+880 1234-567890"
                        className="text-base"
                      />
                    </div>
                    <Input
                      {...register('registration_url')}
                      label="Registration URL"
                      placeholder="https://forms.google.com/..."
                      className="text-base"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        {...register('max_attendees', { valueAsNumber: true })}
                        label="Max Attendees"
                        type="number"
                        placeholder="100"
                        className="text-base"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Status</label>
                        <select
                          {...register('status')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
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
                <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">SEO Settings</h2>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-indigo-800">
                      <strong>SEO Tip:</strong> Keep meta titles under 60 characters and descriptions under 160 characters for optimal search engine display.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <Input
                        {...register('meta_title')}
                        label="Meta Title"
                        placeholder="SEO-optimized title for search engines"
                        className="text-base"
                        maxLength={60}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {(watch('meta_title')?.length || 0)}/60 characters
                      </p>
                    </div>

                    <div className="relative">
                      <Textarea
                        {...register('meta_description')}
                        label="Meta Description"
                        placeholder="Brief description for search engine results..."
                        rows={3}
                        className="text-base"
                        maxLength={160}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {(watch('meta_description')?.length || 0)}/160 characters
                      </p>
                    </div>

                    <Input
                      {...register('keywords')}
                      label="Keywords"
                      placeholder="school event, annual function, kindergarten (comma-separated)"
                      className="text-base"
                    />

                    {/* SEO Preview */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                      <p className="text-xs text-gray-500 mb-2">Search Result Preview:</p>
                      <div className="space-y-1">
                        <p className="text-blue-700 text-lg font-medium truncate">
                          {watch('meta_title') || watch('title') || 'Event Title'}
                        </p>
                        <p className="text-green-700 text-sm">
                          surjomukhikindergarten.edu/events/{generateSlug(watch('title') || 'event-title')}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {watch('meta_description') || watch('description')?.slice(0, 160) || 'Event description will appear here...'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Date & Time Card */}
              <Card className="p-4 sm:p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Date & Time
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Input
                      {...register('start_date')}
                      type="datetime-local"
                      label="Start Date & Time"
                      error={errors.start_date?.message}
                      required
                      className="text-base"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">When does the event begin?</p>
                  </div>

                  <div>
                    <Input
                      {...register('end_date')}
                      type="datetime-local"
                      label="End Date & Time"
                      error={errors.end_date?.message}
                      className="text-base"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">Optional - Leave blank for single-time events</p>
                  </div>
                </div>
              </Card>

              {/* Action Card */}
              <Card className="p-4 sm:p-6 bg-white shadow-sm border border-gray-200 lg:sticky lg:top-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Actions
                </h2>
                <div className="space-y-3">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="w-full justify-center text-base py-3"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {isSubmitting ? 'Creating Event...' : 'Create Event'}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="w-full justify-center text-base py-3"
                  >
                    Cancel
                  </Button>
                </div>

                {isSubmitting && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 text-center">
                      Creating event...
                    </p>
                  </div>
                )}
              </Card>

              {/* Preview Card */}
              <Card className="p-4 sm:p-6 bg-white shadow-sm border border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Live Preview
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</label>
                    <p className="text-sm text-gray-900 mt-1 font-medium">
                      {watch('title') || 'Enter a title...'}
                    </p>
                  </div>

                  {watchedCategory && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</label>
                      <p className="text-sm text-gray-900 mt-1 flex items-center">
                        <span className="mr-2">{EVENT_CATEGORIES.find(c => c.value === watchedCategory)?.icon}</span>
                        {EVENT_CATEGORIES.find(c => c.value === watchedCategory)?.label}
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Start Date</label>
                    <p className="text-sm text-gray-700 mt-1">
                      {watch('start_date') ? 
                        (() => {
                          try {
                            const date = new Date(watch('start_date'));
                            return date.toLocaleString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            });
                          } catch {
                            return 'Invalid date';
                          }
                        })() : 
                        'Select start date'
                      }
                    </p>
                  </div>
                  
                  {watch('end_date') && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">End Date</label>
                      <p className="text-sm text-gray-700 mt-1">
                        {(() => {
                          try {
                            const endDate = watch('end_date');
                            if (!endDate) return 'No date selected';
                            const date = new Date(endDate);
                            return date.toLocaleString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            });
                          } catch {
                            return 'Invalid date';
                          }
                        })()}
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</label>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-3">
                      {watch('description') || 'Enter description...'}
                    </p>
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tags</label>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedTags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {eventImages.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Images</label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-700">{eventImages.length} image(s) uploaded</span>
                        {eventImages.some(img => img.optimizedSize && img.originalSize) && (
                          <span className="text-xs text-emerald-600 font-medium">
                            (Optimized for SEO)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </form>
    </div>
  );
}
