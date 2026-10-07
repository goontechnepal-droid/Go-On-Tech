import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/* The Badge (Appendix A §2): a fixed-size box with an icon tile pinned to its left edge
   and a left-aligned label beside it. Never a centred pill, never a flex row.
   - mode="fixed": absolutely positioned inside the hero canvas (250 x 39).
   - mode="flow":  the same construction in normal document flow (kickers, page heroes). */

interface BadgeProps {
  children: ReactNode;
  mode?: 'fixed' | 'flow';
  /** Makes the whole badge a router link. */
  to?: string;
  /** Marks the label for the hero type fitter. */
  fit?: boolean;
}

const shield = (
  <svg viewBox="4 1 16 22" preserveAspectRatio="none" aria-hidden="true" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 2.2 5.2 4.9v6.3c0 4.6 2.9 8.6 6.8 10.2 3.9-1.6 6.8-5.6 6.8-10.2V4.9L12 2.2Z" />
    <path d="M8.9 12.2l2.2 2.2 4-4.3" fill="none" />
  </svg>
);

export default function Badge({ children, mode = 'flow', to, fit = false }: BadgeProps) {
  const cls = mode === 'flow' ? 'badge badge--flow' : 'badge';
  const inner = (
    <>
      <i>{shield}</i>
      <b data-fit={fit ? 'badgeTxt' : undefined}>{children}</b>
    </>
  );
  return to ? (
    <Link className={cls} to={to}>
      {inner}
    </Link>
  ) : (
    <span className={cls}>{inner}</span>
  );
}
