import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Chamoy colombiano vs chamoy importado: precio, frescura y respaldo",
  description:
    "Marcas mexicanas de chamoy están llegando a Colombia. Comparamos chamoy fabricado en Colombia contra el importado: precio directo de fábrica, disponibilidad, asesoría local y cuándo conviene cada uno.",
  alternates: { canonical: "/guia/chamoy-colombiano-vs-importado/" }
};

const faqs = [
  {
    question: "¿El chamoy colombiano sabe igual que el mexicano?",
    answer:
      "El perfil es el mismo: dulce, ácido, salado y picosito. Nuestra receta está desarrollada y estandarizada en Colombia para los usos locales — mango biche, micheladas, cholados y granizados — con el mismo balance que hizo famoso al chamoy en México."
  },
  {
    question: "¿Por qué el chamoy importado cuesta más?",
    answer:
      "Un chamoy importado paga flete internacional, aranceles, nacionalización y los márgenes del importador y el distribuidor antes de llegar a tu negocio. El fabricado en Colombia se salta toda esa cadena: el precio sale directo de fábrica."
  },
  {
    question: "¿Qué pasa si mi negocio se queda sin producto?",
    answer:
      "Esa es la diferencia más importante para un negocio. Con producto importado dependes de que el importador tenga inventario y de los tiempos de aduana. Como fabricantes locales, producimos de forma continua y reponemos por WhatsApp sin esperar contenedores."
  },
  {
    question: "¿El Tajín compite con el chamoy?",
    answer:
      "No: se complementan. El Tajín es sal de chile en polvo y el chamoy es la salsa líquida o espesa. El escarchado clásico de michelada usa los dos — el borde se moja con sirope de chamoy y se reboza con sal de chile. Puedes usar nuestro chamoy con cualquier sal de chile del mercado."
  }
];

export default function VsImportadoPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", url: site.url },
          { name: "Guía del chamoy", url: `${site.url}/guia/` },
          { name: "Chamoy colombiano vs importado", url: `${site.url}/guia/chamoy-colombiano-vs-importado/` }
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Guía de compra</p>
            <h1>Chamoy colombiano vs chamoy importado</h1>
            <p>
              Las marcas mexicanas de chamoy y sal de chile — como El Chilerito o Tajín — ya están
              entrando a Colombia a través de importadores y grandes superficies. Es buena noticia:
              la categoría crece. Aquí te contamos, con honestidad, cuándo conviene el importado y
              cuándo el fabricado en Colombia.
            </p>
          </div>
          <aside className="card card-pad">
            <h3>Respuesta corta</h3>
            <p>
              Si compras para un negocio, el chamoy fabricado en Colombia gana en precio, reposición
              y asesoría. Si buscas una marca mexicana específica de recuerdo, el importado tiene
              sentido — cuando lo encuentres en stock.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">La comparación honesta</p>
              <h2>Lo que cambia entre fabricado aquí e importado.</h2>
            </div>
          </div>
          <div className="admin-table-scroll">
            <table className="compare-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Fabricado en Colombia (nosotros)</th>
                  <th>Importado de México</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Precio</td>
                  <td>Directo de fábrica: $35.000 el medio litro, $55.000 el litro, publicado y estable.</td>
                  <td>Suma flete internacional, aranceles y márgenes de importador y distribuidor. Rara vez publicado.</td>
                </tr>
                <tr>
                  <td>Disponibilidad</td>
                  <td>Producción continua local. Reposición por WhatsApp sin depender de contenedores.</td>
                  <td>Sujeta a inventario del importador y tiempos de aduana.</td>
                </tr>
                <tr>
                  <td>Compra directa</td>
                  <td>WhatsApp colombiano, envío a todo el país, sin mínimos para empezar.</td>
                  <td>Generalmente vía retail o distribuidores; contacto comercial en México.</td>
                </tr>
                <tr>
                  <td>Asesoría</td>
                  <td>Te ayudamos a escoger formato, porción y recetas para tu negocio, en tu horario.</td>
                  <td>La marca no atiende directamente al negocio pequeño colombiano.</td>
                </tr>
                <tr>
                  <td>Frescura</td>
                  <td>Del lote a tu negocio en días.</td>
                  <td>Semanas o meses entre producción, tránsito y bodega.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap split">
          <div>
            <p className="section-kicker">Cuándo sí y cuándo no</p>
            <h2>Elige con criterio, no por bandera.</h2>
            <p>
              <strong>Elige importado</strong> si tu cliente pide una marca mexicana específica por
              nostalgia, o si necesitas una variante puntual que solo esa marca produce.
            </p>
            <p>
              <strong>Elige fabricado en Colombia</strong> si vives del margen: bares, fruterías,
              heladerías y emprendimientos donde el costo por porción, la reposición confiable y el
              soporte local pesan más que el logo de la etiqueta.
            </p>
          </div>
          <aside className="panel">
            <h3>Haz tu propia prueba</h3>
            <p>
              Pide una presentación de 500 ml, móntala en tu producto estrella y compara sabor,
              rendimiento y costo por porción contra cualquier alternativa. Con la calculadora sabes
              el costo exacto antes de comprar.
            </p>
            <Link className="btn btn-secondary" href="/asesoria/#calculadora">
              Usar la calculadora
            </Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">FAQ</p>
              <h2>Preguntas de esta comparación.</h2>
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

      <section className="section alt">
        <div className="wrap">
          <div className="cta-band">
            <h2>Prueba el chamoy hecho en Colombia.</h2>
            <p>Sirope y salsa en 500 ml y 1 litro, precio directo de fábrica y envío a todo el país.</p>
            <div className="section-actions">
              <a className="btn btn-secondary" href={whatsappUrl(whatsappMessages.buy)} data-cta="vs-importado">
                Pedir por WhatsApp
              </a>
              <Link className="btn btn-primary" style={{ background: "#2c1717" }} href="/comprar/">
                Ver productos y precios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
