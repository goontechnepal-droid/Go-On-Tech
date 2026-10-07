import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../../assets/logo.png';
import { useClients } from '../../hooks/useClients';
import ClientMark from '../ui/ClientMark';
import Icon, { type IconName } from '../ui/Icon';

/** OPTIONAL banner photo for the mock (21:9, subject on the RIGHT, empty left third). */
const HERO_BANNER_URL = '';

const MOCK_CARDS: { tag: string; icon: IconName; title: string; detail: string; to: string }[] = [
  { tag: '01', icon: 'shield', title: 'Cybersecurity', detail: 'Threat detection · SOC', to: '/solutions/cybersecurity' },
  { tag: '02', icon: 'cloud', title: 'Cloud Services', detail: 'Migration · Hosting', to: '/solutions/cloud-services' },
  { tag: '03', icon: 'window', title: 'SaaS Platforms', detail: 'Build · Scale', to: '/solutions/saas-platforms' },
  { tag: '04', icon: 'pulse', title: 'Monitoring & DevOps', detail: 'Uptime · CI/CD', to: '/solutions/website-monitoring' },
];

const MOCK_STRIP: { label: string; to: string }[] = [
  { label: 'Bank & instant card printing', to: '/services/financial-card-printing' },
  { label: 'ID cards + software', to: '/services/id-card-customization' },
  { label: 'Label printers & PDA', to: '/services/label-printers' },
  { label: 'Barcode readers · banks & retail', to: '/services/barcode-readers' },
];

/* The mock is a picture of the Solutions page that bleeds off the bottom of the hero.
   Its links work for the pointer, but it is hidden from assistive tech and kept out of
   the tab order: most of it is clipped off-screen, and every destination is reachable
   from the nav and the sections below. */
const OFF = { tabIndex: -1 } as const;

export default function BrowserMock() {
  const { data: clients = [] } = useClients();
  const [bannerBroken, setBannerBroken] = useState(false);

  return (
    <div className="browser" aria-hidden="true">
      <div className="bar">
        <div className="dots3">
          <i /><i /><i />
        </div>
        <div className="omni">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
          </svg>
          <span>goon.com.np · Solutions</span>
        </div>
        <div className="tools">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4m0 0L8 8m4-4 4 4" /><path d="M4 15v5h16v-5" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
            <path d="M12 3 3 8l9 5 9-5-9-5Z" fill="currentColor" opacity=".95" /><path d="M3 13l9 5 9-5" fill="none" opacity=".55" />
          </svg>
        </div>
      </div>

      <div className="page">
        <div className="ann">
          <u style={{ left: 20 }}>&#8249;</u>
          <span>24/7 security operations · Kathmandu, Nepal</span>
          <u style={{ right: 20 }}>&#8250;</u>
        </div>
        <div className="shoplogo"><img src={logoUrl} alt="" /></div>
        <div className="shopicons">
          <Icon name="search" strokeWidth={2} />
          <Icon name="user" strokeWidth={2} />
          <Icon name="mail" strokeWidth={2} />
        </div>

        <div className="pagebody">
          <div className="pghero">
            <svg className="art" viewBox="0 0 300 158" preserveAspectRatio="xMidYMid slice">
              <path className="s-pri" strokeOpacity=".4" strokeWidth=".8" fill="none" d="M20 30 60 70 40 120M60 70 95 25 150 50 110 100 60 70M110 100 140 135 170 110 200 90 150 50 190 20 245 55 200 90 235 130 285 100 245 55 280 25 190 20M95 25 20 30M140 135 40 120M170 110 235 130M110 100 170 110M285 100 280 25" />
              <g className="f-pri">
                <circle cx="20" cy="30" r="2.4" opacity=".6" /><circle cx="60" cy="70" r="3.4" opacity=".85" />
                <circle cx="40" cy="120" r="2.2" opacity=".5" /><circle cx="95" cy="25" r="3" opacity=".8" />
                <circle cx="110" cy="100" r="3.6" opacity=".9" /><circle cx="150" cy="50" r="2.6" opacity=".7" />
                <circle cx="140" cy="135" r="2.4" opacity=".6" /><circle cx="190" cy="20" r="3.2" opacity=".85" />
                <circle cx="200" cy="90" r="4" opacity=".9" /><circle cx="235" cy="130" r="2.6" opacity=".65" />
                <circle cx="245" cy="55" r="3.4" opacity=".8" /><circle cx="280" cy="25" r="2.2" opacity=".5" />
                <circle cx="285" cy="100" r="3" opacity=".7" /><circle cx="170" cy="110" r="2.8" opacity=".75" />
              </g>
              <path className="s-deep" d="M150 32 117 45v31c0 23 13.5 41 33 49.5 19.5-8.5 33-26.5 33-49.5V45L150 32Z" fill="rgba(255,255,255,.7)" strokeWidth="2" strokeLinejoin="round" />
              <path className="s-pri" d="M137 78l9 9 17-18" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {HERO_BANNER_URL && !bannerBroken && (
              <img className="banner" alt="" src={HERO_BANNER_URL} onError={() => setBannerBroken(true)} />
            )}
            <div className="scrim" />
            <div className="copy">
              <u>Security first</u>
              <em>Protect what runs<br />your business.</em>
              <Link className="pill" to="/get-audit" {...OFF}>BOOK A FREE AUDIT</Link>
            </div>
          </div>

          <div className="pgsec">
            <b>Priority solutions</b>
            <Link to="/solutions" {...OFF}>see all</Link>
          </div>
          <div className="pggrid">
            {MOCK_CARDS.map((c) => (
              <Link key={c.tag} className="pgcard" to={c.to} {...OFF}>
                <div className="ph">
                  <Icon name={c.icon} />
                  <span className="tag">{c.tag}</span>
                </div>
                <b>{c.title}</b>
                <i>{c.detail}</i>
                <s>Learn more →</s>
              </Link>
            ))}
          </div>

          <div className="pgclients">
            <u>Trusted by</u>
            <div className="row">
              {clients.map((c) => (
                <Link key={c.slug} className="logo" to={`/clients#${c.slug}`} {...OFF}>
                  <ClientMark client={c} />
                </Link>
              ))}
            </div>
          </div>

          <div className="pgstrip">
            {MOCK_STRIP.map((s) => (
              <Link key={s.to} to={s.to} {...OFF}>{s.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
