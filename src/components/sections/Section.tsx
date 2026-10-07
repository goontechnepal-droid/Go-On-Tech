import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './sections.module.css';

interface SectionProps {
  children: ReactNode;
  id?: string;
  /** Tighter vertical padding for sections that follow a page hero. */
  compact?: boolean;
}

/** Shared section shell: alternating white / pale-slate ground, and a scroll reveal. */
export default function Section({ children, id, compact = false }: SectionProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id={id} className={`${styles.section} ${compact ? styles.compact : ''}`}>
      <div ref={ref} className={`container reveal ${styles.inner}`}>
        {children}
      </div>
    </section>
  );
}
