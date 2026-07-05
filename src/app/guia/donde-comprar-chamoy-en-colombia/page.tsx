import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/env";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "¿Dónde comprar chamoy en Colombia? Precios y opciones",
  description:
    "Dónde comprar chamoy en Colombia: precios reales, presentaciones y envíos a Bogotá, Medellín, Cali y todo el país.",
  alternates: { canonical: "/guia/donde-comprar-chamoy-en-colombia/" }
};

export default function DondeComprarChamoyPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", url: site.url },
          { name: "Guía del chamoy", url: `${site.url}/guia/` },
          { name: "Dónde comprar chamoy en Colombia", url: `${site.url}/guia/donde-comprar-chamoy-en-colombia/` }
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          headline: "¿Dónde comprar chamoy en Colombia? Precios y opciones",
          description: "Guía de compra de chamoy en Colombia: precios por presentación, dónde conseguirlo y envíos por ciudad.",
          url: `${site.url}/guia/donde-comprar-chamoy-en-colombia/`,
          image: "/assets/img/salsa-de-chamoy.webp"
        })}
      />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Compra en Colombia</p>
            <h1>¿Dónde comprar chamoy en Colombia? Precios y opciones en 2026.</h1>
            <p>
              Opciones reales, precios por presentación y qué tener en cuenta antes de pedir salsa
              o sirope de chamoy.
            </p>
          </div>
          <aside className="card card-pad">
            <h3>Precios reales</h3>
            <p>500 ml por $35.000 COP. 1 litro por $55.000 COP. Envíos a todo Colombia.</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <article className="wrap article-body">
          <p>
            Hasta hace poco, conseguir chamoy en Colombia era una odisea: había que buscar
            importadores de dulces mexicanos, pagar precios inflados por el envío internacional o
            conformarse con imitaciones. Eso cambió. En esta guía te contamos <strong>todas las opciones
            para comprar chamoy en Colombia</strong>, cuánto cuesta cada una y qué debes tener en cuenta
            antes de pedir.
          </p>

          <section>
            <h2>Opción 1: chamoy hecho en Colombia (nuestra recomendación)</h2>
            <p>
              En <strong>chamoy.com.co</strong> producimos salsa y sirope de chamoy en Colombia, con
              fruta real y el balance tradicional mexicano de dulce, ácido, sal y chile. Al ser
              producción local:
            </p>
            <ul className="check-list">
              <li>No pagas sobrecostos de importación ni aduana.</li>
              <li>El producto llega fresco, no con meses de bodega.</li>
              <li>El envío tarda días, no semanas.</li>
            </ul>
          </section>

          <section>
            <h2>Nuestros precios</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>500 ml</th>
                  <th>1 litro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Link href="/productos/salsa-de-chamoy/">Salsa de chamoy</Link> (espesa, para frutas y snacks)</td>
                  <td>$35.000</td>
                  <td>$55.000</td>
                </tr>
                <tr>
                  <td><Link href="/productos/sirope-de-chamoy/">Sirope de chamoy</Link> (líquido, para bebidas)</td>
                  <td>$35.000</td>
                  <td>$55.000</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>Opción 2: marcas mexicanas importadas</h2>
            <p>
              Marcas como <strong>Mega Chamoy</strong>, <strong>El Chilerito</strong> o <strong>Tajín Chamoy</strong>
              se consiguen en Colombia a través de marketplaces (MercadoLibre, Rappi) y algunas
              tiendas de productos mexicanos. Son buenas opciones si buscas una marca específica,
              pero ten en cuenta:
            </p>
            <ul className="check-list">
              <li>El precio por litro suele ser mayor por el costo de importación.</li>
              <li>La disponibilidad es irregular: hoy hay, mañana no.</li>
              <li>Verifica siempre la fecha de vencimiento — algunos lotes importados llevan mucho tiempo en bodega.</li>
            </ul>
          </section>

          <section>
            <h2>Opción 3: tiendas de dulces mexicanos en tu ciudad</h2>
            <p>
              En Bogotá, Medellín, Cali y Barranquilla existen dulcerías mexicanas físicas y por
              Instagram que venden chamoy junto con gomitas enchiladas y dulces de tamarindo. Son
              una buena opción para probar pequeñas cantidades, aunque el precio por mililitro suele
              ser el más alto de todas las opciones.
            </p>
          </section>

          <section>
            <h2>Envíos por ciudad</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Ciudad</th>
                  <th>Envío</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Bogotá</td><td>1–2 días hábiles</td></tr>
                <tr><td>Medellín</td><td>1–2 días hábiles</td></tr>
                <tr><td>Cali</td><td>1–2 días hábiles</td></tr>
                <tr><td>Barranquilla y Cartagena</td><td>2–3 días hábiles</td></tr>
                <tr><td>Resto del país</td><td>2–4 días hábiles</td></tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>¿Qué presentación te conviene?</h2>
            <ul className="check-list">
              <li><strong>¿Primera vez?</strong> Empieza con el tarro de 500 ml de <Link href="/productos/salsa-de-chamoy/">salsa</Link>: es el formato más versátil.</li>
              <li><strong>¿Amante de las micheladas?</strong> El <Link href="/productos/sirope-de-chamoy/">sirope</Link> de 500 ml te alcanza para más de 25 vasos escarchados.</li>
              <li><strong>¿Tienes un negocio?</strong> El litro a $55.000 es la mejor relación precio/mililitro. Pregúntanos por precios al por mayor.</li>
            </ul>
          </section>

          <aside className="cta-band">
            <p className="section-kicker" style={{ color: "#ffd56a" }}>Compra hoy</p>
            <h2>Pide tu chamoy hoy</h2>
            <p>Escríbenos por WhatsApp con tu ciudad y la presentación que quieres, y te confirmamos el envío de inmediato.</p>
            <div className="section-actions">
              <Link className="btn btn-secondary" href="/productos/">Ver productos</Link>
              <a className="btn btn-primary" style={{ background: "#2c1717" }} href={whatsappUrl(whatsappMessages.buy)}>Pedir por WhatsApp</a>
            </div>
          </aside>
        </article>
      </section>
    </main>
  );
}
