/* TubeLens — Onboarding · Step 03: Competitors
   Option C inspired: paste + list + suggested channels pulled from niche.
   Max 10 competitors. Live preview of card as they add.
*/

const SUGGESTED = [
  { name: 'Warikoo', handle: '@warikoo', subs: '4.2M', bg: '#C44536' },
  { name: 'Pranjal Kamra', handle: '@pranjalkamra', subs: '6.1M', bg: '#4A6B52' },
  { name: 'Labour Law Advisor', handle: '@labourlawadvisor', subs: '5.8M', bg: '#8B6A3A' },
  { name: 'CA Rachana', handle: '@carachanaranade', subs: '4.9M', bg: '#2A5A7A' },
  { name: 'Asset Yogi', handle: '@assetyogi', subs: '4.0M', bg: '#6B3A5A' },
  { name: 'Shashank Udupa', handle: '@shashankudupa', subs: '560K', bg: '#3A3A36' },
  { name: 'Think School', handle: '@thinkschool', subs: '3.8M', bg: '#A03828' },
  { name: 'Neeraj Arora', handle: '@neerajarora', subs: '1.2M', bg: '#5A4A3A' },
];

const OnboardCompetitors = ({ onNext, onBack }) => {
  const [added, setAdded] = React.useState([SUGGESTED[0], SUGGESTED[1], SUGGESTED[2]]);
  const [input, setInput] = React.useState('');

  const add = (c) => {
    if (added.find(a => a.handle === c.handle)) return;
    if (added.length >= 10) return;
    setAdded([...added, c]);
  };
  const remove = (h) => setAdded(added.filter(a => a.handle !== h));

  const addFromInput = () => {
    if (!input.trim()) return;
    const handle = input.startsWith('@') ? input : '@' + input.replace(/.*\//, '');
    add({ name: handle.replace('@', ''), handle, subs: '—', bg: 'var(--brass)' });
    setInput('');
  };

  return (
    <>
      <SectionOpen num="Chapter III">Name your neighbours</SectionOpen>

      <div className="row ai-b jc-b" style={{ marginBottom: 12 }}>
        <h1 className="display" style={{ fontSize: 56, margin: 0, maxWidth: 600 }}>
          Who's in <span className="italic" style={{ color: 'var(--accent)' }}>your</span> neighbourhood?
        </h1>
        <div className="marginalia" style={{ maxWidth: 260, textAlign: 'right' }}>
          Pick between three and ten. More is not better — better is better.
        </div>
      </div>
      <p className="body-lg" style={{ maxWidth: 600, marginBottom: 40 }}>
        These are the channels we'll compare yours against — in growth rate, posting cadence, topics,
        and outliers. Mix direct competitors, aspirational channels, and one wild card.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40 }}>
        {/* LEFT — paste + added list */}
        <div>
          <div className="card" style={{ padding: 24 }}>
            <label className="label">Add by URL or handle</label>
            <div className="row g-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="youtube.com/@channel  or  @channel"
                onKeyDown={(e) => e.key === 'Enter' && addFromInput()}
                style={{ fontFamily: 'var(--mono)', fontSize: 14 }}
              />
              <Btn variant="primary" onClick={addFromInput}>Add</Btn>
            </div>
            <div className="caption" style={{ marginTop: 10 }}>Or paste a list separated by commas or new lines.</div>
          </div>

          <div style={{ marginTop: 32 }}>
            <div className="row ai-b jc-b" style={{ marginBottom: 12 }}>
              <Eyebrow>§ Your neighbourhood ({added.length}/10)</Eyebrow>
              {added.length >= 3 && <Pill variant="accent" dot>Ready to continue</Pill>}
            </div>

            <div className="col">
              {added.length === 0 && (
                <div className="card-muted" style={{ padding: 32, textAlign: 'center' }}>
                  <div className="serif italic" style={{ fontSize: 18, color: 'var(--ink-3)' }}>No neighbours yet.</div>
                  <div className="caption" style={{ marginTop: 6 }}>Add at least three to continue.</div>
                </div>
              )}
              {added.map((c, i) => (
                <div key={c.handle} className="row ai-c g-3" style={{ padding: '14px 4px', borderTop: i ? '1px dashed var(--rule)' : '1px solid var(--rule)', borderBottom: i === added.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', width: 22 }}>{String(i + 1).padStart(2, '0')}</span>
                  <ChannelMark name={c.name} size={36} bg={c.bg} />
                  <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 16 }}>{c.name}</div>
                    <div className="caption">{c.handle} · {c.subs} subs</div>
                  </div>
                  <button onClick={() => remove(c.handle)} style={{ background: 'transparent', border: 'none', color: 'var(--ink-3)', cursor: 'pointer', fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1 }}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — suggested */}
        <div>
          <div className="card-muted" style={{ padding: 24 }}>
            <Eyebrow accent>§ Suggested by ChannelIQ</Eyebrow>
            <div className="body-sm" style={{ marginTop: 6, marginBottom: 20 }}>
              Based on your channel topic & language. Tap to add.
            </div>
            <div className="col">
              {SUGGESTED.map((c, i) => {
                const isAdded = added.find(a => a.handle === c.handle);
                return (
                  <button
                    key={c.handle}
                    onClick={() => isAdded ? remove(c.handle) : add(c)}
                    className="row ai-c g-3"
                    style={{
                      padding: '12px 4px',
                      borderTop: i ? '1px dashed var(--rule)' : '1px solid var(--rule)',
                      borderBottom: i === SUGGESTED.length - 1 ? '1px solid var(--rule)' : 'none',
                      background: 'transparent', border: 'none', width: '100%', textAlign: 'left',
                      cursor: 'pointer',
                      borderTopWidth: i ? 1 : 1,
                    }}
                  >
                    <ChannelMark name={c.name} size={32} bg={c.bg} />
                    <div style={{ flex: 1 }}>
                      <div className="serif" style={{ fontSize: 15 }}>{c.name}</div>
                      <div className="caption">{c.handle} · {c.subs}</div>
                    </div>
                    <span className="mono" style={{ fontSize: 11, color: isAdded ? 'var(--accent)' : 'var(--ink-3)' }}>
                      {isAdded ? '✓ added' : '+ add'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <hr className="rule" style={{ margin: '48px 0 32px' }} />

      <div className="row ai-c jc-b">
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <div className="row ai-c g-4">
          <div className="marginalia">{added.length < 3 ? `Add ${3 - added.length} more to continue` : 'Looks good.'}</div>
          <Btn
            variant="accent"
            size="lg"
            onClick={onNext}
            style={{ opacity: added.length < 3 ? 0.4 : 1, pointerEvents: added.length < 3 ? 'none' : 'auto' }}
          >
            Generate dashboard →
          </Btn>
        </div>
      </div>
    </>
  );
};

window.OnboardCompetitors = OnboardCompetitors;
