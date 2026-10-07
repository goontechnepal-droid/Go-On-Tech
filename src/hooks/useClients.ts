import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { FALLBACK_CLIENTS } from '../data/fallback';
import type { Client, IndustrySlug } from '../data/types';

const SECTORS: readonly string[] = ['finance', 'government', 'healthcare', 'retail', 'manufacturing'];

function toSector(value: string): IndustrySlug {
  return SECTORS.includes(value) ? (value as IndustrySlug) : 'retail';
}

/** Never rejects: any failure resolves to the bundled fallback. */
async function fetchClients(): Promise<Client[]> {
  if (!supabase) return FALLBACK_CLIENTS;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 8000);
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .abortSignal(controller.signal);
    if (error || !data || data.length === 0) return FALLBACK_CLIENTS;
    return data.map((row) => ({
      slug: row.slug,
      name: row.name,
      sector: toSector(row.sector),
      logo_url: row.logo_url,
      website_url: row.website_url,
      sort_order: row.sort_order,
    }));
  } catch {
    return FALLBACK_CLIENTS;
  } finally {
    window.clearTimeout(timer);
  }
}

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    staleTime: 10 * 60 * 1000,
    initialData: supabase ? undefined : FALLBACK_CLIENTS,
    placeholderData: FALLBACK_CLIENTS, // bundled copy while the request is in flight
  });
}
