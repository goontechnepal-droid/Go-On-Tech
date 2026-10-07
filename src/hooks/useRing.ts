import { useEffect, type MutableRefObject } from 'react';

/* =====================================================================
   THE RING (Appendix A §6)
   37 cards sit on a cylinder of radius R whose camera is AT the cylinder's
   centre (perspective == R). A card at angle a is therefore R*sin(a) to the
   side and R*(1-cos a) toward the viewer, and rotateY(-a) keeps it tangent
   to the cylinder, i.e. facing the camera. Its sides stay vertical and only
   the top edge slants: that is perspective, not rotation. Cards beyond 42deg
   are off-stage, so they are culled rather than transformed.
   ===================================================================== */
export const RING_COUNT = 37;
const R = 891;
const STEP = 360 / RING_COUNT;
const CULL = 42;
const SPEED = 1.9; // deg/s

/**
 * Drives the carousel with one rAF loop that writes transform / filter / visibility
 * straight onto the card elements (never through React state).
 */
export function useRing(cardRefs: MutableRefObject<(HTMLElement | null)[]>): void {
  useEffect(() => {
    const cards = cardRefs.current;
    const shown: (boolean | null)[] = cards.map(() => null);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let phase = -2;
    let last: number | null = null;
    let raf = 0;
    let onScreen = true;

    const place = () => {
      for (let i = 0; i < cards.length; i++) {
        const el = cards[i];
        if (!el) continue;
        const a = ((((i * STEP + phase) % 360) + 540) % 360) - 180; // signed angle, -180..180
        if (Math.abs(a) > CULL) {
          if (shown[i] !== false) {
            el.style.visibility = 'hidden';
            el.tabIndex = -1;
            el.setAttribute('aria-hidden', 'true');
            shown[i] = false;
          }
          continue;
        }
        if (shown[i] !== true) {
          el.style.visibility = 'visible';
          el.tabIndex = 0;
          el.removeAttribute('aria-hidden');
          shown[i] = true;
        }
        const r = (a * Math.PI) / 180;
        const c = Math.cos(r);
        el.style.transform = `translate3d(${(R * Math.sin(r)).toFixed(2)}px,0,${(R * (1 - c)).toFixed(2)}px) rotateY(${(-a).toFixed(3)}deg)`;
        el.style.filter = `brightness(${(0.975 + 0.08 * (1 / c - 1)).toFixed(3)})`; // a whisper brighter toward the near edges
      }
    };

    const tick = (t: number) => {
      if (last === null) last = t;
      const dt = Math.min((t - last) / 1000, 0.1);
      last = t;
      // reduced motion: still rendered, never spins. Off-screen: skip the work entirely.
      if (!reduce.matches && onScreen) {
        phase -= SPEED * dt; // continuous, never resets
        place();
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      last = null;
    };
    document.addEventListener('visibilitychange', onVisibility);

    const ring = cards.find((c) => c !== null)?.parentElement ?? null;
    const io =
      ring && 'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            last = null;
          })
        : null;
    if (ring && io) io.observe(ring);

    place();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      io?.disconnect();
    };
  }, [cardRefs]);
}
