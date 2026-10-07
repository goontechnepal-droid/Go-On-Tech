import { Link } from 'react-router-dom';
import { useClients } from '../../hooks/useClients';
import ClientMark from '../ui/ClientMark';
import SectionHeader from '../ui/SectionHeader';
import Section from './Section';
import styles from './sections.module.css';

/** Home §6: a 3 x 2 grid of client tiles (logo when uploaded, otherwise the name). */
export default function ClientsSection() {
  const { data: clients = [] } = useClients();

  return (
    <Section id="clients">
      <SectionHeader kicker="Our clients" title="Trusted by" />
      <div className={styles.clients}>
        {clients.map((c) => (
          <Link key={c.slug} className={styles.clientTile} to={`/clients#${c.slug}`}>
            <ClientMark client={c} />
          </Link>
        ))}
      </div>
      <div className={styles.actions}>
        <Link className="text-link" to="/clients">
          See all clients <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
