// scripts/shopify-export.js  — Node 18+ (CommonJS)

// 1) Cargar .env.local sin paquetes externos
try {
  const fsSync = require('fs');
  const path = require('path');
  const envFile = path.resolve(process.cwd(), '.env.local');
  if (fsSync.existsSync(envFile)) {
    const lines = fsSync.readFileSync(envFile, 'utf8').split(/\r?\n/);
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const i = line.indexOf('=');
      if (i === -1) continue;
      const key = line.slice(0, i).trim();
      let val = line.slice(i + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  }
} catch { /* ignore */ }

// 2) Vars requeridas (Admin API)
const fs = require('node:fs/promises');
const DOMAIN  = process.env.SHOPIFY_STORE_DOMAIN;          // ej: qrvgfa-is.myshopify.com
const VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2025-10';
const TOKEN   = process.env.SHOPIFY_ADMIN_API_TOKEN;

if (!DOMAIN || !TOKEN) {
  console.error('Faltan variables: SHOPIFY_STORE_DOMAIN o SHOPIFY_ADMIN_API_TOKEN');
  process.exit(1);
}

// 3) Helper para GET con paginado (cursor page_info)
async function getAll(path) {
  let url = new URL(`https://${DOMAIN}/admin/api/${VERSION}/${path}`);
  let out = [];
  /* eslint-disable no-constant-condition */
  while (true) {
    const res = await fetch(url, { headers: { 'X-Shopify-Access-Token': TOKEN } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`);
    const data = await res.json();
    const key = Object.keys(data)[0]; // "orders" | "customers" | "products"
    out = out.concat(data[key]);

    // Link header: <...page_info=XXXX>; rel="next"
    const link = res.headers.get('link') || '';
    const next = link.match(/<([^>]+)>;\s*rel="next"/i);
    if (!next) break;
    url = new URL(next[1]);
  }
  return out;
}

// 4) CSV util
function toCSV(rows, headers) {
  const esc = (v = '') => `"${String(v ?? '').replaceAll('"', '""')}"`;
  const head = headers.map(h => esc(h.label)).join(',');
  const body = rows.map(r => headers.map(h => esc(h.get(r))).join(',')).join('\n');
  return head + '\n' + body + '\n';
}

// 5) Exportadores
async function exportOrders() {
  const q = 'orders.json?status=any&limit=250&fields=id,name,created_at,financial_status,fulfillment_status,total_price,currency,customer';
  const orders = await getAll(q);
  const headers = [
    { label: 'id',                 get: o => o.id },
    { label: 'name',               get: o => o.name },
    { label: 'created_at',         get: o => o.created_at },
    { label: 'financial_status',   get: o => o.financial_status },
    { label: 'fulfillment_status', get: o => o.fulfillment_status },
    { label: 'total_price',        get: o => o.total_price },
    { label: 'currency',           get: o => o.currency },
    { label: 'customer_email',     get: o => o.customer?.email || '' },
    { label: 'customer_name',      get: o => [o.customer?.first_name, o.customer?.last_name].filter(Boolean).join(' ') }
  ];
  await fs.writeFile('orders.csv', toCSV(orders, headers));
  console.log(`✔ orders.csv (${orders.length} órdenes)`);
}

async function exportCustomers() {
  const q = 'customers.json?limit=250&fields=id,created_at,first_name,last_name,email,phone,orders_count,total_spent';
  const customers = await getAll(q);
  const headers = [
    { label: 'id',           get: c => c.id },
    { label: 'created_at',   get: c => c.created_at },
    { label: 'first_name',   get: c => c.first_name },
    { label: 'last_name',    get: c => c.last_name },
    { label: 'email',        get: c => c.email },
    { label: 'phone',        get: c => c.phone },
    { label: 'orders_count', get: c => c.orders_count },
    { label: 'total_spent',  get: c => c.total_spent }
  ];
  await fs.writeFile('customers.csv', toCSV(customers, headers));
  console.log(`✔ customers.csv (${customers.length} clientes)`);
}

async function exportProducts() {
  const q = 'products.json?limit=250&fields=id,title,handle,status,product_type,vendor,created_at,updated_at';
  const products = await getAll(q);
  const headers = [
    { label: 'id',           get: p => p.id },
    { label: 'title',        get: p => p.title },
    { label: 'handle',       get: p => p.handle },
    { label: 'status',       get: p => p.status },
    { label: 'product_type', get: p => p.product_type },
    { label: 'vendor',       get: p => p.vendor },
    { label: 'created_at',   get: p => p.created_at },
    { label: 'updated_at',   get: p => p.updated_at }
  ];
  await fs.writeFile('products.csv', toCSV(products, headers));
  console.log(`✔ products.csv (${products.length} productos)`);
}

// 6) Main
(async () => {
  console.log('Shopify Admin →', DOMAIN, `(${VERSION})`);
  await exportOrders();
  await exportCustomers();
  await exportProducts();
  console.log('✅ Export listo (orders.csv, customers.csv, products.csv)');
})();
