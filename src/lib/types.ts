export type Presentation = {
  size: string;
  priceCop: number;
  yield?: string;
};

export type Product = {
  slug: string;
  name: string;
  format: string;
  shortDescription: string;
  description: string;
  bestFor: string[];
  highlights: string[];
  presentations: Presentation[];
  image: string;
  imageAlt: string;
  priceNote: string | null;
  invimaRegistro: string | null;
  comparison: string | null;
  relatedRecipes: string[];
  updatedAt: Date;
};

export type RecipeStep = {
  name: string;
  text: string;
};

export type RecipeTip = {
  title: string;
  text: string;
};

export type Recipe = {
  slug: string;
  title: string;
  intent: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  prepMinutes: number;
  servings: string;
  ingredients: string[];
  steps: RecipeStep[];
  tips: RecipeTip[];
  businessNote: string | null;
  category: string;
  cuisine: string;
  keywords: string[];
  datePublished: string;
  totalTimeIso: string;
  cookTimeIso: string | null;
  productSlug: string | null;
  relatedSlugs: string[];
  updatedAt: Date;
};

export type Faq = {
  question: string;
  answer: string;
  page: string;
};

export type LeadInput = {
  name: string;
  phone: string;
  city?: string;
  businessType?: string;
  need: string;
  sourcePath?: string;
};

export type SitemapEntry = {
  slug: string;
  updatedAt: Date;
};

export type LandingSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type LandingFaq = {
  question: string;
  answer: string;
};

export type LandingKind = "ciudad" | "negocio";

export type LandingPage = {
  kind: LandingKind;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
  faqs: LandingFaq[];
  ctaLabel: string | null;
  whatsappMessage: string | null;
  relatedRecipes: string[];
  updatedAt: Date;
};

export type GlossaryTerm = {
  slug: string;
  name: string;
  definition: string;
  related?: { label: string; href: string };
};
