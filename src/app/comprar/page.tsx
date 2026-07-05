import Link from "next/link";
import type { Metadata } from "next";
import { ProductCards } from "@/components/ProductCards";
import { getFaqs, getProducts } from "@/lib/content";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { FaqList } from "@/components/FaqList";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Comprar chamoy en Colombia",
  description:
    "Compra sirope de chamoy y salsa de chamoy en Colombia. Elige el formato correcto para micheladas, frutas, snacks, heladerias y negocios.",
  alternates: { canonical: "/comprar/" }
};

export default async function ComprarPage() {
  const [products, faqs] = await Promise.all([getProducts(), getFaqs("comprar")]);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", url: site.url }, { name: "Comprar", url: `${site.url}/comprar/` }])} />
      {products.map((product) => (
        <JsonLd data={productJsonLd(product)} key={product.slug} />
      ))}

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Compra directa</p>
            <h1>Comprar chamoy en Colombia sin escoger a ciegas.</h1>
            <p>
              Elige sirope si vas a preparar bebidas. Elige salsa si necesitas cobertura sobre
              frutas, snacks, helados o bordes de vaso. Si tu negocio usa ambos, cotizamos combo.
            </p>
            <div className="mini-nav">
              <a className="btn btn-primary" href={whatsappUrl(whatsappMessages.buy)}>
                Cotizar por WhatsApp
              </a>
              <Link className="btn btn-secondary" href="/asesoria/">
                Necesito asesoria
              </Link>
            </div>
          </div>
          <aside className="card card-pad">
            <h3>Decision en 15 segundos</h3>
            <p>
              Bebidas: sirope. Toppings y fruta: salsa. Barra completa: ambos.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Catalogo inicial</p>
              <h2>Formatos disponibles.</h2>
            </div>
            <p>Precios confirmados: 500 ml por $35.000 COP y 1 litro por $55.000 COP.</p>
          </div>
          <ProductCards products={products} />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Comparacion</p>
              <h2>Que formato pedir?</h2>
            </div>
            <p>Usa esta tabla para evitar comprar el producto equivocado.</p>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Necesidad</th>
                <th>Mejor opcion</th>
                <th>Por que</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Micheladas y cocteles</td>
                <td>Sirope + salsa</td>
                <td>Salsa para el borde, sirope para sabor dentro de la bebida.</td>
              </tr>
              <tr>
                <td>Mango biche o fruta picada</td>
                <td>Salsa de chamoy</td>
                <td>Cubre mejor la fruta y mantiene presencia visual.</td>
              </tr>
              <tr>
                <td>Sodas y granizados</td>
                <td>Sirope de chamoy</td>
                <td>Se mezcla mejor con hielo, soda y bases liquidas.</td>
              </tr>
              <tr>
                <td>Helados, gomitas y snacks</td>
                <td>Salsa de chamoy</td>
                <td>Funciona como topping y aporta textura.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Dudas de compra</p>
              <h2>Preguntas frecuentes.</h2>
            </div>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
