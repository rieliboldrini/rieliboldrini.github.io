/* =========================================================================
   Rieli Portfolio — core components
   Icons · Navbar (+hamburger) · Samples · WorkGrid · Footer
   Shared on window for the other Babel scripts.
   ========================================================================= */

/* ---------- tiny lucide-style icon set (thin rounded strokes) ---------- */
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
    shield: <g><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></g>,
    /* ---- flat (filled) result glyphs — solid silhouettes, brand-warm ---- */
    funnel: <path d="M3 5h18l-8 8v6h-2v-6z" />,
    trendUp: <g><rect x="3" y="13" width="4.2" height="8" rx="1.4" /><rect x="9.9" y="8" width="4.2" height="13" rx="1.4" /><rect x="16.8" y="3" width="4.2" height="18" rx="1.4" /></g>,
    shieldFlat: <path d="M12 2.2 4.5 5v6.2c0 4.9 3.2 8 7.5 9.6 4.3-1.6 7.5-4.7 7.5-9.6V5z" />,
    heart: <path d="M12 20.7C6.8 17 3.5 13.4 3.5 9.4 3.5 6.6 5.6 4.6 8.2 4.6c1.6 0 3 .8 3.8 2 .8-1.2 2.2-2 3.8-2 2.6 0 4.7 2 4.7 4.8 0 4-3.3 7.6-8.5 11.3z" />,
    giftBox: <g><path d="M4.5 10.5h15V20a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1z" /><path d="M3.5 6.5h17a.6.6 0 0 1 .6.6v2.2a.6.6 0 0 1-.6.6h-17a.6.6 0 0 1-.6-.6V7.1a.6.6 0 0 1 .6-.6z" /><rect x="10.8" y="6.5" width="2.4" height="14.5" fill="var(--color-brown)" /></g>,
    pie: <g><circle cx="12" cy="12" r="9" /><path d="M12 12V3.2A8.8 8.8 0 0 1 20.8 12z" fill="var(--color-brown)" /></g>,
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    chevronUp: <polyline points="6 15 12 9 18 15" />
  };
  return <svg {...common}>{P[name]}</svg>;
}

/* ---------- Floating glass navbar with mobile hamburger ---------- */
function Navbar({ route, onHome, onWork, onAbout, onResume }) {
  const [open, setOpen] = React.useState(false);
  const go = (fn) => (e) => {if (e) e.preventDefault();setOpen(false);fn && fn();};
  return (
    <div className="nav-wrap" style={{ padding: "0 var(--space-6)" }}>
      <nav className="nav ds-glass" style={{ height: "var(--nav-height)" }}>
        <a className="nav-logo" href="#/" onClick={go(onHome)} aria-label="Rieli — home">Rieli</a>

        <div className="nav-links">
          <a className={'nav-link' + (route === 'home' ? ' on' : '')} href="#work" onClick={go(onWork)}>Work</a>
          <a className={'nav-link' + (route === 'about' ? ' on' : '')} href="#/about" onClick={go(onAbout)}>About</a>
          <a className="nav-link" href="https://www.linkedin.com/in/rieliboldrini/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="nav-link" href="#" onClick={go(onResume)}>Resumé <Icon name="download" /></a>
        </div>

        <button className="nav-burger" aria-label="Menu" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>

        <div className={'nav-sheet' + (open ? ' open' : '')}>
          <a className="nav-link" href="#work" onClick={go(onWork)}>Work</a>
          <a className="nav-link" href="#/about" onClick={go(onAbout)}>About</a>
          <a className="nav-link" href="https://www.linkedin.com/in/rieliboldrini/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="nav-link" href="#" onClick={go(onResume)}>Resumé <Icon name="download" /></a>
        </div>
      </nav>
    </div>);

}

/* =========================================================================
   SECTION 1 — Samples mosaic
   Each sample is grayscale by default and turns colour on hover.
   • To make a sample link to a case, set `link: '<caseId>'`.
   • To use a video instead of an image, set `video: 'assets/clip.mp4'`
     (poster falls back to `src`); it auto-plays muted on hover.
   ========================================================================= */
const SAMPLES = [
{ area: 'pt', src: 'assets/work-1.jpg', alt: 'Rieli Boldrini', portrait: true },
{ area: 'feat', src: 'assets/work-2.png', alt: 'Click & collect store availability', link: 'omnichannel' },
{ area: 's2', src: 'assets/gift-mock-1.png', alt: 'Gift packaging picker' },
{ area: 's3', src: 'assets/gift-flow.png', alt: 'Boticário gift, delivered' },
{ area: 's4', src: 'assets/work-3.png', alt: 'Omnichannel exploration board', link: 'omnichannel' },
{ area: 's5', src: 'assets/gift-2.png', alt: 'Checkout gifting flow' },
{ area: 's6', src: 'assets/work-4.png', alt: 'Seasonal gift box PDP' }];


function SampleCell({ s, onOpen }) {
  const ref = React.useRef(null);
  const isLink = !!s.link;
  const onEnter = () => {if (s.video && ref.current) {ref.current.currentTime = 0;ref.current.play().catch(() => {});}};
  const onLeave = () => {if (s.video && ref.current) {ref.current.pause();}};
  const cls = 'cell a-' + s.area + (s.portrait ? ' is-portrait' : '') + (isLink ? ' is-link' : '');
  const handleClick = () => {if (isLink) onOpen(s.link);};

  return (
    <figure className={cls} onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={handleClick}
    role={isLink ? 'link' : undefined} tabIndex={isLink ? 0 : undefined}
    onKeyDown={(e) => {if (isLink && (e.key === 'Enter' || e.key === ' ')) {e.preventDefault();onOpen(s.link);}}}>
      {s.video ?
      <video ref={ref} className="cell-media" muted loop playsInline preload="none"
      poster={s.src}><source src={s.video} type="video/mp4" /></video> :

      <img className="cell-media" src={s.src} alt={s.alt} draggable="false" style={{ width: "553px" }} />
      }
      {s.video && <span className="cell-play"><Icon name="play" fill /></span>}
      {isLink && <figcaption className="cell-badge">View case <Icon name="arrowUpRight" /></figcaption>}
    </figure>);

}

function Samples({ onOpen }) {
  return (
    <section className="samples" aria-label="Selected work samples" style={{ margin: "var(--space-10) var(--space-6) 0" }}>
      <div className="samples-grid">
        {SAMPLES.map((s) => <SampleCell key={s.area} s={s} onOpen={onOpen} />)}
      </div>
    </section>);

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
}];


function CaseCard({ c, onOpen }) {
  return (
    <a className="case-card" href={'#/case/' + c.id} onClick={(e) => {e.preventDefault();onOpen(c.id);}}>
      <img className="case-card-bg" src={c.cover} alt="" draggable="false" />
      <div className="case-card-scrim">
        <p className="case-card-kicker">{c.kicker}</p>
        <h3 className="case-card-title">{c.title}</h3>
        <p className="case-card-desc">{c.desc}</p>
        <span className="case-card-cta">View project <Icon name="arrowRight" /></span>
      </div>
    </a>);

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
    </section>);

}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="foot">
      <span className="foot-logo">Rieli</span>
      <p className="foot-meta">
        Rieli Boldrini — Senior Product Designer<br />
        São Paulo, Brazil · <a href="#" onClick={(e) => e.preventDefault()}>rie.li</a>
      </p>
    </footer>);

}

Object.assign(window, { Icon, Navbar, Samples, WorkGrid, Footer });