import Hero from '../components/hero/Hero';
import CtaBand from '../components/page/CtaBand';
import Seo from '../components/page/Seo';
import ClientsSection from '../components/sections/ClientsSection';
import HardwareSolutions from '../components/sections/HardwareSolutions';
import HowWeWork from '../components/sections/HowWeWork';
import Industries from '../components/sections/Industries';
import PrioritySolutions from '../components/sections/PrioritySolutions';

export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <PrioritySolutions />
      <HardwareSolutions />
      <Industries />
      <HowWeWork />
      <ClientsSection />
      <CtaBand />
    </>
  );
}
