import { NextResponse } from 'next/server';
import { getPorts } from '@/lib/ports';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const result = getPorts();
  return NextResponse.json(result);
}
