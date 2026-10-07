import type { ReactNode } from 'react';
import Badge from './Badge';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'center' | 'left';
}

/** Flow-mode Badge kicker + H2 + supporting line. */
export default function SectionHeader({ kicker, title, sub, align = 'center' }: SectionHeaderProps) {
  return (
    <header className={`${styles.header} ${align === 'left' ? styles.left : ''}`}>
      {kicker && <Badge>{kicker}</Badge>}
      <h2 className={styles.title}>{title}</h2>
      {sub && <p className={styles.sub}>{sub}</p>}
    </header>
  );
}
