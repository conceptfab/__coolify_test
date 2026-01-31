import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const mem = process.memoryUsage();
  const envKeys = Object.keys(process.env)
    .filter(
      (k) =>
        !k.toLowerCase().includes('secret') &&
        !k.toLowerCase().includes('key') &&
        !k.toLowerCase().includes('password')
    )
    .sort();

  const stats = {
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      nodeEnv: process.env.NODE_ENV ?? null,
    },
    memory: {
      rss: mem.rss,
      heapUsed: mem.heapUsed,
      heapTotal: mem.heapTotal,
      external: mem.external,
    },
    uptimeSeconds: Math.floor(process.uptime()),
    envVarNames: envKeys,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(stats);
}
