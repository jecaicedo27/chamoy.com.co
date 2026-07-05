import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LandingView } from "@/components/LandingView";
import { getLandingPage, getLandingPages } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getLandingPages("negocio");
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPage("negocio", slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/negocios/${page.slug}/` }
  };
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  const page = await getLandingPage("negocio", slug);
  if (!page) notFound();

  return <LandingView page={page} parentName="Chamoy para negocios" parentPath="/negocios/" />;
}
