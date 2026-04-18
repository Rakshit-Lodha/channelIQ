/* TubeLens — Sign up / Sign in
   Split spread: editorial left column (masthead, pull-quote), form on the right.
   Simpler than the old Option A one-screen because we now log in BEFORE payment.
*/

const Signup = ({ mode = 'signup', onComplete }) => {
  const [tab, setTab] = React.useState(mode); // 'signup' | 'signin'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Thin top bar */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 48px' }}>
        <div className="row ai-c jc-b" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
          <div className="caption">A quieter way to grow on YouTube</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 60px)' }}>
        {/* LEFT — editorial spread */}
        <div style={{ padding: '96px 64px', background: 'var(--paper-warm)', borderRight: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Eyebrow accent>On joining the almanac</Eyebrow>
            <h1 className="display" style={{ fontSize: 64, margin: '16px 0 32px', maxWidth: 480 }}>
              Begin with your <span className="italic">name.</span>
              <br/>
              We'll ask for the rest <span className="italic">after.</span>
            </h1>
            <p className="body-lg" style={{ maxWidth: 440 }}>
              First, let us know who you are. Next, we'll help you set up your channel,
              pick your neighbours, and generate your dashboard. Only then — if you like
              what you see — we'll ask for payment.
            </p>

            <hr className="rule" style={{ margin: '48px 0', maxWidth: 440 }} />

            <div style={{ maxWidth: 440 }}>
              <div className="eyebrow">The four steps</div>
              <div className="col g-3" style={{ marginTop: 16 }}>
                {[
                  ['01', 'Create an account', 'You are here'],
                  ['02', 'Connect your YouTube', '40 seconds'],
                  ['03', 'Name your competitors', '2 minutes'],
                  ['04', 'Read your dashboard', '4 minutes to generate'],
                ].map(([n, t, s], i) => (
                  <div key={n} className="row ai-b g-3">
                    <span className="mono" style={{ fontSize: 11, color: i === 0 ? 'var(--accent)' : 'var(--ink-4)', minWidth: 24 }}>{n}</span>
                    <div>
                      <div className="serif" style={{ fontSize: 18, color: i === 0 ? 'var(--ink)' : 'var(--ink-3)' }}>{t}</div>
                      <div className="caption">{s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pull quote at the bottom */}
          <figure style={{ margin: 0, maxWidth: 440 }}>
            <div className="serif" style={{ fontSize: 40, color: 'var(--accent)', lineHeight: 1 }}>“</div>
            <blockquote className="serif" style={{ fontSize: 22, lineHeight: 1.35, margin: '0 0 16px', fontStyle: 'italic' }}>
              Four days in, ChannelIQ pointed at a topic I'd never have written. It became my most-watched video of the year.
            </blockquote>
            <figcaption className="row ai-c g-3">
              <Avatar name="Aditya Kulkarni" color="var(--ink)" size={32} />
              <div>
                <div className="serif" style={{ fontSize: 14 }}>Aditya Kulkarni</div>
                <div className="caption">Cinema essays · 412K subs</div>
              </div>
            </figcaption>
          </figure>
        </div>

        {/* RIGHT — form */}
        <div style={{ padding: '96px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: 420, width: '100%' }}>
            {/* Tabs */}
            <div className="row g-4" style={{ marginBottom: 32, borderBottom: '1px solid var(--rule)' }}>
              {[['signup', 'Create account'], ['signin', 'Sign in']].map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  style={{
                    background: 'transparent', border: 'none', padding: '10px 0',
                    fontFamily: 'var(--sans)', fontSize: 14,
                    color: tab === k ? 'var(--ink)' : 'var(--ink-3)',
                    fontWeight: tab === k ? 500 : 400,
                    cursor: 'pointer',
                    borderBottom: tab === k ? '2px solid var(--accent)' : '2px solid transparent',
                    marginBottom: -1,
                  }}
                >{l}</button>
              ))}
            </div>

            <SectionOpen num="Step 01 of 04">Create your account</SectionOpen>
            <h2 className="display" style={{ fontSize: 40, margin: '4px 0 32px' }}>
              {tab === 'signup' ? 'Let\'s begin.' : 'Welcome back.'}
            </h2>

            {/* OAuth row */}
            <div className="col g-2">
              <Btn variant="ghost" style={{ justifyContent: 'center', width: '100%', padding: '14px' }}>
                <GoogleMark /> Continue with Google
              </Btn>
            </div>

            <div className="row ai-c g-3" style={{ margin: '24px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              <span className="caption">or with email</span>
              <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
            </div>

            <form className="col g-4" onSubmit={(e) => { e.preventDefault(); onComplete && onComplete(); }}>
              {tab === 'signup' && (
                <Input label="Your name" placeholder="Ishita Rao" />
              )}
              <Input label="Email" type="email" placeholder="you@channel.com" />
              <Input label="Password" type="password" placeholder="At least 8 characters" />

              <Btn variant="accent" size="lg" type="submit" style={{ justifyContent: 'center', width: '100%', marginTop: 8 }}>
                {tab === 'signup' ? 'Create account & continue →' : 'Sign in →'}
              </Btn>
            </form>

            <div className="caption" style={{ marginTop: 24, lineHeight: 1.6 }}>
              {tab === 'signup' ? (
                <>By creating an account you agree to our <a style={{ color: 'var(--ink-2)', borderBottom: '1px solid var(--rule)' }}>Terms</a> and <a style={{ color: 'var(--ink-2)', borderBottom: '1px solid var(--rule)' }}>Privacy notice</a>. No payment required until your dashboard is ready.</>
              ) : (
                <>New to ChannelIQ? <a onClick={() => setTab('signup')} style={{ color: 'var(--accent)', cursor: 'pointer', borderBottom: '1px solid var(--accent)' }}>Create an account</a> — it's free to try.</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Simple brand marks */
const GoogleMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v4h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-8z"/>
    <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.3-2-6.2-4.6H2.2v2.8A11 11 0 0 0 12 23z"/>
    <path fill="#FBBC04" d="M5.8 14.1c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1V7.1H2.2a11 11 0 0 0 0 9.8l3.6-2.8z"/>
    <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.6l3.1-3.1A11 11 0 0 0 12 1 11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.4 9.1 5.4 12 5.4z"/>
  </svg>
);
const YouTubeMark = () => (
  <svg width="18" height="14" viewBox="0 0 24 17">
    <path fill="#C44536" d="M23.5 2.6a3 3 0 0 0-2.1-2.1C19.5 0 12 0 12 0S4.5 0 2.6.5A3 3 0 0 0 .5 2.6C0 4.5 0 8.5 0 8.5s0 4 .5 5.9a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.9.5-5.9s0-4-.5-5.9z"/>
    <path fill="#fff" d="M9.6 12.1V4.9l6.3 3.6-6.3 3.6z"/>
  </svg>
);

window.Signup = Signup;
