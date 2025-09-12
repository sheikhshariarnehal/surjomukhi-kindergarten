import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';

export async function GET() {
  try {
    // Get all events from database
    const { data: events, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json({
        error: 'Failed to fetch events',
        details: error,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Found ${events?.length || 0} events`,
      events: events || [],
    });
  } catch (error) {
    console.error('Debug events API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error,
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Create sample events with future dates
    const now = new Date();
    const sampleEvents = [
      {
        title: 'Annual Sports Day',
        description: 'Join us for our annual sports day featuring various competitions, games, and fun activities for all students. Parents and families are welcome to attend and cheer for their children.',
        start_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        end_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(), // 8 hours later
        image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      },
      {
        title: 'Science Fair 2024',
        description: 'Students will showcase their innovative science projects and experiments. Come and witness the creativity and scientific thinking of our young minds.',
        start_date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        end_date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(), // 6 hours later
        image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      },
      {
        title: 'Cultural Program',
        description: 'A vibrant cultural program featuring dance, music, drama, and poetry performances by our talented students. Experience the rich cultural heritage through our performances.',
        start_date: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
        end_date: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(), // 4 hours later
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      },
      {
        title: 'Parent-Teacher Meeting',
        description: 'Important meeting for parents to discuss their children\'s academic progress, behavior, and development with teachers. Individual consultation sessions available.',
        start_date: new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000).toISOString(), // 28 days from now
        end_date: new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(), // 5 hours later
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      },
      {
        title: 'Art Exhibition',
        description: 'Display of creative artwork, paintings, and crafts made by our students throughout the academic year. Come and appreciate the artistic talents of our children.',
        start_date: new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days from now
        end_date: new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000).toISOString(), // 7 hours later
        image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      },
    ];

    const { data, error } = await supabaseAdmin
      .from('events')
      .insert(sampleEvents)
      .select();

    if (error) {
      console.error('Error inserting events:', error);
      return NextResponse.json({
        error: 'Failed to insert events',
        details: error,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${data.length} events`,
      events: data,
    });
  } catch (error) {
    console.error('Debug events API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error,
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // Delete all events
    const { error } = await supabaseAdmin
      .from('events')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (error) {
      console.error('Error deleting events:', error);
      return NextResponse.json({
        error: 'Failed to delete events',
        details: error,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully deleted all events',
    });
  } catch (error) {
    console.error('Debug events API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error,
    }, { status: 500 });
  }
}
