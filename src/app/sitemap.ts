import type { MetadataRoute } from "next";
import {
  getContentUpdatedAt,
  getLandingPages,
  getProductSitemapEntries,
  getRecipeSitemapEntries
} from "@/lib/content";
import { site } from "@/lib/env";

function route(path: string, lastModified: Date, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [contentUpdatedAt, recipes, products, landings] = await Promise.all([
    getContentUpdatedAt(),
    getRecipeSitemapEntries(),
    getProductSitemapEntries(),
    getLandingPages()
  ]);

  const staticRoutes = [
    route("/", contentUpdatedAt, 1),
    route("/comprar/", contentUpdatedAt, 0.8),
    route("/productos/", contentUpdatedAt, 0.8),
    route("/asesoria/", contentUpdatedAt, 0.8),
    route("/recetas/", contentUpdatedAt, 0.8),
    route("/guia/", contentUpdatedAt, 0.75),
    route("/guia/que-es-el-chamoy/", contentUpdatedAt, 0.85),
    route("/guia/donde-comprar-chamoy-en-colombia/", contentUpdatedAt, 0.85),
    route("/glosario/", contentUpdatedAt, 0.7),
    route("/colombia/", contentUpdatedAt, 0.7),
    route("/negocios/", contentUpdatedAt, 0.7),
    route("/faq/", contentUpdatedAt, 0.65)
  ];

  const landingRoutes = landings.map((page) => ({
    url: `${site.url}/${page.kind === "ciudad" ? "colombia" : "negocios"}/${page.slug}/`,
    lastModified: page.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.75
  }));

  const productRoutes = products.map((product) => ({
    url: `${site.url}/productos/${product.slug}/`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.75
  }));

  const recipeRoutes = recipes.map((recipe) => ({
    url: `${site.url}/recetas/${recipe.slug}/`,
    lastModified: recipe.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...landingRoutes, ...productRoutes, ...recipeRoutes];
}
