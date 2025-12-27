'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Table, { TableColumn, commonActions } from '@/components/admin/Table';
import { Card } from '@/components/ui/Card';
import { Plus, Search, Download } from 'lucide-react';
import { Student } from '@/types/student';

interface StudentsPageData {
  students: Student[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function StudentsPage() {
  const [data, setData] = useState<StudentsPageData>({
    students: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [classFilter, setClassFilter] = useState('');
  const [shiftFilter, setShiftFilter] = useState('');
  const router = useRouter();

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(classFilter && { class: classFilter }),
        ...(shiftFilter && { shift: shiftFilter }),
      });

      const response = await fetch(`/api/students?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching students:', error);
      // Mock data for development
      setData({
        students: [
          {
            id: '1',
            name: 'Alice Johnson',
            roll_number: 'SK001',
            class: 'Play Group',
            shift: 'Morning',
            admission_year: 2024,
            guardian_name: 'John Johnson',
            contact: '+880 1234-567890',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Bob Smith',
            roll_number: 'SK002',
            class: 'Nursery',
            shift: 'Morning',
            admission_year: 2023,
            guardian_name: 'Sarah Smith',
            contact: '+880 1234-567891',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
        pagination: { page: 1, limit: 10, total: 2, totalPages: 1 },
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, classFilter, shiftFilter]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleView = (student: Student) => {
    router.push(`/dashboard/students/${student.id}`);
  };

  const handleEdit = (student: Student) => {
    router.push(`/dashboard/students/${student.id}/edit`);
  };

  const handleDelete = async (student: Student) => {
    if (!confirm(`Are you sure you want to delete "${student.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/students/${student.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    }
  };

  const handleExport = () => {
    // Export students data to CSV
    const csvContent = [
      ['Name', 'Roll Number', 'Class', 'Shift', 'Guardian', 'Contact'],
      ...data.students.map(student => [
        student.name,
        student.roll_number,
        student.class,
        student.shift || '',
        student.guardian_name || '',
        student.contact || '',
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const columns: TableColumn<Student>[] = [
    {
      key: 'name',
      label: 'Student',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {value.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">Roll: {row.roll_number}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'class',
      label: 'Class',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          {row.shift && (
            <div className="text-sm text-gray-500">{row.shift} Shift</div>
          )}
        </div>
      ),
    },
    {
      key: 'guardian_name',
      label: 'Guardian',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value || 'N/A'}</div>
          {row.contact && (
            <div className="text-sm text-gray-500">{row.contact}</div>
          )}
        </div>
      ),
    },
    {
      key: 'admission_year',
      label: 'Admission Year',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Registered',
      render: (value) => (
        <span className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = [
    commonActions.view(handleView),
    commonActions.edit(handleEdit),
    commonActions.delete(handleDelete),
  ];

  const classes = ['Play Group', 'Nursery', 'One', 'Two', 'Three', 'Four', 'Five'];
  const shifts = ['Morning', 'Day'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">
            Manage student records and information
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/dashboard/students/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
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
          <div>
            <select
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Shifts</option>
              {shifts.map(shift => (
                <option key={shift} value={shift}>{shift}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Students Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              All Students ({data.pagination.total})
            </h2>
          </div>

          <Table
            data={data.students}
            columns={columns}
            actions={actions}
            loading={loading}
            emptyMessage="No students found. Add your first student to get started."
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
