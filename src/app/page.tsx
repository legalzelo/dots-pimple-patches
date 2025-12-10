import Image from 'next/image';
import Section from '@/components/ui/Section';
import { getSingleProduct } from '@/lib/shopify';
import { buyNowAction } from './actions';
import { HandHeart, ShieldCheck, Eye, Sparkles } from 'lucide-react';

export const revalidate = 60;

export default async function Home() {
  const handle = process.env.SINGLE_PRODUCT_HANDLE!;
  const { product } = await getSingleProduct(handle);

  if (!product) {
    return (
      <main className="p-8">
        No encontré el producto. Revisa SINGLE_PRODUCT_HANDLE en el .env.
      </main>
    );
  }

  const first = product.variants?.edges?.[0]?.node;
  const canBuy = !!first?.availableForSale;
  const heroImg =
    product.featuredImage?.url ?? product.images?.edges?.[0]?.node?.url ?? '';

  // Retailers (edita a tus logos)
  const retailers: { name: string; url?: string; logo?: string }[] = [
    { name: 'Supermercado Ejemplo', url: '#', logo: '/retailers/super-ejemplo.png' },
    { name: 'Farmacia Demo', url: '#', logo: '/retailers/farmacia-demo.png' },
    { name: 'Tienda de Belleza XYZ', url: '#', logo: '/retailers/belleza-xyz.png' },
  ];

  // Textos estilo “antes/después” usados como labels en testimonios
  const beforeAfter: { caption: string }[] = [
    { caption: 'Noche con Dots' },
    { caption: '8 horas de uso' },
    { caption: 'Resultados reales' },
  ];

  // Testimonios (videos verticales)
  const testimonios: {
    name: string;
    country: string;
    avatar?: string;
    quote: string;
    video: string;
    poster?: string;
  }[] = [
    {
      name: 'Leví Durante',
      country: 'Guatemala',
      avatar: '/testimonials/levi.jpg',
      quote: '“Proceso simple y rápido. En una semana ya tenía todo listo.”',
      video: '/testimonials/levi.mp4',
      poster: '/testimonials/levi.jpg',
    },
    {
      name: 'Paola Álvarez',
      country: 'República Dominicana',
      avatar: '/testimonials/paola.jpg',
      quote: '“Atención impecable. Me ayudaron con Stripe y la cuenta bancaria.”',
      video: '/testimonials/paola.mp4',
      poster: '/testimonials/paola.jpg',
    },
    {
      name: 'Gabriel Morales',
      country: 'Nicaragua',
      avatar: '/testimonials/gabriel.jpg',
      quote: '“Superó mis expectativas. Recomendados 100%.”',
      video: '/testimonials/gabriel.mp4',
      poster: '/testimonials/gabriel.jpg',
    },
  ];

  // Chips “stickers” y avatars para social proof
  const chips = ['Invisible ✨', 'Barrera higiénica 🧴', 'Uso día/noche 🌙'];
  const buyers = ['/users/u1.jpg', '/users/u2.jpg', '/users/u3.jpg', '/users/u4.jpg'];

  // Beneficios con íconos lucide
  const benefits = [
    { icon: HandHeart, t: 'Aísla la zona', d: 'Evita fricción y contaminación.' },
    { icon: ShieldCheck, t: 'Absorbe impurezas', d: 'Hidrocoloide que aplaca en horas.' },
    { icon: Eye, t: 'Invisible y cómodo', d: 'Perfil delgado, bajo maquillaje.' },
  ] as const;

  return (
    <main
      className="min-h-screen bg-[radial-gradient(1200px_600px_at_100%_-10%,rgba(178,131,175,0.12),transparent_60%),radial-gradient(1000px_500px_at_-10%_0,rgba(228,180,132,0.12),transparent_55%)]"
      style={
        {
          ['--dots-blue' as any]: '#4EACD8',
          ['--dots-purple' as any]: '#B283AF',
          ['--dots-peach' as any]: '#E4B484',
          ['--dots-black' as any]: '#0C0C0C',
          ['--dots-white' as any]: '#FFFFFF',
        } as React.CSSProperties
      }
    >
      {/* TOP BAR DE COLOR */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--dots-blue)] via-[var(--dots-purple)] to-[var(--dots-peach)]" />

      {/* HERO — izquierda minimal con detalles y color */}
      <Section id="hero" className="pt-10 md:pt-16 relative">
        {/* Blobs de color sutiles */}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 right-[-20%] top-[-10%] h-[60vw] w-[60vw] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(closest-side, rgba(78,172,216,.22), transparent 65%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 left-[-25%] bottom-[-15%] h-[55vw] w-[55vw] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(closest-side, rgba(178,131,175,.18), transparent 65%)',
          }}
        />

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="sr-only">Envío gratis en República Dominicana</p>

            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-white/70 backdrop-blur border-[var(--dots-blue)]/20 text-[var(--dots-blue)]">
              <Sparkles className="h-4 w-4" />
              Nuevo look Dots
            </span>

            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight text-[var(--dots-black)] tracking-tight">
              El enemigo de las espinillas.
            </h1>

            <p className="mt-4 text-lg text-neutral-800">
              Elimina las espinillas en tan solo <strong>6–8 h</strong>. Es{' '}
              <strong>invisible</strong> y <strong>evita que la toques</strong>.
            </p>

            {/* Chips “stickers” con color */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <li
                  key={c}
                  className="px-3 py-1 rounded-full text-xs bg-[var(--dots-purple)]/12 text-[var(--dots-purple)] border border-[var(--dots-purple)]/25"
                >
                  {c}
                </li>
              ))}
            </ul>

            {/* Social proof avatars */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {buyers.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  />
                ))}
              </div>
              <span className="text-sm opacity-80">
                +500 chicas felices este mes 💕
              </span>
            </div>

            {/* CTA con color principal */}
            <div className="mt-6 flex items-center gap-4">
              <form action={buyNowAction}>
                <input type="hidden" name="variantId" value={first?.id} />
                <input type="hidden" name="quantity" value="1" />
                <button
                  className="rounded-2xl px-6 py-3 bg-[var(--dots-blue)] text-white shadow hover:shadow-lg transition hover:-translate-y-0.5 inline-flex items-center gap-2 disabled:opacity-60"
                  type="submit"
                  disabled={!canBuy}
                >
                  <Sparkles className="h-5 w-5" />
                  Comprar ahora
                </button>
              </form>
            </div>
          </div>

          {/* Video derecha con marco de color */}
          <div>
            <h2 className="mb-3 text-sm font-medium text-neutral-700">
              Cómo funciona — video explicativo en 2 minutos
            </h2>

            <div className="relative aspect-[9/16] md:aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lg ring-2 ring-[var(--dots-blue)]/20 bg-[var(--dots-blue)]/10">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                playsInline
                muted
                loop
                poster="/hero-poster.jpg"
                controls
              >
                <source src="/hero.mp4" type="video/mp4" />
              </video>

              {/* Play ring decorativo en degradé brand */}
              <div
                aria-hidden
                className="absolute left-4 bottom-4 grid place-items-center h-12 w-12 rounded-full"
                style={{
                  background:
                    'conic-gradient(#4EACD8 0 40%, #B283AF 40% 70%, #E4B484 70% 100%)',
                }}
              >
                <span className="grid place-items-center h-10 w-10 rounded-full bg-white/90 backdrop-blur">
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
              </div>

              {!heroImg && (
                <Image
                  src="/hero-poster.jpg"
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* SEPARADOR DEGRADÉ */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[var(--dots-peach)] via-[var(--dots-purple)] to-[var(--dots-blue)]/70" />

      {/* BENEFICIOS con íconos y colores */}
      <Section
        id="beneficios"
        eyebrow="Beneficios"
        title="Protege, aísla y acelera la recuperación"
        subtitle="Evita tocar la zona, mantén la piel cubierta y permite que el parche haga su trabajo."
        className="bg-white/70 backdrop-blur rounded-3xl"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="rounded-2xl border p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition bg-gradient-to-b from-white to-[rgba(78,172,216,0.04)]"
              style={{ borderColor: 'rgba(78,172,216,0.18)' }}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--dots-blue)]/12">
                <Icon className="h-5 w-5 text-[var(--dots-blue)]" />
              </div>
              <h3 className="font-semibold mt-3 text-[var(--dots-black)]">{t}</h3>
              <p className="opacity-80 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CÓMO FUNCIONA con fondo melocotón claro */}
      <Section
        id="como-funciona"
        eyebrow="Cómo funciona"
        title="3 pasos simples"
        className="rounded-3xl"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: '1', t: 'Limpia y seca', d: 'Asegúrate de que la piel esté limpia y completamente seca.' },
            { n: '2', t: 'Aplica el parche', d: 'Colócalo cubriendo por completo la espinilla (ideal con punto blanco).' },
            { n: '3', t: 'Déjalo actuar', d: 'Mínimo 6–8 h o toda la noche. Retira y, si hace falta, repite.' },
          ].map((s, idx) => (
            <div
              key={s.n}
              className="rounded-2xl p-6 border"
              style={{
                background:
                  idx === 1
                    ? 'linear-gradient(180deg, rgba(178,131,175,0.08), transparent 70%)'
                    : 'linear-gradient(180deg, rgba(228,180,132,0.08), transparent 70%)',
                borderColor: 'rgba(12,12,12,0.08)',
              }}
            >
              <div className="text-2xl font-bold text-[var(--dots-black)]">{s.n}</div>
              <div className="mt-2 font-semibold text-[var(--dots-black)]">{s.t}</div>
              <div className="opacity-80 text-sm">{s.d}</div>
            </div>
          ))}
        </div>
        <p className="text-xs opacity-60 mt-4">
          Solo uso externo. No usar en heridas abiertas. Suspende si hay irritación. No usar si eres alérgico a pectina o caucho.
        </p>
      </Section>

      {/* INGREDIENTES con tarjetas color-acento */}
      <Section
        id="ingredientes"
        eyebrow="Ingredientes"
        title="Lo que hace la diferencia"
        subtitle="Fórmula efectiva y amable con tu piel"
        className="bg-white/70 backdrop-blur rounded-3xl"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: 'Hidrocoloide', d: 'Absorbe impurezas y protege el área mientras actúa.' },
            { t: 'Transparente', d: 'Delgado e invisible para uso diurno o nocturno.' },
            { t: 'Suave con la piel', d: 'Sin fragancia y pensado para acompañar tu rutina.' },
          ].map((i, idx) => (
            <div
              key={i.t}
              className="rounded-2xl border p-6"
              style={{
                borderColor:
                  idx === 0
                    ? 'rgba(78,172,216,0.25)'
                    : idx === 1
                    ? 'rgba(178,131,175,0.25)'
                    : 'rgba(228,180,132,0.25)',
                background:
                  idx === 0
                    ? 'linear-gradient(180deg, rgba(78,172,216,0.06), transparent 60%)'
                    : idx === 1
                    ? 'linear-gradient(180deg, rgba(178,131,175,0.06), transparent 60%)'
                    : 'linear-gradient(180deg, rgba(228,180,132,0.06), transparent 60%)',
              }}
            >
              <h3 className="font-semibold mb-1 text-[var(--dots-black)]">{i.t}</h3>
              <p className="opacity-80 text-sm">{i.d}</p>
            </div>
          ))}
        </div>
        <p className="text-xs opacity-60 mt-4">Consulta el INCI exacto en el empaque y la ficha del producto.</p>
      </Section>

      {/* DÓNDE COMPRAR con micro-interacción y acentos */}
      <Section
        id="donde-comprar"
        eyebrow="Dónde comprar"
        title="Disponible en:"
        subtitle="Encuéntranos en supermercados, farmacias y otros puntos de venta."
        className="rounded-3xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {retailers.map((r, idx) => (
            <a
              key={r.name}
              href={r.url || '#'}
              target={r.url ? '_blank' : undefined}
              rel={r.url ? 'noopener noreferrer' : undefined}
              className="group rounded-xl border bg-white p-4 md:p-5 flex items-center justify-center hover:shadow-md hover:-translate-y-0.5 transition"
              aria-label={r.name}
              style={{
                borderColor:
                  idx % 3 === 0
                    ? 'rgba(78,172,216,0.22)'
                    : idx % 3 === 1
                    ? 'rgba(178,131,175,0.22)'
                    : 'rgba(228,180,132,0.22)',
              }}
            >
              {r.logo ? (
                <Image
                  src={r.logo}
                  alt={r.name}
                  width={160}
                  height={64}
                  className="h-10 w-auto object-contain transition group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              ) : (
                <span className="text-sm font-medium">{r.name}</span>
              )}
            </a>
          ))}
        </div>
        <p className="mt-2 text-xs text-center opacity-60">
          Pide tu Dot en tu tienda fav ✨
        </p>
        <p className="mt-4 text-xs text-neutral-600">
          ¿Eres tienda y quieres vender Dots? Escríbenos a{' '}
          <a href="mailto:ventas@dots.com.do" className="underline">
            ventas@dots.com.do
          </a>.
        </p>
      </Section>

      {/* TESTIMONIOS usando labels “antes/después” con color de etiqueta */}
      <Section
        id="testimonios"
        eyebrow="Testimonios"
        title="Lo que dicen nuestros clientes"
        subtitle="Resultados reales de emprendedores de toda LATAM."
        className="bg-white/70 backdrop-blur rounded-3xl"
      >
        {/* Móvil: carrusel */}
        <div className="md:hidden -mx-6 px-6 overflow-x-auto scroll-smooth snap-x snap-mandatory">
          <div className="flex gap-4 w-max">
            {testimonios.map((t, i) => {
              const label = beforeAfter[i % beforeAfter.length]?.caption || t.quote;
              const badgeBg =
                i % 3 === 0
                  ? 'bg-[var(--dots-blue)]'
                  : i % 3 === 1
                  ? 'bg-[var(--dots-purple)]'
                  : 'bg-[var(--dots-peach)]';
              return (
                <article
                  key={t.name}
                  className="snap-center w-72 shrink-0 rounded-2xl border bg-white p-4 shadow-sm"
                  style={{ borderColor: 'rgba(12,12,12,0.08)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-black/5">
                        <Image
                          src={t.avatar || '/testimonials/avatar-fallback.png'}
                          alt={t.name}
                          width={36}
                          height={36}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-xs text-neutral-500">{t.country}</div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500">ᐸᐳ Testimonio</div>
                  </div>

                  <p className="mt-3 text-sm text-neutral-800">{label}</p>

                  <div className="mt-3 relative aspect-[9/16] w-full overflow-hidden rounded-xl ring-2 bg-neutral-50"
                       style={{ borderColor: 'transparent', boxShadow: '0 0 0 1px rgba(12,12,12,0.06) inset' }}>
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      controls
                      playsInline
                      poster={t.poster || '/testimonials/poster.jpg'}
                    >
                      <source src={t.video} type="video/mp4" />
                    </video>
                    <span className={`absolute left-2 bottom-2 rounded-full ${badgeBg} text-white text-xs px-2 py-0.5`}>
                      {label}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => {
            const label = beforeAfter[i % beforeAfter.length]?.caption || t.quote;
            const badgeBg =
              i % 3 === 0
                ? 'bg-[var(--dots-blue)]'
                : i % 3 === 1
                ? 'bg-[var(--dots-purple)]'
                : 'bg-[var(--dots-peach)]';
            return (
              <article key={t.name} className="rounded-2xl border bg-white p-5 shadow-sm"
                       style={{ borderColor: 'rgba(12,12,12,0.08)' }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/5">
                      <Image
                        src={t.avatar || '/testimonials/avatar-fallback.png'}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-neutral-500">{t.country}</div>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500">〃 Testimonio</div>
                </div>

                <p className="mt-3 text-sm text-neutral-800">{label}</p>

                <div className="mt-4 relative aspect-[9/16] w-full overflow-hidden rounded-xl ring-2 bg-neutral-50"
                     style={{ borderColor: 'transparent', boxShadow: '0 0 0 1px rgba(12,12,12,0.06) inset' }}>
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    playsInline
                    poster={t.poster || '/testimonials/poster.jpg'}
                  >
                    <source src={t.video} type="video/mp4" />
                  </video>
                  <span className={`absolute left-2 bottom-2 rounded-full ${badgeBg} text-white text-xs px-2 py-0.5`}>
                    {label}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* GARANTÍA / CTA FINAL con bordes de color */}
      <Section id="comprar" className="pb-28" eyebrow="Sin riesgo" title="Garantía 30 días">
        <div
          className="rounded-2xl border p-6 md:p-8 bg-white/80 backdrop-blur"
          style={{ borderColor: 'rgba(78,172,216,0.22)' }}
        >
          <p className="text-lg">
            Pruébalo 30 días. Si no ves resultados, te devolvemos el dinero. Envío gratis a Santo Domingo,
            Santiago y Punta Cana.
          </p>
          <div className="mt-6">
            <form action={buyNowAction}>
              <input type="hidden" name="variantId" value={first?.id} />
              <input type="hidden" name="quantity" value="1" />
              <button
                className="rounded-2xl px-6 py-3 bg-[var(--dots-blue)] text-white shadow hover:shadow-lg transition hover:-translate-y-0.5 inline-flex items-center gap-2 disabled:opacity-60"
                type="submit"
                disabled={!canBuy}
              >
                <Sparkles className="h-5 w-5" />
                Comprar ahora
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* Sticky bar móvil */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="rounded-2xl bg-white/85 backdrop-blur border shadow-lg p-3 flex items-center justify-between"
             style={{ borderColor: 'rgba(178,131,175,0.25)' }}>
          <div className="text-sm">
            <div className="font-semibold">Piel +clarita en 6–8 h ✨</div>
            <div className="text-xs opacity-70">Envío gratis SDG, STI y PUJ</div>
          </div>
          <form action={buyNowAction}>
            <input type="hidden" name="variantId" value={first?.id} />
            <input type="hidden" name="quantity" value="1" />
            <button
              className="rounded-xl px-4 py-2 text-white text-sm shadow"
              type="submit"
              disabled={!canBuy}
              style={{
                background:
                  'linear-gradient(90deg, var(--dots-blue), var(--dots-purple))',
              }}
            >
              Comprar
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM BAR DE COLOR */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--dots-blue)] via-[var(--dots-purple)] to-[var(--dots-peach)] mt-8" />
    </main>
  );
}
