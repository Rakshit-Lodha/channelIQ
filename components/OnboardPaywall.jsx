/* TubeLens — Onboarding · Step 05: Paywall / Unlock
   The user has seen their dashboard preview. Now they pay to unlock.
   Editorial Option B: value recap on the left, plan choice + payment on the right.
*/

const OnboardPaywall = ({ onBack, onDone }) => {
  const [plan, setPlan] = React.useState('annual');
  const [cardFilled, setCardFilled] = React.useState(false);

  const plans = {
    quarterly: { price: '₹2,400', period: 'per quarter', savings: null, monthly: '₹800/mo' },
    annual: { price: '₹7,200', period: 'per year', savings: 'Save ₹2,400 · 2 months free', monthly: '₹600/mo' },
    studio: { price: '₹24,000', period: 'per year', savings: 'For teams & agencies', monthly: '₹2,000/mo' },
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

        {/* LEFT — what they've already built */}
        <div>
          <SectionOpen num="Chapter V">Unlock your edition</SectionOpen>
          <h1 className="display" style={{ fontSize: 52, margin: '8px 0 20px' }}>
            Your dashboard is <span className="italic" style={{ color: 'var(--accent)' }}>printed.</span>
            <br/>Here's what's inside.
          </h1>
          <p className="body-lg" style={{ maxWidth: 480, marginBottom: 32 }}>
            We've read your channel, measured three neighbours, and drafted six script ideas —
            all from public data and your read-only handshake. Pick a plan to open the doors.
          </p>

          {/* Inventory of what was generated */}
          <div className="card" style={{ padding: 28 }}>
            <Eyebrow>§ In your edition</Eyebrow>
            <div className="col" style={{ marginTop: 12 }}>
              {[
                ['Your channel snapshot', '184K subs · 142 videos · 2 years of history'],
                ['Benchmark spread', 'You vs 3 competitors · cohort median'],
                ['Outliers & patterns', '2 breakthrough videos in your neighbourhood'],
                ['Topic atlas', '128 topics mapped · 14 unwritten in your niche'],
                ['Timing heatmap', 'Best day & hour to post, per weekday'],
                ['Script lab', '6 research-backed video ideas, ready to film'],
              ].map(([t, d], i) => (
                <div key={t} className="row ai-s g-3" style={{ padding: '14px 0', borderTop: i ? '1px dashed var(--rule)' : 'none' }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', marginTop: 4, letterSpacing: '0.12em' }}>0{i + 1}</span>
                  <div>
                    <div className="serif" style={{ fontSize: 16 }}>{t}</div>
                    <div className="caption" style={{ marginTop: 2 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <figure style={{ margin: '40px 0 0', maxWidth: 480 }}>
            <div className="serif" style={{ fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>“</div>
            <blockquote className="serif italic" style={{ fontSize: 20, lineHeight: 1.4, margin: '0 0 12px' }}>
              The dashboard paid for itself the week I saw it.
            </blockquote>
            <figcaption className="row ai-c g-3">
              <Avatar name="Rahul Desai" color="var(--ink)" size={28} />
              <div className="caption">Rahul Desai · Tech reviews · 1.2M subs</div>
            </figcaption>
          </figure>
        </div>

        {/* RIGHT — plan + payment */}
        <div style={{ position: 'sticky', top: 24 }}>
          <div className="card" style={{ padding: 32 }}>
            <Eyebrow accent>§ Choose a plan</Eyebrow>
            <div className="col g-2" style={{ marginTop: 16 }}>
              {[
                ['quarterly', 'Quarterly', 'for the curious', false],
                ['annual', 'Annual', 'for the committed', true],
                ['studio', 'Studio', 'for agencies', false],
              ].map(([k, name, tag, rec]) => {
                const on = plan === k;
                const p = plans[k];
                return (
                  <button
                    key={k}
                    onClick={() => setPlan(k)}
                    style={{
                      background: on ? 'var(--paper-warm)' : 'transparent',
                      border: on ? '1px solid var(--ink)' : '1px solid var(--rule)',
                      borderRadius: 8, padding: '14px 16px',
                      textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                      position: 'relative', transition: 'all 0.15s',
                    }}
                  >
                    {rec && (
                      <div style={{ position: 'absolute', top: -10, right: 16 }}>
                        <Pill variant="ink">Recommended</Pill>
                      </div>
                    )}
                    <div className="row ai-c jc-b">
                      <div className="row ai-c g-3">
                        <span style={{
                          width: 14, height: 14, borderRadius: '50%',
                          border: '1.5px solid ' + (on ? 'var(--accent)' : 'var(--ink-3)'),
                          background: on ? 'var(--accent)' : 'transparent',
                          boxShadow: on ? 'inset 0 0 0 3px var(--paper-warm)' : 'none',
                          flexShrink: 0,
                        }}/>
                        <div>
                          <div className="serif" style={{ fontSize: 18 }}>{name}</div>
                          <div className="caption">{tag}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="display" style={{ fontSize: 24, lineHeight: 1 }}>{p.price}</div>
                        <div className="caption">{p.period}</div>
                      </div>
                    </div>
                    {on && p.savings && (
                      <div className="marginalia" style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--rule)' }}>
                        {p.savings} · works out to {p.monthly}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <hr className="rule" style={{ margin: '28px 0 20px' }} />

            <Eyebrow>§ Payment</Eyebrow>
            <div className="col g-3" style={{ marginTop: 12 }}>
              <Input label="Card number" placeholder="4242 4242 4242 4242" onChange={(e) => setCardFilled(e.target.value.length > 4)} />
              <div className="row g-2">
                <Input label="Expiry" placeholder="MM / YY" />
                <Input label="CVC" placeholder="123" />
              </div>
              <Input label="Name on card" placeholder="Ishita Rao" />
            </div>

            <div className="row ai-c g-2" style={{ marginTop: 16 }}>
              <span className="caption">or pay with</span>
              <Btn variant="ghost" size="sm">UPI</Btn>
              <Btn variant="ghost" size="sm">Net banking</Btn>
              <Btn variant="ghost" size="sm">Razorpay</Btn>
            </div>

            <hr className="rule" style={{ margin: '24px 0' }} />

            <div className="row ai-c jc-b" style={{ marginBottom: 16 }}>
              <span className="serif" style={{ fontSize: 16 }}>Total today</span>
              <span className="display" style={{ fontSize: 28 }}>{plans[plan].price}</span>
            </div>

            <Btn variant="accent" size="lg" onClick={onDone} style={{ width: '100%', justifyContent: 'center' }}>
              Unlock dashboard →
            </Btn>

            <div className="caption" style={{ marginTop: 12, lineHeight: 1.55 }}>
              Secure payment via Razorpay · Cancel anytime from settings · Full refund within 7 days, no questions.
            </div>
          </div>

          <div className="row ai-c jc-c g-4" style={{ marginTop: 20, opacity: 0.7 }}>
            <span className="caption">🔒 256-bit encrypted</span>
            <span className="caption">GST invoice included</span>
          </div>
        </div>
      </div>

      <hr className="rule" style={{ margin: '48px 0 24px' }} />
      <div className="row ai-c jc-b">
        <Btn variant="ghost" onClick={onBack}>← Back to preview</Btn>
        <div className="marginalia">Not ready? Your dashboard will wait in your account for 30 days.</div>
      </div>
    </div>
  );
};

window.OnboardPaywall = OnboardPaywall;
