import { useSearchParams } from 'react-router-dom';
import QuoteForm from '../components/forms/QuoteForm';
import PageHero from '../components/page/PageHero';
import Seo from '../components/page/Seo';
import Section from '../components/sections/Section';
import GlassCard from '../components/ui/GlassCard';
import Icon from '../components/ui/Icon';
import { mailtoUrl, site, whatsappUrl } from '../config/site';
import styles from './pages.module.css';

export default function QuotePage() {
  const [params] = useSearchParams();
  const preselect = params.get('service');

  return (
    <>
      <Seo title="Request a Quote" description="Request a quote from Go On Tech for security services, cloud, software, card printing and scanning hardware." />
      <PageHero
        crumbs={[{ label: 'Quote' }]}
        kicker="Get a quote"
        title="Request a quote"
        sub="Choose the services you are interested in and tell us a little about what you need."
      />
      <Section compact>
        <div className={styles.columns}>
          {/* keyed so arriving with a different ?service= re-seeds the ticked boxes */}
          <QuoteForm key={preselect ?? 'none'} preselect={preselect} />
          <div className={styles.contactCards}>
            <GlassCard className={styles.contactCard}>
              <span className={styles.contactIcon}>
                <Icon name="mail" />
              </span>
              <div>
                <h2>Prefer email?</h2>
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
                <h2>WhatsApp &amp; Phone</h2>
                <p>
                  <a className="text-link" href={whatsappUrl} target="_blank" rel="noopener">
                    {site.whatsapp}
                  </a>
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>
    </>
  );
}
