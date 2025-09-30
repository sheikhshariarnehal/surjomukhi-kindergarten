import { Metadata } from 'next';
import { DatabaseService } from '@/lib/db';
import { News } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
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
