import AuditForm from '../components/forms/AuditForm';
import PageHero from '../components/page/PageHero';
import Seo from '../components/page/Seo';
import Section from '../components/sections/Section';
import GlassCard from '../components/ui/GlassCard';
import Icon from '../components/ui/Icon';
import styles from './pages.module.css';

const INCLUDED = [
  'A conversation about your systems, your concerns and what you need to protect',
  'A high-level review of the areas you choose to put in scope',
  'A short summary of the most important risks we see',
  'Recommended next steps, in priority order',
];

export default function AuditRequestPage() {
  return (
    <>
      <Seo title="Free Security Audit" description="Request a free security audit from Go On Tech: a first look at your risks and where to start." />
      <PageHero
        crumbs={[{ label: 'Free audit' }]}
        kicker="Get free audit"
        title="Free security audit"
        sub="A first look at where you stand and what to fix first. Tell us about your organisation and we will be in touch."
      />
      <Section compact>
        <div className={styles.columns}>
          <AuditForm />
          <GlassCard className={styles.included}>
            <h2>What&rsquo;s included</h2>
            <ul>
              {INCLUDED.map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>The exact scope is agreed with you after we receive your request.</p>
          </GlassCard>
        </div>
      </Section>
    </>
  );
}
