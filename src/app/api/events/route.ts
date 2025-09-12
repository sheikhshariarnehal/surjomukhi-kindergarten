import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, supabaseAdmin } from '@/lib/db';
import { AuthService } from '@/lib/auth';
import { createEventSchema, validateData } from '@/lib/validators';
import { Event } from '@/types/event';

// GET /api/events - List all events with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const upcoming = searchParams.get('upcoming') === 'true';

    const offset = (page - 1) * limit;

    // Build query
    let query = supabaseAdmin
      .from('events')
      .select('*', { count: 'exact' });

    // Filter for upcoming events if requested
    if (upcoming) {
      const now = new Date().toISOString();
      query = query
        .gte('start_date', now)
        .order('start_date', { ascending: true });
    } else {
      query = query.order('start_date', { ascending: false });
    }

    query = query.range(offset, offset + limit - 1);

    // Add search filter if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: events, error, count } = await query;

    if (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      events: events || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Events API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create new event
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

    // Check permissions (admin or editor can create events)
    if (!AuthService.hasPermission(user.role, 'editor')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate request data
    const validation = validateData(createEventSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      );
    }

    const eventData = {
      ...validation.data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Create event
    const event = await DatabaseService.create<Event>('events', eventData);

    return NextResponse.json({
      success: true,
      event,
    }, { status: 201 });
  } catch (error) {
    console.error('Create event API error:', error);
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
