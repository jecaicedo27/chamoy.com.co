import type { Metadata } from "next";
import { RecipeGrid } from "@/components/RecipeGrid";
import { getFaqs, getRecipes } from "@/lib/content";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, recipeJsonLd } from "@/lib/jsonld";
import { FaqList } from "@/components/FaqList";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Recetas con chamoy para bebidas, frutas y snacks",
  description:
    "Recetas con chamoy para micheladas, mango biche, sodas, granizados, helados, frutas y negocios de bebidas en Colombia.",
  alternates: { canonical: "/recetas/" }
};

export default async function RecetasPage() {
  const [recipes, faqs] = await Promise.all([getRecipes(), getFaqs("recetas")]);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", url: site.url }, { name: "Recetas", url: `${site.url}/recetas/` }])} />
      {recipes.slice(0, 3).map((recipe) => (
        <JsonLd data={recipeJsonLd(recipe)} key={recipe.slug} />
      ))}

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Recetas con chamoy</p>
            <h1>Ideas listas para vender o preparar hoy.</h1>
            <p>
              El chamoy funciona en bebidas, frutas y snacks cuando eliges bien el formato:
              sirope para mezclar, salsa para cubrir y decorar.
            </p>
            <div className="mini-nav">
              <a className="btn btn-primary" href={whatsappUrl(whatsappMessages.recipes)}>
                Pedir ideas por WhatsApp
              </a>
            </div>
          </div>
          <aside className="card card-pad">
            <h3>Respuesta corta</h3>
            <p>
              Para micheladas usa salsa en el borde y sirope en la mezcla. Para mango, helado o
              snacks usa salsa porque cubre mejor.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">Hub de recetas</p>
              <h2>Recetas base.</h2>
            </div>
            <p>Estas recetas son la primera capa. Luego se convierten en URLs individuales.</p>
          </div>
          <RecipeGrid recipes={recipes} />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-kicker">FAQ</p>
              <h2>Dudas de uso.</h2>
            </div>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
