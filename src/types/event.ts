export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  image_url?: string;
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  image_url?: string;
}

export interface EventListItem {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  image_url?: string;
}
