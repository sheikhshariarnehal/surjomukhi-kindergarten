'use client';

import { Event } from '@/types/event';

interface EventStructuredDataProps {
  event: Event;
  language?: 'en' | 'bn';
}

export default function EventStructuredData({ event, language = 'en' }: EventStructuredDataProps) {
  const title = language === 'bn' && event.title_bn ? event.title_bn : event.title;
  const description = language === 'bn' && event.description_bn ? event.description_bn : event.description;
  const location = language === 'bn' && event.location_bn ? event.location_bn : event.location;
  const organizer = language === 'bn' && event.organizer_bn ? event.organizer_bn : event.organizer;

  // Get primary image or fallback
  const imageUrl = event.images?.find(img => img.is_primary)?.url || 
                   event.images?.[0]?.url || 
                   event.image_url || 
                   'https://surjomukhikindergarten.edu.bd/og-home.jpg';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    description: description,
    startDate: event.start_date,
    endDate: event.end_date || event.start_date,
    eventStatus: 
      event.status === 'cancelled' ? 'https://schema.org/EventCancelled' :
      event.status === 'completed' ? 'https://schema.org/EventScheduled' :
      'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [imageUrl],
    location: {
      '@type': 'Place',
      name: location || 'Surjomukhi Kindergarten',
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue || 'Surjomukhi Kindergarten Campus',
        addressLocality: 'Dhaka',
        addressCountry: 'BD'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: organizer || 'Surjomukhi Kindergarten',
      url: 'https://surjomukhikindergarten.edu.bd'
    },
    ...(event.max_participants && {
      maximumAttendeeCapacity: event.max_participants
    }),
    ...(event.registration_url && {
      url: event.registration_url
    }),
    offers: event.registration_url ? {
      '@type': 'Offer',
      url: event.registration_url,
      price: '0',
      priceCurrency: 'BDT',
      availability: 'https://schema.org/InStock',
      validFrom: event.created_at
    } : undefined,
    performer: {
      '@type': 'Organization',
      name: 'Surjomukhi Kindergarten Students & Staff'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
