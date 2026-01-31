import { StatsSection } from '@/components/StatsSection';
import { APP_VERSION } from '@/lib/version';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>
        Coolify – statystyki
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
        v{APP_VERSION} – testowanie hostingu na Coolify
      </p>
      <StatsSection />
    </main>
  );
}
