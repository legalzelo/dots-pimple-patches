const DOMAIN  = process.env.SHOPIFY_STORE_DOMAIN!;
const VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-07';
const TOKEN   = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;

function apiUrl() {
  return `https://${DOMAIN}/api/${VERSION}/graphql.json`;
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const body = JSON.stringify({ query, variables });

  // 1) Header estándar
  let res = await fetch(apiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body,
    cache: 'no-store',
  });

  // 2) Si 401, reintenta con header para PRIVATE token
  if (res.status === 401) {
    res = await fetch(apiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Shopify-Storefront-Private-Token': TOKEN,
      },
      body,
      cache: 'no-store',
    });
  }

  const json = await res.json();
  if (!res.ok || json.errors) {
    const errs = (json.errors ?? []).map((e: any) => e.message).join(' | ');
    throw new Error(`Shopify error: ${res.status} ${res.statusText} — ${errs}`);
  }
  return json.data as T;
}

export async function getSingleProduct(handle: string) {
  const QUERY = `
    query Product($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        featuredImage { url altText }
        images(first: 8) { edges { node { url altText } } }
        variants(first: 50) {
          edges { node { id title availableForSale price { amount currencyCode } } }
        }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  `;
  return shopifyFetch<{ product: any }>(QUERY, { handle });
}

/** Crea un carrito y devuelve la URL de checkout */
export async function createCheckoutUrl(variantId: string, quantity: number) {
  const MUT = `
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { checkoutUrl }
        userErrors { field message }
      }
    }
  `;
  const data = await shopifyFetch<{ cartCreate: { cart: { checkoutUrl: string } | null; userErrors: any[] } }>(
    MUT,
    { lines: [{ merchandiseId: variantId, quantity }] }
  );
  const url = data.cartCreate.cart?.checkoutUrl;
  if (!url) throw new Error(`No checkout URL: ${JSON.stringify(data.cartCreate.userErrors)}`);
  return url;
}
