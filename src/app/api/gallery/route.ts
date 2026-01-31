import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, supabaseAdmin } from '@/lib/db';
import { AuthService } from '@/lib/auth';
import { createGalleryImageSchema, validateData } from '@/lib/validators';

// Unified image type for all sources
interface UnifiedImage {
  id: string;
  title: string;
  caption?: string;
  image_url: string;
  album: string;
  source: 'gallery' | 'event' | 'event_image' | 'news';
  created_at: string;
}

// GET /api/gallery - List all gallery items with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const album = searchParams.get('album') || '';
    const source = searchParams.get('source') || ''; // Filter by source: gallery, event, news, all

    const allImages: UnifiedImage[] = [];

    // 1. Fetch from gallery_images table
    if (!source || source === 'all' || source === 'gallery') {
      let galleryQuery = supabaseAdmin
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (search) {
        galleryQuery = galleryQuery.or(`title.ilike.%${search}%,caption.ilike.%${search}%`);
      }
      if (album && album !== 'all') {
        galleryQuery = galleryQuery.eq('album', album);
      }

      const { data: galleryItems } = await galleryQuery;
      
      if (galleryItems) {
        galleryItems.forEach(item => {
          if (item.image_url) {
            allImages.push({
              id: item.id,
              title: item.title || 'Gallery Image',
              caption: item.caption,
              image_url: item.image_url,
              album: item.album || 'Gallery',
              source: 'gallery',
              created_at: item.created_at,
            });
          }
        });
      }
    }

    // 2. Fetch from events table (main event images)
    if (!source || source === 'all' || source === 'event') {
      let eventsQuery = supabaseAdmin
        .from('events')
        .select('id, title, description, image_url, slug, created_at')
        .not('image_url', 'is', null)
        .order('created_at', { ascending: false });

      if (search) {
        eventsQuery = eventsQuery.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }
      if (album && album !== 'all' && album !== 'Events') {
        // Skip events if specific album is selected that's not Events
      } else {
        const { data: eventItems } = await eventsQuery;
        
        if (eventItems) {
          eventItems.forEach(item => {
            if (item.image_url) {
              allImages.push({
                id: `event-${item.id}`,
                title: item.title || 'Event Image',
                caption: item.description?.substring(0, 100),
                image_url: item.image_url,
                album: 'Events',
                source: 'event',
                created_at: item.created_at,
              });
            }
          });
        }
      }
    }

    // 3. Fetch from event_images table (additional event images)
    if (!source || source === 'all' || source === 'event') {
      let eventImagesQuery = supabaseAdmin
        .from('event_images')
        .select(`
          id, 
          url, 
          caption,
          created_at,
          events!inner (
            id,
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (search) {
        eventImagesQuery = eventImagesQuery.ilike('caption', `%${search}%`);
      }
      if (album && album !== 'all' && album !== 'Events') {
        // Skip event images if specific album is selected that's not Events
      } else {
        const { data: eventImageItems } = await eventImagesQuery;
        
        if (eventImageItems) {
          eventImageItems.forEach((item: any) => {
            if (item.url) {
              const eventTitle = item.events?.title || item.events?.[0]?.title || 'Event';
              allImages.push({
                id: `event-img-${item.id}`,
                title: item.caption || eventTitle,
                caption: item.caption,
                image_url: item.url,
                album: 'Events',
                source: 'event_image',
                created_at: item.created_at,
              });
            }
          });
        }
      }
    }

    // 4. Fetch from news table
    if (!source || source === 'all' || source === 'news') {
      let newsQuery = supabaseAdmin
        .from('news')
        .select('id, title, excerpt, image_url, created_at')
        .not('image_url', 'is', null)
        .order('created_at', { ascending: false });

      if (search) {
        newsQuery = newsQuery.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
      }
      if (album && album !== 'all' && album !== 'News') {
        // Skip news if specific album is selected that's not News
      } else {
        const { data: newsItems } = await newsQuery;
        
        if (newsItems) {
          newsItems.forEach(item => {
            if (item.image_url) {
              allImages.push({
                id: `news-${item.id}`,
                title: item.title || 'News Image',
                caption: item.excerpt?.substring(0, 100),
                image_url: item.image_url,
                album: 'News',
                source: 'news',
                created_at: item.created_at,
              });
            }
          });
        }
      }
    }

    // Sort all images by created_at (newest first)
    allImages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Apply pagination
    const total = allImages.length;
    const offset = (page - 1) * limit;
    const paginatedImages = allImages.slice(offset, offset + limit);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      images: paginatedImages,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/gallery - Create new gallery item
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

    // Check permissions (admin or editor can create gallery items)
    if (!AuthService.hasPermission(user.role, 'editor')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate request data
    const validation = validateData(createGalleryImageSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      );
    }

    const galleryData = {
      ...validation.data,
      created_at: new Date().toISOString(),
    };

    // Create gallery item
    const item = await DatabaseService.create('gallery_images', galleryData);

    return NextResponse.json({
      success: true,
      image: item,
    }, { status: 201 });
  } catch (error) {
    console.error('Create gallery item API error:', error);
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
