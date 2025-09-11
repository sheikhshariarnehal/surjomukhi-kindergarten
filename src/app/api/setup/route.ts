import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Check if users already exist
    const { data: existingUsers, error: checkError } = await supabaseAdmin
      .from('users')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking existing users:', checkError);
      return NextResponse.json({
        success: false,
        error: 'Failed to check existing users'
      }, { status: 500 });
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Users already exist. Setup not needed.'
      }, { status: 400 });
    }

    // Create default admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@school.edu';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const adminUser = await AuthService.createUser({
      name: 'System Administrator',
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin',
    });

    if (!adminUser) {
      return NextResponse.json({
        success: false,
        error: 'Failed to create admin user'
      }, { status: 500 });
    }

    // Create some sample data for testing
    const sampleNotice = {
      title: 'Welcome to School CMS',
      slug: 'welcome-to-school-cms',
      content: 'This is a sample notice to test the CMS functionality. You can edit or delete this notice from the admin panel.',
      publish_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error: noticeError } = await supabaseAdmin
      .from('notices')
      .insert([sampleNotice]);

    if (noticeError) {
      console.error('Error creating sample notice:', noticeError);
    }

    // Create sample statistics
    const currentYear = new Date().getFullYear();
    const sampleStats = {
      year: currentYear,
      classes_count: 10,
      students_count: 450,
      teachers_count: 25,
      staffs_count: 15,
    };

    const { error: statsError } = await supabaseAdmin
      .from('statistics')
      .insert([sampleStats]);

    if (statsError) {
      console.error('Error creating sample statistics:', statsError);
    }

    return NextResponse.json({
      success: true,
      message: 'Setup completed successfully',
      adminUser: {
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
      },
      credentials: {
        email: adminEmail,
        password: adminPassword,
      }
    });
  } catch (error) {
    console.error('Setup API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Setup failed'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check setup status
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, name, email, role')
      .limit(5);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      setupComplete: users && users.length > 0,
      userCount: users?.length || 0,
      users: users || []
    });
  } catch (error) {
    console.error('Setup check error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Setup check failed'
    }, { status: 500 });
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
