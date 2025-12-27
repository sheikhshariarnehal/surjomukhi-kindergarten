import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { AuthService } from '@/lib/auth';
import { settingsSchema, validateData } from '@/lib/validators';

// GET /api/settings - Get school settings
export async function GET() {
  try {
    const { data: settings, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Error fetching settings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      settings: settings || null,
    });
  } catch (error) {
    console.error('Settings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/settings - Create or update school settings
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

    // Check permissions (admin can update settings)
    if (!AuthService.hasPermission(user.role, 'admin')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate request data
    const validation = validateData(settingsSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      );
    }

    const settingsData = {
      ...validation.data,
      updated_at: new Date().toISOString(),
    };

    // Check if settings already exist
    const { data: existingSettings } = await supabaseAdmin
      .from('settings')
      .select('id')
      .single();

    let settings;
    if (existingSettings) {
      // Update existing settings
      const { data, error } = await supabaseAdmin
        .from('settings')
        .update(settingsData)
        .eq('id', existingSettings.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
          { error: 'Failed to update settings' },
          { status: 500 }
        );
      }
      settings = data;
    } else {
      // Create new settings
      const { data, error } = await supabaseAdmin
        .from('settings')
        .insert([{
          ...settingsData,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating settings:', error);
        return NextResponse.json(
          { error: 'Failed to create settings' },
          { status: 500 }
        );
      }
      settings = data;
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Settings API error:', error);
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
