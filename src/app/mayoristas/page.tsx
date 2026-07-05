import Link from "next/link";
import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Mayoristas y distribuidores de chamoy | Directo de fábrica",
  description:
    "Compra chamoy al por mayor directo del fabricante: sirope, salsa, gel y polvo agridulce Skarchamoy con registro INVIMA, precios escalonados por volumen y reposición garantizada para distribuidores, dulcerías y cadenas.",
  alternates: { canonical: "/mayoristas/" }
};

const faqs = [
  {
    question: "¿Cuál es el pedido mínimo para precio mayorista?",
    answer:
      "Depende del producto y tu ciudad. Escríbenos por WhatsApp con tu volumen mensual estimado y te armamos la escala de precios: a mayor recurrencia y volumen, mejor precio directo de fábrica."
  },
  {
    question: "¿Tienen capacidad para atender una cadena o distribuidor grande?",
    answer:
      "Sí. Somos fabricantes con producción continua en Colombia: no dependemos de importaciones ni contenedores, así que podemos comprometernos con reposición programada y volúmenes crecientes."
  },
  {
    question: "¿Los productos tienen registro sanitario?",
    answer:
      "Sí: el sirope de chamoy Skarchamoy tiene notificación sanitaria INVIMA NSA-2482-2025, el gel de chamoy RSA-0037682-2025 y el polvo Skarchalito NSA-0324-2025. Documentación disponible para tu área de compras."
  },
  {
    question: "¿Hacen maquila o marca blanca?",
    answer:
      "Si tu negocio necesita producto con tu propia marca o una formulación a la medida, hablemos: como fabricantes podemos evaluar proyectos de maquila según volumen. Escríbenos por WhatsApp con tu caso."
  }
];

const wholesaleMessage =
  "Hola, quiero precios mayoristas de Skarchamoy. Mi negocio es: [tipo] en [ciudad], volumen mensual estimado: [cantidad].";

export default function MayoristasPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", url: site.url },
          { name: "Mayoristas", url: `${site.url}/mayoristas/` }
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Venta al por mayor</p>
            <h1>Chamoy al por mayor, directo del fabricante</h1>
            <p>
              Somos la fábrica de Skarchamoy: sirope, salsa, gel escarchador y polvo agridulce
              picante, producidos en Colombia con registro INVIMA. Si compras para revender o para
              una operación grande, aquí no hay intermediarios que inflen el precio.
            </p>
            <div className="mini-nav">
              <a className="btn btn-primary" href={whatsappUrl(wholesaleMessage)} data-cta="mayoristas-hero">
                Pedir precios mayoristas
              </a>
              <Link className="btn btn-secondary" href="/comprar/">
                Ver la línea de productos
              </Link>
            </div>
          </div>
          <LeadForm sourcePath="/mayoristas/" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Para quién es</p>
              <h2>Negocios que compran en serio.</h2>
            </div>
            <p>
              El mercado del chamoy en Colombia está despegando — las marcas importadas ya están
              entrando al retail. Quien lo distribuya primero con producto local se queda con la
              categoría.
            </p>
          </div>
          <div className="grid three">
            <article className="card card-pad">
              <h3>Distribuidores</h3>
              <p>
                Distribuidores de insumos para bares, licoreras, dulcerías mayoristas y
                comercializadoras de alimentos: margen de reventa real por comprar directo de
                fábrica, con marca registrada y respaldo sanitario.
              </p>
            </article>
            <article className="card card-pad">
              <h3>Cadenas y franquicias</h3>
              <p>
                Fruterías, heladerías, michelerías y dulcerías con varias sedes: precio por
                volumen, sabor idéntico en cada lote y reposición programada para que ninguna sede
                se quede sin producto.
              </p>
            </article>
            <article className="card card-pad">
              <h3>Food service y eventos</h3>
              <p>
                Operadores de eventos, catering, estadios y ferias: la línea completa para montar
                barras de micheladas, estaciones de fruta y antojos mexicanos a escala.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap split">
          <div>
            <p className="section-kicker">Por qué directo de fábrica</p>
            <h2>Lo que un importador no te puede prometer.</h2>
            <ul className="check-list">
              <li>Precios escalonados por volumen, sin cadena de importación de por medio.</li>
              <li>Producción continua en Colombia: reposición sin aduanas ni contenedores.</li>
              <li>Registros INVIMA propios: sirope NSA-2482-2025, gel RSA-0037682-2025, Skarchalito NSA-0324-2025.</li>
              <li>Cuatro productos complementarios que se venden entre sí (el gel pide polvo, el polvo pide gel).</li>
              <li>Interlocución directa con el fabricante: ajustes de presentación y proyectos de maquila.</li>
            </ul>
          </div>
          <aside className="panel">
            <h3>¿Marca blanca o maquila?</h3>
            <p>
              Si necesitas chamoy con tu propia marca o una formulación a la medida de tu cadena,
              cuéntanos volumen y formato. Como fabricantes podemos evaluar proyectos de maquila.
            </p>
            <a className="btn btn-secondary" href={whatsappUrl("Hola, me interesa maquila / marca blanca de chamoy. Mi caso es:")}>
              Proponer un proyecto
            </a>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">FAQ mayorista</p>
              <h2>Lo que pregunta un comprador grande.</h2>
            </div>
          </div>
          <div className="faq">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
