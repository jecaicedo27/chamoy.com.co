"use client";

import Link from "next/link";
import { formatCop, useCart } from "@/lib/cart";

export function CartWidget() {
  const cart = useCart();

  return (
    <>
      {cart.count > 0 ? (
        <button type="button" className="cart-fab" onClick={cart.open} aria-label={`Ver carrito (${cart.count})`}>
          🛒 <span className="cart-fab-count">{cart.count}</span>
        </button>
      ) : null}

      {cart.isOpen ? (
        <div className="cart-overlay" onClick={cart.close} role="presentation">
          <aside
            className="cart-drawer"
            role="dialog"
            aria-label="Carrito de compras"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="cart-header">
              <h3>Tu pedido</h3>
              <button type="button" className="cart-close" onClick={cart.close} aria-label="Cerrar carrito">
                ×
              </button>
            </header>

            {cart.items.length === 0 ? (
              <div className="cart-empty">
                <p>Tu carrito está vacío.</p>
                <Link className="btn btn-primary" href="/comprar/" onClick={cart.close}>
                  Ver productos
                </Link>
              </div>
            ) : (
              <>
                <ul className="cart-items">
                  {cart.items.map((item) => (
                    <li className="cart-item" key={`${item.slug}-${item.size}`}>
                      <img src={item.image} alt="" width={56} height={56} />
                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <span>
                          {item.size} · {formatCop(item.priceCop)}
                        </span>
                        <div className="qty-controls" aria-label="Cantidad">
                          <button type="button" onClick={() => cart.setQty(item.slug, item.size, item.qty - 1)}>
                            −
                          </button>
                          <span>{item.qty}</span>
                          <button type="button" onClick={() => cart.setQty(item.slug, item.size, item.qty + 1)}>
                            +
                          </button>
                          <button
                            type="button"
                            className="cart-remove"
                            onClick={() => cart.remove(item.slug, item.size)}
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                      <strong className="cart-item-total">{formatCop(item.priceCop * item.qty)}</strong>
                    </li>
                  ))}
                </ul>

                <footer className="cart-footer">
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <strong>{formatCop(cart.subtotal)}</strong>
                  </div>
                  <p className="cart-shipping-note">El envío se coordina al confirmar el pedido.</p>
                  <Link className="btn btn-primary cart-checkout" href="/checkout/" onClick={cart.close}>
                    Finalizar compra
                  </Link>
                  <button type="button" className="btn btn-secondary" onClick={cart.close}>
                    Seguir comprando
                  </button>
                </footer>
              </>
            )}
          </aside>
        </div>
      ) : null}
    </>
  );
}
