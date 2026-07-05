import Link from "next/link";
import type { Metadata } from "next";
import { RichText } from "@/components/RichText";
import { site } from "@/lib/env";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

const guideFaqs = [
  {
    question: "¿Qué es el chamoy?",
    answer:
      "El chamoy es una salsa mexicana agridulce elaborada a base de fruta deshidratada o encurtida, chile, jugo de limón, sal y azúcar. Combina cuatro sabores a la vez: dulce, ácido, salado y picante.",
    page: "guia"
  },
  {
    question: "¿A qué sabe el chamoy?",
    answer:
      "El chamoy sabe agridulce, ácido, ligeramente salado y picante al mismo tiempo. Primero se siente dulce y frutal, luego ácido, después salado y al final aparece el chile.",
    page: "guia"
  },
  {
    question: "¿De qué está hecho el chamoy?",
    answer:
      "Los ingredientes tradicionales del chamoy son fruta (ciruela, albaricoque, mango o tamarindo), chile en polvo o pasta de chile, jugo de limón, sal y azúcar.",
    page: "guia"
  },
  {
    question: "¿El chamoy pica mucho?",
    answer:
      "Tiene un picante entre suave y medio. Como el chile está equilibrado con el dulce y el ácido, la mayoría de las personas lo disfrutan sin problema.",
    page: "guia"
  }
];

export const metadata: Metadata = {
  title: "¿Qué es el chamoy? Origen, sabor e ingredientes",
  description:
    "El chamoy es una salsa mexicana agridulce hecha de fruta, chile, limón y sal. Descubre a qué sabe, sus tipos y cómo se usa.",
  alternates: { canonical: "/guia/que-es-el-chamoy/" }
};

export default function QueEsElChamoyPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", url: site.url },
          { name: "Guía del chamoy", url: `${site.url}/guia/` },
          { name: "Qué es el chamoy", url: `${site.url}/guia/que-es-el-chamoy/` }
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          headline: "¿Qué es el chamoy? Origen, sabor e ingredientes",
          description: "Guía completa sobre el chamoy: qué es, a qué sabe, de qué está hecho, tipos y usos.",
          url: `${site.url}/guia/que-es-el-chamoy/`,
          image: "/assets/img/chamoy-colombia-hero.webp"
        })}
      />
      <JsonLd data={faqJsonLd(guideFaqs)} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Guía completa</p>
            <h1>¿Qué es el chamoy? La guía completa de la salsa mexicana más adictiva.</h1>
            <p>
              Origen, sabor, ingredientes, tipos y usos del chamoy para entender por qué funciona tan
              bien en frutas, bebidas, dulces y snacks.
            </p>
          </div>
          <aside className="card card-pad">
            <h3>Respuesta corta</h3>
            <p>Fruta, chile, limón, sal y azúcar: dulce, ácido, salado y picante a la vez.</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <article className="wrap article-body">
          <img className="article-image" src="/assets/img/chamoy-colombia-hero.webp" alt="Botella de sirope y tarro de salsa de chamoy rodeados de mangos, limones y chiles secos" />

          <RichText
            className="rich-text"
            html={`<p><strong>El chamoy es una salsa mexicana agridulce elaborada a base de fruta, chile, jugo de limón, sal y azúcar.</strong> Su característica única es que combina cuatro sabores al mismo tiempo — dulce, ácido, salado y picante — y esa mezcla es exactamente lo que lo hace tan adictivo. En México se le pone a todo: frutas, gomitas, papas, raspados, micheladas y hasta helados. Y desde hace unos años, gracias a TikTok, está conquistando Colombia.</p>`}
          />

          <section>
            <h2>El origen del chamoy: de China a México (y ahora a Colombia)</h2>
            <p>
              Aunque hoy es un ícono de la gastronomía callejera mexicana, el chamoy tiene raíces
              asiáticas. Su antecesor es el <em>see mui</em>, una ciruela seca, salada y encurtida
              que llegó a México con la migración china y japonesa a comienzos del siglo XX. Los
              mexicanos adoptaron esa fruta encurtida, le sumaron chile y limón — como hacen con
              casi todo — y nació el chamoy tal como lo conocemos.
            </p>
            <p>
              Primero fue un dulce (la fruta seca conocida como <em>chamoy</em> o <em>saladito</em>),
              después un polvo, y finalmente la salsa líquida que hoy baña frutas y bebidas en todo
              el continente.
            </p>
          </section>

          <section>
            <h2>¿A qué sabe el chamoy?</h2>
            <p>
              Si nunca lo has probado, imagina esto: el primer contacto es <strong>dulce y frutal</strong>,
              como una mermelada ligera. Enseguida aparece una <strong>acidez cítrica</strong> que
              hace salivar, un fondo <strong>salado</strong> que intensifica todo, y al final un
              <strong> picante suave</strong> que invita al siguiente bocado. Esa secuencia de sabores
              activa varios receptores del gusto a la vez — por eso es tan difícil parar.
            </p>
            <aside className="card card-pad">
              <p><strong>Dato:</strong> en México a esta sensación le dicen "enchilarse rico": ese punto donde pica, pero en lugar de parar, quieres más.</p>
            </aside>
          </section>

          <section>
            <h2>¿De qué está hecho el chamoy?</h2>
            <p>La receta tradicional lleva cinco ingredientes básicos:</p>
            <ul className="check-list">
              <li><strong>Fruta:</strong> ciruela, albaricoque (chabacano), mango o tamarindo. Es la base del dulzor y del cuerpo de la salsa.</li>
              <li><strong>Chile:</strong> generalmente chile ancho, guajillo o chile en polvo. Aporta el picante y el color rojo característico.</li>
              <li><strong>Jugo de limón:</strong> la acidez que define al chamoy.</li>
              <li><strong>Sal:</strong> potencia todos los demás sabores.</li>
              <li><strong>Azúcar:</strong> equilibra el picante y la acidez.</li>
            </ul>
            <p>
              ¿Quieres verlo en acción? Tenemos una <Link href="/recetas/como-hacer-chamoy-casero/">receta de chamoy casero paso a paso</Link>. Y si prefieres el resultado sin el trabajo, nuestra <Link href="/productos/salsa-de-chamoy/">salsa de chamoy</Link> se hace en Colombia con fruta real.
            </p>
          </section>

          <section>
            <h2>Los 3 tipos de chamoy</h2>
            <div className="grid three">
              <article className="card card-pad">
                <h3>1. Chamoy líquido o sirope</h3>
                <p>Fluido, ideal para bebidas: escarchar vasos de michelada, bañar raspados y granizados, preparar mangonadas. Es el que usan los bares micheleros. <Link href="/productos/sirope-de-chamoy/">Así es nuestro sirope de chamoy</Link>.</p>
              </article>
              <article className="card card-pad">
                <h3>2. Salsa de chamoy</h3>
                <p>Más espesa y con cuerpo. Se adhiere a la fruta picada, al mango biche, a las gomitas y a los snacks. Es el formato más versátil para comer. <Link href="/productos/salsa-de-chamoy/">Conoce nuestra salsa de chamoy</Link>.</p>
              </article>
              <article className="card card-pad">
                <h3>3. Chamoy en polvo</h3>
                <p>Fruta deshidratada molida con chile y sal (como el clásico "miguelito"). Se espolvorea sobre fruta, paletas y dulces.</p>
              </article>
            </div>
          </section>

          <section>
            <h2>¿Con qué se come el chamoy?</h2>
            <ul className="check-list">
              <li><strong>Frutas:</strong> mango biche, piña, sandía, fresas, manzana verde y pepino. <Link href="/recetas/mango-con-chamoy-y-tajin/">El mango con chamoy y tajín</Link> es la puerta de entrada perfecta.</li>
              <li><strong>Bebidas:</strong> <Link href="/recetas/michelada-con-chamoy/">micheladas</Link>, cerveza preparada, margaritas y la famosa <Link href="/recetas/mangonada/">mangonada</Link>.</li>
              <li><strong>Dulces:</strong> <Link href="/recetas/gomitas-enchiladas-con-chamoy/">gomitas enchiladas</Link>, paletas y dulces de tamarindo.</li>
              <li><strong>Snacks:</strong> papas fritas, palomitas, chicharrones y cueritos.</li>
            </ul>
          </section>

          <section>
            <h2>Preguntas frecuentes sobre el chamoy</h2>
            <div className="faq">
              {guideFaqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
              <details>
                <summary>¿Cómo se conserva el chamoy?</summary>
                <p>Cerrado, en un lugar fresco y seco. Una vez abierto, guárdalo refrigerado y consúmelo en 2–3 meses. Su acidez y su sal son conservantes naturales.</p>
              </details>
              <details>
                <summary>¿Dónde puedo comprar chamoy en Colombia?</summary>
                <p>Puedes pedirlo directamente en esta página: producimos salsa y sirope de chamoy en Colombia, en tarros de 500 ml ($35.000) y 1 litro ($55.000), con envío a todo el país. También te contamos todas las opciones para comprar chamoy en Colombia.</p>
              </details>
            </div>
          </section>

          <aside className="cta-band">
            <p className="section-kicker" style={{ color: "#ffd56a" }}>Compra guiada</p>
            <h2>Deja de leer sobre chamoy. Pruébalo.</h2>
            <p>Salsa y sirope de chamoy hechos en Colombia, con envío a todo el país.</p>
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
