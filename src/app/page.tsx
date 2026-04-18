'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Logo, Eyebrow, SectionOpen, Pill, Btn, Input, Ornament, MiniLine } from '@/components/ui'

const SERIF = "'Instrument Serif', 'EB Garamond', Georgia, serif"
const MONO = 'var(--font-geist-mono)'

export default function LandingPage() {
  const router = useRouter()
  const [channelUrl, setChannelUrl] = useState('')

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* Masthead */}
      <nav style={{ borderBottom: '1px solid var(--rule)', padding: '18px 64px', position: 'sticky', top: 0, background: 'var(--paper)', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: 'var(--ink-2)' }}>
              Pricing
            </button>
            <Btn variant="ghost" size="sm" href="/login">Sign in</Btn>
            <Btn variant="accent" size="sm" href="/login">Begin →</Btn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '96px 64px 64px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'start' }}>
          <div>
            <Eyebrow accent>A quieter way to grow · Issue 001</Eyebrow>
            <h1 style={{ fontFamily: SERIF, fontSize: 92, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.95, margin: '16px 0 24px' }}>
              Stop <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>guessing,</span><br />
              what to <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>post.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 480, marginTop: 28 }}>
              ChannelIQ reads your channel and your competitors' the way a good editor reads a newspaper —
              looking for what's missing, what's working, and what to write next.
            </p>
            <div style={{ marginTop: 40 }}>
              <label style={{ display: 'block', fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 6 }}>
                Paste your channel to begin
              </label>
              <div style={{ display: 'flex', gap: 8, maxWidth: 520 }}>
                <Input placeholder="youtube.com/@yourchannel" value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') router.push('/login') }} lg />
                <Btn variant="accent" size="lg" onClick={() => router.push('/login')} style={{ whiteSpace: 'nowrap' }}>Begin →</Btn>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)', marginTop: 12 }}>
                Free to try · No card until you've seen the dashboard
              </div>
            </div>
          </div>
          <DashboardPreviewCard />
        </div>

        {/* Contents strip */}
        <div style={{ marginTop: 96, paddingTop: 24, borderTop: '1px solid var(--rule)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 48 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.16em', color: 'var(--ink-3)' }}>In this issue</div>
              <div style={{ fontFamily: SERIF, fontSize: 22, marginTop: 8 }}>What's inside the dashboard</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, flex: 1, maxWidth: 780 }}>
              {[['01','Benchmark','You vs your neighbourhood'],['02','Outliers','Videos that broke the pattern'],['03','Atlas','Unwritten topics in your niche'],['04','Timing','When your audience shows up']].map(([n,t,d]) => (
                <div key={n}>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>{n}</div>
                  <div style={{ fontFamily: SERIF, fontSize: 20, marginTop: 6 }}>{t}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      {/* How it works */}
      <section style={{ padding: '64px 64px 96px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionOpen num="§ 01">The method</SectionOpen>
        <h2 style={{ fontFamily: SERIF, fontSize: 56, fontWeight: 400, maxWidth: 720, margin: '8px 0 48px' }}>
          Three inputs. One honest look at the field you're playing on.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {[
            { num: 'I.', title: 'Connect your channel', body: "A read-only handshake with YouTube. We fetch the last two years of your uploads, views, retention, and comments.", note: 'Takes about forty seconds.' },
            { num: 'II.', title: 'Name your neighbours', body: "Three to ten channels that orbit yours. Direct competitors, aspirational ones, or the one creator whose numbers keep you up at night.", note: 'We suggest ten based on your content.' },
            { num: 'III.', title: 'Read the dashboard', body: "A quiet room where your channel and theirs are laid side by side — plotted, compared, and annotated. Refreshed every morning.", note: 'First edition prints in four minutes.' },
          ].map((s, i) => (
            <article key={i}>
              <div style={{ fontFamily: SERIF, fontSize: 48, color: 'var(--accent)', lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
              <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 400, margin: '0 0 12px' }}>{s.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{s.body}</p>
              <hr style={{ border: 'none', borderTop: '1px dashed var(--rule)', margin: '24px 0' }} />
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'var(--brass)' }}>{s.note}</div>
            </article>
          ))}
        </div>
      </section>

      <Ornament />

      {/* Pricing */}
      <section id="pricing" style={{ padding: '96px 64px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionOpen num="§ 04">Subscription</SectionOpen>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 56, fontWeight: 400, margin: 0 }}>One price. Cancel whenever.</h2>
          <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'var(--brass)', maxWidth: 280, textAlign: 'right' as const }}>
            No tiers, no upsells.<br />Try first, pay only if it earns its keep.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          <PlanCard name="Quarterly" price="₹2,400" period="per quarter" tag="for the curious" features={['1 channel','Up to 10 competitors','Daily refresh','Email the dashboard']} />
          <PlanCard name="Annual" price="₹7,200" period="per year" tag="for the committed" features={['1 channel','Up to 10 competitors','Daily refresh','Script atlas','Two months free']} featured />
          <PlanCard name="Studio" price="₹24,000" period="per year" tag="for agencies" features={['Up to 5 channels','Unlimited competitors','Shared workspace','Weekly print edition']} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--rule)', padding: '48px 64px', background: 'var(--paper-warm)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Logo />
            <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>© 2026 ChannelIQ · Mumbai</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DashboardPreviewCard() {
  return (
    <div style={{ background: 'var(--paper-card)', border: '1px solid var(--rule-soft)', borderRadius: 10, padding: 28, boxShadow: '0 1px 0 rgba(26,26,26,0.04), 0 20px 40px -18px rgba(26,26,26,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Eyebrow accent>Today's field report</Eyebrow>
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>18 Apr · 06:00 IST</span>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '12px 0 20px' }} />
      <div style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1.15, marginBottom: 8 }}>
        You're growing <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>1.4× faster</span> than the median.
      </div>
      <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 24 }}>
        But three neighbours posted about <em style={{ color: 'var(--brass)' }}>"SIP vs NPS"</em> this week.
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>Subs · last 30d</span>
        <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)' }}>+4,820 ▲</span>
      </div>
      <MiniLine w={380} h={72} data={[4,5,6,8,7,10,13,11,14,17,16,20,22,24]} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--rule)' }}>
        {[['Outliers','2','this week'],['Unwritten','14','in your niche'],['Best day','Sat','10 AM IST']].map(([l,v,s]) => (
          <div key={l}>
            <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{l}</div>
            <div style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1, margin: '4px 0' }}>{v}</div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlanCard({ name, price, period, tag, features, featured }: {
  name: string; price: string; period: string; tag: string; features: string[]; featured?: boolean
}) {
  const router = useRouter()
  return (
    <div style={{ background: 'var(--paper-card)', border: featured ? '1px solid var(--ink)' : '1px solid var(--rule-soft)', borderRadius: 10, padding: 32, position: 'relative' }}>
      {featured && <div style={{ position: 'absolute', top: -12, left: 32 }}><Pill variant="ink">Most read</Pill></div>}
      <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>{tag}</div>
      <div style={{ fontFamily: SERIF, fontSize: 28, marginTop: 6 }}>{name}</div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '16px 0' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em' }}>{price}</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{period}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: SERIF, color: 'var(--accent)', fontSize: 14 }}>—</span>
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{f}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <Btn variant={featured ? 'primary' : 'ghost'} onClick={() => router.push('/login')} style={{ width: '100%', justifyContent: 'center' }}>
          Choose {name}
        </Btn>
      </div>
    </div>
  )
}
