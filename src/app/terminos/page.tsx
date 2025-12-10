// app/terminos/page.tsx
export const metadata = {
  title: 'Términos y condiciones — Dots',
  description:
    'Términos y condiciones de uso de la tienda en línea de Dots para la compra de parches para espinillas.',
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="h-1 w-full bg-gradient-to-r from-[#4EACD8] via-[#B283AF] to-[#E4B484]" />

      <section className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
          Términos y condiciones
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          Última actualización: {new Date().toLocaleDateString('es-DO')}
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-800">
          <p>
            Bienvenido/a a <strong>Dots</strong>. Estos términos y condiciones regulan el uso de
            nuestra tienda en línea y la compra de nuestros productos (los &quot;Servicios&quot;).
            Al realizar una compra o navegar en nuestro sitio web, aceptas estos términos.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              1. Información general
            </h2>
            <p className="mt-2">
              Dots es una marca dedicada a la venta de parches para espinillas y otros productos
              relacionados con el cuidado de la piel. Los precios, promociones y disponibilidad de
              productos pueden cambiar sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              2. Uso del sitio
            </h2>
            <p className="mt-2">
              Te comprometes a utilizar este sitio solo para fines legítimos, realizar pedidos
              válidos y no intentar vulnerar la seguridad o el funcionamiento de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              3. Compras y pagos
            </h2>
            <p className="mt-2">
              Al realizar una compra, confirmas que la información de pago proporcionada es
              correcta y que estás autorizado/a para usar el método de pago seleccionado. Todos los
              pagos se procesan a través de proveedores de pago seguros de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              4. Envíos y entregas
            </h2>
            <p className="mt-2">
              Los tiempos de envío son estimados y pueden variar según la ubicación y el operador
              logístico. Hacemos esfuerzos razonables para cumplir con los plazos, pero no somos
              responsables por retrasos causados por terceros o eventos fuera de nuestro control.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              5. Cambios, devoluciones y reembolsos
            </h2>
            <p className="mt-2">
              Por razones de higiene, los productos abiertos o usados no pueden devolverse. Si tu
              pedido llegó defectuoso, incompleto o dañado, contáctanos dentro de los primeros 7
              días hábiles desde la recepción al correo{' '}
              <a href="mailto:hola@dots.com.do" className="underline">
                hola@dots.com.do
              </a>{' '}
              para revisar tu caso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              6. Uso de los productos
            </h2>
            <p className="mt-2">
              Nuestros productos son de uso cosmético y no sustituyen la opinión de un
              dermatólogo ni constituyen tratamiento médico. Si presentas irritación, suspende el
              uso y consulta a un profesional de la salud.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              7. Limitación de responsabilidad
            </h2>
            <p className="mt-2">
              En la medida permitida por la ley aplicable, Dots no será responsable por daños
              indirectos, incidentales o consecuentes derivados del uso de este sitio o de los
              productos adquiridos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              8. Modificaciones a estos términos
            </h2>
            <p className="mt-2">
              Podemos actualizar estos términos en cualquier momento. La versión vigente será la
              publicada en esta página. Te recomendamos revisarla periódicamente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">9. Contacto</h2>
            <p className="mt-2">
              Si tienes preguntas sobre estos términos, puedes escribirnos a{' '}
              <a href="mailto:hola@dots.com.do" className="underline">
                hola@dots.com.do
              </a>
              .
            </p>
          </section>
        </div>
      </section>

      <div className="h-1 w-full bg-gradient-to-r from-[#4EACD8] via-[#B283AF] to-[#E4B484]" />
    </main>
  );
}
