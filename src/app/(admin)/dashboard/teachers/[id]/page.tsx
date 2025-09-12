'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Edit, Trash2, User, GraduationCap, Calendar, Mail, Phone } from 'lucide-react';
import { Teacher } from '@/types/teacher';

export default function TeacherViewPage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const teacherId = params.id as string;

  useEffect(() => {
    if (teacherId) {
      fetchTeacher();
    }
  }, [teacherId]);

  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/teachers/${teacherId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch teacher');
      }
      const data = await response.json();
      setTeacher(data.teacher);
    } catch (error) {
      console.error('Error fetching teacher:', error);
      alert('Failed to load teacher. Please try again.');
      router.push('/dashboard/teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!teacher) return;

    if (!confirm(`Are you sure you want to delete "${teacher.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/teachers/${teacherId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete teacher');
      }

      alert('Teacher deleted successfully');
      router.push('/dashboard/teachers');
    } catch (error) {
      console.error('Error deleting teacher:', error);
      alert('Failed to delete teacher. Please try again.');
    }
  };

  if (loading) {
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

  if (!teacher) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Teacher not found</h3>
        <p className="text-gray-500 mb-4">The teacher you're looking for doesn't exist.</p>
        <Link href="/dashboard/teachers">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teachers
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/teachers">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{teacher.name}</h1>
            <p className="text-gray-600">{teacher.designation}</p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Link href={`/dashboard/teachers/${teacherId}/edit`}>
            <Button
              variant="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Teacher
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="border-red-300 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Teacher Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900">{teacher.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <p className="text-gray-900">{teacher.designation}</p>
              </div>
              {teacher.bio && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{teacher.bio}</p>
                </div>
              )}
              {teacher.join_date && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <p className="text-gray-900">{new Date(teacher.join_date).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Subjects */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Subjects Taught</h2>
            <div className="flex flex-wrap gap-2">
              {teacher.subjects?.map((subject, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  <GraduationCap className="h-4 w-4 mr-1" />
                  {subject}
                </span>
              ))}
              {(!teacher.subjects || teacher.subjects.length === 0) && (
                <p className="text-gray-500">No subjects assigned</p>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Photo */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Photo</h2>
            <div className="flex justify-center">
              {teacher.photo_url ? (
                <img
                  src={teacher.photo_url}
                  alt={teacher.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <User className="h-16 w-16 text-white" />
                </div>
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h2>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Joined:</span>
                <span className="ml-2 text-gray-900">
                  {teacher.join_date ? new Date(teacher.join_date).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <GraduationCap className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Subjects:</span>
                <span className="ml-2 text-gray-900">{teacher.subjects?.length || 0}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
