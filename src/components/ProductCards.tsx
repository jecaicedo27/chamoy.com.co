import Link from "next/link";
import { AddToCart } from "@/components/AddToCart";
import type { Product } from "@/lib/types";

export function ProductCards({ products }: { products: Product[] }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <article className="card product-card" id={product.slug} key={product.slug}>
          <img className="card-image product-image" src={product.image} alt={product.imageAlt} loading="lazy" />
          <div className="product-topline">
            <span>{product.format}</span>
            <span>
              {product.presentations.length
                ? `Desde $${product.presentations[0].priceCop.toLocaleString("es-CO")}`
                : "Cotiza por WhatsApp"}
            </span>
          </div>
          <div>
            <h3>{product.name}</h3>
            <p>{product.shortDescription}</p>
            <ul className="pill-list">
              {product.bestFor.map((use) => (
                <li key={use}>{use}</li>
              ))}
            </ul>
          </div>
          <AddToCart
            slug={product.slug}
            name={product.name}
            image={product.image}
            presentations={product.presentations}
            compact
          />
          <Link className="product-details-link" href={`/productos/${product.slug}/`}>
            Ver detalles →
          </Link>
        </article>
      ))}
    </div>
  );
}
