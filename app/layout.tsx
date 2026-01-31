import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coolify – statystyki',
  description:
    'Przykładowa aplikacja Next.js do testowania hostingu na Coolify',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
