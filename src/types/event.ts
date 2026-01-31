export interface EventImage {
  id: string;
  url: string;
  caption?: string;
  is_primary?: boolean;
  display_order?: number;
  created_at: string;
}

export type EventCategory = 'academic' | 'sports' | 'cultural' | 'social' | 'competition' | 'meeting' | 'ceremony' | 'general';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  
  // Bilingual fields
  title_bn?: string;
  description_bn?: string;
  
  // Dates & location
  start_date: string;
  end_date?: string;
  location?: string;
  location_bn?: string;
  venue?: string;
  venue_bn?: string;
  
  // Organizer & contact
  organizer?: string;
  organizer_bn?: string;
  contact_email?: string;
  contact_phone?: string;
  
  // Images
  image_url?: string; // Keep for backward compatibility
  images?: EventImage[]; // New multiple images field
  
  // Registration
  registration_url?: string;
  max_participants?: number;
  max_attendees?: number; // Alias for max_participants
  current_participants?: number;
  
  // Categorization
  category?: EventCategory;
  tags?: string[];
  featured?: boolean;
  status?: EventStatus;
  
  // SEO
  meta_title?: string;
  meta_title_bn?: string;
  meta_description?: string;
  meta_description_bn?: string;
  keywords?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface CreateEventData {
  title: string;
  slug: string;
  description: string;
  start_date: string;
  end_date?: string;
  image_url?: string; // Keep for backward compatibility
  images?: string[]; // Array of image URLs
}

export interface UpdateEventData {
  title?: string;
  slug?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  image_url?: string; // Keep for backward compatibility
  images?: string[]; // Array of image URLs
}

export interface EventListItem {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  image_url?: string; // Keep for backward compatibility
  images?: EventImage[]; // New multiple images field
}
