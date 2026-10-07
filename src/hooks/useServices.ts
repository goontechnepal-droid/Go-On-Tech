import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database, Json } from '../lib/database.types';
import { FALLBACK_SERVICES } from '../data/fallback';
import { isIconName } from '../components/ui/Icon';
import type { Faq, IndustrySlug, Service, ServiceCategory, TitledText } from '../data/types';

type ServiceRow = Database['public']['Tables']['services']['Row'];

const STALE_TIME = 10 * 60 * 1000;
/** A slow or unreachable database must not hold the page: give up and use the fallback. */
export const REQUEST_TIMEOUT_MS = 8000;
const INDUSTRY_SLUGS: readonly string[] = ['finance', 'government', 'healthcare', 'retail', 'manufacturing'];

/** Reads a jsonb array of objects, keeping only items where both keys are strings. */
function readPairs(value: Json, a: string, b: string): [string, string][] {
  if (!Array.isArray(value)) return [];
  const out: [string, string][] = [];
  for (const item of value) {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) continue;
    const x = item[a];
    const y = item[b];
    if (typeof x === 'string' && typeof y === 'string') out.push([x, y]);
  }
  return out;
}

function rowToService(row: ServiceRow): Service {
  const features: TitledText[] = readPairs(row.features, 'title', 'body').map(([title, body]) => ({ title, body }));
  const process: TitledText[] = readPairs(row.process, 'title', 'body').map(([title, body]) => ({ title, body }));
  const faqs: Faq[] = readPairs(row.faqs, 'q', 'a').map(([q, a]) => ({ q, a }));
  return {
    slug: row.slug,
    category: row.category === 'hardware' ? 'hardware' : 'solution',
    priority: row.priority,
    title: row.title,
    tagline: row.tagline,
    summary: row.summary,
    description: row.description,
    icon: isIconName(row.icon) ? row.icon : 'shield',
    features,
    process,
    deliverables: row.deliverables,
    faqs,
    industries: row.industries.filter((i): i is IndustrySlug => INDUSTRY_SLUGS.includes(i)),
    is_featured: row.is_featured,
  };
}

/** Never rejects: any failure resolves to the bundled fallback so every page always renders. */
async function fetchServices(): Promise<Service[]> {
  if (!supabase) return FALLBACK_SERVICES;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_published', true)
      .order('priority', { ascending: true })
      .abortSignal(controller.signal);
    if (error || !data || data.length === 0) return FALLBACK_SERVICES;
    return data.map(rowToService);
  } catch {
    return FALLBACK_SERVICES;
  } finally {
    window.clearTimeout(timer);
  }
}

/** One cached query for all 14 rows; the public hooks below are selectors over it. */
function useServiceQuery<T>(select: (all: Service[]) => T) {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    staleTime: STALE_TIME,
    // without Supabase there is nothing to wait for: the fallback IS the data
    initialData: supabase ? undefined : FALLBACK_SERVICES,
    // with Supabase, show the bundled copy while the request is in flight so navigation,
    // lists and pages are never empty; live rows replace it when they arrive
    placeholderData: FALLBACK_SERVICES,
    select,
  });
}

/** All services, or one category, in priority order. */
export function useServices(category?: ServiceCategory) {
  const select = useCallback(
    (all: Service[]) => (category ? all.filter((s) => s.category === category) : all),
    [category],
  );
  return useServiceQuery(select);
}

/** Services of a category tagged for an industry (`null` = no filter). */
export function useServicesByIndustry(industry: string | null, category: ServiceCategory = 'solution') {
  const select = useCallback(
    (all: Service[]) =>
      all.filter(
        (s) => s.category === category && (!industry || s.industries.some((i) => i === industry)),
      ),
    [industry, category],
  );
  return useServiceQuery(select);
}

/**
 * A single service by slug; `data` is `null` when the slug does not exist.
 * While `isPlaceholderData` is true a `null` only means "not in the bundled copy":
 * wait for the live answer before treating it as missing.
 */
export function useService(slug: string | undefined) {
  const select = useCallback((all: Service[]) => all.find((s) => s.slug === slug) ?? null, [slug]);
  return useServiceQuery(select);
}
