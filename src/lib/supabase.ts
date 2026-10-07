import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Typed Supabase client, or `null` when the env vars are missing.
 * Every consumer must handle `null`: the site then renders from src/data/fallback.ts
 * and forms report that submissions are not configured.
 */
export const supabase: SupabaseClient<Database> | null =
  url && anonKey
    ? createClient<Database>(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } })
    : null;

if (!supabase && import.meta.env.DEV) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. Showing fallback content; forms will not submit.',
  );
}
