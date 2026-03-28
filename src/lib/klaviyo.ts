const BASE = 'https://a.klaviyo.com/api';

function headers() {
  return {
    'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
    'Content-Type': 'application/json',
    'revision': '2024-10-15',
  };
}

/** Agrega un email a una lista de Klaviyo */
export async function subscribeToList(email: string, firstName?: string) {
  const listId = process.env.KLAVIYO_LIST_ID!;

  // 1. Crear o actualizar el perfil
  const profileRes = await fetch(`${BASE}/profiles/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      data: {
        type: 'profile',
        attributes: {
          email,
          ...(firstName ? { first_name: firstName } : {}),
          properties: { source: 'dots_website' },
        },
      },
    }),
  });

  let profileId: string;

  if (profileRes.status === 409) {
    // El perfil ya existe — extraemos el ID del header de conflicto
    const err = await profileRes.json();
    profileId = err.errors?.[0]?.meta?.duplicate_profile_id;
  } else if (profileRes.ok) {
    const data = await profileRes.json();
    profileId = data.data.id;
  } else {
    throw new Error(`Klaviyo profile error: ${profileRes.status}`);
  }

  if (!profileId) throw new Error('No profile ID returned from Klaviyo');

  // 2. Suscribir a la lista
  await fetch(`${BASE}/lists/${listId}/relationships/profiles/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      data: [{ type: 'profile', id: profileId }],
    }),
  });
}

/** Trackea un evento de compra completada */
export async function trackPurchase({
  email,
  name,
  amount,
  orderId,
}: {
  email: string;
  name: string;
  amount: number;
  orderId: string;
}) {
  await fetch(`${BASE}/events/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      data: {
        type: 'event',
        attributes: {
          metric: { data: { type: 'metric', attributes: { name: 'Placed Order' } } },
          profile: { data: { type: 'profile', attributes: { email, first_name: name } } },
          properties: {
            order_id: orderId,
            value: amount,
            currency: 'DOP',
            items: [{ product_name: 'Dots — Parches Anti-espinillas', quantity: 1, price: amount }],
          },
          value: amount,
        },
      },
    }),
  });

  // También agrega a la lista si no estaba
  await subscribeToList(email, name).catch(() => null);
}
