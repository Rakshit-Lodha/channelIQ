import type { CSSProperties, ReactNode } from 'react'
import { BILLING_PLANS } from '@/lib/billing/plans'
import styles from './page.module.css'

const SERIF = "'Instrument Serif', 'EB Garamond', Georgia, serif"
const MONO = 'var(--font-geist-mono)'
const methodItems = [
  {
    num: '01',
    title: 'Uncover demand',
    body: 'We analyze search, YouTube traffic, and engagement signals to reveal what your audience is actively looking for.',
    icon: 'search',
  },
  {
    num: '02',
    title: 'Validate opportunity',
    body: 'Our scoring system evaluates competition, saturation, and audience fit so you can focus on ideas with the highest potential.',
    icon: 'target',
  },
  {
    num: '03',
    title: 'Create with confidence',
    body: 'Turn insights into titles, topics, and content plans so every upload has a purpose.',
    icon: 'bars',
  },
] as const

const problemItems = [
  {
    title: 'Guessing what your audience wants',
    body: 'Most creators rely on gut feeling or surface-level trends and hope for the best.',
  },
  {
    title: 'Format confusion and inconsistency',
    body: 'It is hard to know which formats, topics, and angles actually resonate.',
  },
  {
    title: 'Competitor blind spots',
    body: 'Without deeper context, you cannot see what is working for others or where you can win.',
  },
  {
    title: 'Low-demand ideas waste time',
    body: 'Chasing the wrong ideas leads to low views, slow growth, and burnout.',
  },
] as const

const audienceItems = [
  {
    title: 'Solo creators',
    body: 'Build a sustainable channel with content that your audience actually wants.',
    icon: 'solo',
  },
  {
    title: 'Creator teams',
    body: 'Make smarter decisions together and ship content with confidence.',
    icon: 'team',
  },
  {
    title: 'YouTube educators',
    body: 'Deliver more value with lessons and topics your audience is searching for.',
    icon: 'video',
  },
  {
    title: 'Agencies',
    body: 'Scale insights across multiple channels and prove results to clients.',
    icon: 'agency',
  },
  {
    title: 'Brands & marketing teams',
    body: 'Find the right creators, topics, and angles for your campaigns.',
    icon: 'megaphone',
  },
  {
    title: 'Analysts & strategists',
    body: 'Go beyond vanity metrics with data that drives strategy.',
    icon: 'bars',
  },
] as const

const whyRows = [
  ['Built for creators', 'Built specifically for YouTube creators and their unique challenges.', 'Designed for broad use cases, not creator workflows.'],
  ['Opportunity discovery', 'Scores ideas on demand, competition, and audience fit.', 'No idea scoring or opportunity identification.'],
  ['Actionable insights', 'Clear recommendations you can turn into videos.', 'Raw data with no guidance on what to do.'],
  ['Competitor intelligence', 'See what is working for others and where you can win.', 'Surface-level metrics with limited context.'],
  ['Saves you time', 'All-in-one platform. Less time in spreadsheets and tabs.', 'Requires multiple tools and manual analysis.'],
  ['Made for growth', 'Focused on channel growth and sustainable results.', 'General dashboards that do not focus on growth outcomes.'],
] as const

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <nav className={styles.topNav}>
        <div className={styles.topNavInner}>
          <Logo />
          <div className={styles.topNavLinks}>
            <a href="#product" className={styles.topNavLink}>
              Product
            </a>
            <a href="#solutions" className={styles.topNavLink}>
              Solutions
            </a>
            <a href="#resources" className={styles.topNavLink}>
              Resources
            </a>
            <a href="#pricing" className={styles.topNavLink}>
              Pricing
            </a>
          </div>
          <div className={styles.topNavActions}>
            <a href="/login" className={styles.topNavMutedLink}>
              Log in
            </a>
            <a href="/login" className={`${styles.heroButton} ${styles.heroButtonPrimary}`}>
              Start free trial
            </a>
          </div>
        </div>
      </nav>

      <section className={styles.heroSection}>
        <div className={styles.heroShell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopyCol}>
              <h1 className={styles.heroTitle}>
                Stop guessing
                <br />
                what to post
              </h1>
              <p className={styles.heroBody}>
                ChannelIQ turns YouTube data into clear direction so you can create videos people actually want to watch.
              </p>
            <div className={styles.heroActions}>
                <a href="/login" className={`${styles.heroButton} ${styles.heroButtonPrimary}`}>
                  Start free trial
                </a>
                <a href="/login" className={`${styles.heroButton} ${styles.heroButtonSecondary}`}>
                  View demo
                </a>
              </div>
              <div className={styles.socialProof}>
                <div className={styles.avatarRow}>
                  {['A', 'B', 'C', 'D'].map((label, index) => (
                    <span key={label} className={styles.avatar} style={{ zIndex: 5 - index }}>
                      {label}
                    </span>
                  ))}
                </div>
                <div className={styles.proofText}>
                  <div className={styles.stars}>★★★★★</div>
                  <div>Trusted by 8,200+ creators and teams</div>
                </div>
              </div>
            </div>
            <DashboardPreviewCard />
          </div>
          <div className={styles.heroStrip}>
            <div className={styles.heroStripTitle}>What&apos;s inside the dashboard</div>
            <div className={styles.heroStripGrid}>
              {[
                ['Audience insights', 'that go deeper', 'audience'],
                ['Idea scoring', 'based on demand & competition', 'ideas'],
                ['Trend tracking', 'that surfaces opportunities', 'trend'],
                ['Custom reports', 'that save you time', 'reports'],
              ].map(([title, body, icon]) => (
                <div key={title} className={styles.heroStripItem}>
                  <FeatureIcon kind={icon as 'audience' | 'ideas' | 'trend' | 'reports'} />
                  <div>
                    <div className={styles.heroStripItemTitle}>{title}</div>
                    <div className={styles.heroStripItemBody}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      <section className={styles.sectionBlock}>
        <div className={styles.sectionFrame}>
          <h2 className={styles.sectionDisplay}>The method</h2>
          <div className={styles.methodGrid}>
            {methodItems.map((item) => (
              <article key={item.num} className={styles.methodCard}>
                <div className={styles.methodNum}>{item.num}</div>
                <div className={styles.methodCardInner}>
                  <span className={styles.methodIconWrap}>
                    <MethodIcon kind={item.icon as 'search' | 'target' | 'bars'} />
                  </span>
                  <div>
                    <h3 className={styles.methodTitle}>{item.title}</h3>
                    <p className={styles.methodBody}>{item.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.problemBlock}>
            <h2 className={styles.sectionDisplay}>The problem</h2>
            <div className={styles.problemGrid}>
              {problemItems.map((item) => (
                <article key={item.title} className={styles.problemCard}>
                  <span className={styles.problemIconWrap}>
                    <ProblemIcon />
                  </span>
                  <h3 className={styles.problemTitle}>{item.title}</h3>
                  <p className={styles.problemBody}>{item.body}</p>
                </article>
              ))}
            </div>
            <div className={styles.problemCallout}>
              <SparkIcon />
              <span>ChannelIQ removes the guesswork so you can create with clarity and grow faster.</span>
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      <section className={styles.sectionBlock}>
        <div className={styles.sectionFrame}>
          <h2 className={styles.sectionDisplay}>Who it&apos;s for</h2>
          <div className={styles.audienceGrid}>
            {audienceItems.map((item) => (
              <article key={item.title} className={styles.audienceCard}>
                <span className={styles.audienceIconWrap}>
                  <AudienceIcon kind={item.icon as 'solo' | 'team' | 'video' | 'agency' | 'megaphone' | 'bars'} />
                </span>
                <h3 className={styles.audienceTitle}>{item.title}</h3>
                <p className={styles.audienceBody}>{item.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.whyBlock}>
            <h2 className={styles.sectionDisplay}>Why ChannelIQ</h2>
            <div className={styles.whyTable}>
              <div className={styles.whyFeatureColumn}>
                {whyRows.map(([label]) => (
                  <div key={label} className={styles.whyFeatureCell}>
                    {label}
                  </div>
                ))}
              </div>
              <div className={styles.whyHighlightColumn}>
                <div className={styles.whyColumnTitle}>ChannelIQ</div>
                {whyRows.map(([label, ours]) => (
                  <div key={label} className={styles.whyValueCell}>
                    <span className={styles.whyCheck}>●</span>
                    <span>{ours}</span>
                  </div>
                ))}
              </div>
              <div className={styles.whyPlainColumn}>
                <div className={styles.whyColumnTitleMuted}>Generic analytics tools</div>
                {whyRows.map(([label, , generic]) => (
                  <div key={label} className={styles.whyMutedCell}>
                    {generic}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
    <div className={styles.dashboardCard}>
      <div className={styles.dashboardSidebar}>
        <div className={styles.dashboardBrand}>IQ</div>
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={styles.sidebarDot} />
        ))}
      </div>
      <div className={styles.dashboardSurface}>
        <div className={styles.dashboardHeader}>
          <div className={styles.dashboardOverview}>Overview</div>
          <div className={styles.dashboardDate}>May 12 – Jun 8, 2024</div>
        </div>
        <div className={styles.dashboardStatsRow}>
          {[
            ['Views', '1.2M', '+ 18.7%'],
            ['Watch time (hrs)', '48.6K', '+ 16.3%'],
            ['Subscribers', '+8.9K', '+ 22.1%'],
            ['Est. revenue', '$12.4K', '+ 14.0%'],
          ].map(([label, value, delta]) => (
            <div key={label} className={styles.statCard}>
              <div className={styles.statLabel}>{label}</div>
              <div className={styles.statNumber}>{value}</div>
              <div className={styles.statDelta}>{delta}</div>
            </div>
          ))}
        </div>
        <div className={styles.dashboardMain}>
          <div className={styles.chartPanel}>
            <div className={styles.chartTitle}>Audience interest over time</div>
            <MiniLine w={430} h={128} data={[44, 49, 61, 54, 63, 78, 72, 88, 81, 83, 74, 79, 69, 68, 85, 92, 90]} />
            <div className={styles.chartLegend}>
              <span><i className={styles.legendLive} /> This period</span>
              <span><i className={styles.legendPast} /> Previous period</span>
            </div>
          </div>
          <div className={styles.opportunityPanel}>
            <div className={styles.chartTitle}>Top opportunity</div>
            <div className={styles.opportunityTitle}>Photography tips for beginners</div>
            <div className={styles.opportunityMeta}>
              <span>High score</span>
              <span className={styles.opportunityBadge}>92</span>
            </div>
            <div className={styles.opportunityRange}>
              <div className={styles.statLabel}>Est. views</div>
              <div className={styles.opportunityViews}>120K – 180K</div>
            </div>
            <a href="/login" className={`${styles.heroButton} ${styles.heroButtonPrimary} ${styles.panelButton}`}>
              View details
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureIcon({ kind }: { kind: 'audience' | 'ideas' | 'trend' | 'reports' }) {
  if (kind === 'audience') {
    return (
      <svg viewBox="0 0 24 24" className={styles.featureIcon} aria-hidden="true">
        <circle cx="12" cy="8" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4.5 21c0-4.2 3.4-7.1 7.5-7.1s7.5 2.9 7.5 7.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'ideas') {
    return (
      <svg viewBox="0 0 24 24" className={styles.featureIcon} aria-hidden="true">
        <path d="M12 3.5a6.1 6.1 0 0 0-3.9 10.8c1.1 1 1.7 2 1.7 3.2h4.4c0-1.2.5-2.2 1.6-3.2A6.1 6.1 0 0 0 12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M10.2 20h3.6M9.8 17.5h4.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'trend') {
    return (
      <svg viewBox="0 0 24 24" className={styles.featureIcon} aria-hidden="true">
        <path d="M4 19.5h16M4 19.5V4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="m7 14.5 3.2-3.2 2.8 2.7 5.1-5.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.8 8.8h2.9v2.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={styles.featureIcon} aria-hidden="true">
      <rect x="5" y="3.5" width="14" height="17" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.3 8h7.4M8.3 11.5h7.4M8.3 17.2h1.8M11.3 15.2v4M14.5 13.5v5.7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function MethodIcon({ kind }: { kind: 'search' | 'target' | 'bars' }) {
  if (kind === 'search') {
    return (
      <svg viewBox="0 0 24 24" className={styles.methodIcon} aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="5.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="m15.2 15.2 4.1 4.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'target') {
    return (
      <svg viewBox="0 0 24 24" className={styles.methodIcon} aria-hidden="true">
        <circle cx="12" cy="12" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 3.2v3M12 17.8v3M3.2 12h3M17.8 12h3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={styles.methodIcon} aria-hidden="true">
      <path d="M4 20h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="6" y="10" width="3.4" height="8" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="10.8" y="6.5" width="3.4" height="11.5" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="15.6" y="3.5" width="3.4" height="14.5" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function ProblemIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.problemIcon} aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.4v6.2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="12" cy="17.4" r="1" fill="currentColor" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.sparkIcon} aria-hidden="true">
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3.2v3.1M12 17.7v3.1M3.2 12h3.1M17.7 12h3.1M5.7 5.7l2.2 2.2M16.1 16.1l2.2 2.2M18.3 5.7l-2.2 2.2M7.9 16.1l-2.2 2.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function AudienceIcon({ kind }: { kind: 'solo' | 'team' | 'video' | 'agency' | 'megaphone' | 'bars' }) {
  if (kind === 'solo') {
    return (
      <svg viewBox="0 0 24 24" className={styles.audienceIcon} aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M5.5 20c0-4 3.1-6.9 6.5-6.9s6.5 2.9 6.5 6.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'team') {
    return (
      <svg viewBox="0 0 24 24" className={styles.audienceIcon} aria-hidden="true">
        <circle cx="12" cy="8.7" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6.5" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 20c0-3 1.8-5.4 3.5-5.4s3.5 2.4 3.5 5.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M2.8 18.7c0-2.5 1.7-4.4 3.7-4.4M21.2 18.7c0-2.5-1.7-4.4-3.7-4.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'video') {
    return (
      <svg viewBox="0 0 24 24" className={styles.audienceIcon} aria-hidden="true">
        <rect x="4" y="5" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="m10 8.4 5 2.6-5 2.6Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8 19.5h8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'agency') {
    return (
      <svg viewBox="0 0 24 24" className={styles.audienceIcon} aria-hidden="true">
        <path d="M4 20h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <rect x="5.2" y="10.5" width="4.2" height="7.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <rect x="10.8" y="6.8" width="4.2" height="11.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <rect x="16.4" y="4.2" width="2.6" height="13.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    )
  }

  if (kind === 'megaphone') {
    return (
      <svg viewBox="0 0 24 24" className={styles.audienceIcon} aria-hidden="true">
        <path d="M4.8 11.8h4.1l5.9-3.6v7.2l-5.9-3.6H4.8a2.2 2.2 0 1 1 0-4.4h4.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="m9.1 12 1.5 5.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M17 9.2c1.4.7 2.4 2 2.8 3.5M17 14.8c1.4-.7 2.4-2 2.8-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={styles.audienceIcon} aria-hidden="true">
      <path d="M4 20h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="5.2" y="11.5" width="3.2" height="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="10.4" y="8.2" width="3.2" height="9.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="15.6" y="4.8" width="3.2" height="13.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
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
  h,
  w,
}: {
  data: number[]
  h: number
  w: number
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const step = w / (data.length - 1)
  const pts = data.map((v, i) => [i * step, h - ((v - min) / (max - min || 1)) * (h - 26) - 10] as [number, number])
  const d = pts.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ')
  const ghost = pts.map((p, i) => {
    const y = Math.min(h - 10, p[1] + (i % 3 === 0 ? 18 : 12))
    return i === 0 ? `M ${p[0]},${y}` : `L ${p[0]},${y}`
  }).join(' ')

  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <path d={ghost} fill="none" stroke="#B7AEA2" strokeWidth="1.8" strokeDasharray="2.5 5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d={d} fill="none" stroke="#D1593D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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
