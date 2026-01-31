import Link from 'next/link';
import { APP_VERSION } from '@/lib/version';

const barStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '0.75rem',
  padding: '0.75rem 2rem',
  background: 'var(--card)',
  borderBottom: '1px solid var(--border)',
  fontSize: '0.95rem',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
  flexWrap: 'wrap',
};

export function TopBar() {
  return (
    <header style={barStyle}>
      <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
        coolify-test-app{' '}
        <span style={{ color: 'var(--accent)' }}>v{APP_VERSION}</span>
      </span>
      <nav style={navStyle}>
        <Link href="/">Statystyki</Link>
        <Link href="/ports">Zajęte porty</Link>
        <Link href="/coolify-env">Zmienne Coolify</Link>
      </nav>
    </header>
  );
}
