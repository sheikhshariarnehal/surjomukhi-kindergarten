'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

import { UploadWidget } from '@/components/admin/UploadWidget';
import { ArrowLeft, Save, User, GraduationCap, Calendar, FileText } from 'lucide-react';
import { updateTeacherSchema } from '@/lib/validators';
import { Teacher } from '@/types/teacher';
import { z } from 'zod';

type UpdateTeacherForm = z.infer<typeof updateTeacherSchema>;

export default function EditTeacherPage() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [subjectInput, setSubjectInput] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const router = useRouter();
  const params = useParams();
  const teacherId = params.id as string;

  const form = useForm<UpdateTeacherForm>({
    resolver: zodResolver(updateTeacherSchema),
    defaultValues: {
      name: '',
      designation: '',
      bio: '',
      subjects: [],
      join_date: '',
      photo_url: '',
    },
  });

  useEffect(() => {
    if (teacherId) {
      fetchTeacher();
    }
  }, [teacherId]);

  const fetchTeacher = async () => {
    try {
      setFetchLoading(true);
      const response = await fetch(`/api/teachers/${teacherId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch teacher');
      }
      const data = await response.json();
      const teacher: Teacher = data.teacher;
      
      // Set form values
      form.reset({
        name: teacher.name,
        designation: teacher.designation,
        bio: teacher.bio || '',
        subjects: teacher.subjects || [],
        join_date: teacher.join_date || '',
        photo_url: teacher.photo_url || '',
      });
      
      setPhotoUrl(teacher.photo_url || '');
      setSubjects(teacher.subjects || []);
    } catch (error) {
      console.error('Error fetching teacher:', error);
      alert('Failed to load teacher. Please try again.');
      router.push('/dashboard/teachers');
    } finally {
      setFetchLoading(false);
    }
  };

  const onSubmit = async (data: UpdateTeacherForm) => {
    try {
      setLoading(true);

      const teacherData = {
        ...data,
        photo_url: photoUrl || undefined,
        subjects: subjects.filter(Boolean),
      };

      const response = await fetch(`/api/teachers/${teacherId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update teacher');
      }

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successMessage.textContent = 'Teacher updated successfully!';
      document.body.appendChild(successMessage);

      // Remove success message after 3 seconds
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);

      // Navigate back to teacher profile
      router.push(`/dashboard/teachers/${teacherId}`);
    } catch (error) {
      console.error('Error updating teacher:', error);

      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorMessage.textContent = error instanceof Error ? error.message : 'Failed to update teacher. Please try again.';
      document.body.appendChild(errorMessage);

      // Remove error message after 5 seconds
      setTimeout(() => {
        if (document.body.contains(errorMessage)) {
          document.body.removeChild(errorMessage);
        }
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const addSubject = () => {
    if (subjectInput.trim() && !subjects.includes(subjectInput.trim())) {
      const newSubjects = [...subjects, subjectInput.trim()];
      setSubjects(newSubjects);
      form.setValue('subjects', newSubjects);
      setSubjectInput('');
    }
  };

  const removeSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
    form.setValue('subjects', newSubjects);
  };

  if (fetchLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/dashboard/teachers/${teacherId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Teacher</h1>
            <p className="text-gray-600">Update teacher information and details</p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Link href={`/dashboard/teachers/${teacherId}`}>
            <Button
              variant="outline"
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
            >
              Cancel
            </Button>
          </Link>
          <Button
            variant="primary"
            onClick={form.handleSubmit(onSubmit)}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    {...form.register('name')}
                    placeholder="Enter teacher's full name"
                    error={form.formState.errors.name?.message}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation *
                  </label>
                  <Input
                    {...form.register('designation')}
                    placeholder="e.g., Senior Teacher, Head of Department"
                    error={form.formState.errors.designation?.message}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Biography
                  </label>
                  <textarea
                    {...form.register('bio')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description about the teacher..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Join Date
                  </label>
                  <Input
                    {...form.register('join_date')}
                    type="date"
                    error={form.formState.errors.join_date?.message}
                  />
                </div>
              </div>
            </Card>

            {/* Subjects */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Subjects</h2>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    placeholder="Enter subject name"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSubject}
                    className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {subject}
                      <button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Photo</h2>
              <UploadWidget
                onUpload={(url) => {
                  setPhotoUrl(url);
                  form.setValue('photo_url', url);
                }}
                currentFile={photoUrl}
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] }}
                maxSize={5 * 1024 * 1024} // 5MB
                bucket="teachers"
                folder="photos"
                label="Update Teacher Photo"
                helperText="Upload a new photo for the teacher (max 5MB)"
              />
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
