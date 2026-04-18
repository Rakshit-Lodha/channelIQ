'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo, Btn, Input, Avatar } from '@/components/ui'
import { useStore } from '@/lib/store'

const SERIF = "'Instrument Serif', 'EB Garamond', Georgia, serif"
const MONO = 'var(--font-geist-mono)'

export default function LoginPage() {
  const router = useRouter()
  const setUser = useStore((s) => s.setUser)
  const [tab, setTab] = useState<'signup' | 'signin'>('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Mock auth — just store name+email and continue
    await new Promise((r) => setTimeout(r, 600))
    setUser({ name: name || email.split('@')[0], email })
    router.push('/onboarding/channel')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '18px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
          <Logo />
          <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>A quieter way to grow on YouTube</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 61px)' }}>
        {/* Left — editorial */}
        <div style={{ padding: '96px 64px', background: 'var(--paper-warm)', borderRight: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: 16 }}>
              On joining the almanac
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 64, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.95, margin: '0 0 32px', maxWidth: 480 }}>
              Begin with your <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>name.</span><br />
              We'll ask for the rest <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>after.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 440 }}>
              First, let us know who you are. Next, we'll help you connect your channel,
              pick your competitors, and generate your dashboard. Only then — if you like
              what you see — we'll ask for payment.
            </p>
            <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '48px 0', maxWidth: 440 }} />

            {/* Steps */}
            <div style={{ maxWidth: 440 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: 'var(--ink-4)', marginBottom: 16 }}>The four steps</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['01','Create an account','You are here'],['02','Connect your YouTube','40 seconds'],['03','Name your competitors','2 minutes'],['04','Read your dashboard','4 minutes to generate']].map(([n,t,s],i) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: i===0?'var(--accent)':'var(--ink-4)', minWidth: 24 }}>{n}</span>
                    <div>
                      <div style={{ fontFamily: SERIF, fontSize: 18, color: i===0?'var(--ink)':'var(--ink-3)' }}>{t}</div>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-4)' }}>{s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <figure style={{ margin: 0, maxWidth: 440 }}>
            <div style={{ fontFamily: SERIF, fontSize: 40, color: 'var(--accent)', lineHeight: 1 }}>"</div>
            <blockquote style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.35, margin: '0 0 16px', fontStyle: 'italic' }}>
              Four days in, ChannelIQ pointed at a topic I'd never have written. It became my most-watched video of the year.
            </blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name="Aditya Kulkarni" size={32} />
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 14 }}>Aditya Kulkarni</div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>Cinema essays · 412K subs</div>
              </div>
            </figcaption>
          </figure>
        </div>

        {/* Right — form */}
        <div style={{ padding: '96px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: 420, width: '100%' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 32, borderBottom: '1px solid var(--rule)' }}>
              {([['signup', 'Create account'], ['signin', 'Sign in']] as const).map(([k, l]) => (
                <button key={k} onClick={() => setTab(k)} style={{
                  background: 'transparent', border: 'none', padding: '10px 0',
                  fontFamily: 'var(--font-geist-sans)', fontSize: 14,
                  color: tab===k?'var(--ink)':'var(--ink-3)', fontWeight: tab===k?500:400,
                  cursor: 'pointer', borderBottom: tab===k?'2px solid var(--accent)':'2px solid transparent', marginBottom: -1,
                }}>{l}</button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: 'var(--ink)', flexShrink: 0 }} />
              <span style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>
                Step 01 of 04 · Create your account
              </span>
            </div>

            <h2 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, margin: '4px 0 32px' }}>
              {tab==='signup' ? "Let's begin." : 'Welcome back.'}
            </h2>

            {/* Google button (mock) */}
            <button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: 14, background: 'transparent', border: '1px solid var(--rule)', borderRadius: 999, fontFamily: 'var(--font-geist-sans)', fontSize: 14, cursor: 'pointer', marginBottom: 24 }}>
              <GoogleIcon /> Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)' }}>or with email</span>
              <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {tab==='signup' && (
                <Input label="Your name" placeholder="Ishita Rao" value={name} onChange={e=>setName(e.target.value)} />
              )}
              <Input label="Email" type="email" placeholder="you@channel.com" value={email} onChange={e=>setEmail(e.target.value)} required />
              <Input label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={e=>setPassword(e.target.value)} required />
              <Btn variant="accent" size="lg" type="submit" style={{ justifyContent: 'center', width: '100%', marginTop: 8 }}>
                {loading ? 'Just a moment…' : tab==='signup' ? 'Create account & continue →' : 'Sign in →'}
              </Btn>
            </form>

            <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-3)', marginTop: 24, lineHeight: 1.6 }}>
              {tab==='signup'
                ? <>No payment required until your dashboard is ready.</>
                : <>New? <button onClick={()=>setTab('signup')} style={{ color:'var(--accent)', cursor:'pointer', background:'transparent', border:'none', fontFamily:'inherit', fontSize:'inherit', textDecoration:'underline' }}>Create an account</button> — it's free to try.</>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v4h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-8z"/>
    <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.3-2-6.2-4.6H2.2v2.8A11 11 0 0 0 12 23z"/>
    <path fill="#FBBC04" d="M5.8 14.1c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1V7.1H2.2a11 11 0 0 0 0 9.8l3.6-2.8z"/>
    <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.6l3.1-3.1A11 11 0 0 0 12 1 11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.4 9.1 5.4 12 5.4z"/>
  </svg>
)
