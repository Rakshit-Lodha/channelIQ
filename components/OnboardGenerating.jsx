/* TubeLens — Onboarding · Step 04: Generating the dashboard
   "Progressive overload" — the screen fills up with modules as they're generated.
   The user sees a live, teasing preview of their dashboard. Blurred/locked state
   awaits payment in the next step.
*/

const TASKS = [
  { id: 'inventory', title: 'Taking inventory', detail: 'Reading your last 142 uploads', duration: 2000 },
  { id: 'neighbours', title: 'Measuring the neighbourhood', detail: 'Benchmarking against 3 channels', duration: 2200 },
  { id: 'outliers', title: 'Spotting outliers', detail: 'Finding videos that broke the pattern', duration: 2400 },
  { id: 'timing', title: 'Reading the clock', detail: 'Learning when your audience shows up', duration: 1800 },
  { id: 'atlas', title: 'Drawing the topic atlas', detail: 'Mapping what you\'ve covered vs. theirs', duration: 3000 },
  { id: 'gaps', title: 'Finding unwritten topics', detail: 'Demand vs. supply analysis', duration: 2600 },
  { id: 'script', title: 'Stocking the script lab', detail: 'Generating 6 research-backed ideas', duration: 3200 },
];

const OnboardGenerating = ({ onNext, onBack }) => {
  const [progress, setProgress] = React.useState({}); // id -> 0..1
  const [done, setDone] = React.useState(new Set());

  // Kick off all tasks in sequence-ish — they overlap for realism
  React.useEffect(() => {
    const timers = [];
    let startDelay = 0;
    TASKS.forEach((t, i) => {
      const start = startDelay;
      startDelay += 400; // stagger starts
      const steps = 40;
      const interval = t.duration / steps;
      for (let s = 1; s <= steps; s++) {
        timers.push(setTimeout(() => {
          setProgress(p => ({ ...p, [t.id]: s / steps }));
          if (s === steps) setDone(d => new Set([...d, t.id]));
        }, start + s * interval));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const allDone = done.size === TASKS.length;
  const overall = Math.min(1, (Object.values(progress).reduce((a, b) => a + b, 0)) / TASKS.length);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
      <div className="row ai-b jc-b" style={{ marginBottom: 32 }}>
        <div>
          <SectionOpen num="Chapter IV">Printing your edition</SectionOpen>
          <h1 className="display" style={{ fontSize: 56, margin: '8px 0 12px' }}>
            {allDone ? (
              <>Your dashboard is <span className="italic" style={{ color: 'var(--accent)' }}>ready.</span></>
            ) : (
              <>We're <span className="italic" style={{ color: 'var(--accent)' }}>reading</span> your channel now.</>
            )}
          </h1>
          <p className="body-lg" style={{ maxWidth: 560, margin: 0 }}>
            {allDone
              ? 'Take a peek below. The full dashboard unlocks after you pick a plan.'
              : 'This takes about four minutes. Leave the tab open or we\'ll email you when it\'s ready.'}
          </p>
        </div>

        {/* Big circular progress meter */}
        <CircularMeter value={overall} done={allDone} />
      </div>

      {/* Task list */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: 560, margin: '24px auto 0' }}>
        {/* live task list */}
        <div>
          <Eyebrow>§ Printing progress</Eyebrow>
          <hr className="rule" style={{ margin: '12px 0 16px' }} />
          <div className="col g-3">
            {TASKS.map((t) => {
              const p = progress[t.id] || 0;
              const isDone = done.has(t.id);
              const isOn = p > 0 && !isDone;
              return (
                <div key={t.id} style={{ opacity: p === 0 ? 0.45 : 1, transition: 'opacity 0.3s' }}>
                  <div className="row ai-c jc-b">
                    <div className="row ai-c g-2">
                      <span className="mono" style={{
                        fontSize: 11, minWidth: 14,
                        color: isDone ? 'var(--accent)' : isOn ? 'var(--ink)' : 'var(--ink-4)',
                      }}>
                        {isDone ? '✓' : isOn ? '◐' : '○'}
                      </span>
                      <span className="serif" style={{
                        fontSize: 16,
                        fontStyle: isOn ? 'italic' : 'normal',
                        color: isDone ? 'var(--ink-2)' : 'var(--ink)',
                      }}>{t.title}</span>
                    </div>
                    <span className="caption" style={{ color: isDone ? 'var(--accent)' : 'var(--ink-3)' }}>
                      {isDone ? 'done' : isOn ? `${Math.round(p * 100)}%` : 'queued'}
                    </span>
                  </div>
                  <div className="body-sm" style={{ marginTop: 4, marginLeft: 22 }}>{t.detail}</div>
                  <div className="meter meter-accent" style={{ marginTop: 8, marginLeft: 22 }}>
                    <span style={{ width: `${p * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="rule" style={{ margin: '24px 0' }} />
          <div className="marginalia">
            You can close this tab. We'll email ishita@rao.co the moment your dashboard is ready to read.
          </div>
        </div>
      </div>

      <hr className="rule" style={{ margin: '48px 0 24px' }} />

      <div className="row ai-c jc-b">
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <div className="row ai-c g-4">
          <div className="marginalia">
            {allDone ? 'Pick a plan to unlock the full dashboard →' : `${done.size} of ${TASKS.length} sections printed`}
          </div>
          <Btn
            variant="accent"
            size="lg"
            onClick={onNext}
            style={{ opacity: allDone ? 1 : 0.4, pointerEvents: allDone ? 'auto' : 'none' }}
          >
            Continue to unlock →
          </Btn>
        </div>
      </div>
    </div>
  );
};

/* ========== Sub-components ========== */

const CircularMeter = ({ value, done }) => {
  const r = 50;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: 140, height: 140 }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--rule)" strokeWidth="2" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s linear' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div className="display" style={{ fontSize: 32, lineHeight: 1 }}>{Math.round(value * 100)}<span style={{ fontSize: 18, color: 'var(--ink-3)' }}>%</span></div>
        <div className="caption" style={{ marginTop: 4 }}>{done ? 'ready' : 'printing…'}</div>
      </div>
    </div>
  );
};

const PreviewTile = ({ span, done, children }) => (
  <div
    style={{
      gridColumn: `span ${span}`,
      background: 'var(--paper-card)',
      border: '1px solid var(--rule-soft)',
      borderRadius: 10,
      padding: 18,
      position: 'relative',
      minHeight: 140,
      overflow: 'hidden',
      transition: 'opacity 0.6s ease, filter 0.6s ease',
      opacity: done ? 1 : 0.55,
      filter: done ? 'none' : 'blur(3px)',
    }}
  >
    {children}
    {!done && (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245,242,234,0.4)' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ink-3)', animation: 'blink 1.2s ease infinite' }} />
      </div>
    )}
    <style>{`@keyframes blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
  </div>
);

const ChannelHeader = () => (
  <div className="row ai-c g-3">
    <ChannelMark name="Ishita" size={44} bg="var(--accent)" />
    <div style={{ flex: 1 }}>
      <div className="serif" style={{ fontSize: 18 }}>Ishita Rao</div>
      <div className="caption">@ishita-finance · Personal Finance</div>
    </div>
    <div style={{ textAlign: 'right' }}>
      <div className="display" style={{ fontSize: 28, lineHeight: 1 }}>184K</div>
      <div className="caption">subs</div>
    </div>
  </div>
);

const BenchmarkMini = () => (
  <div>
    <Eyebrow>§ Benchmark · 90d</Eyebrow>
    <div style={{ marginTop: 8, height: 70 }}>
      <MiniLine data={[100, 103, 106, 108, 112, 115, 119, 124, 128, 134, 140]} w={300} h={60} />
    </div>
    <div className="row ai-c g-3" style={{ marginTop: 8 }}>
      <span className="caption">You</span>
      <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>+40% ▲</span>
      <span className="caption" style={{ marginLeft: 'auto' }}>1.4× cohort median</span>
    </div>
  </div>
);

const OutlierMini = () => (
  <div>
    <Eyebrow>§ Outliers · 2 found</Eyebrow>
    <div className="serif italic" style={{ fontSize: 15, marginTop: 8, color: 'var(--ink)' }}>
      "Warikoo's NPS breakdown"
    </div>
    <div className="caption">2.4M views · +312% vs his avg</div>
  </div>
);

const TimingMini = () => (
  <div>
    <Eyebrow>§ Best posting time</Eyebrow>
    <div className="display" style={{ fontSize: 28, lineHeight: 1, marginTop: 8 }}>Sat</div>
    <div className="serif italic" style={{ fontSize: 14, color: 'var(--ink-2)' }}>10 AM IST</div>
  </div>
);

const AtlasMini = () => (
  <div>
    <Eyebrow>§ Topic atlas</Eyebrow>
    <div className="row g-1" style={{ flexWrap: 'wrap', marginTop: 8 }}>
      {['SIP', 'Tax', 'NPS', 'MF', 'Stocks', 'Budget'].map((t, i) => (
        <span key={t} className="pill" style={{ fontSize: 10 }}>{t}</span>
      ))}
    </div>
  </div>
);

const GapsMini = () => (
  <div>
    <Eyebrow>§ Unwritten topics · 14</Eyebrow>
    <div className="col g-1" style={{ marginTop: 8 }}>
      {['SIP vs NPS — deep dive', 'Tax on crypto after budget \'26', 'Emergency fund, actually'].map(t => (
        <div key={t} className="row ai-c g-2">
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
          <span className="body-sm">{t}</span>
        </div>
      ))}
    </div>
  </div>
);

const ScriptLabMini = () => (
  <div>
    <Eyebrow>§ Script lab · 6 drafts</Eyebrow>
    <div className="serif italic" style={{ fontSize: 16, color: 'var(--ink)', marginTop: 8 }}>
      "Why every 28-year-old gets NPS wrong"
    </div>
    <div className="caption" style={{ marginTop: 4 }}>Research-backed · 11 min runtime · Hindi + English</div>
  </div>
);

window.OnboardGenerating = OnboardGenerating;
