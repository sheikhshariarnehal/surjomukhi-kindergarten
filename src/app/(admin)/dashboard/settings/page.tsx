'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Form } from '@/components/admin/Form';
import { UploadWidget } from '@/components/admin/UploadWidget';
import { 
  Settings as SettingsIcon, 
  School, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Save,
  Image,
  Calendar
} from 'lucide-react';
import { settingsSchema } from '@/lib/validators';
import { z } from 'zod';

type SettingsForm = z.infer<typeof settingsSchema>;

interface SchoolSettings {
  id?: string;
  school_name: string;
  eiin: string;
  established_year: number;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo_url?: string;
  description?: string;
  principal_name?: string;
  principal_message?: string;
  updated_at?: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [initialLoading, setInitialLoading] = useState(true);

  const form = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      school_name: '',
      eiin: '',
      established_year: new Date().getFullYear(),
      address: '',
      phone: '',
      email: '',
      website: '',
      logo_url: '',
      description: '',
      principal_name: '',
      principal_message: '',
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.settings) {
          const settings = data.settings;
          form.reset(settings);
          setLogoUrl(settings.logo_url || '');
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const onSubmit = async (data: SettingsForm) => {
    try {
      setLoading(true);

      const settingsData = {
        ...data,
        logo_url: logoUrl || undefined,
      };

      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save settings');
      }

      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert(error instanceof Error ? error.message : 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = (url: string) => {
    setLogoUrl(url);
    form.setValue('logo_url', url);
  };

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage school information and configuration
        </p>
      </div>

      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <School className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">School Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Name *
                  </label>
                  <Input
                    {...form.register('school_name')}
                    placeholder="Enter school name"
                    error={form.formState.errors.school_name?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EIIN Number *
                  </label>
                  <Input
                    {...form.register('eiin')}
                    placeholder="Enter EIIN number"
                    error={form.formState.errors.eiin?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Established Year *
                  </label>
                  <Input
                    {...form.register('established_year', { valueAsNumber: true })}
                    type="number"
                    placeholder="e.g., 1995"
                    error={form.formState.errors.established_year?.message}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <Input
                    {...form.register('address')}
                    placeholder="Enter school address"
                    error={form.formState.errors.address?.message}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...form.register('description')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description about the school..."
                  />
                  {form.formState.errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Phone className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    {...form.register('phone')}
                    placeholder="Enter phone number"
                    error={form.formState.errors.phone?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    {...form.register('email')}
                    type="email"
                    placeholder="Enter email address"
                    error={form.formState.errors.email?.message}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <Input
                    {...form.register('website')}
                    type="url"
                    placeholder="https://www.school.edu"
                    error={form.formState.errors.website?.message}
                  />
                </div>
              </div>
            </Card>

            {/* Principal Information */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <SettingsIcon className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">Principal Information</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Principal Name
                  </label>
                  <Input
                    {...form.register('principal_name')}
                    placeholder="Enter principal's name"
                    error={form.formState.errors.principal_name?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Principal's Message
                  </label>
                  <textarea
                    {...form.register('principal_message')}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Principal's message to students and parents..."
                  />
                  {form.formState.errors.principal_message && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.principal_message.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* School Logo */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                School Logo
              </h2>
              <div className="space-y-4">
                {logoUrl ? (
                  <div className="relative">
                    <img
                      src={logoUrl}
                      alt="School logo"
                      className="w-full h-48 object-contain rounded-lg border-2 border-gray-200 bg-white"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setLogoUrl('')}
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No logo uploaded</p>
                    </div>
                  </div>
                )}
                
                <UploadWidget
                  onUpload={handleLogoUpload}
                  accept="image/*"
                  maxSize={2 * 1024 * 1024} // 2MB
                  bucket="uploads"
                  folder="school"
                />
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Actions
              </h2>
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Reset Changes
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Form>
    </div>
  );
}
