import Link from 'next/link';

export default function CanceladoPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 mx-auto text-4xl">
          😕
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-[var(--dots-black)] tracking-tight">
            Pago cancelado
          </h1>
          <p className="mt-2 text-neutral-600 text-sm">
            No se realizó ningún cobro. Puedes intentarlo de nuevo cuando quieras.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/#comprar"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-[var(--dots-blue)] hover:opacity-90 transition"
          >
            Intentar de nuevo
          </Link>
          <a
            href="https://wa.me/18498480190?text=Hola%2C%20tuve%20un%20problema%20al%20pagar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-[var(--dots-black)] hover:bg-neutral-50 transition"
          >
            ¿Necesitas ayuda?
          </a>
        </div>
      </div>
    </main>
  );
}
