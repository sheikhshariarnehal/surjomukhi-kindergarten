import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { AuthService } from '@/lib/auth';

// GET /api/events/[id]/images - Get all images for an event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { data: images, error } = await supabaseAdmin
      .from('event_images')
      .select('*')
      .eq('event_id', id)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching event images:', error);
      return NextResponse.json(
        { error: 'Failed to fetch event images' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      images: images || [],
    });
  } catch (error) {
    console.error('Get event images API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/events/[id]/images - Add new images to an event
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
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

    // Check permissions
    if (!AuthService.hasPermission(user.role, 'editor')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { images } = body; // Array of { url, caption?, is_primary? }

    if (!images || !Array.isArray(images)) {
      return NextResponse.json(
        { error: 'Images array is required' },
        { status: 400 }
      );
    }

    // Verify event exists
    const { data: event, error: eventError } = await supabaseAdmin
      .from('events')
      .select('id')
      .eq('id', id)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Get current max display_order
    const { data: maxOrderResult } = await supabaseAdmin
      .from('event_images')
      .select('display_order')
      .eq('event_id', id)
      .order('display_order', { ascending: false })
      .limit(1);

    let nextOrder = 1;
    if (maxOrderResult && maxOrderResult.length > 0) {
      nextOrder = (maxOrderResult[0].display_order || 0) + 1;
    }

    // Prepare images for insertion
    const imagesToInsert = images.map((img: any, index: number) => ({
      event_id: id,
      url: img.url,
      caption: img.caption || null,
      is_primary: img.is_primary || false,
      display_order: nextOrder + index,
    }));

    // Insert images
    const { data: insertedImages, error: insertError } = await supabaseAdmin
      .from('event_images')
      .insert(imagesToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting event images:', insertError);
      return NextResponse.json(
        { error: 'Failed to add images' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      images: insertedImages,
    }, { status: 201 });
  } catch (error) {
    console.error('Add event images API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]/images - Delete all images for an event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
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

    // Check permissions
    if (!AuthService.hasPermission(user.role, 'editor')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Delete all images for the event
    const { error } = await supabaseAdmin
      .from('event_images')
      .delete()
      .eq('event_id', id);

    if (error) {
      console.error('Error deleting event images:', error);
      return NextResponse.json(
        { error: 'Failed to delete images' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'All event images deleted successfully',
    });
  } catch (error) {
    console.error('Delete event images API error:', error);
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
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
