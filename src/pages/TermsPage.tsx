import PageHero from '../components/page/PageHero';
import Seo from '../components/page/Seo';
import Section from '../components/sections/Section';
import Icon from '../components/ui/Icon';
import { mailtoUrl, site } from '../config/site';
import styles from './pages.module.css';

/** Placeholder terms: must be reviewed (ideally by counsel) before the site is published. */
export default function TermsPage() {
  return (
    <>
      <Seo title="Terms" description="Terms of use for the Go On Tech Pvt. Ltd. website." noindex />
      <PageHero crumbs={[{ label: 'Terms' }]} kicker="Legal" title="Terms of use" />
      <Section compact>
        <div className={`${styles.narrow} ${styles.legal}`}>
          <p className={styles.draft} role="note">
            <Icon name="clipboard" size={18} />
            Draft: to be reviewed before publishing
          </p>
          <p>These terms apply to your use of the {site.name} website.</p>

          <h2>Using this website</h2>
          <p>
            The content on this website is provided for general information about our solutions and services. It is
            not an offer, and it does not replace a written proposal or agreement.
          </p>

          <h2>Quotes and audits</h2>
          <p>
            Requests sent through this website are enquiries. The scope, price and terms of any work are set out in
            the proposal or agreement we send you.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The Go On Tech name, logo and the content of this website belong to {site.name} unless stated
            otherwise. Client names are used to identify organisations we work with.
          </p>

          <h2>Liability</h2>
          <p>
            We take care to keep this website accurate and available, but we provide it without guarantees and are
            not liable for loss arising from its use, to the extent the law allows.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to <a href={mailtoUrl}>{site.email}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
