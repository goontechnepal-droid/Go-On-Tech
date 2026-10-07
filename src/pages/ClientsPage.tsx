import CtaBand from '../components/page/CtaBand';
import PageHero from '../components/page/PageHero';
import Seo from '../components/page/Seo';
import Section from '../components/sections/Section';
import ClientMark from '../components/ui/ClientMark';
import GlassCard from '../components/ui/GlassCard';
import Icon from '../components/ui/Icon';
import { industryLabel } from '../config/site';
import { useClients } from '../hooks/useClients';
import styles from './pages.module.css';

export default function ClientsPage() {
  const { data: clients = [] } = useClients();

  return (
    <>
      <Seo title="Clients" description="Organisations in government, healthcare, retail, manufacturing and finance that work with Go On Tech." />
      <PageHero
        crumbs={[{ label: 'Clients' }]}
        kicker="Trusted by"
        title="Our clients"
        sub="Organisations across government, healthcare, retail, manufacturing and finance."
      />
      <Section compact>
        <div className={styles.clientGrid}>
          {clients.map((c) => (
            <GlassCard key={c.slug} id={c.slug} className={styles.clientCard}>
              <h2 className={styles.clientLogo}>
                <ClientMark client={c} />
              </h2>
              <span className={styles.sector}>{industryLabel(c.sector)}</span>
              {c.website_url && (
                <a className={styles.site} href={c.website_url} target="_blank" rel="noopener">
                  Visit website <Icon name="external" size={15} />
                </a>
              )}
            </GlassCard>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
