import Image from 'next/image';
import { PRODUCT } from '@/lib/stripe';
import StickyBuyBar from '@/components/StickyBuyBar';
import BuyNow from '@/components/BuyNow';
import EmailCapture from '@/components/EmailCapture';
import { CheckCircle2, ShieldCheck, Truck, Clock, Star } from 'lucide-react';

const avatars = [
  'https://images.pexels.com/photos/31578023/pexels-photo-31578023.jpeg?auto=compress&cs=tinysrgb&w=80',
  'https://images.pexels.com/photos/1387432/pexels-photo-1387432.jpeg?auto=compress&cs=tinysrgb&w=80',
  'https://images.pexels.com/photos/17277431/pexels-photo-17277431.jpeg?auto=compress&cs=tinysrgb&w=80',
  'https://images.pexels.com/photos/2505336/pexels-photo-2505336.jpeg?auto=compress&cs=tinysrgb&w=80',
];

const testimonios = [
  {
    name: 'Ana G.', loc: 'Santo Domingo',
    text: '"Me puse el Dot de noche antes de una reunión importante. En la mañana la espinilla estaba casi plana. ¡No lo podía creer! 🙌"',
    avatar: avatars[0],
  },
  {
    name: 'Mariel M.', loc: 'Santiago',
    text: '"Antes me las explotaba y me quedaban marcas oscuras por semanas. Con Dots no las toco y no hay drama. Ojalá lo hubiera conocido antes 💕"',
    avatar: avatars[1],
  },
  {
    name: 'Sofía T.', loc: 'Santiago',
    text: '"Lo uso debajo del maquillaje y casi no se nota. Es mi secreto antes de salir 😂✨ Ya pedí mi segunda caja."',
    avatar: avatars[2],
  },
  {
    name: 'Camila R.', loc: 'Punta Cana',
    text: '"Compré por curiosidad y ya pedí tres cajas. Funciona de verdad. No hay cuento, lo recomiendo a todas mis amigas."',
    avatar: avatars[3],
  },
];

const faqs = [
  {
    q: '¿Cuánto tiempo lo dejo puesto?',
    a: 'Mínimo 6–8 horas. La mayoría lo usa de noche y lo retira al despertar. Cuanto más tiempo, mejor absorción.',
  },
  {
    q: '¿Funciona en espinillas sin punto blanco?',
    a: 'Funciona mejor en espinillas con punto blanco (las que ya salieron a la superficie). En las internas ayuda a proteger y calmar la zona, pero el efecto visible es menor.',
  },
  {
    q: '¿Es seguro para piel sensible?',
    a: 'Sí. El hidrocoloide médico no contiene fragancia, alcohol ni activos agresivos. Si tu piel es muy reactiva, prueba primero en una zona pequeña.',
  },
  {
    q: '¿Cuánto tarda el envío?',
    a: 'En Santo Domingo, Santiago y Punta Cana: 24–72 horas hábiles. Para el resto del país puede variar un poco según el mensajero.',
  },
  {
    q: '¿Puedo usarlo con maquillaje encima?',
    a: 'Sí. Es transparente y delgado. Aplica base suavemente encima. Siempre úsalo sobre piel limpia y seca para que pegue bien.',
  },
  {
    q: '¿Cuánto sale cada parche?',
    a: 'La caja trae 24 parches por RD$595 — eso es menos de RD$25 por parche. Menos que un café para despertar sin espinilla.',
  },
];

export default function Home() {
  return (
    <main className="overflow-x-hidden">

      {/* ── ANNOUNCEMENT BAR ─────────────────────── */}
      <div className="bg-[var(--dots-dark)] text-white text-center text-xs py-2.5 px-4 font-medium tracking-wide">
        🚚 Envío a toda República Dominicana · Entrega en 24–72 horas · Pago 100% seguro
      </div>

      {/* ── HERO ─────────────────────────────────── */}
      <section id="hero" className="relative min-h-[92vh] flex items-center bg-[var(--dots-cream)] px-5 py-16 md:py-0 overflow-hidden">

        <div aria-hidden className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[var(--dots-blue)]/10 blur-[120px] pointer-events-none" />
        <div aria-hidden className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-[var(--dots-purple)]/10 blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* LEFT — copy */}
          <div className="order-2 md:order-1 flex flex-col gap-6">

            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--dots-blue)]/10 border border-[var(--dots-blue)]/20 px-4 py-1.5 text-xs font-semibold text-[var(--dots-blue)]">
              🇩🇴 El parche anti-espinillas #1 en RD
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-[var(--dots-dark)]">
              Pega el parche.<br />
              Duerme.<br />
              <span className="text-[var(--dots-blue)]">Despierta sin espinilla.</span>
            </h1>

            <p className="text-lg text-neutral-500 leading-relaxed max-w-md">
              El hidrocoloide médico que absorbe tu espinilla mientras duermes.
              Sin explotarla. Sin cicatrices. <strong className="text-[var(--dots-dark)]">Resultado visible en 1 noche.</strong>
            </p>

            {/* Rating + social proof */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-sm font-bold text-[var(--dots-dark)]">4.9</span>
                <span className="text-sm text-neutral-400">· +500 reseñas verificadas</span>
              </div>
            </div>

            <div className="flex -space-x-2.5 items-center">
              {avatars.map((src, i) => (
                <Image key={i} src={src} alt="" width={36} height={36}
                  className="h-9 w-9 rounded-full ring-2 ring-[var(--dots-cream)] object-cover" />
              ))}
              <span className="ml-4 text-sm text-neutral-500">+500 chicas satisfechas este mes</span>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[var(--dots-dark)]">{PRODUCT.priceLabel}</span>
                <span className="text-sm text-neutral-400 line-through">RD$850</span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">-30%</span>
              </div>
              <p className="text-xs text-neutral-400">24 parches · Solo RD$24 por parche · Menos que un café ☕</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <BuyNow
                label={`Quiero mis Dots — ${PRODUCT.priceLabel} →`}
                className="flex-1 sm:flex-none rounded-full bg-[var(--dots-dark)] text-white px-8 py-4 text-base font-bold hover:bg-[var(--dots-blue)] transition-colors shadow-lg shadow-black/10 inline-flex items-center justify-center gap-2 disabled:opacity-60"
              />
              <a href="https://wa.me/18498480190?text=Hola%20quiero%20info%20sobre%20Dots"
                target="_blank" rel="noopener noreferrer"
                className="rounded-full border-2 border-black/10 text-[var(--dots-dark)] px-7 py-4 text-base font-semibold hover:border-[var(--dots-blue)]/40 hover:text-[var(--dots-blue)] transition text-center whitespace-nowrap">
                Tengo una pregunta
              </a>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, text: 'Hidrocoloide médico' },
                { icon: Truck, text: 'Envío discreto' },
                { icon: Clock, text: 'Entrega 24–72 h' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-white border border-black/6 rounded-full px-3 py-1.5 font-medium">
                  <Icon className="h-3.5 w-3.5 text-[var(--dots-blue)]" /> {text}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — product image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="relative w-72 md:w-80 aspect-[3/4] rounded-[2rem] bg-gradient-to-br from-[var(--dots-blue)]/15 via-white to-[var(--dots-purple)]/15 border border-white shadow-2xl overflow-hidden">
                <Image src="/herodots.png" alt="Dots — Parches anti-espinillas" fill
                  className="object-contain p-8" priority />
              </div>

              <div className="absolute -left-10 top-1/3 bg-white rounded-2xl shadow-xl border border-black/5 px-4 py-3 text-center min-w-[110px]">
                <p className="text-2xl font-extrabold text-[var(--dots-blue)]">8h</p>
                <p className="text-xs text-neutral-400 font-medium">de absorción</p>
              </div>

              <div className="absolute -right-8 bottom-1/3 bg-white rounded-2xl shadow-xl border border-black/5 px-4 py-3 text-center min-w-[120px]">
                <p className="text-2xl font-extrabold text-[var(--dots-purple)]">24</p>
                <p className="text-xs text-neutral-400 font-medium">parches por caja</p>
              </div>

              <div className="absolute -top-4 right-4 bg-[var(--dots-blue)] text-white text-xs font-bold rounded-full px-4 py-2 shadow-lg">
                {PRODUCT.priceLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────── */}
      <div className="bg-[var(--dots-dark)] text-white py-4 overflow-hidden">
        <div className="flex items-center gap-10 animate-[marquee_25s_linear_infinite] whitespace-nowrap w-max px-6">
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-10">
              {[
                '⭐ 4.9 / 5 · +500 reseñas',
                '💊 Hidrocoloide médico certificado',
                '✨ Resultado visible en 1 noche',
                '🇩🇴 Envío a todo RD en 24–72 h',
                '💰 Solo RD$24 por parche',
                '🚫 Sin fragancia · Sin alcohol',
              ].map(item => (
                <span key={item} className="text-sm font-medium opacity-80 flex-shrink-0">{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEMA ─────────────────────────────── */}
      <section className="bg-[var(--dots-dark)] text-white py-20 px-5">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--dots-blue)] font-semibold mb-4">¿Te suena familiar?</p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            La espinilla del peor día posible.
          </h2>
          <p className="text-neutral-400 text-lg max-w-lg mx-auto mb-12">
            La explotaste. La tocaste. Quedó peor. Y encima, te quedó la marca.<br />
            Ya sabemos. Por eso existe Dots.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              { emoji: '😤', title: 'La explotaste', desc: 'Sabías que no debías. Pero lo hiciste igual. Y quedó el doble de inflamada.' },
              { emoji: '🤦‍♀️', title: 'No podías parar de tocarla', desc: 'Sin querer la tocaste diez veces. El calor de los dedos empeora todo.' },
              { emoji: '😢', title: 'Quedó la marca oscura', desc: 'La espinilla se fue pero dejó su "souvenir" por semanas. A veces meses.' },
            ].map(c => (
              <div key={c.title} className="rounded-2xl border border-white/8 bg-white/5 p-6">
                <div className="text-3xl mb-3">{c.emoji}</div>
                <h3 className="font-bold text-white mb-1">{c.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ───────────────────────────── */}
      <section id="beneficios" className="py-20 px-5 bg-[var(--dots-cream)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dots-blue)] font-semibold mb-3">Por qué funciona de verdad</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">La ciencia es simple.</h2>
            <p className="text-neutral-500 mt-3 max-w-md mx-auto">El hidrocoloide médico crea el ambiente perfecto para que la espinilla sane — sin que la toques.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { n: '01', title: 'Crea una barrera protectora', desc: 'Evita que la toques, frotas o contamines. Ese contacto constante es lo que inflama y deja marca.', color: 'var(--dots-blue)' },
              { n: '02', title: 'Absorbe lo que hay dentro', desc: 'El hidrocoloide médico succiona las impurezas. Al retirarlo verás el parche blanco — eso es que funcionó.', color: 'var(--dots-purple)' },
              { n: '03', title: 'Invisible bajo el maquillaje', desc: 'Transparente y ultra-delgado. Úsalo de día sin que nadie lo note. Ideal para citas, trabajo o fotos.', color: 'var(--dots-peach)' },
              { n: '04', title: 'Reduce el riesgo de marcas oscuras', desc: 'Al no manipular la espinilla, evitas la hiperpigmentación post-inflamatoria. Menos drama, menos cicatrices.', color: 'var(--dots-blue)' },
            ].map(b => (
              <div key={b.n} className="group flex gap-5 rounded-2xl border border-black/6 bg-white p-6 hover:shadow-lg hover:-translate-y-0.5 transition">
                <div className="shrink-0 text-sm font-extrabold opacity-20 group-hover:opacity-70 transition mt-1" style={{ color: b.color }}>
                  {b.n}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--dots-dark)] text-lg mb-1">{b.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────── */}
      <section id="como-funciona" className="py-20 px-5 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dots-blue)] font-semibold mb-3">Tan simple como esto</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">3 pasos.<br />Una noche.<br />Otra piel.</h2>
          </div>

          <div className="space-y-4">
            {[
              { n: '1', title: 'Lávate la cara y sécala bien', desc: 'Piel limpia y completamente seca. Sin cremas ni aceites encima — el parche no pegará si hay producto.', color: 'var(--dots-blue)' },
              { n: '2', title: 'Aplica el Dot directo sobre la espinilla', desc: 'Cúbrela completamente. Presiona los bordes suavemente 10 segundos para que selle. Listo.', color: 'var(--dots-purple)' },
              { n: '3', title: 'Duerme. Retíralo en la mañana.', desc: 'Mínimo 6–8 horas. Si lo ves blanco al retirarlo, funcionó. Si hace falta, repite una noche más.', color: 'var(--dots-dark)' },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-5 rounded-2xl p-6 bg-[var(--dots-cream)] border border-black/5">
                <div className="shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-white font-extrabold text-lg" style={{ background: s.color }}>
                  {s.n}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--dots-dark)] text-lg">{s.title}</h3>
                  <p className="text-neutral-500 mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-neutral-400 mt-8">
            Solo uso externo · No usar en heridas abiertas · Suspende si hay irritación · Consulta tu dermatólogo si tienes acné severo
          </p>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────── */}
      <section id="testimonios" className="py-20 px-5 bg-[var(--dots-cream)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dots-blue)] font-semibold mb-3">Resultados reales</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">Ellas lo probaron.<br />Tú decides.</h2>
            <p className="text-neutral-500 mt-3">No es publicidad. Son clientas reales de RD.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonios.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-black/6 p-5 flex flex-col gap-4 hover:shadow-md transition">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[var(--dots-dark)] text-sm leading-relaxed flex-1">{t.text}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-black/5">
                  <Image src={t.avatar} alt={t.name} width={36} height={36}
                    className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--dots-dark)]">{t.name}</p>
                    <p className="text-xs text-neutral-400">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUÉ INCLUYE ──────────────────────────── */}
      <section className="py-20 px-5 bg-white">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dots-blue)] font-semibold mb-3">Todo en una cajita</p>
            <h2 className="text-4xl font-extrabold mb-2">24 parches.<br />Infinitas noches tranquilas.</h2>
            <p className="text-neutral-500 mb-6">Solo RD$24 por parche. Menos que un café para despertar sin espinilla.</p>
            <ul className="space-y-4">
              {[
                ['24 parches hidrocoloides médicos', 'Para varios brotes o repartirlos en el tiempo'],
                ['2 tamaños en cada caja', 'Chico para espinillas puntuales, mediano para las más grandes'],
                ['Sin fragancia ni alcohol', 'Dermatológicamente suave. Funciona igual de bien.'],
                ['Transparentes al usar', 'Invisibles bajo maquillaje. Sin vergüenza.'],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[var(--dots-blue)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[var(--dots-dark)]">{title}</p>
                    <p className="text-sm text-neutral-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[var(--dots-blue)]/10 to-[var(--dots-purple)]/10 p-8 flex flex-col gap-6 border border-black/5">
            <div className="aspect-square rounded-2xl bg-white/80 flex items-center justify-center overflow-hidden">
              <Image src="/herodots.png" alt="Dots" width={260} height={260} className="object-contain" />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-extrabold text-[var(--dots-dark)]">{PRODUCT.priceLabel}</p>
                <p className="text-sm text-neutral-400 line-through">RD$850</p>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Oferta</span>
              </div>
              <p className="text-xs text-neutral-400">24 parches · Solo RD$24 c/u</p>
            </div>
            <BuyNow
              label={`Comprar ahora — ${PRODUCT.priceLabel}`}
              className="w-full rounded-full bg-[var(--dots-dark)] text-white py-4 font-bold text-sm hover:bg-[var(--dots-blue)] transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
            />
          </div>
        </div>
      </section>

      {/* ── DÓNDE MÁS ENCONTRARLO ────────────────── */}
      <section className="py-14 px-5 bg-[var(--dots-cream)] border-t border-black/5">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-6">También en tiendas físicas</p>
          <div className="inline-flex flex-wrap justify-center gap-3">
            {[
              { name: 'Jumbo', logo: '/jumbologo.webp', url: 'https://www.jumbo.com.do' },
              { name: 'Sienna Beauty Supply', logo: '/SIENNA.png', url: 'https://www.livesienna.com/shop/el-3245-parches-para-espinillas-dots-24und-172814' },
            ].map(r => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center bg-white border border-black/8 rounded-2xl px-8 py-4 hover:shadow-md hover:-translate-y-0.5 transition">
                <Image src={r.logo} alt={r.name} width={120} height={40} className="h-9 w-auto object-contain opacity-70 hover:opacity-100 transition" />
              </a>
            ))}
            <div className="flex items-center justify-center bg-white/60 border border-dashed border-black/12 rounded-2xl px-8 py-4">
              <p className="text-xs text-neutral-400 font-medium">Más tiendas próximamente ✨</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section id="faq" className="py-20 px-5 bg-white">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dots-blue)] font-semibold mb-3">Preguntas frecuentes</p>
            <h2 className="text-4xl font-extrabold">¿Tienes dudas?<br />Aquí las resolvemos.</h2>
          </div>
          <div className="space-y-2">
            {faqs.map(item => (
              <details key={item.q} className="group rounded-2xl border border-black/6 bg-[var(--dots-cream)]">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-[var(--dots-dark)]">
                  {item.q}
                  <span className="faq-plus shrink-0 h-6 w-6 rounded-full bg-black/5 flex items-center justify-center text-sm">+</span>
                  <span className="faq-minus shrink-0 h-6 w-6 rounded-full bg-[var(--dots-blue)]/10 text-[var(--dots-blue)] flex items-center justify-center text-sm font-bold">−</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-neutral-500 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ────────────────────────── */}
      <section className="py-20 px-5 bg-[var(--dots-cream)] border-t border-black/5">
        <div className="mx-auto max-w-lg text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--dots-purple)]/10 border border-[var(--dots-purple)]/20 px-4 py-1.5 text-xs font-semibold text-[var(--dots-purple)] mb-5">
            💌 Club Dots — Solo para miembras
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Tips de skincare gratis.<br />Directo a tu correo.
          </h2>
          <p className="text-neutral-500 mb-8 text-sm leading-relaxed">
            Únete al club y recibe rutinas para piel con espinillas, alertas de restock y ofertas exclusivas que no publicamos en redes.
          </p>
          <EmailCapture />
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────── */}
      <section id="comprar" className="relative py-24 px-5 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1a1a2e 50%, #16213e 100%)' }}>

        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--dots-blue)]/15 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[var(--dots-purple)]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-2xl text-center text-white space-y-7">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--dots-blue)] font-semibold">Listo para ordenar</p>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Un Dot esta noche.<br />
            <span className="text-[var(--dots-blue)]">Otra piel mañana.</span>
          </h2>

          <div>
            <p className="text-3xl font-extrabold text-white">{PRODUCT.priceLabel}</p>
            <p className="text-neutral-400 text-sm mt-1">24 parches · Solo RD$24 por parche · Envío a todo RD</p>
          </div>

          <BuyNow
            label={`Quiero mis Dots — ${PRODUCT.priceLabel} →`}
            className="rounded-full bg-[var(--dots-blue)] text-white px-10 py-5 text-lg font-extrabold hover:bg-white hover:text-[var(--dots-blue)] transition shadow-2xl shadow-[var(--dots-blue)]/30 inline-flex items-center justify-center gap-2 disabled:opacity-60"
          />

          <div className="flex flex-wrap justify-center gap-5 text-sm text-neutral-400">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--dots-blue)]" /> Pago 100% seguro</span>
            <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-[var(--dots-blue)]" /> Envío discreto</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-[var(--dots-blue)]" /> 24–72 h en RD</span>
          </div>

          <p className="text-neutral-500 text-sm pt-2">
            ¿Dudas antes de comprar?{' '}
            <a href="https://wa.me/18498480190?text=Hola%20quiero%20info%20sobre%20Dots"
              target="_blank" rel="noopener noreferrer"
              className="text-white underline underline-offset-4 hover:text-[var(--dots-blue)] transition">
              Escríbenos por WhatsApp →
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="bg-[var(--dots-dark)] text-neutral-500 text-xs py-8 px-5">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm mb-0.5">Dots</p>
            <p>© {new Date().getFullYear()} Dots. Todos los derechos reservados. República Dominicana.</p>
          </div>
          <div className="flex flex-wrap gap-5">
            {[
              ['Términos', '/terminos'],
              ['Privacidad', '/privacidad'],
              ['hola@dots.com.do', 'mailto:hola@dots.com.do'],
              ['WhatsApp', 'https://wa.me/18498480190'],
            ].map(([label, href]) => (
              <a key={label} href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hover:text-white transition">
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <StickyBuyBar price={PRODUCT.priceLabel} />
    </main>
  );
}
