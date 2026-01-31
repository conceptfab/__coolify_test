import type { Metadata } from 'next';
import { APP_VERSION } from '@/lib/version';
import { TopBar } from '@/components/TopBar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coolify – statystyki',
  description: `coolify-test-app v${APP_VERSION} – testowanie hostingu na Coolify`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
