/* =========================================================================
   Rieli Portfolio — case study pages
   DS-compatible primitives defined locally (MetaItem, Section, PullQuote,
   ResultsGrid) using the same rk-* class names as the _ds_bundle so all
   styles.css rules apply correctly.
   ========================================================================= */

/* -- DS-compatible primitives (mirror the bundle's rk-* output exactly) -- */
/* MetaItem: value clamps to a single line; if it would wrap, an accordion
   toggle expands it. This rule is followed by every meta field. */
function MetaItem({ label, value }) {
  const ref = React.useRef(null);
  const [overflow, setOverflow] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {if (!open) setOverflow(el.scrollHeight - el.clientHeight > 1);};
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [value, open]);

  return (
    <div className="rk-meta-item">
      <p className="rk-meta-label">{label}</p>
      <p ref={ref} className={'rk-meta-value' + (open ? ' is-open' : ' is-clamp')}>{value}</p>
      {overflow &&
      <button className="rk-meta-toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? 'Show less' : 'Show more'} <Icon name={open ? 'chevronUp' : 'chevronDown'} />
        </button>}
    </div>);

}
function Section({ title, intro, bullets }) {
  return (
    <section className="rk-cs-section">
      <h2 className="rk-cs-h2">{title}</h2>
      {intro && <p className="rk-cs-body">{intro}</p>}
      {bullets &&
      <ul className="rk-cs-list">
          {bullets.map((b, i) =>
        <li key={i}><strong>{b.lead}:</strong> {b.text}</li>
        )}
        </ul>
      }
    </section>);

}
function PullQuote({ children }) {
  return <h2 className="rk-cs-quote">{children}</h2>;
}
function ResultsGrid({ items }) {
  return (
    <div className="rk-results">
      {items.map((it, i) =>
      <div className="rk-result" key={i}>
          <p className="rk-result-label">{it.label}</p>
          <p className="rk-result-num">{it.value}</p>
        </div>
      )}
    </div>);

}

/* -- Standardized impact box: dark rounded card holding an elegant ruled
      table of results. Two shapes share one layout:
      • metric rows  → big amber value + label
      • outcome rows → flat icon + area title + description
      Contained to the same 970px column as the rest of the page. -- */
function ImpactResults({ title, items }) {
  const hasMetric = items.some((it) => it.metric);
  return (
    <div className="cs-results-wrap">
      <section className="cs-results">
        {title && <h2 className="cs-results-title">{title}</h2>}
        <table className={'ir-table' + (hasMetric ? ' is-metric' : ' is-outcome')}>
          <tbody>
            {items.map((it, i) =>
            hasMetric ?
            <tr key={i}>
                  <td className="ir-c-num">{it.metric}</td>
                  <td className="ir-c-lab">{it.title}</td>
                </tr> :

            <tr key={i}>
                  <td className="ir-c-ico" style={{ margin: "0px", padding: "26px 8px 26px 0px" }}><span className="ir-ico"><Icon name={it.icon} fill /></span></td>
                  <td className="ir-c-area" style={{ padding: "26px 18px 26px 0px" }}>{it.title}</td>
                  <td className="ir-c-out">{it.body}</td>
                </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>);

}

/* -- New bento header (Figma node 3686-1471), restyled in DS colors/type.
      Left column: light title card (company kicker + display title) over a
      dark brown card (lede + before/after table). Right column: full-bleed
      mockup over a light metadata strip. 1px gaps reveal hairline dividers. -- */
function CaseHero({ company, title, lede, image, imageAlt, meta, compare }) {
  return (
    <section className="cs-hero">
      <div className="cs-hero-titlecard">
        <p className="cs-hero-company">{company}</p>
        <h1 className="cs-hero-title">{title}</h1>
      </div>

      <div className="cs-hero-bodycard">
        <p className="cs-hero-lede">{lede}</p>
        {compare && compare.length > 0 &&
        <table className="cs-compare">
            <thead>
              <tr><th></th><th>Before</th><th>After</th></tr>
            </thead>
            <tbody>
              {compare.map((r, i) =>
            <tr key={i}>
                  <td className="cs-compare-row">{r.label}</td>
                  <td className="cs-compare-before">{r.before}</td>
                  <td className="cs-compare-after">{r.after}</td>
                </tr>
            )}
            </tbody>
          </table>}
      </div>

      <div className="cs-hero-media">
        <img src={image} alt={imageAlt} draggable="false" />
      </div>

      <div className="cs-hero-cover" aria-hidden="true">
        <img src={image} alt="" draggable="false" />
      </div>

      <div className="cs-hero-meta">
        {meta.map((m, i) =>
        <div className="cs-hero-metaitem" key={i}>
            <p className="cs-hero-metalabel">{m.label}</p>
            <p className="cs-hero-metavalue">{m.value}</p>
          </div>
        )}
      </div>
    </section>);

}

/* ---------- Shared case shell (back button + next/prev nav) ---------- */
function CaseShell({ children, onBack, onNext, nextLabel }) {
  return (
    <article className="case">
      <div className="cs-back-wrap">
        <button className="cs-back" onClick={onBack}><Icon name="arrowLeft" /> Back to work</button>
      </div>
      {children}
      <div className="cs-next">
        <button className="cs-next-cta" onClick={onBack}><Icon name="arrowLeft" /> All projects</button>
        {onNext && <button className="cs-next-cta" onClick={onNext}>{nextLabel} <Icon name="arrowRight" /></button>}
      </div>
    </article>);

}

/* =========================================================================
   PRIMARY CASE — Optimizing the omnichannel sales funnel
   ========================================================================= */
function CaseOmnichannel({ onBack, onNext }) {
  return (
    <CaseShell onBack={onBack} onNext={onNext} nextLabel="A gift for the business">

      <CaseHero
        company="Boticário Group"
        title="Opnichannel optimization"
        lede="I enabled Click & Collect customers to identify when a product is not available at the closest store: a simple visual solution, but one that addresses a complex logistics problem."
        image="assets/work-2.png"
        imageAlt="Click and collect store availability filter"
        meta={[
        { label: 'Year', value: '2026' },
        { label: 'Status', value: 'In production' },
        { label: 'Role', value: 'Senior Product Designer (Lead)' }]
        }
        compare={[
        { label: 'Conversion', before: 'Baseline', after: 'Boosted' },
        { label: 'Checkout drop-off', before: 'High', after: 'Reduced' },
        { label: 'Average ticket', before: '—', after: 'Maintained' },
        { label: 'Brand perception', before: 'Complaints', after: 'Improved' }]
        } />

      <Section
        title="Context and problem"
        bullets={[
        { lead: 'User Frustration', text: 'A significant volume of negative reviews on the App Store and Google Play highlighted user dissatisfaction with the pickup process.' },
        { lead: 'Business Impact', text: 'There was a clear lack of absorption of omnichannel consumers, meaning users were abandoning the journey instead of completing their physical store pickup' },
        { lead: 'Data Evidence', text: 'Event analysis revealed that a major portion of user sessions ended abruptly with a "o product available" error, creating a massive drop-off point in the funnel.' }]
        } />
      

      <div className="cs-pair">
        <img src="assets/work-3.png" alt="Exploration board of pickup states" />
        <img src="assets/work-4.png" alt="High-fidelity store availability screen" />
      </div>

      <div className="cs-gap"></div>

      <Section
        title="Strategy & Solution"
        bullets={[
        { lead: 'The Toggle Filter', text: 'Introduced a clear, intuitive filter allowing users to seamlessly toggle between stores that had all their desired items available versus those with partial/no availability.' },
        { lead: 'Situational Clarity', text: 'The design empowered consumers with immediate clarity about their physical pickup options, eliminating the surprise of unavailable items at the end of the checkout flow.' },
        { lead: 'Positive Communication', text: "Reinforced the filter's UI with positive, guiding copywriting to help users make informed decisions without feeling blocked by the system." }]
        } />
      

      <ImpactResults
        items={[
        { icon: 'funnel', title: 'Friction Reduction', body: 'Achieved a substantial decrease in users hitting the "no product available" error screens.' },
        { icon: 'trendUp', title: 'Conversion Boost', body: 'Generated a notable increase in the overall conversion rate for the Click and Collect modality.' },
        { icon: 'shieldFlat', title: 'Revenue Protection', body: 'Successfully implemented the new feature while maintaining the average ticket size of omnichannel consumers.' },
        { icon: 'heart', title: 'Brand Perception', body: 'Significantly reduced the volume of complaints related to store pickup on both the App Store and Google Play.' }]
        } />

    </CaseShell>);

}

/* =========================================================================
   SECONDARY CASE — A gift for the business
   Fully composed with DS-compatible primitives.
   ========================================================================= */
function CaseGift({ onBack, onNext }) {
  return (
    <CaseShell onBack={onBack} onNext={onNext} nextLabel="Omnichannel sales funnel">

      <CaseHero
        company="Boticário Group"
        title="A gift for the business"
        lede="I helped transform a legacy checkout feature into a strategic asset, driving an 81% revenue increase by treating gifting as the final, decisive moment of the funnel."
        image="assets/gift-flow.png"
        imageAlt="Boticário gift, delivered"
        meta={[
        { label: 'Year', value: '2024' },
        { label: 'Status', value: 'In production' },
        { label: 'Role', value: 'Senior Product Designer' }]
        }
        compare={[
        { label: 'Revenue', before: 'Baseline', after: '+81%' },
        { label: 'Wrapped orders', before: '—', after: '87,000' },
        { label: 'Order share', before: '—', after: '25%' },
        { label: 'Complaints', before: '50', after: '~0' }]
        } />

      <Section
        title="The Initial Solution"
        intro="The gift-wrapping feature at Grupo Boticário's e-commerce had become a point of friction and lost revenue. Originally designed for pandemic-era needs, it no longer aligned with current consumer behavior or the company's expansion goals."
        bullets={[
        { lead: 'Technical Constraint', text: 'Business logic was tied to the front-end, making the component fragile and impossible to scale with new packaging launches.' },
        { lead: 'Strategic Gap', text: 'Despite being the most-searched brand for gifts in Brazil, the interface failed to generate desirability at the final stage of the funnel.' }]
        } />
      

      <div className="cs-img">
        <img src="assets/gift-2.png" alt="The legacy gifting flow across checkout screens" />
      </div>

      <Section
        title="Leading the Transformation"
        intro="I conducted a multi-method research phase to validate hypotheses and align the redesign with user intent."
        bullets={[
        { lead: 'Search & Data Analysis', text: 'Users searched for functional terms ("box," "bag") rather than just "gift."' },
        { lead: 'NPS & Feedback', text: 'The feature performed below the e-commerce average, with high complaint rates.' },
        { lead: 'Stakeholder Alignment', text: 'Interviewed cross-functional teams to map technical constraints across brands.' }]
        } />
      

      <PullQuote>We were treating the gift bag screen as the first chance to sell
        a gift package, but it should have been treated as the last one.</PullQuote>

      <div className="cs-pair">
        <img src="assets/gift-mock-1.png" alt="Redesigned packaging picker — green" />
        <img src="assets/gift-mock-2.png" alt="Redesigned packaging picker — wine" />
      </div>

      <Section
        title="Building the Solution"
        intro="I moved from diagnosis to execution with a focus on scalability and conversion."
        bullets={[
        { lead: 'Divergent Ideation', text: 'Low-fidelity wireframes to test new information architectures and flows.' },
        { lead: 'Collaborative Refinement', text: 'Advanced to high-fidelity prototypes after design-critique sessions.' },
        { lead: 'Validation', text: 'A/B tested updated terminology and layout to confirm conversion lift without performance hits.' }]
        } />
      

      <ImpactResults
        title="From Friction to Record-Breaking Revenue"
        items={[
        { icon: 'trendUp', metric: '+81%', title: 'Increase in revenue captured' },
        { icon: 'giftBox', metric: '87,000', title: 'Wrapped orders' },
        { icon: 'pie', metric: '25%', title: 'Share of orders' },
        { icon: 'heart', metric: '~0', title: 'Complaints (was 50)' }]
        } />

    </CaseShell>);

}

/* =========================================================================
   ABOUT PAGE
   ========================================================================= */
function About({ onWork, onResume }) {
  return (
    <article className="about">
      <header className="cs-head">
        <p className="about-kicker">About</p>
        <h1 className="cs-h1">I design calm, confident journeys for millions of shoppers.</h1>
      </header>

      <div className="about-intro">
        <div className="about-portrait">
          <img src="assets/work-1.jpg" alt="Rieli Boldrini" draggable="false" />
        </div>
        <div className="about-intro-col">
          <p className="cs-lede">I'm Rieli Boldrini, a Senior Product Designer at Boticário Group in
            São Paulo, Brazil. I work where digital expectations meet physical retail — turning
            everyday friction into clarity, and clarity into measurable results.</p>
          <div className="about-meta">
            <MetaItem label="Based in" value="São Paulo, Brazil" />
            <MetaItem label="Role" value="Senior Product Designer" />
            <MetaItem label="Focus" value="Omnichannel commerce" />
          </div>
        </div>
      </div>

      <Section
        title="How I work"
        intro="I move from diagnosis to execution — grounding decisions in research and proving them with outcomes."
        bullets={[
        { lead: 'Research-led', text: 'I start with the evidence — session data, store reviews, NPS and user interviews — so the design solves the real problem, not the assumed one.' },
        { lead: 'Outcome-driven', text: 'Every project is framed as a transformation: friction into clarity, a cost center into a revenue engine. The numbers are the proof.' },
        { lead: 'Collaborative', text: 'I align engineering, product and brand early to map constraints and ship solutions that actually scale.' }]
        } />

      <Section
        title="What I focus on"
        bullets={[
        { lead: 'Omnichannel commerce', text: 'Bridging digital journeys and physical store reality across Click & Collect, inventory and pickup.' },
        { lead: 'Checkout & conversion', text: 'Removing friction at the decisive moments of the funnel, where intent turns into revenue.' },
        { lead: 'Research & usability', text: 'Multi-method discovery, prototyping and usability testing to validate before we build.' }]
        } />

      <div className="about-cta">
        <a className="about-cta-btn" href="https://www.linkedin.com/in/rieliboldrini/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Icon name="arrowUpRight" /></a>
        <button className="about-cta-btn ghost" onClick={onResume}>Download resumé <Icon name="download" /></button>
        <button className="about-cta-btn ghost" onClick={onWork}>See the work <Icon name="arrowRight" /></button>
      </div>
    </article>);

}

Object.assign(window, { CaseOmnichannel, CaseGift, About });