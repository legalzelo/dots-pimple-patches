import { NextRequest, NextResponse } from 'next/server';
import { subscribeToList } from '@/lib/klaviyo';

export async function POST(req: NextRequest) {
  const { email, firstName } = await req.json().catch(() => ({}));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
  }

  await subscribeToList(email, firstName);
  return NextResponse.json({ ok: true });
}
