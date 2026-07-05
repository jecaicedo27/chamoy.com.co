import Link from "next/link";
import { site } from "@/lib/env";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-columns">
        <div>
          <Link className="brand" href="/">
            <img className="brand-logo" src="/assets/img/logo-chamoy-header.png" alt="" width={38} height={38} loading="lazy" />
            <span>{site.name}</span>
          </Link>
          <p style={{ margin: "14px 0 0" }}>{site.description}</p>
        </div>
        <div>
          <h4>Comprar</h4>
          <ul>
            <li><Link href="/comprar/">Comprar chamoy</Link></li>
            <li><Link href="/productos/sirope-de-chamoy/">Sirope de chamoy</Link></li>
            <li><Link href="/productos/salsa-de-chamoy/">Salsa de chamoy</Link></li>
            <li><Link href="/asesoria/">Asesoría para negocios</Link></li>
          </ul>
        </div>
        <div>
          <h4>Para tu negocio</h4>
          <ul>
            <li><Link href="/negocios/bares/">Bares y micheladas</Link></li>
            <li><Link href="/negocios/fruteras/">Fruterías</Link></li>
            <li><Link href="/negocios/heladerias/">Heladerías</Link></li>
            <li><Link href="/asesoria/#calculadora">Calculadora de porciones</Link></li>
          </ul>
        </div>
        <div>
          <h4>En tu ciudad</h4>
          <ul>
            <li><Link href="/colombia/bogota/">Chamoy en Bogotá</Link></li>
            <li><Link href="/colombia/medellin/">Chamoy en Medellín</Link></li>
            <li><Link href="/colombia/cali/">Chamoy en Cali</Link></li>
            <li><Link href="/colombia/">Todo el país</Link></li>
          </ul>
        </div>
        <div>
          <h4>Aprende</h4>
          <ul>
            <li><Link href="/guia/que-es-el-chamoy/">¿Qué es el chamoy?</Link></li>
            <li><Link href="/guia/donde-comprar-chamoy-en-colombia/">Dónde comprar</Link></li>
            <li><Link href="/recetas/">Recetas</Link></li>
            <li><Link href="/glosario/">Glosario</Link></li>
            <li><Link href="/faq/">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-legal">
        © 2026 {site.name} — chamoy.com.co. Hecho con sabor en Colombia.
      </div>
    </footer>
  );
}
