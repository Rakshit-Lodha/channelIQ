/* TubeLens — Landing page
   Editorial front-cover treatment. Big serif headline, masthead, a dashboard
   sample rendered as a feature article, and editorial-style sections.
*/

const Landing = () => {
  const [channelUrl, setChannelUrl] = React.useState('');

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* Masthead */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 64px', background: 'var(--paper)' }}>
        <div className="row ai-c jc-b" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
          <div className="row ai-c g-6">
            <a className="body-sm" style={{ color: 'var(--ink-2)' }}>Method</a>
            <a className="body-sm" style={{ color: 'var(--ink-2)' }}>Stories</a>
            <a className="body-sm" style={{ color: 'var(--ink-2)' }}>Pricing</a>
            <a className="body-sm" style={{ color: 'var(--ink-2)' }}>Sign in</a>
            <Btn variant="primary" size="sm">Begin</Btn>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: '96px 64px 64px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'start' }}>
          <div>
            <Eyebrow accent>A quieter way to grow · Issue 001</Eyebrow>
            <h1 className="display" style={{ fontSize: 92, margin: '16px 0 24px' }}>
              Stop <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>guessing,</span><br/>
              what to <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>post.</span>
            </h1>
            <p className="body-lg" style={{ maxWidth: 480, marginTop: 28 }}>
              ChannelIQ learns about your channel and your competitors' the way a good editor reads a newspaper —
              looking for what's missing, what's working, and what to write next.
            </p>

            <div style={{ marginTop: 40 }}>
              <label className="label">Paste your channel to preview</label>
              <div className="row g-2" style={{ maxWidth: 520 }}>
                <Input
                  placeholder="youtube.com/@yourchannel"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  lg
                />
                <Btn variant="accent" size="lg" style={{ whiteSpace: 'nowrap' }}>Begin →</Btn>
              </div>
              <div className="caption" style={{ marginTop: 12 }}>
                Free to try · 7-day read · No card until you've seen the dashboard
              </div>
            </div>
          </div>

          {/* Feature illustration — a sample dashboard card, editorial-styled */}
          <FeaturedCard />
        </div>

        {/* A thin editorial 'contents' strip */}
        <div style={{ marginTop: 96, paddingTop: 24, borderTop: '1px solid var(--rule)' }}>
          <div className="row ai-b jc-b g-7">
            <div>
              <div className="eyebrow">In this issue</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 8 }}>What's inside the dashboard</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, flex: 1, maxWidth: 780 }}>
              {[
                ['01', 'Benchmark', 'You vs your neighbourhood'],
                ['02', 'Outliers', 'Videos that broke the pattern'],
                ['03', 'Atlas', 'Unwritten topics in your niche'],
                ['04', 'Timing', 'When your audience shows up'],
              ].map(([n, t, d]) => (
                <div key={n}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>{n}</div>
                  <div className="serif" style={{ fontSize: 20, marginTop: 6 }}>{t}</div>
                  <div className="body-sm" style={{ marginTop: 4 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      {/* HOW IT WORKS — editorial three-column */}
      <section style={{ padding: '64px 64px 96px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionOpen num="§ 01">The method</SectionOpen>
        <h2 className="display" style={{ fontSize: 56, maxWidth: 720, margin: '8px 0 48px' }}>
          Three inputs. One honest look at the field you're playing on.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {[
            {
              num: 'I.',
              title: 'Connect your channel',
              body: "A read-only handshake with YouTube. We fetch the last two years of your uploads, views, retention, and comments — nothing we can't find ourselves.",
              note: 'Takes about forty seconds.',
            },
            {
              num: 'II.',
              title: 'Name your neighbours',
              body: "Three to ten channels that orbit yours. Direct competitors, aspirational ones, or the one creator whose numbers keep you up at night.",
              note: 'We suggest ten based on your content.',
            },
            {
              num: 'III.',
              title: 'Read the dashboard',
              body: "A quiet room where your channel and theirs are laid side by side — plotted, compared, and annotated. Refreshed every morning at six.",
              note: 'First edition prints in four minutes.',
            },
          ].map((s, i) => (
            <article key={i}>
              <div className="serif" style={{ fontSize: 48, color: 'var(--accent)', lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
              <h3 className="serif" style={{ fontSize: 26, margin: '0 0 12px' }}>{s.title}</h3>
              <p className="body" style={{ margin: 0 }}>{s.body}</p>
              <hr className="rule-dashed" />
              <div className="marginalia">{s.note}</div>
            </article>
          ))}
        </div>
      </section>

      {/* PRICING — calm, editorial */}
      <section style={{ padding: '96px 64px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionOpen num="§ 04">Subscription</SectionOpen>
        <div className="row ai-b jc-b" style={{ marginBottom: 48 }}>
          <h2 className="display" style={{ fontSize: 56, margin: 0 }}>One price. Cancel whenever.</h2>
          <div className="marginalia" style={{ maxWidth: 280, textAlign: 'right' }}>
            No tiers, no upsells, no "contact sales."<br/>Try it first, pay only if the dashboard earns its keep.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          <PlanCard
            name="Quarterly"
            price="₹2,400"
            period="per quarter"
            tag="for the curious"
            features={['1 channel', 'Up to 10 competitors', 'Daily refresh', 'Email the dashboard']}
          />
          <PlanCard
            name="Annual"
            price="₹7,200"
            period="per year"
            tag="for the committed"
            features={['1 channel', 'Up to 10 competitors', 'Daily refresh', 'Script atlas', 'Two months free']}
            featured
          />
          <PlanCard
            name="Studio"
            price="₹24,000"
            period="per year"
            tag="for agencies"
            features={['Up to 5 channels', 'Unlimited competitors', 'Shared workspace', 'Weekly print edition']}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--rule)', padding: '48px 64px', background: 'var(--paper-warm)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="row ai-b jc-b">
            <Logo />
            <div className="caption">© 2026 ChannelIQ Editorial Pvt. Ltd. · Mumbai</div>
          </div>
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
            {[
              ['Product', ['Method', 'Dashboard', 'Pricing', 'Changelog']],
              ['Reading', ['The field guide', 'Case studies', 'Glossary', 'Sample edition']],
              ['Company', ['About', 'Writing', 'Hiring', 'Contact']],
              ['Fine print', ['Terms', 'Privacy', 'Refunds', 'Data handling']],
            ].map(([h, items]) => (
              <div key={h}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>{h}</div>
                <div className="col g-2">
                  {items.map(i => <a key={i} className="body-sm">{i}</a>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ========== Sub-components for landing ========== */

const FeaturedCard = () => (
  <div className="card" style={{ padding: 28, boxShadow: 'var(--shadow-lg)' }}>
    <div className="row ai-c jc-b">
      <Eyebrow accent>Today's field report</Eyebrow>
      <span className="caption">18 April · 06:00 IST</span>
    </div>
    <hr className="rule" style={{ margin: '12px 0 20px' }} />
    <div className="serif" style={{ fontSize: 28, lineHeight: 1.1, marginBottom: 8 }}>
      You're growing <span className="italic">1.4× faster</span> than the median in your cohort.
    </div>
    <div className="body-sm" style={{ marginBottom: 24 }}>
      But three of your neighbours posted about <em className="italic">"SIP vs NPS"</em> this week. You haven't.
    </div>

    {/* Little chart */}
    <div className="row ai-c jc-b" style={{ marginBottom: 8 }}>
      <span className="caption">Subs · last 30d</span>
      <span className="mono" style={{ fontSize: 12, color: 'var(--accent)' }}>+4,820 ▲</span>
    </div>
    <MiniLine w={420} h={80} data={[4, 5, 6, 8, 7, 10, 13, 11, 14, 17, 16, 20, 22, 24]} />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--rule)' }}>
      {[
        ['Outliers', '2', 'this week'],
        ['Unwritten topics', '14', 'in your niche'],
        ['Best posting day', 'Sat', '10 AM IST'],
      ].map(([l, v, s]) => (
        <div key={l}>
          <div className="caption">{l}</div>
          <div className="serif" style={{ fontSize: 28, lineHeight: 1, margin: '4px 0 4px' }}>{v}</div>
          <div className="caption">{s}</div>
        </div>
      ))}
    </div>
  </div>
);

const SampleSpread = () => (
  <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
    {/* Top bar mimicking dashboard */}
    <div className="row ai-c jc-b" style={{ padding: '14px 20px', borderBottom: '1px solid var(--rule)', background: 'var(--paper-card)' }}>
      <div className="row ai-c g-3">
        <ChannelMark name="Ishita" bg="var(--accent)" size={28} />
        <div className="serif" style={{ fontSize: 15 }}>@ishita-finance · Personal Finance</div>
      </div>
      <Pill dot variant="accent">Refreshed today</Pill>
    </div>
    {/* Spread body */}
    <div style={{ padding: 28 }}>
      <Eyebrow>§ Benchmark · Subscribers, last 90 days</Eyebrow>
      <div style={{ marginTop: 16, position: 'relative', height: 200 }}>
        <BenchmarkChart />
      </div>
      <hr className="rule" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        <div>
          <Eyebrow>§ Outliers this week</Eyebrow>
          <div className="col g-2" style={{ marginTop: 10 }}>
            {[
              ["Warikoo's NPS breakdown", '2.4M views', '+312%'],
              ["Pranjal's ₹1Cr mistake", '890K views', '+148%'],
            ].map(([t, v, d], i) => (
              <div key={i} className="row ai-c jc-b" style={{ padding: '8px 0', borderTop: i ? '1px dashed var(--rule)' : 'none' }}>
                <div>
                  <div className="serif italic" style={{ fontSize: 14, color: 'var(--ink)' }}>{t}</div>
                  <div className="caption">{v}</div>
                </div>
                <span className="mono" style={{ fontSize: 12, color: 'var(--accent)' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Eyebrow>§ Unwritten topics</Eyebrow>
          <div className="col g-2" style={{ marginTop: 10 }}>
            {['SIP vs NPS — deep dive', 'Tax on crypto after budget \u201926', 'Emergency fund, actually'].map(t => (
              <div key={t} className="row ai-c g-2">
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
                <span className="body-sm" style={{ color: 'var(--ink-2)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BenchmarkChart = () => {
  // Four series — hero + 3 competitors
  const series = [
    { name: 'You', data: [100, 103, 106, 108, 112, 115, 119, 124, 128, 134, 140], color: 'var(--accent)', w: 2 },
    { name: 'Competitor A', data: [100, 102, 104, 105, 107, 108, 110, 112, 115, 118, 121], color: 'var(--ink-3)', w: 1 },
    { name: 'Competitor B', data: [100, 101, 103, 104, 104, 106, 107, 108, 110, 111, 113], color: 'var(--ink-4)', w: 1 },
    { name: 'Cohort median', data: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110], color: 'var(--brass)', w: 1 },
  ];
  const w = 560, h = 180;
  const xs = series[0].data.length;
  const max = Math.max(...series.flatMap(s => s.data));
  const min = Math.min(...series.flatMap(s => s.data));
  const toPath = (data) => {
    const step = w / (data.length - 1);
    return data.map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / (max - min)) * (h - 10) - 5;
      return `${i ? 'L' : 'M'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };
  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        {/* grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <line key={i} x1="0" x2={w} y1={t * h} y2={t * h} stroke="var(--rule-soft)" strokeDasharray="2 3" />
        ))}
        {series.map((s, i) => (
          <path key={i} d={toPath(s.data)} fill="none" stroke={s.color} strokeWidth={s.w} strokeLinejoin="round" strokeLinecap="round" />
        ))}
      </svg>
      <div className="row g-5" style={{ marginTop: 12, flexWrap: 'wrap' }}>
        {series.map(s => (
          <div key={s.name} className="row ai-c g-2">
            <span style={{ width: 14, height: 2, background: s.color }} />
            <span className="caption">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlanCard = ({ name, price, period, tag, features, featured }) => (
  <div className="card" style={{
    padding: 32,
    border: featured ? '1px solid var(--ink)' : '1px solid var(--rule-soft)',
    position: 'relative',
    background: featured ? 'var(--paper-card)' : 'var(--paper-card)',
  }}>
    {featured && (
      <div style={{ position: 'absolute', top: -12, left: 32 }}>
        <Pill variant="ink">Most read</Pill>
      </div>
    )}
    <div className="eyebrow">{tag}</div>
    <div className="serif" style={{ fontSize: 28, marginTop: 6 }}>{name}</div>
    <hr className="rule" style={{ margin: '16px 0' }} />
    <div className="row ai-b g-2">
      <span className="display" style={{ fontSize: 48 }}>{price}</span>
      <span className="caption">{period}</span>
    </div>
    <div className="col g-2" style={{ marginTop: 24 }}>
      {features.map(f => (
        <div key={f} className="row ai-c g-2">
          <span style={{ fontFamily: 'var(--serif)', color: 'var(--accent)', fontSize: 14 }}>—</span>
          <span className="body-sm" style={{ color: 'var(--ink-2)' }}>{f}</span>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 32 }}>
      <Btn variant={featured ? 'primary' : 'ghost'} style={{ width: '100%', justifyContent: 'center' }}>
        Choose {name}
      </Btn>
    </div>
  </div>
);

window.Landing = Landing;
