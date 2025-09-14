import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Surjomukhi Kindergarten - Excellence in Early Childhood Education',
    short_name: 'Surjomukhi KG',
    description: 'Premier early childhood education institution providing quality education and holistic child development programs in Bangladesh.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-US',
    categories: ['education', 'kindergarten', 'school'],
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Surjomukhi Kindergarten Homepage'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Surjomukhi Kindergarten Mobile View'
      }
    ],
    shortcuts: [
      {
        name: 'Admission',
        short_name: 'Admission',
        description: 'Apply for admission to Surjomukhi Kindergarten',
        url: '/admission',
        icons: [{ src: '/icon-admission.png', sizes: '96x96' }]
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Contact Surjomukhi Kindergarten',
        url: '/contact',
        icons: [{ src: '/icon-contact.png', sizes: '96x96' }]
      },
      {
        name: 'Teachers',
        short_name: 'Teachers',
        description: 'Meet our qualified teachers',
        url: '/teachers',
        icons: [{ src: '/icon-teachers.png', sizes: '96x96' }]
      },
      {
        name: 'News & Events',
        short_name: 'News',
        description: 'Latest news and upcoming events',
        url: '/news-events',
        icons: [{ src: '/icon-news.png', sizes: '96x96' }]
      }
    ]
  };
}
