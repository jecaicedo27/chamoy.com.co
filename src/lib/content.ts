import { query } from "./db";
import type { Faq, LandingPage, LeadInput, Presentation, Product, Recipe, RecipeStep, RecipeTip, SitemapEntry } from "./types";

const defaultPresentations: Presentation[] = [
  { size: "500 ml", priceCop: 35000 },
  { size: "1 litro", priceCop: 55000 }
];

const fallbackProducts: Product[] = [
  {
    slug: "sirope-de-chamoy",
    name: "Sirope de chamoy",
    format: "Líquido fluido",
    shortDescription: "Sirope de chamoy líquido para micheladas, raspados, mangonadas y cocteles.",
    description:
      '<p>Nuestro <strong>sirope de chamoy</strong> es la versión líquida y fluida del chamoy: cae en hilo, cubre parejo y se mezcla sin grumos.</p>',
    bestFor: ["Micheladas", "Raspados", "Granizados", "Mangonadas"],
    highlights: ["Escarchar vasos", "Micheladas y cerveza preparada", "Raspados y granizados"],
    presentations: defaultPresentations,
    image: "/assets/img/sirope-de-chamoy.webp",
    imageAlt: "Sirope de chamoy líquido de 500 ml junto a una michelada",
    priceNote: "Ahorra con el litro: la presentación de 1 litro cuesta $55 el mililitro.",
    comparison: null,
    relatedRecipes: ["michelada-con-chamoy", "mangonada"],
    updatedAt: new Date("2026-07-05T00:00:00.000Z")
  },
  {
    slug: "salsa-de-chamoy",
    name: "Salsa de chamoy",
    format: "Salsa con cuerpo",
    shortDescription: "Salsa de chamoy espesa para mango biche, fruta, gomitas enchiladas y snacks.",
    description:
      '<p>Nuestra <strong>salsa de chamoy</strong> tiene el cuerpo y la textura del chamoy tradicional mexicano.</p>',
    bestFor: ["Mango biche", "Fruta fresca", "Gomitas", "Snacks"],
    highlights: ["Fruta fresca", "Gomitas enchiladas", "Snacks"],
    presentations: defaultPresentations,
    image: "/assets/img/salsa-de-chamoy.webp",
    imageAlt: "Tarro de salsa de chamoy espesa con mango verde",
    priceNote: "Ahorra con el litro: el tarro de 1 litro sale a $55 el mililitro.",
    comparison: null,
    relatedRecipes: ["mango-con-chamoy-y-tajin", "gomitas-enchiladas-con-chamoy"],
    updatedAt: new Date("2026-07-05T00:00:00.000Z")
  }
];

const fallbackRecipes: Recipe[] = [
  {
    slug: "michelada-con-chamoy",
    title: "Michelada con chamoy: la receta mexicana auténtica",
    intent: "bebidas",
    description: "Michelada al estilo mexicano con vaso escarchado en chamoy y tajín.",
    intro:
      "En Colombia la michelada es limón y sal. En México es un ritual completo: vaso escarchado con chamoy y tajín.",
    image: "/assets/img/michelada-con-chamoy.webp",
    imageAlt: "Michelada con cerveza dorada y borde escarchado de chamoy rojo con tajín",
    prepMinutes: 10,
    servings: "1 michelada",
    ingredients: ["1 cerveza clara bien fría", "2 cucharadas de sirope de chamoy", "Tajín", "Limón"],
    steps: [
      { name: "Escarcha el vaso", text: "Pasa el borde por sirope de chamoy y luego por tajín." },
      { name: "Prepara la base", text: "Agrega limón, chamoy y hielo." },
      { name: "Sirve", text: "Vierte la cerveza fría y mezcla suave." }
    ],
    tips: [],
    businessNote: null,
    category: "Bebida",
    cuisine: "Mexicana",
    keywords: ["michelada con chamoy"],
    datePublished: "2026-07-05",
    totalTimeIso: "PT10M",
    cookTimeIso: null,
    productSlug: "sirope-de-chamoy",
    relatedSlugs: ["mangonada"],
    updatedAt: new Date("2026-07-05T00:00:00.000Z")
  }
];

const fallbackFaqs: Faq[] = [
  {
    question: "Que diferencia hay entre sirope de chamoy y salsa de chamoy?",
    answer:
      "El sirope fluye mejor en bebidas. La salsa tiene mas cuerpo y funciona mejor sobre fruta, snacks, helados y bordes de vaso.",
    page: "general"
  }
];

type ProductRow = {
  slug: string;
  name: string;
  format: string;
  short_description: string;
  description: string;
  best_for: string[];
  highlights: unknown;
  presentations: unknown;
  image: string;
  image_alt: string;
  price_note: string | null;
  comparison: string | null;
  related_recipes: string[];
  updated_at: Date;
};

type RecipeRow = {
  slug: string;
  title: string;
  intent: string;
  description: string;
  intro: string;
  image: string;
  image_alt: string;
  prep_minutes: number;
  servings: string;
  ingredients: unknown;
  steps: unknown;
  tips: unknown;
  business_note: string | null;
  category: string;
  cuisine: string;
  keywords: string[];
  date_published: Date | string;
  total_time_iso: string | null;
  cook_time_iso: string | null;
  product_slug: string | null;
  related_slugs: string[];
  updated_at: Date;
};

type DateRow = {
  updated_at: Date;
};

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function asPresentations(value: unknown): Presentation[] {
  if (!Array.isArray(value)) return defaultPresentations;

  const presentations = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const size = String(record.size || "").trim();
      const priceCop = Number(record.price_cop ?? record.priceCop);
      if (!size || !Number.isFinite(priceCop)) return null;
      const presentation: Presentation = { size, priceCop };
      if (record.yield) presentation.yield = String(record.yield);
      return presentation;
    })
    .filter((item): item is Presentation => item !== null);

  return presentations.length ? presentations : defaultPresentations;
}

function asSteps(value: unknown): RecipeStep[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index) => {
      if (typeof item === "string") return { name: `Paso ${index + 1}`, text: item };
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      return {
        name: String(record.name || `Paso ${index + 1}`),
        text: String(record.text || "")
      };
    })
    .filter((step): step is RecipeStep => Boolean(step?.text));
}

function asTips(value: unknown): RecipeTip[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return { title: "Tip", text: item };
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      return {
        title: String(record.title || "Tip"),
        text: String(record.text || "")
      };
    })
    .filter((tip): tip is RecipeTip => Boolean(tip?.text));
}

function toDateString(value: Date | string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value;
}

function mapProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    format: row.format,
    shortDescription: row.short_description,
    description: row.description,
    bestFor: row.best_for,
    highlights: asStringArray(row.highlights),
    presentations: asPresentations(row.presentations),
    image: row.image,
    imageAlt: row.image_alt,
    priceNote: row.price_note,
    comparison: row.comparison,
    relatedRecipes: row.related_recipes,
    updatedAt: row.updated_at
  };
}

function mapRecipe(row: RecipeRow): Recipe {
  return {
    slug: row.slug,
    title: row.title,
    intent: row.intent,
    description: row.description,
    intro: row.intro || row.description,
    image: row.image,
    imageAlt: row.image_alt,
    prepMinutes: row.prep_minutes,
    servings: row.servings,
    ingredients: asStringArray(row.ingredients),
    steps: asSteps(row.steps),
    tips: asTips(row.tips),
    businessNote: row.business_note,
    category: row.category,
    cuisine: row.cuisine,
    keywords: row.keywords,
    datePublished: toDateString(row.date_published),
    totalTimeIso: row.total_time_iso || `PT${row.prep_minutes}M`,
    cookTimeIso: row.cook_time_iso,
    productSlug: row.product_slug,
    relatedSlugs: row.related_slugs,
    updatedAt: row.updated_at
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await query<ProductRow>(
      `SELECT slug, name, format, short_description, description, best_for, highlights,
              presentations, image, image_alt, price_note, comparison, related_recipes, updated_at
       FROM products
       WHERE active = true
       ORDER BY sort_order, id`
    );

    return rows.map(mapProduct);
  } catch (error) {
    console.error("getProducts fallback", error);
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const rows = await query<RecipeRow>(
      `SELECT slug, title, intent, description, intro, image, image_alt, prep_minutes, servings,
              ingredients, steps, tips, business_note, category, cuisine, keywords, date_published,
              total_time_iso, cook_time_iso, product_slug, related_slugs, updated_at
       FROM recipes
       WHERE active = true
       ORDER BY sort_order, id`
    );

    return rows.map(mapRecipe);
  } catch (error) {
    console.error("getRecipes fallback", error);
    return fallbackRecipes;
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipes = await getRecipes();
  return recipes.find((recipe) => recipe.slug === slug) ?? null;
}

export async function getFaqs(page?: string): Promise<Faq[]> {
  try {
    const rows = await query<Faq>(
      `SELECT question, answer, page
       FROM faqs
       WHERE active = true
         AND ($1::text IS NULL OR page IN ('general', $1))
       ORDER BY sort_order, id`,
      [page ?? null]
    );

    return rows.length ? rows : fallbackFaqs;
  } catch (error) {
    console.error("getFaqs fallback", error);
    return fallbackFaqs;
  }
}

export async function getContentUpdatedAt(): Promise<Date> {
  try {
    const rows = await query<DateRow>(
      `SELECT GREATEST(
        COALESCE((SELECT max(updated_at) FROM products WHERE active = true), TIMESTAMPTZ '2026-07-05'),
        COALESCE((SELECT max(updated_at) FROM recipes WHERE active = true), TIMESTAMPTZ '2026-07-05'),
        COALESCE((SELECT max(updated_at) FROM faqs WHERE active = true), TIMESTAMPTZ '2026-07-05')
      ) AS updated_at`
    );

    return rows[0]?.updated_at ?? new Date("2026-07-05T00:00:00.000Z");
  } catch (error) {
    console.error("getContentUpdatedAt fallback", error);
    return new Date("2026-07-05T00:00:00.000Z");
  }
}

export async function getRecipeSitemapEntries(): Promise<SitemapEntry[]> {
  try {
    const rows = await query<{ slug: string; updated_at: Date }>(
      `SELECT slug, updated_at
       FROM recipes
       WHERE active = true
       ORDER BY sort_order, id`
    );

    return rows.map((row) => ({ slug: row.slug, updatedAt: row.updated_at }));
  } catch (error) {
    console.error("getRecipeSitemapEntries fallback", error);
    return fallbackRecipes.map((recipe) => ({ slug: recipe.slug, updatedAt: recipe.updatedAt }));
  }
}

export async function getProductSitemapEntries(): Promise<SitemapEntry[]> {
  try {
    const rows = await query<{ slug: string; updated_at: Date }>(
      `SELECT slug, updated_at
       FROM products
       WHERE active = true
       ORDER BY sort_order, id`
    );

    return rows.map((row) => ({ slug: row.slug, updatedAt: row.updated_at }));
  } catch (error) {
    console.error("getProductSitemapEntries fallback", error);
    return fallbackProducts.map((product) => ({ slug: product.slug, updatedAt: product.updatedAt }));
  }
}

type LandingRow = {
  kind: string;
  slug: string;
  title: string;
  meta_description: string;
  h1: string;
  intro: string;
  sections: LandingPage["sections"];
  faqs: LandingPage["faqs"];
  cta_label: string | null;
  whatsapp_message: string | null;
  related_recipes: string[];
  updated_at: Date;
};

function mapLanding(row: LandingRow): LandingPage {
  return {
    kind: row.kind as LandingPage["kind"],
    slug: row.slug,
    title: row.title,
    metaDescription: row.meta_description,
    h1: row.h1,
    intro: row.intro,
    sections: row.sections,
    faqs: row.faqs,
    ctaLabel: row.cta_label,
    whatsappMessage: row.whatsapp_message,
    relatedRecipes: row.related_recipes,
    updatedAt: row.updated_at
  };
}

export async function getLandingPages(kind?: LandingPage["kind"]): Promise<LandingPage[]> {
  try {
    const rows = await query<LandingRow>(
      `SELECT kind, slug, title, meta_description, h1, intro, sections, faqs,
              cta_label, whatsapp_message, related_recipes, updated_at
       FROM landing_pages
       WHERE active = true
         AND ($1::text IS NULL OR kind = $1)
       ORDER BY kind, sort_order, id`,
      [kind ?? null]
    );

    return rows.map(mapLanding);
  } catch (error) {
    console.error("getLandingPages fallback", error);
    return [];
  }
}

export async function getLandingPage(
  kind: LandingPage["kind"],
  slug: string
): Promise<LandingPage | null> {
  const pages = await getLandingPages(kind);
  return pages.find((page) => page.slug === slug) ?? null;
}

export async function createEvent(type: string, path: string, meta: Record<string, unknown>) {
  await query(
    `INSERT INTO events (type, path, meta) VALUES ($1, $2, $3)`,
    [type, path, JSON.stringify(meta)]
  );
}

export async function createLead(input: LeadInput) {
  const rows = await query<{ id: string }>(
    `INSERT INTO leads (name, phone, city, business_type, need, source_path)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [
      input.name.trim(),
      input.phone.trim(),
      input.city?.trim() || null,
      input.businessType?.trim() || null,
      input.need.trim(),
      input.sourcePath?.trim() || null
    ]
  );

  return rows[0];
}
