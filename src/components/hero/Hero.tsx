import { useEffect, useRef } from 'react';
import { DEFAULT_SCALE, useCanvasScale, type CanvasScale } from '../../hooks/useCanvasScale';
import { useIntroTimeline } from '../../hooks/useIntroTimeline';
import { useTypeFitter } from '../../hooks/useTypeFitter';
import Backdrop from '../ui/Backdrop';
import Badge from '../ui/Badge';
import GlowButton from '../ui/GlowButton';
import BrowserMock from './BrowserMock';
import CarouselRing from './CarouselRing';

/**
 * The home hero: Appendix A's fixed 1172 x 657 design canvas, scaled by one transform.
 * Everything inside `.canvas` is absolutely positioned in design pixels on desktop and
 * tablet, and becomes a real flow column on phones (hero.css). All per-frame and
 * per-resize work happens in hooks that write to the DOM directly.
 */
export default function Hero() {
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<CanvasScale>(DEFAULT_SCALE);

  const layout = useTypeFitter(canvasRef, scaleRef);
  useCanvasScale(stageRef, canvasRef, scaleRef, layout);
  useIntroTimeline(stageRef);

  // The stage and the mock clip with overflow:hidden, which can still be scrolled
  // programmatically (focus, find-in-page). Pin any such scroll back to 0 so the
  // composition never shifts.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const pin = (e: Event) => {
      const t = e.target;
      if (t instanceof HTMLElement && (t.scrollTop || t.scrollLeft)) {
        t.scrollTop = 0;
        t.scrollLeft = 0;
      }
    };
    stage.addEventListener('scroll', pin, true);
    return () => stage.removeEventListener('scroll', pin, true);
  }, []);

  return (
    <section className="stage" ref={stageRef} aria-label="Introduction">
      <div className="bg" />
      <Backdrop />

      <div className="canvas" ref={canvasRef}>
        <div className="stack">
          <Badge mode="fixed" to="/clients" fit>
            Trusted by banks &amp; government
          </Badge>

          <h1 className="h1 l1" data-fit="h1a" aria-label="Secure the business backbone">
            Secure the business
          </h1>
          <div className="h1" data-fit="h1b" aria-hidden="true">
            Backbone
          </div>
          <p className="sub s1" data-fit="sub1">
            <b>
              Cybersecurity audits / <span className="nb">VAPT &amp; Cloud</span>
            </b>{' '}
            orchestrated with
          </p>
          <p className="sub" data-fit="sub2">
            DevOps, live monitoring and secure card systems.
          </p>

          <GlowButton to="/quote" size="raw" className="cta2" fit="vpLabel">
            Get a quote
          </GlowButton>
        </div>

        <div className="showcase">
          <CarouselRing />
          <BrowserMock />
        </div>
      </div>
    </section>
  );
}
