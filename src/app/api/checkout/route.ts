import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PRODUCT } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const { quantity = 1 } = await req.json().catch(() => ({}));

  const baseUrl = process.env.NEXT_PUBLIC_URL ?? req.nextUrl.origin ?? 'http://localhost:3000';

  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    locale: 'es',
    line_items: [
      {
        price_data: {
          currency: PRODUCT.currency,
          product_data: {
            name: PRODUCT.name,
            description: PRODUCT.description,
            images: [`${baseUrl}/herodots.png`],
          },
          unit_amount: PRODUCT.unit_amount,
        },
        quantity,
      },
    ],
    success_url: `${baseUrl}/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#comprar`,
    phone_number_collection: { enabled: true },
    shipping_address_collection: {
      allowed_countries: ['DO'],
    },
    custom_text: {
      submit: { message: 'Tu pedido será enviado dentro de 24-72 horas en RD.' },
    },
  });

  return NextResponse.json({ url: session.url });
}
