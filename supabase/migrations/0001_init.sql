create extension if not exists pgcrypto;

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('solution','hardware')),
  priority int not null,
  title text not null,
  tagline text not null,
  summary text not null,
  description text not null default '',
  icon text not null,                       -- key into ui/Icon.tsx
  features jsonb not null default '[]',     -- [{title, body}]
  process jsonb not null default '[]',      -- [{title, body}]
  deliverables text[] not null default '{}',
  faqs jsonb not null default '[]',         -- [{q, a}]
  industries text[] not null default '{}',
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  sector text not null,
  logo_url text,
  website_url text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact','audit','quote')),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  phone text check (char_length(phone) <= 40),
  company text check (char_length(company) <= 160),
  service_slugs text[] not null default '{}',
  message text check (char_length(message) <= 4000),
  details jsonb not null default '{}',
  source_path text check (char_length(source_path) <= 300),
  status text not null default 'new' check (status in ('new','in_progress','closed')),
  created_at timestamptz not null default now()
);

-- updated_at trigger on services
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;
create trigger services_touch before update on public.services
for each row execute function public.touch_updated_at();

create index services_category_priority on public.services (category, priority);
create index inquiries_created on public.inquiries (created_at desc);

-- RLS
alter table public.services  enable row level security;
alter table public.clients   enable row level security;
alter table public.inquiries enable row level security;

create policy "public read published services" on public.services
  for select to anon, authenticated using (is_published);
create policy "public read published clients" on public.clients
  for select to anon, authenticated using (is_published);
create policy "anyone can submit an inquiry" on public.inquiries
  for insert to anon, authenticated
  with check (status = 'new');
-- no select/update/delete policies on inquiries for anon: submissions are write-only.
-- Staff read them in the Supabase dashboard (Table Editor).

-- Storage: public bucket for client logos
insert into storage.buckets (id, name, public) values ('logos','logos', true)
on conflict (id) do nothing;
create policy "public read logos" on storage.objects
  for select to anon, authenticated using (bucket_id = 'logos');
