import { Resend } from 'resend';
import Stripe from 'stripe';

interface OrderConfirmationProps {
  to: string;
  name: string;
  phone: string;
  amount: number;
  address: Stripe.Address | null | undefined;
  sessionId: string;
}

export async function sendOrderConfirmation({
  to,
  name,
  phone,
  amount,
  address,
  sessionId,
}: OrderConfirmationProps) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const addressLine = address
    ? [address.line1, address.city, address.state].filter(Boolean).join(', ')
    : 'No especificada';

  await resend.emails.send({
    from: 'Dots <pedidos@dots.com.do>',
    to,
    subject: '¡Tu pedido de Dots está confirmado! 🎉',
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4EACD8,#B283AF);padding:32px 24px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">Dots</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Parches Anti-espinillas</p>
    </div>

    <!-- Body -->
    <div style="padding:32px 24px;">
      <h2 style="margin:0 0 8px;font-size:20px;color:#0C0C0C;">¡Pedido confirmado, ${name}! 🎉</h2>
      <p style="margin:0 0 24px;color:#555;font-size:15px;">
        Recibimos tu pago y estamos preparando tu pedido. Te llegará en <strong>24–72 horas laborales</strong>.
      </p>

      <!-- Order details -->
      <div style="background:#f5f9fc;border-radius:12px;padding:20px;margin-bottom:24px;">
        <h3 style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#888;">Resumen del pedido</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:6px 0;color:#555;">Producto</td>
            <td style="padding:6px 0;text-align:right;color:#0C0C0C;font-weight:600;">Dots — 24 parches</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#555;">Total pagado</td>
            <td style="padding:6px 0;text-align:right;color:#4EACD8;font-weight:700;font-size:16px;">RD$${amount.toLocaleString('es-DO')}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#555;">Dirección de envío</td>
            <td style="padding:6px 0;text-align:right;color:#0C0C0C;">${addressLine}</td>
          </tr>
          ${phone ? `<tr><td style="padding:6px 0;color:#555;">Teléfono</td><td style="padding:6px 0;text-align:right;color:#0C0C0C;">${phone}</td></tr>` : ''}
        </table>
      </div>

      <!-- How to use tip -->
      <div style="border-left:3px solid #4EACD8;padding-left:16px;margin-bottom:24px;">
        <p style="margin:0;font-size:14px;color:#555;">
          <strong style="color:#0C0C0C;">Tip rápido:</strong> Aplica tu Dot sobre la espinilla limpia y seca antes de dormir.
          Déjalo actuar 6–8 horas. ¡Los resultados hablan solos! ✨
        </p>
      </div>

      <!-- CTA -->
      <p style="margin:0 0 8px;font-size:14px;color:#555;">¿Tienes alguna pregunta sobre tu pedido?</p>
      <a href="https://wa.me/18498480190"
         style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">
        Escríbenos por WhatsApp
      </a>
    </div>

    <!-- Footer -->
    <div style="padding:16px 24px;border-top:1px solid #eee;text-align:center;">
      <p style="margin:0;font-size:12px;color:#aaa;">
        © ${new Date().getFullYear()} Dots · República Dominicana ·
        <a href="https://dots.com.do/privacidad" style="color:#aaa;">Privacidad</a>
      </p>
      <p style="margin:4px 0 0;font-size:11px;color:#ccc;">Ref: ${sessionId.slice(-8).toUpperCase()}</p>
    </div>

  </div>
</body>
</html>
    `.trim(),
  });
}
