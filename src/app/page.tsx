import type { CSSProperties, ReactNode } from 'react'
import { BILLING_PLANS } from '@/lib/billing/plans'

const SERIF = "'Instrument Serif', 'EB Garamond', Georgia, serif"
const MONO = 'var(--font-geist-mono)'

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <nav style={{ borderBottom: '1px solid var(--rule)', padding: '18px 64px', position: 'sticky', top: 0, background: 'var(--paper)', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#pricing" style={{ textDecoration: 'none', fontSize: 14, color: 'var(--ink-2)' }}>
              Pricing
            </a>
            <ButtonLink variant="ghost" size="sm" href="/login">Sign in</ButtonLink>
            <ButtonLink variant="accent" size="sm" href="/login">Begin -&gt;</ButtonLink>
          </div>
        </div>
      </nav>

      <section style={{ padding: '96px 64px 64px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'start' }}>
          <div>
            <Eyebrow accent>A quieter way to grow · Issue 001</Eyebrow>
            <h1 style={{ fontFamily: SERIF, fontSize: 92, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.95, margin: '16px 0 24px' }}>
              Stop <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>guessing,</span><br />
              what to <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>post.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 480, marginTop: 28 }}>
              ChannelIQ reads your channel and your competitors&apos; the way a good editor reads a newspaper -
              looking for what&apos;s missing, what&apos;s working, and what to write next.
            </p>
            <form action="/login" style={{ marginTop: 40 }}>
              <label htmlFor="channel-url" style={{ display: 'block', fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 6 }}>
                Paste your channel to begin
              </label>
              <div style={{ display: 'flex', gap: 8, maxWidth: 520 }}>
                <input
                  id="channel-url"
                  name="channel"
                  placeholder="youtube.com/@yourchannel"
                  style={inputStyle}
                />
                <button type="submit" style={{ ...buttonStyle('accent', 'lg'), whiteSpace: 'nowrap' }}>Begin -&gt;</button>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)', marginTop: 12 }}>
                Free to try · No card until you&apos;ve seen the dashboard
              </div>
            </form>
          </div>
          <DashboardPreviewCard />
        </div>

        <div style={{ marginTop: 96, paddingTop: 24, borderTop: '1px solid var(--rule)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 48 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--ink-3)' }}>In this issue</div>
              <div style={{ fontFamily: SERIF, fontSize: 22, marginTop: 8 }}>What&apos;s inside the dashboard</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, flex: 1, maxWidth: 780 }}>
              {[
                ['01', 'Benchmark', 'You vs your neighbourhood'],
                ['02', 'Outliers', 'Videos that broke the pattern'],
                ['03', 'Atlas', 'Unwritten topics in your niche'],
                ['04', 'Timing', 'When your audience shows up'],
              ].map(([n, t, d]) => (
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

      <section style={{ padding: '64px 64px 96px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionOpen num="§ 01">The method</SectionOpen>
        <h2 style={{ fontFamily: SERIF, fontSize: 56, fontWeight: 400, maxWidth: 720, margin: '8px 0 48px' }}>
          Three inputs. One honest look at the field you&apos;re playing on.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {[
            { num: 'I.', title: 'Connect your channel', body: 'A read-only handshake with YouTube. We fetch the last two years of your uploads, views, retention, and comments.', note: 'Takes about forty seconds.' },
            { num: 'II.', title: 'Name your neighbours', body: 'Three to ten channels that orbit yours. Direct competitors, aspirational ones, or the one creator whose numbers keep you up at night.', note: 'We suggest ten based on your content.' },
            { num: 'III.', title: 'Read the dashboard', body: 'A quiet room where your channel and theirs are laid side by side - plotted, compared, and annotated. Refreshed every morning.', note: 'First edition prints in four minutes.' },
          ].map((s) => (
            <article key={s.num}>
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

      <section id="pricing" style={{ padding: '96px 64px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionOpen num="§ 04">Subscription</SectionOpen>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 56, fontWeight: 400, margin: 0 }}>Monthly plans. Cancel whenever.</h2>
          <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'var(--brass)', maxWidth: 280, textAlign: 'right' }}>
            Try first, pay only if it earns its keep.<br />Upgrade when the work gets heavier.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          <PlanCard name={BILLING_PLANS.basic.name} price={BILLING_PLANS.basic.price} period={BILLING_PLANS.basic.period} tag="for the first read" features={BILLING_PLANS.basic.features} />
          <PlanCard name={BILLING_PLANS.intermediate.name} price={BILLING_PLANS.intermediate.price} period={BILLING_PLANS.intermediate.period} tag="for the weekly operator" features={BILLING_PLANS.intermediate.features} featured />
          <PlanCard name={BILLING_PLANS.full_access.name} price={BILLING_PLANS.full_access.price} period={BILLING_PLANS.full_access.period} tag="for teams" features={BILLING_PLANS.full_access.features} />
        </div>
      </section>

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
    <div style={{ background: 'var(--paper-card)', border: '1px solid var(--rule-soft)', borderRadius: 8, padding: 28, boxShadow: '0 1px 0 rgba(26,26,26,0.04), 0 20px 40px -18px rgba(26,26,26,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Eyebrow accent>Today&apos;s field report</Eyebrow>
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>18 Apr · 06:00 IST</span>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '12px 0 20px' }} />
      <div style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1.15, marginBottom: 8 }}>
        You&apos;re growing <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>1.4x faster</span> than the median.
      </div>
      <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 24 }}>
        But three neighbours posted about <em style={{ color: 'var(--brass)' }}>&quot;SIP vs NPS&quot;</em> this week.
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>Subs · last 30d</span>
        <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)' }}>+4,820 ▲</span>
      </div>
      <MiniLine w={380} h={72} data={[4, 5, 6, 8, 7, 10, 13, 11, 14, 17, 16, 20, 22, 24]} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--rule)' }}>
        {[
          ['Outliers', '2', 'this week'],
          ['Unwritten', '14', 'in your niche'],
          ['Best day', 'Sat', '10 AM IST'],
        ].map(([l, v, s]) => (
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
  name: string
  price: string
  period: string
  tag: string
  features: readonly string[]
  featured?: boolean
}) {
  return (
    <div style={{ background: 'var(--paper-card)', border: featured ? '1px solid var(--ink)' : '1px solid var(--rule-soft)', borderRadius: 8, padding: 32, position: 'relative' }}>
      {featured && <div style={{ position: 'absolute', top: -12, left: 32 }}><Pill variant="ink">Most read</Pill></div>}
      <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-3)' }}>{tag}</div>
      <div style={{ fontFamily: SERIF, fontSize: 28, marginTop: 6 }}>{name}</div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '16px 0' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em' }}>{price}</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{period}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
        {features.map((feature) => (
          <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: SERIF, color: 'var(--accent)', fontSize: 14 }}>-</span>
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{feature}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <ButtonLink variant={featured ? 'primary' : 'ghost'} href="/login" style={{ width: '100%', justifyContent: 'center' }}>
          Choose {name}
        </ButtonLink>
      </div>
    </div>
  )
}

function Logo({ size = 28 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
      <span style={{ fontFamily: MONO, fontSize: size * 0.5, color: 'var(--accent)' }}>※</span>
      <span style={{ fontFamily: SERIF, fontSize: size, letterSpacing: '-0.02em', lineHeight: 1, whiteSpace: 'nowrap' }}>
        ChannelIQ
      </span>
    </div>
  )
}

function Eyebrow({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: accent ? 'var(--accent)' : 'var(--ink-3)' }}>
      {children}
    </div>
  )
}

function SectionOpen({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
      <span style={{ display: 'block', width: 28, height: 1, background: 'var(--ink)', flexShrink: 0 }} />
      <span style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{num}</span>
      <span style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{children}</span>
    </div>
  )
}

function Pill({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'ink' }) {
  const bg = variant === 'ink' ? 'var(--ink)' : 'var(--paper-warm)'
  const color = variant === 'ink' ? 'var(--paper)' : 'var(--ink-2)'
  const border = variant === 'ink' ? 'var(--ink)' : 'var(--rule-soft)'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, background: bg, border: `1px solid ${border}`, fontFamily: MONO, fontSize: 11, color, letterSpacing: '0.02em', lineHeight: 1.5 }}>
      {children}
    </span>
  )
}

function ButtonLink({ children, href, variant = 'primary', size = 'md', style }: {
  children: ReactNode
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  style?: CSSProperties
}) {
  return (
    <a href={href} style={{ ...buttonStyle(variant, size), ...style }}>
      {children}
    </a>
  )
}

function Ornament() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'var(--ink-3)', margin: '20px 0' }}>
      <span style={{ width: 40, height: 1, background: 'currentColor', opacity: 0.5 }} />
      <span style={{ fontFamily: SERIF, fontSize: 18 }}>❦</span>
      <span style={{ width: 40, height: 1, background: 'currentColor', opacity: 0.5 }} />
    </div>
  )
}

function MiniLine({
  data,
  color = 'var(--accent)',
  h,
  w,
}: {
  data: number[]
  color?: string
  h: number
  w: number
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const step = w / (data.length - 1)
  const pts = data.map((v, i) => [i * step, h - ((v - min) / (max - min || 1)) * (h - 4) - 2] as [number, number])
  const d = pts.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ')

  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
      {pts.map((p, i) => <circle key={`${p[0]}-${p[1]}`} cx={p[0]} cy={p[1]} r="1.8" fill={color} opacity={i === pts.length - 1 ? 1 : 0.3} />)}
    </svg>
  )
}

type ButtonVariant = 'primary' | 'accent' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

function buttonStyle(variant: ButtonVariant, size: ButtonSize): CSSProperties {
  const padding = size === 'lg' ? '14px 24px' : size === 'sm' ? '7px 14px' : '10px 18px'
  const fontSize = size === 'lg' ? 15 : size === 'sm' ? 13 : 14

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding,
    borderRadius: 8,
    border: '1px solid transparent',
    fontFamily: 'var(--font-geist-sans)',
    fontSize,
    fontWeight: 500,
    letterSpacing: '-0.005em',
    cursor: 'pointer',
    lineHeight: 1,
    textDecoration: 'none',
    ...(variant === 'primary' && { background: 'var(--ink)', color: 'var(--paper)' }),
    ...(variant === 'accent' && { background: 'var(--accent)', color: '#fff' }),
    ...(variant === 'ghost' && { background: 'transparent', color: 'var(--ink)', borderColor: 'var(--rule)' }),
  }
}

const inputStyle: CSSProperties = {
  width: '100%',
  background: 'var(--paper-card)',
  border: '1px solid var(--rule)',
  borderRadius: 6,
  padding: '16px 18px',
  fontFamily: 'var(--font-geist-sans)',
  fontSize: 16,
  color: 'var(--ink)',
  outline: 'none',
}
