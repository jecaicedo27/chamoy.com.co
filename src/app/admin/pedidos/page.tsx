import { AdminNav } from "@/components/AdminNav";
import { listOrders, orderStatusCounts } from "@/lib/orders";
import { reconcilePendingOrders } from "@/lib/reconcile";
import { requireAdmin } from "@/lib/adminAuth";
import { orderStatusAction } from "../actions";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  created: "Creado (sin pago)",
  pending_payment: "Pago en proceso",
  paid: "Pagado",
  whatsapp: "Por WhatsApp",
  declined: "Rechazado",
  error: "Error de pago",
  voided: "Anulado",
  shipped: "Despachado",
  delivered: "Entregado",
  cancelled: "Cancelado"
};

export default async function AdminPedidosPage() {
  await requireAdmin();
  // Confirma contra la API de Wompi los pagos pendientes antes de listar
  // (el webhook del comercio compartido apunta a perlasexplosivas).
  await reconcilePendingOrders();
  const [orders, counts] = await Promise.all([listOrders(), orderStatusCounts()]);

  return (
    <main className="admin-main">
      <AdminNav current="pedidos" />

      <section className="card card-pad">
        <h1>Pedidos ({orders.length})</h1>
        <p>
          {counts.map((row) => `${STATUS_LABELS[row.status] || row.status}: ${row.total}`).join(" · ") ||
            "Sin pedidos todavía."}
        </p>
        <p>
          Los pagos online se confirman solos (webhook de Wompi). Los pedidos &quot;Por WhatsApp&quot;
          requieren confirmar pago manualmente. Al despachar, cambia el estado para llevar control.
        </p>
      </section>

      {orders.map((order) => (
        <section className="card card-pad admin-order" key={order.id}>
          <div className="admin-order-head">
            <div>
              <strong>{order.reference}</strong>
              <span className={`order-badge status-${order.status}`}>
                {STATUS_LABELS[order.status] || order.status}
              </span>
            </div>
            <span>
              {new Date(order.created_at).toLocaleDateString("es-CO", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>

          <div className="admin-order-body">
            <div>
              <p>
                <strong>{order.customer_name}</strong> ·{" "}
                <a href={`https://wa.me/${order.customer_phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                  {order.customer_phone}
                </a>
                {order.customer_email ? ` · ${order.customer_email}` : ""}
              </p>
              <p>
                {order.city} — {order.address}
              </p>
              {order.notes ? <p>Nota: {order.notes}</p> : null}
              <ul className="admin-order-items">
                {order.items.map((item) => (
                  <li key={`${item.slug}-${item.size}`}>
                    {item.qty}× {item.name} {item.size} — ${(item.priceCop * item.qty).toLocaleString("es-CO")}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total: ${order.total_cop.toLocaleString("es-CO")}</strong>
                {order.wompi_transaction_id ? ` · Wompi: ${order.wompi_transaction_id}` : ""}
              </p>
            </div>

            <form action={orderStatusAction} className="admin-inline-form">
              <input type="hidden" name="id" value={order.id} />
              <select name="status" defaultValue={order.status}>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
              <button className="btn btn-secondary btn-compact" type="submit">
                Guardar
              </button>
            </form>
          </div>
        </section>
      ))}
    </main>
  );
}
