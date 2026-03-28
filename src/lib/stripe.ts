import Stripe from 'stripe';

/** Lazy — se inicializa solo en runtime cuando hay un request */
export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

/** Producto único — ajusta precio e info aquí */
export const PRODUCT = {
  name: 'Dots — Parches Anti-espinillas',
  description: '24 parches hidrocoloides · 2 tamaños',
  /** Precio en centavos de DOP (RD$595 = 59500) */
  unit_amount: 59500,
  currency: 'dop',
  priceLabel: 'RD$595',
} as const;
