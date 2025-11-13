'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEventSchema } from '@/lib/validators';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import UploadWidget from '@/components/admin/UploadWidget';
import { MultipleImageUpload, UploadedImage } from '@/components/admin/MultipleImageUpload';
import { ArrowLeft, Save, Calendar, ImageIcon, FileText, Clock, Info } from 'lucide-react';
import { z } from 'zod';

type CreateEventFormData = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [eventImages, setEventImages] = useState<UploadedImage[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      start_date: new Date().toISOString().slice(0, 16), // Format for datetime-local input
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    setValue('image_url', url);
  };

  const onSubmit = async (data: CreateEventFormData) => {
    try {
      // Generate slug from title
      const slug = generateSlug(data.title);
      
      const payload = {
        ...data,
        slug,
        image_url: imageUrl || (eventImages.length > 0 ? eventImages.find(img => img.is_primary)?.url || eventImages[0]?.url : undefined),
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
                <p className="text-gray-600 mt-1">Add a new event or activity for the school calendar</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Details Card */}
              <Card className="p-6 sm:p-8 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
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
                      label="Event Description"
                      placeholder="Describe the event in detail. Include what participants can expect, activities planned, and any special instructions..."
                      rows={10}
                      error={errors.description?.message}
                      required
                      className="text-base"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">Provide a comprehensive description of the event</p>
                  </div>
                </div>
              </Card>

              {/* Image Upload Card */}
              <Card className="p-6 sm:p-8 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Event Images
                  </h2>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Image Guidelines:</p>
                      <ul className="mt-1 list-disc list-inside space-y-1">
                        <li>Upload up to 10 high-quality images</li>
                        <li>Maximum file size: 5MB per image</li>
                        <li>Mark one image as primary for the event cover</li>
                        <li>Supported formats: PNG, JPG, JPEG, GIF, WebP</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Multiple Image Upload */}
                <MultipleImageUpload
                  onImagesChange={setEventImages}
                  onError={(error) => alert(error)}
                  maxImages={10}
                  maxSize={5 * 1024 * 1024}
                  bucket="uploads"
                  folder="events"
                  currentImages={eventImages}
                  label="Upload Event Images"
                  helperText="The first image or marked primary image will be the main event image"
                />

                {/* Fallback Single Image Upload */}
                {eventImages.length === 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
                      Alternative: Single Image Upload
                    </h3>
                    <UploadWidget
                      onUpload={handleImageUpload}
                      accept={{
                        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
                      }}
                      maxSize={5 * 1024 * 1024}
                      bucket="uploads"
                      folder="events"
                      currentFile={imageUrl}
                      label="Upload Single Event Image"
                      helperText="Use this if you prefer uploading a single image"
                    />
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Date & Time Card */}
              <Card className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
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
              <Card className="p-6 bg-white shadow-sm border border-gray-200 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Actions
                </h2>
                <div className="space-y-3">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting || uploading}
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

                {(uploading || isSubmitting) && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 text-center">
                      {uploading ? 'Uploading images...' : 'Creating event...'}
                    </p>
                  </div>
                )}
              </Card>

              {/* Preview Card */}
              <Card className="p-6 bg-white shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Live Preview
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</label>
                    <p className="text-sm text-gray-900 mt-1 font-medium">
                      {watch('title') || 'Enter a title...'}
                    </p>
                  </div>
                  
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
                    <p className="text-sm text-gray-700 mt-1 line-clamp-4">
                      {watch('description') || 'Enter description...'}
                    </p>
                  </div>

                  {(eventImages.length > 0 || imageUrl) && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Images</label>
                      <p className="text-sm text-gray-700 mt-1">
                        {eventImages.length > 0 ? `${eventImages.length} image(s) uploaded` : '1 image uploaded'}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
