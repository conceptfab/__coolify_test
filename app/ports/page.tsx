import { getPorts } from '@/lib/ports';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortsPage() {
  const { ports, scope, error } = getPorts();

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
    fontFamily: 'monospace',
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '56rem', margin: '0 auto' }}>
      <p style={{ marginBottom: '1rem' }}>
        <Link href="/">← Statystyki</Link>
        {' · '}
        <Link href="/coolify-env">Zmienne Coolify</Link>
      </p>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>
        Zajęte porty
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '0.75rem' }}>
        Zakres: <strong>{scope}</strong>.
      </p>
      <div
        style={{
          background: 'rgba(248, 113, 113, 0.1)',
          border: '1px solid rgba(248, 113, 113, 0.4)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.95rem',
        }}
      >
        <strong>Uwaga:</strong> W kontenerze Docker/Coolify poniższa lista
        pokazuje wyłącznie porty <strong>wewnątrz kontenera</strong>, nie porty
        hosta/serwera. Aby zobaczyć porty hosta, potrzebna byłaby usługa
        działająca na hoście.
      </div>

      {error && (
        <section style={sectionStyle}>
          <p style={{ color: 'var(--muted)' }}>{error}</p>
        </section>
      )}

      {ports.length === 0 && !error && (
        <section style={sectionStyle}>
          <p style={{ color: 'var(--muted)' }}>
            Brak wykrytych portów nasłuchujących.
          </p>
        </section>
      )}

      {ports.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            Porty nasłuchujące ({ports.length})
          </h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Port</th>
                <th style={thStyle}>Adres</th>
                <th style={thStyle}>Protokół</th>
                <th style={thStyle}>Usługa / proces</th>
              </tr>
            </thead>
            <tbody>
              {ports.map((p) => (
                <tr key={`${p.port}-${p.address}`}>
                  <td style={tdStyle}>{p.port}</td>
                  <td style={tdStyle}>{p.address}</td>
                  <td style={tdStyle}>{p.protocol}</td>
                  <td style={{ ...tdStyle, fontFamily: 'inherit' }}>
                    {p.process ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <p
        style={{
          marginTop: '1.5rem',
          color: 'var(--muted)',
          fontSize: '0.875rem',
        }}
      >
        API JSON: <a href="/api/ports">/api/ports</a>
      </p>
    </main>
  );
}
