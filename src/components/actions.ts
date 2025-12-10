'use server';

import { redirect } from 'next/navigation';

export async function buyNowAction(formData: FormData) {
  const variantId = String(formData.get('variantId') || '');
  const quantity = Number(formData.get('quantity') || 1);

  if (!variantId) {
    // Si no hay variantId, vuelve al home con error suave
    redirect('/?error=missing-variant');
  }

  const shop = process.env.SHOPIFY_STORE_DOMAIN; // ej: "mi-tienda.myshopify.com"
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN; // token Storefront API
  if (!shop || !token) {
    redirect('/?error=shopify-env');
  }

  // Usa la API de Storefront para crear un Cart y redirigir al checkout
  const endpoint = `https://${shop}/api/2024-07/graphql.json`;
  const query = /* GraphQL */ `
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    lines: [
      {
        merchandiseId: variantId, // Debe ser un GID de Variant (ej: gid://shopify/ProductVariant/123...)
        quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
      },
    ],
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  // Manejo de respuesta
  const json = await res.json().catch(() => null as any);
  const checkoutUrl =
    json?.data?.cartCreate?.cart?.checkoutUrl ?? null;
  const userErrors =
    json?.data?.cartCreate?.userErrors ?? [];

  if (checkoutUrl) {
    // Enviar al checkout nativo de Shopify
    redirect(checkoutUrl);
  }

  // Si hubo errores, llévalo al home con un indicio
  const errMsg =
    userErrors?.[0]?.message || 'cart_create_failed';
  redirect(`/?error=${encodeURIComponent(errMsg)}`);
}
