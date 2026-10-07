import { useServices } from '../../hooks/useServices';
import GlowButton from '../ui/GlowButton';
import SectionHeader from '../ui/SectionHeader';
import Section from './Section';
import ServiceCard from './ServiceCard';
import styles from './sections.module.css';

/** Home §3: the seven hardware & card services in a 4 / 3 grid. */
export default function HardwareSolutions() {
  const { data: services = [] } = useServices('hardware');

  return (
    <Section id="hardware">
      <SectionHeader
        kicker="Hardware + software"
        title="Card, ID and scanning solutions"
        sub="Printers, issuance systems and devices, installed and supported by our team."
      />
      <div className={styles.grid43}>
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
      <div className={styles.actions}>
        <GlowButton to="/services">View all services</GlowButton>
      </div>
    </Section>
  );
}
