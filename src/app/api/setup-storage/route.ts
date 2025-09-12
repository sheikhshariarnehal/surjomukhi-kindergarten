import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';

export async function POST() {
  try {
    console.log('Setting up Supabase storage buckets...');

    // List of buckets to create
    const bucketsToCreate = [
      {
        id: 'uploads',
        name: 'uploads',
        public: true,
        file_size_limit: 10485760, // 10MB
        allowed_mime_types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
      },
      {
        id: 'teachers',
        name: 'teachers',
        public: true,
        file_size_limit: 5242880, // 5MB
        allowed_mime_types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      },
      {
        id: 'news',
        name: 'news',
        public: true,
        file_size_limit: 10485760, // 10MB
        allowed_mime_types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      },
      {
        id: 'events',
        name: 'events',
        public: true,
        file_size_limit: 10485760, // 10MB
        allowed_mime_types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      },
      {
        id: 'gallery',
        name: 'gallery',
        public: true,
        file_size_limit: 10485760, // 10MB
        allowed_mime_types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm']
      }
    ];

    const results = [];

    for (const bucketConfig of bucketsToCreate) {
      try {
        // Check if bucket already exists
        const { data: existingBuckets, error: listError } = await supabaseAdmin.storage.listBuckets();
        
        if (listError) {
          console.error('Error listing buckets:', listError);
          results.push({
            bucket: bucketConfig.id,
            status: 'error',
            message: `Failed to list buckets: ${listError.message}`
          });
          continue;
        }

        const bucketExists = existingBuckets?.some(bucket => bucket.id === bucketConfig.id);

        if (bucketExists) {
          results.push({
            bucket: bucketConfig.id,
            status: 'exists',
            message: 'Bucket already exists'
          });
          continue;
        }

        // Create the bucket
        const { data, error } = await supabaseAdmin.storage.createBucket(bucketConfig.id, {
          public: bucketConfig.public,
          fileSizeLimit: bucketConfig.file_size_limit,
          allowedMimeTypes: bucketConfig.allowed_mime_types
        });

        if (error) {
          console.error(`Error creating bucket ${bucketConfig.id}:`, error);
          results.push({
            bucket: bucketConfig.id,
            status: 'error',
            message: error.message
          });
        } else {
          console.log(`Successfully created bucket: ${bucketConfig.id}`);
          results.push({
            bucket: bucketConfig.id,
            status: 'created',
            message: 'Bucket created successfully',
            data
          });
        }
      } catch (error) {
        console.error(`Error processing bucket ${bucketConfig.id}:`, error);
        results.push({
          bucket: bucketConfig.id,
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Storage setup completed',
      results
    });

  } catch (error) {
    console.error('Storage setup error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to setup storage',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // List existing buckets
    const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to list buckets', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      buckets: buckets || [],
      count: buckets?.length || 0
    });

  } catch (error) {
    console.error('List buckets error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to list buckets',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
