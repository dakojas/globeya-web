import { supabase, isSupabaseConfigured } from './supabaseClient';
import { sampleProperties, sampleTotalCountries } from '../data/sampleProperties';

export async function fetchFeaturedProperties(limit = 4) {
  if (!isSupabaseConfigured) {
    return sampleProperties.slice(0, limit);
  }
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_public', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function fetchDistinctCountryCount() {
  if (!isSupabaseConfigured) {
    return sampleTotalCountries;
  }
  const { data, error } = await supabase
    .from('properties')
    .select('country')
    .eq('is_public', true);
  if (error) throw error;
  return new Set(data.map((row) => row.country)).size;
}

export async function fetchPropertyBySlug(slug) {
  if (!isSupabaseConfigured) {
    return sampleProperties.find((p) => p.slug === slug) ?? null;
  }
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .eq('is_public', true)
    .single();
  if (error) throw error;
  return data;
}
