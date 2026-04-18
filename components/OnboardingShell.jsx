/* TubeLens — Onboarding shell
   Shared layout with: masthead, progress indicator, back/forward, editorial frame.
   Hosts the 4 sub-steps.
*/

const OnboardingShell = ({ step, setStep, children, maxWidth = 720 }) => {
  const steps = [
    { n: '02', t: 'Connect channel' },
    { n: '03', t: 'Competitors' },
    { n: '04', t: 'Generating' },
    { n: '05', t: 'Unlock' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      {/* Masthead */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 48px', background: 'var(--paper)' }}>
        <div className="row ai-c jc-b" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
          <div className="row ai-c g-4">
            <span className="caption">Signed in as ishita@rao.co</span>
            <a className="body-sm" style={{ color: 'var(--ink-3)' }}>Save & continue later</a>
          </div>
        </div>
      </div>

      {/* Progress bar — editorial */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 48px', background: 'var(--paper-warm)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="row ai-c g-3">
            {steps.map((s, i) => {
              const state = i < step ? 'done' : i === step ? 'on' : 'todo';
              return (
                <React.Fragment key={s.n}>
                  <div className="row ai-c g-2" style={{ opacity: state === 'todo' ? 0.5 : 1 }}>
                    <span className="mono" style={{
                      fontSize: 10, letterSpacing: '0.14em',
                      color: state === 'on' ? 'var(--accent)' : state === 'done' ? 'var(--ink)' : 'var(--ink-4)',
                    }}>
                      {state === 'done' ? '✓' : s.n}
                    </span>
                    <span className="serif" style={{
                      fontSize: 15,
                      color: state === 'on' ? 'var(--ink)' : state === 'done' ? 'var(--ink-2)' : 'var(--ink-3)',
                      fontStyle: state === 'on' ? 'italic' : 'normal',
                    }}>{s.t}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ flex: '0 0 40px', height: 1, background: i < step ? 'var(--ink)' : 'var(--rule)' }} />
                  )}
                </React.Fragment>
              );
            })}
            <div className="grow" />
            <span className="caption">Step {steps[step].n} of 05</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '64px 48px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth, width: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

window.OnboardingShell = OnboardingShell;
