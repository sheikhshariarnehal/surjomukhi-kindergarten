'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Users, BookOpen, Loader2 } from 'lucide-react';
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
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/teachers?limit=50');

        if (!response.ok) {
          throw new Error('Failed to load teachers data');
        }

        const data: TeachersResponse = await response.json();
        setTeachers(data.teachers || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Compute unique department list
  const departments = useMemo(() => {
    const depts = new Set<string>();
    teachers.forEach(t => {
      if (t.department && t.department.trim()) {
        depts.add(t.department.trim());
      }
    });
    return Array.from(depts).sort();
  }, [teachers]);

  // Filter teachers based on search term & department pill
  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = !searchTerm.trim() || 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDept = selectedDepartment === 'ALL' || teacher.department === selectedDepartment;

      return matchesSearch && matchesDept;
    });
  }, [teachers, searchTerm, selectedDepartment]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('ALL');
  };

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* Distilled Header Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-3"
          >
            Our Dedicated Faculty
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Meet the passionate educators and subject specialists guiding students and fostering character at Surjomukhi Kindergarten since 2004.
          </motion.p>

          {/* Unified Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by teacher name, subject, or designation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-gray-200/90 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-xs"
                aria-label="Search faculty"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200/60 transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Department Filter Tabs (Only shown if multiple departments exist) */}
            {departments.length > 0 && (
              <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
                <button
                  onClick={() => setSelectedDepartment('ALL')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    selectedDepartment === 'ALL'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  All Faculty ({teachers.length})
                </button>
                {departments.map((dept) => {
                  const count = teachers.filter(t => t.department === dept).length;
                  const isSelected = selectedDepartment === dept;
                  return (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {dept} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Active Count & Reset Indicator */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span>
                Showing <strong className="text-gray-900 font-semibold">{filteredTeachers.length}</strong> of {teachers.length} faculty members
              </span>
              {(searchTerm || selectedDepartment !== 'ALL') && (
                <>
                  <span>•</span>
                  <button
                    onClick={handleClearFilters}
                    className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 cursor-pointer"
                  >
                    Reset filters
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Directory Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-sm font-medium text-gray-600">Loading faculty directory...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Unable to Load Directory</h2>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
            >
              Retry
            </button>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 mb-1">No Faculty Found</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {searchTerm || selectedDepartment !== 'ALL'
                ? "No teachers matched your current search criteria."
                : "No teacher profiles are currently available."}
            </p>
            {(searchTerm || selectedDepartment !== 'ALL') && (
              <button
                onClick={handleClearFilters}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTeachers.map((teacher, index) => (
                <ModernTeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  index={index}
                  showDetails={true}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}