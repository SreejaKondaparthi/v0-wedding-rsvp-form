-- Make email column optional since we removed it from the form
ALTER TABLE public.guests ALTER COLUMN email DROP NOT NULL;

-- Drop the unique constraint on email
ALTER TABLE public.guests DROP CONSTRAINT IF EXISTS guests_email_key;

-- Drop the email index
DROP INDEX IF EXISTS idx_guests_email;

-- Create index on name instead for lookups
CREATE INDEX IF NOT EXISTS idx_guests_name ON public.guests(name);
