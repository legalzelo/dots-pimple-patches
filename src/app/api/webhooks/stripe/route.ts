import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { sendOrderConfirmation } from '@/lib/email';
import { trackPurchase } from '@/lib/klaviyo';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email;
    const name = session.customer_details?.name ?? 'Cliente';
    const phone = session.customer_details?.phone ?? '';
    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const address = (session as any).shipping_details?.address ?? null;

    if (email) {
      await Promise.allSettled([
        sendOrderConfirmation({ to: email, name, phone, amount, address, sessionId: session.id }),
        trackPurchase({ email, name, amount, orderId: session.id }),
      ]);
    }
  }

  return NextResponse.json({ received: true });
}
