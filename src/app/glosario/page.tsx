import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, glossaryJsonLd } from "@/lib/jsonld";
import type { GlossaryTerm } from "@/lib/types";

export const metadata: Metadata = {
  title: "Glosario del chamoy: términos de lo picante mexicano en Colombia",
  description:
    "Qué significa chamoy, mangonada, escarchado, tajín, mango biche y los demás términos del universo agridulce y picosito mexicano, explicados para Colombia.",
  alternates: { canonical: "/glosario/" }
};

const terms: GlossaryTerm[] = [
  {
    slug: "chamoy",
    name: "Chamoy",
    definition:
      "Salsa o condimento mexicano de sabor dulce, ácido, salado y ligeramente picante, hecho a base de fruta (ciruela, albaricoque o tamarindo), chile, limón y sal. Se usa sobre frutas, snacks, bebidas, micheladas y postres.",
    related: { label: "Qué es el chamoy: guía completa", href: "/guia/que-es-el-chamoy/" }
  },
  {
    slug: "sirope-de-chamoy",
    name: "Sirope de chamoy",
    definition:
      "Versión líquida y fluida del chamoy, pensada para bebidas: se mezcla con granizados, sodas y cerveza, y es el formato correcto para escarchar vasos de michelada de forma rápida y pareja.",
    related: { label: "Ver sirope de chamoy", href: "/productos/sirope-de-chamoy/" }
  },
  {
    slug: "salsa-de-chamoy",
    name: "Salsa de chamoy",
    definition:
      "Versión espesa y con cuerpo del chamoy. Se adhiere a la fruta y a los snacks sin escurrirse de inmediato, por eso es el formato para mango biche, vasos de fruta, gomitas, helados y toppings.",
    related: { label: "Ver salsa de chamoy", href: "/productos/salsa-de-chamoy/" }
  },
  {
    slug: "mangonada",
    name: "Mangonada (chamoyada)",
    definition:
      "Bebida-postre mexicana de mango: granizado o helado de mango servido en capas con chamoy, sal de chile y mango fresco picado. También se le dice chamoyada cuando se hace con otras frutas.",
    related: { label: "Receta de mangonada", href: "/recetas/mangonada/" }
  },
  {
    slug: "michelada",
    name: "Michelada",
    definition:
      "Cerveza preparada mexicana. En su versión con chamoy lleva el vaso escarchado con sirope de chamoy y sal de chile, jugo de limón y hielo; la variante 'cubana' agrega salsa picante y salsa inglesa.",
    related: { label: "Receta de michelada con chamoy", href: "/recetas/michelada-con-chamoy/" }
  },
  {
    slug: "escarchado",
    name: "Escarchado (borde de vaso)",
    definition:
      "Técnica de pasar el borde del vaso por chamoy y luego por sal de chile para que quede cubierto. Es lo que distingue visualmente una michelada o mangonada bien servida, y se hace con sirope, no con salsa espesa.",
    related: { label: "Cómo escarchar paso a paso", href: "/recetas/michelada-con-chamoy/" }
  },
  {
    slug: "sal-de-chile",
    name: "Tajín / sal de chile",
    definition:
      "Mezcla en polvo de chile seco, sal y limón deshidratado. Tajín es la marca mexicana más conocida de esta categoría. Acompaña al chamoy en escarchados, frutas y snacks: el polvo aporta lo seco y el chamoy lo húmedo.",
    related: { label: "Mango con chamoy y tajín", href: "/recetas/mango-con-chamoy-y-tajin/" }
  },
  {
    slug: "mango-biche",
    name: "Mango biche",
    definition:
      "Mango verde, ácido y crujiente, cortado en bastones o tajadas. Es el compañero natural del chamoy en Colombia: la versión con salsa de chamoy y sal de chile es la evolución del clásico mango con sal y limón.",
    related: { label: "Receta de mango biche con chamoy", href: "/recetas/mango-con-chamoy-y-tajin/" }
  },
  {
    slug: "gomitas-enchiladas",
    name: "Gomitas enchiladas",
    definition:
      "Dulces de goma bañados en chamoy y revolcados en chile en polvo. Combinan lo dulce de la gomita con lo ácido y picosito del recubrimiento; se venden como snack y como remate de micheladas.",
    related: { label: "Receta de gomitas enchiladas", href: "/recetas/gomitas-enchiladas-con-chamoy/" }
  },
  {
    slug: "raspado",
    name: "Raspado / granizado",
    definition:
      "Hielo raspado o triturado con jarabes y fruta. Con un chorro de sirope de chamoy encima se convierte en la base de chamoyadas y versiones picositas de los granizados y cholados colombianos.",
    related: { label: "Chamoy en Cali: cholados y raspados", href: "/colombia/cali/" }
  },
  {
    slug: "chamoy-casero",
    name: "Chamoy casero",
    definition:
      "Preparación artesanal de chamoy hecha en casa con frutas deshidratadas, chile, limón y azúcar. Útil para entender el sabor, aunque para un negocio el chamoy estandarizado da consistencia de sabor y costo por porción.",
    related: { label: "Cómo hacer chamoy casero", href: "/recetas/como-hacer-chamoy-casero/" }
  },
  {
    slug: "skarchamoy",
    name: "Skarchamoy",
    definition:
      "Marca colombiana de chamoy de chamoy.com.co. Fabricamos en Colombia la línea completa: sirope, salsa y gel de chamoy, más el polvo agridulce Skarchalito, con venta directa de fábrica y envío a todo el país.",
    related: { label: "Ver productos Skarchamoy", href: "/productos/" }
  },
  {
    slug: "gel-de-chamoy",
    name: "Gel de chamoy",
    definition:
      "Formato escarchador del chamoy: más denso que la salsa, se adhiere al borde del vaso, al dulce o a la paleta sin escurrir. Es el que usan dulcerías y barras micheleras para escarchar rápido y parejo.",
    related: { label: "Ver gel de chamoy", href: "/productos/gel-de-chamoy/" }
  },
  {
    slug: "skarchalito-polvo",
    name: "Skarchalito (polvo agridulce)",
    definition:
      "Preparado sólido agridulce y picante de Skarchamoy: el polvito estilo mexicano para espolvorear sobre fruta, gomitas, snacks y bordes escarchados. Es el par del chamoy en el escarchado clásico.",
    related: { label: "Ver Skarchalito", href: "/productos/skarchalito/" }
  },
  {
    slug: "dulces-enchilados",
    name: "Dulces enchilados",
    definition:
      "Categoría de dulces mexicanos recubiertos con chile y chamoy: gomitas, tamarindos, fruta deshidratada y bananas. Es la puerta de entrada de muchos colombianos al sabor agridulce-picosito mexicano.",
    related: { label: "Ideas para vender snacks con chamoy", href: "/negocios/fruteras/" }
  }
];

export default function GlosarioPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", url: site.url },
          { name: "Glosario", url: `${site.url}/glosario/` }
        ])}
      />
      <JsonLd data={glossaryJsonLd(terms)} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Aprende</p>
            <h1>Glosario del chamoy y lo picante mexicano</h1>
            <p>
              El universo del chamoy tiene su propio idioma: mangonadas, escarchados, tajín,
              gomitas enchiladas. Aquí está cada término explicado en corto, con su receta o
              producto relacionado para pasar de la teoría al vaso.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <dl className="glossary">
            {terms.map((term) => (
              <div className="glossary-term card card-pad" id={term.slug} key={term.slug}>
                <dt>
                  <h2>{term.name}</h2>
                </dt>
                <dd>
                  <p>{term.definition}</p>
                  {term.related ? (
                    <Link className="glossary-link" href={term.related.href}>
                      {term.related.label} →
                    </Link>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="cta-band">
            <h2>Ya sabes el idioma. Ahora pruébalo.</h2>
            <p>Sirope y salsa de chamoy en 500 ml y 1 litro, con envío a todo Colombia.</p>
            <div className="section-actions">
              <Link className="btn btn-secondary" href="/comprar/">
                Ver productos y precios
              </Link>
              <Link className="btn btn-primary" style={{ background: "#2c1717" }} href="/recetas/">
                Ver recetas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
