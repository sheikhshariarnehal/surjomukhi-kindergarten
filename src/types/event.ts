export interface EventImage {
  id: string;
  url: string;
  caption?: string;
  is_primary?: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  start_date: string;
  end_date?: string;
  image_url?: string; // Keep for backward compatibility
  images?: EventImage[]; // New multiple images field
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
