/* =========================================================================
   Rieli Portfolio — core components
   Icons · Navbar (+hamburger) · Samples · WorkGrid · Footer
   ========================================================================= */

function Icon({ name, fill }) {
  const common = {
    width: 18, height: 18, viewBox: '0 0 24 24',
    fill: fill ? 'currentColor' : 'none', stroke: fill ? 'none' : 'currentColor',
    strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
  };
  const P = {
    menu: <g><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></g>,
    close: <g><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></g>,
    download: <g><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></g>,
    arrowRight: <g><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></g>,
    arrowLeft: <g><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></g>,
    arrowUpRight: <g><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></g>,
    play: <polygon points="6 4 20 12 6 20 6 4" />,
    dollar: <g><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></g>,
    megaphone: <g><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></g>,
    bag: <g><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></g>,
    shield: <g><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></g>
  };
  return <svg {...common}>{P[name]}</svg>;
}

/* ---------- Floating glass navbar with mobile hamburger ---------- */
function Navbar({ route, onHome, onResume }) {
  const [open, setOpen] = React.useState(false);
  const go = (fn) => (e) => { if (e) e.preventDefault(); setOpen(false); fn && fn(); };

  return (
    <div className="nav-wrap">
      <nav className="nav">
        <a className="nav-logo" href="#/" onClick={go(onHome)} aria-label="Rieli — home">Rieli</a>

        <div className="nav-links">
          <a className={'nav-link' + (route === 'home' ? ' on' : '')} href="#/" onClick={go(onHome)}>Work</a>
          <a className="nav-link" href="#" onClick={go(onResume)}>Resumé <Icon name="download" /></a>
        </div>

        <button className="nav-burger" aria-label="Menu" aria-expanded={open}
          onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>

        <div className={'nav-sheet' + (open ? ' open' : '')}>
          <a className="nav-link" href="#/" onClick={go(onHome)}>Work</a>
          <a className="nav-link" href="#" onClick={go(onResume)}>Resumé <Icon name="download" /></a>
        </div>
      </nav>
    </div>
  );
}

/* =========================================================================
   SECTION 1 — Samples mosaic
   ========================================================================= */
const SAMPLES = [
  { area: 'pt',   src: 'assets/work-1.jpg',      alt: 'Rieli Boldrini', portrait: true },
  { area: 'feat', src: 'assets/work-2.png',       alt: 'Click & collect store availability', link: 'omnichannel' },
  { area: 's2',   src: 'assets/gift-mock-1.png',  alt: 'Gift packaging picker' },
  { area: 's3',   src: 'assets/gift-flow.png',    alt: 'Boticário gift, delivered' },
  { area: 's4',   src: 'assets/work-3.png',       alt: 'Omnichannel exploration board', link: 'omnichannel' },
  { area: 's5',   src: 'assets/gift-2.png',       alt: 'Checkout gifting flow' },
  { area: 's6',   src: 'assets/work-4.png',       alt: 'Seasonal gift box PDP' },
];

function SampleCell({ s, onOpen }) {
  const ref = React.useRef(null);
  const isLink = !!s.link;

  const onEnter = () => {
    if (s.video && ref.current) { ref.current.currentTime = 0; ref.current.play().catch(() => {}); }
  };
  const onLeave = () => {
    if (s.video && ref.current) { ref.current.pause(); }
  };

  const cls = 'cell a-' + s.area + (s.portrait ? ' is-portrait' : '') + (isLink ? ' is-link' : '');
  const handleClick = () => { if (isLink) onOpen(s.link); };

  return (
    <figure
      className={cls}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={handleClick}
      role={isLink ? 'link' : undefined}
      tabIndex={isLink ? 0 : undefined}
      onKeyDown={(e) => { if (isLink && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onOpen(s.link); } }}
    >
      {s.video
        ? <video ref={ref} className="cell-media" muted loop playsInline preload="none" poster={s.src}>
            <source src={s.video} type="video/mp4" />
          </video>
        : <img className="cell-media" src={s.src} alt={s.alt} draggable="false" />
      }
      {s.video && <span className="cell-play"><Icon name="play" fill /></span>}
      {isLink && <figcaption className="cell-badge">View case <Icon name="arrowUpRight" /></figcaption>}
    </figure>
  );
}

function Samples({ onOpen }) {
  return (
    <section className="samples" aria-label="Selected work samples">
      <div className="samples-grid">
        {SAMPLES.map((s) => <SampleCell key={s.area} s={s} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 2 — Work (large case cards)
   ========================================================================= */
const CASES = [
  {
    id: 'omnichannel',
    kicker: 'Boticário Group · 2026',
    title: 'Optimizing the omnichannel sales funnel',
    desc: 'Bridged the gap between digital expectations and physical store inventory — cutting checkout friction and lifting Click & Collect conversion.',
    cover: 'assets/work-2.png'
  },
  {
    id: 'gift',
    kicker: 'Boticário Group · 2024',
    title: 'A gift for the business',
    desc: 'Redesigned a legacy gifting feature into a revenue engine, turning a point of user friction into an 81% sales increase.',
    cover: 'assets/gift-flow.png'
  },
];

function CaseCard({ c, onOpen }) {
  return (
    <a className="case-card" href={'#/case/' + c.id} onClick={(e) => { e.preventDefault(); onOpen(c.id); }}>
      <img className="case-card-bg" src={c.cover} alt="" draggable="false" />
      <div className="case-card-scrim">
        <p className="case-card-kicker">{c.kicker}</p>
        <h3 className="case-card-title">{c.title}</h3>
        <p className="case-card-desc">{c.desc}</p>
        <span className="case-card-cta">View project <Icon name="arrowRight" /></span>
      </div>
    </a>
  );
}

function WorkGrid({ onOpen }) {
  return (
    <section className="work" id="work">
      <div className="work-head">
        <h2 className="work-title">Work</h2>
        <p className="work-sub">Selected case studies</p>
      </div>
      <div className="work-grid">
        {CASES.map((c) => <CaseCard key={c.id} c={c} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="foot">
      <span className="foot-logo">Rieli</span>
      <p className="foot-meta">
        Rieli Boldrini — Senior Product Designer<br />
        São Paulo, Brazil · <a href="https://rie.li">rie.li</a>
      </p>
    </footer>
  );
}

Object.assign(window, { Icon, Navbar, Samples, WorkGrid, Footer });
