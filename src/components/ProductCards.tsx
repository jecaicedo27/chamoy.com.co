import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductCards({ products }: { products: Product[] }) {
  return (
    <div className="grid two">
      {products.map((product) => (
        <article className="card product-card" id={product.slug} key={product.slug}>
          <img className="card-image product-image" src={product.image} alt={product.imageAlt} loading="lazy" />
          <div className="product-topline">
            <span>{product.format}</span>
            <span>Desde ${product.presentations[0]?.priceCop.toLocaleString("es-CO")}</span>
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
          <Link className="btn btn-primary" href={`/productos/${product.slug}/`}>
            Ver opcion
          </Link>
        </article>
      ))}
    </div>
  );
}
