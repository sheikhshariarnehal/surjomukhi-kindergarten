# Events Feature - Quick Reference Guide

## 🎯 Quick Links
- **Events Page**: `/events`
- **Event Detail**: `/events/[slug]/[id]`
- **Admin Dashboard**: `/dashboard/events`
- **API Endpoint**: `/api/events`

## 📊 Sample Events Created

### Featured Events (4)
1. **Annual Sports Day 2026**
   - Category: Sports
   - Date: Dec 15, 2026
   - Max Participants: 500
   - Tags: sports, athletics, outdoor, competition

2. **Cultural Program & Dance Festival 2026**
   - Category: Cultural
   - Date: Nov 25, 2026
   - Max Participants: 300
   - Tags: cultural, dance, music, drama

3. **Science Fair 2026**
   - Category: Academic
   - Date: Oct 20-21, 2026
   - Tags: science, education, STEM

4. **Art Exhibition - Little Artists 2026**
   - Category: Cultural
   - Date: Mar 15-20, 2027
   - Tags: art, exhibition, creative

### Regular Events (1)
5. **Parent-Teacher Conference 2026**
   - Category: Meeting
   - Date: Sep 10-11, 2026
   - Tags: parent-meeting, academic

## 🔧 Key Features Implemented

### Database Enhancements
✅ Bilingual fields (English & Bengali)
✅ SEO meta fields (title, description)
✅ Location & venue fields
✅ Registration & participant tracking
✅ Category & tag system
✅ Featured event flag
✅ Status management (upcoming, ongoing, completed, cancelled)

### SEO Optimizations
✅ Schema.org structured data
✅ Open Graph tags
✅ Twitter Cards
✅ Meta descriptions (150-160 chars)
✅ SEO-friendly URLs
✅ Image optimization
✅ Sitemap integration

### Frontend Features
✅ Events listing with filters
✅ Category-based filtering
✅ Search functionality
✅ Event detail page with gallery
✅ Share buttons (Facebook, Twitter, WhatsApp, LinkedIn)
✅ Print functionality
✅ Responsive design

## 🚀 How to Use

### View Events
```bash
# Public page
https://yoursite.com/events

# Specific event
https://yoursite.com/events/annual-sports-day-2026/[id]
```

### Admin: Create Event
1. Go to `/dashboard/events`
2. Click "Add New Event"
3. Fill in required fields:
   - Title (English & Bengali)
   - Description (English & Bengali)
   - Start/End Date
   - Category
   - Location & Venue
   - Tags
4. Upload images
5. Save

### Admin: Manage Events
- **Edit**: Click event → Edit button
- **Delete**: Click event → Delete button
- **Add Images**: Event detail → Upload images
- **Feature**: Toggle featured flag
- **Change Status**: Update status field

## 📝 Event Categories

```typescript
'academic'     // Science fairs, competitions
'sports'       // Sports day, athletics
'cultural'     // Dance, music, art shows
'social'       // Community events
'competition'  // Inter-school competitions
'meeting'      // Parent-teacher meetings
'ceremony'     // Award ceremonies
'general'      // Other events
```

## 🎨 Status Types

```typescript
'upcoming'   // Future events (default)
'ongoing'    // Currently happening
'completed'  // Past events
'cancelled'  // Cancelled events
```

## 🔍 SEO Best Practices

### Meta Title Format
`[Event Name] - [Year] | Surjomukhi Kindergarten`

Example: `Annual Sports Day 2026 | Surjomukhi Kindergarten`

### Meta Description Format
`[Action] [Event Name]. [Key details]. [Call to action]`

Example: `Join Surjomukhi Kindergarten Annual Sports Day 2026. Track events, team games, relay races for all students. Parents welcome!`

### URL Structure
`/events/[slug]/[id]`
- Slug: SEO-friendly event name
- ID: Unique identifier

## 🖼️ Gallery Integration

### Event Images
- Multiple images per event
- Primary image designation
- Display order control
- Caption support
- Full-screen modal view

### Image Requirements
- Format: WebP (preferred) or JPG/PNG
- Size: Max 2MB
- Dimensions: 1200x630px (recommended for OG images)
- Alt text: Always include

## 📊 Database Queries

### Get Featured Events
```sql
SELECT * FROM events 
WHERE featured = true AND status = 'upcoming'
ORDER BY start_date ASC;
```

### Get Events by Category
```sql
SELECT * FROM events 
WHERE category = 'sports' AND status = 'upcoming'
ORDER BY start_date ASC;
```

### Search Events
```sql
SELECT * FROM events 
WHERE 
  title ILIKE '%sports%' OR 
  description ILIKE '%sports%' OR
  tags @> ARRAY['sports']
ORDER BY start_date DESC;
```

## 🌐 API Usage

### List Events
```bash
GET /api/events?page=1&limit=10&category=sports&search=annual
```

### Get Single Event
```bash
GET /api/events/[id]
```

### Create Event (Auth Required)
```bash
POST /api/events
Content-Type: application/json

{
  "title": "New Event",
  "title_bn": "নতুন ইভেন্ট",
  "description": "Event description",
  "start_date": "2026-12-01T10:00:00Z",
  "category": "sports",
  "featured": true,
  "tags": ["sports", "outdoor"]
}
```

## 🔐 Permissions

| Action | Superadmin | Admin | Editor |
|--------|-----------|-------|--------|
| View Events | ✅ | ✅ | ✅ |
| Create Event | ✅ | ✅ | ✅ |
| Edit Event | ✅ | ✅ | ✅ |
| Delete Event | ✅ | ✅ | ❌ |
| Feature Event | ✅ | ✅ | ❌ |

## 📈 Performance Tips

1. **Pagination**: Always use pagination for event lists
2. **Indexing**: Database indexes are already created
3. **Image Optimization**: Use Next.js Image component
4. **Caching**: Consider implementing Redis cache
5. **Lazy Loading**: Images load on demand

## 🐛 Troubleshooting

### Events Not Showing
- Check event status (must be 'upcoming' or 'ongoing')
- Verify start_date is in the future
- Check if event is published

### Images Not Loading
- Verify Supabase storage permissions
- Check image URL format
- Ensure image exists in storage

### SEO Not Working
- Validate structured data: https://search.google.com/test/rich-results
- Check meta tags in browser inspector
- Verify sitemap includes events

## 📞 Support

For issues or questions:
- **Email**: info@surjomukhikindergarten.edu.bd
- **Phone**: +880-1234-567890
- **Documentation**: `/docs/EVENTS_SEO_IMPLEMENTATION.md`

## ✅ Testing Checklist

- [ ] Create new event
- [ ] View event on public page
- [ ] Edit event details
- [ ] Upload event images
- [ ] Test bilingual content
- [ ] Verify SEO meta tags
- [ ] Check structured data
- [ ] Test share buttons
- [ ] Verify responsive design
- [ ] Test search & filters
- [ ] Check event categories
- [ ] Verify print functionality

---

**Last Updated**: January 31, 2026
**Version**: 1.0
