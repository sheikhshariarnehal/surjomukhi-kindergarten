import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/db';
import { AuthService } from '@/lib/auth';
import { updateNoticeSchema, validateData } from '@/lib/validators';
import { Notice } from '@/types/notice';

// GET /api/notices/[id] - Get single notice
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const notice = await DatabaseService.getById<Notice>('notices', id);
    
    if (!notice) {
      return NextResponse.json(
        { error: 'Notice not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ notice });
  } catch (error) {
    console.error('Get notice API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/notices/[id] - Update notice
export async function PUT(
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

    // Check if notice exists
    const existingNotice = await DatabaseService.getById<Notice>('notices', id);
    if (!existingNotice) {
      return NextResponse.json(
        { error: 'Notice not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    
    // Validate request data
    const validation = validateData(updateNoticeSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      );
    }

    const updateData = {
      ...validation.data,
      updated_at: new Date().toISOString(),
    };

    // Update notice
    const notice = await DatabaseService.update<Notice>('notices', id, updateData);

    return NextResponse.json({
      success: true,
      notice,
    });
  } catch (error) {
    console.error('Update notice API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/notices/[id] - Delete notice
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

    // Check permissions (admin can delete)
    if (!AuthService.hasPermission(user.role, 'admin')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Check if notice exists
    const existingNotice = await DatabaseService.getById<Notice>('notices', id);
    if (!existingNotice) {
      return NextResponse.json(
        { error: 'Notice not found' },
        { status: 404 }
      );
    }

    // Delete notice
    await DatabaseService.delete('notices', id);

    return NextResponse.json({
      success: true,
      message: 'Notice deleted successfully',
    });
  } catch (error) {
    console.error('Delete notice API error:', error);
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
