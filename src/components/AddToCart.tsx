"use client";

import { useState } from "react";
import { formatCop, useCart } from "@/lib/cart";
import { track } from "@/lib/track";
import type { Presentation } from "@/lib/types";

export function AddToCart({
  slug,
  name,
  image,
  presentations,
  compact = false
}: {
  slug: string;
  name: string;
  image: string;
  presentations: Presentation[];
  compact?: boolean;
}) {
  const cart = useCart();
  const [selected, setSelected] = useState(0);

  if (!presentations.length) return null;
  const presentation = presentations[selected] ?? presentations[0];

  function onAdd() {
    cart.add({
      slug,
      name,
      size: presentation.size,
      priceCop: presentation.priceCop,
      image
    });
    track("add_to_cart", { item: `${slug} ${presentation.size}`, price: presentation.priceCop });
  }

  return (
    <div className={compact ? "add-to-cart compact" : "add-to-cart"}>
      {presentations.length > 1 ? (
        <div className="size-picker" role="group" aria-label="Elige presentación">
          {presentations.map((option, index) => (
            <button
              type="button"
              key={option.size}
              className={index === selected ? "size-option active" : "size-option"}
              onClick={() => setSelected(index)}
            >
              {option.size} · {formatCop(option.priceCop)}
            </button>
          ))}
        </div>
      ) : null}
      <button type="button" className="btn btn-primary" onClick={onAdd}>
        Agregar al carrito · {formatCop(presentation.priceCop)}
      </button>
    </div>
  );
}
