-- Drop existing table if it exists (start fresh)
DROP TABLE IF EXISTS public.guests CASCADE;

-- Create RSVP guests table with email as optional
CREATE TABLE public.guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  is_attending BOOLEAN NOT NULL DEFAULT false,
  family_members INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for name lookups
CREATE INDEX idx_guests_name ON public.guests(name);

-- Create index for attending guests
CREATE INDEX idx_guests_attending ON public.guests(is_attending);

-- Enable Row Level Security
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for RSVP form submissions)
CREATE POLICY "Allow public inserts" ON public.guests 
  FOR INSERT 
  WITH CHECK (true);

-- Allow public updates (for changing RSVP status)
CREATE POLICY "Allow public updates" ON public.guests 
  FOR UPDATE 
  USING (true);

-- Allow public reads (for admin view)
CREATE POLICY "Allow public reads" ON public.guests 
  FOR SELECT 
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_guests_updated_at
  BEFORE UPDATE ON public.guests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
