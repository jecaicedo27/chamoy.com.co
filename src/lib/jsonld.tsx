import { site } from "./env";
import type { Faq, Product, Recipe } from "./types";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/assets/img/logo-chamoy.png`,
      width: 480,
      height: 480
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${site.whatsappNumber}`,
      contactType: "sales",
      areaServed: "CO",
      availableLanguage: "Spanish"
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "es-CO"
  };
}

export function chamoyTermJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: "Chamoy",
    description:
      "Salsa o condimento mexicano de sabor dulce, acido, salado y ligeramente picante, usado en frutas, snacks, bebidas, micheladas y postres.",
    inDefinedTermSet: `${site.url}/glosario/`,
    url: `${site.url}/glosario/#chamoy`
  };
}

export function glossaryJsonLd(terms: Array<{ slug: string; name: string; definition: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${site.url}/glosario/`,
    name: "Glosario del chamoy y lo picante mexicano",
    description:
      "Definiciones cortas de los términos del ecosistema del chamoy en Colombia: productos, preparaciones y técnicas.",
    inLanguage: "es-CO",
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      "@id": `${site.url}/glosario/#${term.slug}`,
      name: term.name,
      description: term.definition,
      inDefinedTermSet: `${site.url}/glosario/`
    }))
  };
}

export function homeWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}/#webpage`,
    url: site.url,
    name: "Chamoy en Colombia",
    description:
      "Guia de chamoy en Colombia: que es, como se usa, recetas, sirope, salsa y compra para negocios.",
    inLanguage: "es-CO",
    about: [
      { "@type": "Thing", name: "chamoy" },
      { "@type": "Thing", name: "salsa de chamoy" },
      { "@type": "Thing", name: "sirope de chamoy" },
      { "@type": "Thing", name: "michelada con chamoy" },
      { "@type": "Place", name: "Colombia" }
    ],
    publisher: { "@id": `${site.url}/#organization` }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function faqJsonLd(faqs: Array<Pick<Faq, "question" | "answer">>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: stripHtml(product.description),
    brand: { "@type": "Brand", name: site.name },
    category: "Salsas y siropes para bebidas",
    image: absoluteUrl(product.image),
    url: `${site.url}/productos/${product.slug}/`,
    offers: product.presentations.map((presentation) => ({
      "@type": "Offer",
      name: `${product.name} ${presentation.size}`,
      price: presentation.priceCop,
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      areaServed: "CO",
      url: `${site.url}/productos/${product.slug}/`
    }))
  };
}

export function recipeJsonLd(recipe: Recipe) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: absoluteUrl(recipe.image),
    inLanguage: "es-CO",
    datePublished: recipe.datePublished,
    author: { "@id": `${site.url}/#organization` },
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    keywords: recipe.keywords.join(", "),
    prepTime: `PT${recipe.prepMinutes}M`,
    ...(recipe.cookTimeIso ? { cookTime: recipe.cookTimeIso } : {}),
    totalTime: recipe.totalTimeIso,
    recipeYield: recipe.servings,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: stripHtml(step.text)
    }))
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    inLanguage: "es-CO",
    datePublished: input.datePublished ?? "2026-07-05",
    dateModified: input.dateModified ?? "2026-07-05",
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: input.url,
    ...(input.image ? { image: absoluteUrl(input.image) } : {})
  };
}
