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
import { ArrowLeft, Save, Calendar } from 'lucide-react';
import { z } from 'zod';

type CreateEventFormData = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [eventImages, setEventImages] = useState<UploadedImage[]>([]);
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

      router.push('/dashboard/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert(`Failed to create event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-1">Add a new event or activity for the school</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Event Details
              </h2>

              <div className="space-y-6">
                <Input
                  {...register('title')}
                  label="Title"
                  placeholder="Enter event title"
                  error={errors.title?.message}
                  required
                />

                <Textarea
                  {...register('description')}
                  label="Description"
                  placeholder="Enter the event description..."
                  rows={8}
                  error={errors.description?.message}
                  required
                />
              </div>
            </Card>

            {/* Image Upload */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Event Images (Optional)
              </h2>

              {/* Multiple Image Upload */}
              <MultipleImageUpload
                onImagesChange={setEventImages}
                onError={(error) => alert(error)}
                maxImages={10}
                maxSize={5 * 1024 * 1024} // 5MB
                bucket="uploads"
                folder="events"
                currentImages={eventImages}
                label="Upload Event Images"
                helperText="Upload up to 10 images for the event. The first image or marked primary image will be the main event image."
              />

              {/* Fallback Single Image Upload */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-md font-medium text-gray-700 mb-3">
                  Or upload a single image (legacy)
                </h3>
                <UploadWidget
                  onUpload={handleImageUpload}
                  accept={{
                    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
                  }}
                  maxSize={5 * 1024 * 1024} // 5MB
                  bucket="uploads"
                  folder="events"
                  currentFile={imageUrl}
                  label="Upload Single Event Image"
                  helperText="This will be used if no images are uploaded above"
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Event Schedule
              </h2>
              <div className="space-y-4">
                <Input
                  {...register('start_date')}
                  type="datetime-local"
                  label="Start Date & Time"
                  error={errors.start_date?.message}
                  required
                />

                <Input
                  {...register('end_date')}
                  type="datetime-local"
                  label="End Date & Time (Optional)"
                  error={errors.end_date?.message}
                />

                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting || uploading}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Preview
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title:</label>
                  <p className="text-sm text-gray-900 mt-1">
                    {watch('title') || 'Enter a title...'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Start Date:</label>
                  <p className="text-sm text-gray-500 mt-1">
                    {watch('start_date') ? 
                      (() => {
                        try {
                          const date = new Date(watch('start_date'));
                          return date.toLocaleString();
                        } catch {
                          return 'Invalid date';
                        }
                      })() : 
                      'Select start date'
                    }
                  </p>
                </div>
                {watch('end_date') && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">End Date:</label>
                    <p className="text-sm text-gray-500 mt-1">
                      {(() => {
                        try {
                          const endDate = watch('end_date');
                          if (!endDate) return 'No date selected';
                          const date = new Date(endDate);
                          return date.toLocaleString();
                        } catch {
                          return 'Invalid date';
                        }
                      })()}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700">Description:</label>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                    {watch('description') || 'Enter description...'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
