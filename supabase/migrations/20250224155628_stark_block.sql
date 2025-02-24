/*
  # Enhanced Recommendations and Events Schema

  1. New Tables
    - `alumni`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `department` (text)
      - `graduation_year` (integer)
      - `company` (text)
      - `role` (text)
      - `interests` (text[])
      - `linkedin_url` (text)
      - `image_url` (text)

    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (timestamptz)
      - `time` (text)
      - `location` (text)
      - `type` (text) -- 'internal' or 'external'
      - `organizer` (text)
      - `interests` (text[])
      - `registration_url` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create alumni table
CREATE TABLE IF NOT EXISTS alumni (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  department text NOT NULL,
  graduation_year integer NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  interests text[] DEFAULT '{}',
  linkedin_url text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('internal', 'external')),
  organizer text NOT NULL,
  interests text[] DEFAULT '{}',
  registration_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Alumni policies
CREATE POLICY "Anyone can read alumni"
  ON alumni FOR SELECT
  TO authenticated
  USING (true);

-- Events policies
CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample alumni data
INSERT INTO alumni (full_name, department, graduation_year, company, role, interests, linkedin_url, image_url) VALUES
('Sarah Johnson', 'Computer Science', 2022, 'Google', 'Software Engineer', ARRAY['web development', 'machine learning'], 'https://linkedin.com/in/sarah-johnson', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'),
('Michael Chen', 'Computer Science', 2021, 'Microsoft', 'ML Engineer', ARRAY['machine learning', 'AI'], 'https://linkedin.com/in/michael-chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'),
('Emily Rodriguez', 'Information Technology', 2022, 'Amazon', 'Full Stack Developer', ARRAY['web development', 'cloud computing'], 'https://linkedin.com/in/emily-rodriguez', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e'),
('David Kim', 'Computer Science', 2023, 'Meta', 'AI Researcher', ARRAY['AI', 'deep learning'], 'https://linkedin.com/in/david-kim', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5');

-- Insert sample events data
INSERT INTO events (title, description, date, time, location, type, organizer, interests, registration_url) VALUES
('AI/ML Workshop', 'Learn about the latest developments in AI and ML', '2025-03-15 09:00:00+00', '9:00 AM - 5:00 PM', 'Main Auditorium', 'internal', 'CSE Department', ARRAY['AI', 'machine learning'], 'https://example.com/ai-workshop'),
('Web Dev Bootcamp', 'Intensive web development training', '2025-03-20 10:00:00+00', '10:00 AM - 4:00 PM', 'Lab 101', 'internal', 'IEEE Student Branch', ARRAY['web development'], 'https://example.com/webdev-bootcamp'),
('Google Developer Day', 'Connect with Google engineers', '2025-04-01 09:00:00+00', '9:00 AM - 6:00 PM', 'Google Office, Chennai', 'external', 'Google', ARRAY['web development', 'cloud computing', 'AI'], 'https://example.com/google-dev-day'),
('Cybersecurity Summit', 'Learn about the latest in cybersecurity', '2025-04-10 10:00:00+00', '10:00 AM - 5:00 PM', 'Virtual', 'external', 'Microsoft', ARRAY['cybersecurity'], 'https://example.com/security-summit');