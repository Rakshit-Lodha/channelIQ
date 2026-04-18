'use client'
import React from 'react'
import Link from 'next/link'

/* ── Logo ── */
export const Logo = ({ size = 28 }: { size?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: size * 0.5, color: 'var(--accent)' }}>※</span>
    <span style={{ fontFamily: "'Instrument Serif', 'EB Garamond', Georgia, serif", fontSize: size, letterSpacing: '-0.02em', lineHeight: 1, whiteSpace: 'nowrap' }}>
      ChannelIQ
    </span>
  </div>
)

/* ── Eyebrow ── */
export const Eyebrow = ({ children, accent }: { children: React.ReactNode; accent?: boolean }) => (
  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: accent ? 'var(--accent)' : 'var(--ink-3)' }}>
    {children}
  </div>
)

/* ── Section label ── */
export const SectionOpen = ({ num, children }: { num: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
    <span style={{ display: 'block', width: 28, height: 1, background: 'var(--ink)', flexShrink: 0 }} />
    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{num}</span>
    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{children}</span>
  </div>
)

/* ── Pill ── */
export const Pill = ({
  children,
  variant = 'default',
  dot,
}: {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'ink'
  dot?: boolean
}) => {
  const bg = variant === 'accent' ? 'var(--accent-wash)' : variant === 'ink' ? 'var(--ink)' : 'var(--paper-warm)'
  const color = variant === 'accent' ? 'var(--accent-deep)' : variant === 'ink' ? 'var(--paper)' : 'var(--ink-2)'
  const border = variant === 'accent' ? 'transparent' : 'var(--rule-soft)'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, background: bg, border: `1px solid ${border}`, fontFamily: 'var(--font-geist-mono)', fontSize: 11, color, letterSpacing: '0.02em', lineHeight: 1.5 }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />}
      {children}
    </span>
  )
}

/* ── Button ── */
type BtnVariant = 'primary' | 'accent' | 'ghost' | 'text'
type BtnSize = 'sm' | 'md' | 'lg'

interface BtnProps {
  children: React.ReactNode
  variant?: BtnVariant
  size?: BtnSize
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
  href?: string
  style?: React.CSSProperties
  className?: string
}

export const Btn = ({ children, variant = 'primary', size = 'md', onClick, disabled, type = 'button', href, style, className }: BtnProps) => {
  const padding = size === 'lg' ? '14px 24px' : size === 'sm' ? '7px 14px' : '10px 18px'
  const fontSize = size === 'lg' ? 15 : size === 'sm' ? 13 : 14

  const styles: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding, borderRadius: 999, border: '1px solid transparent',
    fontFamily: 'var(--font-geist-sans)', fontSize, fontWeight: 500,
    letterSpacing: '-0.005em', cursor: disabled ? 'not-allowed' : 'pointer',
    lineHeight: 1, textDecoration: 'none', transition: 'all 0.15s ease',
    opacity: disabled ? 0.4 : 1,
    ...(variant === 'primary' && { background: 'var(--ink)', color: 'var(--paper)' }),
    ...(variant === 'accent' && { background: 'var(--accent)', color: '#fff' }),
    ...(variant === 'ghost' && { background: 'transparent', color: 'var(--ink)', borderColor: 'var(--rule)' }),
    ...(variant === 'text' && { background: 'transparent', color: 'var(--ink)', padding: '4px 0', borderRadius: 0, borderBottom: '1px solid var(--ink)' }),
    ...style,
  }

  if (href) return <Link href={href} style={styles} className={className}>{children}</Link>
  return <button type={type} onClick={onClick} disabled={disabled} style={styles} className={className}>{children}</button>
}

/* ── Input ── */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  lg?: boolean
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, lg, error, style, ...props }, ref) => (
  <div style={{ width: '100%' }}>
    {label && (
      <label style={{ display: 'block', fontFamily: 'var(--font-geist-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 6 }}>
        {label}
      </label>
    )}
    <input
      ref={ref}
      style={{
        width: '100%', background: 'var(--paper-card)', border: `1px solid ${error ? 'var(--accent)' : 'var(--rule)'}`,
        borderRadius: 6, padding: lg ? '16px 18px' : '12px 14px',
        fontFamily: 'var(--font-geist-sans)', fontSize: lg ? 16 : 15, color: 'var(--ink)',
        outline: 'none', transition: 'border 0.15s ease, box-shadow 0.15s ease',
        ...style,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,26,26,0.06)' }}
      onBlur={(e) => { e.currentTarget.style.borderColor = error ? 'var(--accent)' : 'var(--rule)'; e.currentTarget.style.boxShadow = 'none' }}
      {...props}
    />
    {error && <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 4 }}>{error}</div>}
  </div>
))
Input.displayName = 'Input'

/* ── Meter / progress bar ── */
export const Meter = ({ value, animated }: { value: number; animated?: boolean }) => (
  <div style={{ height: 3, background: 'var(--rule-soft)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
    <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${value * 100}%`, background: 'var(--accent)', borderRadius: 2, transition: 'width 0.5s ease' }}
      className={animated ? 'animate-pulse-bar' : ''} />
  </div>
)

/* ── ChannelMark (avatar square) ── */
export const ChannelMark = ({ name, size = 40, bg = '#C44536', thumbnailUrl }: { name: string; size?: number; bg?: string; thumbnailUrl?: string }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.22, overflow: 'hidden', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    {thumbnailUrl
      ? <img src={thumbnailUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      : <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: size * 0.5, color: '#fff' }}>{(name[0] || '?').toUpperCase()}</span>}
  </div>
)

/* ── Avatar ── */
export const Avatar = ({ name, size = 32 }: { name: string; size?: number }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: size * 0.4, color: 'var(--paper)' }}>
      {name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()}
    </span>
  </div>
)

/* ── Ornament ── */
export const Ornament = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'var(--ink-3)', margin: '20px 0' }}>
    <span style={{ width: 40, height: 1, background: 'currentColor', opacity: 0.5 }} />
    <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18 }}>❦</span>
    <span style={{ width: 40, height: 1, background: 'currentColor', opacity: 0.5 }} />
  </div>
)

/* ── Mini sparkline ── */
export const MiniLine = ({
  data = [4, 7, 6, 11, 9, 14, 12, 18, 16, 22, 24],
  color = 'var(--accent)', h = 60, w = 200,
}: {
  data?: number[]; color?: string; h?: number; w?: number
}) => {
  const max = Math.max(...data), min = Math.min(...data)
  const step = w / (data.length - 1)
  const pts = data.map((v, i) => [i * step, h - ((v - min) / (max - min || 1)) * (h - 4) - 2] as [number, number])
  const d = pts.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ')
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="1.8" fill={color} opacity={i === pts.length - 1 ? 1 : 0.3} />)}
    </svg>
  )
}

/* ── Circular progress ── */
export const CircularProgress = ({ value, done }: { value: number; done?: boolean }) => {
  const r = 50, c = 2 * Math.PI * r
  return (
    <div style={{ position: 'relative', width: 140, height: 140 }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--rule)" strokeWidth="2" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--accent)" strokeWidth="2"
          strokeDasharray={c} strokeDashoffset={c * (1 - value)} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.4s linear' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, lineHeight: 1 }}>
          {Math.round(value * 100)}<span style={{ fontSize: 18, color: 'var(--ink-3)' }}>%</span>
        </div>
        <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>
          {done ? 'ready' : 'printing…'}
        </div>
      </div>
    </div>
  )
}

/* ── Format large numbers ── */
export function formatCount(n: string | number): string {
  const num = typeof n === 'string' ? parseInt(n, 10) : n
  if (isNaN(num)) return '—'
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`
  return String(num)
}
