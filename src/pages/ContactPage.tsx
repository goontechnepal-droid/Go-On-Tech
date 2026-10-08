import ContactForm from '../components/forms/ContactForm';
import PageHero from '../components/page/PageHero';
import Seo from '../components/page/Seo';
import Section from '../components/sections/Section';
import GlassCard from '../components/ui/GlassCard';
import Icon from '../components/ui/Icon';
import { mailtoUrl, site, whatsappUrl } from '../config/site';
import styles from './pages.module.css';

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact" description="Contact Go On Tech Pvt. Ltd. in Kathmandu by form, email, phone or WhatsApp (+977 980-2347742)." />
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        kicker="Contact"
        title="Talk to us"
        sub="Tell us what you are working on. We will come back to you by email."
      />
      <Section compact>
        <div className={styles.columns}>
          <ContactForm />
          <div className={styles.contactCards}>
            <GlassCard className={styles.contactCard}>
              <span className={styles.contactIcon}>
                <Icon name="mail" />
              </span>
              <div>
                <h2>Email</h2>
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
            <GlassCard className={styles.contactCard}>
              <span className={styles.contactIcon}>
                <Icon name="pin" />
              </span>
              <div>
                <h2>Location</h2>
                <p>{site.location}</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>
    </>
  );
}
