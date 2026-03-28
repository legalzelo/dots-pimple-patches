'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCheckoutUrl } from '@/app/actions';
import { ShoppingBag, X, Menu } from 'lucide-react';

const links = [
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  function scrollTo(hash: string) {
    setOpen(false);
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleBuy() {
    start(async () => {
      const url = await getCheckoutUrl(1);
      window.location.href = url;
    });
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--dots-cream)]/90 backdrop-blur-md border-b border-black/6">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-6">

          <Link href="/" aria-label="Inicio">
            <Image src="/primarylogo.png" alt="Dots" width={160} height={56} className="h-12 w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-neutral-500 hover:text-[var(--dots-dark)] transition"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBuy}
              disabled={pending}
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--dots-dark)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[var(--dots-blue)] transition disabled:opacity-60"
            >
              <ShoppingBag className="h-4 w-4" />
              {pending ? 'Cargando…' : 'Comprar — RD$595'}
            </button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-black/5 transition"
              onClick={() => setOpen(v => !v)}
              aria-label="Menú"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-x-0 top-16 z-40 bg-[var(--dots-cream)] border-b border-black/6 shadow-lg">
          <nav className="flex flex-col px-5 py-4 gap-1">
            {links.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left py-3 text-base font-medium text-[var(--dots-dark)] border-b border-black/5 last:border-0"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={handleBuy}
              disabled={pending}
              className="mt-3 w-full rounded-full bg-[var(--dots-dark)] text-white py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              {pending ? 'Cargando…' : 'Comprar ahora — RD$595'}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
