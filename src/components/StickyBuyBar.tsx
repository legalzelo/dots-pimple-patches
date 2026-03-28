'use client';

import { useEffect, useState, useTransition } from 'react';
import { Sparkles } from 'lucide-react';
import { getCheckoutUrl } from '@/app/actions';

interface StickyBuyBarProps {
  price: string;
}

export default function StickyBuyBar({ price }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false);
  const [pending, start] = useTransition();

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  function handleBuy() {
    start(async () => {
      const url = await getCheckoutUrl(1);
      window.location.href = url;
    });
  }

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur border-t border-black/8 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[var(--dots-black)] truncate">Dots — Parches anti-espinillas</p>
          <p className="text-sm font-bold text-[var(--dots-blue)]">{price}</p>
        </div>
        <button
          onClick={handleBuy}
          disabled={pending}
          className="shrink-0 rounded-xl px-5 py-3 bg-[var(--dots-blue)] text-white text-sm font-semibold inline-flex items-center gap-1.5 shadow disabled:opacity-50 active:scale-95 transition"
        >
          <Sparkles className="h-4 w-4" />
          {pending ? 'Un momento…' : 'Comprar'}
        </button>
      </div>
    </div>
  );
}
