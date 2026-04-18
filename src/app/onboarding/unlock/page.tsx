'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo, SectionOpen, Btn, Pill, Avatar, ChannelMark, formatCount } from '@/components/ui'
import { useStore } from '@/lib/store'
import { OnboardingProgress } from '../channel/page'
import { BILLING_PLANS, BillingPlanKey } from '@/lib/billing/plans'

const SERIF = "'Instrument Serif', 'EB Garamond', Georgia, serif"
const MONO = 'var(--font-geist-mono)'

export default function UnlockPage() {
  const router = useRouter()
  const { myChannel, competitors, unlock } = useStore()
  const [plan, setPlan] = useState<BillingPlanKey>('intermediate')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUnlock = async () => {
    setLoading(true)
    setError('')

    try {
      await loadRazorpayCheckout()

      const res = await fetch('/api/razorpay/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey: plan }),
      })
      const checkout = await res.json()

      if (!res.ok) throw new Error(checkout.error || 'Unable to start checkout')

      const razorpay = new window.Razorpay({
        key: checkout.keyId,
        subscription_id: checkout.subscriptionId,
        name: checkout.name,
        description: checkout.description,
        prefill: checkout.prefill,
        theme: { color: '#C44536' },
        handler: () => {
          unlock()
          router.push('/')
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      })

      razorpay.open()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to start checkout'
      setError(message)
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
        </div>
      </div>

      <OnboardingProgress step={3} />

      <div style={{ flex: 1, padding: '64px 48px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1000, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

            {/* Left — what's inside */}
            <div>
              <SectionOpen num="Chapter V">Unlock your edition</SectionOpen>
              <h1 style={{ fontFamily: SERIF, fontSize: 52, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.95, margin: '8px 0 20px' }}>
                Your dashboard is <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>printed.</span><br />Here's what's inside.
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 480, marginBottom: 32 }}>
                We've read your channel, measured {competitors.length} competitor{competitors.length !== 1 ? 's' : ''}, and drafted script ideas — all from public data. Pick a plan to open the doors.
              </p>

              {/* Inventory */}
              <div style={{ background: 'var(--paper-card)', border: '1px solid var(--rule-soft)', borderRadius: 10, padding: 28 }}>
                <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 12 }}>§ In your edition</div>
                <div>
                  {[
                    ['Your channel snapshot', myChannel ? `${formatCount(myChannel.subscriberCount)} subs · ${formatCount(myChannel.videoCount)} videos` : 'Channel metrics & history'],
                    ['Benchmark spread', `You vs ${competitors.length} competitor${competitors.length !== 1 ? 's' : ''} · cohort median`],
                    ['Outliers & patterns', 'Breakthrough videos in your neighbourhood'],
                    ['Topic atlas', 'Topics mapped · unwritten topics in your niche'],
                    ['Timing heatmap', 'Best day & hour to post, per weekday'],
                    ['Script lab', 'Research-backed video ideas, ready to film'],
                  ].map(([t, d], i) => (
                    <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0', borderTop: i ? '1px dashed var(--rule)' : 'none' }}>
                      <span style={{ fontFamily: MONO, fontSize: 10, color: 'var(--accent)', marginTop: 4, letterSpacing: '0.12em', flexShrink: 0 }}>0{i + 1}</span>
                      <div>
                        <div style={{ fontFamily: SERIF, fontSize: 16 }}>{t}</div>
                        <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Channel & competitors preview */}
              {myChannel && (
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <ChannelMark name={myChannel.title} size={40} thumbnailUrl={myChannel.thumbnailUrl} />
                  <div>
                    <div style={{ fontFamily: SERIF, fontSize: 16 }}>{myChannel.title}</div>
                    <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{formatCount(myChannel.subscriberCount)} subs · vs {competitors.length} channels</div>
                  </div>
                </div>
              )}

              {/* Testimonial */}
              <figure style={{ margin: '40px 0 0' }}>
                <div style={{ fontFamily: SERIF, fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>"</div>
                <blockquote style={{ fontFamily: SERIF, fontSize: 20, lineHeight: 1.4, margin: '0 0 12px', fontStyle: 'italic' }}>
                  The dashboard paid for itself the week I saw it.
                </blockquote>
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name="Rahul Desai" size={28} />
                  <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>Rahul Desai · Tech reviews · 1.2M subs</div>
                </figcaption>
              </figure>
            </div>

            {/* Right — plan + payment */}
            <div style={{ position: 'sticky', top: 24 }}>
              <div style={{ background: 'var(--paper-card)', border: '1px solid var(--rule-soft)', borderRadius: 10, padding: 32 }}>
                <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: 16 }}>§ Choose a plan</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {(['basic', 'intermediate', 'full_access'] as BillingPlanKey[]).map(k => {
                    const on = plan === k
                    const p = BILLING_PLANS[k]
                    return (
                      <button key={k} onClick={() => setPlan(k)} style={{
                        background: on ? 'var(--paper-warm)' : 'transparent',
                        border: on ? '1px solid var(--ink)' : '1px solid var(--rule)',
                        borderRadius: 8, padding: '14px 16px', textAlign: 'left' as const,
                        cursor: 'pointer', fontFamily: 'inherit', position: 'relative', transition: 'all 0.15s',
                      }}>
                        {k === 'intermediate' && <div style={{ position: 'absolute', top: -10, right: 16 }}><Pill variant="ink">Recommended</Pill></div>}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ width: 14, height: 14, borderRadius: '50%', border: `1.5px solid ${on ? 'var(--accent)' : 'var(--ink-3)'}`, background: on ? 'var(--accent)' : 'transparent', boxShadow: on ? 'inset 0 0 0 3px var(--paper-warm)' : 'none', flexShrink: 0, display: 'inline-block' }} />
                            <div>
                              <div style={{ fontFamily: SERIF, fontSize: 18 }}>{p.name}</div>
                              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{p.description}</div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' as const }}>
                            <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, lineHeight: 1 }}>{p.price}</div>
                            <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>{p.period}</div>
                          </div>
                        </div>
                        {on && (
                          <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: 'var(--brass)', marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--rule)' }}>
                            {p.features.join(' · ')}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '0 0 20px' }} />

                {/* Razorpay Checkout */}
                <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 12 }}>§ Payment</div>
                <div style={{ background: 'var(--paper-warm)', border: '1px solid var(--rule)', borderRadius: 8, padding: 16, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                  Continue to Razorpay to pay by UPI, card, netbanking, or another available method. Your dashboard opens after Razorpay confirms the subscription.
                </div>
                {error && <div style={{ fontSize: 13, color: 'var(--accent)', background: 'var(--accent-wash)', padding: '10px 14px', borderRadius: 6, marginTop: 12 }}>{error}</div>}

                <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '20px 0' }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontFamily: SERIF, fontSize: 16 }}>Total today</span>
                  <span style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400 }}>{BILLING_PLANS[plan].price}</span>
                </div>

                <Btn variant="accent" size="lg" onClick={handleUnlock} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                  {loading ? 'Opening Razorpay...' : 'Continue to Razorpay'}
                </Btn>

                <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)', marginTop: 12, lineHeight: 1.55 }}>
                  Secure payment via Razorpay · Cancel anytime · Full refund within 7 days, no questions.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16, opacity: 0.6 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>🔒 256-bit encrypted</span>
                <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>GST invoice included</span>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '48px 0 24px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Btn variant="ghost" onClick={() => router.push('/onboarding/generating')}>← Back to preview</Btn>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'var(--brass)' }}>
              Not ready? Your dashboard will wait in your account for 30 days.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => { open: () => void }
  }
}

interface RazorpayCheckoutOptions {
  key: string
  subscription_id: string
  name: string
  description: string
  prefill?: { name?: string; email?: string }
  theme?: { color?: string }
  handler: () => void
  modal?: { ondismiss?: () => void }
}

function loadRazorpayCheckout() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Checkout is only available in the browser'))
  if (window.Razorpay) return Promise.resolve()

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Unable to load Razorpay Checkout'))
    document.body.appendChild(script)
  })
}
