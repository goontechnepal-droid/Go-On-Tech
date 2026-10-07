import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_LABEL, CATEGORY_PATH, servicePath } from '../../config/site';
import type { ServiceCategory } from '../../data/types';
import { useServices } from '../../hooks/useServices';
import Icon from '../ui/Icon';
import styles from './Nav.module.css';

interface MegaMenuProps {
  id: string;
  category: ServiceCategory;
  open: boolean;
}

/**
 * Desktop mega-menu: the category's items on the left, and on the right a preview card
 * that follows whichever item is hovered or focused.
 */
export function MegaMenu({ id, category, open }: MegaMenuProps) {
  const { data: services = [] } = useServices(category);
  const [hovered, setHovered] = useState<string | null>(null);
  // a slug from the other category simply is not found, so switching category resets to the first item
  const index = Math.max(0, services.findIndex((s) => s.slug === hovered));
  const current = services[index];
  const noun = category === 'solution' ? 'solutions' : 'services';

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>('a:not([tabindex="-1"])'));
    if (!links.length) return;
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % links.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + links.length) % links.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = links.length - 1;
    if (next < 0) return;
    e.preventDefault();
    links[next].focus();
  };

  return (
    <div
      id={id}
      className={`${styles.mega} ${open ? styles.megaOpen : ''}`}
      role="group"
      aria-label={`${CATEGORY_LABEL[category]} menu`}
      onKeyDown={onKeyDown}
    >
      <div className={styles.megaList}>
        <p className={styles.megaKicker}>
          <span>{CATEGORY_LABEL[category]}</span>
          <i>{String(services.length).padStart(2, '0')}</i>
        </p>
        {services.map((s, i) => (
          <Link
            key={s.slug}
            className={`${styles.megaItem} ${current?.slug === s.slug ? styles.megaItemOn : ''}`}
            to={servicePath(s)}
            style={{ '--i': i } as CSSProperties}
            onMouseEnter={() => setHovered(s.slug)}
            onFocus={() => setHovered(s.slug)}
          >
            <span className={styles.megaIcon}>
              <Icon name={s.icon} size={17} />
            </span>
            <span className={styles.megaText}>
              <b>{s.title}</b>
              <small>{s.tagline}</small>
            </span>
          </Link>
        ))}
      </div>

      {/* the preview repeats a link from the list, so it is pointer-only */}
      {current && (
        <Link className={styles.megaPreview} to={servicePath(current)} tabIndex={-1} aria-hidden="true">
          <div key={current.slug} className={styles.previewBody}>
            <div className={styles.previewTop}>
              <span className={styles.previewIcon}>
                <Icon name={current.icon} size={24} />
              </span>
              <span className={styles.previewNo}>
                {String(index + 1).padStart(2, '0')}
                <i> / {String(services.length).padStart(2, '0')}</i>
              </span>
            </div>
            <strong>{current.title}</strong>
            <p>{current.summary}</p>
            <ul>
              {current.features.slice(0, 3).map((f) => (
                <li key={f.title}>{f.title}</li>
              ))}
            </ul>
            <span className={styles.previewGo}>
              Explore
              <Icon name="arrow" size={15} />
            </span>
          </div>
        </Link>
      )}

      <div className={styles.megaFoot}>
        <Link to={CATEGORY_PATH[category]}>
          View all {noun} <span aria-hidden="true">→</span>
        </Link>
        <Link to="/quote">
          Get a quote <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

interface SheetGroupProps {
  id: string;
  category: ServiceCategory;
  open: boolean;
}

/** Expandable list of a category's items inside the mobile sheet. */
export function SheetGroup({ id, category, open }: SheetGroupProps) {
  const { data: services = [] } = useServices(category);
  return (
    <ul id={id} className={styles.sheetSub} hidden={!open}>
      {services.map((s) => (
        <li key={s.slug}>
          <Link to={servicePath(s)}>
            <Icon name={s.icon} size={18} />
            {s.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
