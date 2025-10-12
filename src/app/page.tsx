import Image from 'next/image';
import Section from '@/components/ui/Section';
import { getSingleProduct } from '@/lib/shopify';
import { buyNowAction } from './actions';

export const revalidate = 60;

export default async function Home() {
  const handle = process.env.SINGLE_PRODUCT_HANDLE!;
  const { product } = await getSingleProduct(handle);
  if (!product) return <main className="p-8">No encontré el producto. Revisa SINGLE_PRODUCT_HANDLE en el .env.</main>;

  const first = product.variants?.edges?.[0]?.node;
  const price = first?.price?.amount;
  const currency = first?.price?.currencyCode;
  const canBuy = !!first?.availableForSale;
  const heroImg = product.featuredImage?.url ?? product.images?.edges?.[0]?.node?.url;

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <Section id="hero" className="pt-10 md:pt-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Adiós espinillas en horas — <span className="whitespace-nowrap">Hola piel limpia</span>
            </h1>
            <p className="mt-4 text-lg opacity-80">
              {product.description?.slice(0, 180) || 'Parche formulado para calmar, proteger y acelerar la recuperación de imperfecciones sin irritar.'}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>• Actúa mientras duermes</li>
              <li>• Ingredientes dermatológicamente probados</li>
              <li>• Invisible bajo maquillaje</li>
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <form action={buyNowAction}>
                <input type="hidden" name="variantId" value={first.id} />
                <input type="hidden" name="quantity" value="1" />
                <button
                  className="rounded-2xl px-6 py-3 bg-black text-white shadow hover:opacity-90 disabled:opacity-60"
                  type="submit"
                  disabled={!canBuy}
                >
                  {canBuy ? `Comprar ahora — ${price} ${currency}` : 'Agotado'}
                </button>
              </form>
              <span className="text-sm opacity-70">30 días de garantía • Envío rápido</span>
            </div>

            {/* Prueba social */}
            <div className="mt-6 flex items-center gap-6 opacity-70">
              <span className="text-xs">★★★★★ +1,200 reseñas</span>
              <span className="text-xs">Dermatologist approved</span>
            </div>
          </div>

          {heroImg && (
            <div className="relative aspect-[4/5] w-full">
              <Image src={heroImg} alt={product.title} fill className="object-cover rounded-2xl shadow" />
            </div>
          )}
        </div>
      </Section>

      {/* PROBLEMA → SOLUCIÓN (Beneficios) */}
      <Section
        id="beneficios"
        eyebrow="¿Por qué salen?"
        title="Espinillas que aparecen cuando menos lo esperas"
        subtitle="Protege, aísla y acelera la recuperación con Dots"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: 'Aísla la zona', d: 'Evita tocar y empeorar la lesión.' },
            { t: 'Calma y protege', d: 'Activos que alivian y protegen la piel.' },
            { t: 'Resultados visibles', d: 'Reduce enrojecimiento y volumen en horas.' },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border p-6 shadow-sm">
              <h3 className="font-semibold mb-1">{b.t}</h3>
              <p className="opacity-80 text-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CÓMO FUNCIONA */}
      <Section id="como-funciona" eyebrow="Cómo funciona" title="3 pasos simples">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: '1', t: 'Limpia y seca', d: 'Aplica sobre piel limpia y seca.' },
            { n: '2', t: 'Aplica el parche', d: 'Cubre completamente la espinilla.' },
            { n: '3', t: 'Déjalo actuar', d: 'Mínimo 6-8 horas o toda la noche.' },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl p-6 bg-neutral-50 border">
              <div className="text-2xl font-bold">{s.n}</div>
              <div className="mt-2 font-semibold">{s.t}</div>
              <div className="opacity-80 text-sm">{s.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* INGREDIENTES */}
      <Section id="ingredientes" eyebrow="Ingredientes" title="Lo que hace la diferencia" subtitle="Fórmula efectiva, amable con tu piel">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: 'Hidrocoloide', d: 'Absorbe impurezas y protege el área.' },
            { t: 'Ácido Salicílico*', d: 'Ayuda a destapar poros. *Si tu fórmula lo incluye.' },
            { t: 'Centella / Niacinamida*', d: 'Calma y apoya la barrera. *Opcional.' },
          ].map((i) => (
            <div key={i.t} className="rounded-2xl border p-6">
              <h3 className="font-semibold mb-1">{i.t}</h3>
              <p className="opacity-80 text-sm">{i.d}</p>
            </div>
          ))}
        </div>
        <p className="text-xs opacity-60 mt-4">Consulta el INCI exacto en el empaque y la ficha del producto.</p>
      </Section>

      {/* TESTIMONIOS / RESULTADOS */}
      <Section id="resultados" eyebrow="Resultados reales" title="Antes y después">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border p-6">
            <p className="text-sm italic">“Me lo puse de noche y al otro día amaneció la espinilla plana.”</p>
            <p className="text-xs opacity-70 mt-2">— Mariana, 28</p>
          </div>
          <div className="rounded-2xl border p-6">
            <p className="text-sm italic">“Casi invisible, lo uso debajo del maquillaje.”</p>
            <p className="text-xs opacity-70 mt-2">— Andrea, 22</p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Preguntas frecuentes">
        <div className="space-y-4">
          {[
            { q: '¿Es para todo tipo de piel?', a: 'Sí. Si tienes piel muy sensible, prueba primero 1-2 horas.' },
            { q: '¿Se puede usar con maquillaje?', a: 'Sí. El parche es delgado y se camufla fácilmente.' },
            { q: '¿Cuánto tiempo lo dejo?', a: 'Ideal 6-8h (noche). Si la espinilla sigue activa, repite.' },
          ].map((f) => (
            <details key={f.q} className="rounded-xl border p-4">
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 opacity-80 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* GARANTÍA */}
      <Section id="garantia" eyebrow="Sin riesgo" title="Garantía 30 días">
        <div className="rounded-2xl border p-6 md:p-8">
          <p className="text-lg">
            Pruébalo 30 días. Si no ves resultados, te devolvemos el dinero. Sin preguntas.
          </p>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section id="comprar" className="pb-24">
        <div className="rounded-2xl border p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Listo para una piel más clara</h3>
            <p className="opacity-80 text-sm mt-1">Envío rápido • Pago seguro • Garantía 30 días</p>
          </div>
          <form action={buyNowAction}>
            <input type="hidden" name="variantId" value={first.id} />
            <input type="hidden" name="quantity" value="1" />
            <button
              className="rounded-2xl px-6 py-3 bg-black text-white shadow hover:opacity-90 disabled:opacity-60"
              type="submit"
              disabled={!canBuy}
            >
              {canBuy ? `Comprar ahora — ${price} ${currency}` : 'Agotado'}
            </button>
          </form>
        </div>
      </Section>
    </main>
  );
}

git branch -M main
git remote add origin https://github.com/legalzelo/dots-pimple-patches.git
git push -u origin main

