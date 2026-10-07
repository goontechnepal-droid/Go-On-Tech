import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '../ui/Backdrop';
import Badge from '../ui/Badge';
import styles from './page.module.css';

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  /** Trail after "Home"; the last entry is the current page. */
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  sub?: ReactNode;
  /** Optional buttons under the sub line. */
  children?: ReactNode;
}

/** Inner-page hero: breadcrumb, flow-mode badge, the page's single H1, sub line, actions. */
export default function PageHero({ crumbs, kicker, title, sub, children }: PageHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <Backdrop />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb">
          <ol className={styles.crumbs}>
            <li>
              <Link to="/">Home</Link>
            </li>
            {crumbs.map((c, i) => (
              <Fragment key={c.label}>
                <li aria-hidden="true">/</li>
                <li>
                  {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              </Fragment>
            ))}
          </ol>
        </nav>
        {kicker && <Badge>{kicker}</Badge>}
        <h1 className={styles.heroTitle}>{title}</h1>
        {sub && <p className={styles.heroSub}>{sub}</p>}
        {children && <div className={styles.heroActions}>{children}</div>}
      </div>
    </header>
  );
}
