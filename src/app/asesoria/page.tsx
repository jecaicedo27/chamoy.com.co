import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { LeadForm } from "@/components/LeadForm";
import { PortionCalculator } from "@/components/PortionCalculator";
import { getFaqs } from "@/lib/content";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Asesoria para vender productos con chamoy",
  description:
    "Asesoria para usar sirope y salsa de chamoy en bares, fruteras, heladerias, eventos y negocios de bebidas en Colombia.",
  alternates: { canonical: "/asesoria/" }
};

export default async function AsesoriaPage() {
  const faqs = await getFaqs("asesoria");

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", url: site.url }, { name: "Asesoria", url: `${site.url}/asesoria/` }])} />
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Para negocios</p>
            <h1>Asesoria para vender mas con chamoy.</h1>
            <p>
              Si tienes bar, frutera, heladeria, restaurante, evento o emprendimiento de bebidas,
              te ayudamos a escoger formato, porcion y receta antes de comprar.
            </p>
            <div className="mini-nav">
              <a className="btn btn-primary" href={whatsappUrl(whatsappMessages.advice)}>
                Hablar por WhatsApp
              </a>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Metodo</p>
              <h2>La asesoria responde tres cosas.</h2>
            </div>
            <p>Formato, dosis y receta. Eso es lo que define sabor, margen y velocidad de servicio.</p>
          </div>
          <div className="grid three">
            <article className="card card-pad">
              <h3>1. Que formato usar</h3>
              <p>Sirope para bebidas, salsa para topping, ambos para micheladas completas.</p>
            </article>
            <article className="card card-pad">
              <h3>2. Como dosificar</h3>
              <p>Definimos una porcion base para que el sabor sea consistente y el costo no se dispare.</p>
            </article>
            <article className="card card-pad">
              <h3>3. Que vender</h3>
              <p>Convertimos el producto en recetas concretas para tu menu y tipo de cliente.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap split">
          <div>
            <p className="section-kicker">Haz la cuenta</p>
            <h2>Calcula tu pedido antes de escribirnos.</h2>
            <p>
              Mueve el control al volumen que vendes hoy (o al que quieres vender) y te decimos
              cuánto chamoy necesitas al mes, cuánto cuesta y cuánto le carga a cada porción.
            </p>
            <ul className="check-list">
              <li>Rendimientos reales por litro, no promesas.</li>
              <li>El costo por porción baja el miedo a &quot;probar&quot; el producto.</li>
              <li>El resultado llega prellenado al WhatsApp para cotizar en un mensaje.</li>
            </ul>
          </div>
          <PortionCalculator />
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="section-kicker">Casos de uso</p>
            <h2>Negocios donde el chamoy tiene salida.</h2>
            <ul className="check-list">
              <li>Bares: micheladas, cocteles tropicales y escarchados.</li>
              <li>Fruteras: mango biche, fruta picada, vasos mixtos y snacks.</li>
              <li>Heladerias: topping para helados, granizados y paletas.</li>
              <li>Eventos: barras de bebidas y estaciones de antojos.</li>
            </ul>
          </div>
          <aside className="panel">
            <h3>No necesitas saberlo todo.</h3>
            <p>
              Envia una foto o lista de tu menu por WhatsApp. Con eso podemos sugerir que producto
              probar primero y como presentarlo.
            </p>
            <a className="btn btn-secondary" href={whatsappUrl(whatsappMessages.advice)}>
              Enviar mi caso
            </a>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">FAQ</p>
              <h2>Dudas de asesoria.</h2>
            </div>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
