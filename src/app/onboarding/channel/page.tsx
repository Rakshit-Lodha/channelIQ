'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo, Eyebrow, SectionOpen, Btn, Input, Meter, ChannelMark, formatCount } from '@/components/ui'
import { useStore, type ChannelData } from '@/lib/store'

const SERIF = "'Instrument Serif', 'EB Garamond', Georgia, serif"
const MONO = 'var(--font-geist-mono)'

export default function ChannelPage() {
  const router = useRouter()
  const { myChannel, setMyChannel, user } = useStore()
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'error'>('idle')
  const [found, setFound] = useState<ChannelData | null>(myChannel)
  const [errorMsg, setErrorMsg] = useState('')

  const lookup = async () => {
    if (!url.trim()) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/youtube/channel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Channel not found')
      setFound(data.channel)
      setStatus('found')
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not find that channel')
      setStatus('error')
    }
  }

  const confirm = () => {
    if (!found) return
    setMyChannel(found)
    router.push('/onboarding/competitors')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>
              {user ? `Signed in as ${user.email}` : 'Not signed in'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <OnboardingProgress step={0} />

      {/* Content */}
      <div style={{ flex: 1, padding: '64px 48px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 720, width: '100%' }}>
          <SectionOpen num="Chapter II">Connect your channel</SectionOpen>
          <h1 style={{ fontFamily: SERIF, fontSize: 56, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.95, margin: '8px 0 20px' }}>
            Let's find <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>your</span> channel first.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 560, marginBottom: 48 }}>
            Paste your YouTube channel URL or handle. We'll fetch your public stats so the dashboard has something real to say.
          </p>

          {status !== 'found' && (
            <div style={{ background: 'var(--paper-card)', border: '1px solid var(--rule-soft)', borderRadius: 10, padding: 40 }}>
              <label style={{ display: 'block', fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 6 }}>
                Your channel URL or handle
              </label>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && lookup()}
                  placeholder="youtube.com/@yourchannel  or  @yourchannel"
                  lg
                  error={status === 'error' ? errorMsg : undefined}
                  style={{ fontFamily: MONO, fontSize: 15 }}
                />
                <Btn variant="primary" size="lg" onClick={lookup} disabled={status === 'loading'} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {status === 'loading' ? 'Looking…' : 'Find channel'}
                </Btn>
              </div>

              {/* Quick suggestions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>Try</span>
                {['@warikoo', '@pranjalkamra', '@BBKiVines'].map(h => (
                  <button key={h} onClick={() => setUrl(h)} style={{ background: 'transparent', border: '1px solid var(--rule)', padding: '3px 10px', borderRadius: 999, fontFamily: MONO, fontSize: 11, color: 'var(--ink-2)', cursor: 'pointer' }}>{h}</button>
                ))}
              </div>

              {status === 'loading' && (
                <div style={{ marginTop: 32 }}>
                  <Meter value={0.6} animated />
                  <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)', marginTop: 10 }}>
                    Looking up channel · verifying handle · reading metadata…
                  </div>
                </div>
              )}
            </div>
          )}

          {status === 'found' && found && (
            <div className="animate-fade-in">
              <div style={{ background: 'var(--paper-card)', border: '1px solid var(--rule-soft)', borderRadius: 10, padding: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <ChannelMark name={found.title} size={64} thumbnailUrl={found.thumbnailUrl} />
                  <div style={{ flex: 1 }}>
                    <Eyebrow>We found</Eyebrow>
                    <div style={{ fontFamily: SERIF, fontSize: 28, marginTop: 2 }}>{found.title}</div>
                    <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>
                      {found.customUrl || found.handle}{found.country ? ` · ${found.country}` : ''}
                    </div>
                  </div>
                  <button onClick={() => { setStatus('idle'); setUrl('') }} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--ink-3)', cursor: 'pointer', padding: '4px 0', fontFamily: 'var(--font-geist-sans)', fontSize: 13, color: 'var(--ink-2)' }}>
                    Not this one
                  </button>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '24px 0' }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                  {[['Subscribers', formatCount(found.subscriberCount)], ['Videos', formatCount(found.videoCount)], ['Total views', formatCount(found.viewCount)]].map(([l, v]) => (
                    <div key={l}>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{l}</div>
                      <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, marginTop: 4 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 }}>
                <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'var(--brass)' }}>
                  Looks good. Let's add your competitors next.
                </div>
                <Btn variant="accent" size="lg" onClick={confirm}>Continue →</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function OnboardingProgress({ step }: { step: number }) {
  const steps = [
    { n: '02', t: 'Connect channel' },
    { n: '03', t: 'Competitors' },
    { n: '04', t: 'Generating' },
    { n: '05', t: 'Unlock' },
  ]
  return (
    <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 48px', background: 'var(--paper-warm)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        {steps.map((s, i) => {
          const state = i < step ? 'done' : i === step ? 'on' : 'todo'
          return (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: state === 'todo' ? 0.5 : 1 }}>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: state === 'on' ? 'var(--accent)' : state === 'done' ? 'var(--ink)' : 'var(--ink-4)' }}>
                  {state === 'done' ? '✓' : s.n}
                </span>
                <span style={{ fontFamily: SERIF, fontSize: 15, color: state === 'on' ? 'var(--ink)' : state === 'done' ? 'var(--ink-2)' : 'var(--ink-3)', fontStyle: state === 'on' ? 'italic' : 'normal' }}>
                  {s.t}
                </span>
              </div>
              {i < steps.length - 1 && <div style={{ width: 40, height: 1, background: i < step ? 'var(--ink)' : 'var(--rule)', flexShrink: 0 }} />}
            </div>
          )
        })}
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>Step {steps[step].n} of 05</span>
      </div>
    </div>
  )
}
