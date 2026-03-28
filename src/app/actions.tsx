'use server';

import { redirect } from 'next/navigation';
import { getStripe, PRODUCT } from '@/lib/stripe';

/** Para server forms — redirige directamente al checkout de Stripe */
export async function buyNowAction(formData: FormData) {
  const quantity = Number(formData.get('quantity') || 1);
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    locale: 'es',
    line_items: [{
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
    }],
    success_url: `${baseUrl}/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#comprar`,
    phone_number_collection: { enabled: true },
    shipping_address_collection: { allowed_countries: ['DO'] },
    custom_text: {
      submit: { message: 'Tu pedido será enviado dentro de 24–72 horas en RD.' },
    },
  });

  redirect(session.url!);
}

/** Para client components — retorna la URL sin redirigir */
export async function getCheckoutUrl(quantity: number = 1): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    locale: 'es',
    line_items: [{
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
    }],
    success_url: `${baseUrl}/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#comprar`,
    phone_number_collection: { enabled: true },
    shipping_address_collection: { allowed_countries: ['DO'] },
    custom_text: {
      submit: { message: 'Tu pedido será enviado dentro de 24–72 horas en RD.' },
    },
  });

  return session.url!;
}
