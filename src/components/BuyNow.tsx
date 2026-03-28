'use client';

import { useTransition } from 'react';
import { getCheckoutUrl } from '@/app/actions';
import { Sparkles } from 'lucide-react';

interface BuyNowProps {
  quantity?: number;
  label?: string;
  className?: string;
}

export default function BuyNow({ quantity = 1, label, className }: BuyNowProps) {
  const [pending, start] = useTransition();

  function handleClick() {
    start(async () => {
      const url = await getCheckoutUrl(quantity);
      window.location.href = url;
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={
        className ??
        'rounded-2xl px-6 py-3 bg-[var(--dots-blue)] text-white shadow hover:shadow-lg transition hover:-translate-y-0.5 inline-flex items-center gap-2 disabled:opacity-60'
      }
      type="button"
    >
      <Sparkles className="h-5 w-5" />
      {pending ? 'Procesando…' : (label ?? 'Comprar ahora')}
    </button>
  );
}
