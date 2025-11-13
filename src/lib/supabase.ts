import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Teacher {
  id: string;
  name: string;
  designation: string;
  bio?: string;
  photo_url?: string;
  subjects?: string[];
  join_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Notice {
  id: string;
  title: string;
  slug: string;
  content: string;
  publish_date?: string;
  file_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface News {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  publish_date?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// API functions for Teachers
export const teachersApi = {
  // Get all teachers
  async getAll(): Promise<Teacher[]> {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get teacher by ID
  async getById(id: string): Promise<Teacher | null> {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new teacher
  async create(teacher: Omit<Teacher, 'id' | 'created_at' | 'updated_at'>): Promise<Teacher> {
    const { data, error } = await supabase
      .from('teachers')
      .insert([teacher])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update teacher
  async update(id: string, updates: Partial<Teacher>): Promise<Teacher> {
    const { data, error } = await supabase
      .from('teachers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete teacher
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// API functions for Notices
export const noticesApi = {
  // Get all notices
  async getAll(limit?: number): Promise<Notice[]> {
    let query = supabase
      .from('notices')
      .select('*')
      .order('publish_date', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  // Get notice by slug
  async getBySlug(slug: string): Promise<Notice | null> {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  // Get recent notices for homepage
  async getRecent(limit: number = 5): Promise<Notice[]> {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('publish_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
};

// API functions for News
export const newsApi = {
  // Get all news
  async getAll(limit?: number): Promise<News[]> {
    let query = supabase
      .from('news')
      .select('*')
      .order('publish_date', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  // Get news by ID
  async getById(id: string): Promise<News | null> {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get recent news for homepage
  async getRecent(limit: number = 3): Promise<News[]> {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('publish_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
};

// API functions for Events
export const eventsApi = {
  // Get all events
  async getAll(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get upcoming events
  async getUpcoming(limit: number = 5): Promise<Event[]> {
    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_date', today.toISOString())
      .order('start_date', { ascending: true })
      .limit(limit);

    if (error) throw error;
    
    // If no upcoming events, get recent past events instead
    if (!data || data.length === 0) {
      const { data: pastData, error: pastError } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false })
        .limit(limit);
      
      if (pastError) throw pastError;
      return pastData || [];
    }
    
    return data || [];
  },

  // Get recent events for homepage (shows latest events regardless of date)
  async getRecent(limit: number = 4): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Get event by ID
  async getById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};

export default supabase;