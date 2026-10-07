import type { IconName } from '../components/ui/Icon';

export type ServiceCategory = 'solution' | 'hardware';
export type IndustrySlug = 'finance' | 'government' | 'healthcare' | 'retail' | 'manufacturing';

export interface TitledText {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  category: ServiceCategory;
  priority: number;
  title: string;
  tagline: string;
  summary: string;
  /** Paragraphs separated by a blank line. */
  description: string;
  icon: IconName;
  features: TitledText[];
  process: TitledText[];
  deliverables: string[];
  faqs: Faq[];
  industries: IndustrySlug[];
  is_featured: boolean;
}

export interface Client {
  slug: string;
  name: string;
  sector: IndustrySlug;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
}

export type InquiryType = 'contact' | 'audit' | 'quote';

/** Values that can be stored in the `details` jsonb column. */
export type DetailValue = string | number | boolean | null | string[];

export interface InquiryInput {
  type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_slugs?: string[];
  message?: string;
  details?: Record<string, DetailValue>;
}
