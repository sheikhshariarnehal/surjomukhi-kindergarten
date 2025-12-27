'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Table, { TableColumn, commonActions } from '@/components/admin/Table';
import { Card } from '@/components/ui/Card';
import { Search, Calendar, Check, X, Clock, Download } from 'lucide-react';

interface AdmissionApplication {
  id: string;
  student_name: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  class_applying: string;
  date_of_birth: string;
  gender: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview_scheduled';
  application_date: string;
  interview_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface AdmissionsPageData {
  applications: AdmissionApplication[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function AdmissionsPage() {
  const [data, setData] = useState<AdmissionsPageData>({
    applications: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const router = useRouter();

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(classFilter && { class: classFilter }),
      });

      const response = await fetch(`/api/admissions?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching applications:', error);
      // Mock data for development
      setData({
        applications: [
          {
            id: '1',
            student_name: 'Emma Wilson',
            parent_name: 'Michael Wilson',
            parent_email: 'michael.wilson@email.com',
            parent_phone: '+880 1234-567890',
            class_applying: 'Play Group',
            date_of_birth: '2020-05-15',
            gender: 'female',
            address: 'Dhaka, Bangladesh',
            status: 'pending',
            application_date: '2024-01-15',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            student_name: 'Oliver Brown',
            parent_name: 'Jennifer Brown',
            parent_email: 'jennifer.brown@email.com',
            parent_phone: '+880 1234-567891',
            class_applying: 'Nursery',
            date_of_birth: '2019-08-22',
            gender: 'male',
            address: 'Chittagong, Bangladesh',
            status: 'approved',
            application_date: '2024-01-10',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            student_name: 'Sophia Davis',
            parent_name: 'David Davis',
            parent_email: 'david.davis@email.com',
            parent_phone: '+880 1234-567892',
            class_applying: 'One',
            date_of_birth: '2018-12-03',
            gender: 'female',
            address: 'Sylhet, Bangladesh',
            status: 'interview_scheduled',
            application_date: '2024-01-12',
            interview_date: '2024-02-01',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
        pagination: { page: 1, limit: 10, total: 3, totalPages: 1 },
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, classFilter]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleView = (application: AdmissionApplication) => {
    router.push(`/dashboard/admissions/${application.id}`);
  };

  const handleApprove = async (application: AdmissionApplication) => {
    if (!confirm(`Are you sure you want to approve the application for "${application.student_name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admissions/${application.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve application');
      }

      fetchApplications();
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Failed to approve application. Please try again.');
    }
  };

  const handleReject = async (application: AdmissionApplication) => {
    if (!confirm(`Are you sure you want to reject the application for "${application.student_name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admissions/${application.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject application');
      }

      fetchApplications();
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Failed to reject application. Please try again.');
    }
  };

  const handleScheduleInterview = async (application: AdmissionApplication) => {
    const interviewDate = prompt('Enter interview date (YYYY-MM-DD):');
    if (!interviewDate) return;

    try {
      const response = await fetch(`/api/admissions/${application.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'interview_scheduled',
          interview_date: interviewDate 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule interview');
      }

      fetchApplications();
    } catch (error) {
      console.error('Error scheduling interview:', error);
      alert('Failed to schedule interview. Please try again.');
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Student Name', 'Parent Name', 'Email', 'Phone', 'Class', 'Status', 'Application Date'],
      ...data.applications.map(app => [
        app.student_name,
        app.parent_name,
        app.parent_email,
        app.parent_phone,
        app.class_applying,
        app.status,
        app.application_date,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admission_applications.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      interview_scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Interview Scheduled' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const columns: TableColumn<AdmissionApplication>[] = [
    {
      key: 'student_name',
      label: 'Student',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {value.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">Age: {new Date().getFullYear() - new Date(row.date_of_birth).getFullYear()}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'parent_name',
      label: 'Parent/Guardian',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.parent_email}</div>
          <div className="text-sm text-gray-500">{row.parent_phone}</div>
        </div>
      ),
    },
    {
      key: 'class_applying',
      label: 'Class',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'application_date',
      label: 'Applied',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-900">
            {new Date(value).toLocaleDateString()}
          </span>
        </div>
      ),
    },
  ];

  const actions = [
    commonActions.view(handleView),
    {
      label: 'Approve',
      icon: <Check className="h-4 w-4" />,
      onClick: handleApprove,
      className: 'text-green-600 hover:text-green-700',
      show: (item: AdmissionApplication) => item.status === 'pending',
    },
    {
      label: 'Reject',
      icon: <X className="h-4 w-4" />,
      onClick: handleReject,
      className: 'text-red-600 hover:text-red-700',
      show: (item: AdmissionApplication) => item.status === 'pending',
    },
    {
      label: 'Schedule Interview',
      icon: <Clock className="h-4 w-4" />,
      onClick: handleScheduleInterview,
      className: 'text-blue-600 hover:text-blue-700',
      show: (item: AdmissionApplication) => item.status === 'pending',
    },
  ];

  const statuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'interview_scheduled', label: 'Interview Scheduled' },
  ];

  const classes = ['Play Group', 'Nursery', 'One', 'Two', 'Three', 'Four', 'Five'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admissions</h1>
          <p className="text-gray-600 mt-1">
            Manage admission applications and student enrollment
          </p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Applications
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Classes</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Applications Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              All Applications ({data.pagination.total})
            </h2>
          </div>

          <Table
            data={data.applications}
            columns={columns}
            actions={actions}
            loading={loading}
            emptyMessage="No admission applications found."
          />

          {/* Pagination */}
          {data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, data.pagination.total)} of {data.pagination.total} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {data.pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === data.pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
