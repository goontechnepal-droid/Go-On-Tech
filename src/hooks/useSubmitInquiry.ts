import { useMutation } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { InquiryInput } from '../data/types';

const clean = (value: string | undefined): string | null => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

/**
 * Inserts one row into `inquiries`.
 * The insert must NOT chain `.select()`: anon has insert-only access to this table,
 * so asking for the row back would be rejected by RLS.
 */
export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (input: InquiryInput): Promise<void> => {
      if (!supabase) {
        throw new Error('Form submissions are not configured yet (Supabase environment variables are missing).');
      }
      const { error } = await supabase.from('inquiries').insert({
        type: input.type,
        name: input.name.trim(),
        email: input.email.trim(),
        phone: clean(input.phone),
        company: clean(input.company),
        service_slugs: input.service_slugs ?? [],
        message: clean(input.message),
        details: input.details ?? {},
        source_path: window.location.pathname.slice(0, 300),
      });
      if (error) throw new Error(error.message);
    },
  });
}
