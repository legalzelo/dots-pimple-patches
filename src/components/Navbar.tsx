'use client';

import { useState } from 'react';
import Link from 'next/link';

const items = [
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#ingredientes', label: 'Ingredientes' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (hash: string) => {
    setOpen(false);
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-7 w-7 rounded-full bg-black text-white grid place-items-center text-xs">D</span>
          <span>Dots</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {items.map(i => (
            <li key={i.href}>
              <button onClick={() => scrollTo(i.href)} className="opacity-80 hover:opacity-100">
                {i.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo('#comprar')}
              className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
            >
              Comprar
            </button>
          </li>
        </ul>

        {/* Mobile */}
        <button
          className="md:hidden rounded-lg border px-3 py-2"
          onClick={() => setOpen(v => !v)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur">
          <ul className="mx-auto max-w-6xl px-4 py-3 space-y-3">
            {items.map(i => (
              <li key={i.href}>
                <button
                  onClick={() => scrollTo(i.href)}
                  className="w-full text-left py-2 opacity-80 hover:opacity-100"
                >
                  {i.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollTo('#comprar')}
                className="w-full rounded-xl bg-black px-4 py-2 text-white"
              >
                Comprar
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
