import type { ReactNode, SVGProps } from 'react';

/** Inline 24x24 line icons. Stroke follows `currentColor`. */
const ICONS = {
  // ---- solutions ----
  shield: (
    <>
      <path d="M12 2.5 5 5.2v6c0 4.5 2.9 8.3 7 9.8 4.1-1.5 7-5.3 7-9.8v-6L12 2.5Z" />
      <path d="m9 12 2.2 2.2 4-4.3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 1.5v5M12 17.5v5M1.5 12h5M17.5 12h5" />
    </>
  ),
  cloud: <path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96 6 6 0 0 1 11.64 1.3A3.85 3.85 0 0 1 17.5 18.5H7Z" />,
  window: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M6 6.5h.01M8.5 6.5h.01M7 13h6M7 16h10" />
    </>
  ),
  pulse: <path d="M2 12h4l2.5-6 4 13 3-9 1.5 2H22" />,
  infinity: <path d="M12 12c-2-2.7-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.3 6-4s4-4 6-4a4 4 0 0 1 0 8c-2 0-4-1.3-6-4Z" />,
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2.5" width="6" height="3.5" rx="1.2" />
      <path d="m8.5 11.5 1.3 1.3 2.2-2.4M14 12h2M8.5 16.5h7.5" />
    </>
  ),
  // ---- hardware & cards ----
  printer: (
    <>
      <path d="M7 9V3.5h10V9" />
      <rect x="3" y="9" width="18" height="8" rx="2" />
      <path d="M7 14h10v6.5H7zM17.5 12h.01" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19M6 15h4" />
    </>
  ),
  cardBolt: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M13 8.2 9.8 12.4h4.2L10.8 16" />
    </>
  ),
  id: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="8.8" cy="10.3" r="2.1" />
      <path d="M5.6 16c.6-1.8 1.7-2.6 3.2-2.6S11.4 14.2 12 16M14.5 9.5H18M14.5 13H18" />
    </>
  ),
  label: (
    <>
      <path d="M3 11.5V4h7.5l10 10-7.5 7.5-10-10Z" />
      <circle cx="7.5" cy="8.5" r="1.3" />
    </>
  ),
  pda: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M9.5 5.5h5v6h-5zM10 14.5h.01M12 14.5h.01M14 14.5h.01M10 17.5h.01M12 17.5h.01M14 17.5h.01" />
    </>
  ),
  barcode: <path d="M4 5v14M7 5v14M9.5 5v14M13 5v14M15.5 5v14M17.5 5v14M20 5v14" />,
  // ---- industries ----
  bank: <path d="m3 9.5 9-5.5 9 5.5M5 10v7.5M9.7 10v7.5M14.3 10v7.5M19 10v7.5M3 20h18" />,
  landmark: <path d="M4 20h16M6 20v-6.5M10 20v-6.5M14 20v-6.5M18 20v-6.5M4 13.5h16M6 10a6 6 0 0 1 12 0H6ZM12 2v2" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />,
  cart: (
    <>
      <path d="M3 4h2.2l2.3 11h10.2L20 7.5H6.2" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="16.5" cy="19" r="1.4" />
    </>
  ),
  factory: <path d="M3 20V10l6 4v-4l6 4V5.5h6V20H3ZM7 17h2M11.5 17h2M16 17h2" />,
  // ---- interface ----
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  chat: <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 13.5V19H5V6h5.5" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </>
  ),
  layers: <path d="m12 3-9 5 9 5 9-5-9-5ZM3 13l9 5 9-5" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c0-4.2 3.4-6.6 7.5-6.6s7.5 2.4 7.5 6.6" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

export function isIconName(value: string): value is IconName {
  return Object.prototype.hasOwnProperty.call(ICONS, value);
}

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 20, strokeWidth = 1.6, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {ICONS[name]}
    </svg>
  );
}
