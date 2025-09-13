-- Migration: Add event_images table for multiple event photos
-- Run this in your Supabase SQL Editor

-- Create event_images table
CREATE TABLE IF NOT EXISTS event_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_images_event_id ON event_images(event_id);
CREATE INDEX IF NOT EXISTS idx_event_images_is_primary ON event_images(is_primary);
CREATE INDEX IF NOT EXISTS idx_event_images_display_order ON event_images(display_order);

-- Enable Row Level Security
ALTER TABLE event_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for event_images
CREATE POLICY "Allow public read access to event images" ON event_images
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert event images" ON event_images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update event images" ON event_images
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete event images" ON event_images
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_event_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_event_images_updated_at
  BEFORE UPDATE ON event_images
  FOR EACH ROW
  EXECUTE FUNCTION update_event_images_updated_at();

-- Function to ensure only one primary image per event
CREATE OR REPLACE FUNCTION ensure_single_primary_image()
RETURNS TRIGGER AS $$
BEGIN
  -- If setting this image as primary, unset all other primary images for this event
  IF NEW.is_primary = TRUE THEN
    UPDATE event_images 
    SET is_primary = FALSE 
    WHERE event_id = NEW.event_id AND id != NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to ensure single primary image
CREATE TRIGGER ensure_single_primary_image_trigger
  BEFORE INSERT OR UPDATE ON event_images
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_primary_image();

-- Insert sample data (optional)
-- Uncomment the following lines if you want to add sample event images

/*
-- First, let's get some event IDs (assuming you have events in your events table)
DO $$
DECLARE
  sample_event_id UUID;
BEGIN
  -- Get the first event ID
  SELECT id INTO sample_event_id FROM events LIMIT 1;
  
  -- Insert sample images if we have an event
  IF sample_event_id IS NOT NULL THEN
    INSERT INTO event_images (event_id, url, caption, is_primary, display_order) VALUES
    (sample_event_id, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 'Main event photo', true, 1),
    (sample_event_id, 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', 'Event setup', false, 2),
    (sample_event_id, 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', 'Participants', false, 3);
  END IF;
END $$;
*/

-- Add comment to the table
COMMENT ON TABLE event_images IS 'Stores multiple images for events with support for captions and primary image designation';
COMMENT ON COLUMN event_images.event_id IS 'Foreign key reference to the events table';
COMMENT ON COLUMN event_images.url IS 'URL of the uploaded image';
COMMENT ON COLUMN event_images.caption IS 'Optional caption for the image';
COMMENT ON COLUMN event_images.is_primary IS 'Indicates if this is the primary/featured image for the event';
COMMENT ON COLUMN event_images.display_order IS 'Order in which images should be displayed';
