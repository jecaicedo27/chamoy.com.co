import Link from "next/link";
import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { ProductCards } from "@/components/ProductCards";
import { RecipeGrid } from "@/components/RecipeGrid";
import { getFaqs, getProducts, getRecipes } from "@/lib/content";
import { JsonLd, chamoyTermJsonLd, homeWebPageJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Chamoy en Colombia: qué es, usos, recetas y dónde comprar",
  description:
    "Qué es el chamoy, cómo se usa en Colombia y dónde comprar sirope de chamoy y salsa de chamoy para micheladas, frutas, sodas y negocios.",
  alternates: { canonical: "/" }
};

export default async function HomePage() {
  const [products, recipes, faqs] = await Promise.all([getProducts(), getRecipes(), getFaqs()]);

  return (
    <main>
      <JsonLd data={homeWebPageJsonLd()} />
      <JsonLd data={chamoyTermJsonLd()} />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <img src="/assets/img/hero-chamoy.webp" alt="" />
        </div>
        <div className="hero-inner">
          <span className="eyebrow">Chamoy en Colombia</span>
          <h1 id="hero-title">Chamoy: sirope y salsa para bebidas, frutas y negocios.</h1>
          <p className="hero-lead">
            Somos fabricantes: producimos sirope y salsa de chamoy en Colombia y te ayudamos a
            escoger el formato para micheladas, mango biche, sodas, granizados y antojos.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/comprar/">
              Comprar chamoy
            </Link>
            <Link className="btn btn-secondary" href="/asesoria/">
              Pedir asesoria
            </Link>
          </div>
        </div>
      </section>

      <div className="quick-strip" aria-label="Resumen rapido">
        <article className="quick-card">
          <strong>Qué es</strong>
          <p>Condimento mexicano dulce, acido, salado y ligeramente picante.</p>
        </article>
        <article className="quick-card">
          <strong>Cómo se usa</strong>
          <p>Frutas, micheladas, sodas, granizados, helados, gomitas y snacks.</p>
        </article>
        <article className="quick-card">
          <strong>Dónde comprar</strong>
          <p>Directo de fábrica, con asesoria por WhatsApp y envío a todo Colombia.</p>
        </article>
      </div>

      <section className="section" id="fabricantes">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Producción propia</p>
              <h2>Somos fabricantes: así nace Skarchamoy.</h2>
            </div>
            <p>
              Skarchamoy es nuestra marca de chamoy, producida en Colombia. Ser fabricantes
              significa precio directo de fábrica, receta consistente en cada lote y capacidad
              para atender negocios que compran todos los meses.
            </p>
          </div>
          <div className="grid three">
            <article className="card card-pad">
              <h3>Precio directo</h3>
              <p>Sin intermediarios ni importadores: el precio que ves viene de la fábrica, y mejora al por mayor.</p>
            </article>
            <article className="card card-pad">
              <h3>Sabor consistente</h3>
              <p>Receta estandarizada lote a lote, para que tu michelada o tu mango sepan igual hoy y en seis meses.</p>
            </article>
            <article className="card card-pad">
              <h3>Volumen para negocios</h3>
              <p>Capacidad de producción para bares, fruterías, heladerías y distribuidores, con reposición recurrente.</p>
            </article>
          </div>
          <div className="section-actions" style={{ marginTop: 24 }}>
            <Link className="btn btn-secondary" href="/guia/chamoy-colombiano-vs-importado/">
              ¿Colombiano o importado? Compara antes de comprar
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt" id="que-es-chamoy">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Respuesta directa</p>
              <h2>¿Qué es el chamoy?</h2>
            </div>
            <p>
              El chamoy es una salsa o condimento mexicano de sabor dulce, acido, salado y
              ligeramente picante. Puede ser liquido, espeso o tipo pasta, y se usa para darle
              contraste a frutas, snacks, bebidas, micheladas, helados y antojos.
            </p>
          </div>
          <div className="grid three">
            <article className="card card-pad">
              <h3>Sabor</h3>
              <p>Dulce, acido, salado y picante suave. Ese contraste es lo que lo vuelve tan buscado.</p>
            </article>
            <article className="card card-pad">
              <h3>Textura</h3>
              <p>Puede venir como sirope fluido para bebidas o como salsa con cuerpo para toppings.</p>
            </article>
            <article className="card card-pad">
              <h3>Uso en Colombia</h3>
              <p>Funciona en mango biche, fruta picada, micheladas, sodas, granizados y snacks.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Elige rapido</p>
              <h2>Dos formatos, usos distintos.</h2>
            </div>
            <p>
              Si va en bebida, elige sirope. Si va sobre fruta, borde o snack, elige salsa.
              Esa decision hace mas facil comprar bien desde el primer pedido.
            </p>
          </div>
          <ProductCards products={products} />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Guía del chamoy</p>
              <h2>Aprende antes de comprar.</h2>
            </div>
            <p>
              Dos guías profundas para resolver intención informativa y transaccional:
              qué es el chamoy y dónde comprarlo en Colombia.
            </p>
          </div>
          <div className="grid two">
            <Link className="card use-card" href="/guia/que-es-el-chamoy/">
              <h3>¿Qué es el chamoy?</h3>
              <p>Origen, sabor, ingredientes, tipos y usos para frutas, bebidas y dulces.</p>
            </Link>
            <Link className="card use-card" href="/guia/donde-comprar-chamoy-en-colombia/">
              <h3>Dónde comprar chamoy</h3>
              <p>Precios reales, presentaciones y envíos a Bogotá, Medellín, Cali y todo Colombia.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Para cada busqueda</p>
              <h2>Compra, asesoria y recetas en un solo lugar.</h2>
            </div>
            <p>
              El sitio esta armado para resolver tres preguntas: donde comprar, como usarlo
              y que receta conviene para vender.
            </p>
          </div>
          <div className="grid four">
            <Link className="card use-card" href="/comprar/">
              <h3>Quiero comprar chamoy</h3>
              <p>Formatos, usos recomendados y pedido por WhatsApp.</p>
            </Link>
            <Link className="card use-card" href="/asesoria/">
              <h3>Tengo un negocio</h3>
              <p>Ayuda para escoger producto, porcion y menu rentable.</p>
            </Link>
            <Link className="card use-card" href="/recetas/">
              <h3>Necesito recetas</h3>
              <p>Ideas para micheladas, frutas, sodas, granizados y antojos.</p>
            </Link>
            <Link className="card use-card" href="/guia/">
              <h3>Quiero aprender</h3>
              <p>Guías completas sobre origen, sabor, tipos, compra y usos del chamoy.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="section-kicker">Asesoria comercial</p>
            <h2>Si vendes bebidas, no compres a ciegas.</h2>
            <p>
              El chamoy puede ser topping, saborizante, borde de vaso o producto estrella.
              Te orientamos para no perder margen por exceso de dosis ni quedarte corto de sabor.
            </p>
            <ul className="check-list">
              <li>Recomendacion de sirope o salsa segun tu menu.</li>
              <li>Ideas para combos de michelada, fruta, soda y granizado.</li>
              <li>Guia de porcion para estandarizar ventas.</li>
              <li>Opciones para tiendas, bares, heladerias, fruteras y eventos.</li>
            </ul>
          </div>
          <aside className="panel">
            <h3>Respuesta rapida por WhatsApp</h3>
            <p>
              Envia tu ciudad, tipo de negocio y producto que quieres preparar. Te respondemos con
              formato sugerido y siguiente paso de compra.
            </p>
            <a className="btn btn-secondary" href={whatsappUrl(whatsappMessages.advice)}>
              Pedir asesoria
            </a>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Recetas que venden</p>
              <h2>Ideas simples para ponerlo en carta.</h2>
            </div>
            <p>
              Recetas pensadas para negocios en Colombia: ingredientes faciles, preparacion rapida
              y resultado vistoso.
            </p>
          </div>
          <RecipeGrid recipes={recipes} />
          <div className="section-actions" style={{ marginTop: 24 }}>
            <Link className="btn btn-primary" href="/recetas/">
              Ver recetas
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">FAQ</p>
              <h2>Preguntas antes de comprar.</h2>
            </div>
            <p>Respuestas cortas para resolver dudas comunes de compra, uso y despacho.</p>
          </div>
          <FaqList faqs={faqs.slice(0, 4)} />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="cta-band">
            <p className="section-kicker" style={{ color: "#ffd56a" }}>
              Compra guiada
            </p>
            <h2>Cuéntanos que vendes y te decimos que chamoy pedir.</h2>
            <p>
              Una respuesta rapida evita comprar el formato equivocado. Escríbenos si vendes
              micheladas, frutas, helados, cocteles, sodas o snacks.
            </p>
            <div className="section-actions">
              <a className="btn btn-secondary" href={whatsappUrl(whatsappMessages.buy)}>
                Cotizar por WhatsApp
              </a>
              <Link className="btn btn-primary" style={{ background: "#2c1717" }} href="/comprar/">
                Ver opciones
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
