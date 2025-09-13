-- Database Setup Script for Surjomukhi Kindergarten
-- Run this script in your Supabase SQL Editor to set up the database

-- Enable Row Level Security
ALTER TABLE IF EXISTS teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS news ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Public read access for teachers" ON teachers FOR SELECT USING (true);
CREATE POLICY "Public read access for notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Public read access for news" ON news FOR SELECT USING (true);
CREATE POLICY "Public read access for events" ON events FOR SELECT USING (true);

-- Create admin policies for write access
CREATE POLICY "Admin write access for teachers" ON teachers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for notices" ON notices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for news" ON news FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for events" ON events FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data if tables are empty
INSERT INTO teachers (id, name, designation, bio, photo_url, subjects, join_date, slug, department, experience_years, created_at, updated_at)
SELECT * FROM (VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Mrs. Salma Khatun', 'Head Teacher', 'Mrs. Salma Khatun is a passionate educator with over 15 years of experience in early childhood education.', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80', ARRAY['Curriculum Development', 'Child Psychology', 'Leadership'], '2009-01-15', 'mrs-salma-khatun', 'General Education', 15, NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'Mr. Ahmed Hassan', 'Senior Mathematics Teacher', 'Mr. Ahmed Hassan brings creativity and innovation to mathematics education.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80', ARRAY['Mathematics', 'Problem Solving', 'Logic Games'], '2012-03-20', 'mr-ahmed-hassan', 'Mathematics', 12, NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Dr. Sarah Johnson', 'Head of Mathematics Department', 'Dr. Sarah Johnson is our esteemed Head Teacher with over 15 years of experience.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face&auto=format&q=80', ARRAY['Mathematics', 'Statistics', 'Calculus'], '2010-01-15', 'dr-sarah-johnson', 'Mathematics', 15, NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', 'Ms. Fatima Rahman', 'Science Department Head', 'Ms. Fatima Rahman leads our Science Department with expertise in Physics and Chemistry.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face&auto=format&q=80', ARRAY['Physics', 'Chemistry', 'Environmental Science'], '2014-08-10', 'ms-fatima-rahman', 'Science', 9, NOW(), NOW())
) AS t(id, name, designation, bio, photo_url, subjects, join_date, slug, department, experience_years, created_at, updated_at)
WHERE NOT EXISTS (SELECT 1 FROM teachers WHERE teachers.id = t.id);

-- Insert sample notices
INSERT INTO notices (id, title, content, priority, published_date, expiry_date, created_at, updated_at)
SELECT * FROM (VALUES
  (gen_random_uuid(), 'Welcome to New Academic Year 2024', 'We are excited to welcome all students and parents to the new academic year. Classes will begin on January 15th, 2024.', 'high', '2024-01-01', '2024-02-01', NOW(), NOW()),
  (gen_random_uuid(), 'Parent-Teacher Meeting', 'Monthly parent-teacher meeting scheduled for January 25th, 2024 from 10:00 AM to 2:00 PM.', 'medium', '2024-01-10', '2024-01-26', NOW(), NOW()),
  (gen_random_uuid(), 'School Holiday Notice', 'School will remain closed on January 26th, 2024 for Republic Day celebration.', 'low', '2024-01-20', '2024-01-27', NOW(), NOW())
) AS t(id, title, content, priority, published_date, expiry_date, created_at, updated_at)
WHERE NOT EXISTS (SELECT 1 FROM notices LIMIT 1);

-- Insert sample news
INSERT INTO news (id, title, content, excerpt, featured_image, published_date, author, slug, created_at, updated_at)
SELECT * FROM (VALUES
  (gen_random_uuid(), 'Annual Sports Day Celebration', 'Our kindergarten celebrated its annual sports day with great enthusiasm. Children participated in various fun activities and games.', 'Annual sports day was a huge success with active participation from all students.', '/news/sports-day.jpg', '2024-01-15', 'Admin', 'annual-sports-day-celebration', NOW(), NOW()),
  (gen_random_uuid(), 'Art Exhibition by Young Artists', 'Students showcased their creativity in our monthly art exhibition. The display featured paintings, crafts, and creative projects.', 'Young artists displayed their amazing creativity in the monthly art exhibition.', '/news/art-exhibition.jpg', '2024-01-10', 'Admin', 'art-exhibition-young-artists', NOW(), NOW())
) AS t(id, title, content, excerpt, featured_image, published_date, author, slug, created_at, updated_at)
WHERE NOT EXISTS (SELECT 1 FROM news LIMIT 1);

-- Insert sample events
INSERT INTO events (id, title, description, event_date, event_time, location, event_type, registration_required, max_participants, created_at, updated_at)
SELECT * FROM (VALUES
  (gen_random_uuid(), 'Science Fair 2024', 'Annual science fair where students will present their science projects and experiments.', '2024-02-15', '10:00:00', 'School Auditorium', 'academic', true, 100, NOW(), NOW()),
  (gen_random_uuid(), 'Cultural Program', 'Monthly cultural program featuring dance, music, and drama performances by students.', '2024-02-20', '15:00:00', 'School Hall', 'cultural', false, 200, NOW(), NOW())
) AS t(id, title, description, event_date, event_time, location, event_type, registration_required, max_participants, created_at, updated_at)
WHERE NOT EXISTS (SELECT 1 FROM events LIMIT 1);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_teachers_department ON teachers(department);
CREATE INDEX IF NOT EXISTS idx_teachers_slug ON teachers(slug);
CREATE INDEX IF NOT EXISTS idx_notices_priority ON notices(priority);
CREATE INDEX IF NOT EXISTS idx_notices_published_date ON notices(published_date);
CREATE INDEX IF NOT EXISTS idx_news_published_date ON news(published_date);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);

-- Enable real-time subscriptions (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE teachers;
ALTER PUBLICATION supabase_realtime ADD TABLE notices;
ALTER PUBLICATION supabase_realtime ADD TABLE news;
ALTER PUBLICATION supabase_realtime ADD TABLE events;
