'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateEventSchema } from '@/lib/validators';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import UploadWidget from '@/components/admin/UploadWidget';
import { MultipleImageUpload, UploadedImage } from '@/components/admin/MultipleImageUpload';
import { ArrowLeft, Save } from 'lucide-react';
import { z } from 'zod';
import { Event } from '@/types/event';

type UpdateEventFormData = z.infer<typeof updateEventSchema>;

export default function EditEventPage() {
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [eventImages, setEventImages] = useState<UploadedImage[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<UpdateEventFormData>({
    resolver: zodResolver(updateEventSchema),
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
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
      setImageUrl(eventData.image_url || '');

      // Convert existing images to UploadedImage format
      if (eventData.images && eventData.images.length > 0) {
        const existingImages: UploadedImage[] = eventData.images.map((img: { id: string; url: string; caption?: string; is_primary?: boolean }) => ({
          id: img.id,
          url: img.url,
          caption: img.caption || '',
          is_primary: img.is_primary || false,
        }));
        setEventImages(existingImages);
      }

      // Reset form with event data
      reset({
        title: eventData.title,
        description: eventData.description,
        start_date: eventData.start_date ?
          new Date(eventData.start_date).toISOString().slice(0, 16) :
          undefined,
        end_date: eventData.end_date ?
          new Date(eventData.end_date).toISOString().slice(0, 16) :
          undefined,
        image_url: eventData.image_url || '',
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

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    setValue('image_url', url);
  };

  const onSubmit = async (data: UpdateEventFormData) => {
    try {
      // Generate slug from title if title is being updated
      const slug = data.title ? generateSlug(data.title) : undefined;
      
      // Update the event first
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          ...(slug && { slug }),
          image_url: imageUrl || (eventImages.length > 0 ? eventImages.find(img => img.is_primary)?.url || eventImages[0]?.url : undefined),
        }),
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

      router.push('/dashboard/events');
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
          <p className="text-gray-600 mt-1">Update event details and information</p>
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
                />

                <Textarea
                  {...register('description')}
                  label="Description"
                  placeholder="Enter the event description..."
                  rows={8}
                  error={errors.description?.message}
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
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Update Event
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Event Information
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <p className="text-gray-500 mt-1">
                    {new Date(event.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Last Updated:</span>
                  <p className="text-gray-500 mt-1">
                    {new Date(event.updated_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">ID:</span>
                  <p className="text-gray-500 mt-1 font-mono text-xs">
                    {event.id}
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
