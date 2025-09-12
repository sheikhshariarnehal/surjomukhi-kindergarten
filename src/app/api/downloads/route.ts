import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, supabaseAdmin } from '@/lib/db';
import { AuthService } from '@/lib/auth';
import { createDownloadSchema, updateDownloadSchema, validateData } from '@/lib/validators';
import { Download } from '@/types/gallery';

// GET /api/downloads - List all downloads with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    
    const offset = (page - 1) * limit;

    // Build query
    let query = supabaseAdmin
      .from('downloads')
      .select('*', { count: 'exact' })
      .order('uploaded_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Add search filter if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%`);
    }

    // Add category filter if provided
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching downloads:', error);
      return NextResponse.json(
        { error: 'Failed to fetch downloads' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      downloads: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Downloads API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/downloads - Create new download
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

    const body = await request.json();
    
    // Validate request data
    const validation = validateData(createDownloadSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      );
    }

    const downloadData = {
      ...validation.data,
      uploaded_at: new Date().toISOString(),
    };

    // Create download
    const download = await DatabaseService.create<Download>('downloads', downloadData);

    return NextResponse.json({
      success: true,
      download,
    }, { status: 201 });
  } catch (error) {
    console.error('Create download API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
