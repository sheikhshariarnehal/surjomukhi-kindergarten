# Events Admin UI Enhancement

## Overview
Enhanced the Events Create and Edit pages in the admin dashboard with a modern tabbed interface, bilingual support, category selection, tags management, and SEO optimization fields.

## Changes Made

### 1. Create Event Page (`/dashboard/events/create`)

#### New Features:
- **Tabbed Navigation**: Organized into 4 tabs:
  - **Basic Info**: Title, description, category, tags, featured toggle, image upload
  - **বাংলা Content**: Bengali translations for title, description, organizer, venue
  - **Location & Contact**: Address, venue, contact email/phone, registration URL, max attendees, status
  - **SEO Settings**: Meta title, meta description, keywords with character counters and live preview

- **Category Selection**: Visual grid with 8 categories:
  - Academic (📚), Sports (⚽), Cultural (🎭), Social (🤝)
  - Competition (🏆), Meeting (👥), Ceremony (🎉), General (📌)

- **Tags Management**: 
  - Pre-defined common tags (family-event, outdoor, indoor, etc.)
  - Custom tag input

- **Featured Event Toggle**: Yellow highlight toggle with Star icon

- **Live Preview Panel**: Shows title, category, dates, tags, and image count

- **Success Toast**: Animated success message with redirect

### 2. Edit Event Page (`/dashboard/events/[id]/edit`)

#### Same features as Create page plus:
- Pre-populated form fields from existing event data
- Loads existing tags and category
- Event info card showing creation/update dates and ID
- Success message on update

### 3. Validator Schema Updates (`src/lib/validators.ts`)

#### New Fields Added:
```typescript
// Bilingual
title_bn, description_bn, venue_bn, organizer_bn

// Location & Contact  
location, location_bn, venue, contact_email, contact_phone

// Registration
registration_url, max_attendees

// Categorization
category: 'academic' | 'sports' | 'cultural' | 'social' | 'competition' | 'meeting' | 'ceremony' | 'general'
status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'postponed'
featured: boolean
tags: string[]

// SEO
meta_title, meta_description, keywords
```

### 4. Event Type Updates (`src/types/event.ts`)

Added `max_attendees` and `keywords` fields to the Event interface.

### 5. API Route Updates

Updated `src/app/api/events/route.ts` and `src/app/api/events/[id]/route.ts` to handle the new fields with proper type assertions.

## UI Components Used

- **Tabs**: Custom tab navigation with icons
- **Category Grid**: Radio button cards with emojis
- **Tag Pills**: Toggle buttons for tag selection
- **Feature Toggle**: iOS-style switch for featured events
- **Character Counters**: For SEO fields (60 for title, 160 for description)
- **SEO Preview**: Google search result preview

## File Changes

| File | Changes |
|------|---------|
| `src/app/(admin)/dashboard/events/create/page.tsx` | Major rewrite with tabbed UI |
| `src/app/(admin)/dashboard/events/[id]/edit/page.tsx` | Major rewrite with tabbed UI |
| `src/lib/validators.ts` | Added 20+ new optional fields |
| `src/types/event.ts` | Added `max_attendees`, `keywords` |
| `src/app/api/events/route.ts` | Type assertion for max_attendees |
| `src/app/api/events/[id]/route.ts` | Type assertion for max_attendees |

## Database Fields Required

Make sure these columns exist in the `events` table:
- `title_bn`, `description_bn` (TEXT)
- `location`, `location_bn`, `venue`, `venue_bn` (TEXT)
- `organizer`, `organizer_bn` (TEXT)
- `contact_email`, `contact_phone` (TEXT)
- `registration_url` (TEXT)
- `max_attendees` (INTEGER)
- `category` (TEXT)
- `status` (TEXT)
- `featured` (BOOLEAN)
- `tags` (JSONB/TEXT[])
- `meta_title`, `meta_description`, `keywords` (TEXT)

## Testing

1. Navigate to `/dashboard/events/create`
2. Switch between tabs to verify navigation
3. Select a category and verify visual feedback
4. Add/remove tags and verify state
5. Toggle featured event
6. Fill SEO fields and verify character counters
7. Submit form and verify success message
8. Edit an existing event and verify pre-populated fields

## Build Status

✅ Build successful with no errors related to event pages.
