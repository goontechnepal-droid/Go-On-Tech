import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { RING_COUNT, useRing } from '../../hooks/useRing';
import { Creative, CreativeDefs, SHOTS } from './cardCreatives';

const INDEXES = Array.from({ length: RING_COUNT }, (_, i) => i);

/**
 * The 3D perspective ring: 37 linked cards cycling the 10 creatives.
 * The ring itself ignores the pointer; each card is clickable. Cards start hidden and
 * out of the tab order; useRing flips visibility / tabIndex / aria-hidden as they
 * rotate into and out of the 42deg window.
 */
export default function CarouselRing() {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  useRing(cardRefs);

  return (
    <>
      <CreativeDefs />
      <div className="ring">
        {INDEXES.map((i) => {
          const shot = SHOTS[i % SHOTS.length];
          return (
            <Link
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="card"
              to={shot.to}
              tabIndex={-1}
              aria-hidden="true"
              aria-label={`${shot.title}: view details`}
              style={{ visibility: 'hidden' }}
            >
              <Creative creative={shot.key} url={shot.url} />
              <div className="edge" />
            </Link>
          );
        })}
      </div>
    </>
  );
}
