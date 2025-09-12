export interface Teacher {
  id: string;
  name: string;
  designation: string;
  bio?: string;
  photo_url?: string;
  subjects: string[];
  join_date?: string;
  slug?: string;
  qualifications?: string[];
  experience_years?: number;
  contact_email?: string;
  contact_phone?: string;
  department?: string;
  teaching_philosophy?: string;
  achievements?: string[];
  education_background?: string;
  certifications?: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateTeacherData {
  name: string;
  designation: string;
  bio?: string;
  photo_url?: string;
  subjects: string[];
  join_date?: string;
  slug?: string;
  qualifications?: string[];
  experience_years?: number;
  contact_email?: string;
  contact_phone?: string;
  department?: string;
  teaching_philosophy?: string;
  achievements?: string[];
  education_background?: string;
  certifications?: string[];
}

export interface UpdateTeacherData {
  name?: string;
  designation?: string;
  bio?: string;
  photo_url?: string;
  subjects?: string[];
  join_date?: string;
  slug?: string;
  qualifications?: string[];
  experience_years?: number;
  contact_email?: string;
  contact_phone?: string;
  department?: string;
  teaching_philosophy?: string;
  achievements?: string[];
  education_background?: string;
  certifications?: string[];
}

export interface TeacherListItem {
  id: string;
  name: string;
  designation: string;
  photo_url?: string;
  subjects: string[];
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  photo_url?: string;
  contact?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateStaffData {
  name: string;
  role: string;
  photo_url?: string;
  contact?: string;
}

export interface UpdateStaffData {
  name?: string;
  role?: string;
  photo_url?: string;
  contact?: string;
}
