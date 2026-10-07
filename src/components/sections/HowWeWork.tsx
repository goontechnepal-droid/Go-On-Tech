import { STEPS } from '../../config/site';
import GlowButton from '../ui/GlowButton';
import SectionHeader from '../ui/SectionHeader';
import Section from './Section';
import Steps from './Steps';
import styles from './sections.module.css';

/** Home §5: Assess · Plan · Implement · Monitor & support. */
export default function HowWeWork() {
  return (
    <Section id="how-we-work">
      <SectionHeader kicker="Our approach" title="How we work" />
      <Steps steps={STEPS} />
      <div className={styles.actions}>
        <GlowButton to="/get-audit">Book a free audit</GlowButton>
      </div>
    </Section>
  );
}
