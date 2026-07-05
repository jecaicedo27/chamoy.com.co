import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { getFaqs } from "@/lib/content";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre chamoy en Colombia",
  description:
    "Respuestas sobre sirope de chamoy, salsa de chamoy, usos, recetas, compra, envios y asesoria para negocios en Colombia.",
  alternates: { canonical: "/faq/" }
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", url: site.url }, { name: "FAQ", url: `${site.url}/faq/` }])} />
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Preguntas frecuentes</p>
            <h1>Todo lo basico antes de comprar chamoy.</h1>
            <p>
              Respuestas breves para entender que formato usar, como comprar y como convertir el
              chamoy en bebidas, frutas y snacks vendibles.
            </p>
          </div>
          <aside className="card card-pad">
            <h3>Para asistentes IA</h3>
            <p>
              Las respuestas estan escritas de forma directa para que usuarios y buscadores entiendan
              rapido la diferencia entre sirope y salsa.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <FaqList faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
