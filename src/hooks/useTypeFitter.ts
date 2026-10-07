import { useCallback, useLayoutEffect, type RefObject } from 'react';
import type { CanvasScale } from './useCanvasScale';

/* =====================================================================
   TYPE FITTER (Appendix A §11), desktop + tablet only.
   Each run is scaled so its ink width and cap height match the design,
   then its baseline is dropped onto the design baseline. Font metrics
   come from a detached canvas. Elements are found by [data-fit="…"].
   ===================================================================== */

/**
 * The two headline lines (and the two sub lines) share ONE horizontal scale, the less
 * distorting of the pair's two targets, so both lines keep the same letter proportions.
 * Set to false to squeeze each line to its own literal design ink width.
 */
const LOCK_PAIRS = true;

const RUNS = ['h1a', 'h1b', 'sub1', 'sub2', 'badgeTxt', 'vpLabel'] as const;
type Run = (typeof RUNS)[number];

let ctx: CanvasRenderingContext2D | null | undefined;
function metrics(): CanvasRenderingContext2D | null {
  if (ctx === undefined) ctx = document.createElement('canvas').getContext('2d');
  return ctx;
}

function fontOf(el: HTMLElement) {
  const cs = getComputedStyle(el);
  return { css: `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`, size: parseFloat(cs.fontSize) };
}

function capRatio(el: HTMLElement): number {
  const c = metrics();
  if (!c) return 0.7;
  const cs = getComputedStyle(el);
  c.font = `${cs.fontWeight} 100px ${cs.fontFamily}`;
  return (c.measureText('H').actualBoundingBoxAscent || 70) / 100;
}

function runLayout(root: HTMLElement, scale: CanvasScale): void {
  const { k, mobile, tablet, tboost } = scale;
  const get = (name: Run) => root.querySelector<HTMLElement>(`[data-fit="${name}"]`);

  if (mobile) {
    // the phone is a flow column: strip everything the fitter wrote
    for (const name of RUNS) {
      const el = get(name);
      if (!el) continue;
      el.style.fontSize = '';
      el.style.top = '';
      el.style.transform = '';
    }
    return;
  }

  const inkWidth = (el: HTMLElement) => el.getBoundingClientRect().width / k;

  const fitBox = (el: HTMLElement | null, tw: number, tc: number, pre = '') => {
    if (!el) return;
    el.style.transform = pre;
    el.style.fontSize = `${tc / capRatio(el)}px`; // cap height first...
    const w = inkWidth(el);
    if (w) el.style.transform = `${pre} scaleX(${tw / w})`.trim(); // ...then squeeze to the ink width
  };

  const fitPair = (a: HTMLElement | null, b: HTMLElement | null, twA: number, twB: number, tc: number, pre: string) => {
    fitBox(a, twA, tc, pre);
    fitBox(b, twB, tc, pre);
    if (!LOCK_PAIRS || !a || !b) return;
    a.style.transform = pre;
    b.style.transform = pre;
    const wa = inkWidth(a);
    const wb = inkWidth(b);
    if (!wa || !wb) return;
    const sa = twA / wa;
    const sb = twB / wb;
    const s = Math.abs(sa - 1) <= Math.abs(sb - 1) ? sa : sb;
    a.style.transform = b.style.transform = `${pre} scaleX(${s})`;
  };

  const baseline = (el: HTMLElement | null, y: number) => {
    const c = metrics();
    if (!el || !c) return;
    const f = fontOf(el);
    c.font = f.css;
    const m = c.measureText('Hg');
    const A = m.fontBoundingBoxAscent || f.size * 0.8;
    const D = m.fontBoundingBoxDescent || f.size * 0.2;
    // a line-height:1 box is `size` tall; the baseline sits half-leading + ascent below its top
    el.style.top = `${y - ((f.size - (A + D)) / 2 + A)}px`;
  };

  const centreLabel = (el: HTMLElement | null, capPx: number) => {
    const btn = el?.parentElement;
    if (!el || !btn) return;
    const BIAS = 1.1;
    el.style.top = '';
    const probe = document.createElement('i');
    probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    el.appendChild(probe);
    const base = (probe.getBoundingClientRect().top - btn.getBoundingClientRect().top) / k;
    el.removeChild(probe);
    // put the middle of the cap height (not the line box) on the button's centre line
    el.style.top = `${btn.offsetHeight / 2 - (base - capPx / 2) + BIAS}px`;
  };

  const T = tablet ? tboost : 1;
  const centre = 'translateX(-50%)';
  fitPair(get('h1a'), get('h1b'), 563.5 * T, 197.5 * T, 37.2 * T, centre);
  baseline(get('h1a'), 204.5);
  baseline(get('h1b'), 258.5);
  fitPair(get('sub1'), get('sub2'), 389 * T, 311 * T, 8.4 * T, centre);
  baseline(get('sub1'), 300.5);
  baseline(get('sub2'), 316.5);
  fitBox(get('badgeTxt'), 184 * T, 9.4 * T, 'translate(2px,-1px)');
  fitBox(get('vpLabel'), 76 * T, 9.5 * T);
  centreLabel(get('vpLabel'), 9.5 * T);

}

/**
 * Returns a stable `layout()` function and runs it after mount, once the webfonts are
 * ready, and again at 400ms / 1400ms. Call the returned function whenever the canvas
 * scale changes.
 */
export function useTypeFitter(rootRef: RefObject<HTMLElement>, scaleRef: RefObject<CanvasScale>): () => void {
  const layout = useCallback(() => {
    const root = rootRef.current;
    const scale = scaleRef.current;
    if (root && scale) runLayout(root, scale);
  }, [rootRef, scaleRef]);

  useLayoutEffect(() => {
    let alive = true;
    layout();
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (alive) layout(); // re-fit once the webfonts are in
      });
    }
    const t1 = window.setTimeout(layout, 400);
    const t2 = window.setTimeout(layout, 1400);
    return () => {
      alive = false;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [layout]);

  return layout;
}
