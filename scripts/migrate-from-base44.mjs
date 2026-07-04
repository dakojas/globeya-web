// One-off migration: pulls Property records out of the base44 backend and
// upserts them into Supabase (supabase/schema.sql). Run locally once you have
// both sets of credentials filled in a local .env (see .env.example):
//
//   npm run migrate:base44
//
// Never commit the real .env — it holds a Supabase service role key and a
// base44 access token.
import { createClient as createBase44Client } from '@base44/sdk';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var ${name}. See .env.example.`);
    process.exit(1);
  }
  return value;
}

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a').replace(/[éèëê]/g, 'e').replace(/[íìïî]/g, 'i')
    .replace(/[óòöôõ]/g, 'o').replace(/[úùüû]/g, 'u').replace(/[ýÿ]/g, 'y')
    .replace(/[čć]/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z').replace(/ň/g, 'n')
    .replace(/[ľĺ]/g, 'l').replace(/ř/g, 'r').replace(/ď/g, 'd').replace(/ť/g, 't')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function toPropertyRow(record) {
  const slug = record.slug || `${slugify(record.title)}-${record.id.slice(-6)}`;
  return {
    id: record.id,
    title: record.title,
    description: record.description ?? null,
    description_en: record.description_en ?? null,
    country: record.country,
    city: record.city ?? null,
    address: record.address ?? null,
    property_type: record.property_type ?? null,
    status: record.status ?? 'available',
    construction_phase: record.construction_phase ?? null,
    price: record.price,
    currency: record.currency ?? 'EUR',
    area_sqm: record.area_sqm ?? null,
    bedrooms: record.bedrooms ?? null,
    bathrooms: record.bathrooms ?? null,
    images: record.images ?? [],
    features: record.features ?? [],
    latitude: record.latitude ?? null,
    longitude: record.longitude ?? null,
    project_name: record.project_name ?? null,
    portal_links: record.portal_links ?? [],
    assigned_agent: record.assigned_agent ?? null,
    commission_rate: record.commission_rate ?? null,
    notes: record.notes ?? null,
    is_public: record.is_public ?? true,
    is_featured: record.is_featured ?? false,
    investment_purpose: record.investment_purpose ?? null,
    developer: record.developer ?? null,
    available_units: record.available_units ?? null,
    company_commission: record.company_commission ?? null,
    referrer_commission: record.referrer_commission ?? null,
    slug,
    brochure_url: record.brochure_url ?? null,
    approval_status: record.approval_status ?? 'approved',
    owner_submitted: record.owner_submitted ?? false,
    original_language: record.original_language ?? null,
    owner_name: record.owner_name ?? null,
    owner_email: record.owner_email ?? null,
    owner_phone: record.owner_phone ?? null,
  };
}

async function main() {
  const base44 = createBase44Client({
    appId: requireEnv('BASE44_APP_ID'),
    token: requireEnv('BASE44_TOKEN'),
    appBaseUrl: requireEnv('BASE44_APP_BASE_URL'),
    serverUrl: '',
    requiresAuth: false,
  });

  const supabase = createSupabaseClient(
    requireEnv('VITE_SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY')
  );

  console.log('Fetching properties from base44...');
  const records = await base44.entities.Property.list('-created_date', 1000);
  console.log(`Fetched ${records.length} properties.`);

  const rows = records.map(toPropertyRow);

  console.log('Upserting into Supabase...');
  const { error } = await supabase.from('properties').upsert(rows, { onConflict: 'id' });
  if (error) {
    console.error('Upsert failed:', error);
    process.exit(1);
  }

  console.log(`Done. Migrated ${rows.length} properties.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
