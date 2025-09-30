import { Metadata } from 'next';
import { DatabaseService } from '@/lib/db';
import { Event } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const event = await DatabaseService.getById<Event>('events', id);

    if (!event) {
      return {
        title: 'Event Not Found',
        description: 'The requested event could not be found.',
      };
    }

    const eventDate = new Date(event.start_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return {
      title: `${event.title} - Surjomukhi Kindergarten Events`,
      description: event.description?.substring(0, 160) || `Join us for ${event.title} on ${eventDate}. Learn more about this exciting school event.`,
      keywords: ['school events', 'kindergarten events', 'education events', event.title, eventDate],
      openGraph: {
        title: event.title,
        description: event.description?.substring(0, 160) || `Join us for ${event.title} on ${eventDate}.`,
        type: 'article',
        publishedTime: event.created_at,
        modifiedTime: event.updated_at,
        images: event.image_url ? [
          {
            url: event.image_url,
            width: 1200,
            height: 630,
            alt: event.title,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: event.title,
        description: event.description?.substring(0, 160) || `Join us for ${event.title} on ${eventDate}.`,
        images: event.image_url ? [event.image_url] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for event:', error);
    return {
      title: 'Event Details - Surjomukhi Kindergarten',
      description: 'Learn more about upcoming events at Surjomukhi Kindergarten.',
    };
  }
}

export default function EventDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
