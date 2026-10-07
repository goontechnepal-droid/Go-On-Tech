import { INDUSTRIES } from '../../config/site';
import GlassCard from '../ui/GlassCard';
import Icon from '../ui/Icon';
import SectionHeader from '../ui/SectionHeader';
import Section from './Section';
import styles from './sections.module.css';

/** Home §4: five industries, each linking to the solutions filtered for it. */
export default function Industries() {
  return (
    <Section id="industries">
      <SectionHeader kicker="Who we work with" title="Built for regulated industries" />
      <div className={styles.industries}>
        {INDUSTRIES.map((ind) => (
          <GlassCard key={ind.slug} to={`/solutions?industry=${ind.slug}`} className={styles.industry}>
            <span className={styles.iconTile}>
              <Icon name={ind.icon} size={22} />
            </span>
            <h3 className={styles.cardTitle}>{ind.label}</h3>
            <p className={styles.cardTagline}>{ind.blurb}</p>
            <span className={styles.more}>
              View solutions <span aria-hidden="true">→</span>
            </span>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
