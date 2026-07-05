import {
  listPendingWompiOrders,
  setOrderPaidIfPending,
  setOrderPaymentResult,
  type Order
} from "./orders";
import { fetchTransactionByReference, isWompiConfigured } from "./wompi";

/**
 * Reconciliación de pagos por API de Wompi.
 *
 * El comercio comparte llaves con perlasexplosivas.com y Wompi solo permite
 * una URL de eventos por comercio (apunta a perlas). Por eso chamoy confirma
 * pagos consultando /transactions?reference= — al cargar /admin/pedidos/ y
 * cuando el cliente vuelve a /pedido/[ref]/.
 */
export async function reconcileOrder(order: Order): Promise<string> {
  if (!order.wompi_payment_reference) return order.status;

  const transaction = await fetchTransactionByReference(order.wompi_payment_reference);
  if (!transaction) return order.status;

  if (transaction.status === "APPROVED") {
    // Anti-tampering: el monto pagado debe coincidir con la orden.
    if (transaction.amount_in_cents !== order.total_cop * 100) {
      console.error("Reconciliación: monto no coincide", {
        reference: order.reference,
        expected: order.total_cop * 100,
        received: transaction.amount_in_cents
      });
      return order.status;
    }
    await setOrderPaidIfPending({
      reference: order.reference,
      wompiTransactionId: transaction.id,
      statusMessage: transaction.status_message
    });
    return "paid";
  }

  if (["DECLINED", "ERROR", "VOIDED"].includes(transaction.status)) {
    await setOrderPaymentResult({
      reference: order.reference,
      status: transaction.status.toLowerCase(),
      wompiTransactionId: transaction.id,
      statusMessage: transaction.status_message
    });
    return transaction.status.toLowerCase();
  }

  return order.status;
}

export async function reconcilePendingOrders(): Promise<number> {
  if (!isWompiConfigured()) return 0;

  try {
    const pending = await listPendingWompiOrders();
    let updated = 0;
    for (const order of pending) {
      const before = order.status;
      const after = await reconcileOrder(order);
      if (after !== before) updated += 1;
    }
    return updated;
  } catch (error) {
    console.error("reconcilePendingOrders", error);
    return 0;
  }
}
