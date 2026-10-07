import { useState, type CSSProperties, type ReactNode } from 'react';

/* =====================================================================
   THE TEN CARD CREATIVES (Appendix A §7), in solution-priority order.
   Light theme: every card is white or a pale tint of a logo colour, with
   slate line work and orange accents. One card (DevOps) is a solid block
   of the logo orange. All art is CSS + inline SVG.
   `url` is an OPTIONAL photo slot (portrait 2:3 or 9:16): when present it
   is drawn above the SVG art, and falls back to the art if it fails.
   ===================================================================== */

export type CreativeKey =
  | 'cyber' | 'vapt' | 'cloud' | 'saas' | 'monitor' | 'devops' | 'audit' | 'card' | 'id' | 'pda';

export interface Shot {
  key: CreativeKey;
  /** Used for the card's accessible name. */
  title: string;
  to: string;
  url?: string;
}

export const SHOTS: Shot[] = [
  { key: 'cyber', title: 'Cybersecurity', to: '/solutions/cybersecurity' },
  { key: 'vapt', title: 'VAPT', to: '/solutions/vapt' },
  { key: 'cloud', title: 'Cloud Services', to: '/solutions/cloud-services' },
  { key: 'saas', title: 'SaaS Platforms', to: '/solutions/saas-platforms' },
  { key: 'monitor', title: 'Website Monitoring', to: '/solutions/website-monitoring' },
  { key: 'devops', title: 'DevOps', to: '/solutions/devops' },
  { key: 'audit', title: 'IT & Security Audit', to: '/solutions/it-audit' },
  { key: 'card', title: 'Financial Card Printing', to: '/services/financial-card-printing' },
  { key: 'id', title: 'ID Card Solutions', to: '/services/id-card-customization' },
  { key: 'pda', title: 'Label printers, PDA devices and barcode readers', to: '/services#hardware' },
];

/** Which creative illustrates a given service slug (detail-page overview panel). */
const SLUG_CREATIVE: Record<string, CreativeKey> = {
  cybersecurity: 'cyber',
  vapt: 'vapt',
  'cloud-services': 'cloud',
  'saas-platforms': 'saas',
  'website-monitoring': 'monitor',
  devops: 'devops',
  'it-audit': 'audit',
  'card-printers': 'card',
  'financial-card-printing': 'card',
  'instant-card-issuance': 'card',
  'id-card-customization': 'id',
  'label-printers': 'pda',
  'pda-devices': 'pda',
  'barcode-readers': 'pda',
};

export function creativeForSlug(slug: string): CreativeKey {
  return SLUG_CREATIVE[slug] ?? 'cyber';
}

/** Shared gradient defs: render ONCE per page that shows any creative. */
export function CreativeDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/* the bank card carries both logo colours */}
        <linearGradient id="bankCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--brand-primary)' }} />
          <stop offset="1" style={{ stopColor: 'var(--brand-deep)' }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Photo({ url }: { url?: string }) {
  const [broken, setBroken] = useState(false);
  if (!url || broken) return null;
  return <img alt="" src={url} onError={() => setBroken(true)} />;
}

const ORANGE = 'var(--brand-primary)';
const SLATE = 'var(--brand-deep)';
const MUTED = 'var(--text-muted)';
const FADE_UP = 'linear-gradient(180deg,rgba(255,255,255,0) 32%,rgba(255,255,255,.78) 50%,#fff 70%)';
const FADE_DOWN = 'linear-gradient(180deg,rgba(255,255,255,.97),rgba(255,255,255,0) 32%)';

const kicker: CSSProperties = { top: 20, textAlign: 'right', fontSize: 3.4, letterSpacing: '.15em', color: MUTED };
const bullets: CSSProperties = { top: 76, fontSize: 5.2, fontWeight: 700, lineHeight: 1.7, color: SLATE };

/** Barcode: bars of varied width with 1.3px gaps. */
function Bars({ x, y, h, widths }: { x: number; y: number; h: number; widths: number[] }) {
  const rects: ReactNode[] = [];
  let cx = x;
  widths.forEach((w, i) => {
    rects.push(<rect key={i} x={cx.toFixed(1)} y={y} width={w} height={h} />);
    cx += w + 1.3;
  });
  return (
    <g className="f-deep" fillOpacity=".85">
      {rects}
    </g>
  );
}

function Cyber({ url }: { url?: string }) {
  const shieldPath = 'M65 30 29 44v36c0 27 15.5 48 36 58 20.5-10 36-31 36-58V44L65 30Z';
  return (
    <>
      <div className="fill" style={{ background: 'linear-gradient(170deg,#fff,var(--tint-s-2))' }} />
      <div className="ph" style={{ top: 112, bottom: 0 }}>
        <svg viewBox="0 0 130 188" aria-hidden="true">
          <path className="s-deep" strokeOpacity=".3" d="M65 88 12 22M65 88 118 30M65 88 6 96M65 88 124 104M65 88 20 170M65 88 112 166" fill="none" strokeWidth="1" strokeDasharray="1.5 3.5" strokeLinecap="round" />
          <g className="f-deep" fillOpacity=".3">
            <circle cx="12" cy="22" r="3" /><circle cx="118" cy="30" r="2.5" /><circle cx="6" cy="96" r="2.5" />
            <circle cx="124" cy="104" r="3" /><circle cx="20" cy="170" r="2.5" /><circle cx="112" cy="166" r="3" />
          </g>
          <path className="f-white" d={shieldPath} />
          <path className="s-pri f-pri" fillOpacity=".08" d={shieldPath} strokeWidth="2.4" strokeLinejoin="round" />
          <g className="s-deep" fill="none" strokeWidth="2" strokeLinecap="round">
            <rect x="52" y="80" width="26" height="21" rx="3" />
            <path d="M57 80v-7a8 8 0 0 1 16 0v7" />
          </g>
          <circle className="f-deep" cx="65" cy="90.5" r="2.2" />
        </svg>
        <Photo url={url} />
      </div>
      <div className="cv" style={kicker}>SOLUTION 01</div>
      <div className="cv t-big" style={{ top: 32, fontSize: 14, color: SLATE }}>Cyber</div>
      <div className="cv t-big" style={{ top: 47, fontSize: 14, color: ORANGE }}>Security</div>
      <div className="cv" style={bullets}>
        <div><b className="dot" />THREAT <b>DETECTION</b></div>
        <div style={{ marginTop: 8 }}>
          <b className="dot sq" />24/7 <b>MONITORING</b><br />
          <span style={{ marginLeft: 11 }}>&amp; RESPONSE</span>
        </div>
      </div>
    </>
  );
}

function Vapt({ url }: { url?: string }) {
  return (
    <>
      <div className="fill" style={{ background: 'linear-gradient(175deg,var(--tint-o-1),var(--tint-o-2))' }} />
      <div className="ph" style={{ top: 118, bottom: 0 }}>
        <svg className="s-pri" viewBox="0 0 130 182" aria-hidden="true" fill="none" strokeWidth="7" strokeLinecap="square" opacity=".95">
          <circle cx="65" cy="80" r="34" /><circle cx="65" cy="80" r="16" />
          <path d="M65 30v26M65 104v26M15 80h26M89 80h26" />
        </svg>
        <Photo url={url} />
      </div>
      <div className="cv" style={kicker}>PENETRATION TESTING</div>
      <div className="cv t-big" style={{ top: 32, fontSize: 14, color: SLATE }}>VAPT</div>
      <div className="cv t-big" style={{ top: 47, fontSize: 14, color: ORANGE }}>Find it first</div>
      <div className="cv" style={bullets}>
        <div><b className="dot" />WEB · MOBILE · <b>NETWORK</b></div>
        <div style={{ marginTop: 8 }}>
          <b className="dot sq" />DETAILED <b>REPORTS</b><br />
          <span style={{ marginLeft: 11 }}>&amp; REMEDIATION</span>
        </div>
      </div>
    </>
  );
}

function Cloud({ url }: { url?: string }) {
  return (
    <>
      <div className="fill" style={{ background: 'linear-gradient(168deg,#fff,var(--tint-s-2) 55%,var(--tint-s-3))' }} />
      <div className="ph" style={{ top: 100, bottom: 0 }}>
        <svg viewBox="0 0 130 200" aria-hidden="true">
          <g transform="translate(0 22)">
            <path className="s-deep f-white" d="M36 78a19 19 0 0 1 2-38 27 27 0 0 1 51-8 23 23 0 0 1 5 46Z" strokeWidth="2.2" strokeLinejoin="round" />
            <path className="s-pri" d="M65 80v16" strokeWidth="1.6" strokeDasharray="2 3" strokeLinecap="round" />
            <g className="s-deep f-white" strokeWidth="1.6">
              <rect x="33" y="98" width="64" height="18" rx="4" /><rect x="33" y="122" width="64" height="18" rx="4" /><rect x="33" y="146" width="64" height="18" rx="4" />
            </g>
            <g className="f-pri">
              <circle cx="42" cy="107" r="2" /><circle cx="49" cy="107" r="2" /><circle cx="42" cy="131" r="2" />
              <circle cx="49" cy="131" r="2" /><circle cx="42" cy="155" r="2" /><circle cx="49" cy="155" r="2" />
            </g>
            <path className="s-deep" strokeOpacity=".6" d="M70 107h19M70 131h19M70 155h19" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </svg>
        <Photo url={url} />
        <div className="fill" style={{ background: FADE_DOWN }} />
      </div>
      <div className="cv t-serif" style={{ top: 36, fontSize: 17, color: SLATE }}>CLOUD</div>
      <div className="cv t-serif" style={{ top: 55, fontSize: 17, color: ORANGE }}>SERVICES</div>
    </>
  );
}

function Saas({ url }: { url?: string }) {
  return (
    <>
      <div className="fill" style={{ background: '#fff' }} />
      <div className="ph" style={{ top: 0, height: 148, background: 'linear-gradient(160deg,var(--tint-s-1),var(--tint-s-2))' }}>
        <svg viewBox="0 0 130 148" aria-hidden="true">
          <rect className="f-white" x="10" y="12" width="110" height="9" rx="2.5" />
          <circle className="f-pri" cx="15.5" cy="16.5" r="1.5" />
          <rect className="f-deep" fillOpacity=".2" x="94" y="15" width="22" height="3" rx="1.5" />
          <g className="f-white">
            <rect x="10" y="27" width="52" height="20" rx="3" /><rect x="68" y="27" width="52" height="20" rx="3" />
          </g>
          <g className="f-deep" fillOpacity=".3">
            <rect x="15" y="32" width="18" height="2.5" rx="1" /><rect x="73" y="32" width="14" height="2.5" rx="1" />
          </g>
          <g className="f-deep">
            <rect x="15" y="38" width="28" height="4" rx="1" /><rect x="73" y="38" width="22" height="4" rx="1" />
          </g>
          <path className="s-deep" strokeOpacity=".1" d="M10 62h110M10 76h110" strokeWidth="1" />
          <polyline className="s-pri" points="12,84 28,72 44,78 60,60 76,66 92,54 118,58" fill="none" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
          <circle className="f-pri" cx="92" cy="54" r="2.4" />
          <g className="f-pri">
            <rect x="36" y="104" width="12" height="32" rx="1.5" /><rect x="76" y="98" width="12" height="38" rx="1.5" />
          </g>
          <g className="f-deep" fillOpacity=".75">
            <rect x="16" y="116" width="12" height="20" rx="1.5" /><rect x="56" y="110" width="12" height="26" rx="1.5" />
          </g>
          <circle className="s-deep" strokeOpacity=".14" cx="106" cy="118" r="9" fill="none" strokeWidth="4" />
          <path className="s-pri" d="M106 109a9 9 0 0 1 8.6 11.6" fill="none" strokeWidth="4" />
          <path className="s-deep" strokeOpacity=".2" d="M10 136.5h110" strokeWidth="1" />
        </svg>
        <Photo url={url} />
      </div>
      <div className="cv" style={{ top: 158, fontSize: 5.4, fontWeight: 700, letterSpacing: '.09em', color: SLATE }}>SAAS PLATFORMS</div>
      <div className="cv" style={{ top: 168, fontSize: 4.2, color: MUTED }}>Build · Host · Scale</div>
      <div style={{ position: 'absolute', left: 10, top: 180, padding: '4px 11px', borderRadius: 20, background: ORANGE, fontSize: 4.6, fontWeight: 600, color: '#fff', letterSpacing: '.05em' }}>
        Launch today
      </div>
    </>
  );
}

function Monitor({ url }: { url?: string }) {
  return (
    <>
      <div className="fill" style={{ background: 'linear-gradient(180deg,#fff 30%,var(--tint-o-2))' }} />
      <div className="ph" style={{ top: 150, bottom: 0 }}>
        <svg viewBox="0 0 130 150" aria-hidden="true">
          <path className="s-deep" strokeOpacity=".1" d="M0 30h130M0 55h130M0 80h130M0 105h130M0 130h130" strokeWidth="1" />
          <path className="s-pri" d="M0 84h28l6-14 8 42 10-70 9 60 6-18h16l5-10 6 10h36" fill="none" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <Photo url={url} />
        <div className="fill" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,.9),rgba(255,255,255,0) 30%)' }} />
      </div>
      <div className="cv" style={{ top: 16, fontSize: 4.2, lineHeight: 1.7, color: MUTED, width: 74 }}>
        Uptime, SSL, speed and defacement checks: your team is alerted the moment a site misbehaves.
      </div>
      <div style={{ position: 'absolute', right: 10, top: 16, fontSize: 5.4, fontWeight: 600, color: ORANGE }}>✳ Go On</div>
      <div className="cv t-big" style={{ top: 96, fontSize: 22, color: SLATE }}>Monitor</div>
      <div className="cv" style={{ top: 122, fontSize: 5.2, fontWeight: 700, letterSpacing: '.12em', color: ORANGE }}>WEBSITES · 24/7</div>
    </>
  );
}

function DevOps({ url }: { url?: string }) {
  const lift = '0 2px 0 color-mix(in srgb,var(--brand-deep) 16%,transparent)';
  return (
    <>
      <div
        className="fill"
        style={{
          background:
            'linear-gradient(158deg,color-mix(in srgb,var(--brand-primary) 84%,#fff) 0%,var(--brand-primary) 52%,color-mix(in srgb,var(--brand-primary) 90%,var(--brand-deep)) 100%)',
        }}
      />
      <div className="ph" style={{ top: 140, bottom: 0, opacity: 0.4 }}>
        <svg viewBox="0 0 130 160" aria-hidden="true">
          <path className="s-white" d="M65 80c-10-14-20-22-32-22a22 22 0 0 0 0 44c12 0 22-8 32-22s20-22 32-22a22 22 0 0 1 0 44c-12 0-22-8-32-22Z" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <Photo url={url} />
      </div>
      <div className="fill" style={{ background: 'radial-gradient(44% 16% at 50% 62%, rgba(255,255,255,.4), rgba(255,255,255,0) 72%)' }} />
      <div style={{ position: 'absolute', left: -6, right: -6, top: 44, height: 13, background: '#fff', transform: 'rotate(-2.6deg)', boxShadow: '0 4px 12px color-mix(in srgb,var(--brand-deep) 18%,transparent)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 45.5, transform: 'rotate(-2.6deg)', textAlign: 'center', fontSize: 5.6, fontWeight: 700, letterSpacing: '.05em', color: ORANGE }}>
        BUILD · TEST · DEPLOY
      </div>
      <div className="cv t-big" style={{ top: 64, fontSize: 24, color: '#fff', textShadow: lift }}>Dev</div>
      <div className="cv t-big" style={{ top: 87, fontSize: 24, color: '#fff', textShadow: lift }}>Ops</div>
      <div className="cv t-big" style={{ top: 113, fontSize: 19, color: '#fff' }}>CI/CD</div>
    </>
  );
}

function Audit({ url }: { url?: string }) {
  const rows = [50, 67, 84, 101, 118];
  return (
    <>
      <div className="ph phf" style={{ background: 'linear-gradient(170deg,var(--tint-s-2),#fff 60%)' }}>
        <svg viewBox="0 0 130 300" aria-hidden="true">
          <rect className="f-white s-deep" strokeOpacity=".4" x="29" y="30" width="72" height="112" rx="6" strokeWidth="1.4" />
          <rect className="s-pri f-white" x="50" y="23" width="30" height="13" rx="3.5" strokeWidth="1.4" />
          <g className="s-pri" fill="none" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
            {rows.map((y) => (
              <rect key={y} x="38" y={y} width="9" height="9" rx="2" />
            ))}
            {rows.slice(0, 4).map((y) => (
              <path key={y} d={`M40 ${y + 4.5}l2 2 3.5-4`} />
            ))}
          </g>
          <path className="s-deep" strokeOpacity=".25" d="M54 54.5h38M54 71.5h30M54 88.5h36M54 105.5h26M54 122.5h33" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <Photo url={url} />
      </div>
      <div className="fill" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0) 36%,rgba(255,255,255,.8) 46%,#fff 56%)' }} />
      <div className="cv t-serif" style={{ top: 132, fontSize: 16, color: SLATE }}>IT &amp; SECURITY</div>
      <div className="cv t-serif" style={{ top: 150, fontSize: 16, color: ORANGE }}>AUDIT</div>
      <div className="cv" style={{ top: 171, fontSize: 4.4, letterSpacing: '.07em', color: MUTED }}>compliance you can show the regulator</div>
    </>
  );
}

function BankCard({ url }: { url?: string }) {
  const dots: ReactNode[] = [];
  for (let g = 0; g < 4; g++) {
    for (let j = 0; j < 4; j++) {
      dots.push(<circle key={`${g}-${j}`} cx={(33.5 + g * 18 + j * 3.4).toFixed(1)} cy="84" r="1.1" />);
    }
  }
  return (
    <>
      <div className="ph phf" style={{ background: 'linear-gradient(170deg,#fff,var(--tint-s-2))' }}>
        <svg viewBox="0 0 130 300" aria-hidden="true">
          <g transform="rotate(-12 65 76)">
            <rect x="23" y="49" width="84" height="54" rx="6" fill="url(#bankCard)" />
            <rect x="32" y="62" width="15" height="11" rx="2.2" fill="rgba(255,255,255,.9)" />
            <path className="s-pri" strokeOpacity=".7" d="M32 67.5h15M39.5 62v11" strokeWidth=".8" />
            <path d="M54 63.5a6 6 0 0 1 0 8M58 61a10 10 0 0 1 0 13M62 58.5a14 14 0 0 1 0 18" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.3" strokeLinecap="round" />
            <g fill="rgba(255,255,255,.9)">{dots}</g>
            <rect x="32" y="91" width="30" height="2.6" rx="1.3" fill="rgba(255,255,255,.55)" />
            <circle cx="92" cy="92" r="5" fill="rgba(255,255,255,.4)" /><circle cx="98" cy="92" r="5" fill="rgba(255,255,255,.25)" />
          </g>
        </svg>
        <Photo url={url} />
      </div>
      <div className="fill" style={{ background: FADE_UP }} />
      <div className="cv t-big" style={{ top: 126, fontSize: 10, color: SLATE }}>Bank cards ·</div>
      <div className="cv t-big" style={{ top: 139, fontSize: 22, color: ORANGE }}>Instant</div>
    </>
  );
}

function Plain({ art, caption, url }: { art: 'id' | 'pda'; caption: string; url?: string }) {
  return (
    <>
      {art === 'id' ? (
        <div className="ph phf" style={{ background: 'linear-gradient(160deg,var(--tint-o-2),#fff 70%)' }}>
          <svg viewBox="0 0 130 300" aria-hidden="true">
            <path className="s-pri" d="M52 0 63 28M78 0 67 28" strokeWidth="3" />
            <rect className="f-white s-deep" strokeOpacity=".5" x="59" y="26" width="12" height="12" rx="2.5" strokeWidth="1.4" />
            <rect className="f-white s-deep" strokeOpacity=".35" x="25" y="38" width="80" height="100" rx="7" strokeWidth="1.4" />
            <rect className="f-deep" fillOpacity=".12" x="56" y="44" width="18" height="4" rx="2" />
            <rect className="s-pri f-pri" fillOpacity=".12" x="34" y="57" width="28" height="30" rx="3" strokeWidth="1.4" />
            <circle className="f-pri" cx="48" cy="68" r="5" />
            <path className="f-pri" d="M38.5 86.3c1-6.5 4.5-9.3 9.5-9.3s8.5 2.8 9.5 9.3Z" />
            <path className="s-deep" strokeOpacity=".45" d="M69 62h27M69 71h22M69 80h17" strokeWidth="2.4" strokeLinecap="round" />
            <Bars x={34} y={98} h={16} widths={[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2]} />
            <path className="s-deep" strokeOpacity=".25" d="M34 124h44" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <Photo url={url} />
        </div>
      ) : (
        <div className="ph phf" style={{ background: 'linear-gradient(160deg,var(--tint-s-2),#fff 70%)' }}>
          <svg viewBox="0 0 130 300" aria-hidden="true">
            <path className="s-pri f-pri" fillOpacity=".15" d="M24 34v-6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v6" strokeWidth="1.4" />
            <rect className="f-white s-deep" strokeOpacity=".6" x="18" y="34" width="40" height="92" rx="7" strokeWidth="1.6" />
            <rect className="s-pri f-pri" fillOpacity=".1" x="23.5" y="41" width="29" height="38" rx="2.5" strokeWidth="1.2" />
            <path className="s-deep" strokeOpacity=".4" d="M28 50h14M28 56h20M28 62h10" strokeWidth="1.6" strokeLinecap="round" />
            <g className="f-deep" fillOpacity=".4">
              {[90, 100, 110].map((cy) => [29, 38, 47].map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" />))}
            </g>
            <Bars x={70} y={44} h={74} widths={[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2]} />
            <path className="s-pri" d="M64 80h56" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <Photo url={url} />
        </div>
      )}
      <div className="fill" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0) 44%,rgba(255,255,255,.85) 50%,#fff 58%)' }} />
      <div className="cv" style={{ top: 150, fontSize: 5.4, fontWeight: 700, letterSpacing: '.2em', color: SLATE }}>{caption}</div>
    </>
  );
}

/** One card face. The caller supplies the `.card` box and the `.edge` overlay. */
export function Creative({ creative, url }: { creative: CreativeKey; url?: string }) {
  switch (creative) {
    case 'cyber': return <Cyber url={url} />;
    case 'vapt': return <Vapt url={url} />;
    case 'cloud': return <Cloud url={url} />;
    case 'saas': return <Saas url={url} />;
    case 'monitor': return <Monitor url={url} />;
    case 'devops': return <DevOps url={url} />;
    case 'audit': return <Audit url={url} />;
    case 'card': return <BankCard url={url} />;
    case 'id': return <Plain art="id" caption="ID CARD SOLUTIONS" url={url} />;
    case 'pda': return <Plain art="pda" caption="LABEL · PDA · BARCODE" url={url} />;
  }
}
