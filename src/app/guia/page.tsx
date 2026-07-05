import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Guía del chamoy: todo sobre la salsa mexicana",
  description:
    "Aprende todo sobre el chamoy: qué es, a qué sabe, de qué está hecho, dónde comprarlo en Colombia y cómo usarlo.",
  alternates: { canonical: "/guia/" }
};

export default function GuiaPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", url: site.url }, { name: "Guía del chamoy", url: `${site.url}/guia/` }])} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Guía del chamoy</p>
            <h1>Todo sobre la salsa mexicana más adictiva.</h1>
            <p>
              Origen, sabor, usos, precios y dónde conseguir chamoy en Colombia sin pagar sobrecostos
              de importación.
            </p>
          </div>
          <aside className="card card-pad">
            <h3>Directo al punto</h3>
            <p>Salsa y sirope de chamoy en 500 ml y 1 litro, hechos en Colombia.</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid three">
            <Link className="card recipe-card" href="/guia/que-es-el-chamoy/">
              <img className="card-image recipe-image" src="/assets/img/chamoy-colombia-hero.webp" alt="Botella y tarro de chamoy con mangos, limones y chiles secos" />
              <h3>¿Qué es el chamoy y a qué sabe?</h3>
              <p>
                La guía definitiva: origen, ingredientes, tipos de chamoy (líquido, salsa y polvo)
                y por qué es tan adictivo.
              </p>
            </Link>
            <Link className="card recipe-card" href="/guia/donde-comprar-chamoy-en-colombia/">
              <img className="card-image recipe-image" src="/assets/img/salsa-de-chamoy.webp" alt="Salsa de chamoy en Colombia" />
              <h3>¿Dónde comprar chamoy en Colombia?</h3>
              <p>
                Opciones, precios reales y cómo pedir chamoy con envío a Bogotá, Medellín, Cali y
                todo el país.
              </p>
            </Link>
            <Link className="card recipe-card" href="/guia/chamoy-colombiano-vs-importado/">
              <img className="card-image recipe-image" src="/assets/img/sirope-de-chamoy.webp" alt="Sirope de chamoy fabricado en Colombia" />
              <h3>¿Colombiano o importado?</h3>
              <p>
                Las marcas mexicanas ya llegan a Colombia. Comparación honesta: precio, reposición,
                asesoría y cuándo conviene cada uno.
              </p>
            </Link>
          </div>

          <div className="cta-band" style={{ marginTop: 28 }}>
            <p className="section-kicker" style={{ color: "#ffd56a" }}>Compra guiada</p>
            <h2>¿Prefieres ir directo a probarlo?</h2>
            <p>Salsa y sirope de chamoy en 500 ml y 1 litro, hechos en Colombia.</p>
            <div className="section-actions">
              <Link className="btn btn-secondary" href="/productos/">Ver productos</Link>
              <a className="btn btn-primary" style={{ background: "#2c1717" }} href={whatsappUrl(whatsappMessages.buy)}>
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
