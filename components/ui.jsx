/* TubeLens — shared UI primitives */

const Logo = ({ size = 28, showTag = false }) => (
  <div className="row ai-c g-3" style={{ flexShrink: 0 }}>
    <div className="row ai-c g-2" style={{ flexShrink: 0 }}>
      <span className="mono" style={{ fontSize: size * 0.5, color: 'var(--accent)', flexShrink: 0 }}>※</span>
      <span className="serif" style={{ fontSize: size, letterSpacing: '-0.02em', lineHeight: 1, whiteSpace: 'nowrap' }}>ChannelIQ</span>
    </div>
    {showTag && (
      <span className="caption" style={{ paddingLeft: 14, borderLeft: '1px solid var(--rule)', whiteSpace: 'nowrap' }}>Est. 2026</span>
    )}
  </div>
);

const Eyebrow = ({ children, accent }) => (
  <div className={`eyebrow ${accent ? 'eyebrow-accent' : ''}`}>{children}</div>
);

const SectionOpen = ({ num, children }) => (
  <div className="section-open">
    <span className="num">{num}</span>
    <span className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.14em' }}>{children}</span>
  </div>
);

const Pill = ({ children, variant = 'default', dot }) => (
  <span className={`pill ${variant === 'accent' ? 'pill-accent' : variant === 'ink' ? 'pill-ink' : ''} ${dot ? 'pill-dot' : ''}`}>{children}</span>
);

const Btn = ({ children, variant = 'primary', size, onClick, style, type = 'button' }) => (
  <button
    type={type}
    className={`btn ${variant === 'primary' ? 'btn-primary' : variant === 'accent' ? 'btn-accent' : variant === 'ghost' ? 'btn-ghost' : variant === 'text' ? 'btn-text' : ''} ${size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : ''}`}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

const Input = ({ label, lg, ...props }) => (
  <div style={{ width: '100%' }}>
    {label && <label className="label">{label}</label>}
    <input className={`input ${lg ? 'input-lg' : ''}`} {...props} />
  </div>
);

const Field = ({ label, children }) => (
  <div style={{ width: '100%' }}>
    {label && <label className="label">{label}</label>}
    {children}
  </div>
);

// Editorial ornament — a small hand-drawn-feeling divider
const Ornament = ({ color = 'var(--ink-3)' }) => (
  <div className="row ai-c jc-c g-2" style={{ color, margin: '20px 0' }}>
    <span style={{ width: 40, height: 1, background: 'currentColor', opacity: 0.5 }} />
    <span className="serif" style={{ fontSize: 18 }}>❦</span>
    <span style={{ width: 40, height: 1, background: 'currentColor', opacity: 0.5 }} />
  </div>
);

// Small SVG dashboard chart — editorial style
const MiniLine = ({ data = [4, 7, 6, 11, 9, 14, 12, 18, 16, 22, 24], color = 'var(--accent)', h = 60, w = 200 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return [x, y];
  });
  const d = pts.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ');
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="1.8" fill={color} opacity={i === pts.length - 1 ? 1 : 0.3} />
      ))}
    </svg>
  );
};

// Avatar (circle with initials)
const Avatar = ({ name, size = 32, color = 'var(--ink)' }) => {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div
      className="row ai-c jc-c serif"
      style={{
        width: size, height: size, borderRadius: '50%',
        background: color, color: 'var(--paper)',
        fontSize: size * 0.4, flexShrink: 0,
      }}
    >{initials}</div>
  );
};

// Channel avatar — editorial square-with-circle
const ChannelMark = ({ name, size = 40, bg = '#C44536' }) => {
  const initial = name[0]?.toUpperCase() || '?';
  return (
    <div
      style={{
        width: size, height: size,
        background: bg,
        borderRadius: size * 0.25,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontFamily: 'var(--serif)', fontSize: size * 0.5,
        flexShrink: 0,
      }}
    >{initial}</div>
  );
};

// Expose to window for other script files
Object.assign(window, { Logo, Eyebrow, SectionOpen, Pill, Btn, Input, Field, Ornament, MiniLine, Avatar, ChannelMark });
