import { getCoolifyEnvStatus } from '@/lib/coolify-env';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CoolifyEnvPage() {
  const { known, otherDefined } = getCoolifyEnvStatus();

  const sectionStyle: React.CSSProperties = {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '1.25rem',
    marginBottom: '1rem',
  };
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
  };
  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '0.5rem 0.75rem',
    borderBottom: '2px solid var(--border)',
    color: 'var(--muted)',
    fontWeight: 600,
  };
  const tdStyle: React.CSSProperties = {
    padding: '0.5rem 0.75rem',
    borderBottom: '1px solid var(--border)',
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '56rem', margin: '0 auto' }}>
      <p style={{ marginBottom: '1rem' }}>
        <Link href="/">← Statystyki</Link>
        {' · '}
        <Link href="/ports">Zajęte porty</Link>
      </p>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>
        Zmienne Coolify
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
        Predefiniowane zmienne Coolify: czy są ustawione w tym środowisku.
        Wartości nie są wyświetlane.
      </p>

      <section style={sectionStyle}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
          Znane zmienne Coolify
        </h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Zmienna</th>
              <th style={thStyle}>Opis</th>
              <th style={thStyle}>Zdefiniowana</th>
            </tr>
          </thead>
          <tbody>
            {known.map((e) => (
              <tr key={e.name}>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>
                  {e.name}
                </td>
                <td style={tdStyle}>{e.description}</td>
                <td style={tdStyle}>
                  {e.defined ? (
                    <span style={{ color: 'var(--accent)' }}>Tak</span>
                  ) : (
                    <span style={{ color: 'var(--muted)' }}>Nie</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
          Inne zdefiniowane zmienne (nazwy)
        </h2>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: '0.9rem',
            marginBottom: '0.75rem',
          }}
        >
          Pozostałe zmienne obecne w środowisku (bez wartości; pomijane nazwy z
          &quot;secret&quot;, &quot;password&quot;, &quot;key&quot;,
          &quot;token&quot;, &quot;credential&quot;).
        </p>
        {otherDefined.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>Brak.</p>
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
            }}
          >
            {otherDefined.map((k) => (
              <span
                key={k}
                style={{
                  background: 'var(--bg)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                }}
              >
                {k}
              </span>
            ))}
          </div>
        )}
      </section>

      <p
        style={{
          marginTop: '1.5rem',
          color: 'var(--muted)',
          fontSize: '0.875rem',
        }}
      >
        API JSON: <a href="/api/coolify-env">/api/coolify-env</a>
      </p>
    </main>
  );
}
