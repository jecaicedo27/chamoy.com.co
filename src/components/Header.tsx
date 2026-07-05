import Link from "next/link";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function Header() {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Navegacion principal">
        <Link className="brand" href="/" aria-label="Chamoy Colombia inicio">
          <img className="brand-logo" src="/assets/img/logo-chamoy-header.png" alt="" width={38} height={38} />
          <span>Chamoy Colombia</span>
        </Link>
        <div className="nav-links">
          <Link href="/comprar/">Comprar</Link>
          <Link href="/negocios/">Negocios</Link>
          <Link href="/asesoria/">Asesoria</Link>
          <Link href="/recetas/">Recetas</Link>
          <Link href="/guia/">Guía</Link>
          <Link href="/faq/">FAQ</Link>
        </div>
        <a className="btn btn-primary btn-compact" href={whatsappUrl(whatsappMessages.buy)}>
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
