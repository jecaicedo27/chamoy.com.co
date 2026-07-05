"use client";

import Link from "next/link";
import { useState } from "react";
import { formatCop, useCart } from "@/lib/cart";
import { track } from "@/lib/track";

type Status = "idle" | "loading" | "error";
type PayMethod = "wompi" | "bancolombia" | "qr" | "whatsapp";

const PAY_OPTIONS: Array<{ value: PayMethod; title: string; detail: string }> = [
  { value: "wompi", title: "Tarjeta, PSE o Nequi", detail: "Pago seguro con Wompi" },
  { value: "bancolombia", title: "Botón Bancolombia", detail: "Paga directo desde tu app Bancolombia" },
  { value: "qr", title: "QR Bancolombia", detail: "Escanea y paga con Bancolombia o Nequi" },
  { value: "whatsapp", title: "Coordinar por WhatsApp", detail: "Te confirmamos pago y envío por chat" }
];

export default function CheckoutPage() {
  const cart = useCart();
  const [payWith, setPayWith] = useState<PayMethod>("wompi");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [qrView, setQrView] = useState<{ image: string; reference: string; totalCop: number } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cart.items.length) return;
    setStatus("loading");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      payWith,
      customer: {
        name: String(form.get("name") || ""),
        phone: String(form.get("phone") || ""),
        email: String(form.get("email") || ""),
        legalId: String(form.get("legalId") || ""),
        city: String(form.get("city") || ""),
        address: String(form.get("address") || ""),
        notes: String(form.get("notes") || "")
      },
      items: cart.items.map((item) => ({ slug: item.slug, size: item.size, qty: item.qty }))
    };

    try {
      const response = await fetch("/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        reference?: string;
        checkoutUrl?: string;
        redirectUrl?: string;
        whatsappUrl?: string;
        qr?: { image: string; totalCop: number };
      };

      if (!response.ok || !data.ok || !data.reference) {
        throw new Error(data.error || "No pudimos crear el pedido.");
      }

      track("checkout_submit", { total: cart.subtotal, method: payWith });
      const total = cart.subtotal;
      cart.clear();

      const paymentRedirect = data.checkoutUrl || data.redirectUrl;
      if (paymentRedirect) {
        window.location.href = paymentRedirect;
        return;
      }
      if (data.qr) {
        setStatus("idle");
        setQrView({ image: data.qr.image, reference: data.reference, totalCop: data.qr.totalCop ?? total });
        return;
      }
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
      }
      window.location.href = `/pedido/${data.reference}/`;
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Error inesperado.");
    }
  }

  if (qrView) {
    return (
      <main className="section">
        <div className="wrap qr-screen">
          <div className="card card-pad qr-card">
            <p className="section-kicker">Pedido {qrView.reference}</p>
            <h1>Escanea y paga {formatCop(qrView.totalCop)}</h1>
            <p>
              Abre tu app <strong>Bancolombia</strong> (o Nequi con QR Bancolombia), escanea el
              código y confirma el pago. El QR es válido por 2 horas.
            </p>
            <img
              className="qr-image"
              src={`data:image/svg+xml;base64,${qrView.image}`}
              alt={`Código QR para pagar el pedido ${qrView.reference}`}
            />
            <Link className="btn btn-primary" href={`/pedido/${qrView.reference}/`}>
              Ya pagué — ver estado del pedido
            </Link>
            <p className="calc-note">
              Si el QR se vence o no puedes escanearlo, entra al estado del pedido y contáctanos
              por WhatsApp: lo resolvemos por otro medio.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!cart.items.length) {
    return (
      <main className="section">
        <div className="wrap checkout-empty">
          <h1>Tu carrito está vacío</h1>
          <p>Agrega productos para finalizar tu compra.</p>
          <Link className="btn btn-primary" href="/comprar/">
            Ver productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="wrap checkout-grid">
        <form className="card card-pad checkout-form" onSubmit={onSubmit}>
          <h1>Finalizar compra</h1>
          <p>Sin registro y sin vueltas: llena tus datos y elige cómo pagar.</p>

          <label>
            Nombre completo
            <input name="name" required minLength={3} maxLength={120} autoComplete="name" />
          </label>
          <label>
            WhatsApp
            <input name="phone" required minLength={7} maxLength={20} autoComplete="tel" inputMode="tel" />
          </label>
          <label>
            Correo (para el comprobante de pago)
            <input name="email" type="email" required maxLength={120} autoComplete="email" />
          </label>
          <label>
            Cédula o NIT (opcional, para factura)
            <input name="legalId" maxLength={20} autoComplete="off" />
          </label>
          <div className="checkout-two">
            <label>
              Ciudad
              <input name="city" required minLength={3} maxLength={80} autoComplete="address-level2" />
            </label>
            <label>
              Dirección de entrega
              <input name="address" required minLength={5} maxLength={200} autoComplete="street-address" />
            </label>
          </div>
          <label>
            Notas del pedido (opcional)
            <textarea name="notes" rows={2} maxLength={500} />
          </label>

          <fieldset className="pay-picker">
            <legend>¿Cómo quieres pagar?</legend>
            {PAY_OPTIONS.map((option) => (
              <label
                className={payWith === option.value ? "pay-option active" : "pay-option"}
                key={option.value}
              >
                <input
                  type="radio"
                  name="payWith"
                  value={option.value}
                  checked={payWith === option.value}
                  onChange={() => setPayWith(option.value)}
                />
                <span>
                  <strong>{option.title}</strong>
                  <small>{option.detail}</small>
                </span>
              </label>
            ))}
          </fieldset>

          {error ? <p className="form-message error">{error}</p> : null}

          <button className="btn btn-primary checkout-submit" type="submit" disabled={status === "loading"}>
            {status === "loading"
              ? payWith === "qr"
                ? "Generando QR..."
                : "Creando pedido..."
              : payWith === "whatsapp"
                ? "Enviar pedido por WhatsApp"
                : `Pagar ${formatCop(cart.subtotal)}`}
          </button>
          <p className="calc-note">El envío se coordina al confirmar el pedido, según tu ciudad.</p>
        </form>

        <aside className="card card-pad checkout-summary">
          <h3>Resumen</h3>
          <ul className="cart-items">
            {cart.items.map((item) => (
              <li className="cart-item" key={`${item.slug}-${item.size}`}>
                <img src={item.image} alt="" width={48} height={48} />
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>
                    {item.size} × {item.qty}
                  </span>
                </div>
                <strong className="cart-item-total">{formatCop(item.priceCop * item.qty)}</strong>
              </li>
            ))}
          </ul>
          <div className="cart-subtotal">
            <span>Total productos</span>
            <strong>{formatCop(cart.subtotal)}</strong>
          </div>
          <p className="cart-shipping-note">
            Fabricado en Colombia por Skarchamoy. Registros sanitarios INVIMA visibles en cada producto.
          </p>
        </aside>
      </div>
    </main>
  );
}
