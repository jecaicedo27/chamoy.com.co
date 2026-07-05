import type { Metadata } from "next";
import { ProductCards } from "@/components/ProductCards";
import { getProducts } from "@/lib/content";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Productos de chamoy en Colombia",
  description:
    "Sirope de chamoy y salsa de chamoy en presentaciones de 500 ml y 1 litro, con envío a todo Colombia.",
  alternates: { canonical: "/productos/" }
};

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", url: site.url }, { name: "Productos", url: `${site.url}/productos/` }])} />
      {products.map((product) => (
        <JsonLd data={productJsonLd(product)} key={product.slug} />
      ))}

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Productos</p>
            <h1>Salsa y sirope de chamoy hechos en Colombia.</h1>
            <p>
              Dos formatos, dos usos claros: sirope para bebidas y salsa para frutas, snacks,
              gomitas y toppings. Ambos con presentaciones de 500 ml y 1 litro.
            </p>
            <div className="mini-nav">
              <a className="btn btn-primary" href={whatsappUrl(whatsappMessages.buy)}>
                Pedir por WhatsApp
              </a>
            </div>
          </div>
          <aside className="card card-pad">
            <h3>Precios confirmados</h3>
            <p>500 ml por $35.000 COP. 1 litro por $55.000 COP. Envío a todo Colombia.</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ProductCards products={products} />
        </div>
      </section>
    </main>
  );
}
