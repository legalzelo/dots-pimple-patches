import Image from 'next/image';
import Section from '@/components/ui/Section';
import { getSingleProduct } from '@/lib/shopify';
import { buyNowAction } from './actions';
import {
  HandHeart,
  ShieldCheck,
  Eye,
  Sparkles,
  CheckCircle2,
  Info,
} from 'lucide-react';

const buyers: string[] = [
  "https://images.pexels.com/photos/31578023/pexels-photo-31578023.jpeg?cs=srgb&dl=pexels-estudio37rd-31578023.jpg&fm=jpg",
  "https://images.pexels.com/photos/1387432/pexels-photo-1387432.jpeg?cs=srgb&dl=pexels-mufasa-1387432.jpg&fm=jpg",
  "https://images.pexels.com/photos/17277431/pexels-photo-17277431.jpeg?cs=srgb&dl=pexels-krivitskiy-17277431.jpg&fm=jpg",
  "https://images.pexels.com/photos/2505336/pexels-photo-2505336.jpeg?cs=srgb&dl=pexels-bruthethe-2505336.jpg&fm=jpg",
];

export const revalidate = 0;

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

  // Ajusta esto a tu realidad
  const productPriceLabel = 'RD$ 595';
  const productPackLabel = '24 parches hidrocoloides';

  // Retailers (edita a tus logos reales o usa “Muy pronto”)
const retailers: { name: string; url?: string; logo?: string }[] = [
  {
    name: 'Jumbo',
    url: 'https://www.jumbo.com.do', // si tienes la URL exacta del producto, ponla aquí
    logo: '/jumbologo.webp',
  },
  {
    name: 'Sienna Beauty Supply',
    url: 'https://www.livesienna.com/shop/el-3245-parches-para-espinillas-dots-24und-172814?search=dots#attr=', // o la web que quieras
    logo: '/SIENNA.png', // ajusta al nombre real del archivo en /public
  },
  {
    name: 'Más puntos de venta pronto',
    url: '#',
    logo: '',
  },
];

  // Textos estilo “antes/después” usados como labels en testimonios
  const beforeAfterLabels: { caption: string }[] = [
    { caption: 'Noche con Dots' },
    { caption: '8 horas de uso' },
    { caption: 'Resultados reales' },
  ];

  // Testimonios orientados a acné / piel
const testimonios: {
  name: string;
  country: string;
  avatar?: string;
  quote: string;
  video: string;
  poster?: string;
}[] = [
  {
    name: 'Ana G.',
    country: 'Santo Domingo, RD',
    avatar: '/testimonials/ana.jpg',
    quote:
      '“Tenía una espinilla antes de una reunión importante. Me puse un Dot de noche y al otro día amaneció mucho más plano.”',
    video: '/testimonials/ana.mp4',
    poster: '/testimonials/ana.jpg',
  },
  {
    name: 'Mariel M.',
    country: 'Santiago, RD',
    avatar: '/testimonials/mariel.jpg',
    quote:
      '“Antes siempre me explotaba las espinillas. Ahora me pongo un Dot y no me lo toco, así no me quedan marcas.”',
    video: '/testimonials/mariel.mp4',
    poster: '/testimonials/mariel.jpg',
  },
  {
    name: 'Sofía T.',
    country: 'Santiago, RD',
    avatar: '/testimonials/sofia.jpg',
    quote:
      '“Me gusta porque casi no se nota y puedo usarlo debajo del maquillaje cuando tengo algo puntual.”',
    video: '/testimonials/sofia.mp4',
    poster: '/testimonials/sofia.jpg',
  },
];


  // Chips “stickers” y avatars para social proof
  const chips = ['Invisible ✨', 'Barrera higiénica 🧴', 'Uso día/noche 🌙'];

  // Beneficios con íconos lucide
  const benefits = [
    { icon: HandHeart, t: 'Aísla la zona', d: 'Evita fricción, suciedad y que te la toques.' },
    { icon: ShieldCheck, t: 'Absorbe impurezas', d: 'Hidrocoloide que ayuda a aplacar en horas.' },
    { icon: Eye, t: 'Invisible y cómodo', d: 'Perfil delgado, incluso debajo del maquillaje.' },
  ] as const;

  // Antes / Después (ajusta las rutas de imágenes a las reales)
  const beforeAfterPhotos = [
    {
      id: 1,
      label: 'Espinilla puntual',
      beforeLabel: 'Antes de dormir',
      afterLabel: 'Después de 8 h',
      beforeImg: '/before-after/1-before.jpg',
      afterImg: '/before-after/1-after.jpg',
    },
    {
      id: 2,
      label: 'Brotes por estrés',
      beforeLabel: 'Día 1',
      afterLabel: 'Día 3 usando Dots',
      beforeImg: '/before-after/2-before.jpg',
      afterImg: '/before-after/2-after.jpg',
    },
  ];

  const faqs = [
    {
      q: '¿Puedo dormir con el parche puesto?',
      a: 'Sí. De hecho, funciona mejor si lo dejas mínimo 6–8 horas o toda la noche sobre la espinilla.',
    },
    {
      q: '¿Funciona en espinillas internas (sin punto blanco)?',
      a: 'Dots está pensado principalmente para espinillas con punto blanco. En espinillas internas puede ayudar a proteger la zona, pero el resultado puede ser más lento o menos visible.',
    },
    {
      q: '¿Es seguro para piel sensible?',
      a: 'Usamos material hidrocoloide sin fragancia. Aun así, si tu piel es muy reactiva o estás en tratamiento dermatológico, consulta a tu dermatólogo antes de usarlo y suspende si notas irritación.',
    },
    {
      q: '¿Desde qué edad se puede usar?',
      a: 'Recomendado a partir de los 12 años con supervisión de un adulto. En menores, siempre consulta primero con un profesional de la salud.',
    },
    {
      q: '¿Puedo usarlos todos los días?',
      a: 'Puedes usar Dots siempre que tengas espinillas puntuales. Evita colocarlo sobre piel rota o heridas abiertas.',
    },
    {
      q: '¿Cuánto tarda el envío?',
      a: 'En Santo Domingo, Santiago y Punta Cana normalmente entre 24–72 horas laborales. Para el resto del país, el tiempo puede variar según el mensajero.',
    },
  ];

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

            <p className="mt-2 text-sm text-neutral-700">
              {productPackLabel} · {productPriceLabel}
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
        alt={`Clienta feliz ${i + 1}`}
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
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-4">
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

              {/* Badges de confianza */}
              <div className="flex flex-wrap gap-3 text-xs text-neutral-600">
                <div className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-[var(--dots-blue)]" />
                  Pago seguro
                </div>
                <div className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-[var(--dots-blue)]" />
                  Envío discreto
                </div>
                <div className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-[var(--dots-blue)]" />
                  Hecho para piel sensible*
                </div>
              </div>
            </div>
          </div>

          {/* Video derecha con marco de color */}
{/* Imagen del producto derecha */}
<div>
  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lg ring-2 ring-[var(--dots-blue)]/20 bg-[var(--dots-blue)]/10">
    <Image
      src="/herodots.png"
      alt="Empaque de Dots parches para espinillas"
      fill
      className="object-contain md:object-cover"
      priority
    />
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
            {
              n: '1',
              t: 'Limpia y seca',
              d: 'Asegúrate de que la piel esté limpia y completamente seca.',
            },
            {
              n: '2',
              t: 'Aplica el parche',
              d: 'Colócalo cubriendo por completo la espinilla (ideal con punto blanco).',
            },
            {
              n: '3',
              t: 'Déjalo actuar',
              d: 'Mínimo 6–8 h o toda la noche. Retira y, si hace falta, repite.',
            },
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
          Solo uso externo. No usar en heridas abiertas. Suspende si hay irritación. No usar si
          eres alérgico a pectina o caucho.
        </p>
      </Section>

      {/* DETALLES DEL PRODUCTO + PARA QUIÉN ES */}
      <Section
        id="detalles"
        eyebrow="Detalles del producto"
        title="Un parche pequeño, un cambio grande"
        subtitle="Pensado para espinillas puntuales, brotes por estrés y emergencias antes de una salida importante."
        className="bg-white/70 backdrop-blur rounded-3xl"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3 text-sm">
            <h3 className="font-semibold text-[var(--dots-black)] mb-2">
              ¿Qué trae cada cajita?
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--dots-blue)]" />
                <span>{productPackLabel}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--dots-blue)]" />
                <span>2 tamaños de parches para diferentes tipos de espinillas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--dots-blue)]" />
                <span>Material hidrocoloide sin fragancia, suave con tu piel.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--dots-blue)]" />
                <span>Manual rápido de uso y tips para aprovecharlo al máximo.</span>
              </li>
            </ul>
            <p className="mt-3 text-sm font-medium text-[var(--dots-black)]">
              Precio: {productPriceLabel}{' '}
            </p>
          </div>

          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-[var(--dots-black)] mb-2">Ideal para:</h3>
              <ul className="space-y-1.5">
                <li>Espinillas puntuales en cara y mentón.</li>
                <li>Brotes por estrés o cambios hormonales.</li>
                <li>Personas que se tocan mucho la cara.</li>
                <li>Uso nocturno antes de reuniones, citas o eventos.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--dots-black)] mb-2">
                No es para ti si:
              </h3>
              <ul className="space-y-1.5 text-neutral-700">
                <li>Tienes acné severo o quístico (consulta a tu dermatólogo).</li>
                <li>La piel está rota o con heridas abiertas.</li>
                <li>Eres alérgica a pectina o materiales similares al caucho.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ANTES / DESPUÉS */}
      <Section
        id="antes-despues"
        eyebrow="Antes / Después"
        title="Resultados que se notan al despertar"
        subtitle="Fotos reales usando Dots en espinillas puntuales. Los resultados pueden variar según tu piel."
        className="rounded-3xl"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {beforeAfterPhotos.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border bg-white/80 p-4 shadow-sm"
              style={{ borderColor: 'rgba(12,12,12,0.08)' }}
            >
              <p className="mb-3 text-sm font-semibold text-[var(--dots-black)]">
                {item.label}
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="mb-1 text-[10px] uppercase tracking-wide text-neutral-500">
                    {item.beforeLabel}
                  </div>
                  <div className="relative w-full overflow-hidden rounded-xl bg-neutral-50 aspect-square">
                    <Image
                      src={item.beforeImg}
                      alt={`${item.label} antes`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] uppercase tracking-wide text-neutral-500">
                    {item.afterLabel}
                  </div>
                  <div className="relative w-full overflow-hidden rounded-xl bg-neutral-50 aspect-square">
                    <Image
                      src={item.afterImg}
                      alt={`${item.label} después`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs opacity-60">
          Resultados ilustrativos. Cada piel es diferente; combina Dots con una rutina adecuada y
          consulta a tu dermatólogo si tienes dudas.
        </p>
      </Section>

      {/* INGREDIENTES con tarjetas color-acento */}
      <Section
        id="ingredientes"
        eyebrow="Ingredientes"
        title="Lo que hace la diferencia"
        subtitle="Fórmula efectiva y amable con tu piel."
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
        <p className="text-xs opacity-60 mt-4">Consulta el INCI exacto en el empaque.</p>
      </Section>

      {/* ACNÉ 101 / EDUCATIVO */}
      <Section
        id="acne101"
        eyebrow="Acné 101"
        title="Qué pasa en tu piel y cómo ayuda Dots"
        subtitle="No prometemos milagros, pero sí acompañarte mejor con información clara y productos útiles."
        className="rounded-3xl"
      >
        <div className="grid gap-6 md:grid-cols-3 text-sm">
          <div>
            <h3 className="mb-2 font-semibold text-[var(--dots-black)]">
              1. El poro se tapa
            </h3>
            <p className="text-neutral-700">
              Entre grasa, células muertas y maquillaje, el poro se puede tapar. Eso crea el
              ambiente perfecto para que aparezca la espinilla.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-[var(--dots-black)]">
              2. Tocas, rascas, inflamas
            </h3>
            <p className="text-neutral-700">
              Cuando explotas o rascas, sueles empeorar la inflamación, abres la piel y aumentas el
              riesgo de manchas y marcas.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-[var(--dots-black)]">
              3. El rol de un parche hidrocoloide
            </h3>
            <p className="text-neutral-700">
              Dots cubre la espinilla, ayuda a absorber impurezas, reduce la fricción y te recuerda
              que no debes tocarte la cara. Menos manipulación, menos drama.
            </p>
          </div>
        </div>
        <p className="mt-4 flex items-start gap-1 text-xs text-neutral-500">
          <Info className="mt-[2px] h-3 w-3" />
          Dots no sustituye un tratamiento médico. Si tu acné es severo o te causa dolor, busca
          atención profesional.
        </p>
      </Section>

      {/* DÓNDE COMPRAR con micro-interacción y acentos */}
      <Section
        id="donde-comprar"
        eyebrow="Dónde comprar"
        title="Consigue tus Dots aquí"
        subtitle="Pídelo online o encuéntralo muy pronto en puntos de venta físicos."
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
                <span className="text-sm font-medium text-center">{r.name}</span>
              )}
            </a>
          ))}
        </div>
        <p className="mt-2 text-xs text-center opacity-60">
          Pide tu Dot en tu tienda fav ✨
        </p>
        <p className="mt-4 text-xs text-neutral-600">
          ¿Eres tienda y quieres vender Dots? Escríbenos a{' '}
          <a href="mailto:hola@dots.com.do" className="underline">
            hola@dots.com.do
          </a>.
        </p>
      </Section>

      {/* TESTIMONIOS usando labels “antes/después” con color de etiqueta */}
      <Section
        id="testimonios"
        eyebrow="Testimonios"
        title="Lo que dicen quienes ya probaron Dots"
        subtitle="Historias reales de personas que cambiaron cómo manejan sus espinillas."
        className="bg-white/70 backdrop-blur rounded-3xl"
      >
        {/* Móvil: carrusel */}
        <div className="md:hidden -mx-6 px-6 overflow-x-auto scroll-smooth snap-x snap-mandatory">
          <div className="flex gap-4 w-max">
            {testimonios.map((t, i) => {
              const label =
                beforeAfterLabels[i % beforeAfterLabels.length]?.caption || t.quote;
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

                  <p className="mt-3 text-sm text-neutral-800">{t.quote}</p>

                  <div
                    className="mt-3 relative aspect-[9/16] w-full overflow-hidden rounded-xl ring-2 bg-neutral-50"
                    style={{
                      borderColor: 'transparent',
                      boxShadow: '0 0 0 1px rgba(12,12,12,0.06) inset',
                    }}
                  >
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      controls
                      playsInline
                      poster={t.poster || '/testimonials/poster.jpg'}
                    >
                      <source src={t.video} type="video/mp4" />
                    </video>
                    <span
                      className={`absolute left-2 bottom-2 rounded-full ${badgeBg} text-white text-xs px-2 py-0.5`}
                    >
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
            const label =
              beforeAfterLabels[i % beforeAfterLabels.length]?.caption || t.quote;
            const badgeBg =
              i % 3 === 0
                ? 'bg-[var(--dots-blue)]'
                : i % 3 === 1
                ? 'bg-[var(--dots-purple)]'
                : 'bg-[var(--dots-peach)]';
            return (
              <article
                key={t.name}
                className="rounded-2xl border bg-white p-5 shadow-sm"
                style={{ borderColor: 'rgba(12,12,12,0.08)' }}
              >
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

                <p className="mt-3 text-sm text-neutral-800">{t.quote}</p>

                <div
                  className="mt-4 relative aspect-[9/16] w-full overflow-hidden rounded-xl ring-2 bg-neutral-50"
                  style={{
                    borderColor: 'transparent',
                    boxShadow: '0 0 0 1px rgba(12,12,12,0.06) inset',
                  }}
                >
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    playsInline
                    poster={t.poster || '/testimonials/poster.jpg'}
                  >
                    <source src={t.video} type="video/mp4" />
                  </video>
                  <span
                    className={`absolute left-2 bottom-2 rounded-full ${badgeBg} text-white text-xs px-2 py-0.5`}
                  >
                    {label}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        eyebrow="FAQ"
        title="Preguntas frecuentes"
        subtitle="Resolvemos las dudas más comunes antes de que compres."
        className="rounded-3xl bg-white/80 backdrop-blur"
      >
        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border bg-white px-4 py-3 text-sm transition"
              style={{ borderColor: 'rgba(12,12,12,0.08)' }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[var(--dots-black)]">
                <span>{item.q}</span>
                <span className="text-xs text-neutral-500 group-open:hidden">+</span>
                <span className="hidden text-xs text-neutral-500 group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-neutral-700">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* SOBRE DOTS */}
      <Section
        id="sobre-dots"
        eyebrow="Sobre Dots"
        title="Una marca pequeña, pero obsesionada con tu piel"
        subtitle="Nacimos en el Caribe para acompañarte con productos simples, honestos y efectivos."
        className="rounded-3xl"
      >
        <div className="grid gap-6 text-sm md:grid-cols-2">
          <p className="text-neutral-700">
            Dots surge de algo muy simple: el estrés de tener una espinilla justo el día menos
            indicado. No prometemos piel perfecta de la noche a la mañana, pero sí darte una
            herramienta que te ayude a manejar mejor esos brotes puntuales.
          </p>
          <p className="text-neutral-700">
            Diseñamos el producto pensando en el clima, la humedad y la realidad de nuestra región.
            Queremos que puedas usarlo sin vergüenza, con o sin maquillaje, y que sientas que tu
            piel está un poquito más protegida cada vez que te pones un Dot.
          </p>
        </div>
      </Section>

      {/* ENVÍOS Y PAGOS + WHATSAPP */}
      <Section
        id="servicioalcliente"
        eyebrow="Servicio al Cliente"
        title="Dots cada vez más cerca de ti."
        subtitle="Necesitas decirnos algo? Simple, solo escríbenos."
        className="rounded-3xl bg-white/80 backdrop-blur"
      >
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[var(--dots-blue)]/25 bg-[var(--dots-blue)]/5 p-4 text-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-[var(--dots-black)]">¿Tienes dudas antes de comprar?</p>
            <p className="text-neutral-700 text-xs md:text-sm">
              Escríbenos por WhatsApp y te ayudamos a decidir si Dots es para ti.
            </p>
          </div>
          <a
            href="https://wa.me/18498480190?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20Dots"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium text-white shadow-sm md:text-sm"
            style={{
              background:
                'linear-gradient(90deg, var(--dots-blue), var(--dots-purple))',
            }}
          >
            Abrir WhatsApp
          </a>
        </div>
      </Section>

    
      {/* FOOTER */}
      <footer className="mt-8 border-t border-black/5 bg-white/70 text-xs text-neutral-600">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-[var(--dots-black)]">Dots</p>
            <p className="text-[11px]">
              © {new Date().getFullYear()} Dots. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#sobre-dots" className="hover:underline">
              Sobre nosotros
            </a>
            <a href="/terminos" className="hover:underline">
              Términos y condiciones
            </a>
            <a href="/privacidad" className="hover:underline">
              Política de privacidad
            </a>
            <a href="mailto:hola@dots.com.do" className="hover:underline">
              hola@dots.com.do
            </a>
          </div>
        </div>
      </footer>

      {/* BOTTOM BAR DE COLOR */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--dots-blue)] via-[var(--dots-purple)] to-[var(--dots-peach)]" />
    </main>
  );
}
