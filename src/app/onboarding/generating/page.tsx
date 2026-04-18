'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo, SectionOpen, Btn, CircularProgress, ChannelMark, formatCount } from '@/components/ui'
import { useStore } from '@/lib/store'
import { OnboardingProgress } from '../channel/page'

const SERIF = "'Instrument Serif', 'EB Garamond', Georgia, serif"
const MONO = 'var(--font-geist-mono)'

const TASKS = [
  { id: 'inventory', title: 'Taking inventory', detail: 'Reading your uploads & public metadata', duration: 2200 },
  { id: 'neighbours', title: 'Measuring the neighbourhood', detail: 'Benchmarking against your competitors', duration: 2600 },
  { id: 'outliers', title: 'Spotting outliers', detail: 'Finding videos that beat the pattern by 2×+', duration: 2800 },
  { id: 'timing', title: 'Reading the clock', detail: 'Learning when your audience shows up', duration: 2000 },
  { id: 'atlas', title: 'Drawing the topic atlas', detail: "Mapping what you've covered vs. theirs", duration: 3200 },
  { id: 'gaps', title: 'Finding unwritten topics', detail: 'Demand vs. supply gap analysis', duration: 2800 },
  { id: 'script', title: 'Stocking the script lab', detail: 'Generating research-backed video ideas', duration: 3400 },
]

export default function GeneratingPage() {
  const router = useRouter()
  const { myChannel, competitors, finishGenerating } = useStore()
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [done, setDone] = useState<Set<string>>(new Set())

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    let startDelay = 0
    TASKS.forEach((t) => {
      const start = startDelay
      startDelay += 500
      const steps = 40
      const interval = t.duration / steps
      for (let s = 1; s <= steps; s++) {
        timers.push(setTimeout(() => {
          setProgress(p => ({ ...p, [t.id]: s / steps }))
          if (s === steps) setDone(d => new Set([...d, t.id]))
        }, start + s * interval))
      }
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  const allDone = done.size === TASKS.length
  const overall = Math.min(1, Object.values(progress).reduce((a, b) => a + b, 0) / TASKS.length)

  useEffect(() => {
    if (allDone) finishGenerating()
  }, [allDone, finishGenerating])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
        </div>
      </div>

      <OnboardingProgress step={2} />

      <div style={{ flex: 1, padding: '64px 48px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1000, width: '100%' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48 }}>
            <div>
              <SectionOpen num="Chapter IV">Printing your edition</SectionOpen>
              <h1 style={{ fontFamily: SERIF, fontSize: 52, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.95, margin: '8px 0 16px' }}>
                {allDone
                  ? <>Your dashboard is <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>ready.</span></>
                  : <>We're <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>reading</span> your channel now.</>}
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 520, margin: 0 }}>
                {allDone
                  ? 'Everything is printed. Pick a plan below to unlock the full dashboard.'
                  : "This takes about four minutes. You can close the tab — we'll email you when it's ready."}
              </p>
            </div>
            <CircularProgress value={overall} done={allDone} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {/* Task list */}
            <div>
              <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 16 }}>§ Printing progress</div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', marginBottom: 16 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {TASKS.map(t => {
                  const p = progress[t.id] || 0
                  const isDone = done.has(t.id)
                  const isOn = p > 0 && !isDone
                  return (
                    <div key={t.id} style={{ opacity: p === 0 ? 0.4 : 1, transition: 'opacity 0.3s' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontFamily: MONO, fontSize: 11, minWidth: 14, color: isDone ? 'var(--accent)' : isOn ? 'var(--ink)' : 'var(--ink-4)' }}>
                            {isDone ? '✓' : isOn ? '◐' : '○'}
                          </span>
                          <span style={{ fontFamily: SERIF, fontSize: 16, fontStyle: isOn ? 'italic' : 'normal', color: isDone ? 'var(--ink-2)' : 'var(--ink)' }}>
                            {t.title}
                          </span>
                        </div>
                        <span style={{ fontFamily: MONO, fontSize: 11, color: isDone ? 'var(--accent)' : 'var(--ink-3)' }}>
                          {isDone ? 'done' : isOn ? `${Math.round(p * 100)}%` : 'queued'}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 3, marginLeft: 22 }}>{t.detail}</div>
                      <div style={{ height: 3, background: 'var(--rule-soft)', borderRadius: 2, overflow: 'hidden', marginTop: 6, marginLeft: 22 }}>
                        <div style={{ height: '100%', width: `${p * 100}%`, background: 'var(--accent)', borderRadius: 2, transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '24px 0' }} />
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'var(--brass)' }}>
                You can close this tab. We'll email you the moment your dashboard is ready to read.
              </div>
            </div>

            {/* Channel summary preview */}
            <div>
              <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 16 }}>§ Your edition</div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', marginBottom: 16 }} />

              {myChannel && (
                <div style={{ background: 'var(--paper-card)', border: '1px solid var(--rule-soft)', borderRadius: 10, padding: 20, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <ChannelMark name={myChannel.title} size={44} thumbnailUrl={myChannel.thumbnailUrl} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: SERIF, fontSize: 18 }}>{myChannel.title}</div>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{myChannel.customUrl || myChannel.handle}</div>
                    </div>
                    <div style={{ textAlign: 'right' as const }}>
                      <div style={{ fontFamily: SERIF, fontSize: 28, lineHeight: 1 }}>{formatCount(myChannel.subscriberCount)}</div>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>subs</div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: 'var(--ink-4)', marginBottom: 8 }}>
                vs. {competitors.length} competitor{competitors.length !== 1 ? 's' : ''}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {competitors.map((c, i) => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: i === 0 ? '1px solid var(--rule)' : '1px dashed var(--rule)', borderBottom: i === competitors.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                    <ChannelMark name={c.title} size={28} thumbnailUrl={c.thumbnailUrl} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: SERIF, fontSize: 14 }}>{c.title}</div>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{formatCount(c.subscriberCount)} subs</div>
                    </div>
                  </div>
                ))}
              </div>

              {allDone && (
                <div style={{ marginTop: 24, padding: 20, background: 'var(--accent-wash)', border: '1px solid transparent', borderRadius: 10 }} className="animate-fade-in">
                  <div style={{ fontFamily: SERIF, fontSize: 18, color: 'var(--accent-deep)', marginBottom: 4 }}>Dashboard printed.</div>
                  <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--accent-deep)', opacity: 0.8 }}>Pick a plan to unlock the full report.</div>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '48px 0 24px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Btn variant="ghost" onClick={() => router.push('/onboarding/competitors')}>← Back</Btn>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'var(--brass)' }}>
                {allDone ? 'Pick a plan to unlock the full dashboard →' : `${done.size} of ${TASKS.length} sections printed`}
              </div>
              <Btn variant="accent" size="lg" onClick={() => router.push('/onboarding/unlock')} disabled={!allDone}>
                Continue to unlock →
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
