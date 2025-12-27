import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { AuthService } from '@/lib/auth';

// PATCH /api/admissions/[id]/status - Update admission application status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params
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

    // Check if user has permission to update admission status
    if (!['admin', 'superadmin'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }
    const body = await request.json();
    
    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'interview_scheduled'];
    if (!body.status || !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {
      status: body.status,
      updated_at: new Date().toISOString(),
    };

    // Add interview date if status is interview_scheduled
    if (body.status === 'interview_scheduled' && body.interview_date) {
      updateData.interview_date = body.interview_date;
    }

    // Add notes if provided
    if (body.notes) {
      updateData.notes = body.notes;
    }

    // Update admission application
    const { data: application, error } = await supabaseAdmin
      .from('admission_applications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update application status' },
        { status: 500 }
      );
    }

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // TODO: Send email notification to parent based on status change
    // await sendStatusUpdateEmail(application);

    return NextResponse.json({
      success: true,
      application,
      message: `Application status updated to ${body.status}`,
    });
  } catch (error) {
    console.error('Update admission status API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
