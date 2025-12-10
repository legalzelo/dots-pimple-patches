// app/privacidad/page.tsx
export const metadata = {
  title: 'Política de privacidad — Dots',
  description:
    'Política de privacidad de Dots sobre el uso, almacenamiento y protección de tus datos personales.',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="h-1 w-full bg-gradient-to-r from-[#4EACD8] via-[#B283AF] to-[#E4B484]" />

      <section className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
          Política de privacidad
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          Última actualización: {new Date().toLocaleDateString('es-DO')}
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-800">
          <p>
            En <strong>Dots</strong> respetamos tu privacidad y estamos comprometidos con proteger
            tus datos personales. En esta política te explicamos qué información recopilamos, cómo
            la usamos y qué opciones tienes.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              1. Información que recopilamos
            </h2>
            <p className="mt-2">
              Podemos recopilar datos como tu nombre, correo electrónico, teléfono, dirección de
              envío, información de pago (a través de proveedores externos) y detalles sobre los
              pedidos que realizas en nuestra tienda.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              2. Cómo usamos tu información
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Procesar y entregar tus pedidos.</li>
              <li>Gestionar pagos y facturación.</li>
              <li>Responder consultas o solicitudes de soporte.</li>
              <li>Enviar comunicaciones relacionadas con tu compra.</li>
              <li>
                Con tu consentimiento, enviarte novedades, promociones y contenido relacionado con
                Dots.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              3. Bases legales para el tratamiento
            </h2>
            <p className="mt-2">
              Tratamos tus datos amparados en el cumplimiento de un contrato (cuando compras),
              cumplimiento de obligaciones legales y, en ciertos casos, tu consentimiento expreso
              para recibir comunicaciones comerciales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              4. Conservación de datos
            </h2>
            <p className="mt-2">
              Conservaremos tu información solo durante el tiempo necesario para cumplir con las
              finalidades descritas en esta política o mientras lo exijan las leyes aplicables
              (fiscales, contables, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              5. Compartir datos con terceros
            </h2>
            <p className="mt-2">
              Podemos compartir ciertos datos con proveedores de servicios que nos ayudan a operar
              la tienda, procesar pagos, realizar envíos o analizar el uso del sitio (por ejemplo,
              pasarelas de pago y empresas de mensajería). Estos terceros solo acceden a la
              información necesaria para prestar sus servicios y están obligados a protegerla.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              6. Cookies y tecnologías similares
            </h2>
            <p className="mt-2">
              Podemos utilizar cookies y herramientas de analítica para entender mejor cómo usas el
              sitio, mejorar la experiencia y medir campañas. Puedes gestionar las cookies desde la
              configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              7. Tus derechos
            </h2>
            <p className="mt-2">
              Dependiendo de la normativa aplicable, puedes tener derecho a acceder, corregir,
              actualizar o solicitar la eliminación de tus datos personales. También puedes oponerte
              al uso de tus datos para ciertos fines.
            </p>
            <p className="mt-2">
              Para ejercer estos derechos, escríbenos a{' '}
              <a href="mailto:hola@dots.com.do" className="underline">
                hola@dots.com.do
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              8. Seguridad de la información
            </h2>
            <p className="mt-2">
              Implementamos medidas razonables para proteger tus datos, pero ningún sistema es 100%
              seguro. Te recomendamos usar contraseñas fuertes y no compartir tus credenciales con
              terceros.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              9. Cambios en esta política
            </h2>
            <p className="mt-2">
              Podemos actualizar esta política de privacidad ocasionalmente. La versión vigente
              será siempre la publicada en esta página.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">10. Contacto</h2>
            <p className="mt-2">
              Si tienes preguntas sobre cómo tratamos tu información personal, puedes escribirnos a{' '}
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
