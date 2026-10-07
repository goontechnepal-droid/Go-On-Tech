import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** When set, the WHOLE card is one router link. */
  to?: string;
  id?: string;
}

export default function GlassCard({ children, className, to, id }: GlassCardProps) {
  const cls = [styles.card, to ? styles.link : '', className ?? ''].filter(Boolean).join(' ');
  return to ? (
    <Link id={id} className={cls} to={to}>
      {children}
    </Link>
  ) : (
    <div id={id} className={cls}>
      {children}
    </div>
  );
}
