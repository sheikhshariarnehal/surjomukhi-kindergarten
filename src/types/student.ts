export interface Student {
  id: string;
  name: string;
  roll_number: string;
  class: string;
  shift?: string;
  admission_year?: number;
  photo_url?: string;
  contact?: string;
  guardian_name?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateStudentData {
  name: string;
  roll_number: string;
  class: string;
  shift?: string;
  admission_year?: number;
  photo_url?: string;
  contact?: string;
  guardian_name?: string;
}

export interface UpdateStudentData {
  name?: string;
  roll_number?: string;
  class?: string;
  shift?: string;
  admission_year?: number;
  photo_url?: string;
  contact?: string;
  guardian_name?: string;
}

export interface CertificateVerification {
  id: string;
  reference_id: string;
  student_id?: string;
  verified_bool: boolean;
  details_json?: Record<string, unknown>;
  checked_at: string;
  student?: Student;
}

export interface CreateCertificateVerificationData {
  reference_id: string;
  student_id?: string;
  verified_bool: boolean;
  details_json?: Record<string, unknown>;
}

export interface Statistics {
  id: string;
  year: number;
  classes_count: number;
  students_count: number;
  teachers_count: number;
  staffs_count: number;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  name: string;
  academic_year: number;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}
