'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error ?? 'Algo salió mal, intenta de nuevo.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('Error de conexión. Intenta de nuevo.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <div className="text-3xl mb-2">🎉</div>
        <p className="font-semibold text-[var(--dots-dark)] text-lg">¡Ya estás dentro!</p>
        <p className="text-neutral-500 text-sm mt-1">Revisa tu correo para los tips exclusivos.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Tu nombre"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--dots-blue)] placeholder:text-neutral-400"
      />
      <input
        type="email"
        required
        placeholder="Tu correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--dots-blue)] placeholder:text-neutral-400"
      />
      {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-full bg-[var(--dots-blue)] text-white py-3 text-sm font-semibold hover:bg-[var(--dots-blue-dark)] transition disabled:opacity-60"
      >
        {status === 'loading' ? 'Enviando…' : 'Quiero los tips gratis →'}
      </button>
      <p className="text-xs text-neutral-400 text-center">Sin spam. Solo tips de skincare. Cancela cuando quieras.</p>
    </form>
  );
}
