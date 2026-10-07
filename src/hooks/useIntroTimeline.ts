import { useEffect, type RefObject } from 'react';

const FLAG = 'goon-intro-played';
const EXPO = 'cubic-bezier(.16,1,.3,1)';

interface From {
  opacity: number;
  translate?: string;
  scale?: string;
  clipPath?: string;
}

/**
 * MASTER ENTRANCE TIMELINE (Appendix A §12).
 * Runs once per browser session, only when the inline <head> script armed `html.intro`
 * (home route, sessionStorage flag absent). Animates the individual translate / scale /
 * clip-path properties rather than `transform`, which the type fitter, the canvas scale
 * and the ring loop already own.
 */
export function useIntroTimeline(stageRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const root = document.documentElement;
    const stage = stageRef.current;
    if (!stage || !root.classList.contains('intro')) return;

    let anims: Animation[] = [];
    let started = false;
    let settled = false;

    const settle = () => {
      if (settled) return;
      settled = true;
      for (const a of anims) a.cancel();
      anims = [];
      root.classList.remove('intro');
      // re-fit the type at rest (no entrance scale left in the measurements)
      window.dispatchEvent(new Event('resize'));
    };

    // Deferred one frame so React StrictMode's mount -> unmount -> mount in development
    // cancels the first pass before it starts instead of consuming the intro.
    const raf = requestAnimationFrame(() => {
      started = true;
      try {
        sessionStorage.setItem(FLAG, '1');
      } catch {
        /* storage unavailable: the intro simply plays again next visit */
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof stage.animate !== 'function') {
        settle();
        return;
      }

      const D = window.innerWidth <= 700 ? 0.66 : 1; // shorter travel on phones
      const Y = (px: number) => `0 ${px * D}px`;
      let lastAnim: Animation | null = null;
      let lastEnd = -1;

      const play = (el: Element | null, from: From, dur: number, delay: number, ease: string) => {
        if (!el) return;
        const to: Keyframe = { opacity: 1 };
        if (from.translate !== undefined) to.translate = '0 0';
        if (from.scale !== undefined) to.scale = '1';
        if (from.clipPath !== undefined) to.clipPath = 'inset(-30% 0 -30% 0)';
        const a = el.animate([{ ...from }, to], { duration: dur, delay, easing: ease, fill: 'both' });
        a.id = `intro:${anims.length}`;
        anims.push(a);
        if (delay + dur > lastEnd) {
          lastEnd = delay + dur;
          lastAnim = a;
        }
      };
      const q = (sel: string) => stage.querySelector(sel);

      // The headline lines wipe UP out of their own baseline (clip-path); they do not just fade.
      const WIPE = 'inset(100% 0 -30% 0)';
      play(document.querySelector('[data-site-nav]'), { opacity: 0, translate: Y(-9) }, 620, 60, EXPO);
      play(q('.badge'), { opacity: 0, translate: Y(11), scale: '.985' }, 560, 270, EXPO);
      play(q('[data-fit="h1a"]'), { opacity: 0, translate: Y(15), clipPath: WIPE }, 900, 380, EXPO);
      play(q('[data-fit="h1b"]'), { opacity: 0, translate: Y(15), clipPath: WIPE }, 900, 470, EXPO);
      play(q('[data-fit="sub1"]'), { opacity: 0, translate: Y(10) }, 620, 690, EXPO);
      play(q('[data-fit="sub2"]'), { opacity: 0, translate: Y(10) }, 620, 745, EXPO);
      play(q('.cta2'), { opacity: 0, translate: Y(13), scale: '.985' }, 620, 830, EXPO);
      play(q('.ring'), { opacity: 0, translate: Y(18), scale: '.99' }, 950, 700, EXPO);
      play(q('.browser'), { opacity: 0, translate: Y(26) }, 900, 900, EXPO);
      play(document.querySelector('.wa'), { opacity: 0, scale: '.88' }, 500, 1260, EXPO);

      const finalAnim = lastAnim as Animation | null;
      if (finalAnim) finalAnim.onfinish = settle;
      else settle();
    });

    return () => {
      cancelAnimationFrame(raf);
      if (started) settle(); // leaving the home page mid-entrance: land on the resting state
    };
  }, [stageRef]);
}
