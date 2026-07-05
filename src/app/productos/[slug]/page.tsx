import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RichText } from "@/components/RichText";
import { getProductBySlug, getProducts, getRecipes } from "@/lib/content";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/jsonld";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} Skarchamoy | 500 ml y 1 litro | Precio en Colombia`,
    description: product.shortDescription,
    alternates: { canonical: `/productos/${product.slug}/` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.imageAlt }]
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, recipes] = await Promise.all([getProductBySlug(slug), getRecipes()]);
  if (!product) notFound();

  const related = product.relatedRecipes
    .map((recipeSlug) => recipes.find((recipe) => recipe.slug === recipeSlug))
    .filter((recipe): recipe is NonNullable<typeof recipe> => Boolean(recipe));

  const message = `Hola, quiero pedir ${product.name.toLowerCase()} en Colombia`;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", url: site.url },
          { name: "Productos", url: `${site.url}/productos/` },
          { name: product.name, url: `${site.url}/productos/${product.slug}/` }
        ])}
      />
      <JsonLd data={productJsonLd(product)} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Skarchamoy · Fabricado en Colombia</p>
            <h1>{product.name}: {product.format.toLowerCase()}.</h1>
            <p>{product.shortDescription}</p>
            <div className="mini-nav">
              <a className="btn btn-primary" href={whatsappUrl(message)}>
                Pedir por WhatsApp
              </a>
              <Link className="btn btn-secondary" href="/productos/">
                Ver todos
              </Link>
            </div>
          </div>
          <aside className="card card-pad">
            <h3>Presentaciones</h3>
            {product.presentations.length ? (
              <p>
                {product.presentations
                  .map((presentation) => `${presentation.size} por $${presentation.priceCop.toLocaleString("es-CO")} COP`)
                  .join(" y ")}
                .
              </p>
            ) : (
              <p>Producto de lanzamiento: pregunta presentaciones y precios por WhatsApp.</p>
            )}
            {product.invimaRegistro ? (
              <p className="invima-badge">
                Notificación Sanitaria INVIMA <strong>{product.invimaRegistro}</strong>
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap article-body">
          <img className="article-image" src={product.image} alt={product.imageAlt} />
          <RichText className="rich-text" html={product.description} />

          <div className="grid two">
            <article className="card card-pad">
              <p className="section-kicker">Presentaciones y precios</p>
              <h2>Compra según tu uso.</h2>
              <ul className="price-list">
                {product.presentations.map((presentation) => (
                  <li className="price-row" key={presentation.size}>
                    <span>
                      {presentation.size}
                      {presentation.yield ? <small> · {presentation.yield}</small> : null}
                    </span>
                    <strong>${presentation.priceCop.toLocaleString("es-CO")} COP</strong>
                  </li>
                ))}
              </ul>
              {product.priceNote ? <p style={{ marginTop: 18 }}>{product.priceNote}</p> : null}
            </article>

            <article className="card card-pad">
              <p className="section-kicker">Usos</p>
              <h2>¿Para qué se usa?</h2>
              <ul className="check-list">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          </div>

          {product.comparison ? (
            <aside className="panel">
              <h2>¿Sirope o salsa?</h2>
              <RichText className="rich-text" html={`<p>${product.comparison}</p>`} />
            </aside>
          ) : null}

          {related.length ? (
            <section>
              <p className="section-kicker">Recetas para estrenar tu {product.name.toLowerCase()}</p>
              <h2>Empieza por aquí.</h2>
              <div className="grid two">
                {related.map((recipe) => (
                  <Link className="card recipe-card" href={`/recetas/${recipe.slug}/`} key={recipe.slug}>
                    <img className="card-image recipe-image" src={recipe.image} alt={recipe.imageAlt} loading="lazy" />
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
