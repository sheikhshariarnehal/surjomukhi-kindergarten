'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, GraduationCap, BookOpen, Loader2 } from 'lucide-react';
import ModernTeacherCard from '@/components/frontend/ModernTeacherCard';
import { Teacher } from '@/types/teacher';

interface TeachersResponse {
  teachers: Teacher[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/teachers?limit=50');

        if (!response.ok) {
          throw new Error('Failed to fetch teachers');
        }

        const data: TeachersResponse = await response.json();
        setTeachers(data.teachers || []);
        setFilteredTeachers(data.teachers || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching teachers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Filter teachers based on search and department
  useEffect(() => {
    let filtered = teachers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects?.some(subject =>
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        teacher.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by department
    if (selectedDepartment) {
      filtered = filtered.filter(teacher =>
        teacher.department === selectedDepartment
      );
    }

    setFilteredTeachers(filtered);
  }, [teachers, searchTerm, selectedDepartment]);

  // Get unique departments for filter
  const departments = Array.from(new Set(
    teachers
      .map(teacher => teacher.department)
      .filter(Boolean)
  )).sort();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading our amazing teachers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Teachers</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <GraduationCap className="h-10 w-10" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Dedicated Teachers
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Meet the passionate educators who shape young minds and inspire lifelong learning at Surjomukhi Kindergarten
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">{teachers.length}</div>
                <div className="text-blue-200">Expert Teachers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{departments.length}</div>
                <div className="text-blue-200">Departments</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {Array.from(new Set(teachers.flatMap(t => t.subjects || []))).length}
                </div>
                <div className="text-blue-200">Subjects Covered</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers, subjects, or departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-medium">{filteredTeachers.length}</span> teacher{filteredTeachers.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTeachers.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Teachers Found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedDepartment
                  ? "Try adjusting your search criteria or filters."
                  : "No teachers are currently available."}
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {filteredTeachers.map((teacher, index) => (
                <ModernTeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}