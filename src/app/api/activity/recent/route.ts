import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get recent activities from different tables
    const activities: Array<{
      id: string;
      type: string;
      title: string;
      description: string;
      created_at: string;
      icon: string;
    }> = [];

    // Recent notices
    const { data: notices } = await supabaseAdmin
      .from('notices')
      .select('id, title, created_at')
      .order('created_at', { ascending: false })
      .limit(3);

    if (notices) {
      notices.forEach(notice => {
        activities.push({
          id: `notice-${notice.id}`,
          type: 'notice',
          title: notice.title,
          description: 'New notice published',
          created_at: notice.created_at,
          icon: 'FileText',
        });
      });
    }

    // Recent news
    const { data: news } = await supabaseAdmin
      .from('news')
      .select('id, title, created_at')
      .order('created_at', { ascending: false })
      .limit(2);

    if (news) {
      news.forEach(newsItem => {
        activities.push({
          id: `news-${newsItem.id}`,
          type: 'news',
          title: newsItem.title,
          description: 'New news article published',
          created_at: newsItem.created_at,
          icon: 'Newspaper',
        });
      });
    }

    // Recent events
    const { data: events } = await supabaseAdmin
      .from('events')
      .select('id, title, created_at')
      .order('created_at', { ascending: false })
      .limit(2);

    if (events) {
      events.forEach(event => {
        activities.push({
          id: `event-${event.id}`,
          type: 'event',
          title: event.title,
          description: 'New event created',
          created_at: event.created_at,
          icon: 'Calendar',
        });
      });
    }

    // Sort all activities by created_at
    activities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Return top 5 activities
    const recentActivities = activities.slice(0, 5);

    return NextResponse.json({
      activities: recentActivities,
    });
  } catch (error) {
    console.error('Recent activity API error:', error);
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
