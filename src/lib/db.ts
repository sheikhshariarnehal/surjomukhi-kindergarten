import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations with elevated privileges
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase; // Fallback to regular client if service key is not available

// Database helper functions
export class DatabaseService {
  // Generic CRUD operations
  static async create<T>(table: string, data: Partial<T>): Promise<T | null> {
    const { data: result, error } = await supabaseAdmin
      .from(table)
      .insert(data)
      .select()
      .single();
    
    if (error) {
      console.error(`Error creating ${table}:`, error);
      throw new Error(error.message);
    }
    
    return result;
  }

  static async getById<T>(table: string, id: string): Promise<T | null> {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      console.error(`Error fetching ${table} by id:`, error);
      throw new Error(error.message);
    }
    
    return data;
  }

  static async getBySlug<T>(table: string, slug: string): Promise<T | null> {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      console.error(`Error fetching ${table} by slug:`, error);
      throw new Error(error.message);
    }
    
    return data;
  }

  static async getAll<T>(
    table: string, 
    options?: {
      orderBy?: string;
      ascending?: boolean;
      limit?: number;
      offset?: number;
    }
  ): Promise<T[]> {
    let query = supabaseAdmin.from(table).select('*');
    
    if (options?.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? true });
    }
    
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error(`Error fetching ${table}:`, error);
      throw new Error(error.message);
    }
    
    return data || [];
  }

  static async update<T>(table: string, id: string, data: Partial<T>): Promise<T | null> {
    const { data: result, error } = await supabaseAdmin
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating ${table}:`, error);
      throw new Error(error.message);
    }
    
    return result;
  }

  static async delete(table: string, id: string): Promise<boolean> {
    const { error } = await supabaseAdmin
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting from ${table}:`, error);
      throw new Error(error.message);
    }
    
    return true;
  }

  // Search functionality
  static async search<T>(
    table: string, 
    column: string, 
    query: string,
    options?: {
      limit?: number;
      orderBy?: string;
      ascending?: boolean;
    }
  ): Promise<T[]> {
    let searchQuery = supabaseAdmin
      .from(table)
      .select('*')
      .ilike(column, `%${query}%`);
    
    if (options?.orderBy) {
      searchQuery = searchQuery.order(options.orderBy, { ascending: options.ascending ?? true });
    }
    
    if (options?.limit) {
      searchQuery = searchQuery.limit(options.limit);
    }
    
    const { data, error } = await searchQuery;
    
    if (error) {
      console.error(`Error searching ${table}:`, error);
      throw new Error(error.message);
    }
    
    return data || [];
  }
}
