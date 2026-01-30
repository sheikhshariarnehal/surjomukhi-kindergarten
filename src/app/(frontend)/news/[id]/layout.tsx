import { Metadata } from 'next';
import { DatabaseService } from '@/lib/db';
import { News } from '@/types';

// File extensions that should not be treated as news IDs
const STATIC_FILE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|ico|pdf|mp4|mp3|wav|webm|avif)$/i;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    
    // Skip metadata generation for static file requests
    if (STATIC_FILE_EXTENSIONS.test(id)) {
      return {
        title: 'Resource Not Found',
        description: 'The requested resource could not be found.',
      };
    }

    const news = await DatabaseService.getById<News>('news', id);

    if (!news) {
      return {
        title: 'News Article Not Found',
        description: 'The requested news article could not be found.',
      };
    }

    return {
      title: `${news.title} - Surjomukhi Kindergarten News`,
      description: news.excerpt || news.content?.substring(0, 160) || 'Read the latest news from Surjomukhi Kindergarten.',
      keywords: ['school news', 'kindergarten news', 'education news', news.title],
      openGraph: {
        title: news.title,
        description: news.excerpt || news.content?.substring(0, 160) || 'Read the latest news from Surjomukhi Kindergarten.',
        type: 'article',
        publishedTime: news.publish_date,
        modifiedTime: news.updated_at,
        images: news.image_url ? [
          {
            url: news.image_url,
            width: 1200,
            height: 630,
            alt: news.title,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: news.title,
        description: news.excerpt || news.content?.substring(0, 160) || 'Read the latest news from Surjomukhi Kindergarten.',
        images: news.image_url ? [news.image_url] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for news:', error);
    return {
      title: 'News Article - Surjomukhi Kindergarten',
      description: 'Read the latest news from Surjomukhi Kindergarten.',
    };
  }
}

export default function NewsDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
