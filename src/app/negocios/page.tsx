import Link from "next/link";
import type { Metadata } from "next";
import { getLandingPages } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Chamoy para negocios: bares, fruterías y heladerías",
  description:
    "Guías de chamoy por tipo de negocio: cuánto rinde, cuánto cuesta por porción y qué productos montar en bares, fruterías y heladerías.",
  alternates: { canonical: "/negocios/" }
};

export default async function NegociosHub() {
  const businesses = await getLandingPages("negocio");

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Chamoy B2B</p>
            <h1>Chamoy para tu tipo de negocio</h1>
            <p>
              Cada negocio usa el chamoy distinto. Estas guías traen la cuenta clara — rendimiento,
              costo por porción y productos concretos — para bares, fruterías y heladerías.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="grid three">
            {businesses.map((business) => (
              <Link className="card use-card" href={`/negocios/${business.slug}/`} key={business.slug}>
                <h3>{business.h1}</h3>
                <p>{business.metaDescription}</p>
              </Link>
            ))}
          </div>
          <div className="cta-band" style={{ marginTop: 28 }}>
            <p className="section-kicker" style={{ color: "#ffd56a" }}>Compra en volumen</p>
            <h2>¿Distribuidor, cadena o mayorista?</h2>
            <p>
              Somos fabricantes: precios escalonados por volumen, reposición garantizada y
              proyectos de maquila. Sin intermediarios.
            </p>
            <div className="section-actions">
              <Link className="btn btn-secondary" href="/mayoristas/">
                Ver condiciones mayoristas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
