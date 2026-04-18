/* TubeLens — Onboarding · Step 02: Connect YouTube channel
   Editorial Option B: big one-field screen with rich context + reassurance.
*/

const OnboardConnect = ({ onNext }) => {
  const [status, setStatus] = React.useState('idle'); // idle | fetching | found
  const [url, setUrl] = React.useState('');

  // Simulate fetch
  const simulate = () => {
    setStatus('fetching');
    setTimeout(() => setStatus('found'), 1600);
  };

  const found = {
    name: 'Ishita Rao',
    handle: '@ishita-finance',
    subs: '184K',
    videos: '142',
    niche: 'Personal Finance · Hindi / English',
    avg: '42K',
  };

  return (
    <>
      <SectionOpen num="Chapter II">Connect your channel</SectionOpen>

      <h1 className="display" style={{ fontSize: 56, margin: '8px 0 20px' }}>
        Let's find <span className="italic" style={{ color: 'var(--accent)' }}>your</span> channel first.
      </h1>
      <p className="body-lg" style={{ maxWidth: 560, marginBottom: 48 }}>
        Paste your YouTube URL or handle, then give ChannelIQ a read-only handshake with YouTube.
        We'll pull the last two years of your content so the dashboard has something real to say.
      </p>

      {status !== 'found' && (
        <div className="card" style={{ padding: 40 }}>
          <label className="label">Your channel URL or handle</label>
          <div className="row g-3" style={{ alignItems: 'stretch' }}>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="youtube.com/@yourchannel  or  @yourchannel"
              lg
              style={{ fontFamily: 'var(--mono)', fontSize: 15 }}
            />
            <Btn
              variant="primary"
              size="lg"
              onClick={simulate}
              style={{ whiteSpace: 'nowrap' }}
            >
              {status === 'fetching' ? 'Reading…' : 'Find channel'}
            </Btn>
          </div>

          <div className="row ai-c g-2" style={{ marginTop: 16 }}>
            <span className="caption">Try</span>
            {['@warikoo', '@pranjalkamra', '@labourlawadvisor'].map(h => (
              <button
                key={h}
                onClick={() => setUrl(h)}
                style={{ background: 'transparent', border: '1px solid var(--rule)', padding: '3px 10px', borderRadius: 999, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-2)', cursor: 'pointer' }}
              >{h}</button>
            ))}
          </div>

          {status === 'fetching' && (
            <div style={{ marginTop: 32 }}>
              <div className="meter meter-accent"><span style={{ width: '60%', animation: 'pulse 1.5s ease infinite' }} /></div>
              <div className="caption" style={{ marginTop: 10 }}>Looking up channel · verifying handle · reading metadata…</div>
            </div>
          )}
        </div>
      )}

      {status === 'found' && (
        <>
          <div className="card" style={{ padding: 40 }}>
            <div className="row ai-c g-4">
              <ChannelMark name={found.name} size={64} bg="var(--accent)" />
              <div style={{ flex: 1 }}>
                <Eyebrow>We found</Eyebrow>
                <div className="serif" style={{ fontSize: 28, marginTop: 2 }}>{found.name}</div>
                <div className="caption">{found.handle} · {found.niche}</div>
              </div>
              <button
                onClick={() => { setStatus('idle'); setUrl(''); }}
                className="btn-text"
                style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--ink-3)', cursor: 'pointer', padding: '4px 0', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-2)' }}
              >Not this one</button>
            </div>

            <hr className="rule" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {[['Subscribers', found.subs], ['Videos', found.videos], ['Avg. views', found.avg]].map(([l, v]) => (
                <div key={l}>
                  <div className="caption">{l}</div>
                  <div className="display" style={{ fontSize: 36, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue */}
          <div className="row ai-c jc-b" style={{ marginTop: 32 }}>
            <div className="marginalia">Looks good. Let's add your competitors next.</div>
            <Btn variant="accent" size="lg" onClick={onNext}>
              Continue →
            </Btn>
          </div>
        </>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </>
  );
};

window.OnboardConnect = OnboardConnect;
