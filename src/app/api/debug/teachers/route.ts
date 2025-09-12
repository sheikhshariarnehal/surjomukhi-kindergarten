import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';

export async function GET() {
  try {
    // Get all teachers
    const { data: teachers, error, count } = await supabaseAdmin
      .from('teachers')
      .select('*', { count: 'exact' });

    if (error) {
      console.error('Error fetching teachers:', error);
      return NextResponse.json({
        error: 'Database error',
        details: error,
      });
    }

    return NextResponse.json({
      success: true,
      count: count || 0,
      teachers: teachers || [],
      message: `Found ${count || 0} teachers in database`,
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      error: 'Server error',
      details: error,
    });
  }
}

export async function POST() {
  try {
    // Insert sample teachers
    const sampleTeachers = [
      {
        name: 'Dr. Sarah Johnson',
        designation: 'Head of Mathematics Department',
        bio: 'Dr. Sarah Johnson has over 15 years of experience in mathematics education.',
        subjects: ['Mathematics', 'Statistics', 'Calculus'],
        join_date: '2018-08-15',
        photo_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      },
      {
        name: 'Prof. Ahmed Hassan',
        designation: 'Senior Physics Teacher',
        bio: 'Professor Ahmed Hassan is a dedicated physics educator.',
        subjects: ['Physics', 'Chemistry', 'Science'],
        join_date: '2019-01-20',
        photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      },
      {
        name: 'Ms. Rashida Begum',
        designation: 'English Literature Teacher',
        bio: 'Ms. Rashida Begum brings creativity and enthusiasm to English literature classes.',
        subjects: ['English', 'Literature', 'Creative Writing'],
        join_date: '2020-03-10',
        photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      },
    ];

    const { data, error } = await supabaseAdmin
      .from('teachers')
      .insert(sampleTeachers)
      .select();

    if (error) {
      console.error('Error inserting teachers:', error);
      return NextResponse.json({
        error: 'Failed to insert teachers',
        details: error,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${data.length} teachers`,
      teachers: data,
    });
  } catch (error) {
    console.error('Debug POST error:', error);
    return NextResponse.json({
      error: 'Server error',
      details: error,
    });
  }
}
