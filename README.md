# Globeya

Marketing site + property listings for Globeya, built with Vite + React. Not
tied to base44 — property data lives in Supabase.

## Develop

```
npm install
npm run dev
```

Without any Supabase config the site falls back to sample destinations
(`src/data/sampleProperties.js`) so it still renders out of the box.

## Connect Supabase

1. Create a free project at supabase.com.
2. Run `supabase/schema.sql` against it (SQL editor or `supabase db push`).
3. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` /
   `VITE_SUPABASE_ANON_KEY` from the project's API settings.

## Migrate existing listings from base44

Fill in the base44 and `SUPABASE_SERVICE_ROLE_KEY` values in `.env` (never
commit this file), then:

```
npm run migrate:base44
```

This pulls every `Property` record from the base44 backend and upserts it
into the Supabase `properties` table.

## Build

```
npm run build
```
