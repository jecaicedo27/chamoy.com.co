import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOrderByReference, setOrderPaidIfPending, setOrderPaymentResult } from "@/lib/orders";
import { reconcileOrder } from "@/lib/reconcile";
import { fetchTransaction } from "@/lib/wompi";
import { whatsappUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Estado de tu pedido",
  robots: { index: false, follow: false }
};

const STATUS_VIEW: Record<string, { title: string; body: string; tone: "ok" | "wait" | "bad" }> = {
  paid: {
    title: "¡Pago aprobado! 🎉",
    body: "Recibimos tu pago. Te escribimos por WhatsApp para coordinar el envío de tu pedido.",
    tone: "ok"
  },
  whatsapp: {
    title: "Pedido recibido ✅",
    body: "Tu pedido quedó registrado. Confírmalo por WhatsApp para coordinar pago y envío.",
    tone: "ok"
  },
  pending_payment: {
    title: "Pago en proceso…",
    body: "Tu pago está siendo procesado. Esta página se actualiza al recargar; también te confirmaremos por WhatsApp.",
    tone: "wait"
  },
  created: {
    title: "Pedido creado",
    body: "Tu pedido quedó registrado pero el pago no se completó. Puedes intentarlo de nuevo o escribirnos por WhatsApp.",
    tone: "wait"
  },
  declined: {
    title: "El pago no fue aprobado",
    body: "Tu banco rechazó la transacción. Puedes intentar con otro medio de pago o coordinar por WhatsApp.",
    tone: "bad"
  },
  error: {
    title: "Hubo un error en el pago",
    body: "La transacción no se completó. Inténtalo de nuevo o escríbenos por WhatsApp y lo resolvemos.",
    tone: "bad"
  },
  voided: {
    title: "Pago anulado",
    body: "La transacción fue anulada. Si no fuiste tú, escríbenos por WhatsApp.",
    tone: "bad"
  },
  shipped: {
    title: "Pedido despachado 📦",
    body: "Tu pedido va en camino. Te compartimos la guía por WhatsApp.",
    tone: "ok"
  },
  delivered: {
    title: "Pedido entregado ✅",
    body: "¡Que lo disfrutes! Si vendes con chamoy, pide asesoría para sacarle margen.",
    tone: "ok"
  },
  cancelled: {
    title: "Pedido cancelado",
    body: "Este pedido fue cancelado. Escríbenos por WhatsApp si necesitas ayuda.",
    tone: "bad"
  }
};

export default async function OrderStatusPage({
  params,
  searchParams
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { reference } = await params;
  const { id: transactionId } = await searchParams;

  let order = await getOrderByReference(reference);
  if (!order) notFound();

  // Al volver de Wompi (o al recargar en pendiente) consultamos la transacción
  // directamente: mejor UX que esperar el webhook, que sigue siendo la fuente
  // de verdad definitiva.
  const pendingStates = ["created", "pending_payment"];
  const txToCheck = transactionId || order.wompi_transaction_id;
  let qrImage: string | null = null;

  if (pendingStates.includes(order.status) && !txToCheck && order.wompi_payment_reference) {
    // Sin id de transacción (el cliente no volvió por el redirect): reconciliar
    // por referencia de pago vía API.
    await reconcileOrder(order);
    order = (await getOrderByReference(reference)) ?? order;
  } else if (pendingStates.includes(order.status) && txToCheck) {
    const transaction = await fetchTransaction(txToCheck);
    if (transaction) {
      if (transaction.status === "PENDING" && transaction.payment_method?.extra?.qr_image) {
        qrImage = transaction.payment_method.extra.qr_image;
      }
      if (transaction.status === "APPROVED") {
        await setOrderPaidIfPending({
          reference,
          wompiTransactionId: transaction.id,
          statusMessage: transaction.status_message
        });
      } else if (["DECLINED", "ERROR", "VOIDED"].includes(transaction.status)) {
        await setOrderPaymentResult({
          reference,
          status: transaction.status.toLowerCase(),
          wompiTransactionId: transaction.id,
          statusMessage: transaction.status_message
        });
      } else {
        await setOrderPaymentResult({
          reference,
          status: "pending_payment",
          wompiTransactionId: transaction.id
        });
      }
      order = (await getOrderByReference(reference)) ?? order;
    }
  }

  const view = STATUS_VIEW[order.status] ?? STATUS_VIEW.created;
  const retryable = ["created", "declined", "error", "voided"].includes(order.status);
  const message = `Hola, mi pedido en chamoy.com.co es ${order.reference}. Quiero confirmar el estado.`;

  return (
    <main className="section">
      <div className="wrap order-status">
        <div className={`card card-pad status-card ${view.tone}`}>
          <p className="section-kicker">Pedido {order.reference}</p>
          <h1>{view.title}</h1>
          <p>{view.body}</p>
          {qrImage ? (
            <div className="qr-inline">
              <p>
                <strong>Tu QR de pago sigue activo:</strong> escanéalo con tu app Bancolombia y
                recarga esta página al pagar.
              </p>
              <img
                className="qr-image"
                src={`data:image/svg+xml;base64,${qrImage}`}
                alt={`Código QR para pagar el pedido ${order.reference}`}
              />
            </div>
          ) : null}
          <div className="section-actions">
            <a className="btn btn-primary" href={whatsappUrl(message)} data-cta="order-status">
              Hablar por WhatsApp
            </a>
            {retryable ? (
              <Link className="btn btn-secondary" href="/comprar/">
                Volver a la tienda
              </Link>
            ) : null}
          </div>
        </div>

        <div className="card card-pad">
          <h3>Resumen del pedido</h3>
          <ul className="cart-items">
            {order.items.map((item) => (
              <li className="cart-item" key={`${item.slug}-${item.size}`}>
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>
                    {item.size} × {item.qty}
                  </span>
                </div>
                <strong className="cart-item-total">
                  ${(item.priceCop * item.qty).toLocaleString("es-CO")}
                </strong>
              </li>
            ))}
          </ul>
          <div className="cart-subtotal">
            <span>Total productos</span>
            <strong>${order.total_cop.toLocaleString("es-CO")}</strong>
          </div>
          <p className="cart-shipping-note">
            {order.shipping_note || "Envío por coordinar según ciudad."} Entrega en {order.city}.
          </p>
        </div>
      </div>
    </main>
  );
}
