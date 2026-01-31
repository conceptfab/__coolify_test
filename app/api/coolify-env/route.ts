import { NextResponse } from 'next/server';
import { getCoolifyEnvStatus } from '@/lib/coolify-env';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const result = getCoolifyEnvStatus();
  return NextResponse.json(result);
}
