import Link from "next/link";
import type { Metadata } from "next";
import { getLandingPages } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Chamoy por ciudad: Bogotá, Medellín, Cali y todo el país",
  description:
    "Compra sirope y salsa de chamoy en tu ciudad. Guías locales para Bogotá, Medellín y Cali con precios, usos y pedido por WhatsApp.",
  alternates: { canonical: "/colombia/" }
};

export default async function ColombiaHub() {
  const cities = await getLandingPages("ciudad");

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div>
            <p className="section-kicker">Cobertura nacional</p>
            <h1>Chamoy en tu ciudad</h1>
            <p>
              Despachamos sirope y salsa de chamoy a todo Colombia. Estas guías locales explican
              cómo se usa el chamoy en cada ciudad, qué negocios lo están aprovechando y cómo pedir.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="grid three">
            {cities.map((city) => (
              <Link className="card use-card" href={`/colombia/${city.slug}/`} key={city.slug}>
                <h3>{city.h1}</h3>
                <p>{city.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
