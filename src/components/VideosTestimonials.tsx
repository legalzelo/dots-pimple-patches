import Image from 'next/image';
import Section from '@/components/ui/Section';
import { getSingleProduct } from '@/lib/shopify';
import { buyNowAction } from './actions';
import VideosTestimonials from '@/components/VideosTestimonials';

export const revalidate = 60;

export default async function Home() {
  const handle = process.env.SINGLE_PRODUCT_HANDLE!;
  const { product } = await getSingleProduct(handle);

  if (!product) {
    return <main className="p-8">No encontré el producto. Revisa SINGLE_PRODUCT_HANDLE en el .env.</main>;
  }

  const first = product.variants?.edges?.[0]?.node;
  const price = first?.price?.amount;
  const currency = first?.price?.currencyCode;
  const canBuy = !!first?.availableForSale;
  const heroImg = product.featuredImage?.url ?? product.images?.edges?.[0]?.node?.url ?? '';

  const retailers = [
    { name: 'Supermercado Ejemplo', url: '#', logo: '/retailers/super-ejemplo.png' },
    { name: 'Farmacia Demo', url: '#', logo: '/retailers/farmacia-demo.png' },
    { name: 'Tienda de Belleza XYZ', url: '#', logo: '/retailers/belleza-xyz.png' },
  ];

  const testimonialVideos = [
    { src: '/testimonials/vid-1.mp4', poster: '/testimonials/vid-1.jpg', title: 'Review 1' },
    { src: '/testimonials/vid-2.mp4', poster: '/testimonials/vid-2.jpg', title: 'Review 2' },
    { src: '/testimonials/vid-3.mp4', poster: '/testimonials/vid-3.jpg', title: 'Review 3' },
  ];

  const testimonios = [
    {
      name: 'Leví Durante',
      country: 'Guatemala',
      avatar: '/testimonials/levi.jpg',
      quote: '“Proceso simple y rápido. En una semana ya tenía todo listo.”',
      video: '/testimonials/vid-1.mp4',
    },
    {
      name: 'Paola Álvarez',
      country: 'República Dominicana',
      avatar: '/testimonials/paola.jpg',
      quote: '“Atención impecable. Me ayudaron con Stripe y la cuenta bancaria.”',
      video: '/testimonials/vid-2.mp4',
    },
    {
      name: 'Gabriel Morales',
      country: 'Nicaragua',
      avatar: '/testimonials/gabriel.jpg',
      quote: '“Superó mis expectativas. Recomendados 100%.”',
      video: '/testimonials/vid-3.mp4',
    },
  ];

  return (
    <main
      className="min-h-screen"
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
      {/* HERO */}
      <Section id="hero" className="pt-10 md:pt-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="sr-only">Envío gratis en República Dominicana</p>
            <h1 className="mt-1 text-4xl md:text-5xl font-bold leading-tight text-[var(--dots-black)]">
              Dots: El enemigo de las espinillas.
            </h1>
            <p className="mt-4 text-lg text-neutral-800">
              Elimina las espinillas en tan solo <strong>6–8 h</strong>. Es <strong>invisible</strong> y
              <strong> evita que la toques</strong>.
            </p>
            <p className="mt-3 text-sm text-neutral-600">Absorbe impurezas · Invisible · Barrera higiénica</p>
            <div className="mt-6 flex items-center gap-4">
              <form action={buyNowAction}>
                <input type="hidden" name="variantId" value={first?.id} />
                <input type="hidden" name="quantity" value="1" />
                <button
                  className="rounded-2xl px-6 py-3 bg-[var(--dots-blue)] text-white shadow hover:opacity-90 disabled:opacity-60"
                  type="submit"
                  disabled={!canBuy}
                >
                  {canBuy ? `Comprar ahora — ${price} ${currency}` : 'Agotado'}
                </button>
              </form>
            </div>
          </div>

          {/* Video explicativo */}
          <div>
            <h2 className="mb-3 text-sm font-medium text-neutral-700">
              Cómo funciona — video explicativo en 2 minutos
            </h2>
            <div className="relative aspect-[9/16] md:aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 bg-[var(--dots-blue)]/10">
              <video className="absolute inset-0 h-full w-full object-cover" autoPlay playsInline muted loop poster="/hero-poster.jpg">
                <source src="/hero.mp4" type="video/mp4" />
              </video>
              {!heroImg && <Image src="/hero-poster.jpg" alt={product.title} fill className="object-cover" priority />}
            </div>
          </div>
        </div>
      </Section>

      {/* BENEFICIOS */}
      <Section
        id="beneficios"
        eyebrow="Beneficios"
        title="Protege, aísla y acelera la recuperación"
        subtitle="Evita tocar la zona, mantén la piel cubierta y permite que el parche haga su trabajo."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: 'Aísla la zona', d: 'Cubre la espinilla para evitar fricción y contaminación.' },
            { t: 'Absorbe impurezas', d: 'El hidrocoloide ayuda a aplanar y calmar en horas.' },
            { t: 'Invisible y cómodo', d: 'Perfil delgado que se camufla bajo maquillaje.' },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border p-6 shadow-sm">
              <h3 className="font-semibold mb-1 text-[var(--dots-black)]">{b.t}</h3>
              <p className="opacity-80 text-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* INGREDIENTES */}
      <Section id="ingredientes" eyebrow="Ingredientes" title="Lo que hace la diferencia" subtitle="Fórmula efectiva y amable con tu piel">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: 'Hidrocoloide', d: 'Absorbe impurezas y protege el área mientras actúa.' },
            { t: 'Transparente', d: 'Delgado e invisible para uso diurno o nocturno.' },
            { t: 'Suave con la piel', d: 'Sin fragancia y pensado para acompañar tu rutina.' },
          ].map((i) => (
            <div key={i.t} className="rounded-2xl border p-6">
              <h3 className="font-semibold mb-1 text-[var(--dots-black)]">{i.t}</h3>
              <p className="opacity-80 text-sm">{i.d}</p>
            </div>
          ))}
        </div>
        <p className="text-xs opacity-60 mt-4">Consulta el INCI exacto en el empaque y la ficha del producto.</p>
      </Section>

      {/* DÓNDE COMPRAR */}
      <Section id="donde-comprar" eyebrow="Dónde comprar" title="Disponible en:" subtitle="Encuéntranos en supermercados, farmacias y otros puntos de venta.">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {retailers.map((r) => (
            <a
              key={r.name}
              href={r.url || '#'}
              target={r.url ? '_blank' : undefined}
              rel={r.url ? 'noopener noreferrer' : undefined}
              className="group rounded-xl border bg-white p-4 md:p-5 flex items-center justify-center hover:shadow-sm transition"
              aria-label={r.name}
            >
              {r.logo ? (
                <Image src={r.logo} alt={r.name} width={160} height={64} className="h-10 w-auto object-contain opacity-90 group-hover:opacity-100" />
              ) : (
                <span className="text-sm font-medium">{r.name}</span>
              )}
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-neutral-600">
          ¿Eres tienda y quieres vender Dots? Escríbenos a <a href="mailto:ventas@dots.com.do" className="underline">ventas@dots.com.do</a>.
        </p>
      </Section>

      {/* VIDEOS TESTIMONIALES */}
      <Section id="videos-testimoniales" eyebrow="Testimonios" title="Videos Testimoniales" subtitle="Experiencias reales de clientes usando Dots.">
        <VideosTestimonials videos={testimonialVideos} />
      </Section>

      {/* TESTIMONIOS (quotes) */}
      <Section id="testimonios" eyebrow="Más opiniones" title="Lo que dicen nuestros clientes">
        <div className="grid md:grid-cols-3 gap-6">
          {testimonios.map((t) => (
            <article key={t.name} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/5">
                  <Image src={t.avatar || '/testimonials/avatar-fallback.png'} alt={t.name} width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.country}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-neutral-800">{t.quote}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* GARANTÍA / CTA FINAL */}
      <Section id="comprar" className="pb-24" eyebrow="Sin riesgo" title="Garantía 30 días">
        <div className="rounded-2xl border p-6 md:p-8">
          <p className="text-lg">Pruébalo 30 días. Si no ves resultados, te devolvemos el dinero. Envío gratis a Santo Domingo, Santiago y Punta Cana.</p>
          <div className="mt-6">
            <form action={buyNowAction}>
              <input type="hidden" name="variantId" value={first?.id} />
              <input type="hidden" name="quantity" value="1" />
              <button className="rounded-2xl px-6 py-3 bg-[var(--dots-blue)] text-white shadow hover:opacity-90 disabled:opacity-60" type="submit" disabled={!canBuy}>
                {canBuy ? `Comprar ahora — ${price} ${currency}` : 'Agotado'}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </main>
  );
}
