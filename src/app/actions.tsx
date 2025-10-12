'use server';

import { redirect } from 'next/navigation';
// Ajusta la ruta del import a tu proyecto:
// si tu helper está en src/lib/shopify.ts usa:
import { createCheckoutUrl } from '@/lib/shopify';

export async function buyNowAction(formData: FormData) {
  const variantId = String(formData.get('variantId'));
  const quantity  = Number(formData.get('quantity') || 1);

  const checkoutUrl = await createCheckoutUrl(variantId, quantity);
  redirect(checkoutUrl);
}
