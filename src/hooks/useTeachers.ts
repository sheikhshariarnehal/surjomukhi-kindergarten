'use client';

import { useState, useEffect, useCallback } from 'react';
import { Teacher } from '@/types/teacher';

interface UseTeachersOptions {
  limit?: number;
  search?: string;
  department?: string;
  autoFetch?: boolean;
}

interface UseTeachersReturn {
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasMore: boolean;
  total: number;
}

interface TeachersApiResponse {
  teachers: Teacher[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useTeachers(options: UseTeachersOptions = {}): UseTeachersReturn {
  const {
    limit = 10,
    search = '',
    department = '',
    autoFetch = true
  } = options;

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      
      if (search) {
        params.append('search', search);
      }
      
      if (department) {
        params.append('department', department);
      }

      const response = await fetch(`/api/teachers?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch teachers: ${response.status} ${response.statusText}`);
      }

      const data: TeachersApiResponse = await response.json();
      
      setTeachers(data.teachers || []);
      setTotal(data.pagination?.total || 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  }, [limit, search, department]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchTeachers();
    }
  }, [fetchTeachers, autoFetch]);

  const hasMore = teachers.length < total;

  return {
    teachers,
    loading,
    error,
    refetch: fetchTeachers,
    hasMore,
    total
  };
}

// Hook for fetching a single teacher by ID or slug
interface UseTeacherOptions {
  id?: string;
  slug?: string;
  autoFetch?: boolean;
}

interface UseTeacherReturn {
  teacher: Teacher | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTeacher(options: UseTeacherOptions = {}): UseTeacherReturn {
  const { id, slug, autoFetch = true } = options;
  
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeacher = useCallback(async () => {
    if (!id && !slug) {
      setError('Either id or slug must be provided');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const identifier = id || slug;
      const response = await fetch(`/api/teachers/${identifier}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Teacher not found');
        }
        throw new Error(`Failed to fetch teacher: ${response.status} ${response.statusText}`);
      }

      const data: Teacher = await response.json();
      setTeacher(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching teacher:', err);
    } finally {
      setLoading(false);
    }
  }, [id, slug]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch && (id || slug)) {
      fetchTeacher();
    }
  }, [fetchTeacher, autoFetch, id, slug]);

  return {
    teacher,
    loading,
    error,
    refetch: fetchTeacher
  };
}

// Hook for fetching teachers with pagination
interface UseTeachersPaginatedOptions {
  limit?: number;
  search?: string;
  department?: string;
}

interface UseTeachersPaginatedReturn extends UseTeachersReturn {
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function useTeachersPaginated(options: UseTeachersPaginatedOptions = {}): UseTeachersPaginatedReturn {
  const { limit = 10, search = '', department = '' } = options;
  
  const [page, setPage] = useState(1);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      if (search) {
        params.append('search', search);
      }
      
      if (department) {
        params.append('department', department);
      }

      const response = await fetch(`/api/teachers?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch teachers: ${response.status} ${response.statusText}`);
      }

      const data: TeachersApiResponse = await response.json();
      
      setTeachers(data.teachers || []);
      setTotal(data.pagination?.total || 0);
      setTotalPages(data.pagination?.totalPages || 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, department]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const goToPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [totalPages]);

  return {
    teachers,
    loading,
    error,
    refetch: fetchTeachers,
    hasMore: page < totalPages,
    total,
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    canGoNext: page < totalPages,
    canGoPrev: page > 1
  };
}
