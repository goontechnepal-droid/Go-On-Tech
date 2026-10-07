import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On every route change: scroll to the top, or to the `#hash` target when there is one.
 * Pages are lazy-loaded and some content arrives with data, so a hash target may not
 * exist yet: keep looking for a short while before giving up.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let raf = 0;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        if (id === 'main') el.focus({ preventScroll: true }); // skip link
        return;
      }
      if (tries++ < 120) raf = requestAnimationFrame(seek);
    };
    seek();
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}
