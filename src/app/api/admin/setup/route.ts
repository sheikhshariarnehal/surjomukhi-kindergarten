import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Check if this is a development environment
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Setup endpoint not available in production' },
        { status: 403 }
      );
    }

    // Create default admin user
    const adminPassword = 'admin123'; // Change this in production
    const hashedPassword = await AuthService.hashPassword(adminPassword);

    const adminUser = {
      name: 'Admin User',
      email: 'admin@school.edu.bd',
      password_hash: hashedPassword,
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Insert admin user (ignore if already exists)
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', adminUser.email)
      .single();

    if (!existingUser) {
      const { error: adminError } = await supabaseAdmin
        .from('users')
        .insert([adminUser]);

      if (adminError) {
        console.error('Error creating admin user:', adminError);
        return NextResponse.json(
          { error: 'Failed to create admin user' },
          { status: 500 }
        );
      }
    }

    // Create superadmin user
    const superAdminPassword = 'superadmin123'; // Change this in production
    const hashedSuperAdminPassword = await AuthService.hashPassword(superAdminPassword);

    const superAdminUser = {
      name: 'Super Admin',
      email: 'superadmin@school.edu.bd',
      password_hash: hashedSuperAdminPassword,
      role: 'superadmin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: existingSuperAdmin } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', superAdminUser.email)
      .single();

    if (!existingSuperAdmin) {
      const { error: superAdminError } = await supabaseAdmin
        .from('users')
        .insert([superAdminUser]);

      if (superAdminError) {
        console.error('Error creating superadmin user:', superAdminError);
        return NextResponse.json(
          { error: 'Failed to create superadmin user' },
          { status: 500 }
        );
      }
    }

    // Create editor user
    const editorPassword = 'editor123'; // Change this in production
    const hashedEditorPassword = await AuthService.hashPassword(editorPassword);

    const editorUser = {
      name: 'Editor User',
      email: 'editor@school.edu.bd',
      password_hash: hashedEditorPassword,
      role: 'editor',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: existingEditor } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', editorUser.email)
      .single();

    if (!existingEditor) {
      const { error: editorError } = await supabaseAdmin
        .from('users')
        .insert([editorUser]);

      if (editorError) {
        console.error('Error creating editor user:', editorError);
        return NextResponse.json(
          { error: 'Failed to create editor user' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Admin users created successfully',
      users: [
        { email: 'admin@school.edu.bd', password: 'admin123', role: 'admin' },
        { email: 'superadmin@school.edu.bd', password: 'superadmin123', role: 'superadmin' },
        { email: 'editor@school.edu.bd', password: 'editor123', role: 'editor' },
      ],
    });
  } catch (error) {
    console.error('Setup API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
