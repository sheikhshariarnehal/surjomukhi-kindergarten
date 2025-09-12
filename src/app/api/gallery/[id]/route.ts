import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, supabaseAdmin } from '@/lib/db';
import { AuthService } from '@/lib/auth';
import { updateGalleryImageSchema, validateData } from '@/lib/validators';
import { GalleryImage } from '@/types/gallery';

// GET /api/gallery/[id] - Get single gallery item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const image = await DatabaseService.getById<GalleryImage>('gallery_images', params.id);

    if (!image) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ image });
  } catch (error) {
    console.error('Get gallery image API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/gallery/[id] - Update gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if gallery item exists
    const existingImage = await DatabaseService.getById<GalleryImage>('gallery_images', params.id);
    if (!existingImage) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Validate request data
    const validation = validateData(updateGalleryImageSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      );
    }

    const updateData = validation.data;

    // Update gallery item
    const image = await DatabaseService.update<GalleryImage>('gallery_images', params.id, updateData);

    return NextResponse.json({
      success: true,
      image,
    });
  } catch (error) {
    console.error('Update gallery image API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery/[id] - Delete gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check permissions (admin can delete)
    if (!AuthService.hasPermission(user.role, 'admin')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Check if gallery item exists
    const { data: existingItem } = await supabaseAdmin
      .from('gallery_images')
      .select('id')
      .eq('id', params.id)
      .single();

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    // Delete gallery item
    const { error } = await supabaseAdmin
      .from('gallery_images')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting gallery item:', error);
      return NextResponse.json(
        { error: 'Failed to delete gallery item' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    console.error('Delete gallery item API error:', error);
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
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
