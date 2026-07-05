import { createHash } from "node:crypto";

/**
 * Cliente Wompi para chamoy.com.co — adaptado del patrón probado en
 * producción de perlasexplosivas.com.
 *
 * Estrategia: Widget Checkout vía URL firmada con SHA-256 (integridad),
 * redirect del cliente a Wompi para pagar (tarjetas, PSE, Nequi, botón
 * Bancolombia dentro del widget) y vuelta a /pedido/[referencia]/. El
 * webhook valida con events_secret antes de marcar la orden como pagada.
 *
 * Variables en .env.local (si faltan, la tienda opera en modo WhatsApp):
 *   WOMPI_PUBLIC_KEY, WOMPI_PRIVATE_KEY, WOMPI_INTEGRITY_SECRET,
 *   WOMPI_EVENTS_SECRET, WOMPI_API_BASE, WOMPI_ENV ("sandbox"|"production")
 */

const WIDGET_BASE = "https://checkout.wompi.co/p/";

export type WompiConfig = {
  publicKey: string;
  privateKey: string;
  integritySecret: string;
  eventsSecret: string;
  apiBase: string;
  env: "sandbox" | "production";
};

export function getWompiConfig(): WompiConfig | null {
  const publicKey = process.env.WOMPI_PUBLIC_KEY;
  const privateKey = process.env.WOMPI_PRIVATE_KEY;
  const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;
  const eventsSecret = process.env.WOMPI_EVENTS_SECRET;
  const apiBase = process.env.WOMPI_API_BASE || "https://production.wompi.co/v1";
  const env = process.env.WOMPI_ENV === "sandbox" ? "sandbox" : "production";

  if (!publicKey || !privateKey || !integritySecret || !eventsSecret) {
    return null;
  }

  return { publicKey, privateKey, integritySecret, eventsSecret, apiBase, env };
}

export function isWompiConfigured(): boolean {
  return getWompiConfig() !== null;
}

/** Firma de integridad oficial: sha256(reference + amountInCents + currency + secret). */
export function buildIntegritySignature(args: {
  reference: string;
  amountInCents: number;
  currency: "COP";
  integritySecret: string;
}): string {
  const concat = `${args.reference}${args.amountInCents}${args.currency}${args.integritySecret}`;
  return createHash("sha256").update(concat).digest("hex");
}

/**
 * Referencia única por INTENTO de pago: Wompi rechaza referencias repetidas.
 * El webhook recorta el sufijo -R<base36> para mapear la orden.
 */
export function uniquePaymentReference(orderReference: string): string {
  return `${orderReference}-R${Date.now().toString(36).toUpperCase()}`;
}

export function orderReferenceFromPayment(paymentReference: string): string {
  return paymentReference.replace(/-R[A-Z0-9]+$/, "");
}

export function buildCheckoutUrl(args: {
  paymentReference: string;
  amountCop: number;
  customerEmail: string;
  customerFullName?: string;
  customerPhone?: string;
  redirectUrl: string;
}): string | null {
  const cfg = getWompiConfig();
  if (!cfg) return null;

  const amountInCents = Math.round(args.amountCop * 100);
  const signature = buildIntegritySignature({
    reference: args.paymentReference,
    amountInCents,
    currency: "COP",
    integritySecret: cfg.integritySecret
  });

  const params = new URLSearchParams({
    "public-key": cfg.publicKey,
    currency: "COP",
    "amount-in-cents": String(amountInCents),
    reference: args.paymentReference,
    "signature:integrity": signature,
    "redirect-url": args.redirectUrl,
    "customer-data:email": args.customerEmail
  });
  if (args.customerFullName) params.set("customer-data:full-name", args.customerFullName);
  if (args.customerPhone) params.set("customer-data:phone-number", args.customerPhone);

  return `${WIDGET_BASE}?${params.toString()}`;
}

type WompiEventPayload = {
  event: string;
  data: Record<string, unknown>;
  timestamp: number;
  signature: { properties: string[]; checksum: string };
  environment?: string;
};

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function verifyEventSignature(payload: WompiEventPayload): boolean {
  const cfg = getWompiConfig();
  if (!cfg) return false;

  const props = payload.signature?.properties ?? [];
  if (props.length === 0) return false;

  const concatValues = props
    .map((p) => {
      const v = getByPath(payload.data, p);
      return v === undefined || v === null ? "" : String(v);
    })
    .join("");

  const concat = `${concatValues}${payload.timestamp}${cfg.eventsSecret}`;
  const expected = createHash("sha256").update(concat).digest("hex");
  const received = (payload.signature?.checksum ?? "").toLowerCase();
  return expected.toLowerCase() === received;
}

export type WompiTransaction = {
  id: string;
  reference: string;
  status: "APPROVED" | "DECLINED" | "VOIDED" | "ERROR" | "PENDING";
  amount_in_cents: number;
  currency: string;
  customer_email: string;
  payment_method_type: string;
  status_message: string | null;
};

/**
 * Busca transacciones por referencia de pago exacta. Devuelve la aprobada si
 * existe; si no, la más reciente. Es la vía de reconciliación cuando el
 * webhook del comercio apunta a otro dominio (llaves compartidas con perlas).
 */
export async function fetchTransactionByReference(
  paymentReference: string
): Promise<WompiTransaction | null> {
  const cfg = getWompiConfig();
  if (!cfg) return null;

  const res = await fetch(
    `${cfg.apiBase}/transactions?reference=${encodeURIComponent(paymentReference)}`,
    { headers: { Authorization: `Bearer ${cfg.privateKey}` }, cache: "no-store" }
  );
  if (!res.ok) return null;

  const json = (await res.json()) as { data?: WompiTransaction[] };
  const transactions = json.data ?? [];
  if (!transactions.length) return null;

  return transactions.find((t) => t.status === "APPROVED") ?? transactions[0];
}

export async function fetchTransaction(transactionId: string): Promise<WompiTransaction | null> {
  const cfg = getWompiConfig();
  if (!cfg) return null;

  const res = await fetch(`${cfg.apiBase}/transactions/${transactionId}`, {
    headers: { Authorization: `Bearer ${cfg.privateKey}` },
    cache: "no-store"
  });
  if (!res.ok) return null;

  const json = (await res.json()) as { data: WompiTransaction };
  return json.data ?? null;
}

export type WompiEvent = WompiEventPayload;
