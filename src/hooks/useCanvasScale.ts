import { useEffect, useLayoutEffect, useRef, type MutableRefObject, type RefObject } from 'react';

export interface CanvasScale {
  /** The single scale applied to the 1172 x 657 design canvas (1 on phones). */
  k: number;
  mobile: boolean;
  tablet: boolean;
  /** Type boost applied by the fitter across the tablet band. */
  tboost: number;
}

export const DEFAULT_SCALE: CanvasScale = { k: 1, mobile: false, tablet: false, tboost: 1 };

const CW = 1172;
const CH = 657;
const TAB_MAX = 1080;
const TAB_MIN = 701;
const DW_MIN = 920;

/**
 * Computes the canvas scale law (Appendix A §1 and §10) and writes
 * --k / --fill / --stshift / --sshift / --rs on the canvas element.
 * No React state is involved: `scaleRef` is updated in place and `onChange` is called.
 */
export function useCanvasScale(
  stageRef: RefObject<HTMLElement>,
  canvasRef: RefObject<HTMLElement>,
  scaleRef: MutableRefObject<CanvasScale>,
  onChange: () => void,
): void {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const resize = () => {
      // Breakpoints follow the CSS media queries (viewport width, scrollbar included);
      // the scale itself uses the stage box, which is what the canvas must fill.
      const band = window.innerWidth;
      const vw = stage.clientWidth;
      const vh = stage.clientHeight;
      const mobile = band <= 700;
      const tablet = !mobile && band <= TAB_MAX;
      const cs = canvas.style;

      if (mobile) {
        scaleRef.current = { k: 1, mobile: true, tablet: false, tboost: 1 };
        for (const p of ['--k', '--fill', '--stshift', '--sshift', '--rs']) cs.removeProperty(p);
        onChangeRef.current();
        return;
      }

      let W = CW;
      if (tablet) {
        // design width ramps 920 -> 1172 across the band, so k is continuous at 1080 (no jump)
        W = DW_MIN + ((band - TAB_MIN) * (CW - DW_MIN)) / (TAB_MAX - TAB_MIN);
        if (vh > vw * 1.15) W = Math.min(W, 900); // portrait tablet
      }
      // k = min(vw/W, vh/560). 560, not the canvas's 657, is deliberate: the canvas fills
      // the width and the browser mock bleeds off the bottom edge instead of letterboxing.
      const k = Math.min(vw / W, vh / 560);
      let fill = Math.max(0, vh / k - CH); // design px of height below the canvas
      let tboost = 1;
      let ss = 0;
      let rs = 1;
      let st = 0;
      if (tablet) {
        const ramp = Math.min(1, (TAB_MAX - band) / 120);
        tboost = 1 + 0.14 * ramp;
        if (fill > 0) {
          // surplus height is shared THREE ways: the showcase slides down (ss), the ring
          // grows (rs), and the text stack re-centres in the gap that opens (st).
          // Whatever is left over lengthens the browser mock (--fill).
          ss = Math.min(fill * 0.55, 420) * ramp;
          rs = 1 + Math.min(fill / 1100, 0.75) * ramp;
          const slack = 219.5 - 125 * rs + ss;
          st = Math.max(0, slack / 2 - 28) * ramp;
          fill -= ss;
        }
      }
      scaleRef.current = { k, mobile: false, tablet, tboost };
      cs.setProperty('--k', String(k));
      cs.setProperty('--fill', `${fill}px`);
      cs.setProperty('--stshift', `${st}px`);
      cs.setProperty('--sshift', `${ss}px`);
      cs.setProperty('--rs', String(rs));
      onChangeRef.current();
    };

    resize();
    window.addEventListener('resize', resize);
    const vv = window.visualViewport;
    vv?.addEventListener('resize', resize);
    // catches stage size changes that fire no window resize (e.g. a scrollbar appearing)
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    return () => {
      window.removeEventListener('resize', resize);
      vv?.removeEventListener('resize', resize);
      ro.disconnect();
    };
  }, [stageRef, canvasRef, scaleRef]);
}
