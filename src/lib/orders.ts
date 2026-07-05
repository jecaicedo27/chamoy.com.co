import { randomBytes } from "node:crypto";
import { query } from "./db";

export type OrderItem = {
  slug: string;
  name: string;
  size: string;
  priceCop: number;
  qty: number;
};

export type Order = {
  id: string;
  reference: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  customer_legal_id: string | null;
  city: string;
  address: string;
  notes: string | null;
  items: OrderItem[];
  subtotal_cop: number;
  shipping_cop: number;
  shipping_note: string | null;
  total_cop: number;
  status: string;
  payment_method: string | null;
  wompi_payment_reference: string | null;
  wompi_transaction_id: string | null;
  wompi_status_message: string | null;
  created_at: Date;
  updated_at: Date;
};

export function newOrderReference(): string {
  return `CHM-${randomBytes(5).toString("hex").toUpperCase()}`;
}

export async function createOrder(input: {
  reference: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  customerLegalId: string | null;
  city: string;
  address: string;
  notes: string | null;
  items: OrderItem[];
  subtotalCop: number;
  shippingCop: number;
  shippingNote: string | null;
  totalCop: number;
  status: string;
  paymentMethod: string;
  wompiPaymentReference?: string | null;
}): Promise<Order> {
  const rows = await query<Order>(
    `INSERT INTO orders (
       reference, customer_name, customer_phone, customer_email, customer_legal_id,
       city, address, notes, items, subtotal_cop, shipping_cop, shipping_note,
       total_cop, status, payment_method, wompi_payment_reference
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12, $13, $14, $15, $16)
     RETURNING *`,
    [
      input.reference,
      input.customerName,
      input.customerPhone,
      input.customerEmail,
      input.customerLegalId,
      input.city,
      input.address,
      input.notes,
      JSON.stringify(input.items),
      input.subtotalCop,
      input.shippingCop,
      input.shippingNote,
      input.totalCop,
      input.status,
      input.paymentMethod,
      input.wompiPaymentReference ?? null
    ]
  );

  return rows[0];
}

export async function getOrderByReference(reference: string): Promise<Order | null> {
  const rows = await query<Order>(`SELECT * FROM orders WHERE reference = $1`, [reference]);
  return rows[0] ?? null;
}

export async function setOrderPaymentResult(args: {
  reference: string;
  status: string;
  wompiTransactionId?: string | null;
  statusMessage?: string | null;
}): Promise<void> {
  await query(
    `UPDATE orders
     SET status = $2,
         wompi_transaction_id = COALESCE($3, wompi_transaction_id),
         wompi_status_message = COALESCE($4, wompi_status_message),
         updated_at = now()
     WHERE reference = $1`,
    [args.reference, args.status, args.wompiTransactionId ?? null, args.statusMessage ?? null]
  );
}

/** Solo permite transiciones hacia adelante para que un webhook viejo no
 *  degrade una orden ya pagada. */
export async function setOrderPaidIfPending(args: {
  reference: string;
  wompiTransactionId: string;
  statusMessage?: string | null;
}): Promise<boolean> {
  const rows = await query<{ reference: string }>(
    `UPDATE orders
     SET status = 'paid',
         wompi_transaction_id = $2,
         wompi_status_message = COALESCE($3, wompi_status_message),
         updated_at = now()
     WHERE reference = $1
       AND status IN ('created', 'pending_payment', 'declined', 'error')
     RETURNING reference`,
    [args.reference, args.wompiTransactionId, args.statusMessage ?? null]
  );
  return rows.length > 0;
}

export async function updateOrderStatus(id: string, status: string): Promise<void> {
  await query(`UPDATE orders SET status = $2, updated_at = now() WHERE id = $1`, [id, status]);
}

export async function listOrders(): Promise<Order[]> {
  return query<Order>(`SELECT * FROM orders ORDER BY created_at DESC LIMIT 300`);
}

/** Órdenes Wompi sin confirmación de pago (últimos 7 días) para reconciliar por API. */
export async function listPendingWompiOrders(): Promise<Order[]> {
  return query<Order>(
    `SELECT * FROM orders
     WHERE payment_method = 'wompi'
       AND status IN ('created', 'pending_payment')
       AND wompi_payment_reference IS NOT NULL
       AND created_at > now() - interval '7 days'
     ORDER BY created_at DESC
     LIMIT 50`
  );
}

export async function orderStatusCounts() {
  return query<{ status: string; total: string }>(
    `SELECT status, count(*) AS total FROM orders GROUP BY status ORDER BY status`
  );
}
