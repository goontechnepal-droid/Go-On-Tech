import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import GlowButton from '../ui/GlowButton';
import styles from './page.module.css';

/** Full-width glass panel with a brand glow at its bottom edge. Used on home and detail pages. */
export default function CtaBand() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className={styles.ctaWrap} aria-labelledby="cta-band-title">
      <div ref={ref} className={`container reveal ${styles.cta}`}>
        <h2 id="cta-band-title" className={styles.ctaTitle}>
          Find your weak spots before attackers do.
        </h2>
        <div className={styles.ctaActions}>
          <GlowButton to="/get-audit">Get free audit</GlowButton>
          <Link className="ghost" to="/contact">
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
