import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { RecipeGrid } from "@/components/RecipeGrid";
import { getRecipes } from "@/lib/content";
import { site } from "@/lib/env";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import type { LandingPage } from "@/lib/types";

export async function LandingView({
  page,
  parentName,
  parentPath
}: {
  page: LandingPage;
  parentName: string;
  parentPath: string;
}) {
  const recipes = await getRecipes();
  const related = recipes.filter((recipe) => page.relatedRecipes.includes(recipe.slug));
  const whatsappHref = whatsappUrl(page.whatsappMessage || whatsappMessages.buy);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", url: site.url },
          { name: parentName, url: `${site.url}${parentPath}` },
          { name: page.h1, url: `${site.url}${parentPath}${page.slug}/` }
        ])}
      />
      {page.faqs.length ? <JsonLd data={faqJsonLd(page.faqs)} /> : null}

      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">{parentName}</p>
            <h1>{page.h1}</h1>
            <p>{page.intro}</p>
            <div className="mini-nav">
              <a className="btn btn-primary" href={whatsappHref} data-cta={`landing-${page.slug}`}>
                {page.ctaLabel || "Cotizar por WhatsApp"}
              </a>
              <Link className="btn btn-secondary" href="/comprar/">
                Ver productos y precios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {page.sections.map((section, index) => (
        <section className={index % 2 === 0 ? "section" : "section alt"} key={section.heading}>
          <div className="wrap">
            <h2>{section.heading}</h2>
            {section.body ? <p className="section-body">{section.body}</p> : null}
            {section.items?.length ? (
              <ul className="check-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      {related.length ? (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="section-kicker">Recetas recomendadas</p>
                <h2>Para poner en práctica.</h2>
              </div>
              <p>Recetas paso a paso que funcionan con los productos de esta página.</p>
            </div>
            <RecipeGrid recipes={related} />
          </div>
        </section>
      ) : null}

      {page.faqs.length ? (
        <section className="section alt">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="section-kicker">FAQ</p>
                <h2>Preguntas frecuentes.</h2>
              </div>
            </div>
            <FaqList faqs={page.faqs.map((faq) => ({ ...faq, page: page.slug }))} />
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="wrap">
          <div className="cta-band">
            <h2>{page.ctaLabel || "Habla con nosotros"}</h2>
            <p>Te respondemos por WhatsApp con formato recomendado, precios y siguiente paso.</p>
            <div className="section-actions">
              <a className="btn btn-secondary" href={whatsappHref} data-cta={`landing-final-${page.slug}`}>
                Escribir por WhatsApp
              </a>
              <Link className="btn btn-primary" style={{ background: "#2c1717" }} href="/asesoria/">
                Pedir asesoría completa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
