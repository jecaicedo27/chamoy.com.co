import { NextResponse } from "next/server";
import { setOrderPaidIfPending, setOrderPaymentResult, getOrderByReference } from "@/lib/orders";
import { orderReferenceFromPayment, verifyEventSignature, type WompiEvent } from "@/lib/wompi";

/**
 * Webhook de eventos de Wompi (transaction.updated).
 * URL a registrar en el panel de Wompi: https://chamoy.com.co/api/webhooks/wompi/
 * Fuente de verdad del estado de pago: solo acepta eventos con firma válida.
 */
export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as WompiEvent | null;
  if (!payload || !payload.signature) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  if (!verifyEventSignature(payload)) {
    console.error("Webhook Wompi: firma inválida", { event: payload.event });
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  const transaction = (payload.data as { transaction?: Record<string, unknown> }).transaction;
  if (!transaction) {
    return NextResponse.json({ ok: true, skipped: "sin transacción" });
  }

  const paymentReference = String(transaction.reference || "");
  const reference = orderReferenceFromPayment(paymentReference);
  const status = String(transaction.status || "");
  const transactionId = String(transaction.id || "");
  const statusMessage = transaction.status_message ? String(transaction.status_message) : null;

  const order = await getOrderByReference(reference);
  if (!order) {
    console.error("Webhook Wompi: orden no encontrada", { reference, paymentReference });
    return NextResponse.json({ ok: true, skipped: "orden desconocida" });
  }

  // Anti-tampering extra: el monto del evento debe coincidir con la orden.
  const amountInCents = Number(transaction.amount_in_cents || 0);
  if (status === "APPROVED" && amountInCents !== order.total_cop * 100) {
    console.error("Webhook Wompi: monto no coincide", {
      reference,
      expected: order.total_cop * 100,
      received: amountInCents
    });
    return NextResponse.json({ error: "Monto no coincide" }, { status: 409 });
  }

  if (status === "APPROVED") {
    await setOrderPaidIfPending({ reference, wompiTransactionId: transactionId, statusMessage });
  } else if (["DECLINED", "ERROR", "VOIDED"].includes(status)) {
    // No degradar una orden ya pagada (webhooks pueden llegar fuera de orden).
    if (order.status !== "paid") {
      await setOrderPaymentResult({
        reference,
        status: status.toLowerCase(),
        wompiTransactionId: transactionId,
        statusMessage
      });
    }
  }

  return NextResponse.json({ ok: true });
}
