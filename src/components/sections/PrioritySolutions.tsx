import { useServices } from '../../hooks/useServices';
import GlowButton from '../ui/GlowButton';
import SectionHeader from '../ui/SectionHeader';
import Section from './Section';
import ServiceCard from './ServiceCard';
import styles from './sections.module.css';

/** Home §2: the seven solutions as a bento grid, Cybersecurity and VAPT as the large cards. */
export default function PrioritySolutions() {
  const { data: solutions = [] } = useServices('solution');

  return (
    <Section id="solutions">
      <SectionHeader
        kicker="What we secure"
        title="Security-first solutions"
        sub="Seven solutions, ordered by what matters most to your risk."
      />
      <div className={styles.bento}>
        {solutions.map((s) => (
          <ServiceCard key={s.slug} service={s} large={s.is_featured} bullets className={s.is_featured ? styles.span2 : ''} />
        ))}
      </div>
      <div className={styles.actions}>
        <GlowButton to="/solutions">View all solutions</GlowButton>
      </div>
    </Section>
  );
}
