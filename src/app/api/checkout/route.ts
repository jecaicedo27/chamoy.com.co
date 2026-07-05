import { NextResponse } from "next/server";
import { getProducts } from "@/lib/content";
import { site } from "@/lib/env";
import {
  createOrder,
  newOrderReference,
  setOrderPaymentResult,
  type OrderItem
} from "@/lib/orders";
import { buildCheckoutUrl, isWompiConfigured, uniquePaymentReference } from "@/lib/wompi";
import { whatsappUrl } from "@/lib/whatsapp";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;

function getIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isLimited(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);
  if (!current || current.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function field(value: unknown, max: number) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

type CheckoutBody = {
  payWith?: unknown;
  customer?: Record<string, unknown>;
  items?: Array<Record<string, unknown>>;
};

export async function POST(request: Request) {
  const ip = getIp(request);
  if (isLimited(ip)) {
    return NextResponse.json({ error: "Demasiados intentos, espera unos minutos." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as CheckoutBody | null;
  if (!body || !Array.isArray(body.items) || !body.items.length || body.items.length > 30) {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const customer = body.customer ?? {};
  const name = field(customer.name, 120);
  const phone = field(customer.phone, 20);
  const email = field(customer.email, 120);
  const legalId = field(customer.legalId, 20);
  const city = field(customer.city, 80);
  const address = field(customer.address, 200);
  const notes = field(customer.notes, 500);
  const payWith = body.payWith === "whatsapp" ? "whatsapp" : "wompi";

  if (name.length < 3 || phone.length < 7 || city.length < 3 || address.length < 5) {
    return NextResponse.json({ error: "Completa nombre, WhatsApp, ciudad y dirección." }, { status: 400 });
  }
  if (payWith === "wompi" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "El correo es obligatorio para el pago online." }, { status: 400 });
  }

  // Precios SIEMPRE re-resueltos server-side contra la BD: el cliente solo
  // manda slug + presentación + cantidad, nunca el precio.
  const products = await getProducts();
  const items: OrderItem[] = [];

  for (const raw of body.items) {
    const slug = field(raw.slug, 60);
    const size = field(raw.size, 30);
    const qty = Math.floor(Number(raw.qty));

    if (!slug || !size || !Number.isFinite(qty) || qty < 1 || qty > 99) {
      return NextResponse.json({ error: "Artículo inválido en el carrito." }, { status: 400 });
    }

    const product = products.find((p) => p.slug === slug);
    const presentation = product?.presentations.find((p) => p.size === size);
    if (!product || !presentation) {
      return NextResponse.json(
        { error: `El producto "${slug} ${size}" ya no está disponible. Actualiza tu carrito.` },
        { status: 409 }
      );
    }

    items.push({ slug, name: product.name, size, priceCop: presentation.priceCop, qty });
  }

  const subtotal = items.reduce((sum, item) => sum + item.priceCop * item.qty, 0);
  const shippingNote = "Envío por coordinar según ciudad";

  const reference = newOrderReference();
  const wantsWompi = payWith === "wompi" && isWompiConfigured();
  const paymentReference = wantsWompi ? uniquePaymentReference(reference) : null;

  await createOrder({
    reference,
    customerName: name,
    customerPhone: phone,
    customerEmail: email || null,
    customerLegalId: legalId || null,
    city,
    address,
    notes: notes || null,
    items,
    subtotalCop: subtotal,
    shippingCop: 0,
    shippingNote,
    totalCop: subtotal,
    status: wantsWompi ? "pending_payment" : "whatsapp",
    paymentMethod: wantsWompi ? "wompi" : "whatsapp",
    wompiPaymentReference: paymentReference
  });

  if (wantsWompi && paymentReference) {
    const checkoutUrl = buildCheckoutUrl({
      paymentReference,
      amountCop: subtotal,
      customerEmail: email,
      customerFullName: name,
      customerPhone: phone,
      redirectUrl: `${site.url}/pedido/${reference}/`
    });

    if (!checkoutUrl) {
      await setOrderPaymentResult({ reference, status: "whatsapp" });
    } else {
      return NextResponse.json({ ok: true, reference, checkoutUrl });
    }
  }

  const summary = items
    .map((item) => `${item.qty}x ${item.name} ${item.size}`)
    .join(", ");
  const message =
    `Hola, hice el pedido ${reference} en chamoy.com.co: ${summary}. ` +
    `Total productos: $${subtotal.toLocaleString("es-CO")}. ` +
    `Soy ${name}, en ${city}. Quiero confirmar pago y envío.`;

  return NextResponse.json({
    ok: true,
    reference,
    whatsappUrl: whatsappUrl(message)
  });
}
