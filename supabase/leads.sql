-- SimpleDiff Leads Table
-- Run this in your Supabase SQL editor to create the leads table with RLS enabled.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  project_type text,
  goal text,
  stage text,
  description text not null,
  source text not null,
  blueprint_summary text
);

-- Enable Row Level Security (RLS)
alter table public.leads enable row level security;

-- No public policies are created.
-- Access is restricted to the Supabase service_role key used on the server.
