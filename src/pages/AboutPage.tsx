import { Link } from 'react-router-dom';
import CtaBand from '../components/page/CtaBand';
import PageHero from '../components/page/PageHero';
import Seo from '../components/page/Seo';
import Section from '../components/sections/Section';
import Steps from '../components/sections/Steps';
import GlassCard from '../components/ui/GlassCard';
import Icon from '../components/ui/Icon';
import SectionHeader from '../components/ui/SectionHeader';
import { mailtoUrl, servicePath, site, STEPS, whatsappUrl } from '../config/site';
import { useServices } from '../hooks/useServices';
import styles from './pages.module.css';

export default function AboutPage() {
  const { data: solutions = [] } = useServices('solution');
  const { data: hardware = [] } = useServices('hardware');

  return (
    <>
      <Seo title="About" description="Go On Tech Pvt. Ltd. is a Kathmandu company providing cybersecurity, cloud, SaaS and secure card solutions." />
      <PageHero
        crumbs={[{ label: 'About' }]}
        kicker="Company"
        title="About Go On Tech"
        sub="Cybersecurity, cloud, SaaS and secure card solutions from Kathmandu, Nepal."
      />

      <Section compact>
        <div className={styles.narrow}>
          <SectionHeader align="left" kicker="The company" title="Who we are" />
          {/* TODO: client to supply. Placeholder built only from the confirmed brand facts:
              replace with the company's own story (history, team, mission). */}
          <p className={styles.body}>
            {site.name} is a technology company based in {site.location}. We help organisations protect their
            systems, run them reliably and issue secure cards and IDs, bringing security services, cloud and
            software, and card and scanning hardware together under one team.
          </p>
        </div>
      </Section>

      <Section compact>
        <SectionHeader kicker="Our work" title="What we do" />
        <div className={styles.split}>
          <GlassCard className={styles.splitCard}>
            <h3>Solutions</h3>
            <p>Security, cloud and software services, in the order that matters most to your risk.</p>
            <ul className={styles.linkList}>
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link to={servicePath(s)}>
                    <Icon name={s.icon} size={18} />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link className={styles.more} to="/solutions">
              All solutions <span aria-hidden="true">→</span>
            </Link>
          </GlassCard>
          <GlassCard className={styles.splitCard}>
            <h3>Hardware &amp; card services</h3>
            <p>Printers, issuance systems and devices for banks, offices and supermarkets.</p>
            <ul className={styles.linkList}>
              {hardware.map((s) => (
                <li key={s.slug}>
                  <Link to={servicePath(s)}>
                    <Icon name={s.icon} size={18} />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link className={styles.more} to="/services">
              All services <span aria-hidden="true">→</span>
            </Link>
          </GlassCard>
        </div>
      </Section>

      <Section compact>
        <SectionHeader kicker="Our approach" title="How we work" />
        <Steps steps={STEPS} />
      </Section>

      <Section compact>
        <SectionHeader kicker="Find us" title="Where we are" />
        <div className={`${styles.contactCards} ${styles.narrow}`}>
          <GlassCard className={styles.contactCard}>
            <span className={styles.contactIcon}>
              <Icon name="pin" />
            </span>
            <div>
              <h3>Location</h3>
              <p>{site.location}</p>
            </div>
          </GlassCard>
          <GlassCard className={styles.contactCard}>
            <span className={styles.contactIcon}>
              <Icon name="mail" />
            </span>
            <div>
              <h3>Email</h3>
              <p>
                <a className="text-link" href={mailtoUrl}>
                  {site.email}
                </a>
              </p>
            </div>
          </GlassCard>
          <GlassCard className={styles.contactCard}>
            <span className={styles.contactIcon}>
              <Icon name="chat" />
            </span>
            <div>
              <h3>WhatsApp</h3>
              <p>
                <a className="text-link" href={whatsappUrl} target="_blank" rel="noopener">
                  {site.whatsapp}
                </a>
              </p>
            </div>
          </GlassCard>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
