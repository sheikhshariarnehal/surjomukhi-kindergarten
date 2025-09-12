import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, supabaseAdmin } from '@/lib/db';
import { AuthService } from '@/lib/auth';
import { z } from 'zod';

const createGalleryItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  file_url: z.string().url('Invalid file URL'),
  file_type: z.enum(['image', 'video']),
});

// GET /api/gallery - List all gallery items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    // Build query
    let query = supabaseAdmin
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    // Add search filter if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: items, error } = await query;

    if (error) {
      console.error('Error fetching gallery items:', error);
      return NextResponse.json(
        { error: 'Failed to fetch gallery items' },
        { status: 500 }
      );
    }

    // Transform data to match expected format
    const transformedItems = (items || []).map(item => ({
      id: item.id,
      title: item.title || 'Untitled',
      description: item.description,
      file_url: item.image_url || item.file_url,
      file_type: item.file_type || 'image',
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));

    return NextResponse.json({
      items: transformedItems,
    });
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/gallery - Create new gallery item
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('Authorization')?.replace('Bearer ', '');
    
    const user = await AuthService.authenticateRequest(token || '');
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check permissions (admin or editor can create gallery items)
    if (!AuthService.hasPermission(user.role, 'editor')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate request data
    const validation = createGalleryItemSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }

    const galleryData = {
      title: validation.data.title,
      description: validation.data.description,
      image_url: validation.data.file_url,
      file_type: validation.data.file_type,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Create gallery item
    const { data: item, error } = await supabaseAdmin
      .from('gallery_images')
      .insert([galleryData])
      .select()
      .single();

    if (error) {
      console.error('Error creating gallery item:', error);
      return NextResponse.json(
        { error: 'Failed to create gallery item' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      item: {
        id: item.id,
        title: item.title,
        description: item.description,
        file_url: item.image_url,
        file_type: item.file_type,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Create gallery item API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
