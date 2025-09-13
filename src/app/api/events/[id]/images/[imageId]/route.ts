import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { AuthService } from '@/lib/auth';

// PUT /api/events/[id]/images/[imageId] - Update a specific event image
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { id, imageId } = await params;
    
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
    const { caption, is_primary, display_order } = body;

    // Verify image exists and belongs to the event
    const { data: existingImage, error: imageError } = await supabaseAdmin
      .from('event_images')
      .select('*')
      .eq('id', imageId)
      .eq('event_id', id)
      .single();

    if (imageError || !existingImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (caption !== undefined) updateData.caption = caption;
    if (is_primary !== undefined) updateData.is_primary = is_primary;
    if (display_order !== undefined) updateData.display_order = display_order;

    // Update the image
    const { data: updatedImage, error: updateError } = await supabaseAdmin
      .from('event_images')
      .update(updateData)
      .eq('id', imageId)
      .eq('event_id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating event image:', updateError);
      return NextResponse.json(
        { error: 'Failed to update image' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      image: updatedImage,
    });
  } catch (error) {
    console.error('Update event image API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]/images/[imageId] - Delete a specific event image
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { id, imageId } = await params;
    
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

    // Verify image exists and belongs to the event
    const { data: existingImage, error: imageError } = await supabaseAdmin
      .from('event_images')
      .select('*')
      .eq('id', imageId)
      .eq('event_id', id)
      .single();

    if (imageError || !existingImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Delete the image
    const { error: deleteError } = await supabaseAdmin
      .from('event_images')
      .delete()
      .eq('id', imageId)
      .eq('event_id', id);

    if (deleteError) {
      console.error('Error deleting event image:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete image' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Delete event image API error:', error);
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
      'Access-Control-Allow-Methods': 'PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
