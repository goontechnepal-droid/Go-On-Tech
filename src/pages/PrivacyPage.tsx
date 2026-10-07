import PageHero from '../components/page/PageHero';
import Seo from '../components/page/Seo';
import Section from '../components/sections/Section';
import Icon from '../components/ui/Icon';
import { mailtoUrl, site } from '../config/site';
import styles from './pages.module.css';

/** Placeholder policy: must be reviewed (ideally by counsel) before the site is published. */
export default function PrivacyPage() {
  return (
    <>
      <Seo title="Privacy" description="How Go On Tech Pvt. Ltd. handles information submitted through this website." noindex />
      <PageHero crumbs={[{ label: 'Privacy' }]} kicker="Legal" title="Privacy policy" />
      <Section compact>
        <div className={`${styles.narrow} ${styles.legal}`}>
          <p className={styles.draft} role="note">
            <Icon name="clipboard" size={18} />
            Draft: to be reviewed before publishing
          </p>
          <p>
            This page explains how {site.name} (&ldquo;we&rdquo;) handles information you give us through this
            website.
          </p>

          <h2>Information we collect</h2>
          <p>We collect the information you choose to send us through the contact, audit and quote forms:</p>
          <ul>
            <li>your name, email address and phone number;</li>
            <li>your company or organisation;</li>
            <li>the services you are interested in and any message or details you add.</li>
          </ul>

          <h2>How we use it</h2>
          <p>
            We use this information only to respond to your request, prepare an audit or quotation, and stay in
            touch about that request.
          </p>

          <h2>Sharing</h2>
          <p>
            We do not sell your information. Form submissions are stored with our hosting and database providers
            so that we can read and answer them.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to correct or delete the information you have sent us by emailing{' '}
            <a href={mailtoUrl}>{site.email}</a>.
          </p>

          <h2>Contact</h2>
          <p>
            {site.name}, {site.location}. Email: <a href={mailtoUrl}>{site.email}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
