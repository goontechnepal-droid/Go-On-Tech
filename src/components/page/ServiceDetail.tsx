import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_LABEL, CATEGORY_PATH, industryLabel } from '../../config/site';
import type { Faq, Service } from '../../data/types';
import { Creative, CreativeDefs, creativeForSlug } from '../hero/cardCreatives';
import Section from '../sections/Section';
import ServiceCard from '../sections/ServiceCard';
import Steps from '../sections/Steps';
import sectionStyles from '../sections/sections.module.css';
import GlassCard from '../ui/GlassCard';
import GlowButton from '../ui/GlowButton';
import Icon from '../ui/Icon';
import SectionHeader from '../ui/SectionHeader';
import CtaBand from './CtaBand';
import PageHero from './PageHero';
import Seo from './Seo';
import styles from './page.module.css';

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`${styles.faq} ${open ? styles.faqOpen : ''}`}>
      <h3>
        <button
          id={`${id}-btn`}
          type="button"
          className={styles.faqButton}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((o) => !o)}
        >
          <span>{faq.q}</span>
          <Icon name="chevron" size={18} />
        </button>
      </h3>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} className={styles.faqPanel} hidden={!open}>
        <p>{faq.a}</p>
      </div>
    </div>
  );
}

interface ServiceDetailProps {
  service: Service;
  /** Three other items from the same category. */
  related: Service[];
}

/** Shared template for every solution and service detail page. */
export default function ServiceDetail({ service, related }: ServiceDetailProps) {
  const indexPath = CATEGORY_PATH[service.category];
  const paragraphs = service.description.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <Seo title={service.title} description={service.summary} />
      <PageHero
        crumbs={[{ label: service.category === 'solution' ? 'Solutions' : 'Services', to: indexPath }, { label: service.title }]}
        kicker={CATEGORY_LABEL[service.category]}
        title={service.title}
        sub={service.tagline}
      >
        <GlowButton to={`/quote?service=${service.slug}`}>Get a quote</GlowButton>
        <Link className="ghost" to="/contact">
          Talk to us
        </Link>
      </PageHero>

      {/* 2. Overview */}
      <Section compact>
        <div className={styles.overview}>
          <div>
            <SectionHeader align="left" kicker="Overview" title="What it is" />
            <p className={styles.lead}>{service.summary}</p>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className={styles.prose}>
                {p}
              </p>
            ))}
          </div>
          <div className={styles.illustration} aria-hidden="true">
            <CreativeDefs />
            <div className={styles.illustrationCard}>
              <div className="card card--static">
                <Creative creative={creativeForSlug(service.slug)} />
                <div className="edge" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Key features */}
      <Section compact>
        <SectionHeader kicker="Key features" title="What is included" />
        <div className={sectionStyles.cards3}>
          {service.features.map((f) => (
            <GlassCard key={f.title}>
              <span className={sectionStyles.iconTile}>
                <Icon name="check" size={20} />
              </span>
              <h3 className={sectionStyles.cardTitle}>{f.title}</h3>
              <p className={sectionStyles.cardTagline}>{f.body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* 4. How it works */}
      <Section compact>
        <SectionHeader kicker="Process" title="How it works" />
        <Steps steps={service.process} />
      </Section>

      {/* 5. What you get + 6. Industries */}
      <Section compact>
        <div className={styles.twoCol}>
          <div>
            <SectionHeader align="left" kicker="Deliverables" title="What you get" />
            <ul className={styles.checklist}>
              {service.deliverables.map((d) => (
                <li key={d}>
                  <Icon name="check" size={16} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader align="left" kicker="Industries" title="Who it is for" />
            <ul className={styles.chips}>
              {service.industries.map((slug) => (
                <li key={slug}>
                  <Link className={styles.chip} to={`/solutions?industry=${slug}`}>
                    {industryLabel(slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 7. FAQs */}
      {service.faqs.length > 0 && (
        <Section compact>
          <SectionHeader kicker="FAQs" title="Common questions" />
          <div className={styles.faqs}>
            {service.faqs.map((faq) => (
              <FaqItem key={faq.q} faq={faq} />
            ))}
          </div>
        </Section>
      )}

      {/* 8. Related */}
      {related.length > 0 && (
        <Section compact>
          <SectionHeader kicker="Related" title={service.category === 'solution' ? 'More solutions' : 'More services'} />
          <div className={sectionStyles.cards3}>
            {related.map((r) => (
              <ServiceCard key={r.slug} service={r} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}

/** Loading placeholder with the same rough shape as the page. */
export function ServiceDetailSkeleton() {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label="Loading">
      <div className={`container ${styles.skeletonInner}`}>
        <div className={styles.bone} style={{ width: 140, height: 34 }} />
        <div className={styles.bone} style={{ width: 'min(520px,80%)', height: 56 }} />
        <div className={styles.bone} style={{ width: 'min(380px,70%)', height: 20 }} />
        <div className={styles.skeletonGrid}>
          <div className={styles.bone} style={{ height: 180 }} />
          <div className={styles.bone} style={{ height: 180 }} />
          <div className={styles.bone} style={{ height: 180 }} />
        </div>
      </div>
    </div>
  );
}
