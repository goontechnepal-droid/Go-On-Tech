import CtaBand from '../components/page/CtaBand';
import PageHero from '../components/page/PageHero';
import Seo from '../components/page/Seo';
import Section from '../components/sections/Section';
import ServiceCard from '../components/sections/ServiceCard';
import sectionStyles from '../components/sections/sections.module.css';
import GlowButton from '../components/ui/GlowButton';
import { useServices } from '../hooks/useServices';

export default function ServicesPage() {
  const { data: services = [] } = useServices('hardware');

  return (
    <>
      <Seo
        title="Hardware & Card Services"
        description="Card printers, financial card printing, instant card issuance, ID card software, label printers, PDA devices and barcode readers from Go On Tech, Kathmandu."
      />
      <PageHero
        crumbs={[{ label: 'Services' }]}
        kicker="Hardware & card services"
        title="Print, issue, scan"
        sub="Card printers, issuance systems and scanning devices for banks, offices and supermarkets, installed and supported by our team."
      >
        <GlowButton to="/quote">Get a quote</GlowButton>
      </PageHero>
      <Section id="hardware" compact>
        <div className={sectionStyles.cards3}>
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} bullets />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
