import type { IconName } from '../components/ui/Icon';
import type { IndustrySlug, ServiceCategory } from '../data/types';

export interface SocialLink {
  label: string;
  url: string;
  icon: IconName;
}

export const site = {
  name: 'Go On Tech Pvt. Ltd.',
  shortName: 'Go On Tech',
  location: 'Kathmandu, Nepal',
  email: 'business@goon.com.np',
  phone: '+977 980-2347742',
  whatsapp: '+977 980-2347742',
  /** Public site origin, used for canonical URLs. */
  url: 'https://goon.com.np',
  description:
    'Go On Tech Pvt. Ltd., Kathmandu: cybersecurity, VAPT, cloud services, SaaS platforms, website monitoring, DevOps, IT audit, bank card printing, ID cards, label printers, PDA and barcode solutions.',
  homeTitle: 'Go On Tech: Cybersecurity, Cloud & Secure Card Solutions | Kathmandu',
  /** Add entries here to show social icons in the footer. Empty by default. */
  social: [] as SocialLink[],
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, '')}`;
export const telUrl = `tel:${site.phone.replace(/[^0-9+]/g, '')}`;
export const mailtoUrl = `mailto:${site.email}`;

export interface NavItem {
  label: string;
  to: string;
  /** When set, the item gets a dropdown listing that service category. */
  group?: ServiceCategory;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Solutions', to: '/solutions', group: 'solution' },
  { label: 'Services', to: '/services', group: 'hardware' },
  { label: 'Clients', to: '/clients' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export interface Industry {
  slug: IndustrySlug;
  label: string;
  icon: IconName;
  blurb: string;
}

export const INDUSTRIES: Industry[] = [
  { slug: 'finance', label: 'Banking & Finance', icon: 'bank', blurb: 'Security testing, audits and card issuance for banks and financial institutions.' },
  { slug: 'government', label: 'Government', icon: 'landmark', blurb: 'Protection, audits and secure ID systems for public offices.' },
  { slug: 'healthcare', label: 'Healthcare', icon: 'heart', blurb: 'Keeping patient systems available, protected and well managed.' },
  { slug: 'retail', label: 'Retail & Supermarkets', icon: 'cart', blurb: 'Labels, scanners and platforms that keep the shop floor moving.' },
  { slug: 'manufacturing', label: 'Manufacturing', icon: 'factory', blurb: 'Secure infrastructure, staff IDs and tracking for the production floor.' },
];

export function industryLabel(slug: string): string {
  return INDUSTRIES.find((i) => i.slug === slug)?.label ?? slug;
}

export interface Step {
  title: string;
  body: string;
}

export const STEPS: Step[] = [
  { title: 'Assess', body: 'We review your systems, people and processes to see where you stand today.' },
  { title: 'Plan', body: 'We agree priorities with you and set out a clear, practical scope of work.' },
  { title: 'Implement', body: 'Our team delivers the work alongside yours, with as little disruption as possible.' },
  { title: 'Monitor & support', body: 'We keep watch, stay on call and review things with you as your needs change.' },
];

export const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  solution: 'Solutions',
  hardware: 'Hardware & card services',
};

export const CATEGORY_PATH: Record<ServiceCategory, string> = {
  solution: '/solutions',
  hardware: '/services',
};

export function servicePath(s: { category: ServiceCategory; slug: string }): string {
  return `${CATEGORY_PATH[s.category]}/${s.slug}`;
}
