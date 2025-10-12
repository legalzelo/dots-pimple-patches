'use client';

import { useTransition } from 'react';
// @ts-expect-error server action import
import { buyNowAction } from '@/src/app/actions';

export default function BuyNow({ variantId, quantity = 1, label }: { variantId: string; quantity?: number; label?: string }) {
  const [pending, start] = useTransition();

  return (
    <form
      action={(fd) => {
        start(async () => {
          fd.set('variantId', variantId);
          fd.set('quantity', String(quantity));
          const url = await buyNowAction(fd); // si usas variante con redirect del server, cambia por solo submit
          window.location.href = url;
        });
      }}
    >
      <button
        disabled={pending}
        className="rounded-2xl px-6 py-3 bg-black text-white shadow hover:opacity-90 disabled:opacity-60"
        type="submit"
      >
        {pending ? 'Procesando…' : (label ?? 'Comprar ahora')}
      </button>
    </form>
  );
}
