import { Link, useSearchParams } from 'react-router-dom';
import CtaBand from '../components/page/CtaBand';
import PageHero from '../components/page/PageHero';
import Seo from '../components/page/Seo';
import pageStyles from '../components/page/page.module.css';
import Section from '../components/sections/Section';
import ServiceCard from '../components/sections/ServiceCard';
import sectionStyles from '../components/sections/sections.module.css';
import { INDUSTRIES } from '../config/site';
import { useServicesByIndustry } from '../hooks/useServices';
import styles from './pages.module.css';

export default function SolutionsPage() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('industry');
  // ignore anything that is not one of the five known industries
  const industry = INDUSTRIES.some((i) => i.slug === raw) ? raw : null;
  const { data: solutions = [], isPending, isPlaceholderData } = useServicesByIndustry(industry, 'solution');

  const choose = (slug: string | null) => {
    setParams(slug ? { industry: slug } : {}, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <Seo
        title="Solutions"
        description="Cybersecurity, VAPT, cloud services, SaaS platforms, website monitoring, DevOps and IT & security audit from Go On Tech, Kathmandu."
      />
      <PageHero
        crumbs={[{ label: 'Solutions' }]}
        kicker="Solutions"
        title="Secure every layer"
        sub="Seven solutions in priority order, from threat detection to the audit you show your regulator."
      />
      <Section compact>
        <div className={styles.filters} role="group" aria-label="Filter by industry">
          <button
            type="button"
            className={`${pageStyles.chip} ${industry === null ? pageStyles.chipActive : ''}`}
            aria-pressed={industry === null}
            onClick={() => choose(null)}
          >
            All
          </button>
          {INDUSTRIES.map((i) => (
            <button
              key={i.slug}
              type="button"
              className={`${pageStyles.chip} ${industry === i.slug ? pageStyles.chipActive : ''}`}
              aria-pressed={industry === i.slug}
              onClick={() => choose(i.slug)}
            >
              {i.label}
            </button>
          ))}
        </div>

        {!isPending && !isPlaceholderData && solutions.length === 0 ? (
          <div className={styles.empty}>
            <p>No solutions tagged for this industry yet</p>
            <Link className="text-link" to="/contact">
              Tell us what you need <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <div className={sectionStyles.cards3} aria-live="polite">
            {solutions.map((s) => (
              <ServiceCard key={s.slug} service={s} bullets />
            ))}
          </div>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
