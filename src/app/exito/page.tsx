import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function ExitoPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--dots-blue)]/10 mx-auto">
          <CheckCircle2 className="h-10 w-10 text-[var(--dots-blue)]" />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-[var(--dots-black)] tracking-tight">
            ¡Pedido confirmado! 🎉
          </h1>
          <p className="mt-3 text-neutral-600">
            Recibimos tu pago. Te enviamos un email de confirmación con los detalles de tu pedido.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--dots-blue)]/20 bg-[var(--dots-blue)]/5 p-5 text-sm text-left space-y-2">
          <p className="font-semibold text-[var(--dots-black)]">¿Qué sigue?</p>
          <ul className="space-y-1.5 text-neutral-600">
            <li>📦 Tu pedido se prepara en las próximas horas</li>
            <li>🚚 Entrega en 24–72 horas laborales en RD</li>
            <li>📱 Si tienes dudas, escríbenos por WhatsApp</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/18498480190?text=Hola%2C%20acabo%20de%20hacer%20un%20pedido%20de%20Dots"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
            style={{ background: '#25D366' }}
          >
            Contactar por WhatsApp
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-[var(--dots-black)] hover:bg-neutral-50 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
