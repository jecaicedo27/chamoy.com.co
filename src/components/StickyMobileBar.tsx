import Link from "next/link";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function StickyMobileBar() {
  return (
    <div className="sticky-mobile" aria-label="Acciones rapidas">
      <Link className="btn btn-secondary" href="/comprar/">
        Comprar
      </Link>
      <a className="btn btn-primary" href={whatsappUrl(whatsappMessages.buy)}>
        WhatsApp
      </a>
    </div>
  );
}
