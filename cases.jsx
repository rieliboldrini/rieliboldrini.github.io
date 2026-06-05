/* =========================================================================
   Rieli Portfolio — case study pages
   CaseOmnichannel (primary) · CaseGift
   ========================================================================= */

function Meta({ items }) {
  return (
    <div className="cs-meta">
      {items.map((it, i) =>
        <div key={i}>
          <p className="cs-meta-label">{it.label}</p>
          <p className="cs-meta-value">{it.value}</p>
        </div>
      )}
    </div>
  );
}

function BulletSection({ title, center, bullets }) {
  return (
    <section className={'cs-section' + (center ? ' center' : '')}>
      <h2 className="cs-h2">{title}</h2>
      <ul className="cs-list">
        {bullets.map((b, i) =>
          <li key={i}><strong>{b.lead}:</strong> {b.text}</li>
        )}
      </ul>
    </section>
  );
}

function CaseShell({ children, onBack, onNext, nextLabel }) {
  return (
    <article>
      <div className="cs-back-wrap">
        <button className="cs-back" onClick={onBack}><Icon name="arrowLeft" /> Back to work</button>
      </div>
      {children}
      <div className="cs-next">
        <button className="cs-next-cta" onClick={onBack}><Icon name="arrowLeft" /> All projects</button>
        {onNext && <button className="cs-next-cta" onClick={onNext}>{nextLabel} <Icon name="arrowRight" /></button>}
      </div>
    </article>
  );
}

/* ---------- PRIMARY CASE — Omnichannel sales funnel ---------- */
function CaseOmnichannel({ onBack, onNext }) {
  return (
    <CaseShell onBack={onBack} onNext={onNext} nextLabel="A gift for the business">
      <header className="cs-head">
        <h1 className="cs-h1">Optimizing the omnichannel sales funnel</h1>
        <Meta items={[
          { label: 'Year',    value: '2026' },
          { label: 'My Role', value: 'Senior Product Designer' },
          { label: 'Company', value: 'Boticário Group' },
        ]} />
      </header>

      <div className="cs-band"><img src="assets/work-2.png" alt="Click & collect store availability filter" /></div>

      <div className="cs-body-wrap">
        <p className="cs-lede">Bridge the gap between digital expectations and physical store inventory,
          reducing friction for omnichannel consumers who faced obstacles during checkout.</p>
        <hr className="cs-rule" />
      </div>

      <BulletSection
        title="The (Real) Problem"
        center
        bullets={[
          { lead: 'User Frustration',  text: 'A significant volume of negative reviews on the App Store and Google Play highlighted user dissatisfaction with the pickup process.' },
          { lead: 'Business Impact',   text: 'There was a clear lack of absorption of omnichannel consumers, meaning users were abandoning the journey instead of completing their physical store pickup.' },
          { lead: 'Data Evidence',     text: 'Event analysis revealed that a major portion of user sessions ended abruptly with a "no product available" error, creating a massive drop-off point in the funnel.' },
        ]}
      />

      <div className="cs-pair">
        <img src="assets/work-3.png" alt="Exploration board of pickup states" />
        <img src="assets/work-4.png" alt="High-fidelity store availability screen" />
      </div>

      <div style={{ height: '60px' }}></div>

      <BulletSection
        title="Strategy & Solution"
        center
        bullets={[
          { lead: 'The Toggle Filter',      text: <React.Fragment>Introduced a clear, intuitive filter allowing users to seamlessly toggle between stores that had <em>all</em> their desired items available versus those with partial/no availability.</React.Fragment> },
          { lead: 'Situational Clarity',    text: 'The design empowered consumers with immediate clarity about their physical pickup options, eliminating the surprise of unavailable items at the end of the checkout flow.' },
          { lead: 'Positive Communication', text: "Reinforced the filter's UI with positive, guiding copywriting to help users make informed decisions without feeling blocked by the system." },
        ]}
      />

      <section className="cs-results">
        <div className="cs-results-inner">
          <div>
            <div className="cs-result-ico"><Icon name="dollar" /></div>
            <h3 className="cs-result-h">Friction Reduction</h3>
            <p className="cs-result-p">Achieved a substantial decrease in users hitting the "no product available" error screens.</p>
          </div>
          <div>
            <div className="cs-result-ico"><Icon name="megaphone" /></div>
            <h3 className="cs-result-h">Conversion Boost</h3>
            <p className="cs-result-p">Generated a notable increase in the overall conversion rate for the Click and Collect modality.</p>
          </div>
          <div>
            <div className="cs-result-ico"><Icon name="bag" /></div>
            <h3 className="cs-result-h">Revenue Protection</h3>
            <p className="cs-result-p">Successfully implemented the new feature while maintaining the average ticket size of omnichannel consumers.</p>
          </div>
          <div>
            <div className="cs-result-ico"><Icon name="shield" /></div>
            <h3 className="cs-result-h">Brand Perception</h3>
            <p className="cs-result-p">Significantly reduced the volume of complaints related to store pickup on both the App Store and Google Play.</p>
          </div>
        </div>
      </section>
    </CaseShell>
  );
}

/* ---------- SECONDARY CASE — A gift for the business ---------- */
function CaseGift({ onBack, onNext }) {
  return (
    <CaseShell onBack={onBack} onNext={onNext} nextLabel="Omnichannel sales funnel">
      <header className="cs-head">
        <h1 className="cs-h1">A gift for the business</h1>
        <Meta items={[
          { label: 'Year',    value: '2024' },
          { label: 'My Role', value: 'Senior Product Designer' },
          { label: 'Company', value: 'Boticário Group' },
        ]} />
      </header>

      <div className="cs-band"><img src="assets/gift-flow.png" alt="Boticário gift, delivered" /></div>

      <div className="cs-body-wrap">
        <p className="cs-lede">I helped transform a legacy checkout feature into a strategic asset,
          driving an 81% revenue increase by treating gifting as the final, decisive moment of the funnel.</p>
        <hr className="cs-rule" />
      </div>

      <BulletSection
        title="The Initial Solution"
        center
        bullets={[
          { lead: 'Technical Constraint', text: 'Business logic was tied to the front-end, making the component fragile and impossible to scale with new packaging launches.' },
          { lead: 'Strategic Gap',        text: 'Despite being the most-searched brand for gifts in Brazil, the interface failed to generate desirability at the final stage of the funnel.' },
        ]}
      />

      <div className="cs-img"><img src="assets/gift-2.png" alt="The legacy gifting flow across checkout screens" /></div>

      <div style={{ height: '60px' }}></div>

      <BulletSection
        title="Leading the Transformation"
        center
        bullets={[
          { lead: 'Search & Data Analysis',  text: 'Users searched for functional terms ("box," "bag") rather than just "gift."' },
          { lead: 'NPS & Feedback',          text: 'The feature performed below the e-commerce average, with high complaint rates.' },
          { lead: 'Stakeholder Alignment',   text: 'Interviewed cross-functional teams to map technical constraints across brands.' },
        ]}
      />

      <blockquote className="cs-quote">"We were treating the gift bag screen as the first chance to sell
        a gift package, but it should have been treated as the last one."</blockquote>

      <div className="cs-pair">
        <img src="assets/gift-mock-1.png" alt="Redesigned packaging picker — green" />
        <img src="assets/gift-mock-2.png" alt="Redesigned packaging picker — wine" />
      </div>

      <div style={{ height: '60px' }}></div>

      <BulletSection
        title="Building the Solution"
        center
        bullets={[
          { lead: 'Divergent Ideation',       text: 'Low-fidelity wireframes to test new information architectures and flows.' },
          { lead: 'Collaborative Refinement', text: 'Advanced to high-fidelity prototypes after design-critique sessions.' },
          { lead: 'Validation',               text: 'A/B tested updated terminology and layout to confirm conversion lift without performance hits.' },
        ]}
      />

      <section className="cs-results">
        <div className="cs-num-grid">
          <div><p className="cs-num">+81%</p><p className="cs-num-label">Increase in revenue captured</p></div>
          <div><p className="cs-num">87k</p><p className="cs-num-label">Wrapped orders</p></div>
          <div><p className="cs-num">25%</p><p className="cs-num-label">Share of all orders</p></div>
          <div><p className="cs-num">~0</p><p className="cs-num-label">Complaints (was 50/mo)</p></div>
        </div>
      </section>
    </CaseShell>
  );
}

Object.assign(window, { CaseOmnichannel, CaseGift });
