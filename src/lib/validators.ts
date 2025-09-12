import { z } from 'zod';

// User validation schemas
export const userRoleSchema = z.enum(['superadmin', 'admin', 'editor']);

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: userRoleSchema,
});

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  role: userRoleSchema.optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Notice validation schemas
export const createNoticeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().min(1, 'Content is required'),
  publish_date: z.string().datetime().optional(),
  file_url: z.string().url().optional().or(z.literal('')),
});

export const updateNoticeSchema = createNoticeSchema.partial();

// News validation schemas
export const createNewsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  publish_date: z.string().datetime().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
});

export const updateNewsSchema = createNewsSchema.partial();

// Event validation schemas
export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  start_date: z.string().datetime('Invalid start date'),
  end_date: z.string().datetime('Invalid end date').optional(),
  image_url: z.string().url().optional().or(z.literal('')),
});

export const updateEventSchema = createEventSchema.partial();

// Teacher validation schemas
export const createTeacherSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  designation: z.string().min(1, 'Designation is required'),
  bio: z.string().optional(),
  photo_url: z.string().optional(),
  subjects: z.array(z.string()).default([]),
  join_date: z.string().optional(),
});

export const updateTeacherSchema = createTeacherSchema.partial();

// Staff validation schemas
export const createStaffSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  photo_url: z.string().url().optional().or(z.literal('')),
  contact: z.string().optional(),
});

export const updateStaffSchema = createStaffSchema.partial();

// Student validation schemas
export const createStudentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  roll_number: z.string().min(1, 'Roll number is required'),
  class: z.string().min(1, 'Class is required'),
  shift: z.string().optional(),
  admission_year: z.number().int().min(2000).max(new Date().getFullYear() + 1).optional(),
  photo_url: z.string().url().optional().or(z.literal('')),
  contact: z.string().optional(),
  guardian_name: z.string().optional(),
});

export const updateStudentSchema = createStudentSchema.partial();

// Gallery validation schemas
export const createGalleryImageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  caption: z.string().optional(),
  image_url: z.string().url('Invalid image URL'),
  album: z.string().min(1, 'Album is required'),
});

export const updateGalleryImageSchema = createGalleryImageSchema.partial().omit({ image_url: true });

// Download validation schemas
export const createDownloadSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  file_url: z.string().url('Invalid file URL'),
  category: z.string().min(1, 'Category is required'),
});

export const updateDownloadSchema = createDownloadSchema.partial().omit({ file_url: true });

// Certificate verification schemas
export const createCertificateVerificationSchema = z.object({
  reference_id: z.string().min(1, 'Reference ID is required'),
  student_id: z.string().uuid().optional(),
  verified_bool: z.boolean(),
  details_json: z.any().optional(),
});

// Page validation schemas
export const createPageSchema = z.object({
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

export const updatePageSchema = createPageSchema.partial();

// Statistics validation schemas
export const createStatisticsSchema = z.object({
  year: z.number().int().min(2000).max(new Date().getFullYear() + 10),
  classes_count: z.number().int().min(0).default(0),
  students_count: z.number().int().min(0).default(0),
  teachers_count: z.number().int().min(0).default(0),
  staffs_count: z.number().int().min(0).default(0),
});

export const updateStatisticsSchema = createStatisticsSchema.partial();

// Class validation schemas
export const createClassSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  academic_year: z.number().int().min(2000).max(new Date().getFullYear() + 10),
});

export const updateClassSchema = createClassSchema.partial();

// Settings validation schemas
export const updateSettingsSchema = z.object({
  school_name: z.string().min(1, 'School name is required').optional(),
  established_year: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
  eiin: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
  favicon_url: z.string().url().optional().or(z.literal('')),
});

// Generic validation helper
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map(err => `${err.path.join('.')}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
}
