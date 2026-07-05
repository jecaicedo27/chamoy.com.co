import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { RichText } from "@/components/RichText";
import { getProductBySlug, getRecipeBySlug, getRecipes } from "@/lib/content";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, recipeJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

type Props = {
  params: Promise<{ slug: string }>;
};

const legacyRecipeRedirects: Record<string, string> = {
  "mango-biche-con-chamoy": "mango-con-chamoy-y-tajin",
  "soda-tropical-con-chamoy": "mangonada",
  "granizado-tropical-con-chamoy": "mangonada"
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = legacyRecipeRedirects[slug] ?? slug;
  const recipe = await getRecipeBySlug(canonicalSlug);
  if (!recipe) return {};

  return {
    title: `${recipe.title} | chamoy.com.co`,
    description: recipe.description,
    alternates: { canonical: `/recetas/${recipe.slug}/` },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [{ url: recipe.image, alt: recipe.imageAlt }]
    }
  };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const redirectSlug = legacyRecipeRedirects[slug];
  if (redirectSlug) redirect(`/recetas/${redirectSlug}/`);

  const [recipe, recipes] = await Promise.all([getRecipeBySlug(slug), getRecipes()]);
  if (!recipe) notFound();

  const product = recipe.productSlug ? await getProductBySlug(recipe.productSlug) : null;
  const related = recipe.relatedSlugs
    .map((relatedSlug) => recipes.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", url: site.url },
          { name: "Recetas", url: `${site.url}/recetas/` },
          { name: recipe.title, url: `${site.url}/recetas/${recipe.slug}/` }
        ])}
      />
      <JsonLd data={recipeJsonLd(recipe)} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Receta con chamoy</p>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <div className="mini-nav">
              <a className="btn btn-primary" href={whatsappUrl(whatsappMessages.buy)}>
                Comprar chamoy para esta receta
              </a>
              {product ? (
                <Link className="btn btn-secondary" href={`/productos/${product.slug}/`}>
                  Ver {product.name.toLowerCase()}
                </Link>
              ) : null}
            </div>
          </div>
          <aside className="card card-pad">
            <h3>Ficha rápida</h3>
            <p>
              Tiempo: {recipe.prepMinutes} minutos. Porciones: {recipe.servings}. Uso: {recipe.intent}.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap article-body">
          <img className="article-image" src={recipe.image} alt={recipe.imageAlt} />
          <RichText className="rich-text" html={`<p>${recipe.intro}</p>`} />

          <div className="grid two">
            <article className="card card-pad">
              <p className="section-kicker">Ingredientes</p>
              <h2>Lo que necesitas.</h2>
              <ul className="check-list">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </article>
            <article className="card card-pad">
              <p className="section-kicker">Preparación</p>
              <h2>Paso a paso.</h2>
              <ol className="number-list">
                {recipe.steps.map((step) => (
                  <li key={step.name}>
                    <strong>{step.name}.</strong> <RichText className="rich-text inline-rich-text" html={step.text} />
                  </li>
                ))}
              </ol>
            </article>
          </div>

          {recipe.tips.length ? (
            <section>
              <p className="section-kicker">Trucos</p>
              <h2>Para que quede perfecto.</h2>
              <div className="grid three">
                {recipe.tips.map((tip) => (
                  <article className="card card-pad" key={tip.title}>
                    <h3>{tip.title}</h3>
                    <RichText className="rich-text" html={`<p>${tip.text}</p>`} />
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {recipe.businessNote ? (
            <aside className="panel">
              <RichText className="rich-text" html={recipe.businessNote} />
              {product ? (
                <Link className="btn btn-secondary" href={`/productos/${product.slug}/`}>
                  Ver presentaciones
                </Link>
              ) : null}
            </aside>
          ) : null}

          {related.length ? (
            <section>
              <p className="section-kicker">Más recetas con chamoy</p>
              <h2>Sigue probando.</h2>
              <div className="grid three">
                {related.map((item) => (
                  <Link className="card recipe-card" href={`/recetas/${item.slug}/`} key={item.slug}>
                    <img className="card-image recipe-image" src={item.image} alt={item.imageAlt} loading="lazy" />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
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
