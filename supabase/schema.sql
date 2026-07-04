-- Phase 1: public property listings.
-- Mirrors the base44 "Property" entity (see GlobalEstate-Hub/base44/entities/Property.jsonc)
-- so existing data migrates over with minimal reshaping.
-- CRM entities (Client, Interaction, Commission, Reminder, RealEstateAgency, User roles)
-- are intentionally out of scope for phase 1 and will get their own migration later.

create extension if not exists "pgcrypto";

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  description_en text,
  country text not null,
  city text,
  address text,
  property_type text,
  status text not null default 'available',
  construction_phase text,
  price numeric not null,
  currency text not null default 'EUR',
  area_sqm numeric,
  bedrooms integer,
  bathrooms integer,
  images text[] not null default '{}',
  features text[] not null default '{}',
  latitude numeric,
  longitude numeric,
  project_name text,
  portal_links jsonb not null default '[]',
  assigned_agent text,
  commission_rate numeric,
  notes text,
  is_public boolean not null default true,
  is_featured boolean not null default false,
  investment_purpose text,
  developer text,
  available_units integer,
  company_commission numeric,
  referrer_commission numeric,
  slug text unique,
  brochure_url text,
  approval_status text not null default 'approved',
  owner_submitted boolean not null default false,
  original_language text,
  owner_name text,
  owner_email text,
  owner_phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_country_idx on properties (country);
create index if not exists properties_is_public_is_featured_idx on properties (is_public, is_featured);

alter table properties enable row level security;

-- Public (anon) visitors may only read listings explicitly marked public.
create policy "Public can read public properties"
  on properties for select
  using (is_public = true);

-- Writes go through the service role key (migration script, future admin panel) only.
