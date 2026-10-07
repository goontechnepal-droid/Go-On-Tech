import { Link } from 'react-router-dom';
import logoUrl from '../../assets/logo.png';
import { mailtoUrl, servicePath, site, whatsappUrl } from '../../config/site';
import { useServices } from '../../hooks/useServices';
import Icon from '../ui/Icon';
import styles from './Footer.module.css';

const COMPANY_LINKS = [
  { label: 'Clients', to: '/clients' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Get a quote', to: '/quote' },
  { label: 'Free audit', to: '/get-audit' },
];

export default function Footer() {
  const { data: solutions = [] } = useServices('solution');
  const { data: hardware = [] } = useServices('hardware');
  const year = 2025;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link className={styles.logo} to="/" aria-label="Go On Tech: home">
            <img src={logoUrl} alt="Go On Tech" width={849} height={480} />
          </Link>
          <p>Cybersecurity, cloud, SaaS and secure card solutions from {site.location}.</p>
        </div>

        <nav aria-label="Solutions">
          <h2 className={styles.heading}>Solutions</h2>
          <ul>
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link to={servicePath(s)}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className={styles.heading}>Services</h2>
          <ul>
            {hardware.map((s) => (
              <li key={s.slug}>
                <Link to={servicePath(s)}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className={styles.heading}>Company</h2>
          <ul>
            {COMPANY_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <ul>
            <li>
              <a href={mailtoUrl}>{site.email}</a>
            </li>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener">
                WhatsApp {site.whatsapp}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.name}
        </p>
        <ul className={styles.legal}>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/terms">Terms</Link>
          </li>
          {site.social.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener" aria-label={s.label}>
                <Icon name={s.icon} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
