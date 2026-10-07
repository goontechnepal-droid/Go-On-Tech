import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoUrl from '../../assets/logo.png';
import { mailtoUrl, NAV_ITEMS, site, whatsappUrl, type NavItem } from '../../config/site';
import type { ServiceCategory } from '../../data/types';
import GlowButton from '../ui/GlowButton';
import Icon from '../ui/Icon';
import { MegaMenu, SheetGroup } from './NavDropdown';
import styles from './Nav.module.css';

const DESKTOP_QUERY = '(min-width:1081px)';
const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;
const hasGroup = (item: NavItem): item is NavItem & { group: ServiceCategory } => item.group !== undefined;

/**
 * The site's one navbar: fixed to the top of every page.
 *
 * Desktop: three floating islands (logo · links · actions). Once the page scrolls they
 * dock into a single compact bar with a reading-progress line. A highlight pill slides
 * between the links, and Solutions / Services open a mega-menu with a live preview.
 *
 * At or below 1080px: logo + burger, and a full-screen sheet that opens with a circular
 * reveal from the burger, with numbered links and expandable groups.
 */
export default function Nav() {
  const [docked, setDocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [group, setGroup] = useState<ServiceCategory | null>(null); // open mega-menu
  const [lastGroup, setLastGroup] = useState<ServiceCategory>('solution'); // keeps content while closing
  const [sheetGroup, setSheetGroup] = useState<ServiceCategory | null>(null); // expanded group in the sheet

  const rootRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const hoverEl = useRef<HTMLElement | null>(null); // link under the pointer, if any
  const closeTimer = useRef<number | undefined>(undefined);
  const skipFocusOpen = useRef(false);
  const megaId = useId();
  const sheetId = useId();
  const { pathname, search, hash } = useLocation();

  const cancelClose = useCallback(() => window.clearTimeout(closeTimer.current), []);
  const openGroup = useCallback(
    (g: ServiceCategory) => {
      cancelClose();
      setGroup(g);
      setLastGroup(g);
    },
    [cancelClose],
  );
  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setGroup(null);
    setSheetGroup(null);
  }, []);

  /* ---------- sliding highlight ---------- */
  const placeIndicator = useCallback((el: HTMLElement | null) => {
    const box = linksRef.current;
    if (!box) return;
    if (!el) {
      box.style.setProperty('--o', '0');
      return;
    }
    box.style.setProperty('--x', `${el.offsetLeft}px`);
    box.style.setProperty('--w', `${el.offsetWidth}px`);
    box.style.setProperty('--o', '1');
  }, []);
  /** The pill sits on the hovered link; failing that the open group's label; failing that the current page. */
  const restIndicator = useCallback(() => {
    const box = linksRef.current;
    if (!box) return;
    const target =
      hoverEl.current ??
      (group ? box.querySelector<HTMLElement>(`[data-group="${group}"]`) : null) ??
      box.querySelector<HTMLElement>('a.active');
    placeIndicator(target);
  }, [group, placeIndicator]);
  const onLinkEnter = (el: HTMLElement) => {
    hoverEl.current = el;
    placeIndicator(el);
  };
  const onLinksLeave = () => {
    hoverEl.current = null;
    restIndicator();
  };

  useEffect(() => {
    restIndicator();
  }, [restIndicator, pathname]);

  useEffect(() => {
    let alive = true;
    const again = () => {
      if (alive) restIndicator();
    };
    window.addEventListener('resize', again);
    if (document.fonts?.ready) void document.fonts.ready.then(again); // link widths change once the webfont is in
    return () => {
      alive = false;
      window.removeEventListener('resize', again);
    };
  }, [restIndicator]);

  /* ---------- docking + reading progress ---------- */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setDocked(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // written straight to a CSS variable: no re-render per scroll frame
      rootRef.current?.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  /* ---------- closing rules ---------- */
  // every route change closes the menus
  useEffect(() => {
    closeAll();
  }, [pathname, search, hash, closeAll]);

  // crossing the 1080px boundary resets both the sheet and any mega-menu
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    mq.addEventListener('change', closeAll);
    return () => {
      mq.removeEventListener('change', closeAll);
      cancelClose();
    };
  }, [closeAll, cancelClose]);

  // the sheet covers the page: stop the page scrolling behind it
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [menuOpen]);

  // outside click and Escape, only while something is open
  useEffect(() => {
    if (!menuOpen && !group) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.target instanceof Node && !rootRef.current?.contains(e.target)) closeAll();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (menuOpen) {
        closeAll();
        burgerRef.current?.focus();
      } else if (group) {
        const label = linksRef.current?.querySelector<HTMLElement>(`[data-group="${group}"]`);
        setGroup(null);
        skipFocusOpen.current = true; // returning focus to the label must not reopen the panel
        label?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, group, closeAll]);

  const onRootLeave = () => {
    if (!isDesktop()) return;
    cancelClose();
    closeTimer.current = window.setTimeout(() => setGroup(null), 180);
  };
  const onRootBlur = (e: FocusEvent<HTMLElement>) => {
    if (isDesktop() && !(e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget))) {
      setGroup(null);
    }
  };
  /** While the sheet is open, Tab cycles inside the navbar instead of reaching the page behind. */
  const onRootKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (!menuOpen || e.key !== 'Tab' || !rootRef.current) return;
    const focusable = Array.from(rootRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')).filter(
      (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const focusFirstMegaItem = () => {
    // the panel becomes focusable on the next frame, once it is visible
    requestAnimationFrame(() => document.getElementById(megaId)?.querySelector<HTMLElement>('a')?.focus());
  };

  return (
    <nav
      ref={rootRef}
      data-site-nav
      className={`${styles.root} ${docked ? styles.docked : ''} ${menuOpen ? styles.sheetIsOpen : ''}`}
      aria-label="Primary"
      onMouseEnter={cancelClose}
      onMouseLeave={onRootLeave}
      onBlur={onRootBlur}
      onKeyDown={onRootKeyDown}
    >
      <div className={styles.bar}>
        {/* island 1: the supplied logo lockup, unaltered */}
        <Link className={`${styles.island} ${styles.brand}`} to="/" aria-label="Go On Tech: home">
          <img src={logoUrl} alt="Go On Tech" width={849} height={480} />
        </Link>

        {/* island 2: links with the sliding highlight */}
        <div className={`${styles.island} ${styles.links}`} ref={linksRef} onMouseLeave={onLinksLeave}>
          <span className={styles.indicator} aria-hidden="true" />
          {NAV_ITEMS.map((item) =>
            hasGroup(item) ? (
              <NavLink
                key={item.to}
                className={styles.link}
                to={item.to}
                data-group={item.group}
                aria-haspopup="true"
                aria-expanded={group === item.group}
                aria-controls={megaId}
                onMouseEnter={(e) => {
                  onLinkEnter(e.currentTarget);
                  openGroup(item.group);
                }}
                onFocus={() => {
                  if (skipFocusOpen.current) {
                    skipFocusOpen.current = false;
                    return;
                  }
                  openGroup(item.group);
                }}
                onKeyDown={(e) => {
                  if (e.key !== 'ArrowDown') return;
                  e.preventDefault();
                  openGroup(item.group);
                  focusFirstMegaItem();
                }}
              >
                {item.label}
                <Icon name="chevron" size={14} className={styles.caret} />
              </NavLink>
            ) : (
              <NavLink
                key={item.to}
                className={styles.link}
                to={item.to}
                onMouseEnter={(e) => {
                  onLinkEnter(e.currentTarget);
                  setGroup(null);
                }}
                onFocus={() => setGroup(null)}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </div>

        <MegaMenu id={megaId} category={group ?? lastGroup} open={group !== null} />

        {/* island 3: actions */}
        <div className={`${styles.island} ${styles.actions}`}>
          <Link className={styles.iconBtn} to="/contact" aria-label="Talk to us" title="Talk to us">
            <Icon name="chat" size={19} />
          </Link>
          <GlowButton to="/get-audit" size="raw" className={styles.cta}>
            Get free audit
            <Icon name="arrow" size={15} />
          </GlowButton>
          <button
            ref={burgerRef}
            className={styles.burger}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={sheetId}
            onClick={() => {
              setSheetGroup(null);
              setMenuOpen((o) => !o);
            }}
          >
            <span />
            <span />
          </button>
        </div>

        <span className={styles.progress} aria-hidden="true" />
      </div>

      {/* full-screen sheet (<=1080px) */}
      <div className={`${styles.sheet} ${menuOpen ? styles.sheetOpen : ''}`} id={sheetId}>
        <div className="dots" aria-hidden="true" />
        <ol className={styles.sheetList}>
          {NAV_ITEMS.map((item, i) => {
            const expanded = hasGroup(item) && sheetGroup === item.group;
            const groupId = `${sheetId}-g${i}`;
            return (
              <li key={item.to} style={{ '--i': i } as CSSProperties}>
                <div className={styles.sheetRow}>
                  <span className={styles.sheetNo} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <NavLink className={styles.sheetLink} to={item.to}>
                    {item.label}
                  </NavLink>
                  {hasGroup(item) && (
                    <button
                      type="button"
                      className={`${styles.sheetToggle} ${expanded ? styles.sheetToggleOn : ''}`}
                      aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
                      aria-expanded={expanded}
                      aria-controls={groupId}
                      onClick={() => setSheetGroup(expanded ? null : item.group)}
                    >
                      <Icon name="chevron" size={18} />
                    </button>
                  )}
                </div>
                {hasGroup(item) && <SheetGroup id={groupId} category={item.group} open={expanded} />}
              </li>
            );
          })}
        </ol>
        <div className={styles.sheetFoot}>
          <GlowButton to="/get-audit">Get free audit</GlowButton>
          <div className={styles.sheetContacts}>
            <a href={mailtoUrl}>
              <Icon name="mail" size={17} />
              {site.email}
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener">
              <Icon name="chat" size={17} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
