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

/**
 * Firma de integridad oficial: sha256(reference + amountInCents + currency + secret).
 * OJO (aprendido en perlas): si la transacción manda expiration_time, Wompi EXIGE
 * que vaya DENTRO de la firma (entre currency y el secret), si no rechaza.
 */
export function buildIntegritySignature(args: {
  reference: string;
  amountInCents: number;
  currency: "COP";
  integritySecret: string;
  expirationTime?: string;
}): string {
  const exp = args.expirationTime ?? "";
  const concat = `${args.reference}${args.amountInCents}${args.currency}${exp}${args.integritySecret}`;
  return createHash("sha256").update(concat).digest("hex");
}

/** Trae el acceptance_token vigente del comercio (requerido por la Transactions API). */
async function getAcceptanceToken(cfg: WompiConfig): Promise<string> {
  const res = await fetch(`${cfg.apiBase}/merchants/${cfg.publicKey}`);
  if (!res.ok) throw new Error(`Wompi /merchants ${res.status}`);
  const json = await res.json();
  const token = json?.data?.presigned_acceptance?.acceptance_token;
  if (!token) throw new Error("Wompi: acceptance_token no disponible");
  return token;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * BOTÓN BANCOLOMBIA DIRECTO (BANCOLOMBIA_TRANSFER) vía Transactions API.
 * Crea la transacción y hace long-polling hasta obtener async_payment_url
 * (la URL del botón a la que se redirige al cliente). Patrón validado en
 * producción en perlasexplosivas (mismo comercio Wompi).
 */
export async function createBancolombiaTransferTransaction(args: {
  paymentReference: string;
  amountCop: number;
  customerEmail: string;
  redirectUrl: string;
  paymentDescription: string;
}): Promise<{ transactionId: string; asyncPaymentUrl: string }> {
  const cfg = getWompiConfig();
  if (!cfg) throw new Error("Wompi no configurado");

  const amountInCents = Math.round(args.amountCop * 100);
  const acceptanceToken = await getAcceptanceToken(cfg);
  const signature = buildIntegritySignature({
    reference: args.paymentReference,
    amountInCents,
    currency: "COP",
    integritySecret: cfg.integritySecret
  });

  const body = {
    acceptance_token: acceptanceToken,
    amount_in_cents: amountInCents,
    currency: "COP",
    customer_email: args.customerEmail,
    reference: args.paymentReference,
    signature,
    redirect_url: args.redirectUrl,
    payment_method: {
      type: "BANCOLOMBIA_TRANSFER",
      user_type: "PERSON",
      payment_description: args.paymentDescription.slice(0, 64)
    }
  };

  const txRes = await fetch(`${cfg.apiBase}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.publicKey}` },
    body: JSON.stringify(body)
  });
  const txJson = await txRes.json();
  if (!txRes.ok || !txJson?.data?.id) {
    const msg = JSON.stringify(txJson?.error ?? txJson?.messages ?? txJson).slice(0, 300);
    throw new Error(`Wompi transacción: ${msg}`);
  }
  const transactionId: string = txJson.data.id;

  for (let i = 0; i < 8; i++) {
    await sleep(2200);
    const t = (await (await fetch(`${cfg.apiBase}/transactions/${transactionId}`)).json())?.data;
    const url = t?.payment_method?.extra?.async_payment_url;
    if (url) return { transactionId, asyncPaymentUrl: url };
    if (["DECLINED", "ERROR", "VOIDED"].includes(t?.status)) {
      throw new Error(`Wompi transacción ${t.status}`);
    }
  }
  throw new Error("Wompi: no se obtuvo la URL del botón Bancolombia a tiempo");
}

/**
 * QR BANCOLOMBIA (BANCOLOMBIA_QR) vía Transactions API. Wompi genera el QR;
 * long-polling hasta qr_image (SVG base64). Validez 2h: sin expiration_time
 * Wompi usa un default de minutos y el QR se vence en la cara del cliente.
 */
export async function createBancolombiaQrTransaction(args: {
  paymentReference: string;
  amountCop: number;
  customerEmail: string;
  redirectUrl: string;
  paymentDescription: string;
}): Promise<{ transactionId: string; qrImageBase64: string }> {
  const cfg = getWompiConfig();
  if (!cfg) throw new Error("Wompi no configurado");

  const amountInCents = Math.round(args.amountCop * 100);
  const acceptanceToken = await getAcceptanceToken(cfg);
  const expirationTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  const signature = buildIntegritySignature({
    reference: args.paymentReference,
    amountInCents,
    currency: "COP",
    integritySecret: cfg.integritySecret,
    expirationTime
  });

  const body = {
    acceptance_token: acceptanceToken,
    amount_in_cents: amountInCents,
    currency: "COP",
    customer_email: args.customerEmail,
    reference: args.paymentReference,
    signature,
    redirect_url: args.redirectUrl,
    expiration_time: expirationTime,
    payment_method: {
      type: "BANCOLOMBIA_QR",
      payment_description: args.paymentDescription.slice(0, 64)
    }
  };

  const txRes = await fetch(`${cfg.apiBase}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.publicKey}` },
    body: JSON.stringify(body)
  });
  const txJson = await txRes.json();
  if (!txRes.ok || !txJson?.data?.id) {
    const msg = JSON.stringify(txJson?.error ?? txJson?.messages ?? txJson).slice(0, 300);
    throw new Error(`Wompi transacción QR: ${msg}`);
  }
  const transactionId: string = txJson.data.id;

  for (let i = 0; i < 8; i++) {
    await sleep(2200);
    const t = (await (await fetch(`${cfg.apiBase}/transactions/${transactionId}`)).json())?.data;
    const qr = t?.payment_method?.extra?.qr_image;
    if (qr) return { transactionId, qrImageBase64: qr };
    if (["DECLINED", "ERROR", "VOIDED"].includes(t?.status)) {
      throw new Error(`Wompi transacción ${t.status}`);
    }
  }
  throw new Error("Wompi: no se generó el QR a tiempo");
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
  payment_method?: {
    type?: string;
    extra?: { qr_image?: string; async_payment_url?: string };
  };
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
