import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/db';
import { AuthService } from '@/lib/auth';
import { updateDownloadSchema, validateData } from '@/lib/validators';
import { Download } from '@/types/gallery';

// GET /api/downloads/[id] - Get single download
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const download = await DatabaseService.getById<Download>('downloads', params.id);
    
    if (!download) {
      return NextResponse.json(
        { error: 'Download not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ download });
  } catch (error) {
    console.error('Get download API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/downloads/[id] - Update download
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

    // Check if download exists
    const existingDownload = await DatabaseService.getById<Download>('downloads', params.id);
    if (!existingDownload) {
      return NextResponse.json(
        { error: 'Download not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    
    // Validate request data
    const validation = validateData(updateDownloadSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      );
    }

    const updateData = validation.data;

    // Update download
    const download = await DatabaseService.update<Download>('downloads', params.id, updateData);

    return NextResponse.json({
      success: true,
      download,
    });
  } catch (error) {
    console.error('Update download API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/downloads/[id] - Delete download
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

    // Check if download exists
    const existingDownload = await DatabaseService.getById<Download>('downloads', params.id);
    if (!existingDownload) {
      return NextResponse.json(
        { error: 'Download not found' },
        { status: 404 }
      );
    }

    // Delete download
    await DatabaseService.delete('downloads', params.id);

    return NextResponse.json({
      success: true,
      message: 'Download deleted successfully',
    });
  } catch (error) {
    console.error('Delete download API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
