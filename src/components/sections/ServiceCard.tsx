import { servicePath } from '../../config/site';
import type { Service } from '../../data/types';
import GlassCard from '../ui/GlassCard';
import Icon from '../ui/Icon';
import styles from './sections.module.css';

interface ServiceCardProps {
  service: Service;
  /** Large bento card: adds the summary. */
  large?: boolean;
  /** Show the first three features as bullets. */
  bullets?: boolean;
  className?: string;
}

/** One service as a single, fully clickable glass card. */
export default function ServiceCard({ service, large = false, bullets = false, className }: ServiceCardProps) {
  return (
    <GlassCard to={servicePath(service)} className={`${styles.serviceCard} ${large ? styles.large : ''} ${className ?? ''}`}>
      <span className={styles.iconTile}>
        <Icon name={service.icon} size={22} />
      </span>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardTagline}>{service.tagline}</p>
      {large && <p className={styles.cardSummary}>{service.summary}</p>}
      {bullets && (
        <ul className={styles.bullets}>
          {service.features.slice(0, 3).map((f) => (
            <li key={f.title}>
              <Icon name="check" size={14} />
              {f.title}
            </li>
          ))}
        </ul>
      )}
      <span className={styles.more}>
        Learn more <span aria-hidden="true">→</span>
      </span>
    </GlassCard>
  );
}
