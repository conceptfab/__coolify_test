function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

export function StatsSection() {
  const mem = process.memoryUsage();
  const uptime = process.uptime();
  const envKeys = Object.keys(process.env)
    .filter(
      (k) =>
        !k.toLowerCase().includes('secret') &&
        !k.toLowerCase().includes('key') &&
        !k.toLowerCase().includes('password')
    )
    .sort();

  const sectionStyle: React.CSSProperties = {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '1.25rem',
    marginBottom: '1rem',
  };
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.5rem 0',
    borderBottom: '1px solid var(--border)',
  };
  const labelStyle: React.CSSProperties = { color: 'var(--muted)' };
  const valueStyle: React.CSSProperties = { fontFamily: 'monospace' };

  return (
    <div>
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Środowisko</h2>
        <div style={rowStyle}>
          <span style={labelStyle}>Node.js</span>
          <span style={valueStyle}>{process.version}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Platforma</span>
          <span style={valueStyle}>{process.platform}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Architektura</span>
          <span style={valueStyle}>{process.arch}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>NODE_ENV</span>
          <span style={valueStyle}>{process.env.NODE_ENV ?? '—'}</span>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Pamięć</h2>
        <div style={rowStyle}>
          <span style={labelStyle}>RSS</span>
          <span style={valueStyle}>{formatBytes(mem.rss)}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Heap użyty</span>
          <span style={valueStyle}>{formatBytes(mem.heapUsed)}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Heap łącznie</span>
          <span style={valueStyle}>{formatBytes(mem.heapTotal)}</span>
        </div>
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <span style={labelStyle}>Zewnętrzna</span>
          <span style={valueStyle}>{formatBytes(mem.external)}</span>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Uptime</h2>
        <div style={rowStyle}>
          <span style={labelStyle}>Czas działania procesu</span>
          <span style={valueStyle}>{formatUptime(uptime)}</span>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
          Zmienne środowiskowe (nazwy)
        </h2>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: '0.9rem',
            marginBottom: '0.75rem',
          }}
        >
          Lista nazw zmiennych bez wartości (bez sekretów)
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
          }}
        >
          {envKeys.map((k) => (
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
      </section>

      <p
        style={{
          marginTop: '2rem',
          color: 'var(--muted)',
          fontSize: '0.875rem',
        }}
      >
        <a href="/ports">Zajęte porty</a> ·{' '}
        <a href="/coolify-env">Zmienne Coolify</a> · API JSON:{' '}
        <a href="/api/stats">/api/stats</a>
      </p>
    </div>
  );
}
