'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo, Eyebrow, SectionOpen, Btn, Input, Meter, ChannelMark, Pill, formatCount } from '@/components/ui'
import { useStore, type ChannelData } from '@/lib/store'
import { OnboardingProgress } from '../channel/page'
import { saveChannel, deleteChannel } from '@/lib/supabase/channels'

const SERIF = "'Instrument Serif', 'EB Garamond', Georgia, serif"
const MONO = 'var(--font-geist-mono)'

const SUGGESTED_HANDLES = ['@warikoo', '@pranjalkamra', '@labourlawadvisor', '@carachanaranade', '@assetyogi', '@thinkschool']

export default function CompetitorsPage() {
  const router = useRouter()
  const { competitors, addCompetitor, removeCompetitor, startGenerating } = useStore()
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const lookup = async (inputUrl?: string) => {
    const target = (inputUrl ?? url).trim()
    if (!target) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/youtube/channel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Channel not found')
      addCompetitor(data.channel)
      await saveChannel(data.channel, false)
      setUrl('')
      setStatus('idle')
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not find that channel')
      setStatus('error')
    }
  }

  const proceed = () => {
    startGenerating()
    router.push('/onboarding/generating')
  }

  const canContinue = competitors.length >= 1

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
        </div>
      </div>

      <OnboardingProgress step={1} />

      <div style={{ flex: 1, padding: '64px 48px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 860, width: '100%' }}>
          <SectionOpen num="Chapter III">Name your neighbours</SectionOpen>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <h1 style={{ fontFamily: SERIF, fontSize: 52, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.95, margin: 0, maxWidth: 560 }}>
              Who's in <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>your</span> neighbourhood?
            </h1>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'var(--brass)', maxWidth: 220, textAlign: 'right' as const, paddingTop: 8 }}>
              Pick 1–10. Direct competitors, aspirational channels, or a wild card.
            </div>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 600, marginBottom: 40 }}>
            These are the channels we'll compare yours against — in growth rate, posting cadence, topics, and outliers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40 }}>
            {/* Left — search + added list */}
            <div>
              <div style={{ background: 'var(--paper-card)', border: '1px solid var(--rule-soft)', borderRadius: 10, padding: 24, marginBottom: 32 }}>
                <label style={{ display: 'block', fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 6 }}>
                  Add by URL or handle
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Input
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && lookup()}
                    placeholder="youtube.com/@channel  or  @channel"
                    error={status === 'error' ? errorMsg : undefined}
                    style={{ fontFamily: MONO, fontSize: 14 }}
                  />
                  <Btn variant="primary" onClick={() => lookup()} disabled={status === 'loading'}>
                    {status === 'loading' ? '…' : 'Add'}
                  </Btn>
                </div>
                {status === 'loading' && <div style={{ marginTop: 12 }}><Meter value={0.5} animated /></div>}

                {/* Quick suggestions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, flexWrap: 'wrap' as const }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>Try:</span>
                  {SUGGESTED_HANDLES.slice(0, 3).map(h => (
                    <button key={h} onClick={() => lookup(h)} style={{ background: 'transparent', border: '1px solid var(--rule)', padding: '2px 8px', borderRadius: 999, fontFamily: MONO, fontSize: 11, color: 'var(--ink-2)', cursor: 'pointer' }}>{h}</button>
                  ))}
                </div>
              </div>

              {/* Added channels */}
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                  <Eyebrow>§ Your neighbourhood ({competitors.length}/10)</Eyebrow>
                  {canContinue && <Pill variant="accent" dot>Ready to continue</Pill>}
                </div>

                {competitors.length === 0 ? (
                  <div style={{ background: 'var(--paper-warm)', border: '1px solid var(--rule-soft)', borderRadius: 10, padding: 32, textAlign: 'center' as const }}>
                    <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: 'var(--ink-3)' }}>No neighbours yet.</div>
                    <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-4)', marginTop: 6 }}>Add at least one to continue.</div>
                  </div>
                ) : (
                  <div>
                    {competitors.map((c, i) => (
                      <ChannelRow key={c.id} channel={c} index={i} isLast={i === competitors.length - 1} onRemove={() => {
                      removeCompetitor(c.id)
                      deleteChannel(c.id)
                    }} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right — you vs competitors preview */}
            <div>
              <div style={{ background: 'var(--paper-warm)', border: '1px solid var(--rule-soft)', borderRadius: 10, padding: 24 }}>
                <Eyebrow accent>§ What we'll compare</Eyebrow>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 6, marginBottom: 20 }}>
                  These metrics will be benchmarked per channel you add.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    ['Growth rate', 'Subscriber change, 30 / 90 / 365 days'],
                    ['Posting cadence', 'How often they publish vs. you'],
                    ['Outlier videos', 'Videos that beat their own average by 2×+'],
                    ['Topic coverage', "What they've covered that you haven't"],
                    ['Best timing', 'Day + hour with highest engagement'],
                    ['Avg. view rate', 'Views per video, weighted by recency'],
                  ].map(([t, d], i, arr) => (
                    <div key={t} style={{ padding: '12px 0', borderTop: i === 0 ? '1px solid var(--rule)' : '1px dashed var(--rule)', borderBottom: i === arr.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                      <div style={{ fontFamily: SERIF, fontSize: 15 }}>{t}</div>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '48px 0 32px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Btn variant="ghost" onClick={() => router.push('/onboarding/channel')}>← Back</Btn>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'var(--brass)' }}>
                {!canContinue ? 'Add at least one competitor to continue.' : 'Looks good.'}
              </div>
              <Btn variant="accent" size="lg" onClick={proceed} disabled={!canContinue}>
                Generate dashboard →
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChannelRow({ channel, index, isLast, onRemove }: { channel: ChannelData; index: number; isLast: boolean; onRemove: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 4px', borderTop: '1px solid var(--rule)', borderBottom: isLast ? '1px solid var(--rule)' : 'none' }} className="animate-fade-in">
      <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-4)', width: 22 }}>{String(index + 1).padStart(2, '0')}</span>
      <ChannelMark name={channel.title} size={36} thumbnailUrl={channel.thumbnailUrl} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: SERIF, fontSize: 16 }}>{channel.title}</div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>
          {channel.customUrl || channel.handle} · {formatCount(channel.subscriberCount)} subs
        </div>
      </div>
      <button onClick={onRemove} style={{ background: 'transparent', border: 'none', color: 'var(--ink-3)', cursor: 'pointer', fontFamily: SERIF, fontSize: 20, lineHeight: 1, padding: '0 4px' }}>×</button>
    </div>
  )
}
